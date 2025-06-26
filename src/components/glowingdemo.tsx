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
}

const GridItem = ({ area, icon, title, description, bgPattern }: GridItemProps) => {
  const getBackgroundPattern = () => {
    switch (bgPattern) {
      case "neural":
        return (
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="neural-net" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="1.5" fill="white" />
                  <path d="M10 0 V20 M0 10 H20" stroke="white" strokeWidth="0.5" strokeOpacity="0.5" />
                  <path d="M0 0 L20 20 M20 0 L0 20" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#neural-net)" />
            </svg>
          </div>
        );
      case "circles":
        return (
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="circles-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="4" fill="none" stroke="white" strokeWidth="0.5" />
                  <circle cx="30" cy="10" r="2" fill="white" fillOpacity="0.3" />
                  <circle cx="10" cy="30" r="2" fill="white" fillOpacity="0.3" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#circles-pattern)" />
            </svg>
          </div>
        );
      case "trophy":
        return (
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="trophy-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M20,5 L30,5 L30,15 C30,22 25,25 20,25 C15,25 10,22 10,15 L10,5 L20,5 Z" stroke="white" fill="none" strokeWidth="0.5" />
                  <rect x="15" y="25" width="10" height="5" stroke="white" fill="none" strokeWidth="0.5" />
                  <rect x="17.5" y="30" width="5" height="10" stroke="white" fill="none" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#trophy-pattern)" />
            </svg>
          </div>
        );
      case "messages":
        return (
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="messages-pattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M5,5 L25,5 L25,20 L15,20 L10,25 L10,20 L5,20 Z" stroke="white" fill="none" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#messages-pattern)" />
            </svg>
          </div>
        );
      case "pen":
        return (
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="pen-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M30,10 L10,30 L5,35 L10,40 L15,35 L35,15 Z" stroke="white" fill="none" strokeWidth="0.5" />
                  <path d="M5,35 L10,30 M10,40 L15,35" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#pen-pattern)" />
            </svg>
          </div>
        );
      case "coins":
        return (
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="coins-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="15" cy="15" r="7" stroke="white" fill="none" strokeWidth="0.5" />
                  <circle cx="25" cy="25" r="7" stroke="white" fill="none" strokeWidth="0.5" />
                  <path d="M13,15 L17,15 M15,13 L15,17" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#coins-pattern)" />
            </svg>
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
          {getBackgroundPattern()}
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
