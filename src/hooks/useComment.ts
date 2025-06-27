import { supabase } from '@/integrations/supabase/client';
import type { Comment, Idea } from '../pages/Index';

interface UseCommentsProps {
  ideas: Idea[];
  setIdeas: (ideas: Idea[]) => void;
}

/**
 * Custom hook for managing comments on ideas
 */
export const useComments = ({ ideas, setIdeas }: UseCommentsProps) => {
  /**
   * Add a new comment to an idea
   */
  const addComment = async (ideaId: string, content: string, author: string): Promise<void> => {
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

      setIdeas(ideas.map(idea =>
        idea.id === ideaId
          ? { ...idea, comments: [...idea.comments, newComment] }
          : idea
      ));
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  };

  return { addComment };
};
