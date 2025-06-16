
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { IdeaCard } from '../components/IdeaCard';
import { PostIdeaForm } from '../components/PostIdeaForm';
import { LandingPage } from '../components/LandingPage';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Latest Startup Ideas
            </h1>
            <p className="text-gray-400">
              Share your ideas and get honest feedback from the community
            </p>
          </div>
          
          <Button 
            onClick={() => setShowPostForm(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
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

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            <p className="text-gray-400 mt-4">Loading ideas...</p>
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
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-white mb-2">No ideas yet</h3>
            <p className="text-gray-400 mb-4">Be the first to share a startup idea!</p>
            <Button 
              onClick={() => setShowPostForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Post the First Idea
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
