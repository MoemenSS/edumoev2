# 📄 PROJECT_CONTEXT.md — Master Context File

## The Complete Brain of Edumoe

---

## 📌 How to Use This File

This is the **single source of truth** for the Edumoe project. Any AI (DeepSeek, ChatGPT, Claude) or developer should be able to read **only this file** and immediately understand:

- What Edumoe is and why it exists
- The complete technical architecture
- The folder structure and conventions
- The database schema
- The feature roadmap
- The coding standards
- The founder's intentions

**Philosophy:**
> This file is the brain of Edumoe. It is not just documentation — it is the project's memory, reasoning, and soul. Every future AI session starts here. Every developer reads this first. Every decision is traced back to this document.

**When to update:**
- After any major architectural decision
- When adding a new feature
- When changing the tech stack
- When the roadmap shifts
- At least once per month

**When to NOT update:**
- Minor bug fixes
- Small UI tweaks
- Refactoring that doesn't change the architecture

---

## 🎯 Executive Summary

### What is Edumoe?
Edumoe is a **free, interactive CS learning platform** for Future University in Egypt (FUE) students. It provides:

- **8 full courses** aligned to the FUE CS curriculum
- **7 interactive simulators** for core CS topics (Logic, C++, Calculus, ODE, Discrete Maths, Physics, Probability)
- **A complete quiz and exam system** with timers and variants
- **A competitive game** where students battle bots to reinforce learning
- **An admin panel** for dynamic content management
- **A beautiful, modern UI** with iOS-style glass design and custom color picker

### Mission
> To make CS education in Egypt **engaging, interactive, and accessible to every student** — without paywalls, without complexity, without fluff.

### Vision
> Become the **default learning companion** for every CS student in Egypt, and eventually the Arab world. A platform where students don't just read — they **do**, **experiment**, **compete**, and **grow**.

### Founder's Intent (Read This First)

> I'm Moemen, 18 years old, CS freshman at FUE. I've built a Telegram community of 230+ students who depend on me for revisions before finals and midterms. I started Edumoe because:
>
> 1. **Doctors are boring.** Students learn better from students.
> 2. **Interactivity matters.** Reading PDFs is passive; building circuits, solving integrals, and competing in quizzes is active.
> 3. **Free should actually mean free.** No paywalls, no subscriptions, no credit card required. Ever.
> 4. **Egypt deserves world-class tools.** We shouldn't have to rely on foreign platforms that don't understand our curriculum.
>
> Edumoe is my gift to the next generation of Egyptian engineers. Every feature is built with them in mind. Every line of code is written to make their journey easier.
>
> **What should never be sacrificed:**
> - **Interactivity** over content. PDFs are not enough.
> - **Polish** over speed. Students notice bad UI.
> - **Free** over profit. If we charge, we lose the mission.
> - **Egyptian context** over generic global content. Our students need our curriculum, not someone else's.
>
> This project is not just a website. It's my legacy.

---

## 🏛️ Philosophy & Principles

### Core Values
1. **Free forever** – no paywalls, no subscriptions, no credit cards.
2. **Interactive by design** – every page should help students DO something, not just READ something.
3. **Curriculum-aligned** – exactly what FUE students need, nothing more, nothing less.
4. **Beautiful and engaging** – students should WANT to use Edumoe.
5. **Extensible** – easy to add new courses, simulators, and features.
6. **Egyptian-first** – built for Egyptian students, by an Egyptian student.

### Non‑Negotiable Decisions
1. **No backend server.** Supabase handles everything.
2. **No paywalls.** Ever.
3. **No hardcoded content.** Everything must be editable via admin panel.
4. **No dependency bloat.** Add libraries only when needed.
5. **No sacrificing polish.** If it's not beautiful, it's not done.

### Design Philosophy (Inspired by Apple)
> "Remove things until removing one more thing makes it worse."

Edumoe should feel:
- **Clean** – not cluttered
- **Smooth** – not janky
- **Intentional** – every element has a purpose
- **Consistent** – one design system, one visual language
- **Magical** – interactions that feel natural and delightful

---

## 👥 Target Audience

### Primary
- **FUE CS students** (230+ active in Telegram community)
- Ages 18–22
- Technical but not necessarily experts
- English as second language (mix of Arabic/English in daily life)
- Access to smartphones and laptops
- Prefer engaging, modern interfaces over traditional LMS portals

### Secondary
- **Other Egyptian universities** (future expansion)
- **Self‑learners** (anyone interested in CS fundamentals)
- **Instructors** (could use Edumoe as a teaching aid)

### User Goals
- Pass exams (midterms, finals, quizzes)
- Understand concepts deeply (not just memorise)
- Practice with interactive tools
- Track progress and identify weak areas
- Have fun while learning

---

## 🛠️ Technical Stack (Locked)

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Frontend Framework** | React 18 | Component‑based, huge ecosystem, industry standard |
| **Build Tool** | Vite | Faster than CRA, simpler than Next.js |
| **Language** | JavaScript (TypeScript later) | Lower learning curve; migrate later |
| **Routing** | React Router v6 | Standard, well‑documented |
| **Styling** | Tailwind CSS | Utility‑first, perfect for custom glass UI |
| **UI Components** | shadcn/ui | Accessible, customisable, works with Tailwind |
| **Animations** | Framer Motion (added when needed) | Smooth, declarative animations |
| **Icons** | Lucide | Clean, consistent icon set |
| **Math** | math.js + KaTeX | Symbolic math + inline rendering |
| **Charts** | Recharts | React‑native, easy to integrate |
| **Backend** | Supabase | Auth, PostgreSQL, Storage, RLS, Realtime |
| **Hosting** | Vercel | Free tier, seamless GitHub integration |
| **Version Control** | Git + GitHub (private) | Standard |
| **Logging** | Custom logger (`lib/logger.js`) | Wraps `console.log` for future expansion |

### Why Not Next.js?
- **SSR not needed** – Edumoe is an interactive web app, not a content site
- **Simpler** – less magic, easier to debug
- **Faster to learn** – no server components, no app router complexity
- **Migrate later** – can move to Next.js if SEO or performance demands it

---

## 🏗️ Architecture Overview

### High‑Level
```
┌─────────────────────────────────────────────────────────────────┐
│                      USER BROWSER                              │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    REACT SPA (Vite)                            │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────────┐ │
│  │   Pages      │  │ Components   │  │      Hooks          │ │
│  │  - Home      │  │  - Glass UI  │  │  - useAuth          │ │
│  │  - Courses   │  │  - Navbar    │  │  - useTheme         │ │
│  │  - Simulator │  │  - Simulator │  │  - useColorPicker   │ │
│  │  - Quiz      │  │  - Game      │  │  - useSupabase      │ │
│  │  - Game      │  │  - Admin     │  │                     │ │
│  │  - Admin     │  │              │  │                     │ │
│  └──────────────┘  └──────────────┘  └─────────────────────┘ │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                │ Supabase Client
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     SUPABASE (Backend)                         │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  Auth      │  Database (PostgreSQL)  │  Storage         │ │
│  │  - Signup  │  - students             │  - Lecture PDFs  │ │
│  │  - Login   │  - profiles             │  - Course images │ │
│  │  - Logout  │  - courses              │  - User uploads  │ │
│  │  - RLS     │  - videos               │                  │ │
│  │            │  - quiz_questions       │                  │ │
│  │            │  - exam_attempts        │                  │ │
│  │            │  - game_sessions        │                  │ │
│  │            │  - achievements         │                  │ │
│  └──────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow
1. User interacts with React component.
2. Component calls a service function (e.g., `getCourses()`).
3. Service function uses Supabase client to query the database.
4. Supabase returns data.
5. Component updates state and re‑renders.
6. User sees updated UI.

### Authentication Flow
1. User fills login/signup form.
2. Form submits to Supabase Auth.
3. Supabase returns a session token (stored in localStorage).
4. Protected routes check for session token.
5. If session token exists, render page; else redirect to login.
6. `profiles` table is used for `is_admin` check (via trigger).

---

## 📁 File Structure (Locked)

```
edumoe/
├── docs/                              # Documentation
│   ├── PROJECT_CONTEXT.md             # THIS FILE – the brain
│   ├── ARCHITECTURE.md                # Complete architecture
│   ├── DATABASE.md                    # Schema and relationships
│   ├── ROADMAP.md                     # Implementation order
│   ├── DECISIONS.md                   # Key decisions and rationale
│   ├── API.md                         # Supabase API usage patterns
│   ├── DESIGN_SYSTEM.md               # CSS variables, glass, colors
│   ├── TODO.md                        # Current task list
│   └── CONTRIBUTING.md                # How to contribute
│
├── src/
│   ├── components/                    # Reusable UI components
│   │   ├── ui/                        # shadcn components
│   │   ├── glass/                     # GlassCard, GlassButton
│   │   ├── background/                # LiveCanvas (particles)
│   │   ├── navigation/                # Navbar, Sidebar, Footer
│   │   ├── simulators/                # Each simulator in its own folder
│   │   │   ├── Cpp/
│   │   │   ├── Logic/
│   │   │   ├── Calculus/
│   │   │   ├── ODE/
│   │   │   ├── Discrete/
│   │   │   ├── Physics/
│   │   │   └── Probability/
│   │   ├── courses/                   # VideoPlayer, LectureViewer
│   │   ├── game/                      # BattleUI, Timer, Leaderboard
│   │   └── admin/                     # CRUD tables, forms
│   │
│   ├── pages/                         # Route pages
│   │   ├── Home.jsx
│   │   ├── Courses.jsx
│   │   ├── CourseDetail.jsx
│   │   ├── SimulatorPage.jsx          # Single page loads correct simulator
│   │   ├── Quiz.jsx
│   │   ├── QuizExam.jsx
│   │   ├── Game.jsx
│   │   ├── About.jsx
│   │   └── Admin.jsx                  # Protected route
│   │
│   ├── hooks/                         # Custom React hooks
│   │   ├── useTheme.js
│   │   ├── useColorPicker.js
│   │   ├── useAuth.js
│   │   └── useSupabase.js
│   │
│   ├── services/                      # Business logic (separated from UI)
│   │   ├── auth/
│   │   │   ├── login.js
│   │   │   ├── signup.js
│   │   │   └── logout.js
│   │   ├── courses/
│   │   │   ├── getCourses.js
│   │   │   ├── getCourse.js
│   │   │   └── updateProgress.js
│   │   ├── quiz/
│   │   │   ├── getQuestions.js
│   │   │   ├── submitAnswer.js
│   │   │   └── getResults.js
│   │   ├── simulators/
│   │   ├── game/
│   │   └── admin/
│   │
│   ├── lib/                           # Shared libraries
│   │   ├── supabaseClient.js          # Supabase client instance
│   │   ├── utils.js                   # General utilities
│   │   ├── constants.js               # App‑wide constants
│   │   └── logger.js                  # Logging wrapper
│   │
│   ├── styles/                        # Global styles
│   │   ├── globals.css                # Base + Tailwind
│   │   └── glass.css                  # Glass UI utilities
│   │
│   ├── assets/                        # Static assets
│   │   ├── images/
│   │   ├── icons/
│   │   ├── illustrations/
│   │   └── backgrounds/
│   │
│   ├── App.jsx                        # Root component
│   ├── main.jsx                       # Entry point
│   └── routes.jsx                     # Route definitions
│
├── supabase/                          # Database migrations
│   └── migrations/                    # Versioned SQL files
│
├── public/                            # Public assets
├── index.html                         # HTML entry point
├── vite.config.js                     # Vite config
├── tailwind.config.js                # Tailwind config
├── postcss.config.js                 # PostCSS config
├── package.json                       # Dependencies
└── .env.local                         # Environment variables (gitignored)
```

---

## 🎨 Design System

### CSS Variables (Core)

```css
:root {
  /* Colors */
  --primary: #e11d48;
  --primary-light: #f43f5e;
  --primary-dark: #be123c;
  --primary-glow: rgba(225, 29, 72, 0.35);
  --secondary: #7c3aed;
  --bg: #0a0a0f;
  --bg2: #111118;
  --bg3: #1a1a2a;
  --text: #fff0f5;
  --text2: #ffc0d0;
  --text3: #c08090;

  /* Glass */
  --glass-blur: 20px;
  --glass-border: rgba(255, 255, 255, 0.15);
  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-shadow: inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.2);

  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-xl: 32px;
  --radius-full: 9999px;

  /* Animations */
  --animation-smooth: 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  --animation-bounce: 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### Color Picker
- `<input type="color">` updates `--primary`, `--primary-light`, `--primary-dark`, and `--primary-glow` in real time.
- Changes are stored in `localStorage` and restored on page load.
- Affects all components globally (buttons, links, icons, glows, borders).

### Glass UI Components

**GlassCard**
```jsx
<GlassCard className="p-6">
  {/* content */}
</GlassCard>
```
- `backdrop-filter: blur(20px)`
- `background: rgba(255,255,255,0.05)`
- `border: 1px solid rgba(255,255,255,0.15)`
- `box-shadow: inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.2)`
- `border-radius: var(--radius-lg)`

**GlassButton**
```jsx
<GlassButton variant="primary" size="md">
  Click me
</GlassButton>
```
- Variants: `primary`, `secondary`, `danger`, `ghost`
- Sizes: `sm`, `md`, `lg`
- Hover: `transform: scale(1.02)`, `box-shadow` intensifies

### Typography
- Font: **Inter** (Google Fonts)
- Sizes:
  - `h1`: `clamp(48px, 6.5vw, 82px)` – 900 weight
  - `h2`: `clamp(36px, 4.5vw, 58px)` – 800 weight
  - `h3`: `clamp(22px, 2.5vw, 32px)` – 700 weight
  - `body`: `16px` – 400 weight
  - `small`: `12px` – 500 weight
- Line height: `1.5` for body, `1.05` for headings

### Animations
- **Fade‑in**: `0.6s` ease, `transform: translateY(20px)` → `translateY(0)`
- **Scale‑up**: `0.3s` ease, `transform: scale(0.95)` → `scale(1)`
- **Orbit**: continuous rotation for floating windows
- **Pulse**: 2s infinite for live status indicators

---

## 🗄️ Database Schema (Supabase)

### Existing Tables (from current project)

| Table | Purpose | Key Columns |
|-------|---------|-------------|
| `students` | Users (Telegram + web) | telegram_id, uni_id, full_name, password_hash, is_banned, daily_msg_count, is_paid |
| `profiles` | Web user profiles (linked to `auth.users`) | full_name, is_admin, created_at |
| `sessions` | Auth tokens | token, student_id, expires_at |
| `conversations` | MoAI conversations | student_id, agent_id, mode |
| `messages` | Chat messages | conversation_id, role, content, agent_id |
| `student_memory` | Weak areas, strong areas, psychology | student_id, weak_areas, strong_areas, psychology_notes |
| `agent_memory` | Agent knowledge | agent_id, knowledge_base, skill_extensions, system_prompt |
| `agent_messages` | Inter‑agent communication | from_agent, to_agent, content, message_type |
| `knowledge_chunks` | RAG embeddings (pgvector) | content, embedding, subject, source |
| `sentinel_intel` | Scraped FUE/Moodle data | source, category, title, content, url |
| `system_logs` | All logs | level, source, message, metadata |
| `admin_commands` | Admin → agent commands | target_agent, command, response, broadcast |

### New Tables to Add

| Table | Purpose | Key Columns |
|-------|---------|-------------|
| `courses` | Course metadata | title, description, subject, level, duration, icon, progress_weight |
| `videos` | Video links (YouTube/Telegram) | title, description, subject, url, duration |
| `lectures` | PDF/note uploads | course_id, title, url, type (pdf/note/link) |
| `quiz_questions` | Question bank | subject, question, opt_a, opt_b, opt_c, opt_d, correct_opt, explanation |
| `exam_models` | Named question sets | model_name, description, questions (JSON) |
| `exam_attempts` | User exam attempts | user_id, exam_type, score, time_taken, submitted_at |
| `game_sessions` | Competitive game rounds | player_id, bot_difficulty, score, time, result |
| `game_leaderboard` | Weekly/monthly rankings | user_id, score, streak, period |
| `achievements` | Achievement definitions | name, description, icon, requirement |
| `user_achievements` | User‑earned achievements | user_id, achievement_id, earned_at |

### RLS Policies
- **Students/profiles**: users can read/write their own data.
- **Admins**: can read/write all tables (based on `profiles.is_admin`).
- **Public**: read‑only for `courses`, `videos`, `quiz_questions`.

### Supabase Storage
- **Bucket:** `lectures` – stores PDFs and notes (private, accessible via signed URLs).
- **Bucket:** `avatars` – user profile pictures.
- **Bucket:** `course_images` – course icons and banners.

---

## 📝 Feature Specifications

### 1. Homepage
- **Hero**: "Learn Computer Science Your Way"
- **Live Canvas Background**: floating code/equations particles (from `deepseek_html_20260618_0bedfe.html`)
- **RGB Color Picker**: updates all accent colors globally
- **8 Floating Windows**: planetary orbit animation (ODE, C++, Stats, Logic, Calculus, Physics, Discrete, Computing)
- **iOS Glass UI**: `GlassCard`, `GlassButton` components
- **Stats**: 230+ students, 8 courses, 5+ simulators, 24/7 community, 0 EGP
- **Features Grid**: 6 feature cards (C++ Compiler, Physics Simulators, Math Solver, MoeAI Assistant, Smart Flashcards, Telegram Community)
- **CTA**: "yalla bina! 👊" → links to Courses

### 2. Courses (8)
- **Structured Programming** (C++ · Sem 2) – 40% progress
- **Logic Design** (Circuits · Sem 2) – 20% progress
- **Differential Equations** (Math II) – 15% progress
- **Probability & Statistics** (Math III) – 5% progress
- **Discrete Mathematics** (Sets · Logic · Proofs) – 0% progress
- **Physics for CS** (Mechanics · Circuits) – 0% progress
- **Calculus I** (Derivatives · Integrals) – 0% progress
- **Computing Fundamentals** (Intro · Algorithms) – 0% progress

Each course page has:
- **Video Player**: YouTube embed + Telegram iframe (toggle)
- **Lecture Viewer**: PDFs (Supabase Storage), notes (text), links
- **Progress**: tracked per user (if signed in), displayed as progress bar
- **Admin**: CRUD for courses, videos, lectures (via admin panel)

### 3. Simulators (7)

#### 3.1 C++ Compiler
- **Embed**: OneCompiler iframe (or Programiz API)
- **Presets**: Hello World, Factorial, Array Sum, Struct, GCD, Prime, Bubble Sort
- **UI**: Editor (monospace, syntax highlighting via CodeMirror), example dropdown, copy code, run button, output panel
- **Stdin**: text area for `cin >>` input

#### 3.2 Logic Gate Simulator
- **Gates**: AND, OR, NOT, NAND, NOR, XOR, XNOR
- **Interaction**: click to place gates, drag to move, click inputs to toggle 0/1
- **Truth Table**: auto‑generated from placed gates
- **Presets**: Half Adder, Full Adder, Majority (3‑bit), Parity Checker, Decoder
- **Tech**: HTML Canvas + React hooks

#### 3.3 Calculus Solver
- **Derivatives**: symbolic differentiation (math.js)
- **Integrals**: indefinite + definite (Simpson's rule)
- **Plotting**: Recharts (or Chart.js)
- **Input**: natural language (`x^2 + 3*x`, `sin(x)/x`, `x^2 from 0 to 3`)

#### 3.4 ODE Solver
- **1st order linear**: `dy/dx + P(x)y = Q(x)`
- **2nd order homogeneous**: `ay'' + by' + cy = 0`
- **2nd order non‑homogeneous**: characteristic equation + particular solution
- **Input**: `y'' + 2y' + 5y = 0`
- **Output**: characteristic equation, general solution

#### 3.5 Discrete Maths
- **Set operations**: union, intersection, complement, difference
- **Truth tables**: propositional logic
- **Graph visualiser**: nodes/edges with drag
- **Combinatorics**: permutations, combinations

#### 3.6 Physics (10 modules)
1. Coulomb's Law
2. Electric Field (point charge)
3. Gauss's Law (flux)
4. Capacitance (parallel plate)
5. Ohm's Law & Power
6. Kirchhoff's Voltage Law
7. Magnetic Force (q v B)
8. Biot‑Savart (wire)
9. Resistors in Series
10. RC Time Constant

#### 3.7 Probability
- **Distributions**: Normal, Binomial, Poisson, Uniform, Exponential
- **Controls**: sliders for parameters (μ, σ, n, p, λ, a, b)
- **Stats**: E[X], Var[X], σ – live formulas
- **Chart**: histogram/PDF via Recharts

### 4. Quiz & Exams

#### 4.1 Daily Quiz
- 5 topics: C++, Arrays, Logic Design, Calculus, Probability
- 5 questions each, multiple choice
- Instant feedback, explanation reveal
- No timer

#### 4.2 Timed Exams
- **Quiz 1**: 20 minutes, 10 questions
- **Quiz 2**: 20 minutes, 10 questions
- **Midterm**: 60 minutes, 20 questions
- **Final**: 120 minutes, 40 questions

#### 4.3 Variants
- Each exam has multiple variants (A, B, C, etc.)
- Generated by shuffling questions and randomising answer order
- Admin can create new variants manually

#### 4.4 Models
- A model is a named set of questions (e.g., "Hard ODE Model", "Spring 2026 Midterm")
- Admin can create models and assign them to exams

### 5. Competitive Game (Replaces Flashcards)
- **Battle Mode**: player vs bot
- **Bot Difficulties**: Easy (basic questions), Medium (intermediate), Hard (advanced)
- **Timer**: 10–30 seconds per question
- **Scoring**: correct = +points, wrong = -points
- **Leaderboard**: weekly/monthly rankings
- **Question Pool**: admin‑managed

### 6. Admin Panel

| Section | Features |
|---------|----------|
| **Courses** | Add, edit, delete, reorder. Set progress weights. |
| **Videos** | Add YouTube/Telegram links, assign to courses. |
| **Lectures** | Upload PDFs, add notes/links, assign to courses. |
| **Quiz Questions** | Add/delete questions, set correct answer, assign to topics/models. |
| **Exams** | Create exam, set time limit, assign models/questions. |
| **Game** | Manage question pool, adjust bot difficulty parameters. |
| **Users** | View, ban/unban, upgrade to paid, reset progress. |
| **Site Settings** | Hero text, default color, enable/disable simulators. |

### 7. Achievements (Future)
- **Streaks**: 7‑day, 30‑day
- **Perfect Scores**: 100% on any exam
- **Milestones**: Completed Calculus, Physics Master, etc.
- **Hard Challenges**: Solved 100 Logic Questions, etc.

### 8. Global Search (Future)
- One search bar in the navbar
- Results from: courses, lectures, quiz questions, simulators, MoAI
- Filter by type (course, video, question, etc.)

---

## 🧠 MoAI Integration (Future)
- DeepSeek‑style AI tutor built into the platform
- Uses RAG with curriculum content (`knowledge_chunks` table)
- Accessible via chat interface on the MoAI page
- Later: standalone product, Telegram bot, voice support

---

## 🔐 Security & Auth

### Authentication
- Supabase Auth (email/password)
- `profiles` table linked to `auth.users` via PostgreSQL trigger
- `is_admin` flag in `profiles` controls admin access

### Row‑Level Security (RLS)
- Users can only read/write their own data.
- Admins can read/write all tables.
- Public tables (courses, videos, quiz_questions) are read‑only for unauthenticated users.

### Environment Variables
All secrets stored in `.env.local` (gitignored) and in Vercel Environment Variables.

```env
VITE_SUPABASE_URL=https://ajhbaomxdsvnegjiypob.supabase.co
VITE_SUPABASE_ANON_KEY=<anon_key>
VITE_SUPABASE_SERVICE_KEY=<service_role_key>  # only for admin actions
VITE_APP_NAME=EDUMOE
VITE_DEFAULT_THEME=ruby
```

### Security Principles
1. **Never trust the client.** All data validation must happen on the server (via Supabase RLS).
2. **Never expose secrets in frontend code.** Use environment variables.
3. **Always sanitise user input.** Prevent XSS and SQL injection.
4. **Rate limit auth endpoints.** (Supabase handles this).
5. **Log admin actions.** For audit and accountability.

---

## 🚀 Roadmap

| Phase | Feature | Est. Time | Status |
|-------|---------|-----------|--------|
| 0 | Infrastructure (Vite, React, Tailwind, shadcn, Supabase, auth) | 1 week | 🔴 Not started |
| 1 | Homepage (live background, 8 windows, RGB picker, glass UI) | 1 week | 🔴 Not started |
| 2 | Courses (8 courses, video player, lecture viewer, progress) | 1 week | 🔴 Not started |
| 3 | Simulators (Logic, C++, Calculus, ODE, Discrete, Physics, Probability) | 3 weeks | 🔴 Not started |
| 4 | Quiz & Exams (Daily, Quiz 1, Quiz 2, Midterm, Final, variants, models) | 1 week | 🔴 Not started |
| 5 | Competitive Game (player vs bot, leaderboard) | 1 week | 🔴 Not started |
| 6 | Admin Panel (full CRUD for all content) | 1 week | 🔴 Not started |
| 7 | Achievements & Global Search | 1 week | 🔴 Not started |
| **Total** | | **~10 weeks** | |

---

## 📊 Current Project Status

| Metric | Status |
|--------|--------|
| **Phase** | 0 – Infrastructure |
| **Completed** | None – architecture locked, ready to code |
| **Next Task** | Set up Vite + React + Tailwind + shadcn + React Router |
| **Next Sub‑task** | `package.json`, `vite.config.js`, `tailwind.config.js`, `src/main.jsx`, `src/App.jsx`, `src/routes.jsx` |
| **Dependencies** | None – starting fresh |
| **Blockers** | None – all decisions made |

---

## 🔧 Code Conventions

### Naming
- **Components**: PascalCase (`GlassCard`, `Navbar`)
- **Hooks**: camelCase with `use` prefix (`useAuth`, `useTheme`)
- **Services**: camelCase (`getCourses`, `submitQuiz`)
- **Files**: PascalCase for components, camelCase for everything else
- **CSS classes**: kebab‑case (`glass-card`, `button-primary`)

### Folder Organization
- Components: one per file, named the same as the component.
- Pages: one per route, named the same as the route.
- Services: grouped by feature, one function per file (or small group).
- Hooks: global hooks in `/hooks`, feature‑specific in component folders.

### Imports
```javascript
// External
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

// Internal
import { useAuth } from '../hooks/useAuth';
import { getCourses } from '../services/courses/getCourses';
import GlassCard from '../components/glass/GlassCard';
```

### Styling
- Use Tailwind classes for layout and spacing.
- Use CSS variables for theming and colors.
- Use `glass` utility class for glass effects.
- Avoid inline styles (except dynamic values).

### Logging
```javascript
import logger from '../lib/logger';

logger.info('User logged in', { userId });
logger.error('Failed to fetch courses', error);
```

### Error Handling
- Services: throw errors with descriptive messages.
- Components: catch errors and display user‑friendly messages.
- Global: React Error Boundary for catastrophic failures.

---

## 🧪 Testing Principles
- **Unit tests**: Jest + React Testing Library (future).
- **Integration tests**: Cypress (future).
- **Manual testing**: Moemen tests every feature before release.

---

## 📦 Deployment

### Hosting
- **Vercel** (free tier)
- Automatic deploys from GitHub (`main` branch)

### Environment Variables
Set in Vercel dashboard:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Build Command
```bash
npm run build
```

### CI/CD
- GitHub Actions (optional, not required for v1)

---

## 🧠 AI Collaboration Rules

### For AI Sessions
1. **Start every session by reading `PROJECT_CONTEXT.md`.** This file is your brain.
2. **Reference `ARCHITECTURE.md` for technical details.**
3. **Reference `DATABASE.md` for schema details.**
4. **Reference `ROADMAP.md` for current priorities.**
5. **Do NOT change architecture without updating these documents.**
6. **If you're unsure, ask.**
7. **Write code that follows the conventions in this file.**
8. **Test before outputting.**
9. **Explain your reasoning.**
10. **Update `TODO.md` when you complete a task.**

### For Moemen
1. **This is your project.** You make the product decisions.
2. **AI is your senior engineer.** It implements your vision.
3. **If AI suggests something you don't understand, ask for clarification.**
4. **If AI suggests something you disagree with, say so.**
5. **Keep this document updated.**

---

## ❓ Common Questions & Answers

**Q: Can I use Edumoe for my own courses?**
A: Yes — the admin panel allows you to add/edit courses. However, Edumoe is designed for the FUE CS curriculum, so you may need to adjust content.

**Q: Will Edumoe ever become paid?**
A: No. Edumoe will always be free for students. Potential monetisation (if needed) will be via sponsorships or optional extras (like premium support), never core learning.

**Q: Can I contribute to Edumoe?**
A: Yes — Edumoe is open to contributors (with Moemen's approval). See `CONTRIBUTING.md`.

**Q: What about MoAI?**
A: MoAI is a future feature. It will be integrated into the platform when it's ready.

---

## 📌 Final Note

This document is **living**. It evolves with the project. Every significant decision should be recorded here.

**Last updated:** June 29, 2026
**Version:** 1.0
**Maintainer:** Moemen

---

## 🔗 Quick Links (Internal)

- `docs/ARCHITECTURE.md` – Full technical architecture
- `docs/DATABASE.md` – Complete schema and relationships
- `docs/ROADMAP.md` – Implementation order and timeline
- `docs/DECISIONS.md` – Key decisions and rationale
- `docs/API.md` – Supabase API usage patterns
- `docs/DESIGN_SYSTEM.md` – CSS variables, glass, colors
- `docs/TODO.md` – Current task list
- `docs/CONTRIBUTING.md` – How to contribute

---

**End of PROJECT_CONTEXT.md**