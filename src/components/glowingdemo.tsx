"use client";

import { 
  Brain, 
  Users, 
  Award, 
  TrendingUp, 
  Rocket, 
  Sparkles,
  MessageSquare,
  Code,
  PenTool,
  HandCoins
} from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

// Import all images
import ynn7Image from '../assets/ynn7.jpeg';
import f1Image from '../assets/f1.jpg';
import leaderboardImage from '../assets/leaderboard.jpeg';
import ynn6Image from '../assets/ynn6.jpeg';
import ynn5Image from '../assets/ynn5.jpeg';
// For external URLs, we can keep as strings
const catalystImage = "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1000&auto=format&fit=crop";

export function GlowingEffectDemo() {
  return (
    <div className="py-16 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950">
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <div className="text-center mb-3">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300 text-sm font-medium mb-4">
            Platform Features
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
          <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent drop-shadow-sm">
            Why Validate with 
          </span>
          <span className="bg-gradient-to-r from-purple-400 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent ml-2 drop-shadow">
            YNotNow
          </span>
        </h2>
        <p className="text-purple-300/80 text-center max-w-3xl mx-auto text-lg">
          The ultimate platform for validating your hackathon projects and startup ideas through
          AI-powered analysis and community feedback.
        </p>
      </div>
      
      <ul className="grid grid-cols-1 grid-rows-none gap-6 md:grid-cols-12 md:grid-rows-3 lg:gap-6 xl:max-h-[42rem] xl:grid-rows-2 max-w-7xl mx-auto px-4">
        <GridItem
          area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
          icon={<Brain className="h-6 w-6 text-purple-400" />}
          title="AI-Powered Validation"
          description="Get instant market analysis, competition research, and feasibility scores for your ideas powered by advanced AI models."
          imageUrl={f1Image}
        />

        <GridItem
          area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
          icon={<Users className="h-6 w-6 text-fuchsia-400" />}
          title="Catalyst is Here"
          description="Get connected with you fellow devs and builder to bring your idea to life."
          imageUrl={ynn7Image}
       />

        <GridItem
          area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
          icon={<Award className="h-6 w-6 text-pink-400" />}
          title="Weekly Leaderboards"
          description="The best ideas rise to the top! Get featured on our weekly leaderboards for maximum exposure and validation from peers."
          imageUrl={leaderboardImage}
        />

        <GridItem
          area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
          icon={<MessageSquare className="h-6 w-6 text-purple-400" />}
          title="Peer Review & Comments"
          description="Receive detailed feedback and suggestions to improve your idea from our community of hackers and founders."
          imageUrl={ynn6Image}
        />

        <GridItem
          area="md:[grid-area:3/1/4/7] xl:[grid-area:2/8/3/11]"
          icon={<PenTool className="h-6 w-6 text-fuchsia-400" />}
          title="AI Content Assistance"
          description="Struggling to explain your idea? Our AI helps draft compelling descriptions and pitch content for your innovations."
          imageUrl={ynn5Image}
        />
        
        <GridItem
          area="md:[grid-area:3/7/4/13] xl:[grid-area:2/11/3/13]"
          icon={<HandCoins className="h-6 w-6 text-pink-400" />}
          title="Saksham-AI (Coming Soon)"
          description="Build Your Ideas with the best and appropriate Tech Stack. "
          imageUrl={catalystImage}
        />
      </ul>
    </div>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  imageUrl: string;
}

const GridItem = ({ area, icon, title, description, imageUrl }: GridItemProps) => {
  return (
    <li className={`min-h-[16rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border border-purple-800/40 p-2 md:rounded-3xl md:p-3 bg-slate-900/80 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-500">
        <GlowingEffect
          spread={60}
          glow={true}
          disabled={false}
          proximity={100}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 shadow-lg">
          {/* Background image - UPDATED FOR BETTER VISIBILITY */}
          <div className="absolute inset-0">
            <img 
              src={imageUrl}
              className="absolute w-full h-full object-cover" 
              style={{ mixBlendMode: 'overlay' }}
              alt={`${title} background`}
              loading="lazy" // Add lazy loading for performance
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-slate-900/70" />
          </div>
          
          <div className="relative flex flex-1 flex-col justify-between gap-4 z-10">
            <div className="w-fit rounded-lg bg-gradient-to-br from-purple-900/80 to-slate-900/90 p-3 shadow-inner border border-purple-700/30">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 font-sans text-xl font-bold tracking-tight md:text-2xl bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                {title}
              </h3>
              <p className="font-sans text-sm text-purple-200/80 md:text-base leading-relaxed">
                {description}
              </p>
            </div>
          </div>
          
          <div className="absolute bottom-3 right-3 opacity-30 z-10">
            <Sparkles className="h-5 w-5 text-purple-400" />
          </div>
        </div>
      </div>
    </li>
  );
};
