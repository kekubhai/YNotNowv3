import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, ExternalLink, Sparkles, Rocket } from 'lucide-react';

export const CatalystBanner: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-purple-500/20 bg-gradient-to-r from-slate-900 via-purple-950/30 to-slate-900">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full -translate-x-10 -translate-y-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-500/5 rounded-full translate-x-10 translate-y-20 blur-3xl"></div>
      
      <div className="px-6 py-8 md:p-10 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/40 border border-purple-500/30">
              <Sparkles className="h-3.5 w-3.5 text-purple-400" />
              <span className="text-xs font-medium text-purple-300">Coming Soon</span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Turn Your Validated Ideas Into Reality
            </h3>
            
            <p className="text-slate-300 leading-relaxed">
              Ready to build? Catalyst connects idea creators with talented developers, 
              designers, and other builders who can help bring your vision to life. 
              Find the perfect team based on skills, experience, and availability.
            </p>
            
            <div className="flex flex-wrap gap-3 pt-2">
              {['Skilled Developers', 'UI/UX Designers', 'Product Managers', 'Marketing Experts'].map((skill) => (
                <span key={skill} className="text-xs bg-slate-800/70 text-slate-300 px-3 py-1.5 rounded-full border border-slate-700/50">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row md:flex-col gap-3">
            <Button 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white min-w-[180px]"
              onClick={() => window.open('https://catalystplatform.com', '_blank')}
            >
              <Users className="w-4 h-4 mr-2" />
              Find Builders
            </Button>
            
            <Button 
              variant="outline" 
              className="border-purple-500/30 text-purple-300 hover:bg-purple-900/20 min-w-[180px]"
              onClick={() => window.open('https://catalystplatform.com/join', '_blank')}
            >
              <Rocket className="w-4 h-4 mr-2" />
              Join as a Builder
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};