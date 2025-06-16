
import React from 'react';
import { Lightbulb } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">YNotNow</h1>
              <p className="text-sm text-gray-400">Validate your startup ideas</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
              Ideas
            </a>
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
              Top Rated
            </a>
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
              About
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};
