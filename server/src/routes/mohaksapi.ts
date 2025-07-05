import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';

export const mohakApi = () => {
  const router = Router();

  router.get('/mohaksideas/', async (req: Request, res: Response):Promise<any> => {

    try {
      const idea = await prisma.idea.findMany({
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
      });

const result =idea.filter(idea=>idea.user)
.map(idea=>({
  email:idea.user!.email,
  title:idea.title,
  description:idea.description
}))

      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
};
   

  
