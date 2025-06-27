import { supabase } from '@/integrations/supabase/client';
import type { Idea } from '../pages/Index';

export const useVotes = (ideas: Idea[], setIdeas: React.Dispatch<React.SetStateAction<Idea[]>>) => {
  const handleVote = async (ideaId: string, voteType: 'up' | 'down') => {
    const userIdentifier = 'anonymous_user';

    try {
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
          await supabase.from('votes').delete().eq('id', existingVote.id);
          voteChange = voteType === 'up' ? -1 : 1;
          newUserVote = null;
        } else {
          await supabase
            .from('votes')
            .update({ vote_type: voteType })
            .eq('id', existingVote.id);
          voteChange = voteType === 'up' ? 2 : -2;
        }
      } else {
        await supabase
          .from('votes')
          .insert([{ idea_id: ideaId, user_identifier: userIdentifier, vote_type: voteType }]);
        voteChange = voteType === 'up' ? 1 : -1;
      }

      const currentIdea = ideas.find(idea => idea.id === ideaId);
      if (currentIdea) {
        const { error: updateError } = await supabase
          .from('ideas')
          .update({ votes: currentIdea.votes + voteChange })
          .eq('id', ideaId);

        if (updateError) throw updateError;

        setIdeas((prev: Idea[]) => prev.map(idea =>
          idea.id === ideaId
            ? { ...idea, votes: idea.votes + voteChange, userVote: newUserVote }
            : idea
        ));
      }
    } catch (error) {
      console.error('Error handling vote:', error);
    }
  };

  return { handleVote };
};
