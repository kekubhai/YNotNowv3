import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();


router.get('/', async (req, res):Promise<any> => {
  const ideas = await prisma.idea.findMany({ include: { comments: true, votesList: true } });
  res.json(ideas);
});


router.get('/:id', async (req, res):Promise<any> => {
  const { id } = req.params;
  const idea = await prisma.idea.findUnique({ where: { id }, include: { comments: true, votesList: true } });
  if (!idea) return res.status(404).json({ error: 'Idea not found' });
  res.json(idea);
});


router.post('/', async (req, res) :Promise<any>=> {
  const { title, description, author, category } = req.body;
  if (!title || !description || !author || !category) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const idea = await prisma.idea.create({
    data: { title, description, author, category },
  });
  res.json(idea);
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, category } = req.body;
  const idea = await prisma.idea.update({ where: { id }, data: { title, description, category } });
  res.json(idea);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.idea.delete({ where: { id } });
  res.json({ success: true });
});


router.post('/:id/vote', async (req, res):Promise<any> => {
  const { id } = req.params;
  const { userIdentifier, voteType } = req.body;
  if (!userIdentifier || !voteType) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  
  const existingVote = await prisma.vote.findFirst({ where: { ideaId: id, userIdentifier } });
  let vote;
  if (existingVote) {
    vote = await prisma.vote.update({ where: { id: existingVote.id }, data: { voteType } });
  } else {
    vote = await prisma.vote.create({ data: { ideaId: id, userIdentifier, voteType } });
  }
  
  const upVotes = await prisma.vote.count({ where: { ideaId: id, voteType: 'up' } });
  const downVotes = await prisma.vote.count({ where: { ideaId: id, voteType: 'down' } });
  await prisma.idea.update({ where: { id }, data: { votes: upVotes - downVotes } });
  res.json(vote);
});

export default router;
