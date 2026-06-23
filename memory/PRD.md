# Gajab Ambassador Affiliate Program — PRD

## Original Problem Statement
Design Student Affiliate program for gajab.com (Indian bargain bazaar) — static React pages for Gajab Admins + College Student Ambassadors, including Apply via Campus form. Use gajab.com brand colors (orange + navy) and Poppins font.

## Iterations
- **Iter 1 (initial MVP)**: 15 screens — Apply, Auth (3-step), Ambassador (6 pages), Admin (7 pages); vibrant Gajab bazaar energy, neo-brutalist look.
- **Iter 2 (brand refresh)**: Switched to gajab.com palette — Orange #F26B1F primary, Navy #1B2D54 ink, Yellow #FFC93C accent; Poppins font everywhere; shield+grad-cap logo asset; soft 1px borders (removed 2px neo-brutalist); added new pages: Ambassador "My Links" (URL tracking), Ambassador "Performance Log" (order-level commission history), Admin "Affiliate URLs" (cross-ambassador URL roll-up); added dd/mm/yyyy date picker on Admin Tasks.
- **Iter 3 (visibility fixes)**: Removed forced navy color on h1-h4 (was making text invisible on dark backgrounds); set Logo `variant="light"` on Login left orange panel, SetupPassword left navy panel, ApplyPage navy footer — all logo names + headings now visible on all dark sections.

## Routes (current)
- Public: `/`, `/apply`
- Auth: `/login`, `/verify`, `/setup-password`
- Ambassador: `/dashboard`, `/dashboard/urls`, `/dashboard/performance`, `/dashboard/tasks`, `/dashboard/leaderboard`, `/dashboard/referrals`, `/dashboard/payouts`, `/dashboard/profile`
- Admin: `/admin/applicants`, `/admin/directory`, `/admin/affiliate-urls`, `/admin/tasks`, `/admin/leaderboard`, `/admin/referral-codes`, `/admin/referral-utilization`, `/admin/analytics`

## Tech
- React 19 + CRA/craco + react-router-dom v7 + Tailwind + recharts + lucide-react + sonner.
- 100% static. All mock data in `/app/frontend/src/data/mockData.js`.
- Brand tokens in `/app/frontend/src/index.css`.

## Backlog
- P1: Live FastAPI + MongoDB backend; real OTP/JWT (Twilio); auth guards on /dashboard + /admin
- P2: Razorpay/UPI payouts; SendGrid/WhatsApp credential delivery; public `/r/:code` referral landing
- P3: Real-time leaderboard via WebSockets; level/tier progression engine; fraud detection rules

## Demo Tips
- Demo OTP: any 6 digits (123456)
- All routes publicly navigable in static demo (no auth guards).
