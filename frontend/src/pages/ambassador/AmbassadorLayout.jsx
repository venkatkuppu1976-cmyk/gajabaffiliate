import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Home, ListChecks, Trophy, Ticket, Wallet, User, LogOut, Menu } from "lucide-react";
import Logo from "@/components/Logo";
import { ambassador } from "@/data/mockData";

const nav = [
  { to: "/dashboard", icon: Home, label: "Home", end: true },
  { to: "/dashboard/tasks", icon: ListChecks, label: "Tasks" },
  { to: "/dashboard/leaderboard", icon: Trophy, label: "Leaderboard" },
  { to: "/dashboard/referrals", icon: Ticket, label: "Referrals" },
  { to: "/dashboard/payouts", icon: Wallet, label: "Payouts" },
  { to: "/dashboard/profile", icon: User, label: "Profile" },
];

export default function AmbassadorLayout() {
  const navg = useNavigate();
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r-2 border-black/10 p-5 sticky top-0 h-screen">
        <Logo size="md" />
        <div className="mt-6 mb-4 flex items-center gap-3 p-3 rounded-xl border-2 border-black bg-[#FFF6DC]">
          <img src={ambassador.avatar} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-black" />
          <div>
            <p className="font-display font-extrabold text-sm leading-tight">{ambassador.name}</p>
            <p className="text-xs text-[#4A4A4A]">Rank #{ambassador.rank} • {ambassador.tier}</p>
          </div>
        </div>
        <nav className="space-y-1 flex-1">
          {nav.map(n => (
            <NavLink key={n.to} to={n.to} end={n.end} data-testid={`amb-nav-${n.label.toLowerCase()}`}
              className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-sm ${isActive ? "bg-[#1A1A1A] text-white" : "text-[#4A4A4A] hover:bg-[#F3EFE9]"}`}>
              <n.icon className="w-5 h-5" strokeWidth={2.5} />{n.label}
            </NavLink>
          ))}
        </nav>
        <button onClick={()=>navg("/login")} className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-sm text-[#4A4A4A] hover:bg-[#FEE2E2]" data-testid="amb-logout">
          <LogOut className="w-5 h-5" strokeWidth={2.5} />Logout
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 pb-24 lg:pb-8">
        {/* Mobile top bar */}
        <div className="lg:hidden sticky top-0 z-30 bg-[#FDFBF7]/90 backdrop-blur border-b-2 border-black/10 px-4 h-14 flex items-center justify-between">
          <Logo size="sm" showTag={false} />
          <img src={ambassador.avatar} alt="" className="w-9 h-9 rounded-full object-cover border-2 border-black" />
        </div>

        <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
          <Outlet />
        </div>

        {/* Mobile bottom nav */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t-2 border-black grid grid-cols-5">
          {nav.slice(0,5).map(n => (
            <NavLink key={n.to} to={n.to} end={n.end} data-testid={`amb-bnav-${n.label.toLowerCase()}`}
              className={({isActive}) => `flex flex-col items-center justify-center py-2 text-[10px] font-extrabold uppercase tracking-wider ${isActive ? "text-[#E11D2A]" : "text-[#737373]"}`}>
              <n.icon className="w-5 h-5 mb-0.5" strokeWidth={2.5} />{n.label}
            </NavLink>
          ))}
        </nav>
      </main>
    </div>
  );
}
