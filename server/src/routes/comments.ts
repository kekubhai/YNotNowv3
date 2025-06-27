import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();


router.get('/idea/:ideaId', async (req: Request<{ ideaId: string }>, res: Response) => {
  const { ideaId } = req.params;
  const comments = await prisma.comment.findMany({ where: { ideaId } });
  res.json(comments);
});


router.post('/idea/:ideaId', async (req: Request<{ ideaId: string }>, res: Response):Promise<any> => {
  const { ideaId } = req.params;
  const { author, content } = req.body;
  if (!author || !content) return res.status(400).json({ error: 'Missing fields' });
  const comment = await prisma.comment.create({ data: { author, content, ideaId } });
  res.json(comment);
});

export default router;
