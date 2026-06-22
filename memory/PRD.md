# Gajab Ambassador Affiliate Program — PRD

## Original Problem Statement
Design the Student Affiliate / Campus Ambassador program for gajab.com (Indian bargain bazaar) as static pages. Two personas: Gajab Admins + College Students (Ambassadors). Include the "Apply via Campus" registration page. Use gajab.com's color theme and font family (vibrant red + yellow + Bricolage Grotesque display).

## User Personas
- **College Ambassador (Student)**: mobile-first, gamified — tracks earnings, tasks, leaderboard rank, referral codes, payouts.
- **Gajab Admin**: desktop-first console — reviews applications, manages ambassadors, creates tasks, manages referral codes, monitors analytics.

## Tech Architecture
- React 19 (CRA + craco) + react-router-dom v7 + Tailwind + recharts + lucide-react + sonner toasts.
- 100% static demo, no backend. All data in /app/frontend/src/data/mockData.js.
- Brand tokens (in /app/frontend/src/index.css): Gajab Red #E11D2A, Warm Yellow #FFC93C, cream #FDFBF7, Bricolage Grotesque (display) + Manrope (body), neo-brutalist shadow-stroke styling.

## What's Implemented (Dec 2026)
- Public marketing + multi-step Apply via Campus form (4 steps) — /apply
- Auth flow: Login (phone/email) → OTP → Force password setup — /login, /verify, /setup-password
- Ambassador portal (mobile-first, bottom nav): Home, Tasks, Leaderboard, Referrals, Payouts, Profile — /dashboard/*
- Admin console (desktop-first, dark sidebar): Applicants (with slide-out drawer, duplicate flags, approve/reject), Directory, Tasks (creator + verification queue), Master Leaderboard, Referral Codes (create modal), Referral Utilization, Analytics (3 charts) — /admin/*
- Distinct vibrant Gajab "bazaar energy" design with sticker badges, marquee, neo-brutalist shadows, no AI-slop.
- Clipboard copy hardened with try/catch (per testing-agent feedback iteration_1).

## Backlog / Future
- P1: Real FastAPI backend + MongoDB persistence + JWT/OTP integration
- P1: Auth guards on /dashboard and /admin
- P1: India-friendly date picker (dd/mm/yyyy) in Admin Task creator
- P2: Email/WhatsApp delivery integration (SendGrid/Twilio) for credentials + payout receipts
- P2: Split ApplyPage.jsx into smaller components
- P2: Razorpay/UPI integration for actual ambassador payouts
- P3: Public referral landing page (deep-linked via /r/:code)

## Demo Tips
- Demo OTP: any 6 digits (123456 by convention)
- All routes are publicly navigable in this static demo.
