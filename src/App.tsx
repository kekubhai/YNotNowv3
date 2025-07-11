import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import IdeasPage from "./pages/IdeasPage"; // Rename this file later to IdeasPage.tsx for clarity
import NotFound from "./pages/NotFound";
import { AuthProvider } from "@/context/AuthContext";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ProtectedRoute from './middleware/ProtectedRoute';
import LeaderboardPage from "./pages/LeaderboardPage"; // Import the new LeaderboardPage component
import { Analytics } from "@vercel/analytics/react";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/ideas" element={<IdeasPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Analytics /> {/* Add it here, inside AuthProvider */}
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
