
import React, { useState } from 'react';
import { ChevronUp, ChevronDown, MessageCircle, User, Clock } from 'lucide-react';
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
    if (votes > 10) return 'text-green-400';
    if (votes < -5) return 'text-red-400';
    return 'text-gray-400';
  };

  return (
    <Card className="idea-card p-6 bg-gray-800 shadow-sm hover:shadow-md border border-gray-700">
      <div className="flex gap-4">
        {/* Vote Section */}
        <div className="flex flex-col items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onVote(idea.id, 'up')}
            className={`vote-button p-2 rounded-lg ${
              idea.userVote === 'up' 
                ? 'bg-green-900 text-green-400' 
                : 'hover:bg-gray-700 text-gray-400'
            }`}
          >
            <ChevronUp className="w-5 h-5" />
          </Button>
          
          <span className={`font-bold text-lg ${getVoteColor(idea.votes)}`}>
            {idea.votes}
          </span>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onVote(idea.id, 'down')}
            className={`vote-button p-2 rounded-lg ${
              idea.userVote === 'down' 
                ? 'bg-red-900 text-red-400' 
                : 'hover:bg-gray-700 text-gray-400'
            }`}
          >
            <ChevronDown className="w-5 h-5" />
          </Button>
        </div>

        {/* Content Section */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-semibold text-white leading-tight">
              {idea.title}
            </h3>
          </div>
          
          <p className="text-gray-300 mb-4 leading-relaxed">
            {idea.description}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{idea.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{formatTimeAgo(idea.createdAt)}</span>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-1 text-gray-400 hover:text-green-400"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{idea.comments.length} comments</span>
            </Button>
          </div>

          {/* Comments Section */}
          {showComments && (
            <div className="mt-6 border-t border-gray-700 pt-4">
              {idea.comments.length > 0 && (
                <div className="space-y-3 mb-4">
                  {idea.comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-700 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm text-white">
                          {comment.author}
                        </span>
                        <span className="text-xs text-gray-400">
                          {formatTimeAgo(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{comment.content}</p>
                    </div>
                  ))}
                </div>
              )}
              
              <form onSubmit={handleSubmitComment} className="space-y-3">
                <div className="flex gap-3">
                  <Input
                    placeholder="Your name"
                    value={commenterName}
                    onChange={(e) => setCommenterName(e.target.value)}
                    className="w-32 bg-gray-700 border-gray-600 text-white"
                  />
                  <Textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1 min-h-[80px] bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <Button 
                  type="submit" 
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
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
