
import React from 'react';
import { Card } from '@/components/ui/card';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import type { Idea } from '../pages/Index';

interface LeaderboardProps {
  ideas: Idea[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ ideas }) => {
  // Sort ideas by votes (top 5)
  const topIdeas = [...ideas]
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 5);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 1:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 2:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <TrendingUp className="w-5 h-5 text-orange-400" />;
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0:
        return 'border-l-yellow-400 bg-gradient-to-r from-yellow-400/10 to-transparent';
      case 1:
        return 'border-l-gray-400 bg-gradient-to-r from-gray-400/10 to-transparent';
      case 2:
        return 'border-l-amber-600 bg-gradient-to-r from-amber-600/10 to-transparent';
      default:
        return 'border-l-orange-400 bg-gradient-to-r from-orange-400/10 to-transparent';
    }
  };

  if (topIdeas.length === 0) {
    return null;
  }

  return (
    <Card className="p-6 bg-slate-900 border-slate-700 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
          <Trophy className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">🏆 Leaderboard</h2>
          <p className="text-sm text-slate-400">Top voted startup ideas</p>
        </div>
      </div>
      
      <div className="space-y-3">
        {topIdeas.map((idea, index) => (
          <div
            key={idea.id}
            className={`flex items-center gap-4 p-4 rounded-lg border-l-4 transition-all duration-200 hover:scale-[1.02] ${getRankColor(index)}`}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-slate-400">
                #{index + 1}
              </span>
              {getRankIcon(index)}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white truncate">
                {idea.title}
              </h3>
              <p className="text-sm text-slate-400">
                by {idea.author}
              </p>
            </div>
            
            <div className="flex items-center gap-1 bg-slate-800 px-3 py-1 rounded-full">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="font-bold text-green-400">
                {idea.votes}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
