
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { IdeaCard } from '../components/IdeaCard';
import { PostIdeaForm } from '../components/PostIdeaForm';
import { LandingPage } from '../components/LandingPage';
import { Leaderboard } from '../components/Leaderboard';
import { Button } from '@/components/ui/button';
import { Plus, Rocket, TrendingUp } from 'lucide-react';
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
    <div className="min-h-screen bg-slate-950">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black text-white mb-3 flex items-center gap-3">
              <Rocket className="w-8 h-8 text-orange-400" />
              Latest Startup Ideas
            </h1>
            <p className="text-slate-400 text-lg">
              Share your ideas and get honest feedback from the community
            </p>
          </div>
          
          <Button 
            onClick={() => setShowPostForm(true)}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-4 rounded-xl flex items-center gap-3 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-orange-500/25"
          >
            <Plus className="w-5 h-5" />
            Post Idea
          </Button>
        </div>

        {showPostForm && (
          <div className="mb-8">
            <PostIdeaForm 
              onSubmit={handleAddIdea}
              onCancel={() => setShowPostForm(false)}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
                <p className="text-slate-400 text-lg">Loading ideas...</p>
              </div>
            ) : (
              <div className="space-y-6">
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
              <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-700">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">No ideas yet</h3>
                <p className="text-slate-400 mb-6 text-lg">Be the first to share a startup idea!</p>
                <Button 
                  onClick={() => setShowPostForm(true)}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-3"
                >
                  Post the First Idea
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar with Leaderboard */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Leaderboard ideas={ideas} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
