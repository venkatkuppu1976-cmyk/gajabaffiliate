import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Home, ListChecks, Trophy, Wallet, User, LogOut, Link2, Activity, Award, Bell, Mail, HelpCircle, Settings, Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import { ambassador, inboxMessages, tiers } from "@/data/mockData";

const mainNav = [
  { to: "/dashboard", icon: Home, label: "Home", end: true },
  { to: "/dashboard/inbox", icon: Mail, label: "Inbox" },
  { to: "/dashboard/urls", icon: Link2, label: "My Links" },
  { to: "/dashboard/performance", icon: Activity, label: "Performance" },
  { to: "/dashboard/tier", icon: Award, label: "Tier" },
  { to: "/dashboard/tasks", icon: ListChecks, label: "Tasks" },
  { to: "/dashboard/leaderboard", icon: Trophy, label: "Leaderboard" },
  { to: "/dashboard/payouts", icon: Wallet, label: "Payouts" },
  { to: "/dashboard/announcements", icon: Bell, label: "Announcements" },
];

const popupNav = [
  { to: "/dashboard/profile", icon: User, label: "My Profile" },
  { to: "/dashboard/settings", icon: Settings, label: "Settings" },
  { to: "/dashboard/support", icon: HelpCircle, label: "Help Center" },
];

export default function AmbassadorLayout() {
  const navg = useNavigate();
  const [menu, setMenu] = useState(false);
  const unread = inboxMessages.filter(m=>!m.read).length;
  const tier = tiers.find(t => t.name === ambassador.tier) || tiers[0];

  return (
    <div className="min-h-screen bg-[#FFF7EE] flex">
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-[#EFEAE0] p-5 sticky top-0 h-screen overflow-y-auto">
        <Logo size="md" />
        <nav className="space-y-1 flex-1 mt-6">
          {mainNav.map(n => (
            <NavLink key={n.to} to={n.to} end={n.end} data-testid={`amb-nav-${n.label.toLowerCase().replace(/ /g,"-")}`}
              className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-sm ${isActive ? "bg-[#F26B1F] text-white shadow-[0_4px_12px_rgba(242,107,31,0.30)]" : "text-[#5A6378] hover:bg-[#FFF7EE]"}`}>
              <n.icon className="w-5 h-5" strokeWidth={2.5} />{n.label}
              {n.label === "Inbox" && unread > 0 && <span className="ml-auto bg-[#F26B1F] text-white text-[10px] font-bold rounded-full px-1.5 py-0.5">{unread}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="flex-1 min-w-0 pb-24 lg:pb-8">
        {/* Top bar with logo (mobile) on left + profile card & hamburger on right */}
        <div className="sticky top-0 z-30 bg-[#FFF7EE]/95 backdrop-blur border-b border-[#EFEAE0] px-4 lg:px-8 h-16 flex items-center justify-between gap-3">
          <div className="lg:hidden"><Logo size="sm" showTag={false} /></div>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-2">
            <button onClick={()=>setMenu(true)} className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-full border border-[#EFEAE0] bg-white hover:border-[#F26B1F] hover:bg-[#FFF7EE] transition-all max-w-[300px]" data-testid="amb-profile-card">
              <img src={ambassador.avatar} alt="" className="w-8 h-8 rounded-full object-cover ring-2 ring-[#F26B1F]/30 flex-shrink-0" />
              <div className="text-left min-w-0 hidden sm:block">
                <p className="font-bold text-sm leading-tight truncate text-[#1B2D54]">{ambassador.name}</p>
                <p className="text-[10px] text-[#5A6378] truncate">Rank #{ambassador.rank} • {ambassador.tier}</p>
              </div>
              <span className="w-8 h-8 grid place-items-center rounded-full ml-1 flex-shrink-0" data-testid="amb-hamburger"><Menu className="w-5 h-5 text-[#1B2D54]" /></span>
            </button>
          </div>
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

      {/* POPUP MENU */}
      {menu && (
        <div className="fixed inset-0 z-50" onClick={()=>setMenu(false)}>
          <div className="absolute inset-0 bg-[#1B2D54]/20" />
          <div className="absolute top-16 right-4 lg:right-8 w-[340px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-[0_24px_60px_rgba(27,45,84,0.20)] border border-[#EFEAE0] overflow-hidden" onClick={e=>e.stopPropagation()} data-testid="amb-menu-popup">
            {/* Profile header */}
            <div className="p-5 flex items-center gap-3 border-b border-[#EFEAE0]">
              <img src={ambassador.avatar} alt="" className="w-12 h-12 rounded-full object-cover ring-2 ring-[#F26B1F]/30 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="font-display text-lg leading-tight truncate">{ambassador.name}</p>
                <p className="text-xs text-[#5A6378] truncate">{ambassador.email}</p>
              </div>
            </div>

            {/* Tier highlight section */}
            <div className="px-4 pt-4 pb-2">
              <p className="text-xs font-bold text-[#5A6378] mb-2">My Tier</p>
              <div className="rounded-2xl p-4 text-white relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${tier.color}, ${tier.color}dd)` }}>
                <div className="absolute top-2 right-2 text-3xl opacity-50">{tier.icon}</div>
                <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">{tier.name.toUpperCase()} TIER</p>
                <p className="font-display text-2xl mt-1 leading-tight">{tier.commission} commission <span className="opacity-70 text-base">| Rank #{ambassador.rank}</span></p>
                <div className="flex items-center gap-1.5 mt-2"><span className="w-2 h-2 rounded-full bg-[#FFC93C]" /><p className="text-xs font-bold text-[#FFC93C]">Current tier</p></div>
              </div>
            </div>

            {/* Menu items */}
            <nav className="py-2">
              {popupNav.map(n => (
                <NavLink key={n.to} to={n.to} onClick={()=>setMenu(false)} data-testid={`amb-popup-${n.label.toLowerCase().replace(/ /g,"-")}`}
                  className={({isActive}) => `flex items-center gap-3 px-5 py-3 font-bold text-sm transition-colors ${isActive ? "bg-[#FFF7EE] text-[#F26B1F] border-l-2 border-[#F26B1F]" : "text-[#1B2D54] hover:bg-[#FFF7EE]"}`}>
                  <n.icon className="w-5 h-5" strokeWidth={2} />{n.label}
                </NavLink>
              ))}
              {/* Mobile-only: show remaining main nav items inside popup */}
              <div className="lg:hidden border-t border-[#EFEAE0] mt-1 pt-1">
                {mainNav.slice(5).map(n => (
                  <NavLink key={n.to} to={n.to} onClick={()=>setMenu(false)} className={({isActive}) => `flex items-center gap-3 px-5 py-3 font-bold text-sm transition-colors ${isActive ? "bg-[#FFF7EE] text-[#F26B1F]" : "text-[#1B2D54] hover:bg-[#FFF7EE]"}`}>
                    <n.icon className="w-5 h-5" strokeWidth={2} />{n.label}
                  </NavLink>
                ))}
              </div>
              <button onClick={()=>{setMenu(false); navg("/login");}} className="w-full flex items-center gap-3 px-5 py-3 font-bold text-sm text-[#1B2D54] hover:bg-[#FEE2E2] hover:text-[#991B1B] border-t border-[#EFEAE0]" data-testid="amb-popup-logout">
                <LogOut className="w-5 h-5" strokeWidth={2} />Log out
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
