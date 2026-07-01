import React, { useState } from "react";
import { Plus, Edit, Trash2, X, Bell, Send } from "lucide-react";
import { toast } from "sonner";
import { announcements } from "@/data/mockData";
import { useVersion } from "@/hooks/useVersion";

const priorityClr = { High: "bg-[#FEE2E2] text-[#991B1B]", Medium: "bg-[#FEF3C7] text-[#92400E]", Low: "bg-[#E0E7FF] text-[#3730A3]" };

export default function AdminAnnouncements() {
  const { isV2 } = useVersion();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", body: "", audience: "All Ambassadors", priority: "Medium" });

  const openCreate = () => { setEditing(null); setForm({ title: "", body: "", audience: "All Ambassadors", priority: "Medium" }); setOpen(true); };
  const openEdit = (a) => { setEditing(a); setForm({ title: a.title, body: a.body, audience: a.audience, priority: a.priority }); setOpen(true); };
  const save = (e) => {
    e.preventDefault();
    if (!form.title) { toast.error("Title required"); return; }
    toast.success(editing ? `Announcement "${form.title}" updated` : `Announcement sent to ${form.audience}`);
    setOpen(false);
  };
  const del = (a) => toast.success(`Deleted "${a.title}"`);

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <span className="gajab-sticker-yellow">Announcements</span>
          <h1 className="font-display text-3xl sm:text-4xl mt-2">Notify your ambassadors</h1>
          <p className="text-[#5A6378] mt-1">Push announcements, campaigns, payout updates. {announcements.length} sent.</p>
        </div>
        <button onClick={openCreate} className="btn-primary" data-testid="new-announcement-btn"><Plus className="w-4 h-4" /> New Announcement</button>
      </div>

      <div className="grid gap-3">
        {announcements.map(a => (
          <div key={a.id} className="gajab-card p-5" data-testid={`announcement-${a.id}`}>
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Bell className="w-4 h-4 text-[#F26B1F]" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6378]">{a.id}</span>
                  <span className={`gajab-sticker ${priorityClr[a.priority]} border border-current/30`}>{a.priority}</span>
                </div>
                <h3 className="font-display text-lg mt-1.5">{a.title}</h3>
                <p className="text-sm text-[#5A6378] mt-1">{a.body}</p>
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-[#5A6378]">
                  <span>📣 Audience: <b className="text-[#1B2D54]">{a.audience}</b></span>
                  <span>🕒 Sent: <b className="text-[#1B2D54]">{a.sentOn}</b></span>
                  {!isV2 && <span>👁️ Read: <b className="text-[#1B2D54]">{a.reads}/{a.total}</b></span>}
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(a)} className="p-2 hover:bg-[#FFF7EE] rounded-lg" data-testid={`edit-${a.id}`}><Edit className="w-4 h-4 text-[#5A6378]" /></button>
                <button onClick={() => del(a)} className="p-2 hover:bg-[#FEE2E2] rounded-lg" data-testid={`delete-${a.id}`}><Trash2 className="w-4 h-4 text-[#991B1B]" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#1B2D54]/40 p-4">
          <form onSubmit={save} className="gajab-card p-6 bg-white w-full max-w-lg space-y-3">
            <div className="flex items-center justify-between"><h3 className="font-display text-2xl">{editing ? "Edit" : "New"} announcement</h3><button type="button" onClick={()=>setOpen(false)}><X className="w-5 h-5" /></button></div>
            <label className="block"><span className="text-xs font-bold uppercase tracking-wider text-[#5A6378]">Title</span><input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} className="input-gajab mt-1" placeholder="Year-end bonus..." data-testid="ann-title" /></label>
            <label className="block"><span className="text-xs font-bold uppercase tracking-wider text-[#5A6378]">Body</span><textarea value={form.body} onChange={e=>setForm({...form, body:e.target.value})} rows={4} className="input-gajab mt-1 py-3 h-auto resize-none" data-testid="ann-body" /></label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block"><span className="text-xs font-bold uppercase tracking-wider text-[#5A6378]">Audience</span>
                <select value={form.audience} onChange={e=>setForm({...form, audience:e.target.value})} className="input-gajab mt-1"><option>All Ambassadors</option><option>Gold + Platinum tiers</option><option>Silver tier</option><option>Bronze tier</option><option>Specific city</option></select>
              </label>
              <label className="block"><span className="text-xs font-bold uppercase tracking-wider text-[#5A6378]">Priority</span>
                <select value={form.priority} onChange={e=>setForm({...form, priority:e.target.value})} className="input-gajab mt-1"><option>High</option><option>Medium</option><option>Low</option></select>
              </label>
            </div>
            <button className="btn-primary w-full" data-testid="ann-submit"><Send className="w-4 h-4" /> {editing ? "Update" : "Send to ambassadors"}</button>
          </form>
        </div>
      )}
    </div>
  );
}
