"use client";
import { useEffect, useState } from "react";

export default function CyberhaGlobalIntel() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [generatedPass, setGeneratedPass] = useState("");
  const [dailyTip, setDailyTip] = useState("");

  // Daily Cyber-Awareness Tips (Cycle through 365 days)
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
    // Dynamic Tip Selection based on the day of the year
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    setDailyTip(tips[day % tips.length]);

    async function fetchIntel() {
      try {
        const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://www.bleepingcomputer.com/feed/`);
        const data = await res.json();
        setNews(data.items.slice(0, 12));
      } catch (e) {
        console.error("Link to Intelligence Feed Severed.");
      } finally {
        setLoading(false);
      }
    }
    fetchIntel();
  }, []);

  const genPass = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    setGeneratedPass(Array.from({length: 18}, () => chars[Math.floor(Math.random()*chars.length)]).join(''));
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono text-cyan-500">
      <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="animate-pulse tracking-widest text-xs uppercase">Establishing Secure Feed...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020202] text-slate-200 font-sans selection:bg-cyan-500 selection:text-black" dir="ltr">
      
      {/* 🔴 LIVE NEWS TICKER */}
      <div className="bg-red-600/10 border-b border-red-600/30 py-2.5 overflow-hidden sticky top-0 z-[70] backdrop-blur-md">
        <div className="flex animate-marquee whitespace-nowrap text-[10px] font-bold text-red-500 uppercase tracking-tighter">
          {news.map((item, i) => (
            <span key={i} className="px-10 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping"></span>
              URGENT: {item.title}
            </span>
          ))}
        </div>
      </div>

      <nav className="p-8 border-b border-white/5 flex justify-between items-center max-w-7xl mx-auto">
        <div>
          <h1 className="text-3xl font-black tracking-tighter cursor-pointer" onClick={() => setSelectedPost(null)}>
            CYBERHA<span className="text-cyan-500">.INTEL</span>
          </h1>
          <p className="text-[7px] font-mono text-cyan-900 tracking-[0.5em] uppercase">Global Threat Monitoring Active</p>
        </div>
        <div className="hidden md:flex flex-col items-end font-mono text-[9px] text-slate-600 uppercase">
           <span>Protocol: TLS 1.3</span>
           <span className="text-green-600">Status: Encrypted</span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-16 px-6">
        {!selectedPost ? (
          <>
            {/* 🗺️ LIVE THREAT RADAR */}
            <section className="mb-24">
              <div className="bg-gradient-to-br from-cyan-950/20 via-black to-black border border-cyan-500/20 p-16 rounded-[3rem] text-center shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                <h2 className="text-5xl font-black mb-6 tracking-tighter text-white uppercase italic">Live Threat Map</h2>
                <p className="text-slate-400 mb-10 max-w-2xl mx-auto text-sm leading-relaxed">
                  Real-time visualization of global cyberattacks. Due to high-security encryption, the radar is best viewed in a dedicated operational window.
                </p>
                <a href="https://cybermap.kaspersky.com/" target="_blank" className="bg-cyan-600 hover:bg-white hover:text-black text-white px-12 py-5 rounded-full font-black transition-all inline-block shadow-2xl shadow-cyan-900/40 uppercase text-xs tracking-widest">
                  Launch Tactical Radar ←
                </a>
              </div>
            </section>

            {/* 🛡️ INTERACTIVE TOOLS & AWARENESS */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
              {/* Password Tool */}
              <div className="bg-[#080808] border border-white/5 p-12 rounded-[3.5rem] hover:border-cyan-500/30 transition-all shadow-xl">
                <h3 className="text-2xl font-bold mb-6 text-white uppercase tracking-tight">🛡️ Shield Gen</h3>
                <div className="bg-black p-5 rounded-2xl mb-8 font-mono text-cyan-500 text-center border border-white/5 tracking-widest text-lg h-16 flex items-center justify-center break-all">
                  {generatedPass || "••••••••••••••••"}
                </div>
                <button onClick={genPass} className="w-full bg-cyan-600 text-white py-5 rounded-3xl font-black hover:bg-cyan-500 transition-all shadow-lg uppercase text-[10px] tracking-widest">
                  Generate Secure Key
                </button>
              </div>

              {/* Daily Awareness */}
              <div className="bg-red-600/5 border border-red-600/10 p-12 rounded-[3.5rem] flex flex-col justify-center relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-red-600/20 text-6xl font-black italic">!</div>
                <h3 className="text-2xl font-bold mb-6 text-red-500 uppercase tracking-tight italic">💡 Daily Tip</h3>
                <p className="text-xl text-slate-200 font-light leading-relaxed italic animate-in fade-in duration-1000">
                  "{dailyTip}"
                </p>
                <div className="mt-8 text-[8px] font-mono text-slate-700 uppercase tracking-widest">Next Pulse: 24h Remaining</div>
              </div>
            </section>

            {/* INTELLIGENCE FEED */}
            <h2 className="text-3xl font-black mb-12 tracking-tighter uppercase italic text-white/90 border-l-4 border-cyan-500 pl-6">Intelligence Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {news.map((item, i) => (
                <article key={i} onClick={() => setSelectedPost(item)} className="bg-[#080808] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-cyan-500/40 transition-all cursor-pointer group shadow-2xl flex flex-col">
                  <div className="h-48 relative overflow-hidden">
                    <img src={item.thumbnail || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" />
                  </div>
                  <div className="p-8">
                    <h3 className="font-bold text-lg leading-tight group-hover:text-cyan-400 transition-colors mb-4">{item.title}</h3>
                    <p className="text-slate-600 text-[10px] uppercase font-mono tracking-widest group-hover:text-slate-400 transition-colors">Decrypt Full Intel +</p>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700">
             <button onClick={() => setSelectedPost(null)} className="mb-12 text-cyan-500 font-bold hover:tracking-[0.3em] transition-all uppercase text-[10px] flex items-center gap-2">
                <span className="text-lg">←</span> Back to Dashboard
             </button>
             <h1 className="text-4xl md:text-6xl font-black mb-12 leading-[1.05] tracking-tighter">{selectedPost.title}</h1>
             <div className="prose prose-invert max-w-none text-slate-300 text-xl leading-relaxed bg-[#080808] p-12 rounded-[3rem] border border-white/5 shadow-2xl font-light">
                <div dangerouslySetInnerHTML={{ __html: selectedPost.content || selectedPost.description }} />
             </div>
             <div className="mt-16 text-center">
                <a href={selectedPost.link} target="_blank" className="bg-white text-black px-14 py-5 rounded-full font-black hover:bg-cyan-500 hover:text-white transition-all shadow-2xl inline-block uppercase text-[11px] tracking-[0.2em]">Explore Original Source</a>
             </div>
          </div>
        )}
      </main>

      <footer className="py-24 border-t border-white/5 bg-black/50 mt-24 text-center">
          <div className="flex justify-center gap-12 mb-10 text-[10px] font-black text-slate-600 uppercase tracking-widest">
             <button className="hover:text-cyan-500 transition-colors">About Intel</button>
             <button className="hover:text-cyan-500 transition-colors">Privacy Policy</button>
             <button className="hover:text-cyan-500 transition-colors">Contact Terminal</button>
          </div>
          <p className="text-[9px] text-slate-800 tracking-[0.8em] mb-4 uppercase">Cyberha Intelligence Hub &copy; 2026</p>
          <div className="text-[8px] font-mono text-slate-900 tracking-widest uppercase italic">Comms: sameaminn@proton.me</div>
      </footer>

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 40s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
      `}</style>
    </div>
  );
}