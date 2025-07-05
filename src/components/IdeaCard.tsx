import React, { useState } from 'react';
import { ChevronUp, ChevronDown, MessageCircle, User, Clock, Flame, Heart, Users, Rocket, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
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

export const IdeaCard: React.FC<IdeaCardProps> = ({ idea, onVote, onAddComment }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [showComments, setShowComments] = useState(false);
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
      const authorName = user.username 
      onAddComment(idea.id, newComment.trim(), authorName);
      setNewComment('');
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() ) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const getVoteColor = (votes: number) => {
    if (votes > 15) return 'text-yellow-400 animate-pulse';
    if (votes > 10) return 'text-green-400';
    if (votes > 5) return 'text-blue-400';
    if (votes < -5) return 'text-red-400';
    return 'text-slate-400';
  };

  const getVoteIcon = (votes: number) => {
    if (votes > 15) return <Flame className="w-4 h-4 text-yellow-400" />;
    if (votes > 10) return <Heart className="w-4 h-4 text-green-400" />;
    return null;
  };

  return (
    <div className="w-full md:w-1/3 lg:w-1/3 p-2">
      <ScrollReveal>
        <AnimatedCard 
          className="cursor-pointer w-full h-[220px]"
          onClick={() => setIsDialogOpen(true)}
        >
          <Card className="idea-card h-full p-4 bg-slate-900/80 backdrop-blur-sm shadow-xl border border-slate-700 flex flex-col">
            {/* Category Badge */}
            <div className="mb-1">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-900/30 border border-green-500/30 text-green-400 text-xs font-medium">
                <Tag className="h-2.5 w-2.5" />
                {idea.category}
              </span>
            </div>
            
            {/* Title */}
            <h3 className="text-lg font-bold text-white leading-tight line-clamp-3">
              {idea.title}
            </h3>
            
            {/* Description preview */}
            <p className="text-xs text-slate-400 mt-1 line-clamp-2 flex-grow">
              {idea.description}
            </p>
            
            {/* Footer */}
            <div className="mt-auto pt-1 flex items-center justify-between text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <User className="w-3 h-3" />
                <span className="text-slate-300 text-xs">{idea.user?.username || idea.author}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <ChevronUp className={`w-3 h-3 ${idea.votes > 0 ? 'text-green-400' : 'text-slate-400'}`} />
                <span className={`font-semibold ${getVoteColor(idea.votes)}`}>{idea.votes}</span>
              </div>
            </div>
          </Card>
        </AnimatedCard>
      </ScrollReveal>

      {/* Detailed Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-slate-900 border border-slate-700 text-white max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          {/* Fixed Header */}
          <DialogHeader className="border-b border-slate-700 pb-4">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold">{idea.title}</DialogTitle>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-900/30 border border-green-500/30 text-green-400 text-xs font-medium">
                <Tag className="h-3 w-3" />
                {idea.category}
              </span>
            </div>
            <DialogDescription className="text-slate-300">
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{idea.user?.username || idea.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{formatTimeAgo(idea.createdAt)}</span>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto py-4 pr-2 custom-scrollbar">
            <div className="grid grid-cols-1 gap-4">
              {/* Description */}
              <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
                <h3 className="text-base font-semibold mb-2">Description</h3>
                <p className="text-slate-300 leading-relaxed text-sm">
                  {idea.description}
                </p>
              </div>
              
              {/* Voting and Builder Button */}
              <div className="flex gap-4 items-stretch">
                {/* Voting */}
                <div className="flex-1 flex items-center gap-3 bg-slate-800/30 p-3 rounded-xl border border-slate-700">
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVoteClick('down')}
                      className={`h-8 w-8 p-0 rounded-l-md ${
                        idea.userVote === 'down' 
                          ? 'bg-red-500/20 text-red-400' 
                          : 'hover:bg-slate-700 text-slate-400'
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
                          : 'hover:bg-slate-700 text-slate-400'
                      }`}
                    >
                      <ChevronUp className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="text-xs text-slate-400 flex-1 text-right">
                    <div>{idea.votes > 0 ? 'Growing' : 'Needs votes'}</div>
                  </div>
                </div>
                
                {/* Find Builders Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('https://catalystplatform.com', '_blank')}
                  className="text-purple-400 border-purple-500/30 hover:bg-purple-950/30"
                >
                  <Users className="w-4 h-4 mr-1" />
                  Find Builders
                </Button>
              </div>
              
              {/* Comments Section */}
              <div className="mt-2 space-y-3">
                <h3 className="text-base font-semibold">
                  Comments ({idea.comments.length})
                </h3>
                
                <form onSubmit={handleCommentSubmit} className="bg-slate-800/30 p-3 rounded-xl border border-slate-700">
                  <Textarea
                    placeholder="Share your thoughts..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full min-h-[80px] bg-slate-800 border-slate-600 text-sm text-white focus:border-orange-400"
                  />
                  <div className="flex justify-end mt-2">
                    <Button
                      type="submit"
                      size="sm"
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-sm"
                      disabled={!newComment.trim()}
                    >
                      Post Comment
                    </Button>
                  </div>
                </form>
                
                {idea.comments.length > 0 ? (
                  <div className="space-y-2">
                    {idea.comments.map((comment) => (
                      <div key={comment.id} className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <User className="w-3 h-3 text-white" />
                          </div>
                          <span className="font-medium text-sm text-white">
                            {comment.user?.username || comment.author}
                          </span>
                          <span className="text-xs text-slate-500">
                            {formatTimeAgo(comment.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm text-slate-300 ml-8">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 bg-slate-800/20 rounded-xl border border-dashed border-slate-700">
                    <MessageCircle className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                    <p className="text-sm text-slate-400">No comments yet. Be the first to share your thoughts!</p>
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