import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/layout/AppLayout";
import Landing from "@/pages/Landing";
import Feed from "@/pages/Feed";
import Exams from "@/pages/Exams";
import ExamFeed from "@/pages/ExamFeed";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Disclaimer from "@/pages/Disclaimer";
import StudyMaterial from "@/pages/StudyMaterial";
import StudySubjects from "@/pages/StudySubjects";
import StudyClasses from "@/pages/StudyClasses";
import StudyChapters from "@/pages/StudyChapters";
import StudyChapterDetail from "@/pages/StudyChapterDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/index" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route element={<AppLayout />}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/exams/:examType" element={<ExamFeed />} />
            <Route path="/study" element={<StudyMaterial />} />
            <Route path="/study/:examType" element={<StudySubjects />} />
            <Route path="/study/:examType/:subject" element={<StudyClasses />} />
            <Route path="/study/:examType/:subject/:classLevel" element={<StudyChapters />} />
            <Route path="/study/:examType/:subject/:classLevel/:chapterId" element={<StudyChapterDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
