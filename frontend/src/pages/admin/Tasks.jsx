import React, { useState } from "react";
import { Plus, Check, X, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { adminPendingTasks } from "@/data/mockData";

export default function AdminTasks() {
  const [form, setForm] = useState({ title:"", desc:"", deadline:"", reward:"", target:"all" });
  const create = (e) => {
    e.preventDefault();
    if (!form.title || !form.desc) { toast.error("Title & description required"); return; }
    toast.success("Task created & assigned!");
    setForm({ title:"", desc:"", deadline:"", reward:"", target:"all" });
  };
  return (
    <div className="space-y-5">
      <div>
        <span className="gajab-sticker-yellow">Tasks & Verifications</span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold mt-2">Task Creator + Verification Center</h1>
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        {/* Create form */}
        <form onSubmit={create} className="gajab-card p-5 lg:col-span-2 space-y-3 h-fit">
          <h3 className="font-display text-lg font-extrabold flex items-center gap-2"><Plus className="w-5 h-5" />Create new task</h3>
          <label className="block"><span className="text-xs font-bold uppercase tracking-wider">Title</span><input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} className="input-gajab mt-1" placeholder="e.g. Insta Reel Campaign" data-testid="task-title" /></label>
          <label className="block"><span className="text-xs font-bold uppercase tracking-wider">Description</span><textarea value={form.desc} onChange={e=>setForm({...form, desc:e.target.value})} rows={4} className="input-gajab mt-1 py-3 h-auto resize-none" data-testid="task-desc" /></label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block"><span className="text-xs font-bold uppercase tracking-wider">Deadline</span><input type="date" value={form.deadline} onChange={e=>setForm({...form, deadline:e.target.value})} className="input-gajab mt-1" data-testid="task-deadline" /></label>
            <label className="block"><span className="text-xs font-bold uppercase tracking-wider">Reward (₹)</span><input type="number" value={form.reward} onChange={e=>setForm({...form, reward:e.target.value})} className="input-gajab mt-1" placeholder="500" data-testid="task-reward" /></label>
          </div>
          <label className="block"><span className="text-xs font-bold uppercase tracking-wider">Assign to</span>
            <select value={form.target} onChange={e=>setForm({...form, target:e.target.value})} className="input-gajab mt-1" data-testid="task-target">
              <option value="all">All ambassadors</option><option value="gold">Gold tier+</option><option value="specific">Specific ambassadors</option>
            </select>
          </label>
          <button type="submit" className="btn-primary w-full" data-testid="create-task-btn"><Plus className="w-4 h-4" />Create & Assign</button>
        </form>

        {/* Pending verifications */}
        <div className="lg:col-span-3 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-extrabold">Pending verifications ({adminPendingTasks.length})</h3>
          </div>
          {adminPendingTasks.map(t => (
            <div key={t.id} className="gajab-card p-4" data-testid={`pending-task-${t.id}`}>
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="min-w-0">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#737373]">{t.id} • {t.submittedOn}</p>
                  <p className="font-display font-extrabold mt-1">{t.task}</p>
                  <p className="text-sm text-[#4A4A4A]"><b>{t.ambassador}</b> • {t.college}</p>
                  <p className="text-sm mt-2 p-2 rounded-lg bg-[#FFF6DC] border border-[#FFC93C] inline-flex items-center gap-1"><ExternalLink className="w-3 h-3" />{t.proof}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={()=>toast.error(`${t.ambassador}'s submission rejected`)} className="btn-ghost border-[#991B1B] text-[#991B1B]" data-testid={`reject-${t.id}`}><X className="w-4 h-4" /></button>
                  <button onClick={()=>toast.success(`${t.ambassador}'s submission approved!`)} className="btn-primary" data-testid={`approve-${t.id}`}><Check className="w-4 h-4" />Approve</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
