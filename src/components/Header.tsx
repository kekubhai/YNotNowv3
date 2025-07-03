import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Zap, Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { UserProfileDialog } from './UserProfileDialog';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);

  // Extract initials from user's email for avatar fallback
  const getInitials = (email: string) => {
    const name = email.split('@')[0];
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <>
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 py-3 sticky top-0 z-50 w-full">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <h1 className="font-bold text-white">
                  YNotNow
                </h1>
                <p className="text-sm text-slate-400">Validate your startup ideas</p>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="/" className="text-slate-400 hover:text-orange-400 transition-colors flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Ideas
              </a>
              <a href="/leaderboard" className="text-slate-400 hover:text-orange-400 transition-colors">
                Top Rated
              </a>
              <a href="/about" className="text-slate-400 hover:text-orange-400 transition-colors">
                About
              </a>
              
              {!user ? (
                <>
                  <Button variant="ghost" className="text-orange-400" onClick={() => navigate('/signin')}>Sign In</Button>
                  <Button variant="outline" className="text-orange-400 border-orange-400" onClick={() => navigate('/signup')}>Sign Up</Button>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  {/* Profile Image Button */}
                  <button 
                    onClick={() => setProfileDialogOpen(true)}
                    className="focus:outline-none group"
                  >
                    <div className="relative">
                      {user.photoURL ? (
                        <img 
                          src={user.photoURL} 
                          alt="Profile" 
                          className="w-10 h-10 rounded-full border-2 border-transparent group-hover:border-orange-500 transition-all"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white text-sm font-bold border-2 border-transparent group-hover:border-orange-500 transition-all">
                          {getInitials(user.email)}
                        </div>
                      )}
                      <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 w-3 h-3 rounded-full border-2 border-slate-900"></div>
                    </div>
                  </button>
                </div>
              )}
            </nav>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 py-4 absolute w-full z-40">
          <div className="container mx-auto px-4 flex flex-col gap-4">
            <a href="/" className="text-slate-200 py-2 px-3 hover:bg-slate-800 rounded-md flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Ideas
            </a>
            <a href="/leaderboard" className="text-slate-200 py-2 px-3 hover:bg-slate-800 rounded-md">
              Top Rated
            </a>
            <a href="/about" className="text-slate-200 py-2 px-3 hover:bg-slate-800 rounded-md">
              About
            </a>
            
            {!user ? (
              <div className="flex flex-col gap-2 mt-2 border-t border-slate-800 pt-4">
                <Button variant="outline" onClick={() => navigate('/signin')}>Sign In</Button>
                <Button className="bg-gradient-to-r from-orange-500 to-red-500" onClick={() => navigate('/signup')}>Sign Up</Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 mt-2 border-t border-slate-800 pt-4">
                <div className="flex items-center gap-3 py-2 px-3">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt="Profile" 
                      className="w-10 h-10 rounded-full border border-slate-700"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white text-sm font-bold">
                      {getInitials(user.email)}
                    </div>
                  )}
                  <div>
                    <p className="text-white font-medium">{user.displayName || user.email.split('@')[0]}</p>
                    <p className="text-slate-400 text-xs">{user.email}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="mt-2" 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setProfileDialogOpen(true);
                  }}
                >
                  View Profile
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-red-400 hover:bg-red-900/20 hover:text-red-300 mt-1" 
                  onClick={() => logout()}
                >
                  Sign Out
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* User Profile Dialog */}
      <UserProfileDialog 
        isOpen={profileDialogOpen}
        onOpenChange={setProfileDialogOpen}
      />
    </>
  );
};
