import React, { useState } from 'react';
import { Header } from '../components/Header';
import { IdeaCard } from '../components/IdeaCard';
import { PostIdeaForm } from '../components/PostIdeaForm';
import { LandingPage } from '../components/LandingPage';
import { Leaderboard } from '../components/Leaderboard';
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
import { useSupabaseData } from '../hooks/useSupabaseData';

export interface Idea {
  id: string;
  title: string;
  description: string;
  author: string;
  votes: number;
  comments: Comment[];
  createdAt: Date;
  userVote?: 'up' | 'down' | null;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
}

const Index = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [showPostForm, setShowPostForm] = useState(false);
  const { ideas, loading, addIdea, addComment, handleVote } = useSupabaseData();

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  const handleAddIdea = async (newIdea: Omit<Idea, 'id' | 'votes' | 'comments' | 'createdAt' | 'userVote'>) => {
    try {
      await addIdea(newIdea);
      setShowPostForm(false);
    } catch (error) {
      console.error('Failed to add idea:', error);
    }
  };

  const handleAddComment = async (ideaId: string, content: string, author: string) => {
    try {
      await addComment(ideaId, content, author);
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  if (showLanding) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  // Sort ideas by votes (highest first)
  const sortedIdeas = [...ideas].sort((a, b) => b.votes - a.votes);
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/ynn3.png" 
          alt="YNotNow Background" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 to-slate-950/75"></div>
      </div>

      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <Button 
            onClick={() => setShowLanding(true)}
            variant="ghost" 
            className="mb-6 text-slate-400 hover:text-white"
            size="sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
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
                Validate Your Next Big Idea
              </h1>
              <p className="text-slate-400 text-base">
                Share your startup or hackathon concepts and get valuable feedback from the community
              </p>
            </div>
            
            <Button 
              onClick={() => setShowPostForm(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md flex items-center gap-2 transition-all"
              size="lg"
            >
              <Plus className="w-4 h-4" />
              Submit Your Idea
            </Button>
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
              <span>Startups</span>
            </Button>
            <Button variant="outline" size="sm" className="rounded-full px-4 flex items-center gap-2 text-slate-400 border-slate-800">
              <Code2 className="w-4 h-4" />
              <span>Hackathons</span>
            </Button>
            <Button variant="outline" size="sm" className="rounded-full px-4 flex items-center gap-2 text-slate-400 border-slate-800">
              <Lightbulb className="w-4 h-4" />
              <span>Most Innovative</span>
            </Button>
            <Button variant="outline" size="sm" className="rounded-full px-4 flex items-center gap-2 text-slate-400 border-slate-800">
              <TrendingUp className="w-4 h-4" />
              <span>Trending</span>
            </Button>
          </div>

          {/* Value proposition */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-4 flex gap-3 items-start">
              <div className="bg-blue-500/20 rounded-md p-2">
                <Lightbulb className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h3 className="text-white font-medium text-sm mb-1">Idea Validation</h3>
                <p className="text-slate-400 text-xs">Get real feedback before investing time and resources</p>
              </div>
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-4 flex gap-3 items-start">
              <div className="bg-green-500/20 rounded-md p-2">
                <Users className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h3 className="text-white font-medium text-sm mb-1">Diverse Perspectives</h3>
                <p className="text-slate-400 text-xs">Insights from entrepreneurs, developers, and designers</p>
              </div>
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-4 flex gap-3 items-start">
              <div className="bg-orange-500/20 rounded-md p-2">
                <BookOpen className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <h3 className="text-white font-medium text-sm mb-1">Find Collaborators</h3>
                <p className="text-slate-400 text-xs">Connect with potential team members and advisors</p>
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
                <Leaderboard ideas={ideas} />
                
                <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    Join Our Community
                  </h3>
                  <p className="text-slate-400 text-sm mb-4">
                    Connect with founders, hackers, and innovators building the next big thing.
                  </p>
                  <Button variant="outline" className="w-full border-slate-700 text-slate-300">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
