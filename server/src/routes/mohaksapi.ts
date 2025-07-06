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

  router.get('/mohaksideas/', async (req: Request, res: Response): Promise<any> => {
    try {
      const ideas = await prisma.idea.findMany({
     
      }) 

      // const result: MohakApiResponse[] = ideas
       
      //   .map((idea: IdeaWithUser) => ({
      //     email: idea.user!.email,
      //     username: idea.user!.username,
      //     id: idea.id,
      //     title: idea.title,
      //     description: idea.description
      //   }));

      
      res.json(ideas);
    } catch (error) {
      console.error('MohakAPI Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
};



