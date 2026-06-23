# Gajab Ambassador Affiliate Program — PRD

## Original Problem Statement
Design Student Affiliate program for gajab.com (Indian bargain bazaar) — static React pages for Admins + College Ambassadors, including Apply-via-Campus form. Brand from gajab.com (orange + navy) with Poppins font.

## Iterations Completed
- **Iter 1**: 15-screen MVP with neo-brutalist Gajab vibe.
- **Iter 2**: Brand refresh — Orange #F26B1F + Navy #1B2D54 + Poppins + soft borders + new logo. Added Affiliate URL tracking (ambassador + admin), Order-level commission history, dd/mm/yyyy date picker.
- **Iter 3**: Visibility fixes — removed forced navy heading color, set Logo `variant="light"` on dark surfaces.
- **Iter 4 (NEW)**: 
  - **Share-to-WhatsApp + Insta Story + Telegram** deep buttons on Ambassador Home (`ShareRow` component), each with pre-filled Hindi-flavored pitch.
  - **Tier / Level progression engine** — 4 tiers (Bronze 8%, Silver 10%, Gold 12%, Platinum 15%) with auto-progress based on lifetime revenue. New `/dashboard/tier` dedicated page (full breakdown w/ unlocked/current/locked states), embedded `TierProgress` card on Ambassador Home, tier badge on Profile.
  - Live-OTP via Twilio: **skipped** (out of scope for static demo).

## Routes (current)
- Public: `/`, `/apply`
- Auth: `/login`, `/verify`, `/setup-password`
- Ambassador: `/dashboard`, `/dashboard/urls`, `/dashboard/performance`, `/dashboard/tier`, `/dashboard/tasks`, `/dashboard/leaderboard`, `/dashboard/referrals`, `/dashboard/payouts`, `/dashboard/profile`
- Admin: `/admin/applicants`, `/admin/directory`, `/admin/affiliate-urls`, `/admin/tasks`, `/admin/leaderboard`, `/admin/referral-codes`, `/admin/referral-utilization`, `/admin/analytics`

## Tech
- React 19 + craco + react-router-dom v7 + Tailwind + recharts + lucide-react + sonner.
- 100% static. Mock data in `/app/frontend/src/data/mockData.js`.

## Backlog
- P1: Live FastAPI + MongoDB backend, real OTP via Twilio, JWT auth + route guards
- P2: Razorpay/UPI payouts, SendGrid/WhatsApp credential delivery, `/r/:code` public referral landing
- P3: Real-time leaderboard via WebSockets, fraud detection, admin-controlled Featured Campaign banner

## Demo Tips
- Demo OTP: any 6 digits (123456)
- All routes publicly navigable in static demo.
