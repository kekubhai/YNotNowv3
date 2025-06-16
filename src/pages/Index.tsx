
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { IdeaCard } from '../components/IdeaCard';
import { PostIdeaForm } from '../components/PostIdeaForm';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

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

const mockIdeas: Idea[] = [
  {
    id: '1',
    title: 'AI-Powered Personal Finance Coach',
    description: 'An app that analyzes your spending habits and provides personalized financial advice using AI. It would connect to your bank accounts and give real-time suggestions on saving money.',
    author: 'Sarah Chen',
    votes: 23,
    comments: [
      {
        id: '1',
        author: 'Mike Johnson',
        content: 'Love this idea! Privacy concerns might be a challenge though.',
        createdAt: new Date('2024-06-15T10:30:00')
      }
    ],
    createdAt: new Date('2024-06-15T09:00:00'),
    userVote: null
  },
  {
    id: '2',
    title: 'Virtual Reality Meeting Rooms',
    description: 'Replace boring video calls with immersive VR meeting spaces. Users can interact with 3D models, whiteboards, and feel like they\'re in the same room.',
    author: 'Alex Rodriguez',
    votes: -5,
    comments: [],
    createdAt: new Date('2024-06-15T08:15:00'),
    userVote: null
  },
  {
    id: '3',
    title: 'Neighborhood Skill Exchange Platform',
    description: 'A local marketplace where neighbors can trade skills instead of money. Teach guitar lessons in exchange for home repairs, cooking lessons for garden maintenance, etc.',
    author: 'Emma Thompson',
    votes: 15,
    comments: [
      {
        id: '2',
        author: 'David Park',
        content: 'This could really strengthen communities! How would you handle quality control?',
        createdAt: new Date('2024-06-15T11:00:00')
      }
    ],
    createdAt: new Date('2024-06-15T07:45:00'),
    userVote: null
  }
];

const Index = () => {
  const [ideas, setIdeas] = useState<Idea[]>(mockIdeas);
  const [showPostForm, setShowPostForm] = useState(false);

  const handleVote = (ideaId: string, voteType: 'up' | 'down') => {
    setIdeas(prevIdeas => 
      prevIdeas.map(idea => {
        if (idea.id === ideaId) {
          let newVotes = idea.votes;
          let newUserVote: 'up' | 'down' | null = voteType;

          // Handle vote logic
          if (idea.userVote === voteType) {
            // Remove vote if clicking same button
            newUserVote = null;
            newVotes += voteType === 'up' ? -1 : 1;
          } else if (idea.userVote) {
            // Switch vote
            newVotes += voteType === 'up' ? 2 : -2;
          } else {
            // New vote
            newVotes += voteType === 'up' ? 1 : -1;
          }

          return { ...idea, votes: newVotes, userVote: newUserVote };
        }
        return idea;
      })
    );
  };

  const handleAddIdea = (newIdea: Omit<Idea, 'id' | 'votes' | 'comments' | 'createdAt' | 'userVote'>) => {
    const idea: Idea = {
      ...newIdea,
      id: Date.now().toString(),
      votes: 0,
      comments: [],
      createdAt: new Date(),
      userVote: null
    };
    setIdeas(prev => [idea, ...prev]);
    setShowPostForm(false);
  };

  const handleAddComment = (ideaId: string, content: string, author: string) => {
    setIdeas(prevIdeas =>
      prevIdeas.map(idea => {
        if (idea.id === ideaId) {
          const newComment: Comment = {
            id: Date.now().toString(),
            author,
            content,
            createdAt: new Date()
          };
          return { ...idea, comments: [...idea.comments, newComment] };
        }
        return idea;
      })
    );
  };

  // Sort ideas by votes (highest first)
  const sortedIdeas = [...ideas].sort((a, b) => b.votes - a.votes);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Latest Startup Ideas
            </h1>
            <p className="text-gray-600">
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

        {sortedIdeas.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No ideas yet</h3>
            <p className="text-gray-600 mb-4">Be the first to share a startup idea!</p>
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
