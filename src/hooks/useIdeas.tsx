import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Idea, Comment } from '../pages/Index';

export const useIdeas = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchIdeas = async () => {
    try {
      setLoading(true);
      const { data: ideasData, error: ideasError } = await supabase
        .from('ideas')
        .select('*')
        .order('created_at', { ascending: false });

      const { data: commentsData, error: commentsError } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: true });

      if (ideasError || commentsError) throw ideasError || commentsError;

      const transformedIdeas: Idea[] = (ideasData || []).map(idea => ({
        id: idea.id,
        title: idea.title,
        description: idea.description,
        author: idea.author,
        votes: idea.votes,
        createdAt: new Date(idea.created_at),
        userVote: null,
        comments: (commentsData || [])
          .filter(comment => comment.idea_id === idea.id)
          .map(comment => ({
            id: comment.id,
            author: comment.author,
            content: comment.content,
            createdAt: new Date(comment.created_at)
          }))
      }));

      setIdeas(transformedIdeas);
    } catch (error) {
      console.error('Error fetching ideas:', error);
    } finally {
      setLoading(false);
    }
  };

  const addIdea = async (newIdea: { title: string; description: string; author: string }) => {
    try {
      const { data, error } = await supabase
        .from('ideas')
        .insert([newIdea])
        .select()
        .single();

      if (error) throw error;

      const transformedIdea: Idea = {
        id: data.id,
        title: data.title,
        description: data.description,
        author: data.author,
        votes: data.votes,
        createdAt: new Date(data.created_at),
        userVote: null,
        comments: []
      };

      setIdeas(prev => [transformedIdea, ...prev]);
      return transformedIdea;
    } catch (error) {
      console.error('Error adding idea:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchIdeas();

    const channel = supabase
      .channel('ideas-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'ideas' },
        fetchIdeas
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { ideas, loading, addIdea, setIdeas, fetchIdeas };
};
