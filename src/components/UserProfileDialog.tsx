import React, { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Idea } from '@/pages/IdeasPage';
import { Badge } from '@/components/ui/badge';
import { Loader2, Settings, LogOut, Check, ExternalLink } from 'lucide-react';
import { PostIdeaForm } from './PostIdeaForm';

interface UserProfileDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UserProfileDialog: React.FC<UserProfileDialogProps> = ({ 
  isOpen, 
  onOpenChange 
}) => {
  const { user, logout } = useAuth();
  const [userIdeas, setUserIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [showIdeaForm, setShowIdeaForm] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  // Extract initials from user's email for avatar fallback
  const getInitials = (email: string) => {
    const name = email.split('@')[0];
    return name.substring(0, 2).toUpperCase();
  };

  // Fetch user's ideas
  useEffect(() => {
    const fetchUserIdeas = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const res = await fetch(`${backendUrl}/ideas`);
        const allIdeas = await res.json();
        
        // Filter ideas by the current user's email
        const filteredIdeas = allIdeas.filter((idea: Idea) => 
          idea.author.toLowerCase() === user.email.toLowerCase()
        );
        
        setUserIdeas(filteredIdeas);
      } catch (error) {
        console.error('Failed to fetch user ideas:', error);
        setUserIdeas([]);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchUserIdeas();
    }
  }, [isOpen, user]);

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border border-slate-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
            Your Profile
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col md:flex-row gap-6 py-4">
          {/* User Info Column */}
          <div className="flex flex-col items-center md:items-start gap-4 md:w-1/3">
            {/* Profile Image */}
            <div className="relative">
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full border-2 border-purple-500 shadow-lg shadow-purple-500/20"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-2xl font-bold">
                  {getInitials(user.email)}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-slate-900"></div>
            </div>
            
            {/* User Info */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-xl font-semibold text-white">
                {user.username || user.displayName || user.email.split('@')[0]}
              </h3>
              <p className="text-slate-400 text-sm">{user.email}</p>
            </div>
            
            {/* User Stats */}
            <div className="grid grid-cols-2 gap-2 w-full mt-2">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-purple-400">{userIdeas.length}</p>
                <p className="text-xs text-slate-400">Ideas</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-purple-400">
                  {userIdeas.reduce((total, idea) => total + idea.votes, 0)}
                </p>
                <p className="text-xs text-slate-400">Total Votes</p>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col gap-2 w-full mt-2">
          
              <Button 
                variant="outline" 
                size="sm" 
                className="border-slate-700 text-slate-800 hover:text-red-400 hover:border-red-900/50   hover:bg-black w-full justify-start"
                onClick={() => {
                  logout();
                  onOpenChange(false);
                }}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
          
          {/* User Ideas Column */}
          <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-slate-700 md:pl-6 pt-4 md:pt-0">
            <h3 className="text-lg font-semibold text-white mb-4">Your Ideas</h3>
            
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
              </div>
            ) : userIdeas.length === 0 ? (
             <div className="max-w-md mx-auto p-6">
  <div className="bg-slate-800/30 border border-slate-700 rounded-lg text-center p-6">
    <p className="text-slate-400 mb-4">You haven't posted any ideas yet.</p>
    <p
      
      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-md transition-colors duration-300"
    >
      What are you waiting for matcha? Get started with your first idea! 
    </p>
  </div>
</div>
            ) : (
              <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
                {userIdeas.map(idea => (
                  <div 
                    key={idea.id} 
                    className="bg-slate-800/30 border border-slate-700 hover:border-purple-500/30 rounded-lg p-4 transition-all"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-white">{idea.title}</h4>
                      <Badge 
                        className={
                          idea.category === 'startup' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 
                          idea.category === 'hackathon' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 
                          'bg-purple-500/20 text-purple-400 border-purple-500/30'
                        }
                      >
                        {idea.category.charAt(0).toUpperCase() + idea.category.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400 line-clamp-2 mb-3">
                      {idea.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${
                            idea.votes > 0 ? 'bg-green-500' : 
                            idea.votes < 0 ? 'bg-red-500' : 'bg-slate-400'
                          }`}></div>
                          <span className={`text-xs ${
                            idea.votes > 0 ? 'text-green-400' : 
                            idea.votes < 0 ? 'text-red-400' : 'text-slate-400'
                          }`}>
                            {idea.votes} votes
                          </span>
                        </div>
                        <span className="text-xs text-slate-500">
                          {new Date(idea.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-slate-400 hover:text-purple-400"
                        onClick={() => {
                          onOpenChange(false);
                          window.location.href = `/ideas/${idea.id}`;
                        }}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter className="border-t border-slate-700 pt-4">
          <div className="flex items-center text-xs text-slate-400">
            <Check className="w-3 h-3 mr-1 text-green-500" />
            Account in good standing
          </div>
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)}
            className="text-slate-400 hover:text-white"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};