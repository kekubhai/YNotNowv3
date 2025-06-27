import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X, Lightbulb, Rocket } from 'lucide-react';

interface PostIdeaFormProps {
  onSubmit: (idea: { title: string; description: string; author: string, category: 'startup' | 'hackathon' | 'both' }) => void;
  onCancel: () => void;
}

export const PostIdeaForm: React.FC<PostIdeaFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState<'startup' | 'hackathon' | 'both'>('startup');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim() && author.trim()) {
      onSubmit({
        title: title.trim(),
        description: description.trim(),
        author: author.trim(),
        category,
      });
      setTitle('');
      setDescription('');
      setAuthor('');
      setCategory('startup');
    }
  };
const handleGenerateDescription = async () => {
  if (!title.trim()) {
    alert('Please enter an idea title before generating description.');
    return;
  }

  try {
    const res = await fetch('http://localhost:3001/api/describe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, category }),
    });

    const data = await res.json();
    setDescription(data.description);
  } catch (err) {
    console.error('Error generating description:', err);
    alert('Failed to generate description.');
  }
};

  return (
    <Card className="p-8 bg-slate-900/80 backdrop-blur-sm shadow-2xl border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Share Your Startup Idea</h2>
            <p className="text-slate-400">Tell the community about your next big thing</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="text-slate-400 hover:text-slate-300 hover:bg-slate-700 rounded-full p-2"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="author" className="block text-sm font-semibold text-slate-300 mb-2">
            Your Name
          </label>
          <Input
            id="author"
            type="text"
            placeholder="Enter your name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full bg-slate-800 border-slate-600 text-white focus:border-orange-400 focus:ring-orange-400/20"
            required
          />
        </div>
        
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-slate-300 mb-2">
            Idea Title
          </label>
          <Input
            id="title"
            type="text"
            placeholder="What's your startup idea?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-800 border-slate-600 text-white focus:border-orange-400 focus:ring-orange-400/20"
            required
          />
        </div>
        
      <div>
  <div className="flex items-center justify-between mb-2">
    <label htmlFor="description" className="block text-sm font-semibold text-slate-300">
      Description
    </label>
    <button
      type="button"
      onClick={handleGenerateDescription}
      className="text-sm text-orange-400 hover:underline"
    >
      🪄 Generate with AI
    </button>
  </div>
  <Textarea
    id="description"
    placeholder="Describe your idea in detail. What problem does it solve? How would it work? What makes it unique?"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    className="w-full min-h-[140px] bg-slate-800 border-slate-600 text-white focus:border-orange-400 focus:ring-orange-400/20"
    required
  />
</div>

        
        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-slate-300 mb-2">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={e => setCategory(e.target.value as 'startup' | 'hackathon' | 'both')}
            className="w-full bg-slate-800 border-slate-600 text-white focus:border-orange-400 focus:ring-orange-400/20 rounded-md p-2"
            required
          >
            <option value="startup">Startup</option>
            <option value="hackathon">Hackathon</option>
            <option value="both">Both</option>
          </select>
        </div>
        
        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-3 rounded-lg flex items-center gap-2"
            disabled={!title.trim() || !description.trim() || !author.trim()}
          >
            <Rocket className="w-4 h-4" />
            Launch Idea
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="px-8 py-3 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white rounded-lg"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};
