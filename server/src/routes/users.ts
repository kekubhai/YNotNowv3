import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const router = Router();
const prisma = new PrismaClient();

// Get all users
router.get('/', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Get a user by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// Create a new user
router.post('/', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.create({ data: { email, password } });
  res.status(201).json(user);
});

// Update a user
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, password } = req.body;
  const user = await prisma.user.update({ where: { id }, data: { email, password } });
  res.json(user);
});


router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.user.delete({ where: { id } });
  res.json({ success: true });
});
export default router; 