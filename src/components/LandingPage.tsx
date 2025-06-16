
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Rocket, Sparkles, TrendingUp, Users, Lightbulb } from 'lucide-react';
import { StarBackground } from './StarBackground';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden flex items-center">
      <StarBackground />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left column - Hero content */}
            <div className="space-y-8">
              <div className="inline-flex items-center rounded-full border border-slate-700 bg-slate-800/50 backdrop-blur-sm py-2 px-4 text-sm text-slate-300">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
                Idea validation platform for startups
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
                Validate your startup ideas <span className="text-orange-500">faster</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-400 leading-relaxed">
                Get honest feedback from a community of entrepreneurs and innovators. 
                Test concepts, refine strategies, and build what people actually want.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={onGetStarted}
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 text-white rounded-md font-medium px-6 transition-all"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <div className="flex items-center text-sm text-slate-400">
                  <span className="inline-block mr-2 bg-emerald-400/20 text-emerald-400 rounded-full px-2 py-1">
                    No signup required
                  </span>
                  <span className="inline-block bg-blue-400/20 text-blue-400 rounded-full px-2 py-1">
                    Free to use
                  </span>
                </div>
              </div>
            </div>
            
            {/* Right column - Features */}
            <div className="relative">
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-orange-500/10 rounded-full filter blur-3xl"></div>
              <div className="relative bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-8 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500"></div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-md flex items-center justify-center">
                    <Rocket className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Why YNotNow?</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="mt-1 w-8 h-8 bg-blue-500/20 rounded-md flex items-center justify-center">
                      <Lightbulb className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">Validate Ideas</h3>
                      <p className="text-slate-400 text-sm">Test concepts with real feedback before investing time and resources</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="mt-1 w-8 h-8 bg-green-500/20 rounded-md flex items-center justify-center">
                      <Users className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">Community Driven</h3>
                      <p className="text-slate-400 text-sm">Connect with like-minded entrepreneurs and innovators</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="mt-1 w-8 h-8 bg-purple-500/20 rounded-md flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">Track Progress</h3>
                      <p className="text-slate-400 text-sm">See which ideas resonate and gain traction over time</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-400">
                      <span className="text-white font-semibold">500+</span> ideas validated
                    </div>
                    <Button 
                      variant="ghost" 
                      className="text-orange-500 hover:text-orange-400 px-0"
                      onClick={onGetStarted}
                    >
                      Start validating
                      <Sparkles className="ml-2 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
