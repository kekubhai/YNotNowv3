
import React from 'react';
import { Button } from '@/components/ui/button';
import { Lightbulb, Sparkles, TrendingUp } from 'lucide-react';
import { StarBackground } from './StarBackground';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden flex items-center justify-center">
      <StarBackground />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-600/50">
            <Lightbulb className="w-10 h-10 text-white" />
          </div>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            YNotNow
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-2xl mx-auto leading-relaxed">
          Turn your startup dreams into reality
        </p>
        
        <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
          Share your innovative ideas and get honest feedback from a community of entrepreneurs, 
          dreamers, and validators. Discover what works, what doesn't, and what could change the world.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <div className="flex items-center gap-3 text-gray-300">
            <Sparkles className="w-6 h-6 text-green-400" />
            <span>Validate Ideas</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <TrendingUp className="w-6 h-6 text-green-400" />
            <span>Get Feedback</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <Lightbulb className="w-6 h-6 text-green-400" />
            <span>Build Better</span>
          </div>
        </div>
        
        <Button
          onClick={onGetStarted}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-xl px-12 py-6 rounded-full font-semibold shadow-lg shadow-green-600/30 hover:shadow-green-600/50 transition-all duration-300 transform hover:scale-105"
        >
          Get Started
          <Sparkles className="w-6 h-6 ml-2" />
        </Button>
        
        <p className="text-gray-500 mt-8 text-sm">
          No signup required • Free forever • Community driven
        </p>
      </div>
    </div>
  );
};
