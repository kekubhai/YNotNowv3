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
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
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
        <DialogContent className="bg-slate-900 border border-slate-700 text-white w-full max-w-4xl">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold">{idea.title}</DialogTitle>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-900/30 border border-green-500/30 text-green-400 text-xs font-medium">
                <Tag className="h-3 w-3" />
                {idea.category}
              </span>
            </div>
            <DialogDescription className="text-slate-300">
              <div className="flex items-center gap-4 mt-2 mb-4">
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Description */}
            <div className="md:col-span-2 bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-slate-300 leading-relaxed">
                {idea.description}
              </p>
            </div>
            
            {/* Right Column - Voting and Comments */}
            <div className="space-y-6">
              {/* Voting */}
              <div className="flex flex-col items-center gap-4 bg-slate-800/30 p-4 rounded-xl border border-slate-700">
                <div className="flex flex-col items-center">
                  <span className={`font-bold text-3xl ${getVoteColor(idea.votes)}`}>
                    {idea.votes}
                  </span>
                  <span className="text-xs text-slate-400 mb-4">votes</span>
                </div>
                
                <div className="flex gap-4 w-full justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleVoteClick('up')}
                    className={`vote-button p-3 rounded-xl transition-all duration-200 ${
                      idea.userVote === 'up' 
                        ? 'bg-green-500/20 text-green-400 border border-green-400/30' 
                        : 'hover:bg-slate-700 text-slate-400 hover:text-green-400'
                    }`}
                  >
                    <ChevronUp className="w-6 h-6" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleVoteClick('down')}
                    className={`vote-button p-3 rounded-xl transition-all duration-200 ${
                      idea.userVote === 'down' 
                        ? 'bg-red-500/20 text-red-400 border border-red-400/30' 
                        : 'hover:bg-slate-700 text-slate-400 hover:text-red-400'
                    }`}
                  >
                    <ChevronDown className="w-6 h-6" />
                  </Button>
                </div>
              </div>
              
              {/* Comments Preview */}
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <h3 className="text-lg font-semibold mb-3">
                  Comments ({idea.comments.length})
                </h3>
                
                {idea.comments.length > 0 ? (
                  <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
                    {idea.comments.slice(0, 3).map((comment) => (
                      <div key={comment.id} className="bg-slate-800/70 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <User className="w-3 h-3 text-white" />
                          </div>
                          <span className="font-semibold text-sm text-white">
                            {comment.user?.username || comment.author}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 line-clamp-2">{comment.content}</p>
                      </div>
                    ))}
                    {idea.comments.length > 3 && (
                      <div className="text-center text-xs text-slate-400 mt-2">
                        +{idea.comments.length - 3} more comments
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-slate-400">No comments yet</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Full Comments Section */}
          <div className="mt-6 space-y-4">
            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <Textarea
                placeholder="Share your thoughts..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full min-h-[100px] bg-slate-800 border-slate-600 text-white focus:border-orange-400"
              />
              <div className="flex justify-between items-center">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium"
                  disabled={!newComment.trim()}
                >
                  Post Comment
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('https://catalystplatform.com', '_blank')}
                  className="text-purple-400 border-purple-500/30 hover:bg-purple-950/30"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Find Builders
                </Button>
              </div>
            </form>
            
            {idea.comments.length > 0 && (
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {idea.comments.map((comment) => (
                  <div key={comment.id} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-semibold text-white">
                        {comment.user?.username || comment.author}
                      </span>
                      <span className="text-xs text-slate-500">
                        {formatTimeAgo(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-slate-300 ml-11">{comment.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};