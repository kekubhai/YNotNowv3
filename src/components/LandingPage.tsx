import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MainMenusGradientCard } from './eldoraui/animatedcard';
import { 
  ArrowRight, 
  Brain,
  Sparkles, 
  TrendingUp, 
  Users, 
  Lightbulb, 
  Star,
  Zap,
  Target,
  CheckCircle,
  Play,
  ArrowUpRight,
  Globe,
  Shield,
  Award,
  MessageSquare,
  ThumbsUp,
  Eye,
  Clock,
  Rocket,
  Code,
  BarChart3,
  Bot
} from 'lucide-react';
import { TextAnimate } from './magicui/text-animate';
import { TweetGrid } from './eldoraui/tweetgrid';
import { TweetGridDemo } from './Tweetdemo';
import DynamicSquareBackground from './eldoraui/dynamicsquare';


interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
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
    { number: '2,500+', label: 'Ideas Validated', icon: Target },
    { number: '15K+', label: 'Community Votes', icon: ThumbsUp },
    { number: '8K+', label: 'Comments & Feedback', icon: MessageSquare },
    { number: '500+', label: 'Successful Launches', icon: Rocket },
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
              <div className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm py-3 px-6 text-sm text-purple-300 shadow-lg">
                <Bot className="mr-3 h-4 w-4" />
                <TextAnimate className="mr-2"> AI-Powered Idea Validation Platform</TextAnimate>
                <span className="ml-2">✨</span>
              </div>
            </div>

            {/* Main Hero Content */}
            <div className="text-center space-y-8 mb-16">
              <h1 className={`text-6xl md:text-8xl font-bold tracking-tight transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                  Validate Ideas with
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
                  AI & Community
                </span>
              </h1>
              
              <p className={`text-xl md:text-2xl text-slate-300 leading-relaxed max-w-4xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                The ultimate platform for hackathon teams and startups to validate ideas through AI analysis and community feedback. 
                Get instant insights, gather votes, and build what people actually want.
              </p>

              {/* CTA Buttons */}
              <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <Button
                  onClick={onGetStarted}
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
                  <span className="text-sm">Free to use</span>
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
                  <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}


      {/* <TweetGridDemo/> */}
      <section className="relative z-10 py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Perfect for
                <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"> Every Innovator</span>
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                Whether you're building at a hackathon, launching a startup, or exploring new ideas, 
                our AI-powered platform helps you validate concepts quickly and effectively.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <div 
                  key={index}
                  className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700  p-8 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10"
                >
                  <div className="absolute top-4 right-4">
                    <span className="inline-block bg-purple-500/20 text-purple-400 rounded-full px-3 py-1 text-xs font-medium">
                      {useCase.badge}
                    </span>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500  flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <useCase.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{useCase.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{useCase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                AI + Community
                <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"> Intelligence</span>
              </h2>
              <p className="text-base text-slate-600 max-w-2xl mx-auto">
                Combine the power of artificial intelligence with human insights to validate your ideas 
                faster and more accurately than ever before.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {features.map((feature, index) => (
                <MainMenusGradientCard
                  key={index}
                  className="group relativee p-6  shadow hover:shadow-lg transition-all duration-300 flex flex-row items-center gap-4"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                    <feature.icon className="h-6 w-6 text-black" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-black mb-1">{feature.title}</h3>
                    <p className="text-slate-700 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </MainMenusGradientCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="relative z-10 py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <div className="relative flex justify-center items-center text-yellow-600">
            <DynamicSquareBackground
              title="Join the Innovation Community"
              tag="Community"
              description="Connect with developers, designers, entrepreneurs, and AI enthusiasts. Vote on ideas, share feedback, and help build the next big thing."
              buttonText="Start Validating"
              buttonHref="#"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
