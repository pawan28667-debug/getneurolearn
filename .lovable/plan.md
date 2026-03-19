

# NeuroLearn — AI-Powered Micro-Learning Platform

## Phase 1: Foundation & Design System

### Design System Setup
- Update `index.css` with the full NeuroLearn color palette (Electric Indigo #6366F1, Vibrant Purple #A855F7, Growth Green #22C55E, Deep Slate #0F172A, Ghost White #F8FAFC, Amber #F59E0B)
- Add Google Fonts: **Outfit** (display) and **Inter** (body)
- Light mode default with dark mode toggle support
- Glassmorphism utility classes (frosted glass cards with subtle borders)

### App Shell & Navigation
- Mobile-first bottom navigation bar: **Home Feed**, **Exam Mode**, **Dashboard**, **Profile**
- Desktop: centered phone-frame feed with left nav sidebar and right leaderboard sidebar
- Top bar with daily streak (🔥), XP counter, and dark/light toggle

---

## Phase 2: Authentication & User System

### Supabase Setup (Lovable Cloud)
- Enable Lovable Cloud for backend
- Auth with Google + Email/Password signup
- **Database tables:**
  - `profiles` (display_name, avatar_url, xp, streak_count, current_streak_date)
  - `user_roles` (admin/user roles)
  - `user_progress` (lesson_id, completed, score, timestamp)
  - `bookmarks` (user_id, lesson_id)
  - `lessons` (title, subject, exam_type, content, key_points, formula, mcq_question, mcq_options, mcq_answer, difficulty)

### Auth Pages
- Login/Signup page with Google OAuth + email form
- Protected routes for dashboard and profile

---

## Phase 3: Reel-Based Learning Feed (Core Feature)

### Vertical Swipe Feed
- Full-screen vertical scroll with snap-to-page physics
- Each reel card (glassmorphic) contains:
  - Lesson title + subject tag
  - AI-generated explanation (short, punchy text)
  - Highlighted key points / formula box
  - MCQ quiz at the bottom with animated feedback
  - Like / Bookmark / Share buttons (side rail, Instagram-style)
- Thin progress bar at top showing lesson completion
- XP popup with spring animation on correct MCQ answer
- Seed database with ~15 sample lessons across different exams

### Feed Infrastructure
- Infinite scroll with pagination from Supabase
- Track completed lessons in `user_progress`

---

## Phase 4: AI-Powered Lesson Generation

### Edge Function: `generate-lesson`
- User inputs a topic → Lovable AI (Gemini) generates:
  - 30-60 second lesson content
  - Key points / formula highlights
  - 1 MCQ with 4 options + correct answer
- Store generated lessons in the `lessons` table
- "Generate Lesson" floating action button on the feed

### Smart Features
- Weak area detection based on MCQ accuracy per subject
- Personalized feed ordering (weak topics surface more)

---

## Phase 5: Exam Mode

### Exam Mode Hub
- Grid-based navigation with icons for: JEE Main, JEE Advanced, NEET, UPSC, SSC, Board Exams
- Each exam category filters the feed to relevant lessons
- Exam countdown timer (user sets exam date)
- Category-specific lesson tags and difficulty badges

### Special Modes
- "Last 7 Days Revision" — shows lessons completed in past week
- "Weak Topic Killer" — feed filtered to lowest-accuracy subjects
- "Rank Booster" — daily task checklist (complete 5 lessons, get 3 MCQs right, etc.)

---

## Phase 6: Dashboard & Gamification

### User Dashboard
- Today's learning stats (lessons completed, accuracy %)
- "Continue where you left off" card
- Weak topics heat map (color-coded by accuracy)
- Streak counter with calendar visualization
- Recommended lessons section

### Gamification System
- XP system: +10 for completing lesson, +25 for correct MCQ, +50 for daily streak
- Badges: Beginner (0 XP) → Learner (500) → Scholar (2000) → Pro (5000)
- Exam-wise leaderboard (top users by XP per exam category)

---

## Phase 7: Landing Page

- Hero section: "Learn Anything in 60 Seconds" with animated reel preview mockup
- Features grid with icons
- Exam Mode highlight section
- Testimonials (placeholder)
- Pricing section (Free vs Pro ₹199/month)
- CTA: "Start Learning Free"

---

## Key Technical Decisions
- **Lovable Cloud** for Supabase (auth, database, edge functions)
- **Lovable AI Gateway** for lesson generation (Gemini model)
- Mobile-first responsive with 393px primary breakpoint
- Smooth CSS animations for swipe, XP popups, and transitions

