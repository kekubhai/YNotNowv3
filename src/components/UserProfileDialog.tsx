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
import { Loader2, LogOut, Check, ExternalLink, User } from 'lucide-react';

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
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getInitials = (email: string) => {
    const name = email.split('@')[0];
    return name.substring(0, 2).toUpperCase();
  };

  useEffect(() => {
    const fetchUserIdeas = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const res = await fetch(`${backendUrl}/ideas`);
        const allIdeas = await res.json();
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
      <DialogContent className="bg-gradient-to-br from-slate-900 via-slate-950 to-purple-950 border border-purple-700/40 text-white max-w-2xl shadow-2xl rounded-3xl p-0 overflow-hidden">
        <DialogHeader className="border-b border-purple-700/30 px-8 py-6">
          <DialogTitle className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 tracking-tight flex items-center gap-3">
            <User className="w-8 h-8 text-purple-400" />
            Profile Overview
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col md:flex-row gap-8 px-8 pb-8">
          {/* User Info Column */}
          <div className="flex flex-col items-center md:items-start gap-6 md:w-1/3">
            {/* Profile Image */}
            <div className="relative">
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="w-28 h-28 rounded-full border-4 border-purple-500 shadow-xl object-cover"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-3xl font-extrabold shadow-xl">
                  {getInitials(user.email)}
                </div>
              )}
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-slate-950 shadow-md"></div>
            </div>
            {/* User Info */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {user.username || user.displayName || user.email.split('@')[0]}
              </h3>
              <p className="text-slate-400 text-sm font-mono">{user.email}</p>
            </div>
            {/* User Stats */}
            <div className="flex gap-4 w-full mt-2">
              <div className="flex-1 bg-gradient-to-r from-purple-800/40 to-slate-800/60 border border-purple-700/30 rounded-xl p-4 text-center shadow">
                <p className="text-3xl font-extrabold text-purple-300">{userIdeas.length}</p>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Ideas</p>
              </div>
              <div className="flex-1 bg-gradient-to-r from-orange-800/40 to-slate-800/60 border border-orange-700/30 rounded-xl p-4 text-center shadow">
                <p className="text-3xl font-extrabold text-orange-300">
                  {userIdeas.reduce((total, idea) => total + idea.votes, 0)}
                  </p>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Votes</p>
              </div>
            </div>
            {/* Actions */}
            <div className="flex flex-col gap-2 w-full mt-4">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-purple-700/40 text-white hover:text-red-400 hover:border-red-900/50 hover:bg-black w-full font-semibold transition-all"
                onClick={() => {
                  logout();
                  onOpenChange(false);
                }}
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sign Out(But Why Man?)
              </Button>
            </div>
          </div>
          {/* User Ideas Column */}
          <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-purple-700/30 md:pl-8 pt-6 md:pt-0">
            <h3 className="text-xl font-bold text-white mb-4 tracking-tight">Your Ideas</h3>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
              </div>
            ) : userIdeas.length === 0 ? (
              <div className="max-w-md mx-auto p-6">
                <div className="bg-gradient-to-r from-purple-700/10 to-slate-800/40 border border-purple-700/30 rounded-xl text-center p-8 shadow">
                  <p className="text-slate-300 mb-4 text-lg font-medium">You haven't posted any ideas yet.</p>
                  <p className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-5 py-2 rounded-lg font-semibold shadow transition-colors duration-300">
                    Ready to share your first idea? Start now!
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
                {userIdeas.map(idea => (
                  <div 
                    key={idea.id} 
                    className="bg-gradient-to-r from-slate-800/60 to-purple-900/30 border border-purple-700/30 hover:border-purple-400/50 rounded-xl p-5 transition-all shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-white text-lg">{idea.title}</h4>
                      <Badge 
                        className={
                          idea.category === 'startup' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' : 
                          idea.category === 'hackathon' ? 'bg-green-500/20 text-green-300 border-green-500/30' : 
                          'bg-purple-500/20 text-purple-300 border-purple-500/30'
                        }
                      >
                        {idea.category.charAt(0).toUpperCase() + idea.category.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-base text-slate-300 mb-3 font-medium line-clamp-2">
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
                          } font-semibold`}>
                            {idea.votes} votes
                          </span>
                        </div>
                        <span className="text-xs text-slate-500 font-mono">
                          {new Date(idea.createdAt).toLocaleDateString('en-GB')}
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
        <DialogFooter className="border-t border-purple-700/30 pt-4 px-8 pb-6 flex justify-between items-center">
          <div className="flex items-center text-sm text-green-400 font-semibold gap-2">
            <Check className="w-4 h-4" />
            Account in good standing
          </div>
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)}
            className="text-slate-400 hover:text-white font-semibold"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};