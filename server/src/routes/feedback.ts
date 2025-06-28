import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

interface FeedbackRequest {
  name: string;
  message: string;
}

router.post('/api/feedback', async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, message }: FeedbackRequest = req.body;

    if (!message) {
      return res.status(400).json({ 
        error: 'Message is required' 
      });
    }

    const feedback = await prisma.feedback.create({
      data: {
        email: name || 'Anonymous',
        message,
        type: 'general',
        userAgent: req.headers['user-agent'] || 'Unknown',
        referrer: req.headers.referer || 'Unknown',
      }
    });

    res.status(200).json({ 
      success: true, 
      message: 'Feedback submitted successfully',
      id: feedback.id
    });

  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ 
      error: 'Failed to submit feedback. Please try again.' 
    });
  }
});

router.get('/api/feedback', async (req: Request, res: Response): Promise<any> => {
  try {
    const feedbacks = await prisma.feedback.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100
    });

    res.status(200).json({ 
      success: true,
      count: feedbacks.length,
      feedbacks
    });

  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ 
      error: 'Failed to fetch feedback' 
    });
  }
});

export default router;
