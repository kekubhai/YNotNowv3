import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X, Lightbulb, Rocket } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API client
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

interface PostIdeaFormProps {
  onSubmit: (idea: { title: string; description: string; author: string, category: 'startup' | 'hackathon' | 'both' }) => void;
  onCancel: () => void;
}

export const PostIdeaForm: React.FC<PostIdeaFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState<'startup' | 'hackathon' | 'both'>('startup');
  const [isGenerating, setIsGenerating] = useState(false);

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
    try {
      if (!import.meta.env.VITE_GEMINI_API_KEY) {
        alert('Gemini API key not set');
        return;
      }

      setIsGenerating(true);

      const prompt = `
You are a world-class startup pitch coach who has helped founders raise billions in funding.

Create an exceptionally compelling, investor-ready description for this startup idea:

IDEA: ${title}
CATEGORY: ${category}
${description ? `INITIAL THOUGHTS: ${description}` : ''}

Your description must follow this precise structure:
1. PROBLEM (1-2 sentences): Start with a sharp, quantifiable problem statement that shows market pain.
2. SOLUTION (2-3 sentences): Describe your solution clearly, focusing on its unique approach.
3. MARKET SIZE (1-2 sentences): Provide specific TAM/SAM figures and growth trajectory.
4. DIFFERENTIATION (1-2 sentences): Explain why existing alternatives fail and your unfair advantage.
5. BUSINESS MODEL (1-2 sentences): How you'll make money, with unit economics if possible.
6. TRACTION/VISION (1-2 sentences): Early validation or clear first steps to market.

Write in a confident, concise voice (250-300 words max). Use specific metrics where possible. Focus on clarity over jargon. Make it compelling enough that an investor would immediately want to schedule a meeting.

Format the output as a single cohesive paragraph without section headers.
`;

      // Use Gemini API to generate content
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const generatedText = response.text();

      setDescription(generatedText.trim());
    } catch (err) {
      console.error('Error generating description:', err);
      alert('Failed to generate description. Please check your API key and try again.');
    } finally {
      setIsGenerating(false);
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
              disabled={isGenerating}
              className="text-sm text-orange-400 hover:underline flex items-center gap-1"
            >
              {isGenerating ? '⏳ Generating...' : '🪄 Generate with AI'}
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
