
import React, { useState } from 'react';
import { ChevronUp, ChevronDown, MessageCircle, User, Clock, Flame, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import type { Idea } from '../pages/Index';

interface IdeaCardProps {
  idea: Idea;
  onVote: (ideaId: string, voteType: 'up' | 'down') => void;
  onAddComment: (ideaId: string, content: string, author: string) => void;
}

export const IdeaCard: React.FC<IdeaCardProps> = ({ idea, onVote, onAddComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [commenterName, setCommenterName] = useState('');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && commenterName.trim()) {
      onAddComment(idea.id, newComment.trim(), commenterName.trim());
      setNewComment('');
      setCommenterName('');
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
    <Card className="idea-card p-6 bg-slate-900/80 backdrop-blur-sm shadow-xl hover:shadow-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300">
      <div className="flex gap-4">
        {/* Vote Section */}
        <div className="flex flex-col items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onVote(idea.id, 'up')}
            className={`vote-button p-3 rounded-xl transition-all duration-200 ${
              idea.userVote === 'up' 
                ? 'bg-green-500/20 text-green-400 border border-green-400/30' 
                : 'hover:bg-slate-700 text-slate-400 hover:text-green-400'
            }`}
          >
            <ChevronUp className="w-6 h-6" />
          </Button>
          
          <div className="flex flex-col items-center gap-1">
            <span className={`font-bold text-xl ${getVoteColor(idea.votes)}`}>
              {idea.votes}
            </span>
            {getVoteIcon(idea.votes)}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onVote(idea.id, 'down')}
            className={`vote-button p-3 rounded-xl transition-all duration-200 ${
              idea.userVote === 'down' 
                ? 'bg-red-500/20 text-red-400 border border-red-400/30' 
                : 'hover:bg-slate-700 text-slate-400 hover:text-red-400'
            }`}
          >
            <ChevronDown className="w-6 h-6" />
          </Button>
        </div>

        {/* Content Section */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-bold text-white leading-tight hover:text-orange-400 transition-colors">
              {idea.title}
            </h3>
          </div>
          
          <p className="text-slate-300 mb-6 leading-relaxed text-base">
            {idea.description}
          </p>
          
          <div className="flex items-center justify-between text-sm text-slate-500">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-full">
                <User className="w-4 h-4" />
                <span className="text-slate-300">{idea.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{formatTimeAgo(idea.createdAt)}</span>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-2 text-slate-400 hover:text-orange-400 transition-colors bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-full"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{idea.comments.length} comments</span>
            </Button>
          </div>

          {/* Comments Section */}
          {showComments && (
            <div className="mt-6 border-t border-slate-700 pt-6">
              {idea.comments.length > 0 && (
                <div className="space-y-4 mb-6">
                  {idea.comments.map((comment) => (
                    <div key={comment.id} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold text-white">
                          {comment.author}
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
              
              <form onSubmit={handleSubmitComment} className="space-y-4">
                <div className="flex gap-3">
                  <Input
                    placeholder="Your name"
                    value={commenterName}
                    onChange={(e) => setCommenterName(e.target.value)}
                    className="w-36 bg-slate-800 border-slate-600 text-white focus:border-orange-400"
                  />
                  <Textarea
                    placeholder="Share your thoughts..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1 min-h-[80px] bg-slate-800 border-slate-600 text-white focus:border-orange-400"
                  />
                </div>
                <Button 
                  type="submit" 
                  size="sm"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium"
                  disabled={!newComment.trim() || !commenterName.trim()}
                >
                  Post Comment
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
