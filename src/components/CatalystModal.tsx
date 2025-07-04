import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Rocket, Mail } from 'lucide-react';
import { AnimatedButton } from './ui/animated-button';
import { ScrollReveal } from './ui/scroll-reveal';

interface CatalystModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CatalystModal: React.FC<CatalystModalProps> = ({ open, onOpenChange }) => {
  const [email, setEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, send this to your backend or newsletter service
      console.log('Notifying when available:', email);
      setSubmitted(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border border-slate-700 text-white sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <Rocket className="h-8 w-8 text-purple-400" />
          </div>
          <DialogTitle className="text-2xl text-center">Coming Soon to YNotNow</DialogTitle>
          <DialogDescription className="text-center text-slate-300">
            We're working with Catalyst to bring you a seamless experience for finding talented builders for your ideas.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-6 text-center">
            <p className="text-green-400 mb-2">Thanks for your interest!</p>
            <p className="text-slate-300">We'll notify you when this feature is available.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="py-4">
              <p className="mb-4 text-slate-300">Get notified when the Catalyst integration is ready:</p>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 bg-slate-800 border-slate-700"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <AnimatedButton
                  type="submit"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg shadow"
                >
                  Notify Me
                </AnimatedButton>
              </div>
            </div>
          </form>
        )}

        <DialogFooter className="sm:justify-center">
          <Button
            variant="outline"
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
            onClick={() => window.open('https://catalystplatform.com', '_blank')}
          >
            Visit Catalyst
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};