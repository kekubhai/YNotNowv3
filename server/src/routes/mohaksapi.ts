import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';

// Define proper TypeScript interfaces
interface IdeaWithUser {
  id: string;
  title: string;
  description: string;
  user: {
    email: string;
    username: string;
  } | null;
}

interface MohakApiResponse {
  email: string;
  username: string;
  id: string;
  title: string;
  description: string;
}

export const mohakApi = () => {
  const router = Router();
router.get('/mohakideas', async (req, res):Promise<any> => {
  try {
    const ideas = await prisma.idea.findMany({ 
      include: { 
        comments: true, 
        votesList: true,
        //@ts-ignore
        id:true,
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            photoURL: true
          }
        }
      } 
    });
    res.json(ideas);
  } catch (error: any) {
    console.error('Error fetching ideas:', error);
    res.status(500).json({ error: 'Failed to fetch ideas', details: error.message });
  }
});


  return router;
};



