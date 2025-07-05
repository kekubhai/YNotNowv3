import type { Comment, Idea } from '../pages/IdeasPage';

const backendUrl = import.meta.env.VITE_BACKEND_URL ;

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
      const res = await fetch(`${backendUrl}/comments/idea/${ideaId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, content }),
      });
      if (!res.ok) throw new Error('Failed to add comment');
      const data = await res.json();
      const newComment: Comment = {
        id: data.id,
        author: data.author,
        content: data.content,
        createdAt: new Date(data.createdAt)
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
