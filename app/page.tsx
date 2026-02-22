"use client";
import { useEffect, useState } from "react";

export default function CyberhaGlobalIntel() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [generatedPass, setGeneratedPass] = useState("");
  const [dailyTip, setDailyTip] = useState("");

  const tips = [
    "Never reuse passwords across different platforms. Use a dedicated password manager.",
    "Beware of 'Juice Jacking' – avoid using public USB charging stations in airports.",
    "Enable Two-Factor Authentication (2FA) on all sensitive accounts immediately.",
    "Check URLs for HTTPS and spelling errors before entering any private credentials.",
    "Always update your router's firmware to patch critical security vulnerabilities.",
    "Avoid clicking on shortened links from unknown sources in SMS or emails.",
    "Physical security matters: cover your webcam when it is not in use.",
    "Regularly back up your data to an offline encrypted drive to prevent Ransomware loss.",
    "Be skeptical of urgent emails claiming your account will be deleted.",
    "Public Wi-Fi is insecure – always use a trusted VPN for encryption.",
    "Review app permissions: delete apps that ask for unnecessary location or mic access.",
    "A sudden drop in battery life might indicate background crypto-mining or spyware."
  ];

  useEffect(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const day = Math.floor(diff / (1000 * 60 * 60 * 24));
    setDailyTip(tips[day % tips.length]);

    async function fetchIntel() {
      try {
        const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://www.bleepingcomputer.com/feed/`);
        const data = await res.json();
        setNews(data.items.slice(0, 12));
      } catch (e) { console.error("Feed Offline"); } finally { setLoading(false); }
    }
    fetchIntel();
  }, []);

  const genPass = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    setGeneratedPass(Array.from({length: 18}, () => chars[Math.floor(Math.random()*chars.length)]).join(''));
  };

  const Modal = ({ title, content }: { title: string, content: any }) => (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-[100] p-6 flex items-center justify-center" onClick={() => setActiveModal(null)}>
      <div className="bg-[#0a0a0a] border border-cyan-500/20 max-w-2xl w-full p-10 rounded-[2.5rem] relative" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-black mb-6 text-cyan-500 uppercase italic tracking-tighter">{title}</h2>
        <div className="text-slate-400 leading-relaxed text-sm font-light">{content}</div>
        <button onClick={() => setActiveModal(null)} className="mt-8 text-white font-bold bg-cyan-900/30 px-8 py-2 rounded-full hover:bg-cyan-500 transition-all uppercase text-[10px]">Close Terminal</button>
      </div>
    </div>
  );

  if (loading) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono text-cyan-500">
      <div className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="animate-pulse tracking-[0.5em] text-[10px] uppercase">Booting Cyberha OS...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020202] text-slate-200 font-sans selection:bg-cyan-500 selection:text-black" dir="ltr">
      
      {/* 🔴 LIVE NEWS TICKER */}
      <div className="bg-red-600/10 border-b border-red-600/30 py-2.5 overflow-hidden sticky top-0 z-[70] backdrop-blur-md">
        <div className="flex animate-marquee whitespace-nowrap text-[10px] font-bold text-red-500 uppercase tracking-tight">
          {news.map((item, i) => (
            <span key={i} className="px-10 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping"></span>
              LIVE INTEL: {item.title}
            </span>
          ))}
        </div>
      </div>

      <nav className="p-8 border-b border-white/5 flex justify-between items-center max-w-7xl mx-auto">
        <div>
          <h1 className="text-3xl font-black tracking-tighter cursor-pointer" onClick={() => setSelectedPost(null)}>
            CYBERHA<span className="text-cyan-500">.INTEL</span>
          </h1>
          <p className="text-[7px] font-mono text-cyan-900 tracking-[0.5em] uppercase">Tactical Monitoring Active</p>
        </div>
        <div className="hidden md:block font-mono text-[9px] text-slate-600 text-right uppercase">
           Global Node: 2026_V1<br/>Status: <span className="text-green-600">Encrypted</span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-16 px-6">
        {!selectedPost ? (
          <>
            {/* 🗺️ LIVE THREAT RADAR SECTION */}
            <section className="mb-24">
              <div className="bg-gradient-to-br from-cyan-950/20 via-black to-black border border-cyan-500/20 p-16 rounded-[3rem] text-center shadow-2xl relative overflow-hidden group">
                <h2 className="text-5xl font-black mb-6 tracking-tighter text-white uppercase italic">Threat Radar</h2>
                <p className="text-slate-400 mb-10 max-w-xl mx-auto text-sm font-light leading-relaxed">
                  Due to high-security encryption protocols, please launch the live radar in an isolated operational window to monitor global cyber-attacks in real-time.
                </p>
                <a href="https://cybermap.kaspersky.com/" target="_blank" className="bg-cyan-600 hover:bg-white hover:text-black text-white px-12 py-5 rounded-full font-black transition-all inline-block shadow-2xl uppercase text-[10px] tracking-widest">
                  Launch Live Radar ←
                </a>
              </div>
            </section>

            {/* 🛡️ INTERACTIVE TOOLS & AWARENESS */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
              <div className="bg-[#080808] border border-white/5 p-12 rounded-[3.5rem] hover:border-cyan-500/30 transition-all shadow-xl">
                <h3 className="text-xl font-bold mb-6 text-white uppercase tracking-widest">🛡️ Shield Gen</h3>
                <div className="bg-black p-5 rounded-2xl mb-8 font-mono text-cyan-500 text-center border border-white/5 tracking-widest text-lg h-16 flex items-center justify-center break-all uppercase">
                  {generatedPass || "••••••••••••••••"}
                </div>
                <button onClick={genPass} className="w-full bg-cyan-600 text-white py-5 rounded-3xl font-black hover:bg-cyan-500 transition-all uppercase text-[10px] tracking-widest">
                  Generate Secure Key
                </button>
              </div>

              <div className="bg-red-600/5 border border-red-600/10 p-12 rounded-[3.5rem] flex flex-col justify-center relative group">
                <h3 className="text-xl font-bold mb-6 text-red-500 uppercase tracking-widest italic">💡 Daily Intel</h3>
                <p className="text-xl text-slate-200 font-light leading-relaxed italic animate-in fade-in duration-1000">
                  "{dailyTip}"
                </p>
                <p className="mt-8 text-[8px] font-mono text-slate-700 uppercase tracking-widest">Next Pulse Refresh: 24h</p>
              </div>
            </section>

            {/* NEWS FEED */}
            <h2 className="text-3xl font-black mb-12 tracking-tighter uppercase italic text-white/90">Latest Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {news.map((item, i) => (
                <article key={i} onClick={() => setSelectedPost(item)} className="bg-[#080808] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-cyan-500/40 transition-all cursor-pointer group shadow-2xl">
                  <div className="h-44 relative overflow-hidden">
                    <img src={item.thumbnail || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-8">
                    <h3 className="font-bold text-lg leading-tight group-hover:text-cyan-400 mb-4">{item.title}</h3>
                    <div className="text-[9px] text-slate-600 uppercase font-mono tracking-widest">Access Report +</div>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-4xl mx-auto animate-in fade-in duration-700">
             <button onClick={() => setSelectedPost(null)} className="mb-12 text-cyan-500 font-bold uppercase text-[10px] tracking-widest">← Back to Dashboard</button>
             <h1 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter leading-[1.05]">{selectedPost.title}</h1>
             <div className="prose prose-invert max-w-none text-slate-300 text-xl leading-relaxed bg-[#080808] p-12 rounded-[3.5rem] border border-white/5 shadow-2xl">
                <div dangerouslySetInnerHTML={{ __html: selectedPost.content || selectedPost.description }} />
             </div>
             <div className="mt-16 text-center">
                <a href={selectedPost.link} target="_blank" className="bg-white text-black px-14 py-5 rounded-full font-black hover:bg-cyan-500 hover:text-white transition-all uppercase text-[11px] tracking-widest">Read Original Intel</a>
             </div>
          </div>
        )}
      </main>

      {/* FOOTER & MODALS */}
      <footer className="py-24 border-t border-white/5 bg-black/50 mt-24 text-center">
          <div className="flex justify-center gap-12 mb-10 text-[10px] font-black text-slate-600 uppercase tracking-widest">
             <button onClick={() => setActiveModal('about')} className="hover:text-cyan-500">About</button>
             <button onClick={() => setActiveModal('privacy')} className="hover:text-cyan-500">Privacy Policy</button>
             <button onClick={() => setActiveModal('contact')} className="hover:text-cyan-500">Contact</button>
          </div>
          <p className="text-[9px] text-slate-800 tracking-[0.8em] mb-4">CYBERHA GLOBAL HUB &copy; 2026</p>
          <p className="text-[8px] font-mono text-slate-900 tracking-widest">sameaminn@proton.me</p>
      </footer>

      {activeModal === 'privacy' && (
        <Modal title="Privacy Policy 2026" content={
          <div className="space-y-4">
            <p>1. <b>Zero Data Collection:</b> Cyberha does not collect or store any personal visitor data.</p>
            <p>2. <b>External Links:</b> Intelligence feeds are sourced from global agencies; external links follow their respective privacy rules.</p>
            <p>3. <b>Security:</b> All sessions are encrypted via SSL protocols for 2026 global standards.</p>
          </div>
        } />
      )}
      {activeModal === 'contact' && <Modal title="Direct Terminal" content={<p className="text-center py-6 text-xl">Operational Inquiries:<br/><span className="text-cyan-400 font-black">sameaminn@proton.me</span></p>} />}
      {activeModal === 'about' && <Modal title="Cyberha Mission" content="Cyberha is a 2026 global intelligence hub designed to bridge the gap between global cyber agencies and security enthusiasts through real-time monitoring." />}

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 35s linear infinite; }
      `}</style>
    </div>
  );
}