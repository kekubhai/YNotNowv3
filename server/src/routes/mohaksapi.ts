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
        select: {
          id: true,
          title: true,
          description: true,
          user: {
            select: { 
              email: true,
              username: true 
            }
          }
        }
      }) as IdeaWithUser[];

      const result: MohakApiResponse[] = ideas
        .filter((idea: IdeaWithUser) => idea.user !== null)
        .map((idea: IdeaWithUser) => ({
          email: idea.user!.email,
          username: idea.user!.username,
          id: idea.id,
          title: idea.title,
          description: idea.description
        }));

      
      res.json(result);
    } catch (error) {
      console.error('MohakAPI Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
};



