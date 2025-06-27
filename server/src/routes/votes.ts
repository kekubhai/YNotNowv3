import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get all votes for an idea
router.get('/idea/:ideaId', async (req: Request<{ ideaId: string }>, res: Response) => {
  const { ideaId } = req.params;
  const votes = await prisma.vote.findMany({ where: { ideaId } });
  res.json(votes);
});


router.post('/idea/:ideaId', async (req: Request<{ ideaId: string }>, res: Response):Promise<any> => {
  const { ideaId } = req.params;
  const { userIdentifier, voteType } = req.body; // voteType: 'up' | 'down'
  if (!userIdentifier || !voteType) return res.status(400).json({ error: 'Missing fields' });

  
  const existingVote = await prisma.vote.findFirst({ where: { ideaId, userIdentifier } });
  let vote;
  if (existingVote) {
    vote = await prisma.vote.update({ where: { id: existingVote.id }, data: { voteType } });
  } else {
    vote = await prisma.vote.create({ data: { ideaId, userIdentifier, voteType } });
  }

  
  const upVotes = await prisma.vote.count({ where: { ideaId, voteType: 'up' } });
  const downVotes = await prisma.vote.count({ where: { ideaId, voteType: 'down' } });
  await prisma.idea.update({ where: { id: ideaId }, data: { votes: upVotes - downVotes } });

  res.json(vote);
});


router.delete('/:id', async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  await prisma.vote.delete({ where: { id } });
  res.json({ success: true });
});

export default router;
