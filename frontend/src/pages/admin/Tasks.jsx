import React, { useState } from "react";
import { Plus, Check, X, ExternalLink, Search, Filter, ArrowLeft, RotateCw } from "lucide-react";
import { toast } from "sonner";
import { adminTasks, taskAssignees, adminPendingTasks } from "@/data/mockData";
import DateInputDDMMYYYY from "@/components/DateInputDDMMYYYY";

const statusClr = {
  "Approved": "bg-[#D1FAE5] text-[#065F46] border-[#065F46]/40",
  "Rejected": "bg-[#FEE2E2] text-[#991B1B] border-[#991B1B]/40",
  "Pending": "bg-[#FEF3C7] text-[#92400E] border-[#92400E]/40",
  "Under Review": "bg-[#FEF3C7] text-[#92400E] border-[#92400E]/40",
  "Resubmitted": "bg-[#E0E7FF] text-[#3730A3] border-[#3730A3]/30",
};

export default function AdminTasks() {
  const [detail, setDetail] = useState(null);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("All");
  const [form, setForm] = useState({ title:"", desc:"", deadline:"", reward:"", target:"all" });

  const filtered = adminTasks
    .filter(t => filter === "All" || t.status === filter)
    .filter(t => (t.title + t.description + t.id).toLowerCase().includes(q.toLowerCase()));

  const create = (e) => { e.preventDefault(); if (!form.title || !form.desc) { toast.error("Title & description required"); return; } toast.success("Task created & assigned!"); setOpen(false); setForm({ title:"", desc:"", deadline:"", reward:"", target:"all" }); };

  if (detail) {
    const assignees = taskAssignees[detail.id] || [];
    return (
      <div className="space-y-5">
        <button onClick={()=>setDetail(null)} className="btn-ghost text-sm"><ArrowLeft className="w-4 h-4" /> Back to all tasks</button>
        <div className="gajab-card p-6">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6378]">{detail.id}</span>
          <h1 className="font-display text-3xl mt-1">{detail.title}</h1>
          <p className="text-[#5A6378] mt-1">{detail.description}</p>
          <div className="mt-3 flex flex-wrap gap-4 text-sm">
            <span>⏰ Deadline: <b>{detail.deadline}</b></span>
            <span>🎁 Reward: <b>₹{detail.reward}</b></span>
            <span>📊 Status: <b>{detail.status}</b></span>
            <span>👥 Assigned: <b>{detail.assignedCount}</b></span>
            <span>✓ Completed: <b>{detail.completedCount}</b></span>
          </div>
        </div>

        <div className="gajab-card p-5">
          <h3 className="font-display text-lg mb-3">Assigned affiliates ({assignees.length})</h3>
          <div className="space-y-2">
            {assignees.map((a, i) => (
              <div key={i} className="flex items-center justify-between gap-3 p-3 rounded-xl border border-[#EFEAE0] flex-wrap" data-testid={`assignee-${i}`}>
                <div className="min-w-0">
                  <p className="font-bold">{a.ambassador}</p><p className="text-xs text-[#5A6378]">{a.college} • Submitted: {a.submittedOn}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`gajab-sticker border ${statusClr[a.status]}`}>{a.status}</span>
                  {a.status === "Resubmitted" && <button onClick={()=>toast.success(`Resubmission from ${a.ambassador} approved`)} className="btn-primary text-xs h-8 px-3" data-testid={`approve-resub-${i}`}><Check className="w-3 h-3" /> Approve Resubmission</button>}
                  {a.status === "Under Review" && (<><button onClick={()=>toast.success(`Approved ${a.ambassador}`)} className="btn-primary text-xs h-8 px-3"><Check className="w-3 h-3" /></button><button onClick={()=>toast.error(`Rejected ${a.ambassador}`)} className="btn-ghost text-xs h-8 px-3 border-[#991B1B] text-[#991B1B]"><X className="w-3 h-3" /></button></>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <span className="gajab-sticker-yellow">Tasks Dashboard</span>
          <h1 className="font-display text-3xl sm:text-4xl mt-2">Task library & verifications</h1>
          <p className="text-[#5A6378] mt-1">{filtered.length} of {adminTasks.length} tasks · {adminPendingTasks.length} pending verifications</p>
        </div>
        <button onClick={()=>setOpen(true)} className="btn-primary" data-testid="create-task-btn"><Plus className="w-4 h-4" /> New Task</button>
      </div>

      <div className="gajab-card p-4 grid lg:grid-cols-3 gap-3">
        <div className="relative lg:col-span-2"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A6378]" /><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search task title, ID..." className="input-gajab pl-10" data-testid="tasks-search" /></div>
        <select value={filter} onChange={e=>setFilter(e.target.value)} className="input-gajab" data-testid="tasks-filter"><option>All</option><option>Active</option><option>Closed</option></select>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(t => (
          <button key={t.id} onClick={()=>setDetail(t)} className="gajab-card p-5 text-left" data-testid={`task-card-${t.id}`}>
            <div className="flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6378]">{t.id}</span><span className={`gajab-sticker border ${t.status==="Active"?"bg-[#D1FAE5] text-[#065F46] border-[#065F46]/40":"bg-[#F3EFE9] text-[#5A6378] border-[#EFEAE0]"}`}>{t.status}</span></div>
            <h3 className="font-display text-lg mt-1">{t.title}</h3>
            <p className="text-sm text-[#5A6378] mt-1 line-clamp-2">{t.description}</p>
            <div className="mt-3 flex justify-between items-end">
              <div><p className="text-[10px] uppercase font-bold text-[#5A6378]">Deadline</p><p className="font-bold text-sm">{t.deadline}</p></div>
              <div className="text-right"><p className="text-[10px] uppercase font-bold text-[#5A6378]">Progress</p><p className="font-display text-lg text-[#F26B1F]">{t.completedCount}/{t.assignedCount}</p></div>
            </div>
            <div className="mt-2 h-2 rounded-full bg-[#F3EFE9] overflow-hidden"><div className="h-full bg-[#F26B1F]" style={{width: `${(t.completedCount/t.assignedCount*100).toFixed(0)}%`}} /></div>
          </button>
        ))}
      </div>

      <div className="gajab-card p-5">
        <h3 className="font-display text-lg mb-3">Pending verifications ({adminPendingTasks.length})</h3>
        <div className="space-y-2">
          {adminPendingTasks.map(t => (
            <div key={t.id} className="p-3 rounded-xl border border-[#EFEAE0] flex items-center justify-between gap-3 flex-wrap" data-testid={`pending-task-${t.id}`}>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#5A6378]">{t.id} • {t.submittedOn}{t.status === "Resubmitted" && <span className="ml-2 gajab-sticker bg-[#E0E7FF] text-[#3730A3] border border-[#3730A3]/30 text-[9px]"><RotateCw className="w-2.5 h-2.5" /> RESUBMITTED</span>}</p>
                <p className="font-bold">{t.task}</p>
                <p className="text-xs text-[#5A6378]">{t.ambassador} • {t.college}</p>
                <p className="text-xs mt-1 flex items-center gap-1 text-[#F26B1F]"><ExternalLink className="w-3 h-3" />{t.proof}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>toast.error(`${t.ambassador}'s submission rejected`)} className="btn-ghost border-[#991B1B] text-[#991B1B] text-xs h-9"><X className="w-3 h-3" /></button>
                <button onClick={()=>toast.success(`${t.ambassador}'s submission approved!`)} className="btn-primary text-xs h-9"><Check className="w-3 h-3" /> Approve</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#1B2D54]/40 p-4">
          <form onSubmit={create} className="gajab-card p-6 bg-white w-full max-w-lg space-y-3">
            <div className="flex items-center justify-between"><h3 className="font-display text-2xl">New task</h3><button type="button" onClick={()=>setOpen(false)}><X className="w-5 h-5" /></button></div>
            <label className="block"><span className="text-xs font-bold uppercase tracking-wider text-[#5A6378]">Title</span><input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} className="input-gajab mt-1" data-testid="task-title" /></label>
            <label className="block"><span className="text-xs font-bold uppercase tracking-wider text-[#5A6378]">Description</span><textarea value={form.desc} onChange={e=>setForm({...form, desc:e.target.value})} rows={3} className="input-gajab mt-1 py-3 h-auto resize-none" data-testid="task-desc" /></label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block"><span className="text-xs font-bold uppercase tracking-wider text-[#5A6378]">Deadline (dd/mm/yyyy)</span><div className="mt-1"><DateInputDDMMYYYY value={form.deadline} onChange={v=>setForm({...form, deadline:v})} testId="task-deadline" /></div></label>
              <label className="block"><span className="text-xs font-bold uppercase tracking-wider text-[#5A6378]">Reward (₹)</span><input type="number" value={form.reward} onChange={e=>setForm({...form, reward:e.target.value})} className="input-gajab mt-1" data-testid="task-reward" /></label>
            </div>
            <label className="block"><span className="text-xs font-bold uppercase tracking-wider text-[#5A6378]">Assign to</span><select value={form.target} onChange={e=>setForm({...form, target:e.target.value})} className="input-gajab mt-1"><option value="all">All ambassadors</option><option value="gold">Gold tier+</option><option value="specific">Specific ambassadors</option></select></label>
            <button className="btn-primary w-full" data-testid="submit-task-btn"><Plus className="w-4 h-4" /> Create & Assign</button>
          </form>
        </div>
      )}
    </div>
  );
}
