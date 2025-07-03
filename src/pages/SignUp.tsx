import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Lock, CheckCircle, XCircle, User } from 'lucide-react';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  
  // Password validation states
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false
  });
  
  // Update password validation on every password change
  useEffect(() => {
    setPasswordValidation({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password)
    });
  }, [password]);
  
  // Check if password meets all requirements
  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate password before submission
    if (!isPasswordValid) {
      setError('Please ensure your password meets all requirements');
      return;
    }
    
    try {
      // Pass username as third parameter
      await signup(email, password, username);
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Helper function to render validation status
  const ValidationItem = ({ isValid, text }: { isValid: boolean, text: string }) => (
    <div className="flex items-center gap-2 text-xs">
      {isValid ? (
        <CheckCircle className="w-3.5 h-3.5 text-green-400" />
      ) : (
        <XCircle className="w-3.5 h-3.5 text-slate-400" />
      )}
      <span className={isValid ? "text-green-400" : "text-slate-400"}>
        {text}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen w-full flex bg-gradient-to-br from-slate-950 to-slate-900">
      {/* Left side - Image with overlay */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img 
          src="https://i.pinimg.com/736x/e6/ad/e6/e6ade6665a22b592dc5231a6cba70a56.jpg" 
          alt="Innovation Illustration" 
          className="absolute inset-0 w-full "
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 to-slate-900/80 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-12 text-white">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold mb-4">Turn ideas into reality</h1>
            <p className="text-lg opacity-90 mb-6">
              Join our community of innovators, validate your ideas, and connect with like-minded entrepreneurs.
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                <span className="text-xl">🚀</span>
              </div>
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                <span className="text-xl">💡</span>
              </div>
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                <span className="text-xl">🌟</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Sign Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white">Create your account</h2>
            <p className="text-slate-400 mt-2">Start validating your ideas with our community</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-5">
                <div className="relative">
              <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-1">Username</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <User size={18} />
                </span>
                <input
                  id="username"
                  type="text"
                  placeholder="Choose a username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-800 text-white border border-slate-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                />
              </div>
              <p className="mt-1 text-xs text-slate-500">This will be displayed publicly</p>
            </div>
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
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-800 text-white border border-slate-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                  required
                />
              </div>
            </div>
            
        

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">
                Password
                {password && (
                  <span className={`ml-2 text-xs ${isPasswordValid ? 'text-green-400' : 'text-orange-400'}`}>
                    {isPasswordValid ? '(Valid)' : '(Requirements not met)'}
                  </span>
                )}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Lock size={18} />
                </span>
                <input
                  id="password"
                  type="password"
                  placeholder="Create a secure password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-800 text-white border ${
                    password && !isPasswordValid 
                      ? 'border-orange-500 focus:border-orange-500 focus:ring-orange-500' 
                      : 'border-slate-700 focus:border-purple-500 focus:ring-purple-500'
                  } focus:ring-1 focus:outline-none`}
                  required
                />
              </div>
              
              {/* Password requirements */}
              <div className="mt-2 p-3 bg-slate-800/50 border border-slate-700 rounded-md grid grid-cols-2 gap-2">
                <ValidationItem 
                  isValid={passwordValidation.length} 
                  text="At least 8 characters" 
                />
                <ValidationItem 
                  isValid={passwordValidation.uppercase} 
                  text="One uppercase letter" 
                />
                <ValidationItem 
                  isValid={passwordValidation.lowercase} 
                  text="One lowercase letter" 
                />
                <ValidationItem 
                  isValid={passwordValidation.number} 
                  text="One number" 
                />
              </div>
            </div>

            <Button 
              type="submit"
              disabled={!email || !isPasswordValid}
              className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white rounded-lg flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Account
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <div className="mt-6 text-center">
              <p className="text-slate-400">
                Already have an account?{' '}
                <Link to="/signin" className="text-purple-400 hover:text-purple-300 hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
