// Mock data for the Gajab Ambassador Affiliate Program (static demo)

export const ambassador = {
  id: "amb_001",
  name: "Riya Sharma",
  college: "Delhi University",
  city: "New Delhi",
  email: "riya@du.ac.in",
  phone: "+91 98765 43210",
  affiliateLink: "https://gajab.com/r/RIYA-DU24",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  tier: "Gold",
  rank: 7,
  totalAmbassadors: 312,
};

// Tier definitions for progression engine
export const tiers = [
  {
    name: "Bronze",
    min: 0,
    max: 50000,
    color: "#B5651D",
    bg: "bg-[#FBE3C8]",
    ring: "ring-[#B5651D]",
    icon: "🥉",
    commission: "8%",
    perks: [
      "8% commission on all orders",
      "Access to ambassador community",
      "Monthly newsletter & tips",
      "Welcome digital kit",
    ],
  },
  {
    name: "Silver",
    min: 50000,
    max: 150000,
    color: "#7B8794",
    bg: "bg-[#E5E8EB]",
    ring: "ring-[#7B8794]",
    icon: "🥈",
    commission: "10%",
    perks: [
      "10% commission on all orders",
      "Monthly performance bonus eligibility",
      "Exclusive task pool access",
      "Quarterly swag drops",
    ],
  },
  {
    name: "Gold",
    min: 150000,
    max: 400000,
    color: "#D69E2E",
    bg: "bg-[#FFF1C2]",
    ring: "ring-[#D69E2E]",
    icon: "🥇",
    commission: "12%",
    perks: [
      "12% commission on all orders",
      "Priority bi-weekly payouts",
      "Premium swag box (₹2K value)",
      "Early access to new products",
      "Featured on Gajab Insta Spotlight",
    ],
  },
  {
    name: "Platinum",
    min: 400000,
    max: 999999999,
    color: "#5B21B6",
    bg: "bg-[#E9D5FF]",
    ring: "ring-[#5B21B6]",
    icon: "💎",
    commission: "15%",
    perks: [
      "15% commission on all orders",
      "Weekly payouts (no minimum)",
      "Dedicated ambassador manager",
      "Quarterly cash bonuses (up to ₹25K)",
      "All-expenses-paid Gajab HQ trip",
      "Co-branding opportunities",
    ],
  },
];

// Per-URL affiliate tracking (master + campaign-specific)
export const affiliateUrls = [
  { id: "URL-001", label: "Master Link", url: "https://gajab.com/r/RIYA-DU24", campaign: "—", channel: "All", clicks: 2847, signups: 312, orders: 184, revenue: 248650, commission: 24865, ctr: 10.96, lastClick: "Dec 14, 2026 2:14 PM", createdOn: "Aug 12, 2026" },
  { id: "URL-002", label: "Insta Bio Link", url: "https://gajab.com/r/RIYA-DU24?utm_source=instagram&utm_campaign=bio", campaign: "Insta-Bio", channel: "Instagram", clicks: 1242, signups: 145, orders: 92, revenue: 121400, commission: 12140, ctr: 11.67, lastClick: "Dec 14, 2026 1:42 PM", createdOn: "Aug 12, 2026" },
  { id: "URL-003", label: "WhatsApp Hostel Group", url: "https://gajab.com/r/RIYA-DU24?utm_source=whatsapp&utm_campaign=hostel", campaign: "Hostel-WA", channel: "WhatsApp", clicks: 824, signups: 98, orders: 58, revenue: 78200, commission: 7820, ctr: 11.89, lastClick: "Dec 14, 2026 11:02 AM", createdOn: "Sep 02, 2026" },
  { id: "URL-004", label: "Freshers Fest Reel", url: "https://gajab.com/r/RIYA-DU24?utm_source=reel&utm_campaign=freshers", campaign: "Freshers-Reel", channel: "Instagram", clicks: 612, signups: 52, orders: 28, revenue: 38900, commission: 3890, ctr: 8.50, lastClick: "Dec 13, 2026 8:20 PM", createdOn: "Oct 18, 2026" },
  { id: "URL-005", label: "Notice Board QR", url: "https://gajab.com/r/RIYA-DU24?utm_source=qr&utm_campaign=poster", campaign: "Campus-QR", channel: "Offline / QR", clicks: 169, signups: 17, orders: 6, revenue: 10150, commission: 1015, ctr: 10.06, lastClick: "Dec 12, 2026 5:05 PM", createdOn: "Nov 04, 2026" },
];

// Detailed order-level commission history (for ambassador performance log)
export const commissionHistory = [
  { id: "GJ20485", date: "14/12/2026 02:14 PM", product: "RC Drift Car 1:18", category: "Toys & Games", urlLabel: "Insta Bio", orderValue: 1066, commissionPct: 10, commission: 106, status: "Confirmed", payoutStatus: "Pending" },
  { id: "GJ20471", date: "14/12/2026 11:02 AM", product: "Glass Container Pack of 4", category: "Home & Garden", urlLabel: "WhatsApp Hostel", orderValue: 581, commissionPct: 10, commission: 58, status: "Confirmed", payoutStatus: "Pending" },
  { id: "GJ20458", date: "13/12/2026 06:48 PM", product: "Kids Instant Print Camera", category: "Electronics", urlLabel: "Insta Bio", orderValue: 1761, commissionPct: 10, commission: 176, status: "Placed", payoutStatus: "Locked" },
  { id: "GJ20442", date: "13/12/2026 04:12 PM", product: "Foldable Art Board - Pink", category: "Arts & Crafts", urlLabel: "Master Link", orderValue: 1167, commissionPct: 10, commission: 117, status: "Confirmed", payoutStatus: "Pending" },
  { id: "GJ20429", date: "12/12/2026 11:24 AM", product: "Diecast Rolls Royce 1:24", category: "Toys & Games", urlLabel: "Freshers Reel", orderValue: 1534, commissionPct: 10, commission: 153, status: "Cancelled", payoutStatus: "Reversed" },
  { id: "GJ20418", date: "11/12/2026 09:38 PM", product: "Korean Skincare Combo", category: "Beauty", urlLabel: "Insta Bio", orderValue: 2244, commissionPct: 12, commission: 269, status: "Confirmed", payoutStatus: "Paid" },
  { id: "GJ20407", date: "10/12/2026 02:55 PM", product: "Stationery Mega Box", category: "Stationery", urlLabel: "Master Link", orderValue: 489, commissionPct: 8, commission: 39, status: "Confirmed", payoutStatus: "Paid" },
  { id: "GJ20392", date: "09/12/2026 05:14 PM", product: "Wireless Earbuds Pro", category: "Electronics", urlLabel: "Notice Board QR", orderValue: 1899, commissionPct: 10, commission: 190, status: "Confirmed", payoutStatus: "Paid" },
  { id: "GJ20381", date: "08/12/2026 10:02 AM", product: "Foldable Camping Chair", category: "Sporting Goods", urlLabel: "WhatsApp Hostel", orderValue: 1325, commissionPct: 10, commission: 132, status: "Confirmed", payoutStatus: "Paid" },
  { id: "GJ20364", date: "06/12/2026 03:45 PM", product: "Sling Bag - Brown", category: "Luggage & Bags", urlLabel: "Insta Bio", orderValue: 749, commissionPct: 10, commission: 75, status: "Confirmed", payoutStatus: "Paid" },
];

// Aggregated activity log (clicks, signups, orders) — last 14 days
export const activityLog = [
  { date: "14/12/2026", clicks: 427, signups: 41, orders: 18, revenue: 30850 },
  { date: "13/12/2026", clicks: 480, signups: 38, orders: 24, revenue: 38900 },
  { date: "12/12/2026", clicks: 610, signups: 52, orders: 31, revenue: 52400 },
  { date: "11/12/2026", clicks: 520, signups: 44, orders: 26, revenue: 41200 },
  { date: "10/12/2026", clicks: 380, signups: 32, orders: 19, revenue: 28800 },
  { date: "09/12/2026", clicks: 410, signups: 36, orders: 22, revenue: 32500 },
  { date: "08/12/2026", clicks: 320, signups: 28, orders: 14, revenue: 24000 },
];

export const stats = {
  totalClicks: 2847,
  ordersPlaced: 184,
  ordersDelivered: 152,
  revenue: 248650,
  commission: 24865,
  pendingPayout: 8420,
  paidOut: 16445,
  conversionRate: 6.5,
};

export const trendData = [
  { day: "Mon", clicks: 320, revenue: 24000 },
  { day: "Tue", clicks: 410, revenue: 32500 },
  { day: "Wed", clicks: 380, revenue: 28800 },
  { day: "Thu", clicks: 520, revenue: 41200 },
  { day: "Fri", clicks: 610, revenue: 52400 },
  { day: "Sat", clicks: 480, revenue: 38900 },
  { day: "Sun", clicks: 427, revenue: 30850 },
];

export const recentOrders = [
  { id: "GJ20485", product: "RC Drift Car 1:18", value: 1066, commission: 106, status: "Delivered", date: "Today, 2:14 PM" },
  { id: "GJ20471", product: "Glass Container Pack of 4", value: 581, commission: 58, status: "Delivered", date: "Today, 11:02 AM" },
  { id: "GJ20458", product: "Kids Instant Print Camera", value: 1761, commission: 176, status: "Placed", date: "Yesterday" },
  { id: "GJ20442", product: "Foldable Art Board - Pink", value: 1167, commission: 117, status: "Delivered", date: "Yesterday" },
  { id: "GJ20429", product: "Diecast Rolls Royce 1:24", value: 1534, commission: 153, status: "Cancelled", date: "2d ago" },
];

export const tasks = [
  { id: "T-101", title: "Post Instagram Reel about Gajab Bargains", description: "Create a 30-sec reel showing 3 bargain hauls from your campus crew. Tag @gajabbazaar & use #GajabSquad.", deadline: "Dec 18, 2026", status: "Pending", reward: 500 },
  { id: "T-102", title: "Refer 5 friends from your hostel", description: "Get 5 hostel-mates to sign up using your link and place their first order.", deadline: "Dec 22, 2026", status: "Pending", reward: 1000 },
  { id: "T-099", title: "Campus Bulletin Board Poster", description: "Print and put up the Gajab poster on your college notice board. Share photo.", deadline: "Dec 15, 2026", status: "Under Review", reward: 300, submission: "https://drive.google.com/poster-photo" },
  { id: "T-095", title: "WhatsApp Status Campaign", description: "Run a 7-day WhatsApp status streak featuring Gajab deals.", deadline: "Dec 08, 2026", status: "Approved", reward: 400 },
  { id: "T-092", title: "Freshers Welcome Kit Promo", description: "Promote freshers welcome combo to 1st year batch.", deadline: "Nov 30, 2026", status: "Approved", reward: 600 },
];

export const leaderboard = [
  { rank: 1, name: "Aarav Mehta", college: "IIT Bombay", city: "Mumbai", revenue: 684200, orders: 412, avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&h=120&fit=crop" },
  { rank: 2, name: "Sneha Iyer", college: "VIT Vellore", city: "Vellore", revenue: 612400, orders: 388, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop" },
  { rank: 3, name: "Karan Singh", college: "DTU Delhi", city: "Delhi", revenue: 548900, orders: 351, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop" },
  { rank: 4, name: "Priya Nair", college: "St. Xavier's", city: "Mumbai", revenue: 482300, orders: 312, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop" },
  { rank: 5, name: "Rohan Patel", college: "NIT Trichy", city: "Trichy", revenue: 421800, orders: 287, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop" },
  { rank: 6, name: "Ananya Reddy", college: "BITS Pilani", city: "Pilani", revenue: 388100, orders: 254, avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop" },
  { rank: 7, name: "Riya Sharma", college: "Delhi University", city: "Delhi", revenue: 248650, orders: 184, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop", isYou: true },
  { rank: 8, name: "Aditya Verma", college: "IIM Bangalore", city: "Bangalore", revenue: 224500, orders: 168, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop" },
  { rank: 9, name: "Meera Joshi", college: "Pune University", city: "Pune", revenue: 198200, orders: 142, avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop" },
  { rank: 10, name: "Vikram Rao", college: "Anna University", city: "Chennai", revenue: 184700, orders: 131, avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&h=120&fit=crop" },
];

export const myReferralCodes = [
  { code: "RIYA10", type: "Percentage", value: "10%", cap: "₹150", uses: 142, gmv: 184200, commission: 18420, status: "Active" },
  { code: "RIYAWELCOME", type: "Fixed", value: "₹100", cap: "—", uses: 87, gmv: 92400, commission: 9240, status: "Active" },
  { code: "RIYAFEST", type: "Percentage", value: "15%", cap: "₹250", uses: 24, gmv: 38900, commission: 3890, status: "Expired" },
];

export const payouts = [
  { id: "PO-2026-12", period: "Dec 1-15, 2026", amount: 8420, status: "Processing", date: "Expected Dec 20" },
  { id: "PO-2026-11", period: "Nov 16-30, 2026", amount: 7240, status: "Paid", date: "Dec 05, 2026" },
  { id: "PO-2026-10", period: "Nov 1-15, 2026", amount: 5680, status: "Paid", date: "Nov 20, 2026" },
  { id: "PO-2026-09", period: "Oct 16-31, 2026", amount: 3525, status: "Paid", date: "Nov 05, 2026" },
];

// Admin data
export const applicants = [
  { id: "AP-2026-0142", name: "Ishaan Kapoor", phone: "+91 98123 45678", email: "ishaan@iitd.ac.in", college: "IIT Delhi", city: "Delhi", appliedOn: "Dec 12, 2026", status: "Pending", duplicate: false },
  { id: "AP-2026-0141", name: "Pooja Banerjee", phone: "+91 98987 12345", email: "pooja.b@jadavpuru.ac.in", college: "Jadavpur University", city: "Kolkata", appliedOn: "Dec 12, 2026", status: "Pending", duplicate: false },
  { id: "AP-2026-0140", name: "Arjun Reddy", phone: "+91 99887 65432", email: "arjun@iith.ac.in", college: "IIT Hyderabad", city: "Hyderabad", appliedOn: "Dec 11, 2026", status: "Pending", duplicate: true },
  { id: "AP-2026-0139", name: "Sara Khan", phone: "+91 97654 32109", email: "sara@du.ac.in", college: "Delhi University", city: "Delhi", appliedOn: "Dec 11, 2026", status: "Pending", duplicate: false },
  { id: "AP-2026-0138", name: "Yash Gupta", phone: "+91 98765 11223", email: "yash@vit.ac.in", college: "VIT Vellore", city: "Vellore", appliedOn: "Dec 10, 2026", status: "Approved", duplicate: false },
  { id: "AP-2026-0137", name: "Tanvi Desai", phone: "+91 91234 56789", email: "tanvi@nitt.edu", college: "NIT Trichy", city: "Trichy", appliedOn: "Dec 10, 2026", status: "Rejected", duplicate: false },
  { id: "AP-2026-0136", name: "Kabir Malhotra", phone: "+91 99887 65432", email: "kabir@iith.ac.in", college: "IIT Hyderabad", city: "Hyderabad", appliedOn: "Dec 09, 2026", status: "Pending", duplicate: true },
];

export const adminKpis = {
  totalAmbassadors: 312,
  activeThisMonth: 248,
  totalOrders: 8742,
  totalGMV: 18420650,
  totalCommissionPaid: 1842065,
  refOrdersPercent: 28.4,
  conversionWithRef: 6.8,
  conversionWithoutRef: 3.2,
};

export const adminPendingTasks = [
  { id: "TS-4421", ambassador: "Riya Sharma", college: "Delhi University", task: "Campus Bulletin Board Poster", submittedOn: "2h ago", proof: "https://drive.google.com/poster-photo" },
  { id: "TS-4420", ambassador: "Vikram Rao", college: "Anna University", task: "Instagram Reel Post", submittedOn: "5h ago", proof: "https://instagram.com/p/abc123" },
  { id: "TS-4419", ambassador: "Meera Joshi", college: "Pune University", task: "WhatsApp Status Streak", submittedOn: "1d ago", proof: "Submitted via app" },
  { id: "TS-4418", ambassador: "Karan Singh", college: "DTU Delhi", task: "Refer 5 hostel friends", submittedOn: "1d ago", proof: "5 referrals tracked" },
];

export const referralCodes = [
  { code: "AARAV15", linkedTo: "Aarav Mehta", college: "IIT Bombay", type: "Percentage", value: "15%", cap: "₹250", uses: 412, gmv: 684200, commission: 68420, status: "Active", expires: "Mar 31, 2026" },
  { code: "SNEHA10", linkedTo: "Sneha Iyer", college: "VIT Vellore", type: "Percentage", value: "10%", cap: "₹200", uses: 388, gmv: 612400, commission: 61240, status: "Active", expires: "Mar 31, 2026" },
  { code: "KARAN100", linkedTo: "Karan Singh", college: "DTU Delhi", type: "Fixed", value: "₹100", cap: "—", uses: 351, gmv: 548900, commission: 54890, status: "Active", expires: "Mar 31, 2026" },
  { code: "RIYA10", linkedTo: "Riya Sharma", college: "Delhi University", type: "Percentage", value: "10%", cap: "₹150", uses: 142, gmv: 184200, commission: 18420, status: "Active", expires: "Mar 31, 2026" },
  { code: "PRIYAFEST", linkedTo: "Priya Nair", college: "St. Xavier's", type: "Percentage", value: "20%", cap: "₹500", uses: 87, gmv: 92400, commission: 18480, status: "Paused", expires: "Jan 15, 2026" },
];

export const referralUtilization = [
  { code: "AARAV15", orderId: "GJ20485", customerId: "C-882341", orderValue: 1185, date: "Dec 14, 2026 2:14 PM", discount: 178, commissionPct: "10%", commissionValue: 119 },
  { code: "SNEHA10", orderId: "GJ20484", customerId: "C-882340", orderValue: 2244, date: "Dec 14, 2026 1:55 PM", discount: 200, commissionPct: "10%", commissionValue: 224 },
  { code: "RIYA10", orderId: "GJ20483", customerId: "C-882339", orderValue: 1066, date: "Dec 14, 2026 1:42 PM", discount: 107, commissionPct: "10%", commissionValue: 107 },
  { code: "KARAN100", orderId: "GJ20482", customerId: "C-882338", orderValue: 1534, date: "Dec 14, 2026 1:28 PM", discount: 100, commissionPct: "8%", commissionValue: 123 },
  { code: "AARAV15", orderId: "GJ20481", customerId: "C-882337", orderValue: 581, date: "Dec 14, 2026 1:15 PM", discount: 87, commissionPct: "10%", commissionValue: 58 },
  { code: "SNEHA10", orderId: "GJ20480", customerId: "C-882336", orderValue: 1761, date: "Dec 14, 2026 12:58 PM", discount: 176, commissionPct: "10%", commissionValue: 176 },
];

export const colleges = [
  "Delhi University", "IIT Bombay", "IIT Delhi", "IIT Madras", "IIT Hyderabad",
  "VIT Vellore", "BITS Pilani", "NIT Trichy", "St. Xavier's College", "Jadavpur University",
  "Pune University", "Anna University", "IIM Bangalore", "DTU Delhi", "SRM University",
];

// Admin-side: All affiliate URLs across all ambassadors
export const adminAffiliateUrls = [
  { id: "URL-A001", ambassador: "Aarav Mehta", college: "IIT Bombay", label: "Master Link", url: "https://gajab.com/r/AARAV-IITB", channel: "All", clicks: 6240, signups: 482, orders: 412, revenue: 684200, commission: 68420, lastClick: "Dec 14, 2026 2:22 PM" },
  { id: "URL-A002", ambassador: "Aarav Mehta", college: "IIT Bombay", label: "Insta Story", url: "https://gajab.com/r/AARAV-IITB?utm=insta", channel: "Instagram", clicks: 3140, signups: 218, orders: 188, revenue: 312400, commission: 31240, lastClick: "Dec 14, 2026 1:14 PM" },
  { id: "URL-A003", ambassador: "Sneha Iyer", college: "VIT Vellore", label: "Master Link", url: "https://gajab.com/r/SNEHA-VIT", channel: "All", clicks: 5820, signups: 412, orders: 388, revenue: 612400, commission: 61240, lastClick: "Dec 14, 2026 1:58 PM" },
  { id: "URL-A004", ambassador: "Karan Singh", college: "DTU Delhi", label: "Master Link", url: "https://gajab.com/r/KARAN-DTU", channel: "All", clicks: 4980, signups: 384, orders: 351, revenue: 548900, commission: 54890, lastClick: "Dec 14, 2026 12:42 PM" },
  { id: "URL-A005", ambassador: "Riya Sharma", college: "Delhi University", label: "Master Link", url: "https://gajab.com/r/RIYA-DU24", channel: "All", clicks: 2847, signups: 312, orders: 184, revenue: 248650, commission: 24865, lastClick: "Dec 14, 2026 2:14 PM" },
  { id: "URL-A006", ambassador: "Riya Sharma", college: "Delhi University", label: "WhatsApp Hostel", url: "https://gajab.com/r/RIYA-DU24?utm=wa", channel: "WhatsApp", clicks: 824, signups: 98, orders: 58, revenue: 78200, commission: 7820, lastClick: "Dec 14, 2026 11:02 AM" },
  { id: "URL-A007", ambassador: "Priya Nair", college: "St. Xavier's", label: "Master Link", url: "https://gajab.com/r/PRIYA-SXC", channel: "All", clicks: 3120, signups: 248, orders: 312, revenue: 482300, commission: 48230, lastClick: "Dec 14, 2026 10:18 AM" },
  { id: "URL-A008", ambassador: "Rohan Patel", college: "NIT Trichy", label: "Master Link", url: "https://gajab.com/r/ROHAN-NITT", channel: "All", clicks: 2980, signups: 224, orders: 287, revenue: 421800, commission: 42180, lastClick: "Dec 13, 2026 9:48 PM" },
];
