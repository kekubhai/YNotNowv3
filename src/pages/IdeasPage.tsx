import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { IdeaCard } from '../components/IdeaCard';
import { PostIdeaForm } from '../components/PostIdeaForm';
import { Leaderboard } from '../components/Leaderboard';
import { FeedbackPopover } from '../components/FeedbackPopover';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  BookOpen,
  Code2,
  Lightbulb,
  Layers,
  Plus, 
  Rocket, 
  TrendingUp,
  Users 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PointerHighlight } from '@/components/ui/pointer-highlight';
import { useAuth } from '../context/AuthContext';
import { GridPattern } from '@/components/magicui/grid-pattern';
import { cn } from '@/lib/utils';
import { CatalystBanner } from '../components/CatalystBanner';
import { AnimatedButton } from '../components/ui/animated-button';
import { AnimatedCard } from '../components/ui/animated-card';
import { ScrollReveal } from '../components/ui/scroll-reveal';
import { ShimmerButton } from '@/components/magicui/shimmer-button';
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text';

export interface Idea {
  id: string;
  title: string;
  description: string;
  author: string;
  category: 'startup' | 'hackathon' | 'both';
  votes: number;
  comments: Comment[];
  createdAt: Date;
  userVote?: 'up' | 'down' | null;
  user?: {
    id: string;
    email: string;
    username?: string;
  };
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
  user?: {
    id: string;
    email: string;
    username?: string;
  };
}

const IdeasPage = () => {
  const [showPostForm, setShowPostForm] = useState(false);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddButton, setShowAddButton] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  
  useEffect(() => {
    console.log("Current user in IdeasPage:", user);
    
    fetchIdeas();
    
    const token = localStorage.getItem('ynn3_token');
    if (!token) {
      console.log("No token found, hiding add button");
      setShowAddButton(false); 
    } else {
      console.log("Token found, showing add button");
      setShowAddButton(true);
    }
  }, [navigate, user]); // Add user as dependency

  const fetchIdeas = async () => {
    setLoading(true);
    try {
     
      const res = await fetch('http://localhost:3000/ideas');
      
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`);
      }
      
      const data = await res.json();
      if (Array.isArray(data)) {
        setIdeas(data.map((idea: any) => ({ ...idea, createdAt: new Date(idea.createdAt) })));
      } else {
        console.error('Expected array but got:', data);
        setIdeas([]);
      }
    } catch (error) {
      console.error('Failed to fetch ideas:', error);
      setIdeas([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddIdea = async (newIdea: Omit<Idea, 'id' | 'votes' | 'comments' | 'createdAt' | 'userVote' | 'author'>) => {
    try {
      if (!user?.email) {
        alert('Please sign in to submit ideas');
        navigate('/signin');
        return;
      }
      
      const token = localStorage.getItem('ynn3_token');
      console.log('Submitting idea with user:', user);
      
      const res = await fetch('http://localhost:3000/ideas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          ...newIdea,
          // Always use email as it's guaranteed to be unique and required
          author: user.email
        }),
      });
      
      // Log response details for debugging
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error('Server response:', res.status, errorData);
      }
      
      if (!res.ok) {
        const errorData = await res.json();
        console.error('Server error:', errorData);
        throw new Error(errorData.message || errorData.error || 'Failed to add idea');
      }
      
      await fetchIdeas();
      setShowPostForm(false);
    } catch (error) {
      console.error('Failed to add idea:', error);
      alert(`Failed to add idea: ${error.message || 'Please try again.'}`);
    }
  };

  const handleAddComment = async (ideaId: string, content: string, author: string) => {
    try {
      if (!user?.email) {
        alert('Please sign in to comment');
        navigate('/signin');
        return;
      }
      
      const token = localStorage.getItem('ynn3_token');
      
      const res = await fetch(`http://localhost:3000/comments/idea/${ideaId}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ 
          author: user.email, // Always use the authenticated user's email
          content 
        }),
      });
      if (!res.ok) throw new Error('Failed to add comment');
      await fetchIdeas();
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  const handleVote = async (ideaId: string, voteType: 'up' | 'down') => {
    try {
      const token = localStorage.getItem('ynn3_token');
    
      const userIdentifier = user?.email || 'anonymous_' + Math.random().toString(36).substring(7);
      
    
      const res = await fetch(`http://localhost:3000/votes/idea/${ideaId}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ userIdentifier, voteType }),
      });
      
      if (!res.ok) throw new Error('Failed to vote');
      await fetchIdeas();
    } catch (error) {
      console.error('Failed to vote:', error);
    }
  };

 
  const sortedIdeas = [...ideas].sort((a, b) => b.votes - a.votes);
  return (
     <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-purple-950/30 py-5 px-4">
      
      <GridPattern
        width={20}
        height={20}
        x={-1}
        y={-1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
        )}
      />
      

      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <Button 
            onClick={() => navigate('/')}
            variant="ghost" 
            className="mb-6 text-slate-400 hover:text-white"
            size="sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          {/* Leaderboard navigation button */}
          <Button
            onClick={() => navigate('/leaderboard')}
            variant="secondary"
            className="mb-6 ml-2 text-purple-400 hover:text-white"
            size="sm"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Leaderboard
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-orange-500" />
                </div>
                <div className="flex gap-2">
                  <span className="inline-block bg-orange-500/20 text-orange-400 rounded-full px-2 py-1 text-xs">
                    Startup Ideas
                  </span>
                  <span className="inline-block bg-blue-500/20 text-blue-400 rounded-full px-2 py-1 text-xs">
                    Hackathon Projects
                  </span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Validate 
                
                <PointerHighlight 
                     rectangleClassName="border-white/20 border-2 rounded-md p-1 border-dashed"
        pointerClassName="text-yellow-600"><span className=''>Your Next Big</span> Idea</PointerHighlight>
              </h1>
              <p className="text-slate-400 text-base">
                Share your startup or hackathon concepts and get valuable feedback from the community
              </p>
            </div>
            
            {showAddButton && (
              <ShimmerButton 
                onClick={() => setShowPostForm(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md flex items-center gap-2 transition-all"
          
              >
                <Plus className="w-4 h-4" />
                Submit Your Idea
              </ShimmerButton>
            )}
          </div>

          {showPostForm && (
            <div className="mb-8">
              <PostIdeaForm 
                onSubmit={handleAddIdea}
                onCancel={() => setShowPostForm(false)}
              />
            </div>
          )}        {/* Category filters */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
            <Button variant="secondary" size="sm" className="rounded-full px-4 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>All Ideas</span>
            </Button>
            <Button variant="outline" size="sm" className="rounded-full px-4 flex items-center gap-2 text-slate-400 border-slate-800">
              <Rocket className="w-4 h-4" />
              <AnimatedGradientText className='font-bold text-xl'>Startups</AnimatedGradientText>
            </Button>
            <Button variant="outline" size="sm" className="rounded-full px-4 flex items-center gap-2 text-slate-400 border-slate-800">
              <Code2 className="w-4 h-4" />
              <AnimatedGradientText className='font-bold text-xl text-purple-300 from-current to-red-300'>Hackathons</AnimatedGradientText>
            </Button>
            <Button variant="outline" size="sm" className="rounded-full px-4 flex items-center gap-2 text-slate-400 border-slate-800">
              <Lightbulb className="w-4 h-4" />
              <AnimatedGradientText className='font-bold text-xl from-yellow-300 to-red-300'>Most Innovative</AnimatedGradientText>
            </Button>
            <Button variant="outline" size="sm" className="rounded-full px-4 flex items-center gap-2 text-slate-400 border-slate-800">
              <TrendingUp className="w-4 h-4" />
              <AnimatedGradientText className='font-bold text-xl from-red-600 to-green-400'>Trending</AnimatedGradientText>
            </Button>
          </div>

          {/* Value proposition */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
  {/* Card 1 */}
  <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5 flex gap-4 items-start hover:border-blue-500/30 transition-all duration-300 group">
    <div className="bg-blue-500/10 group-hover:bg-blue-500/20 rounded-lg p-2.5 transition-all duration-300">
      <Lightbulb className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-all duration-300" />
    </div>
    <div>
      <h3 className="text-white font-medium text-base mb-1.5">Idea Validation</h3>
      <p className="text-slate-100/80 text-sm leading-snug">Get real feedback before investing time and resources</p>
    </div>
  </div>
  
  {/* Card 2 */}
  <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5 flex gap-4 items-start hover:border-green-500/30 transition-all duration-300 group">
    <div className="bg-green-500/10 group-hover:bg-green-500/20 rounded-lg p-2.5 transition-all duration-300">
      <Users className="w-6 h-6 text-green-400 group-hover:text-green-300 transition-all duration-300" />
    </div>
    <div>
      <h3 className="text-white font-medium text-base mb-1.5">Diverse Perspectives</h3>
      <p className="text-slate-300/80 text-sm leading-snug">Insights from entrepreneurs, developers, and designers</p>
    </div>
  </div>
  
  {/* Card 3 */}
  <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5 flex gap-4 items-start hover:border-orange-500/30 transition-all duration-300 group">
    <div className="bg-orange-500/10 group-hover:bg-orange-500/20 rounded-lg p-2.5 transition-all duration-300">
      <BookOpen className="w-6 h-6 text-orange-400 group-hover:text-orange-300 transition-all duration-300" />
    </div>
    <div>
      <h3 className="text-white font-medium text-base mb-1.5">Find Collaborators</h3>
      <p className="text-slate-300/80 text-sm leading-snug">Connect with potential team members and advisors</p>
    </div>
  </div>
</div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="text-center py-16 bg-slate-900/30 rounded-lg border border-slate-800">
                  <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500 mb-4"></div>
                  <p className="text-slate-400">Loading ideas...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedIdeas.map((idea) => (
                    <IdeaCard
                      key={idea.id}
                      idea={idea}
                      onVote={handleVote}
                      onAddComment={handleAddComment}
                    />
                    
                  ))}
                  
                </div>
                
              )}
              
              {sortedIdeas.length === 0 && !loading && (
                <div className="text-center py-12 bg-slate-900/30 rounded-lg border border-slate-800">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">No ideas yet</h3>
                  <p className="text-slate-400 mb-4">Be the first to share your startup or hackathon idea!</p>
                  <Button 
                    onClick={() => setShowPostForm(true)}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Submit Your Idea
                  </Button>
                </div>
              )}
            </div>
            

            {/* Sidebar with Leaderboard */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
              
            
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {/* Floating Feedback Button */}
      <FeedbackPopover />
    </div>
  );
};

export default IdeasPage;
