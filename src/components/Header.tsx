import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Zap, Menu, X, Users } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { UserProfileDialog } from './UserProfileDialog';
import { ExternalLink } from 'lucide-react';
import { AnimatedButton } from './ui/animated-button';
import { ScrollReveal } from './ui/scroll-reveal';
import logo from '@/assets/logo.png';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);

  const getInitials = (email: string) => {
    const name = email.split('@')[0];
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <ScrollReveal>
      <header className="sticky top-0 z-50">
        {/* Container with max-width and centered */}
        <div className="max-w-2xl mx-auto px-4 py-2">
          {/* Header with rounded borders */}
          <div className="bg-slate-900/80 backdrop-blur-md border border-neutral-50 rounded-full shadow-lg">
            <div className="flex items-center justify-between px-6 py-2">
              {/* Logo Section */}
              <div className="flex items-center gap-2">
                <div className="zoom-in-200 p-1.5 rounded-lg bg-slate-800/50">
                  <img src={logo} alt="Logo" className="size-8 text-white" />
                </div>
                <div className="flex flex-col">
                  <h1 className="font-bold text-white text-sm">YNotNow</h1>
                  <p className="text-xs text-slate-400">Validate your ideas</p>
                </div>
              </div>
              
              {/* Desktop Menu */}
              <nav className="hidden md:flex items-center gap-4">
                <a href="/" className="text-slate-100 hover:text-orange-400 transition-colors flex items-center gap-1 text-md">
                  <Zap className="w-3 h-3" />
                  Ideas
                </a>
                <a href="/leaderboard" className="text-slate-100 hover:text-orange-400 transition-colors text-md">
                  Top Rated
                </a>
                <a href="https://anirban-three.vercel.app/" className="text-slate-100 hover:text-orange-400 transition-colors text-md">
                  The Dev
                </a>
                
                <a 
                  href="https://catalyst.ynotnow.pro" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-100 hover:text-purple-400 transition-colors flex items-center gap-1 text-md"
                >
                  Catalyst
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
                
                {!user ? (
                  <div className="flex items-center gap-2 ml-2">
                    <Button 
                      variant="ghost" 
                      className="text-orange-400 h-8 px-3 text-sm" 
                      onClick={() => navigate('/signin')}
                    >
                      Sign In
                    </Button>
                    <Button 
                      variant="outline" 
                      className="text-orange-400 border-orange-400 h-8 px-3 text-sm" 
                      onClick={() => navigate('/signup')}
                    >
                      Sign Up
                    </Button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setProfileDialogOpen(true)}
                    className="focus:outline-none group ml-2"
                  >
                    <div className="relative">
                      {user.photoURL ? (
                        <img 
                          src={user.photoURL} 
                          alt="Profile" 
                          className="w-8 h-8 rounded-full border border-transparent group-hover:border-orange-500 transition-all"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white text-xs font-bold border border-transparent group-hover:border-orange-500 transition-all">
                          {getInitials(user.email)}
                        </div>
                      )}
                      <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 w-2 h-2 rounded-full border border-slate-900"></div>
                    </div>
                  </button>
                )}
              </nav>
              
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden text-white p-1 rounded-md hover:bg-slate-800 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border border-slate-800 rounded-lg mx-4 mt-2 shadow-xl absolute w-[calc(100%-2rem)] z-40">
            <div className="flex flex-col gap-1 p-2">
              <a 
                href="/" 
                className="text-slate-200 py-2 px-3 hover:bg-slate-800 rounded-md flex items-center gap-2 text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Zap className="w-4 h-4" />
                Ideas
              </a>
              <a 
                href="/leaderboard" 
                className="text-slate-200 py-2 px-3 hover:bg-slate-800 rounded-md text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Top Rated
              </a>
              <a 
                href="/about" 
                className="text-slate-200 py-2 px-3 hover:bg-slate-800 rounded-md text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              
              <a 
                href="https://catalystplatform.com" 
                target="_blank"
                rel="noopener noreferrer" 
                className="text-slate-200 py-2 px-3 hover:bg-slate-800 rounded-md flex items-center gap-2 text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Users className="w-4 h-4" />
                Find Builders
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
              
              {!user ? (
                <div className="flex flex-col gap-2 mt-1 border-t border-slate-800 pt-3 px-1 pb-1">
                  <Button 
                    variant="outline" 
                    className="h-9 text-sm" 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/signin');
                    }}
                  >
                    Sign In
                  </Button>
                  <Button 
                    className="h-9 bg-gradient-to-r from-orange-500 to-red-500 text-sm"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/signup');
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 mt-1 border-t border-slate-800 pt-3 px-1 pb-1">
                  <div className="flex items-center gap-3 py-2 px-3">
                    {user.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt="Profile" 
                        className="w-8 h-8 rounded-full border border-slate-700"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white text-xs font-bold">
                        {getInitials(user.username)}
                      </div>
                    )}
                    <div>
                      <p className="text-white font-medium text-sm">{user.displayName || user.email.split('@')[0]}</p>
                      <p className="text-slate-400 text-xs">{user.email}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="h-9 text-sm" 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setProfileDialogOpen(true);
                    }}
                  >
                    View Profile
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="h-9 text-red-400 hover:bg-red-900/20 hover:text-red-300 text-sm" 
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
      </header>
    </ScrollReveal>
  );
};