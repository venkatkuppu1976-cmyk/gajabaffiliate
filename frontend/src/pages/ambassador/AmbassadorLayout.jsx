import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Home, ListChecks, Trophy, Wallet, User, LogOut, Link2, Activity, Award, Bell, Mail, HelpCircle, Settings, Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import { ambassador, inboxMessages } from "@/data/mockData";

const mainNav = [
  { to: "/dashboard", icon: Home, label: "Home", end: true },
  { to: "/dashboard/urls", icon: Link2, label: "My Links" },
  { to: "/dashboard/performance", icon: Activity, label: "Performance" },
  { to: "/dashboard/tier", icon: Award, label: "Tier" },
  { to: "/dashboard/tasks", icon: ListChecks, label: "Tasks" },
  { to: "/dashboard/leaderboard", icon: Trophy, label: "Leaderboard" },
  { to: "/dashboard/payouts", icon: Wallet, label: "Payouts" },
  { to: "/dashboard/inbox", icon: Mail, label: "Inbox" },
  { to: "/dashboard/announcements", icon: Bell, label: "Announcements" },
];

const hamburgerNav = [
  { to: "/dashboard/profile", icon: User, label: "Profile" },
  { to: "/dashboard/support", icon: HelpCircle, label: "Support" },
  { to: "/dashboard/settings", icon: Settings, label: "Account Settings" },
];

export default function AmbassadorLayout() {
  const navg = useNavigate();
  const [menu, setMenu] = useState(false);
  const unread = inboxMessages.filter(m=>!m.read).length;

  return (
    <div className="min-h-screen bg-[#FFF7EE] flex">
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-[#EFEAE0] p-5 sticky top-0 h-screen overflow-y-auto">
        <Logo size="md" />
        <div className="mt-6 mb-4 flex items-center gap-3 p-3 rounded-xl border border-[#EFEAE0] bg-[#FFF7EE]">
          <img src={ambassador.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
          <div><p className="font-display font-extrabold text-sm leading-tight">{ambassador.name}</p><p className="text-xs text-[#5A6378]">Rank #{ambassador.rank} • {ambassador.tier}</p></div>
        </div>
        <nav className="space-y-1 flex-1">
          {mainNav.map(n => (
            <NavLink key={n.to} to={n.to} end={n.end} data-testid={`amb-nav-${n.label.toLowerCase().replace(/ /g,"-")}`}
              className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-sm ${isActive ? "bg-[#F26B1F] text-white shadow-[0_4px_12px_rgba(242,107,31,0.30)]" : "text-[#5A6378] hover:bg-[#FFF7EE]"}`}>
              <n.icon className="w-5 h-5" strokeWidth={2.5} />{n.label}
              {n.label === "Inbox" && unread > 0 && <span className="ml-auto bg-[#F26B1F] text-white text-[10px] font-bold rounded-full px-1.5 py-0.5">{unread}</span>}
            </NavLink>
          ))}
        </nav>
        <button onClick={()=>setMenu(true)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-sm text-[#1B2D54] hover:bg-[#FFF7EE] border-t border-[#EFEAE0] mt-2 pt-3" data-testid="amb-hamburger-desktop">
          <Menu className="w-5 h-5" /> Menu
        </button>
      </aside>

      <main className="flex-1 min-w-0 pb-24 lg:pb-8">
        <div className="lg:hidden sticky top-0 z-30 bg-[#FFF7EE]/90 backdrop-blur border-b border-[#EFEAE0] px-4 h-14 flex items-center justify-between">
          <Logo size="sm" showTag={false} />
          <button onClick={()=>setMenu(true)} className="w-10 h-10 grid place-items-center rounded-xl border border-[#EFEAE0] bg-white" data-testid="amb-hamburger"><Menu className="w-5 h-5" /></button>
        </div>
        <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto"><Outlet /></div>
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[#EFEAE0] grid grid-cols-5">
          {mainNav.slice(0,5).map(n => (
            <NavLink key={n.to} to={n.to} end={n.end} data-testid={`amb-bnav-${n.label.toLowerCase().replace(/ /g,"-")}`}
              className={({isActive}) => `flex flex-col items-center justify-center py-2 text-[10px] font-extrabold uppercase tracking-wider ${isActive ? "text-[#F26B1F]" : "text-[#5A6378]"}`}>
              <n.icon className="w-5 h-5 mb-0.5" strokeWidth={2.5} />{n.label}
            </NavLink>
          ))}
        </nav>
      </main>

      {menu && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={()=>setMenu(false)}>
          <div className="bg-black/40 flex-1" />
          <div className="w-80 bg-white h-full overflow-y-auto p-5 border-l border-[#EFEAE0]" onClick={e=>e.stopPropagation()} data-testid="amb-menu-drawer">
            <div className="flex items-center justify-between mb-5"><Logo size="md" /><button onClick={()=>setMenu(false)}><X className="w-5 h-5" /></button></div>
            <div className="flex items-center gap-3 p-3 rounded-xl border border-[#EFEAE0] bg-[#FFF7EE] mb-4">
              <img src={ambassador.avatar} alt="" className="w-12 h-12 rounded-full object-cover" />
              <div><p className="font-display font-extrabold">{ambassador.name}</p><p className="text-xs text-[#5A6378]">{ambassador.phone}</p><p className="text-xs text-[#F26B1F] font-bold">{ambassador.tier} Tier · Rank #{ambassador.rank}</p></div>
            </div>
            <nav className="space-y-1 mb-4">
              {hamburgerNav.map(n => (
                <NavLink key={n.to} to={n.to} onClick={()=>setMenu(false)} data-testid={`amb-menu-${n.label.toLowerCase().replace(/ /g,"-")}`}
                  className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-sm ${isActive ? "bg-[#F26B1F] text-white" : "text-[#1B2D54] hover:bg-[#FFF7EE]"}`}>
                  <n.icon className="w-5 h-5" strokeWidth={2.5} />{n.label}
                </NavLink>
              ))}
            </nav>
            {/* Mobile only — show main nav items not in bottom nav */}
            <div className="lg:hidden border-t border-[#EFEAE0] pt-3 mb-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#5A6378] mb-2 px-3">All sections</p>
              <nav className="space-y-1">
                {mainNav.slice(5).map(n => (
                  <NavLink key={n.to} to={n.to} onClick={()=>setMenu(false)} className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-sm ${isActive ? "bg-[#F26B1F] text-white" : "text-[#1B2D54] hover:bg-[#FFF7EE]"}`}>
                    <n.icon className="w-5 h-5" />{n.label}
                  </NavLink>
                ))}
              </nav>
            </div>
            <button onClick={()=>{setMenu(false); navg("/login");}} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-sm text-[#991B1B] hover:bg-[#FEE2E2] border-t border-[#EFEAE0] pt-4" data-testid="amb-menu-signout">
              <LogOut className="w-5 h-5" /> Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
