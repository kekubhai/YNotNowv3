import { useState, useEffect } from 'react';
import type { Idea } from '../pages/Index';

export const useIdeas = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchIdeas = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/ideas');
      const data = await res.json();
      setIdeas(data.map((idea: any) => ({ ...idea, createdAt: new Date(idea.createdAt) })));
    } catch (error) {
      console.error('Error fetching ideas:', error);
    } finally {
      setLoading(false);
    }
  };

  const addIdea = async (newIdea: Omit<Idea, 'id' | 'votes' | 'comments' | 'createdAt' | 'userVote'>) => {
    try {
      const res = await fetch('http://localhost:3000/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newIdea),
      });
      if (!res.ok) throw new Error('Failed to add idea');
      await fetchIdeas();
    } catch (error) {
      console.error('Error adding idea:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  return { ideas, loading, addIdea, setIdeas, fetchIdeas };
};
