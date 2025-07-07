import React, { useState } from 'react';
import { ChevronUp, ChevronDown, MessageCircle, User, Clock, Flame, Heart, Users,SquareArrowUp,  Tag } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import type { Idea } from '../pages/IdeasPage';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AnimatedCard } from './ui/animated-card';
import { AnimatedButton } from './ui/animated-button';
import { ScrollReveal } from './ui/scroll-reveal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';


interface IdeaCardProps {
  idea: Idea;
  onVote: (ideaId: string, voteType: 'up' | 'down') => void;
  onAddComment: (ideaId: string, content: string, author: string) => void;
}

// Add a helper for category color styles
const getCategoryStyles = (category: string) => {
  switch (category) {
    case 'startup':
      return {
        bg: 'bg-gradient-to-r from-blue-800/70 to-blue-600/60 border-blue-400/40',
        text: 'text-blue-200',
        icon: 'text-blue-300'
      };
    case 'hackathon':
      return {
        bg: 'bg-gradient-to-r from-green-800/70 to-green-600/60 border-green-400/40',
        text: 'text-green-200',
        icon: 'text-green-300'
      };
    case 'both':
      return {
        bg: 'bg-gradient-to-r from-purple-800/70 to-pink-700/60 border-purple-400/40',
        text: 'text-pink-200',
        icon: 'text-pink-300'
      };
    default:
      return {
        bg: 'bg-gradient-to-r from-slate-700/60 to-slate-800/80 border-slate-600',
        text: 'text-[#d1d5db]',
        icon: 'text-[#d1d5db]'
      };
  }
};

export const IdeaCard: React.FC<IdeaCardProps> = ({ idea, onVote, onAddComment }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [newComment, setNewComment] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleVoteClick = (voteType: 'up' | 'down') => {
    if (!user) {
      navigate('/signin', { state: { from: '/ideas' } });
      return;
    }
    onVote(idea.id, voteType);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/signin', { state: { from: '/ideas' } });
      return;
    }
    if (newComment.trim()) {
      const authorName = user.username;
      onAddComment(idea.id, newComment.trim(), authorName);
      setNewComment('');
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60));
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getVoteColor = (votes: number) => {
    if (votes > 15) return 'text-[#e5e7eb] font-bold';
    if (votes > 10) return 'text-[#b3b8c2] font-semibold';
    if (votes > 5) return 'text-[#a1a1aa]';
    if (votes < -5) return 'text-red-400';
    return 'text-[#bfc4cc]';
  };

  const categoryStyles = getCategoryStyles(idea.category);

  return (
    <div className="w-full h-full mb-8"> {/* Remove px-9 or px-3 */}
      <ScrollReveal>
        <AnimatedCard 
          className="cursor-pointer w-full h-full"
          onClick={() => setIsDialogOpen(true)}
        >
          <Card className="h-full p-8 bg-gradient-to-br from-slate-900/90 to-slate-800/80 border border-transparent shadow-xl flex flex-col rounded-3xl transition-transform duration-200 hover:scale-[1.025]">
            {/* Category Badge */}
            <div className="flex justify-end mb-3">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${categoryStyles.text} ${categoryStyles.bg}`}>
                {idea.category.charAt(0).toUpperCase() + idea.category.slice(1)}
              </span>
            </div>
            {/* Title */}
            <h3 className="text-2xl font-mono text-white mb-3 line-clamp-2 leading-snug">
              {idea.title}
            </h3>
            {/* Description */}
            <p className="text-base text-slate-300 mb-4 line-clamp-3 flex-grow font-serif">
              {idea.description}
            </p>
            {/* Footer */}
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-300">
                  {idea.user?.username || idea.author.split('@')[0]}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <SquareArrowUp className={`h-5 w-5 ${idea.votes > 0 ? 'text-green-400' : 'text-slate-500'}`} />
                <span className={`text-sm font-medium ${getVoteColor(idea.votes)}`}>
                  {idea.votes}
                </span>
              </div>
            </div>
          </Card>
        </AnimatedCard>
      </ScrollReveal>

      {/* Minimal Sleek Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gradient-to-br from-slate-950/95 to-slate-900/80 border border-slate-700 text-[#e5e7eb] max-w-xl max-h-[80vh] overflow-hidden flex flex-col rounded-2xl font-sans shadow-2xl">
          <DialogHeader className="border-b border-slate-800 pb-3">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-extrabold tracking-tight text-[#f1f2f6] font-sans">{idea.title}</DialogTitle>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-slate-700/60 to-slate-800/80 border border-slate-600 text-[#d1d5db] text-xs font-medium tracking-wide">
                <Tag className="h-3 w-3" />
                {idea.category}
              </span>
            </div>
            <DialogDescription className="text-[#bfc4cc] font-mono mt-1">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 opacity-70" />
                  <span>{idea.user?.username || idea.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 opacity-70" />
                  <span>{formatTimeAgo(idea.createdAt)}</span>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto py-4 pr-2 custom-scrollbar">
            <div className="grid grid-cols-1 gap-4">
              {/* Description */}
              <div className="bg-slate-900/70 p-5 rounded-xl border border-slate-800">
                <h3 className="text-base font-semibold mb-2 text-[#e5e7eb] font-sans">Description</h3>
                <p className="text-[#bfc4cc] leading-relaxed text-sm font-mono">
                  {idea.description}
                </p>
              </div>
              {/* Voting and Builder Button */}
              <div className="flex gap-4 items-stretch">
                {/* Voting */}
                <div className="flex-1 flex items-center gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVoteClick('down')}
                      className={`h-8 w-8 p-0 rounded-l-md ${
                        idea.userVote === 'down' 
                          ? 'bg-red-500/20 text-red-400' 
                          : 'hover:bg-slate-800 text-[#bfc4cc]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                    <span className={`px-3 font-bold text-lg ${getVoteColor(idea.votes)}`}>
                      {idea.votes}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVoteClick('up')}
                      className={`h-8 w-8 p-0 rounded-r-md ${
                        idea.userVote === 'up' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'hover:bg-slate-800 text-[#bfc4cc]'
                      }`}
                    >
                      <SquareArrowUp className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-xs text-[#bfc4cc] flex-1 text-right font-mono">
                    <div>{idea.votes > 0 ? 'Growing' : 'Needs votes'}</div>
                  </div>
                </div>
                {/* Find Builders Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('https://catalystplatform.com', '_blank')}
                  className="text-[#bfc4cc] border-slate-700 hover:bg-slate-800/60 font-semibold"
                >
                  <Users className="w-4 h-4 mr-1" />
                  Find Builders
                </Button>
              </div>
              {/* Comments Section */}
              <div className="mt-2 space-y-3">
                <h3 className="text-base font-semibold text-[#e5e7eb] font-sans">
                  Comments ({idea.comments.length})
                </h3>
                <form onSubmit={handleCommentSubmit} className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <Textarea
                    placeholder="Share your thoughts..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full min-h-[80px] bg-slate-900 border-slate-700 text-sm text-[#e5e7eb] focus:border-orange-400 font-mono"
                  />
                  <div className="flex justify-end mt-2">
                    <Button
                      type="submit"
                      size="sm"
                      className="bg-gradient-to-r from-[#bfc4cc] to-[#e5e7eb] text-slate-900 text-sm font-semibold"
                      disabled={!newComment.trim()}
                    >
                      Post Comment
                    </Button>
                  </div>
                </form>
                {idea.comments.length > 0 ? (
                  <div className="space-y-2">
                    {idea.comments.map((comment) => (
                      <div key={comment.id} className="bg-slate-900/70 p-3 rounded-lg border border-slate-800">
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="w-6 h-6 bg-gradient-to-r from-[#bfc4cc] to-[#e5e7eb] rounded-full flex items-center justify-center">
                            <User className="w-3 h-3 text-slate-900" />
                          </div>
                          <span className="font-medium text-sm text-[#e5e7eb] font-sans">
                            {comment.user?.username || comment.author}
                          </span>
                          <span className="text-xs text-[#bfc4cc] font-mono">
                            {formatTimeAgo(comment.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm text-[#bfc4cc] ml-8 font-mono">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 bg-slate-900/40 rounded-xl border border-dashed border-slate-800">
                    <MessageCircle className="w-8 h-8 mx-auto mb-2 text-[#bfc4cc]" />
                    <p className="text-sm text-[#bfc4cc] font-mono">No comments yet. Be the first to share your thoughts!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};