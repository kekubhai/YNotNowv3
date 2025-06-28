import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

interface FeedbackRequest {
  type: 'bug' | 'feature' | 'general' | 'praise';
  email?: string;
  message: string;
  rating?: number;
  userAgent?: string;
  url?: string;
}

// POST /api/feedback - Submit feedback
router.post('/api/feedback', async (req: Request, res: Response): Promise<any> => {
  try {
    const { type, email, message, rating }: FeedbackRequest = req.body;

    // Validate required fields
    if (!type || !message) {
      return res.status(400).json({ 
        error: 'Feedback type and message are required' 
      });
    }

    // Get user agent and referrer for context
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const referrer = req.headers.referer || 'Unknown';

    // For now, we'll log the feedback
    // In the future, you could save to database or send to external service
    const feedbackData = {
      type,
      email: email || 'anonymous',
      message,
      rating,
      userAgent,
      referrer,
      timestamp: new Date(),
      ip: req.ip
    };

    console.log('📝 New Feedback Received:', {
      type: feedbackData.type,
      email: feedbackData.email,
      message: feedbackData.message.substring(0, 100) + '...',
      rating: feedbackData.rating,
      timestamp: feedbackData.timestamp
    });

    // TODO: Save to database when you have a Feedback model
    // const feedback = await prisma.feedback.create({
    //   data: {
    //     type,
    //     email,
    //     message,
    //     rating,
    //     userAgent,
    //     referrer,
    //   }
    // });

    res.status(200).json({ 
      success: true, 
      message: 'Feedback submitted successfully',
      id: `feedback_${Date.now()}` // Temporary ID
    });

  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ 
      error: 'Failed to submit feedback. Please try again.' 
    });
  }
});

// GET /api/feedback - Get all feedback (admin only)
router.get('/api/feedback', async (req: Request, res: Response): Promise<any> => {
  try {
    // TODO: Add authentication middleware to protect this endpoint
    // const feedbacks = await prisma.feedback.findMany({
    //   orderBy: { createdAt: 'desc' },
    //   take: 100
    // });

    res.status(200).json({ 
      message: 'Feedback endpoint - TODO: Implement database storage',
      count: 0,
      feedbacks: []
    });

  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ 
      error: 'Failed to fetch feedback' 
    });
  }
});

export default router;
