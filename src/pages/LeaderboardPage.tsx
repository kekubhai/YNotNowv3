import React, { useState, useEffect } from "react";
import { Leaderboard } from "../components/Leaderboard";
import { Idea } from "./IdeasPage";
import { Button } from "@/components/ui/button";
import { Clock, Trophy, ArrowUp, User, Home, Lightbulb } from "lucide-react";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { AnimatedCard } from '../components/ui/animated-card';
import { ScrollReveal } from '../components/ui/scroll-reveal';
import { useNavigate } from 'react-router-dom';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

const hardcodedIdeas: Idea[] = [
    {
        id: "1",
        title: "AI Startup Validator",
        description: "A platform that uses AI to validate startup ideas in real-time.",
        author: "Jane Doe",
        category: "startup",
        votes: 42,
        comments: [],
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), 
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
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
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
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        userVote: null,
    },
];

const timeOptions = [
    { label: "Past 7 Days", value: "week", icon: Clock },
    { label: "All Time", value: "all", icon: Trophy },
];

const LeaderboardPage: React.FC = () => {
    const [ideas, setIdeas] = useState<Idea[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTime, setSelectedTime] = useState<string>("week");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchIdeas = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${backendUrl}/ideas`);
                const data = await res.json();
                if (data && data.length > 0) {
                    setIdeas(
                        data.map((idea: any) => ({
                            ...idea,
                            createdAt: new Date(idea.createdAt),
                        }))
                    );
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

    const filteredIdeas = ideas
        .filter((idea) => {
            if (selectedTime === "all") return true;
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            return new Date(idea.createdAt) >= oneWeekAgo;
        })
        .sort((a, b) => b.votes - a.votes);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/30 to-slate-950 py-6 sm:py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header - Fully Responsive */}
                <div className="text-center mb-6 sm:mb-10">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-purple-400 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent mb-3 tracking-tight">
                        Idea Champions
                    </h1>
                    <p className="text-slate-900 max-w-2xl mx-auto text-lg sm:text-base md:text-lg lg:text-xl text-center px-4">
                        Where the{" "}
                        <span className="text-purple-900">
                            <ContainerTextFlip className="p-1 text-sm" words={["most upvoted", "most liked", "most discussed"]}></ContainerTextFlip>
                        </span> ideas rise to the top
                    </p>
                </div>

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 justify-center sm:justify-start">
                    <Button
                        onClick={() => navigate('/')}
                        variant="outline"
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-900/50 to-slate-800/50 border-slate-700 text-white hover:from-slate-800/70 hover:to-slate-700/70 hover:border-slate-600 transition-all duration-200 rounded-lg"
                    >
                        <Home className="w-4 h-4" />
                        <span className="font-medium">Go to Home</span>
                    </Button>
                    
                    <Button
                        onClick={() => navigate('/ideas')}
                        variant="outline"
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-900/50 to-fuchsia-900/50 border-purple-700 text-purple-200 hover:from-purple-800/70 hover:to-fuchsia-800/70 hover:border-purple-600 hover:text-white transition-all duration-200 rounded-lg"
                    >
                        <Lightbulb className="w-4 h-4" />
                        <span className="font-medium">Checkout Ideas</span>
                    </Button>
                </div>

                {/* Main Content Card - Responsive */}
                <div className="bg-black/70 backdrop-blur-sm border border-purple-900/40 rounded-xl p-4 sm:p-6 mb-8 shadow-xl shadow-purple-950/20">
                    {/* Header Section - Responsive */}
                    <div className="flex flex-col gap-4 mb-6">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                            <span className="bg-gradient-to-r from-purple-400 to-fuchsia-500 bg-clip-text text-transparent">
                                {selectedTime === "week"
                                    ? "🏆 This Week's Rockstars"
                                    : "🥇 Hall of Fame"}
                            </span>
                        </h2>

                        {/* Time Filter Buttons - Responsive */}
                        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                            {timeOptions.map((opt) => (
                                <Button
                                    key={opt.value}
                                    onClick={() => setSelectedTime(opt.value)}
                                    variant="ghost"
                                    className={`rounded-lg px-3 py-2 flex items-center gap-2 text-xs sm:text-sm ${
                                        selectedTime === opt.value
                                            ? "bg-gradient-to-r from-purple-900/40 to-fuchsia-900/40 text-white border border-purple-500/50"
                                            : "bg-transparent text-slate-400 hover:bg-purple-950/30 hover:text-purple-300"
                                    }`}
                                    size="sm"
                                >
                                    <opt.icon className="w-4 h-4" />
                                    <span className="hidden sm:inline">{opt.label}</span>
                                    <span className="sm:hidden">{opt.value === "week" ? "7D" : "All"}</span>
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading ? (
                        <div className="text-center py-12 sm:py-16">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-purple-300 text-sm sm:text-base">Loading brilliant ideas...</p>
                        </div>
                    ) : filteredIdeas.length === 0 ? (
                        <div className="text-center py-12 sm:py-16 text-purple-400 text-sm sm:text-base">
                            {selectedTime === "week"
                                ? "No ideas submitted this week yet. Be the first!"
                                : "No ideas available. Start by submitting yours!"}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            {/* Desktop Table Header - Hidden on Mobile */}
                            <div className="hidden md:grid grid-cols-12 gap-4 py-3 text-sm font-medium bg-gradient-to-r from-purple-900/20 to-fuchsia-900/20 border-b border-purple-800/30 text-purple-200 rounded-t-lg mb-1 px-3">
                                <div className="col-span-1 text-center">#</div>
                                <div className="col-span-7 pl-2">Innovation</div>
                                <div className="col-span-2 text-right">Creator</div>
                                <div className="col-span-2 text-right pr-2">Votes</div>
                            </div>

                            {/* Ideas List - Responsive Cards */}
                            {filteredIdeas.map((idea, index) => (
                                <ScrollReveal key={idea.id}>
                                    <AnimatedCard>
                                        {/* Desktop Layout */}
                                        <div className="hidden md:grid grid-cols-12 gap-4 py-4 border-b border-purple-900/20 hover:bg-gradient-to-r hover:from-purple-900/10 hover:to-fuchsia-900/10 transition-colors rounded-md">
                                            <div className="col-span-1 flex justify-center items-center">
                                                <div
                                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                                        index === 0
                                                            ? "bg-gradient-to-br from-yellow-400/20 to-yellow-600/30 text-yellow-300 border border-yellow-500/50"
                                                            : index === 1
                                                            ? "bg-gradient-to-br from-slate-300/10 to-slate-400/20 text-slate-300 border border-slate-400/30"
                                                            : index === 2
                                                            ? "bg-gradient-to-br from-amber-700/10 to-amber-800/20 text-amber-600 border border-amber-700/30"
                                                            : "bg-gradient-to-br from-purple-900/10 to-purple-950/20 text-slate-400 border border-purple-900/20"
                                                    }`}
                                                >
                                                    {index + 1}
                                                </div>
                                            </div>

                                            <div className="col-span-7 flex items-center">
                                                <div className="w-full">
                                                    <h3 className="text-black font-medium mb-1">
                                                        {idea.title}
                                                    </h3>
                                                    <p className="text-slate-900 text-sm leading-relaxed font-serif">
                                                        {idea.description}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="col-span-2 flex items-center justify-end">
                                                <span className="text-purple-900 text-md font-medium">
                                                    {idea.user?.username || idea.author}
                                                </span>
                                            </div>

                                            <div className="col-span-2 flex items-center justify-end pr-2">
                                                <div className="flex items-center bg-gradient-to-r from-purple-900/30 to-fuchsia-900/30 px-3 py-1 rounded-lg border border-purple-500/30">
                                                    <ArrowUp className="w-4 h-4 text-green-400 mr-1" />
                                                    <span className="text-white font-bold">
                                                        {idea.votes}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Mobile Layout - Card Style */}
                                        <div className="md:hidden bg-gradient-to-r from-purple-900/10 to-fuchsia-900/10 border border-purple-900/20 rounded-lg p-4 mb-4 hover:from-purple-900/20 hover:to-fuchsia-900/20 transition-colors">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                                            index === 0
                                                                ? "bg-gradient-to-br from-yellow-400/20 to-yellow-600/30 text-yellow-300 border border-yellow-500/50"
                                                                : index === 1
                                                                ? "bg-gradient-to-br from-slate-300/10 to-slate-400/20 text-slate-300 border border-slate-400/30"
                                                                : index === 2
                                                                ? "bg-gradient-to-br from-amber-700/10 to-amber-800/20 text-amber-600 border border-amber-700/30"
                                                                : "bg-gradient-to-br from-purple-900/10 to-purple-950/20 text-slate-400 border border-purple-900/20"
                                                        }`}
                                                    >
                                                        {index + 1}
                                                    </div>
                                                    <div className="flex items-center bg-gradient-to-r from-purple-900/30 to-fuchsia-900/30 px-3 py-1 rounded-lg border border-purple-500/30">
                                                        <ArrowUp className="w-4 h-4 text-green-400 mr-1" />
                                                        <span className="text-white font-bold text-sm">
                                                            {idea.votes}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <h3 className="text-black font-medium mb-2 text-base">
                                                    {idea.title}
                                                </h3>
                                                <p className="text-slate-900 text-sm leading-relaxed font-serif">
                                                    {idea.description}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between text-xs">
                                                <div className="flex items-center gap-1 text-purple-900">
                                                    <User className="w-3 h-3" />
                                                    <span>{idea.user?.username || idea.author}</span>
                                                </div>
                                                <div className="text-slate-500">
                                                    {idea.category.charAt(0).toUpperCase() + idea.category.slice(1)}
                                                </div>
                                            </div>
                                        </div>
                                    </AnimatedCard>
                                </ScrollReveal>
                            ))}
                        </div>
                    )}

                    {/* Live Indicator - Responsive */}
                    <div className="mt-4 flex justify-center sm:justify-end">
                        <div className="flex items-center text-xs bg-black/40 px-2 py-1 rounded-full border border-green-500/30">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                            <span className="text-green-400">Live Updates</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaderboardPage;
