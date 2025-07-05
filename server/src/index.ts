import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import ideasRouter from './routes/ideas';
import commentsRouter from './routes/comments';
import votesRouter from './routes/votes';
import router from './routes/users';
import feedbackRouter from './routes/feedback';
import { mohakApi } from './routes/mohaksapi';
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

app.use(cors());
app.use(express.json());


app.use((req: Request, res: Response, next: NextFunction):any => {

  if (
    req.path === '/landing' || 
    req.path === '/auth/login' || 
    req.path === '/auth/register' || 
    req.path.startsWith('/api/feedback') ||
    (req.path === '/ideas' && req.method === 'GET') 
  ) {
    return next();
  }
  
  
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Landing page route (public)
app.get('/landing', (req, res) => {
  res.json({ message: 'Welcome to YNotNow Landing Page!' });
});

// Auth routes
app.post('/auth/login', async (req, res): Promise<any> => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = await prisma.user.findUnique({ 
      where: { email: email.toLowerCase() } 
    });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // For development, you might want to hash passwords properly
    // For now, checking plain text (NOT RECOMMENDED FOR PRODUCTION)
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create token with all required fields
    const ynn3_token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        username: user.username || user.email.split('@')[0]
      }, 
      JWT_SECRET, 
      { expiresIn: '7d' }
    );

    res.json({ ynn3_token, user: { id: user.id, email: user.email, username: user.username } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/auth/register', async (req, res): Promise<any> => {
  try {
    const { email, password, username } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ 
      where: { email: email.toLowerCase() } 
    });
    
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Create user
    const user = await prisma.user.create({ 
      data: { 
        email: email.toLowerCase(), 
        password, // In production, hash this!
        username: username || email.split('@')[0]
      } 
    });

    // Create token
    const ynn3_token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        username: user.username
      }, 
      JWT_SECRET, 
      { expiresIn: '7d' }
    );

    res.json({ ynn3_token, user: { id: user.id, email: user.email, username: user.username } });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add this to your server/src/index.ts
app.get('/auth/me', async (req: Request, res: Response): Promise<any> => {
  // Verify token
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });
  
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({ 
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        username: true,
        photoURL: true,
      }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ user });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

app.use('/ideas', ideasRouter);
app.use('/comments', commentsRouter);
app.use('/votes', votesRouter);
app.use('/users', router);

app.use('/feedback', feedbackRouter);

app.use('/mohakApi', mohakApi());

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
