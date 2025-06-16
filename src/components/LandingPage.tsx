
import React from 'react';
import { Button } from '@/components/ui/button';
import { Rocket, Sparkles, TrendingUp, Users, Lightbulb, Star } from 'lucide-react';
import { StarBackground } from './StarBackground';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden flex items-center justify-center">
      <StarBackground />
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/50 animate-pulse">
            <Rocket className="w-12 h-12 text-white" />
          </div>
        </div>
        
        <h1 className="text-7xl md:text-8xl font-black text-white mb-6 tracking-tight">
          <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
            YNotNow
          </span>
        </h1>
        
        <p className="text-2xl md:text-3xl text-slate-300 mb-6 font-light max-w-3xl mx-auto leading-relaxed">
          Turn your <span className="text-orange-400 font-semibold">startup dreams</span> into reality
        </p>
        
        <p className="text-lg text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          Share your innovative ideas and get honest feedback from a community of entrepreneurs, 
          dreamers, and validators. Discover what works, what doesn't, and what could change the world.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/50 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Validate Ideas</h3>
            <p className="text-slate-400">Test your concepts with real feedback from the community</p>
          </div>
          
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/50 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Community Driven</h3>
            <p className="text-slate-400">Connect with like-minded entrepreneurs and innovators</p>
          </div>
          
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/50 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Track Success</h3>
            <p className="text-slate-400">See which ideas resonate and climb the leaderboard</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-6">
          <Button
            onClick={onGetStarted}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-xl px-12 py-6 rounded-full font-bold shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 border-0"
          >
            <Star className="w-6 h-6 mr-3" />
            Get Started
            <Sparkles className="w-6 h-6 ml-3" />
          </Button>
          
          <div className="flex items-center gap-8 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>No signup required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Free forever</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Community driven</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
