import React from "react";
import { ambassador, tiers } from "@/data/mockData";

const Field = ({ label, value }) => (
  <label className="block">
    <span className="text-xs font-bold uppercase tracking-wider text-[#5A6378]">{label}</span>
    <input defaultValue={value} className="input-gajab mt-1" />
  </label>
);

export default function Profile() {
  const tier = tiers.find(t => t.name === ambassador.tier) || tiers[0];
  return (
    <div className="space-y-5">
      <div>
        <span className="gajab-sticker-yellow">Your Profile</span>
        <h1 className="font-display text-3xl sm:text-4xl mt-2">Settings</h1>
      </div>
      <div className="gajab-card p-6 flex items-center gap-4 flex-wrap">
        <img src={ambassador.avatar} alt="" className="w-20 h-20 rounded-full object-cover ring-2 ring-[#F26B1F]/30" />
        <div className="flex-1 min-w-0">
          <p className="font-display text-2xl">{ambassador.name}</p>
          <p className="text-[#5A6378]">{ambassador.college} • {ambassador.city}</p>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className={`gajab-sticker ${tier.bg} border`} style={{ color: tier.color, borderColor: `${tier.color}40` }} data-testid="profile-tier-badge">
              {tier.icon} {tier.name} Tier
            </span>
            <span className="gajab-sticker-orange">Rank #{ambassador.rank}</span>
            <span className="gajab-sticker bg-[#FFF1C2] text-[#92400E] border border-[#FFC93C]/60">{tier.commission} commission</span>
          </div>
        </div>
        <div className={`hidden sm:grid w-20 h-20 rounded-2xl ${tier.bg} place-items-center text-5xl`}>
          {tier.icon}
        </div>
      </div>
      <div className="gajab-card p-6 grid sm:grid-cols-2 gap-4">
        <Field label="Full name" value={ambassador.name} />
        <Field label="Phone" value={ambassador.phone} />
        <Field label="Email" value={ambassador.email} />
        <Field label="City" value={ambassador.city} />
      </div>
      <div className="gajab-card p-6">
        <h3 className="font-display text-lg mb-3">Change password</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block"><span className="text-xs font-bold uppercase tracking-wider text-[#5A6378]">Current password</span><input type="password" className="input-gajab mt-1" /></label>
          <label className="block"><span className="text-xs font-bold uppercase tracking-wider text-[#5A6378]">New password</span><input type="password" className="input-gajab mt-1" /></label>
        </div>
        <button className="btn-primary mt-4" data-testid="save-profile-btn">Save changes</button>
      </div>
    </div>
  );
}
