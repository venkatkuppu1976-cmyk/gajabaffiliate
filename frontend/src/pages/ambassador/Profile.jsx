import React from "react";
import { ambassador } from "@/data/mockData";

const Field = ({ label, value }) => (
  <label className="block">
    <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
    <input defaultValue={value} className="input-gajab mt-1" />
  </label>
);

export default function Profile() {
  return (
    <div className="space-y-5">
      <div>
        <span className="gajab-sticker-yellow">Your Profile</span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold mt-2">Settings</h1>
      </div>
      <div className="gajab-card p-6 flex items-center gap-4">
        <img src={ambassador.avatar} alt="" className="w-20 h-20 rounded-full object-cover border-2 border-black" />
        <div>
          <p className="font-display text-2xl font-extrabold">{ambassador.name}</p>
          <p className="text-[#4A4A4A]">{ambassador.college} • {ambassador.city}</p>
          <span className="gajab-sticker-yellow mt-1 inline-block">{ambassador.tier} Tier • Rank #{ambassador.rank}</span>
        </div>
      </div>
      <div className="gajab-card p-6 grid sm:grid-cols-2 gap-4">
        <Field label="Full name" value={ambassador.name} />
        <Field label="Phone" value={ambassador.phone} />
        <Field label="Email" value={ambassador.email} />
        <Field label="City" value={ambassador.city} />
      </div>
      <div className="gajab-card p-6">
        <h3 className="font-display text-lg font-extrabold mb-3">Change password</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block"><span className="text-xs font-bold uppercase tracking-wider">Current password</span><input type="password" className="input-gajab mt-1" /></label>
          <label className="block"><span className="text-xs font-bold uppercase tracking-wider">New password</span><input type="password" className="input-gajab mt-1" /></label>
        </div>
        <button className="btn-primary mt-4" data-testid="save-profile-btn">Save changes</button>
      </div>
    </div>
  );
}
