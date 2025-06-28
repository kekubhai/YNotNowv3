import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { 
  MessageSquare, 
  Send, 
  X,
  CheckCircle 
} from 'lucide-react';

interface FeedbackFormData {
  email: string;
  message: string;
}

export const FeedbackButton: React.FC = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(user?.email || '');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const feedbackData: FeedbackFormData = {
      email: email || user?.email || 'anonymous@example.com',
      message,
    };

    try {
      const response = await fetch('http://localhost:3000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }
      
      setIsSubmitted(true);
      
      setTimeout(() => {
        setIsSubmitted(false);
        setOpen(false);
        setMessage('');
        if (!user?.email) setEmail('');
      }, 2000);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size="lg"
            className="h-14 w-14 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          >
            <MessageSquare className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </Button>
        </PopoverTrigger>
        
        <PopoverContent 
          side="top" 
          align="end" 
          className="w-96 p-0 bg-slate-900/95 backdrop-blur-sm border-slate-700 shadow-2xl"
        >
          {isSubmitted ? (
            <div className="p-6 text-center">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Thank you!</h3>
              <p className="text-slate-400">Your feedback has been submitted successfully.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-orange-400" />
                  <h3 className="text-lg font-semibold text-white">Send Feedback</h3>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-slate-300">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 focus:border-orange-400"
                  required
                  disabled={!!user?.email}
                />
                {user?.email && (
                  <p className="text-xs text-slate-500">Using your account email</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium text-slate-300">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  placeholder="Share your thoughts with us..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 focus:border-orange-400 min-h-[100px] resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !message.trim() || !email.trim()}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Send Feedback
                  </div>
                )}
              </Button>

              <p className="text-xs text-slate-500 text-center">
                Your feedback helps us improve YNotNow for everyone.
              </p>
            </form>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FeedbackButton;
