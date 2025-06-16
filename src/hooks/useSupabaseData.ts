
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Idea, Comment } from '../pages/Index';

export const useSupabaseData = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchIdeas = async () => {
    try {
      setLoading(true);
      
      // Fetch ideas with their comments
      const { data: ideasData, error: ideasError } = await supabase
        .from('ideas')
        .select('*')
        .order('created_at', { ascending: false });

      if (ideasError) throw ideasError;

      // Fetch comments for all ideas
      const { data: commentsData, error: commentsError } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: true });

      if (commentsError) throw commentsError;

      // Transform data to match our interface
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

  const addComment = async (ideaId: string, content: string, author: string) => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([{ idea_id: ideaId, content, author }])
        .select()
        .single();

      if (error) throw error;

      const newComment: Comment = {
        id: data.id,
        author: data.author,
        content: data.content,
        createdAt: new Date(data.created_at)
      };

      setIdeas(prev => prev.map(idea => 
        idea.id === ideaId 
          ? { ...idea, comments: [...idea.comments, newComment] }
          : idea
      ));
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  };

  const handleVote = async (ideaId: string, voteType: 'up' | 'down') => {
    // For now, we'll use a simple user identifier (could be IP-based in production)
    const userIdentifier = 'anonymous_user';
    
    try {
      // Check if user has already voted
      const { data: existingVote } = await supabase
        .from('votes')
        .select('*')
        .eq('idea_id', ideaId)
        .eq('user_identifier', userIdentifier)
        .single();

      let voteChange = 0;
      let newUserVote: 'up' | 'down' | null = voteType;

      if (existingVote) {
        if (existingVote.vote_type === voteType) {
          // Remove vote
          await supabase
            .from('votes')
            .delete()
            .eq('id', existingVote.id);
          
          voteChange = voteType === 'up' ? -1 : 1;
          newUserVote = null;
        } else {
          // Change vote
          await supabase
            .from('votes')
            .update({ vote_type: voteType })
            .eq('id', existingVote.id);
          
          voteChange = voteType === 'up' ? 2 : -2;
        }
      } else {
        // New vote
        await supabase
          .from('votes')
          .insert([{ idea_id: ideaId, user_identifier: userIdentifier, vote_type: voteType }]);
        
        voteChange = voteType === 'up' ? 1 : -1;
      }

      // Update idea votes count
      const { error: updateError } = await supabase
        .from('ideas')
        .update({ votes: supabase.sql`votes + ${voteChange}` })
        .eq('id', ideaId);

      if (updateError) throw updateError;

      // Update local state
      setIdeas(prev => prev.map(idea => 
        idea.id === ideaId 
          ? { ...idea, votes: idea.votes + voteChange, userVote: newUserVote }
          : idea
      ));
    } catch (error) {
      console.error('Error handling vote:', error);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  return {
    ideas,
    loading,
    addIdea,
    addComment,
    handleVote,
    refetch: fetchIdeas
  };
};
