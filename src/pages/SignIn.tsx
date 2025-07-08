import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Lock, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const { login } = useAuth();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    if (!password.trim()) {
      setError('Please enter your password');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await login(email, password);
    } catch (err: any) {
      // Improved error messages
      if (err.message.includes('auth/user-not-found') || err.message.includes('auth/wrong-password')) {
        setError('Invalid email or password. Please try again.');
      } else if (err.message.includes('auth/too-many-requests')) {
        setError('Too many failed login attempts. Please try again later or reset your password.');
      } else {
        setError(err.message || 'An error occurred during sign in. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-row-reverse bg-gradient-to-br from-slate-950 to-slate-900">
      {/* Right side - Image with overlay */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img 
          src="https://i.pinimg.com/736x/f6/0b/11/f60b110f23ca9afde72091da895542f8.jpg" 
          alt="Innovation Illustration" 
          className="absolute inset-0 w-full "
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 to-slate-900/80 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-12 text-white">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold mb-4">Welcome back Builder</h1>
            <p className="text-lg opacity-90 mb-6">
              Continue your journey of innovation and idea validation with our community.
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                <span className="text-xl">✨</span>
              </div>
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                <span className="text-xl">🔍</span>
              </div>
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                <span className="text-xl">🚀</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Left side - Sign In Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white">Sign in to your account</h2>
            <p className="text-slate-400 mt-2">Welcome back! Please enter your details.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-5">
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Email address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Mail size={18} />
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-800 text-white border ${
                    error && !email.trim() ? 'border-red-500' : 'border-slate-700'
                  } focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none`}
                  required
                />
              </div>
              {error && !email.trim() && (
                <p className="mt-1 text-xs text-red-400">Please enter your email</p>
              )}
            </div>
            
            <div className="relative">
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-slate-300">Password</label>
                <Dialog open={isForgotPasswordOpen} onOpenChange={setIsForgotPasswordOpen}>
                  <DialogTrigger asChild>
                    <button 
                      type="button"
                      className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-600/50 shadow-2xl">
                    <DialogHeader className="space-y-3">
                      <DialogTitle className="text-white text-2xl font-bold text-center">
                        <span className="bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                          Really? 🤦‍♂️
                        </span>
                      </DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-6 p-4">
                      {/* Main message with better styling */}
                      <div className="text-center p-6 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-red-500/10 rounded-xl border border-red-500/20">
                        <p className="text-slate-200 text-xl leading-relaxed font-medium">
                          Are you <span className="text-red-400 font-bold">dumb</span> to forget such a simple thing <span className="text-orange-400 font-bold">bro</span>? 😅
                        </p>
                        <div className="mt-3 text-6xl">🤷‍♂️</div>
                      </div>

                      {/* Contact info with improved design */}
                      <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/60 p-6 rounded-xl border border-slate-600/50 backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                          <p className="text-slate-300 font-medium">Need actual help? Contact me:</p>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors">
                            <div className="w-8 h-8 bg-indigo-500/20 rounded-full flex items-center justify-center">
                              <span className="text-indigo-400 text-sm font-bold">📱</span>
                            </div>
                            <span className="text-indigo-300 font-medium">Text Anirban</span>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors">
                            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                              <span className="text-blue-400 text-sm font-bold">🐦</span>
                            </div>
                            <a 
                              href="https://twitter.com/onirbanhere" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-300 hover:text-blue-200 transition-colors font-medium hover:underline"
                            >
                              @onirbanhere
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-3">
                        <Button 
                          onClick={() => setIsForgotPasswordOpen(false)}
                          variant="outline"
                          className="flex-1 border-slate-600 text-slate-900 hover:bg-slate-700/50"
                        >
                          Close
                        </Button>
                        <Button 
                          onClick={() => setIsForgotPasswordOpen(false)}
                          className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                          Got it! 😄
                        </Button>
                      </div>
                      
                      {/* Fun footer */}
                      <div className="text-center pt-2 border-t border-slate-700/50">
                        <p className="text-xs text-slate-500">
                          Pro tip: Use a password manager next time! 🤓
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Lock size={18} />
                </span>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-800 text-white border ${
                    error && !password.trim() ? 'border-red-500' : 'border-slate-700'
                  } focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none`}
                  required
                />
              </div>
              {error && !password.trim() && (
                <p className="mt-1 text-xs text-red-400">Please enter your password</p>
              )}
            </div>

            <div className="mt-1 text-xs text-slate-500">
              <p>Remember: Your password must contain at least:</p>
              <ul className="list-disc ml-5 mt-1">
                <li>8 characters</li>
                <li>One uppercase letter</li>
                <li>One lowercase letter</li>
                <li>One number</li>
              </ul>
            </div>

            <Button 
              type="submit" 
              className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-700 hover:to-purple-600 text-white rounded-lg flex items-center justify-center group"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>

            <div className="mt-6 text-center">
              <p className="text-slate-400">
                Don't have an account?{' '}
                <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
