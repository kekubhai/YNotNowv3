import type { Idea } from '../pages/IdeasPage';

export const useVotes = (ideas: Idea[], setIdeas: React.Dispatch<React.SetStateAction<Idea[]>>) => {
  const handleVote = async (ideaId: string, voteType: 'up' | 'down') => {
    const userIdentifier = 'anonymous_user';
    try {
      const res = await fetch(`http://localhost:3000/ideas/${ideaId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userIdentifier, voteType }),
      });
      if (!res.ok) throw new Error('Failed to vote');
      // Optionally, you can fetch the updated ideas list here or update state optimistically
      // For now, just refetch or update state as needed in your component
    } catch (error) {
      console.error('Error handling vote:', error);
    }
  };

  return { handleVote };
};
