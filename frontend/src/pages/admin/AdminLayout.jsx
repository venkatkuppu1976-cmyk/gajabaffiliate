import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { UserCheck, Users, ListChecks, Trophy, Ticket, BarChart3, Activity, LogOut } from "lucide-react";
import Logo from "@/components/Logo";

const nav = [
  { to: "/admin/applicants", icon: UserCheck, label: "Applicants" },
  { to: "/admin/directory", icon: Users, label: "Directory" },
  { to: "/admin/tasks", icon: ListChecks, label: "Tasks" },
  { to: "/admin/leaderboard", icon: Trophy, label: "Leaderboard" },
  { to: "/admin/referral-codes", icon: Ticket, label: "Referral Codes" },
  { to: "/admin/referral-utilization", icon: Activity, label: "Utilization" },
  { to: "/admin/analytics", icon: BarChart3, label: "Analytics" },
];

export default function AdminLayout() {
  const navg = useNavigate();
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex">
      <aside className="w-64 bg-[#1A1A1A] text-white p-5 sticky top-0 h-screen hidden md:flex flex-col">
        <Logo size="md" showTag={false} />
        <span className="gajab-sticker-red mt-2 self-start">ADMIN CONSOLE</span>
        <nav className="space-y-1 mt-6 flex-1">
          {nav.map(n => (
            <NavLink key={n.to} to={n.to} data-testid={`admin-nav-${n.label.toLowerCase().replace(/ /g,"-")}`}
              className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-sm ${isActive ? "bg-[#E11D2A] text-white" : "text-white/70 hover:bg-white/10"}`}>
              <n.icon className="w-5 h-5" strokeWidth={2.5} />{n.label}
            </NavLink>
          ))}
        </nav>
        <button onClick={()=>navg("/")} className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-sm text-white/70 hover:bg-white/10" data-testid="admin-logout">
          <LogOut className="w-5 h-5" />Exit Admin
        </button>
      </aside>
      <main className="flex-1 min-w-0">
        <div className="md:hidden p-4 bg-[#1A1A1A] text-white flex items-center justify-between">
          <Logo size="sm" showTag={false} />
          <span className="gajab-sticker-red">ADMIN</span>
        </div>
        <div className="md:hidden p-2 bg-white border-b-2 border-black/10 overflow-x-auto">
          <div className="flex gap-2">
            {nav.map(n => (
              <NavLink key={n.to} to={n.to} className={({isActive}) => `whitespace-nowrap nav-tab border-2 ${isActive ? "bg-[#1A1A1A] text-white border-black" : "bg-white border-[#EAE6E1]"}`}>{n.label}</NavLink>
            ))}
          </div>
        </div>
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto"><Outlet /></div>
      </main>
    </div>
  );
}
