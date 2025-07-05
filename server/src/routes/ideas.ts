import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();


router.get('/', async (req, res):Promise<any> => {
  try {
    const ideas = await prisma.idea.findMany({ 
      include: { 
        comments: true, 
        votesList: true,
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


router.get('/:id', async (req, res):Promise<any> => {
  try {
    const { id } = req.params;
    const idea = await prisma.idea.findUnique({ 
      where: { id }, 
      include: { 
        comments: true, 
        votesList: true,
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
    
    if (!idea) return res.status(404).json({ error: 'Idea not found' });
    res.json(idea);
  } catch (error: any) {
    console.error('Error fetching idea by ID:', error);
    res.status(500).json({ error: 'Failed to fetch idea', details: error.message });
  }
});


router.post('/', async (req, res) :Promise<any>=> {
  console.log('Creating new idea, received body:', req.body);
  const { title, description, author, category } = req.body;
  
  if (!title || !description || !author || !category) {
    console.log('Missing fields:', { title, description, author, category });
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  try {
    // Check if a user with the given email or username exists
    const userExists = await prisma.user.findFirst({
      where: {
        OR: [
          { email: author },
          { username: author }
        ]
      }
    });
    
    if (!userExists) {
      console.log(`No user found with identifier: ${author}`);
      return res.status(400).json({ 
        error: 'User not found', 
        message: `No user found with email/username: ${author}. User must exist before creating an idea.` 
      });
    }
    
    console.log('User found:', userExists);
    
    // If user exists, create the idea - ensure we use the email for the author field
    // since our schema connects Idea.author to User.email
    const userEmail = userExists.email; // Always use the email from the found user
    
    console.log('Creating idea with author email:', userEmail);
    
    const idea = await prisma.idea.create({
      data: { 
        title, 
        description, 
        author: userEmail, // Always use email as the foreign key
        category 
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            photoURL: true
          }
        },
        comments: true
      }
    });
    
    res.json(idea);
  } catch (error: any) {
    console.error('Error creating idea:', error);
    res.status(500).json({ error: 'Failed to create idea', details: error.message });
  }
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
