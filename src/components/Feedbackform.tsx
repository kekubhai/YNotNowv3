import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  MessageSquare, 
  Send, 
  Star, 
  Bug, 
  Lightbulb, 
  Heart,
  X,
  CheckCircle 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type FeedbackType = 'bug' | 'feature' | 'general' | 'praise';

interface FeedbackFormData {
  type: FeedbackType;
  email: string;
  message: string;
  rating?: number;
}

export const FeedbackButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('general');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const feedbackTypes = [
    { type: 'bug' as FeedbackType, icon: Bug, label: 'Bug Report', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
    { type: 'feature' as FeedbackType, icon: Lightbulb, label: 'Feature Request', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    { type: 'general' as FeedbackType, icon: MessageSquare, label: 'General Feedback', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' },
    { type: 'praise' as FeedbackType, icon: Heart, label: 'Praise', color: 'bg-pink-500/20 text-pink-400 border-pink-500/30' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const feedbackData: FeedbackFormData = {
      type: feedbackType,
      email,
      message,
      rating: feedbackType === 'general' ? rating : undefined,
    };

    try {
      // Here you would send the feedback to your backend
      // await fetch('/api/feedback', { method: 'POST', body: JSON.stringify(feedbackData) });
      console.log('Feedback submitted:', feedbackData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      
      // Reset form after success
      setTimeout(() => {
        setIsSubmitted(false);
        setOpen(false);
        setEmail('');
        setMessage('');
        setRating(0);
        setFeedbackType('general');
      }, 2000);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => setRating(i + 1)}
        className={`transition-colors ${
          i < rating ? 'text-yellow-400' : 'text-gray-600 hover:text-yellow-300'
        }`}
      >
        <Star className="w-5 h-5 fill-current" />
      </button>
    ));
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
              {/* Header */}
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

              {/* Feedback Type Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-slate-300">Feedback Type</Label>
                <div className="grid grid-cols-2 gap-2">
                  {feedbackTypes.map(({ type, icon: Icon, label, color }) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFeedbackType(type)}
                      className={`p-3 rounded-lg border text-xs font-medium transition-all flex items-center gap-2 ${
                        feedbackType === type
                          ? color
                          : 'bg-slate-800/50 text-slate-400 border-slate-700 hover:bg-slate-800 hover:border-slate-600'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating (only for general feedback) */}
              {feedbackType === 'general' && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-slate-300">
                    Rate your experience
                  </Label>
                  <div className="flex gap-1">
                    {renderStars()}
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-slate-300">
                  Email (optional)
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 focus:border-orange-400"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium text-slate-300">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  placeholder={
                    feedbackType === 'bug'
                      ? 'Describe the bug you encountered...'
                      : feedbackType === 'feature'
                      ? 'Describe the feature you would like to see...'
                      : feedbackType === 'praise'
                      ? 'Tell us what you love about YNotNow...'
                      : 'Share your thoughts with us...'
                  }
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 focus:border-orange-400 min-h-[100px] resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || !message.trim()}
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

              {/* Footer */}
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
