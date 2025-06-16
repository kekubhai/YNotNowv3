
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';

interface PostIdeaFormProps {
  onSubmit: (idea: { title: string; description: string; author: string }) => void;
  onCancel: () => void;
}

export const PostIdeaForm: React.FC<PostIdeaFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim() && author.trim()) {
      onSubmit({
        title: title.trim(),
        description: description.trim(),
        author: author.trim()
      });
      setTitle('');
      setDescription('');
      setAuthor('');
    }
  };

  return (
    <Card className="p-6 bg-white shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Share Your Startup Idea</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name
          </label>
          <Input
            id="author"
            type="text"
            placeholder="Enter your name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full"
            required
          />
        </div>
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Idea Title
          </label>
          <Input
            id="title"
            type="text"
            placeholder="What's your startup idea?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full"
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <Textarea
            id="description"
            placeholder="Describe your idea in detail. What problem does it solve? How would it work?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-[120px]"
            required
          />
        </div>
        
        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-6"
            disabled={!title.trim() || !description.trim() || !author.trim()}
          >
            Post Idea
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="px-6"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};
