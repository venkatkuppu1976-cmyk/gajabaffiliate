import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, Trophy, IndianRupee, Rocket, Megaphone, Users, CheckCircle2, ArrowRight, Instagram, MessageCircle, Star, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import Logo from "@/components/Logo";
import { colleges } from "@/data/mockData";

const Pill = ({ children, className = "" }) => (
  <span className={`gajab-sticker-yellow ${className}`}>{children}</span>
);

const Step = ({ num, title, desc, accent }) => (
  <div className="gajab-card p-6 relative">
    <div className={`w-12 h-12 rounded-xl border border-[#EFEAE0] grid place-items-center font-display text-2xl font-extrabold mb-4 ${accent}`}>
      {num}
    </div>
    <h4 className="font-display text-xl font-extrabold mb-1">{title}</h4>
    <p className="text-sm text-[#5A6378]">{desc}</p>
  </div>
);

const Perk = ({ icon: Icon, title, value, bg }) => (
  <div className={`gajab-card p-5 ${bg}`}>
    <Icon className="w-6 h-6 mb-2" strokeWidth={2.5} />
    <p className="text-xs font-extrabold uppercase tracking-wider opacity-70">{title}</p>
    <p className="font-display text-3xl font-extrabold mt-1">{value}</p>
  </div>
);

const Testimonial = ({ name, college, quote, img }) => (
  <div className="gajab-card p-5">
    <div className="flex items-center gap-3 mb-3">
      <img src={img} alt="" className="w-12 h-12 rounded-full object-cover border border-[#EFEAE0]" />
      <div>
        <p className="font-display font-extrabold">{name}</p>
        <p className="text-xs text-[#5A6378]">{college}</p>
      </div>
    </div>
    <div className="flex gap-0.5 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#FFC93C] text-[#FFC93C]" />)}</div>
    <p className="text-sm leading-relaxed">"{quote}"</p>
  </div>
);

const Faq = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <button onClick={() => setOpen(!open)} className="w-full text-left gajab-card-soft p-5 hover:border-[#EFEAE0] transition-all" data-testid={`faq-${q.slice(0, 10)}`}>
      <div className="flex items-center justify-between gap-4">
        <p className="font-display font-extrabold">{q}</p>
        <ChevronDown className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`} />
      </div>
      {open && <p className="mt-3 text-sm text-[#5A6378] leading-relaxed">{a}</p>}
    </button>
  );
};

export default function ApplyPage() {
  const nav = useNavigate();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", city: "", college: "", year: "", gender: "",
    instagram: "", whatsappCommunity: "", followers: "", whyJoin: "", referredBy: "",
  });
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const next = () => {
    if (step === 1 && (!form.name || !form.phone || !form.email)) { toast.error("Please fill name, phone & email"); return; }
    if (step === 2 && (!form.college || !form.city)) { toast.error("Please fill college & city"); return; }
    setStep(s => Math.min(4, s + 1));
  };
  const back = () => setStep(s => Math.max(1, s - 1));
  const submit = () => {
    setSubmitted(true);
    toast.success("Application submitted! We'll get back to you in 48 hours 🎉");
  };

  return (
    <div className="min-h-screen bg-[#FFF7EE] text-[#1B2D54]">
      {/* NAV */}
      <header className="sticky top-0 z-40 bg-[#FFF7EE]/85 backdrop-blur border-b border-[#EFEAE0]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center gap-2">
            <Link to="/login" className="btn-ghost text-sm" data-testid="nav-login-btn">Ambassador Login</Link>
            <a href="#apply" className="btn-primary text-sm" data-testid="nav-apply-btn">Apply Now</a>
          </div>
        </div>
        {/* marquee */}
        <div className="bg-[#1B2D54] text-[#FFC93C] py-2 overflow-hidden whitespace-nowrap">
          <div className="marquee-track inline-block">
            {Array(2).fill(0).map((_, i) => (
              <span key={i} className="inline-flex items-center gap-8 px-4 font-display font-extrabold uppercase tracking-wider text-sm">
                <span>🔥 312 ambassadors earning</span><span>•</span>
                <span>💰 ₹18.4L paid out this quarter</span><span>•</span>
                <span>🎓 80+ colleges across India</span><span>•</span>
                <span>⚡ Top earner: ₹68,420/month</span><span>•</span>
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#FFC93C] blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-[#F26B1F] blur-3xl opacity-20 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <Pill className="mb-4">🏆 Campus Ambassador Program • 2026</Pill>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight">
              Tera college.<br />
              Teri vibe.<br />
              <span className="text-[#F26B1F]">Tera kamai.</span>
            </h1>
            <p className="mt-6 text-lg text-[#5A6378] max-w-xl leading-relaxed">
              Become a <b>Gajab Campus Ambassador</b> — share India's most fun bargain bazaar with your crew and pocket commissions on every order. No fees, no targets, full freedom.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#apply" className="btn-primary" data-testid="hero-apply-btn">Apply via Campus <ArrowRight className="w-4 h-4" /></a>
              <a href="#how" className="btn-ghost" data-testid="hero-how-btn">How it works</a>
            </div>
            <div className="mt-8 flex items-center gap-6 flex-wrap">
              <div className="flex -space-x-2">
                {[1,2,3,4,5].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/64?img=${i+10}`} alt="" className="w-9 h-9 rounded-full border border-white/40 object-cover" />
                ))}
              </div>
              <p className="text-sm font-bold">312+ students • 80+ colleges</p>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="gajab-card p-6 bg-white">
              <Pill className="mb-3" style={{ transform: "rotate(-3deg)" }}>YOUR EARNINGS PREVIEW</Pill>
              <p className="font-display text-7xl font-extrabold leading-none">₹24,865<span className="text-2xl text-[#F26B1F]">/mo</span></p>
              <p className="text-sm text-[#5A6378] mt-2">Avg earnings of a Top-10 Gajab Ambassador</p>
              <div className="grid grid-cols-3 gap-3 mt-5">
                <div className="rounded-xl border border-[#EFEAE0] p-3 bg-[#FFF6DC]"><p className="text-xs font-extrabold uppercase opacity-70">Clicks</p><p className="font-display text-xl font-extrabold">2,847</p></div>
                <div className="rounded-xl border border-[#EFEAE0] p-3 bg-[#FFE3E5]"><p className="text-xs font-extrabold uppercase opacity-70">Orders</p><p className="font-display text-xl font-extrabold">184</p></div>
                <div className="rounded-xl border border-[#EFEAE0] p-3 bg-[#E6F8EF]"><p className="text-xs font-extrabold uppercase opacity-70">Revenue</p><p className="font-display text-xl font-extrabold">2.48L</p></div>
              </div>
            </div>
            <div className="absolute -top-3 -left-3 gajab-sticker-orange text-[10px] wiggle">🔥 Live numbers</div>
          </div>
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div>
            <Pill>How it works</Pill>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold mt-3">3 steps to your first ₹.</h2>
          </div>
          <p className="text-[#5A6378] max-w-sm">No interview drama. No paperwork. Just apply, get approved, and start sharing.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          <Step num="1" title="Apply via Campus" desc="Fill the 2-min form with your college details and socials. We'll review in 48 hrs." accent="bg-[#FFC93C]" />
          <Step num="2" title="Get your link" desc="Approved? You'll get a unique referral link + promo codes via WhatsApp & email." accent="bg-[#FFE3E5]" />
          <Step num="3" title="Share & earn" desc="Drop your link in hostel groups, college WhatsApp, Insta stories. Earn on every order." accent="bg-[#E6F8EF]" />
        </div>
      </section>

      {/* PERKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Pill>What you get</Pill>
        <h2 className="font-display text-4xl sm:text-5xl font-extrabold mt-3 mb-8">Perks that hit different.</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Perk icon={IndianRupee} title="Commission" value="Up to 15%" bg="bg-[#FFF6DC]" />
          <Perk icon={Trophy} title="Monthly bonus" value="₹2K-10K" bg="bg-[#FFE3E5]" />
          <Perk icon={Rocket} title="Goodies" value="Swag box" bg="bg-[#E6F8EF]" />
          <Perk icon={Users} title="Community" value="312+ peers" bg="bg-[#E8E4FB]" />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Pill>Real ambassadors. Real ₹.</Pill>
        <h2 className="font-display text-4xl sm:text-5xl font-extrabold mt-3 mb-8">Don't take our word for it.</h2>
        <div className="grid md:grid-cols-3 gap-5">
          <Testimonial name="Aarav Mehta" college="IIT Bombay" quote="Made ₹68k last month just by sharing my link on hostel groups. Gajab is unreal." img="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&h=120&fit=crop" />
          <Testimonial name="Sneha Iyer" college="VIT Vellore" quote="The leaderboard is addictive. Crossed ₹50k earning rank-2 nationally this sem." img="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop" />
          <Testimonial name="Karan Singh" college="DTU Delhi" quote="Payouts are super fast. Got my first ₹3k within a week of joining." img="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop" />
        </div>
      </section>

      {/* APPLY FORM */}
      <section id="apply" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="gajab-card p-6 sm:p-10">
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto bg-[#FFC93C] rounded-full border border-[#EFEAE0] grid place-items-center mb-4">
                <CheckCircle2 className="w-10 h-10" strokeWidth={2.5} />
              </div>
              <h3 className="font-display text-4xl font-extrabold">Application In!</h3>
              <p className="mt-3 text-[#5A6378] max-w-md mx-auto">We'll review your application within 48 hours. If approved, you'll get login details via WhatsApp & email.</p>
              <button onClick={() => nav("/login")} className="btn-primary mt-6" data-testid="apply-success-login-btn">Go to Login <ArrowRight className="w-4 h-4" /></button>
            </div>
          ) : (
            <>
              <Pill>Step {step} of 4</Pill>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold mt-3">Apply via Campus</h2>
              <p className="text-[#5A6378] mt-2 mb-6">Takes ~2 minutes. We'll get back in 48 hours.</p>

              {/* Progress */}
              <div className="flex gap-1.5 mb-8">
                {[1,2,3,4].map(i => (
                  <div key={i} className={`h-2 flex-1 rounded-full border border-[#EFEAE0] ${i <= step ? "bg-[#F26B1F]" : "bg-white"}`} />
                ))}
              </div>

              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="font-display text-xl font-extrabold">👋 Tell us about you</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <label className="block"><span className="text-xs font-bold uppercase tracking-wider">Full name</span><input data-testid="apply-name" value={form.name} onChange={e=>upd("name",e.target.value)} placeholder="Riya Sharma" className="input-gajab mt-1" /></label>
                    <label className="block"><span className="text-xs font-bold uppercase tracking-wider">Phone</span><input data-testid="apply-phone" value={form.phone} onChange={e=>upd("phone",e.target.value)} placeholder="+91 98765 43210" className="input-gajab mt-1" /></label>
                  </div>
                  <label className="block"><span className="text-xs font-bold uppercase tracking-wider">Email</span><input data-testid="apply-email" value={form.email} onChange={e=>upd("email",e.target.value)} placeholder="riya@du.ac.in" className="input-gajab mt-1" /></label>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <label className="block"><span className="text-xs font-bold uppercase tracking-wider">Gender</span>
                      <select data-testid="apply-gender" value={form.gender} onChange={e=>upd("gender",e.target.value)} className="input-gajab mt-1"><option value="">Select</option><option>Female</option><option>Male</option><option>Other</option><option>Prefer not to say</option></select>
                    </label>
                    <label className="block"><span className="text-xs font-bold uppercase tracking-wider">City</span><input data-testid="apply-city" value={form.city} onChange={e=>upd("city",e.target.value)} placeholder="Delhi" className="input-gajab mt-1" /></label>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="font-display text-xl font-extrabold">🎓 Your college</h3>
                  <label className="block"><span className="text-xs font-bold uppercase tracking-wider">College</span>
                    <select data-testid="apply-college" value={form.college} onChange={e=>upd("college",e.target.value)} className="input-gajab mt-1">
                      <option value="">Select your college</option>
                      {colleges.map(c => <option key={c}>{c}</option>)}
                      <option>Other</option>
                    </select>
                  </label>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <label className="block"><span className="text-xs font-bold uppercase tracking-wider">Year of study</span>
                      <select data-testid="apply-year" value={form.year} onChange={e=>upd("year",e.target.value)} className="input-gajab mt-1"><option value="">Select</option><option>1st year</option><option>2nd year</option><option>3rd year</option><option>4th year</option><option>Masters</option></select>
                    </label>
                    <label className="block"><span className="text-xs font-bold uppercase tracking-wider">Referred by (optional)</span><input data-testid="apply-referred" value={form.referredBy} onChange={e=>upd("referredBy",e.target.value)} placeholder="Ambassador code" className="input-gajab mt-1" /></label>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="font-display text-xl font-extrabold">📣 Your reach</h3>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-2"><Instagram className="w-4 h-4" /> Instagram handle</span>
                    <input data-testid="apply-instagram" value={form.instagram} onChange={e=>upd("instagram",e.target.value)} placeholder="@riyaa" className="input-gajab mt-1" />
                  </label>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <label className="block"><span className="text-xs font-bold uppercase tracking-wider">Followers (approx)</span>
                      <select data-testid="apply-followers" value={form.followers} onChange={e=>upd("followers",e.target.value)} className="input-gajab mt-1"><option value="">Select</option><option>&lt; 500</option><option>500 - 2K</option><option>2K - 10K</option><option>10K - 50K</option><option>50K+</option></select>
                    </label>
                    <label className="block"><span className="text-xs font-bold uppercase tracking-wider flex items-center gap-2"><MessageCircle className="w-4 h-4" /> WhatsApp community size</span><input data-testid="apply-whatsapp" value={form.whatsappCommunity} onChange={e=>upd("whatsappCommunity",e.target.value)} placeholder="e.g. 250" className="input-gajab mt-1" /></label>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <h3 className="font-display text-xl font-extrabold">✨ Last thing</h3>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-wider">Why should we pick you?</span>
                    <textarea data-testid="apply-why" value={form.whyJoin} onChange={e=>upd("whyJoin",e.target.value)} rows={5} placeholder="Tell us what makes you the perfect Gajab ambassador for your campus..." className="input-gajab mt-1 py-3 h-auto resize-none" />
                  </label>
                  <div className="rounded-xl bg-[#FFF6DC] border border-[#EFEAE0] p-4 text-sm">
                    <p className="font-bold">🎁 What you'll get if approved:</p>
                    <ul className="mt-2 space-y-1 list-disc list-inside text-[#5A6378]">
                      <li>Unique referral link + promo codes</li>
                      <li>Up to 15% commission on every order</li>
                      <li>Welcome swag box delivered to campus</li>
                      <li>Access to private Gajab Ambassador community</li>
                    </ul>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mt-8">
                <button onClick={back} disabled={step===1} className="btn-ghost disabled:opacity-40 disabled:cursor-not-allowed" data-testid="apply-back-btn">Back</button>
                {step < 4 ? (
                  <button onClick={next} className="btn-primary" data-testid="apply-next-btn">Continue <ArrowRight className="w-4 h-4" /></button>
                ) : (
                  <button onClick={submit} className="btn-primary" data-testid="apply-submit-btn">Submit Application <Sparkles className="w-4 h-4" /></button>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Pill>FAQ</Pill>
        <h2 className="font-display text-4xl font-extrabold mt-3 mb-8">Doubts? Cleared.</h2>
        <div className="space-y-3">
          <Faq q="Who can apply?" a="Any currently enrolled college student (UG/PG) in India. We love both shy bookworms and loud campus stars — what matters is your network." />
          <Faq q="Is there any fee?" a="Zero. ₹0. Free. Forever. We only make money when you do." />
          <Faq q="How do I get paid?" a="Bi-monthly payouts directly to your bank via UPI or NEFT. Minimum payout: ₹500." />
          <Faq q="What if my friends cancel orders?" a="Commission is only locked once the order is delivered. Cancelled & returned orders are auto-reversed." />
          <Faq q="Can I join from any college?" a="Yes! We currently have 312 ambassadors across 80+ colleges. If yours isn't listed, just pick 'Other'." />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1B2D54] text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
          <div>
            <Logo size="md" showTag={false} />
            <p className="mt-4 text-sm opacity-70">India's most fun bargain bazaar. Now hiring on campus.</p>
          </div>
          <div>
            <p className="font-display font-extrabold mb-3">Ambassador</p>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="#apply">Apply now</a></li>
              <li><Link to="/login">Login</Link></li>
              <li><a href="#how">How it works</a></li>
            </ul>
          </div>
          <div>
            <p className="font-display font-extrabold mb-3">Admin</p>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/admin" data-testid="footer-admin-link">Admin Console</Link></li>
              <li><a href="https://gajab.com">Visit gajab.com</a></li>
            </ul>
          </div>
        </div>
        <p className="text-center text-xs opacity-50 mt-10">© 2026 Gajab Bazaar. Made with 🌶️ in India.</p>
      </footer>
    </div>
  );
}
