"use client";
import { useEffect, useState } from "react";

export default function CyberhaMasterBuild() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [generatedPass, setGeneratedPass] = useState("");
  const [dailyTip, setDailyTip] = useState("");

  const tips = [
    "Hardware security keys (like YubiKey) are the gold standard for 2FA.",
    "Avoid using public USB ports; they can be used for 'Juice Jacking' attacks.",
    "Always verify the sender's email address manually before clicking any links.",
    "Encrypted DNS (DoH) can help prevent tracking by your Internet Provider.",
    "A clean digital footprint starts with deleting unused social media accounts.",
    "Ransomware often targets unpatched software. Keep your OS updated daily.",
    "Use a dedicated, non-admin account for your daily computing tasks."
  ];

  useEffect(() => {
    // 💡 Daily Intel Engine: Changes every 24 hours
    const day = Math.floor(Date.now() / 86400000);
    setDailyTip(tips[day % tips.length]);

    async function fetchIntel() {
      try {
        const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://www.bleepingcomputer.com/feed/`);
        const data = await res.json();
        setNews(data.items.slice(0, 15));
      } catch (e) { console.error("Neural Link Failure"); } finally { setLoading(false); }
    }
    fetchIntel();
  }, []);

  const genPass = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    setGeneratedPass(Array.from({length: 20}, () => chars[Math.floor(Math.random()*chars.length)]).join(''));
  };

  const Modal = ({ title, content }: { title: string, content: any }) => (
    <div className="fixed inset-0 bg-[#05070a]/98 backdrop-blur-2xl z-[100] p-6 flex items-center justify-center animate-in fade-in duration-300">
      <div className="bg-[#0d1117] border border-white/10 max-w-2xl w-full p-10 rounded-[2.5rem] shadow-[0_0_50px_-15px_rgba(0,242,255,0.2)] relative overflow-y-auto max-h-[85vh]">
        <h2 className="text-2xl font-black mb-6 text-[#00f2ff] tracking-tighter uppercase italic">{title}</h2>
        <div className="text-slate-400 leading-relaxed font-light space-y-4 text-sm">{content}</div>
        <button onClick={() => setActiveModal(null)} className="mt-10 px-10 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[9px] font-black tracking-widest transition-all">TERMINATE_WINDOW</button>
      </div>
    </div>
  );

  if (loading) return (
    <div className="min-h-screen bg-[#05070a] flex flex-col items-center justify-center font-mono text-[#00f2ff]">
      <div className="w-16 h-[2px] bg-[#00f2ff]/20 mb-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#00f2ff] animate-progress"></div>
      </div>
      <p className="text-[10px] tracking-[0.8em] animate-pulse">INITIATING_CYBERHA_OS</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#05070a] text-[#e6edf3] font-sans selection:bg-[#00f2ff] selection:text-black" dir="ltr">
      
      {/* 🔴 LIVE THREAT TICKER */}
      <div className="bg-[#ff2a2a]/5 border-b border-[#ff2a2a]/20 py-3 overflow-hidden sticky top-0 z-[70] backdrop-blur-md">
        <div className="flex animate-marquee whitespace-nowrap text-[10px] font-bold text-[#ff2a2a] tracking-widest uppercase">
          {news.slice(0, 8).map((item, i) => (
            <span key={i} className="px-12 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#ff2a2a] rounded-full shadow-[0_0_10px_#ff2a2a]"></span>
              CRITICAL_INTEL: {item.title}
            </span>
          ))}
        </div>
      </div>

      <nav className="p-10 flex justify-between items-center max-w-7xl mx-auto">
        <div className="cursor-pointer group" onClick={() => setSelectedPost(null)}>
          <h1 className="text-4xl font-black tracking-tighter italic">CYBERHA<span className="text-[#00f2ff]">.INTEL</span></h1>
          <div className="h-[1px] w-0 group-hover:w-full bg-[#00f2ff] transition-all duration-700"></div>
        </div>
        <div className="hidden md:block font-mono text-[9px] text-slate-600 space-y-1 text-right tracking-widest">
           <p>CORE: <span className="text-[#00f2ff]">ACTIVE_NODE</span></p>
           <p>ENCRYPTION: AES_256_GCM</p>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-10 px-6">
        {!selectedPost ? (
          <>
            {/* 🗺️ STRATEGIC RADAR & TOP AD SPACE */}
            <section className="mb-20">
               {/* AD_SLOT: Top Leaderboard */}
               <div className="text-center mb-10 text-slate-800 text-[8px] tracking-[1em] uppercase border-y border-white/5 py-4">
                  [ ADVERTISING_SPACE_01 // GLOBAL_PARTNERS ]
               </div>

               <div className="bg-[#0d1117] border border-white/5 p-20 rounded-[3.5rem] text-center shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00f2ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  <h2 className="text-7xl font-black mb-6 tracking-tighter italic opacity-90 leading-none">THREAT RADAR</h2>
                  <p className="text-slate-400 mb-12 max-w-lg mx-auto text-sm font-light leading-relaxed tracking-tight">
                    Monitor live offensive maneuvers across the global digital theater. Operational encryption active.
                  </p>
                  <a href="https://cybermap.kaspersky.com/" target="_blank" className="px-16 py-5 bg-[#00f2ff] hover:bg-white text-black font-black rounded-full transition-all duration-500 shadow-[0_0_40px_-10px_rgba(0,242,255,0.6)] uppercase text-[10px] tracking-[0.3em]">
                    Launch Tactical Visualizer
                  </a>
               </div>
            </section>

            {/* 🛡️ SECURITY TOOLS GRID */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
              <div className="bg-[#0d1117] border border-white/5 p-12 rounded-[3rem] group hover:border-[#00f2ff]/20 transition-all duration-700">
                <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] mb-8">Asset_Class // Key_Generator</h3>
                <div className="bg-black/50 p-6 rounded-2xl mb-8 font-mono text-[#00f2ff] text-center border border-white/5 tracking-widest text-lg min-h-[90px] flex items-center justify-center break-all">
                  {generatedPass || "••••••••••••••••"}
                </div>
                <button onClick={genPass} className="w-full py-5 bg-white/5 hover:bg-[#00f2ff] hover:text-black border border-white/10 rounded-2xl font-black transition-all uppercase text-[9px] tracking-[0.3em]">
                  Execute Encryption Gen
                </button>
              </div>

              <div className="bg-[#0d1117] border border-white/5 p-12 rounded-[3rem] flex flex-col justify-center relative overflow-hidden group">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#ff2a2a]/5 blur-[100px] rounded-full"></div>
                <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] mb-8">Asset_Class // Daily_Intel</h3>
                <p className="text-2xl text-slate-200 font-light leading-tight italic tracking-tight">"{dailyTip}"</p>
                <div className="mt-8 h-[1px] w-12 bg-[#ff2a2a]/40"></div>
              </div>
            </section>

            {/* INTEL FEED WITH IN-GRID AD */}
            <div className="flex items-center gap-6 mb-12">
               <h2 className="text-2xl font-black uppercase tracking-tighter italic">Strategic Intel Feed</h2>
               <div className="h-[1px] flex-grow bg-white/5"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {news.map((item, i) => (
                <>
                  <article key={i} onClick={() => setSelectedPost(item)} className="group bg-[#0d1117] border border-white/5 rounded-[2.5rem] overflow-hidden hover:scale-[1.03] transition-all duration-700 cursor-pointer shadow-xl">
                    <div className="h-48 relative overflow-hidden">
                      <img src={item.thumbnail || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] to-transparent"></div>
                    </div>
                    <div className="p-8">
                      <h3 className="font-bold text-lg mb-6 group-hover:text-[#00f2ff] transition-colors leading-snug line-clamp-2">{item.title}</h3>
                      <span className="text-[9px] font-black text-slate-600 group-hover:text-white uppercase tracking-widest transition-all">Full Intelligence Analyst →</span>
                    </div>
                  </article>

                  {/* AD_SLOT: In-Grid (After 3rd post) */}
                  {i === 2 && (
                    <div className="md:col-span-3 py-16 bg-white/5 border border-dashed border-white/10 rounded-[3rem] flex flex-col items-center justify-center space-y-4">
                       <span className="text-slate-800 text-[9px] tracking-[1.5em] uppercase">Tactical_Sponsor_Space</span>
                       <div className="text-slate-500 font-mono text-xs uppercase tracking-widest">[ AD_UNIT_PLACEMENT ]</div>
                    </div>
                  )}
                </>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-10 duration-1000">
             <button onClick={() => setSelectedPost(null)} className="mb-12 text-[#00f2ff] font-black text-[10px] tracking-[0.4em] flex items-center gap-3 hover:gap-6 transition-all uppercase">
                <span>←</span> Return to Command Center
             </button>
             
             {/* AD_SLOT: In-Article Top */}
             <div className="w-full h-20 bg-white/2 mb-12 border border-white/5 rounded-2xl flex items-center justify-center text-[8px] text-slate-800 tracking-[1em] uppercase">
                Partner_Broadcasting_Segment
             </div>

             <h1 className="text-5xl md:text-6xl font-black mb-12 tracking-tighter leading-[1]">{selectedPost.title}</h1>
             <div className="prose prose-invert max-w-none text-slate-400 text-xl leading-relaxed bg-[#0d1117] p-12 rounded-[3.5rem] border border-white/5 shadow-2xl font-light italic">
                <div dangerouslySetInnerHTML={{ __html: selectedPost.content || selectedPost.description }} />
             </div>

             {/* AFFILIATE BOX: Strategic Recommendations */}
             <div className="mt-16 p-12 bg-gradient-to-br from-[#00f2ff]/5 to-transparent border border-[#00f2ff]/20 rounded-[3rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-[#00f2ff]/10 text-4xl font-black">SECURE</div>
                <h4 className="text-[10px] font-black text-[#00f2ff] uppercase tracking-[0.4em] mb-4">Tactical Recommendation</h4>
                <p className="text-lg text-slate-300 font-light mb-8">Secure your operational node with professional-grade encryption services. Protect your identity globally.</p>
                <a href="mailto:sameaminn@proton.me" className="px-10 py-4 bg-white text-black font-black rounded-full text-[9px] tracking-[0.3em] uppercase hover:bg-[#00f2ff] transition-all">Explore Secure VPN Deals</a>
             </div>
          </div>
        )}
      </main>

      <footer className="py-24 border-t border-white/5 bg-black/40 mt-24 text-center">
          <div className="flex justify-center gap-12 mb-12 text-[10px] font-black text-slate-600 uppercase tracking-widest">
             <button onClick={() => setActiveModal('about')} className="hover:text-[#00f2ff] transition-colors">Mission</button>
             <button onClick={() => setActiveModal('privacy')} className="hover:text-[#00f2ff] transition-colors">Compliance_2026</button>
             <button onClick={() => setActiveModal('contact')} className="hover:text-[#00f2ff] transition-colors">Secure_Comms</button>
          </div>
          <p className="text-[9px] text-slate-800 tracking-[1em] mb-6 uppercase">Cyberha Intelligence Infrastructure // v2.0</p>
          <div className="text-[8px] font-mono text-[#00f2ff]/40 tracking-widest">ENCRYPTED_ID: sameaminn@proton.me</div>
      </footer>

      {/* 🛡️ 2026 PRIVACY & AD COMPLIANCE MODAL */}
      {activeModal === 'privacy' && (
        <Modal title="Operational Compliance & Privacy" content={
          <div className="space-y-6">
            <p>1. <b>Zero-Knowledge:</b> Cyberha Intelligence does not store personal identifiable information (PII) of its operators (visitors).</p>
            <p>2. <b>Monetization:</b> This node utilizes <b>Google AdSense</b> and third-party tactical partners. These entities may use cookies to serve contextually relevant information based on your browsing patterns.</p>
            <p>3. <b>Affiliate Disclosure:</b> Certain links within this terminal are affiliate assets. We may receive a commission for referrals to secure products (VPNs, Mail, Security Keys).</p>
            <p>4. <b>Data Rights:</b> You maintain full control over cookie settings via your terminal (browser) protocols.</p>
          </div>
        } />
      )}
      {activeModal === 'about' && <Modal title="Project Cyberha" content="Cyberha is a 2026 high-fidelity intelligence hub designed for real-time threat monitoring and global cybersecurity awareness. We bridge the gap between complex agency data and technical clarity." />}
      {activeModal === 'contact' && <Modal title="Secure Communication" content={<p className="text-center py-8">Request Access or Inquiry:<br/><br/><span className="text-2xl text-[#00f2ff] font-black">sameaminn@proton.me</span></p>} />}

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 45s linear infinite; }
        @keyframes progress { 0% { left: -100%; } 100% { left: 100%; } }
        .animate-progress { animation: progress 2s infinite linear; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  );
}