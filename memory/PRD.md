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
  - **VersionProvider Context** in `/app/frontend/src/hooks/useVersion.jsx` — V2 is now the default, `RouteResetToV2` snaps every navigation back to V2, V1 acts as a per-page legacy preview.
  - **V2 Admin**: Leaderboard filters, Utilization + Commission Overrides search/filter, Announcements read-count hidden, Support Map panel filters already-linked, Analytics adds "Custom Date" frequency.
  - **V2 Ambassador**: Login merged phone+OTP, Settings hides Preferences/2FA, Support shows only mapped POCs, Home shows Total Users + 5-stage status + Order ID/Buyer/masked phone, My Links restricted to single master link (later fully removed), Performance shows Buyer/masked phone/Qty.
  - **Bug fixes**: My Links crash (undefined `isV2` / `urls`); V1/V2 shared-state bug (converted useState hook → Context).

- **Iter 6 (Feb 2026)**: My Links removed + Performance redesign
  - Deleted `AffiliateUrls.jsx` (ambassador), removed sidebar nav + route.
  - Performance page: single row of 6 KPI cards (Clicks · Signups · Orders · Order Value · Commission · Paid Out) in the pastel-icon design (white card, small pastel round icon, tiny uppercase label, bold navy number).

- **Iter 7 (Feb 2026)**: Doc-driven batch — ApplyPage / Ambassador / Admin (validated 71/72 by testing agent)
  - **ApplyPage**: removed floating "Earnings Preview" card; replaced 4-card career grid with 3 cards (Live Leaderboard removed); top perks now use gajab.com images; added **Commission Calculator** section with sliders (orders × AOV × 7.5%) mirroring gajab.com/campus-ambassador.
  - **Ambassador Home V2**: added period filter (Weekly/Monthly/Custom); added "Repeat orders" to status breakdown (now 6 tiles); added `Customers onboarded` list with masked phone; added Completed/Cancelled/Returned buckets.
  - **Ambassador Profile**: new Address section (Street/City/State/Pincode/Country).
  - **Ambassador Settings**: removed "Delete account", replaced with "Pause my account" (preserves data).
  - **Ambassador Tasks**: Rejected tab now includes "Contact your POC" button → routes to `/dashboard/support`.
  - **Ambassador Payouts**: prominent "Payouts arrive as Gajab Cash Vouchers" notice; per-period stats (Completed orders / GMV / Voucher code); Rewards & recognition section.
  - **Admin nav**: "Utilization" renamed to "Commissions"; page title updated.
  - **Admin Commissions**: Commission Override % is inline-editable (click edit → number input + save/cancel).
  - **Admin Applicants**: removed variable commission input; new applicants show fixed 5% (auto-upgrades to 7.5% after 24 orders); Comm % column removed from list.
  - **Admin Directory**: row click → detailed ambassador drill-down (KPIs + Recent Tasks + Recent Orders + Achievements + Back button).
  - **Admin Tasks**: "Send Reminder" broadcast button; mandatory rejection reason modal (blocks empty rejection).
  - **Admin Analytics**: "Drill into a specific ambassador" search with typeahead cards; "New Orders vs Repeat Orders" summary section.

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
