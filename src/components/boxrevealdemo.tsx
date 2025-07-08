import { Button } from "@/components/ui/button";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { ArrowRight, Brain, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";

export function BoxRevealDemo() {
  return (
    <div className="size-full max-w-lg items-center justify-center overflow-hidden pt-8 bg-gradient-to-br from-slate-900 to-slate-950 p-8 rounded-xl">
      <BoxReveal boxColor={"#8b5cf6"} duration={0.5}>
        <p className="text-[3.5rem] font-semibold text-white">
          YNot<span className="text-[#8b5cf6]">Now</span>
        </p>
      </BoxReveal>

      <BoxReveal boxColor={"#8b5cf6"} duration={0.6}>
        <h2 className="mt-[.5rem] text-[1.2rem] text-purple-200">
          Idea Validation for{" "}
          <span className="text-[#d946ef] font-semibold">Hackathons & Startups</span>
        </h2>
      </BoxReveal>

      <BoxReveal boxColor={"#8b5cf6"} duration={0.7}>
        <div className="mt-6 text-slate-300">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="h-4 w-4 text-purple-400" />
            <p>
              <span className="font-semibold text-purple-300">AI-Powered Analysis</span> of
              market potential and competition
            </p>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4 text-purple-400" />
            <p>
              <span className="font-semibold text-purple-300">Community Voting</span> and
              feedback from peers
            </p>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-purple-400" />
            <p>
              <span className="font-semibold text-purple-300">Weekly Leaderboards</span> for
              maximum visibility
            </p>
          </div>
        </div>
      </BoxReveal>

      <BoxReveal boxColor={"#8b5cf6"} duration={0.8}>
        <div className="mt-[1.6rem] flex gap-3">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 group">
            Validate Your Idea
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          
        </div>
      </BoxReveal>
    </div>
  );
}
