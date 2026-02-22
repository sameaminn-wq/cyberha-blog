"use client";
import { useEffect, useState } from "react";

export default function CyberhaMasterTerminal() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [generatedPass, setGeneratedPass] = useState("");
  const [targetLink, setTargetLink] = useState("");

  useEffect(() => {
    async function fetchIntel() {
      try {
        // Fetching from The Hacker News for high-quality tactical images
        const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://thehackernews.com/rss`);
        const data = await res.json();
        
        // Logic to extract original high-res images from the content string
        const processed = data.items.map((item: any) => {
          let imgUrl = item.thumbnail;
          if (!imgUrl || imgUrl.includes("standard")) {
            const match = item.description.match(/<img[^>]+src="([^">]+)"/);
            imgUrl = match ? match[1] : "https://images.unsplash.com/photo-1550751827-4bd374c3f58b";
          }
          return { ...item, originalImg: imgUrl };
        });

        setNews(processed);
      } catch (e) { console.error("Communication Disrupted"); } finally { setLoading(false); }
    }
    fetchIntel();
  }, []);

  const genPass = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*";
    setGeneratedPass(Array.from({length: 18}, () => chars[Math.floor(Math.random()*chars.length)]).join(''));
  };

  if (loading) return (
    <div className="min-h-screen bg-[#05070a] flex items-center justify-center font-mono text-[#00f2ff]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-2 border-[#00f2ff]/10 border-t-[#00f2ff] rounded-full animate-spin"></div>
        <p className="tracking-[0.8em] text-[10px] animate-pulse uppercase italic">Syncing Cyberha Core...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#05070a] text-[#e6edf3] font-sans selection:bg-[#00f2ff] selection:text-black" dir="ltr">
      
      {/* 🔴 CRITICAL THREAT TICKER */}
      <div className="bg-[#ff2a2a]/5 border-b border-[#ff2a2a]/20 py-3 overflow-hidden sticky top-0 z-[70] backdrop-blur-md">
        <div className="flex animate-marquee whitespace-nowrap text-[10px] font-bold text-[#ff2a2a] tracking-widest uppercase">
          {news.slice(0, 6).map((item, i) => (
            <span key={i} className="px-12 flex items-center gap-2 italic">
              <span className="w-1 h-1 bg-[#ff2a2a] rounded-full shadow-[0_0_8px_#ff2a2a]"></span>
              LIVE_INCIDENT: {item.title}
            </span>
          ))}
        </div>
      </div>

      <nav className="p-10 flex justify-between items-center max-w-7xl mx-auto">
        <div className="group cursor-pointer" onClick={() => setSelectedPost(null)}>
          <h1 className="text-3xl font-black tracking-tighter italic">CYBERHA<span className="text-[#00f2ff]">.INTEL</span></h1>
          <div className="h-[2px] w-0 group-hover:w-full bg-[#00f2ff] transition-all duration-700"></div>
        </div>
        <div className="text-[9px] font-mono text-slate-600 text-right uppercase tracking-[0.3em]">
           Level: Administrator<br/>Status: <span className="text-green-500">Encrypted</span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-10 px-6">
        {!selectedPost ? (
          <>
            {/* 🛡️ THE CYBER ARSENAL (Inspired by your design) */}
            <h2 className="text-center text-[10px] font-black text-slate-700 uppercase tracking-[1em] mb-12">The Cyber-Arsenal</h2>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              
              {/* Tool 01: Key Generator */}
              <div className="bg-[#0d1117] border border-white/5 p-10 rounded-[2.5rem] hover:border-[#00f2ff]/30 transition-all group shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[#00f2ff] font-bold text-sm tracking-tight uppercase italic text-shadow-glow">Password Shield</h3>
                  <span className="text-slate-800 font-mono text-xs italic opacity-40">#01</span>
                </div>
                <div className="bg-black/50 p-5 rounded-2xl mb-6 font-mono text-center text-[#00f2ff] border border-white/5 min-h-[60px] flex items-center justify-center tracking-widest text-lg uppercase">
                  {generatedPass || "••••••••••••••••"}
                </div>
                <button onClick={genPass} className="w-full bg-[#00f2ff] hover:bg-white text-black font-black py-4 rounded-2xl text-[10px] uppercase tracking-[0.2em] transition-all duration-500 shadow-xl shadow-[#00f2ff]/10">Execute 18-Char Key</button>
              </div>

              {/* Tool 02: Link Sentinel */}
              <div className="bg-[#0d1117] border border-white/5 p-10 rounded-[2.5rem] hover:border-[#00f2ff]/30 transition-all group shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[#00f2ff] font-bold text-sm tracking-tight uppercase italic">Link Sentinel</h3>
                  <span className="text-slate-800 font-mono text-xs italic opacity-40">#02</span>
                </div>
                <input 
                  type="text" 
                  placeholder="Paste suspicious URL..." 
                  className="w-full bg-black/50 border border-white/10 p-4 rounded-2xl mb-6 text-xs text-white focus:outline-none focus:border-[#00f2ff] placeholder:text-slate-800"
                  onChange={(e) => setTargetLink(e.target.value)}
                />
                <button 
                  onClick={() => window.open(`https://www.virustotal.com/gui/search/${encodeURIComponent(targetLink)}`, '_blank')}
                  className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-[0.2em] transition-all"
                >Scan Tactical Link</button>
              </div>

              {/* Tool 03: Breach Scan */}
              <div className="bg-[#0d1117] border border-white/5 p-10 rounded-[2.5rem] hover:border-[#ff2a2a]/30 transition-all group shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[#ff2a2a] font-bold text-sm tracking-tight uppercase italic">Breach Radar</h3>
                  <span className="text-slate-800 font-mono text-xs italic opacity-40">#03</span>
                </div>
                <p className="text-[10px] text-slate-500 mb-8 font-light italic leading-relaxed">Analyze global databases to check if your identity has been compromised in recent leaks.</p>
                <button 
                  onClick={() => window.open('https://haveibeenpwned.com/', '_blank')}
                  className="w-full bg-[#ff2a2a]/10 border border-[#ff2a2a]/20 hover:bg-[#ff2a2a]/20 text-[#ff2a2a] font-black py-4 rounded-2xl text-[10px] uppercase tracking-[0.2em] transition-all"
                >Execute Leak Scan</button>
              </div>
            </section>

            {/* 📊 TACTICAL INTEL FEED (Original Images) */}
            <div className="flex items-center gap-6 mb-12">
               <h2 className="text-2xl font-black uppercase tracking-tighter italic">Intelligence Reports</h2>
               <div className="h-[1px] flex-grow bg-white/5"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {news.map((item, i) => (
                <>
                  <article key={i} onClick={() => setSelectedPost(item)} className="group bg-[#0d1117] border border-white/5 rounded-[3rem] overflow-hidden hover:scale-[1.03] transition-all duration-700 cursor-pointer shadow-2xl shadow-black/50">
                    <div className="h-48 relative overflow-hidden bg-[#05070a]">
                      {/* Using the actual original image from the source */}
                      <img src={item.originalImg} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" alt="Cyber Intelligence" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] to-transparent"></div>
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/5 px-3 py-1 rounded-full text-[8px] font-black text-[#00f2ff] tracking-widest uppercase">Intel_Verified</div>
                    </div>
                    <div className="p-8">
                      <h3 className="font-bold text-lg mb-6 group-hover:text-[#00f2ff] transition-colors leading-snug line-clamp-2 italic">{item.title}</h3>
                      <div className="flex justify-between items-center text-[9px] font-black text-slate-700 tracking-widest uppercase">
                         <span>Full Analysis →</span>
                         <span className="italic opacity-30">{new Date(item.pubDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </article>

                  {/* AD SLOT 01: In-Feed Ad (After 3rd post) */}
                  {i === 2 && (
                    <div className="md:col-span-3 py-16 bg-white/2 border border-dashed border-white/5 rounded-[3rem] flex flex-col items-center justify-center opacity-30 hover:opacity-100 transition-opacity">
                       <span className="text-slate-800 text-[9px] tracking-[2em] uppercase mb-4 italic font-black">Sponsored_Intelligence</span>
                       <div className="text-[#00f2ff]/40 font-mono text-[9px] uppercase tracking-widest tracking-[0.5em]">[ PASTE_ADSENSE_CODE_HERE ]</div>
                    </div>
                  )}
                </>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-10 duration-1000">
             <button onClick={() => setSelectedPost(null)} className="mb-12 text-[#00f2ff] font-black text-[10px] tracking-[0.4em] flex items-center gap-3 hover:gap-6 transition-all uppercase italic">
                <span>←</span> System Dashboard
             </button>
             
             <div className="w-full h-[450px] rounded-[3.5rem] overflow-hidden mb-12 border border-white/10 shadow-2xl relative">
                <img src={selectedPost.originalImg} className="w-full h-full object-cover" alt="Article Header" />
                <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"></div>
             </div>

             <h1 className="text-5xl md:text-7xl font-black mb-12 tracking-tighter leading-[0.9] italic text-white shadow-glow">{selectedPost.title}</h1>
             
             {/* AD SLOT 02: Top Article Ad */}
             <div className="w-full py-6 bg-cyan-900/5 border border-cyan-500/10 rounded-3xl mb-12 flex items-center justify-center text-[8px] text-cyan-950 font-black tracking-[1.5em] uppercase">
                Tactical_Partner_Broadcast
             </div>

             <div className="prose prose-invert max-w-none text-slate-400 text-xl leading-relaxed bg-[#0d1117] p-12 rounded-[3.5rem] border border-white/5 shadow-2xl font-light italic">
                <div dangerouslySetInnerHTML={{ __html: selectedPost.content || selectedPost.description }} />
             </div>
             
             <div className="mt-16 text-center">
                <a href={selectedPost.link} target="_blank" className="px-16 py-6 bg-white text-black rounded-full font-black hover:bg-[#00f2ff] transition-all shadow-2xl uppercase text-[10px] tracking-[0.4em] italic shadow-[0_0_50px_-10px_rgba(255,255,255,0.3)]">Decrypt Full Intel Node</a>
             </div>
          </div>
        )}
      </main>

      <footer className="py-24 border-t border-white/5 bg-black/40 mt-24 text-center">
          <div className="flex justify-center gap-12 mb-12 text-[10px] font-black text-slate-500 uppercase tracking-widest italic">
             <button onClick={() => setActiveModal('about')} className="hover:text-[#00f2ff] transition-colors">The_Hub</button>
             <button onClick={() => setActiveModal('privacy')} className="hover:text-[#00f2ff] transition-colors">Compliance_2026</button>
             <button onClick={() => setActiveModal('contact')} className="hover:text-[#00f2ff] transition-colors">Terminal_Access</button>
          </div>
          <p className="text-[9px] text-slate-900 tracking-[1.2em] mb-6 uppercase italic font-black">Cyberha Intel // Global Infrastructure</p>
          <div className="text-[8px] font-mono text-[#00f2ff]/20 tracking-widest uppercase">Secure_Comms: sameaminn@proton.me</div>
      </footer>

      {/* 🛡️ 2026 PRIVACY & AD COMPLIANCE MODAL */}
      {activeModal === 'privacy' && (
        <div className="fixed inset-0 bg-black/98 backdrop-blur-3xl z-[100] flex items-center justify-center p-6 animate-in fade-in duration-500">
           <div className="bg-[#0d1117] border border-white/10 max-w-2xl w-full p-12 rounded-[3.5rem] relative shadow-[0_0_100px_rgba(0,0,0,1)]">
              <h2 className="text-2xl font-black text-[#00f2ff] uppercase italic mb-8 tracking-tighter">Operational Privacy Protocol</h2>
              <div className="text-slate-500 text-sm leading-relaxed space-y-6 font-light">
                 <p>● <b>Non-PII Infrastructure:</b> We operate on a zero-identification basis. No biometric or personal data is logged.</p>
                 <p>● <b>Revenue Nodes:</b> This terminal utilizes <b>Google AdSense</b> and strategic partners. These nodes use analytical cookies to serve context-aware intelligence (ads).</p>
                 <p>● <b>Affiliate Disclosure:</b> Certain tactical links are affiliate-based. We receive a commission for referrals to secure cyber-products at no additional cost to the operator.</p>
              </div>
              <button onClick={() => setActiveModal(null)} className="mt-12 w-full py-4 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#00f2ff] hover:text-black transition-all">Close Terminal</button>
           </div>
        </div>
      )}

      {activeModal === 'about' && (
        <div className="fixed inset-0 bg-black/98 backdrop-blur-3xl z-[100] flex items-center justify-center p-6 animate-in fade-in">
           <div className="bg-[#0d1117] border border-white/10 max-w-2xl w-full p-12 rounded-[3.5rem] shadow-2xl">
              <h2 className="text-2xl font-black text-[#00f2ff] uppercase italic mb-8 tracking-tighter">Mission Intel</h2>
              <p className="text-slate-400 text-lg italic font-light leading-relaxed">Cyberha is a 2026 tactical intelligence bridge, designed to synchronize global threat data with end-user protective tools.</p>
              <button onClick={() => setActiveModal(null)} className="mt-12 w-full py-4 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#00f2ff] hover:text-black transition-all">Dismiss Intel</button>
           </div>
        </div>
      )}

      {activeModal === 'contact' && (
        <div className="fixed inset-0 bg-black/98 backdrop-blur-3xl z-[100] flex items-center justify-center p-6 animate-in fade-in">
           <div className="bg-[#0d1117] border border-white/10 max-w-md w-full p-12 rounded-[3.5rem] text-center">
              <h2 className="text-2xl font-black text-[#00f2ff] uppercase italic mb-8 tracking-tighter">Secure Comms</h2>
              <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-4 font-bold italic">Operational Inquiry Channel</p>
              <p className="text-xl text-white font-black tracking-tight mb-10">sameaminn@proton.me</p>
              <button onClick={() => setActiveModal(null)} className="w-full py-4 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#00f2ff] hover:text-black transition-all">Terminate Comms</button>
           </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 45s linear infinite; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .shadow-glow { text-shadow: 0 0 15px rgba(0,242,255,0.4); }
      `}</style>
    </div>
  );
}