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
- **Iter 5 (Feb 2026)**: V1 / V2 A/B toggle
  - **VersionProvider Context** in `/app/frontend/src/hooks/useVersion.jsx` (Feb 2026 — replaced broken useState hook that caused V1/V2 to look identical).
  - **V2 Admin**: Leaderboard filters (name, state, city, duration); Utilization + Commission Overrides search/filter; Announcements read-count hidden; Support Map-new-affiliates panel filters out already-linked; Analytics adds "Custom Date" frequency option with date pickers.
  - **V2 Ambassador**: Login merged phone+OTP on one screen; Settings hides Preferences (language/timezone) + 2FA; Support shows only mapped POCs; Home shows Total Users KPI + 5-stage order status breakdown (Registered / Order Placed / Completed / Cancelled / Returned) + new-orders include Order ID, Buyer name, masked phone; My Links restricted to single master link; Performance shows Buyer + masked phone + Qty column (instead of Via Link).
  - **Bug fix**: My Links page was crashing due to undefined `isV2` and `urls` refs — fixed by importing `useVersion` and defining `urls` conditionally.

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
