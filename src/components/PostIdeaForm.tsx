import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X, Rocket, Sparkles } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API client
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

interface PostIdeaFormProps {
  onSubmit: (idea: { title: string; description: string; category: 'startup' | 'hackathon' | 'both' }) => void;
  onCancel: () => void;
}

export const PostIdeaForm: React.FC<PostIdeaFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'startup' | 'hackathon' | 'both'>('startup');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      onSubmit({
        title: title.trim(),
        description: description.trim(),
        category,
      });
      setTitle('');
      setDescription('');
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
    <Card className="max-w-md mx-auto p-6 bg-slate-950/90 border border-slate-800 rounded-2xl shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xl font-semibold text-white">Share Your Idea</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onCancel}
          className="text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          id="title"
          type="text"
          placeholder="Idea title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="bg-slate-900 border-none text-white placeholder:text-slate-500 focus:ring-2 focus:ring-orange-400"
          required
        />
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="description" className="text-sm text-slate-400">Description</label>
            <button
              type="button"
              onClick={handleGenerateDescription}
              disabled={isGenerating}
              className="text-xs text-orange-400 hover:underline flex items-center gap-1"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> AI Suggest
                </>
              )}
            </button>
          </div>
          <Textarea
            id="description"
            placeholder="What makes your idea unique? What problem does it solve?"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="bg-slate-900 border-none text-white placeholder:text-slate-500 focus:ring-2 focus:ring-orange-400 min-h-[100px]"
            required
          />
        </div>
        <select
          id="category"
          value={category}
          onChange={e => setCategory(e.target.value as 'startup' | 'hackathon' | 'both')}
          className="w-full bg-slate-900 border-none text-white focus:ring-2 focus:ring-orange-400 rounded-md p-2"
          required
        >
          <option value="startup">Startup</option>
          <option value="hackathon">Hackathon</option>
          <option value="both">Both</option>
        </select>
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
          disabled={!title.trim() || !description.trim()}
        >
          <Rocket className="w-4 h-4" />
          Launch Idea
        </Button>
      </form>
    </Card>
  );
};
