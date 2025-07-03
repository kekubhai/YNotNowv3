import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

import { 
  ArrowRight, 
  Brain,
  Users, 
  Lightbulb, 
 
  Zap,
  Target,
  CheckCircle,
  Play,
  ArrowUpRight,

  Shield,
  MessageSquare,
  ThumbsUp,
  Eye,
 
  Rocket,
  Code,
  BarChart3,
  Bot
} from 'lucide-react';
import { TextAnimate } from '../components/magicui/text-animate';

import { AuroraText } from '../components/magicui/aurora-text';
import { Globe } from "@/components/magicui/globe";
import { NumberTicker } from '../components/magicui/number-ticker';
import { AnimatedGradientText } from '../components/magicui/animated-gradient-text';
import { GlowingEffectDemo } from '../components/glowingdemo';
import { BoxRevealDemo } from '../components/boxrevealdemo';
import { FeedbackButton } from '../components/Feedbackform';
import { FlowingTweets } from '../components/FlowingTweets';


interface LandingPageProps {
  
}

export const LandingPage: React.FC<LandingPageProps> = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/ideas');
  };

  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const stats = [
    { number: 2500, label: 'Ideas Validated', icon: Target },
    { number: 15000, label: 'Community Votes', icon: ThumbsUp },
    { number: 8000, label: 'Comments & Feedback', icon: MessageSquare },
    { number: 500, label: 'Successful Launches', icon: Rocket },
  ];

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Validation',
      description: 'Get instant AI analysis of market potential, competition, and feasibility for your hackathon or startup idea',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Users,
      title: 'Community Intelligence',
      description: 'Tap into the collective wisdom of developers, designers, and entrepreneurs through voting and discussions',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Track idea performance with detailed metrics, sentiment analysis, and growth indicators',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Zap,
      title: 'Rapid Feedback Loop',
      description: 'Get actionable feedback within hours from our engaged community of innovators and experts',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const useCases = [
    {
      icon: Code,
      title: 'Hackathon Projects',
      description: 'Validate your hackathon idea before building. Get feedback on technical feasibility and market demand.',
      badge: 'Popular'
    },
    {
      icon: Rocket,
      title: 'Startup MVPs',
      description: 'Test your startup concept with real users. Understand pain points and validate your solution.',
      badge: 'Trending'
    },
    {
      icon: Lightbulb,
      title: 'Innovation Labs',
      description: 'Explore new product ideas and features. Get community insights before development.',
      badge: 'New'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Hero Section with Background Image */}

     
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image with overlay - only for hero section */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/ynn2.png" 
            alt="AI Idea Validation Platform" 
            className="w-full h-full object-cover object-center scale-150"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-purple-900/40 to-slate-900/90"></div>
        </div>

        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden z-10">
          <div className="absolute top-20 left-10 w-2 h-2 bg-purple-500 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-blue-500 rounded-full animate-ping opacity-40"></div>
          <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-pink-500 rounded-full animate-bounce opacity-30"></div>
          <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-cyan-500 rounded-full animate-pulse opacity-50"></div>
          <div className="absolute bottom-20 right-10 w-2 h-2 bg-orange-500 rounded-full animate-ping opacity-40"></div>
        </div>

        {/* Gradient orbs that follow mouse */}
        <div 
          className="fixed w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl pointer-events-none transition-transform duration-1000 ease-out z-10"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>
        <div 
          className="fixed w-64 h-64 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl pointer-events-none transition-transform duration-1000 ease-out z-10"
          style={{
            left: mousePosition.x + 100,
            top: mousePosition.y - 100,
          }}
        ></div>

        <div className="container mx-auto px-4 py-20 relative z-20">
          <div className="max-w-7xl mx-auto">
            {/* Header Badge */}
            <div className={`flex justify-center mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <AnimatedGradientText className="inline-flex items-center rounded-full border border-neutral-300-500/30 bg-purple-500/10 backdrop-blur-sm py-3 px-6 text-sm text-purple-300 shadow-lg">
                <Bot className="mr-3 h-4 w-4" />
                <TextAnimate className="mr-2"> AI-Powered Idea Validation Platform</TextAnimate>
                <span className="ml-2">✨</span>
              </AnimatedGradientText>
            </div>

            {/* Main Hero Content */}
            <div className="text-center space-y-8 mb-16">
              <h1 className={`text-6xl md:text-8xl font-bold tracking-tight transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                  Validate Ideas with
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
                  AI &
                  <AuroraText className='pl-5'>Community</AuroraText>
                </span>
              </h1>

              <p className={`text-xl md:text-2xl text-slate-300 leading-relaxed max-w-4xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                The ultimate platform for hackathon teams and startups to validate ideas through AI analysis and community feedback. 
                Get instant insights, gather votes, and build what people actually want.
              </p>

              {/* CTA Buttons */}
              <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <Button
                  onClick={handleGetStarted}
                  size="lg"
                  className="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-semibold px-8 py-6 text-lg transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 hover:scale-105"
                >
                  Start Validating Now
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="group border-purple-500/30 text-purple-300 hover:text-white hover:border-purple-400 rounded-xl px-8 py-6 text-lg transition-all duration-300 backdrop-blur-sm"
                >
                  <Play className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </div>

              {/* Trust badges */}
              <div className={`flex flex-wrap justify-center items-center gap-6 mt-12 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="flex items-center gap-2 text-slate-400">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Free to use(for now)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Shield className="h-5 w-5 text-blue-500" />
                  <span className="text-sm">AI-powered insights</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Globe className="h-5 w-5 text-purple-500" />
                  <span className="text-sm">Global community</span>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-800/50 to-pink-800/50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="h-8 w-8 text-purple-400" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">

                    <NumberTicker value={stat.number}></NumberTicker>
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
<GlowingEffectDemo/>

      {/* <TweetGridDemo/> */}
<section className="relative z-10 py-24 bg-gradient-to-b from-slate-900 to-slate-950">
   <div className="container mx-auto px-4">
     <div className="flex flex-col md:flex-row justify-between items-center gap-12">
       <div className="relative flex size-full max-w-md items-center justify-center overflow-hidden rounded-2xl border border-purple-900/30 bg-slate-900 px-20 pb-40 pt-8 md:pb-60 shadow-lg">
         <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-purple-200 to-purple-500/80 bg-clip-text text-center text-7xl font-bold leading-none text-transparent">
           Ideas
         </span>
         <Globe className="top-28 text-purple-600" />
         <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(128,90,213,0.2),rgba(30,27,75,0.3))]" />
       </div>
      <BoxRevealDemo/>
     </div>
   </div>
</section>

  
  {/* Flowing Tweets Section */}
  <section className="relative z-10 py-24 bg-gradient-to-b from-slate-900 to-slate-950">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent mb-4">
          Real Questions, Real Needs
        </h2>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Founders and hackers everywhere are looking for validation. <span className="text-purple-400">YNotNow</span> is the answer.
        </p>
      </div>
      
      {/* This component has the flowing tweets animation */}
      <FlowingTweets />
      
      {/* Call to action */}
      
    </div>
  </section>
  
      {/* Community Section */}
      <section className="relative z-10 py-20 overflow-hidden">
  {/* Background image with overlay - FIXED PATH AND ADJUSTED OVERLAY */}
  <div className="absolute inset-0 z-0">
    <img 
      src="/ynn4.png" 
      alt="Community Background" 
      className="w-full h-full object-cover object-center"
    />
    {/* Lighter overlay to allow more image visibility */}
    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-purple-900/30 to-slate-900/60"></div>
  </div>
  

  <div className="container mx-auto px-4 relative z-10">
    <div className="max-w-4xl mx-auto text-center">
      {/* More transparent background to show image better */}
      <div className="md border border-purple-700/30 rounded-3xl p-12 shadow-2xl bg-transparent">
        <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
          <Users className="h-10 w-10 text-white" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-md">
          Join the Innovation Community
        </h2>
        <p className="text-xl text-white mb-8 max-w-2xl mx-auto drop-shadow-sm">
          Connect with developers, designers, entrepreneurs, and AI enthusiasts. 
          Vote on ideas, share feedback, and help build the next big thing.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            
            size="lg"
            className="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-semibold px-8 py-6 text-lg transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 hover:scale-105"
          >
            Start Validating
            <ArrowUpRight className="ml-3 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="group border-purple-500/30 text-purple-300 hover:text-white hover:border-purple-400 rounded-xl px-8 py-6 text-lg transition-all duration-300"
          >
            Browse Ideas
            <Eye className="ml-3 h-5 w-5 group-hover:scale-110 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</section>
    
    {/* Floating Feedback Button */}
    <FeedbackButton />
    </div>
  );
};