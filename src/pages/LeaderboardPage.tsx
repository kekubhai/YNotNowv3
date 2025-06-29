import React, { useState, useEffect } from "react";
import { Leaderboard } from "../components/Leaderboard";
import { Idea } from "./IdeasPage";
import { Button } from "@/components/ui/button";
import { Rocket, Code2, Layers } from "lucide-react";

const hardcodedIdeas: Idea[] = [
  {
    id: "1",
    title: "AI Startup Validator",
    description: "A platform that uses AI to validate startup ideas in real-time.",
    author: "Jane Doe",
    category: "startup",
    votes: 42,
    comments: [],
    createdAt: new Date(),
    userVote: null,
  },
  {
    id: "2",
    title: "Hackathon Helper Bot",
    description: "A Discord bot that helps hackathon teams organize and submit projects.",
    author: "John Smith",
    category: "hackathon",
    votes: 35,
    comments: [],
    createdAt: new Date(),
    userVote: null,
  },
  {
    id: "3",
    title: "CollabFinder",
    description: "Find collaborators for your next big idea!",
    author: "Alex Lee",
    category: "both",
    votes: 28,
    comments: [],
    createdAt: new Date(),
    userVote: null,
  },
];

const categoryOptions = [
  { label: "All", value: "all", icon: Layers },
  { label: "Startup", value: "startup", icon: Rocket },
  { label: "Hackathon", value: "hackathon", icon: Code2 },
  { label: "Both", value: "both", icon: Layers },
];

const LeaderboardPage: React.FC = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const fetchIdeas = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/ideas");
        const data = await res.json();
        if (data && data.length > 0) {
          setIdeas(data.map((idea: any) => ({ ...idea, createdAt: new Date(idea.createdAt) })));
        } else {
          setIdeas(hardcodedIdeas);
        }
      } catch (error) {
        setIdeas(hardcodedIdeas);
      } finally {
        setLoading(false);
      }
    };
    fetchIdeas();
  }, []);

  // Filtering logic
  const filteredIdeas = ideas.filter((idea) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "both") return idea.category === "both";
    return idea.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black py-12 px-2">
      <div className="max-w-2xl mx-auto bg-black/80 rounded-2xl shadow-2xl border border-purple-900 p-8">
        <h1 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-purple-400 via-fuchsia-500 to-purple-700 bg-clip-text text-transparent drop-shadow-lg">
          Leaderboard
        </h1>
        <div className="flex justify-center gap-2 mb-8">
          {categoryOptions.map((opt) => (
            <Button
              key={opt.value}
              onClick={() => setSelectedCategory(opt.value)}
              variant={selectedCategory === opt.value ? "secondary" : "outline"}
              className={`rounded-full px-4 flex items-center gap-2 border-purple-800 text-sm font-semibold transition-all duration-200 ${selectedCategory === opt.value ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white border-none" : "bg-black/60 text-purple-300 hover:bg-purple-900/40"}`}
              size="sm"
            >
              <opt.icon className="w-4 h-4" />
              {opt.label}
            </Button>
          ))}
        </div>
        {loading ? (
          <div className="text-center py-16 text-purple-300">Loading...</div>
        ) : filteredIdeas.length === 0 ? (
          <div className="text-center py-16 text-purple-400">No ideas found for this category.</div>
        ) : (
          <Leaderboard ideas={filteredIdeas} />
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;
