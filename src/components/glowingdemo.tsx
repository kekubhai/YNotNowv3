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
          bgPattern="neural"
        />

        <GridItem
          area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
          icon={<Users className="h-6 w-6 text-fuchsia-400" />}
          title="Community Intelligence"
          description="Tap into our engaged community of developers, designers and entrepreneurs for real feedback and votes on your ideas."
          bgPattern="circles"
        />

        <GridItem
          area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
          icon={<Award className="h-6 w-6 text-pink-400" />}
          title="Weekly Leaderboards"
          description="The best ideas rise to the top! Get featured on our weekly leaderboards for maximum exposure and validation from peers."
          bgPattern="trophy"
        />

        <GridItem
          area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
          icon={<MessageSquare className="h-6 w-6 text-purple-400" />}
          title="Peer Review & Comments"
          description="Receive detailed feedback and suggestions to improve your idea from our community of hackers and founders."
          bgPattern="messages"
        />

        <GridItem
          area="md:[grid-area:3/1/4/7] xl:[grid-area:2/8/3/11]"
          icon={<PenTool className="h-6 w-6 text-fuchsia-400" />}
          title="AI Content Assistance"
          description="Struggling to explain your idea? Our AI helps draft compelling descriptions and pitch content for your innovations."
          bgPattern="pen"
        />
        
        <GridItem
          area="md:[grid-area:3/7/4/13] xl:[grid-area:2/11/3/13]"
          icon={<HandCoins className="h-6 w-6 text-pink-400" />}
          title="Catalyst (Coming Soon)"
          description="Connect directly with founders and fundraisers who can provide resources and support to turn your idea into reality."
          bgPattern="coins"
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
  bgPattern?: "neural" | "circles" | "trophy" | "messages" | "pen" | "coins";
  image?: string; // Optional image prop for future use 
}

const GridItem = ({ area, icon, title, description, bgPattern }: GridItemProps) => {
  const getBackgroundImage = () => {
    switch (bgPattern) {
      case "neural":
        return (
          <div className="absolute inset-0">
            <img 
              src="./public/f1.jpg" 
              className="absolute contrast-more:1 w-full h-full object-cover " 
              style={{ 
                mixBlendMode: 'soft-light'
              }}
              alt="AI Validation Background"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-slate-900/90" />
          </div>
        );
      case "circles":
        return (
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20" 
              style={{ 
                backgroundImage: 'url("https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000&auto=format&fit=crop")', 
                mixBlendMode: 'soft-light' 
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-slate-900/90" />
          </div>
        );
      case "trophy":
        return (
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20" 
              style={{ 
                backgroundImage: 'url("https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=80&w=1000&auto=format&fit=crop")', 
                mixBlendMode: 'soft-light' 
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-slate-900/90" />
          </div>
        );
      case "messages":
        return (
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20" 
              style={{ 
                backgroundImage: 'url("https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=1000&auto=format&fit=crop")', 
                mixBlendMode: 'soft-light' 
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-slate-900/90" />
          </div>
        );
      case "pen":
        return (
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20" 
              style={{ 
                backgroundImage: 'url("https://images.unsplash.com/photo-1599837487527-e009248aa71b?q=80&w=1000&auto=format&fit=crop")', 
                mixBlendMode: 'soft-light' 
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-slate-900/90" />
          </div>
        );
      case "coins":
        return (
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20" 
              style={{ 
                backgroundImage: 'url("https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1000&auto=format&fit=crop")', 
                mixBlendMode: 'soft-light' 
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-slate-900/90" />
          </div>
        );
      default:
        return null;
    }
  };

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
          {getBackgroundImage()}
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
