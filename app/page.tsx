"use client";
import { useEffect, useState } from "react";

export default function CyberhaIntegratedSystem() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [generatedPass, setGeneratedPass] = useState("");
  const [targetLink, setTargetLink] = useState("");
  const [dailyTip, setDailyTip] = useState("");

  const tips = [
    "Hardware security keys (like YubiKey) are the gold standard for 2FA.",
    "Avoid using public USB ports; they can be used for 'Juice Jacking' attacks.",
    "Always verify the sender's email address manually before clicking any links.",
    "Encrypted DNS (DoH) can help prevent tracking by your Internet Provider.",
    "Keep your OS updated daily. Ransomware often targets unpatched software.",
    "Use a dedicated, non-admin account for your daily computing tasks."
  ];

  useEffect(() => {
    // 💡 Daily Intel Engine: Changes every 24 hours
    const day = Math.floor(Date.now() / 86400000);
    setDailyTip(tips[day % tips.length]);

    async function fetchIntel() {
      try {
        const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://thehackernews.com/rss`);
        const data = await res.json();
        const processed = data.items.map((item: any) => {
          let imgUrl = item.thumbnail;
          if (!imgUrl || imgUrl.includes("standard")) {
            const match = item.description.match(/<img[^>]+src="([^">]+)"/);
            imgUrl = match ? match[1] : "https://images.unsplash.com/photo-1550751827-4bd374c3f58b";
          }
          return { ...item, originalImg: imgUrl };
        });
        setNews(processed);
      } catch (e) { console.error("Neural Link Failure"); } finally { setLoading(false); }
    }
    fetchIntel();
  }, []);

  const genPass = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*";
    setGeneratedPass(Array.from({length: 20}, () => chars[Math.floor(Math.random()*chars.length)]).join(''));
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0a192f] flex flex-col items-center justify-center font-mono text-[#64ffda]">
      <div className="w-16 h-[1px] bg-[#64ffda]/20 relative overflow-hidden mb-4">
        <div className="absolute inset-0 bg-[#64ffda] animate-progress"></div>
      </div>
      <p className="text-[10px] tracking-[0.8em] animate-pulse uppercase">Syncing_Cyberha_Systems</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a192f] text-[#f8f9fa] font-sans selection:bg-[#64ffda] selection:text-[#0a192f]" dir="ltr">
      
      {/* 🔴 LIVE THREAT TICKER */}
      <div className="bg-[#ff2a2a]/10 border-b border-[#ff2a2a]/20 py-3 overflow-hidden sticky top-0 z-[70] backdrop-blur-md">
        <div className="flex animate-marquee whitespace-nowrap text-[10px] font-black text-[#ff2a2a] tracking-widest uppercase italic">
          {news.slice(0, 8).map((item, i) => (
            <span key={i} className="px-12 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#ff2a2a] rounded-full shadow-[0_0_8px_#ff2a2a]"></span>
              CRITICAL_INTEL: {item.title}
            </span>
          ))}
        </div>
      </div>

      <nav className="p-10 flex justify-between items-center max-w-7xl mx-auto">
        <div className="group cursor-pointer" onClick={() => setSelectedPost(null)}>
          <h1 className="text-3xl font-light tracking-tighter text-white uppercase">
            CYBERHA<span className="font-black text-[#64ffda]">.INTEL</span>
          </h1>
          <div className="h-[1px] w-0 group-hover:w-full bg-[#64ffda] transition-all duration-700"></div>
        </div>
        <div className="text-[9px] font-mono text-slate-500 text-right uppercase tracking-[0.3em] hidden md:block">
           NODE: 2026_ULTIMATE<br/>STATUS: <span className="text-green-500 font-bold">ENCRYPTED</span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-10 px-6">
        {!selectedPost ? (
          <>
            {/* 🗺️ STRATEGIC RADAR SECTION */}
            <section className="mb-24">
               <div className="text-center mb-8 text-slate-800 text-[8px] tracking-[1em] uppercase border-y border-white/5 py-4">
                  [ ADVERTISING_SPACE_TOP // GLOBAL_PARTNERS ]
               </div>

               <div className="bg-[#112240] border border-white/5 p-16 rounded-[3.5rem] text-center shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#64ffda]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  <h2 className="text-6xl font-black mb-6 tracking-tighter italic opacity-90 leading-none">THREAT_RADAR</h2>
                  <p className="text-slate-400 mb-10 max-w-lg mx-auto text-sm font-light leading-relaxed tracking-tight">
                    Live visual intelligence of global offensive maneuvers. Access the digital theater map.
                  </p>
                  <a href="https://cybermap.kaspersky.com/" target="_blank" className="px-12 py-5 bg-[#64ffda] hover:bg-white text-[#0a192f] font-black rounded-full transition-all duration-500 shadow-[0_0_30px_-5px_rgba(100,255,218,0.4)] uppercase text-[10px] tracking-[0.3em]">
                    Launch Visualizer
                  </a>
               </div>
            </section>

            {/* 🛡️ THE ARSENAL & DAILY INTEL */}
            <h2 className="text-center text-[10px] font-black text-slate-600 uppercase tracking-[1.2em] mb-12 italic">Tactical Assets</h2>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              {/* Password Generator */}
              <div className="bg-[#112240] border border-white/5 p-10 rounded-[2.5rem] shadow-xl group hover:border-[#64ffda]/20 transition-all">
                <h3 className="text-[#64ffda] font-bold text-xs uppercase italic mb-6">Key Generator</h3>
                <div className="bg-[#0a192f] p-5 rounded-2xl mb-6 font-mono text-center text-[#64ffda] border border-white/5 min-h-[60px] flex items-center justify-center text-lg break-all">
                  {generatedPass || "••••••••••••••••"}
                </div>
                <button onClick={genPass} className="w-full bg-[#f8f9fa] hover:bg-[#64ffda] text-[#0a192f] font-black py-4 rounded-xl text-[10px] uppercase tracking-widest transition-all">Execute Gen</button>
              </div>

              {/* Daily Intel Tip */}
              <div className="bg-[#112240] border border-white/5 p-10 rounded-[2.5rem] shadow-xl flex flex-col justify-center relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#ff2a2a]/5 blur-3xl rounded-full"></div>
                <h3 className="text-[#ff2a2a] font-bold text-xs uppercase italic mb-6">Daily Intelligence</h3>
                <p className="text-xl text-slate-200 font-light italic leading-tight">"{dailyTip}"</p>
                <div className="mt-8 h-[1px] w-12 bg-[#ff2a2a]/40"></div>
              </div>

              {/* Link Sentinel */}
              <div className="bg-[#112240] border border-white/5 p-10 rounded-[2.5rem] shadow-xl group hover:border-[#64ffda]/20 transition-all">
                <h3 className="text-[#64ffda] font-bold text-xs uppercase italic mb-6">Link Sentinel</h3>
                <input type="text" placeholder="URL Scan..." className="w-full bg-[#0a192f] border border-white/10 p-4 rounded-xl mb-6 text-xs text-white focus:outline-none focus:border-[#64ffda] placeholder:text-slate-700" onChange={(e) => setTargetLink(e.target.value)} />
                <button onClick={() => window.open(`https://www.virustotal.com/gui/search/${encodeURIComponent(targetLink)}`, '_blank')} className="w-full bg-white/5 border border-white/10 text-white font-black py-4 rounded-xl text-[10px] uppercase tracking-widest transition-all">Execute Scan</button>
              </div>
            </section>

            {/* 📊 REPORTS FEED WITH ADS */}
            <div className="flex items-center gap-6 mb-12">
               <h2 className="text-2xl font-bold uppercase tracking-tighter italic text-white">Recent Reports</h2>
               <div className="h-[1px] flex-grow bg-white/5"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {news.map((item, i) => (
                <>
                  <article key={i} onClick={() => setSelectedPost(item)} className="group bg-[#112240] border border-white/5 rounded-[3rem] overflow-hidden hover:scale-[1.03] transition-all duration-700 cursor-pointer shadow-2xl">
                    <div className="h-56 relative overflow-hidden bg-[#0a192f]">
                      <img src={item.originalImg} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" alt="Intel" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#112240] via-transparent to-transparent"></div>
                    </div>
                    <div className="p-8">
                      <h3 className="font-bold text-lg mb-6 group-hover:text-[#64ffda] transition-colors leading-snug line-clamp-2 italic text-[#f8f9fa]">{item.title}</h3>
                      <div className="flex justify-between items-center text-[9px] font-black text-slate-600 tracking-widest uppercase">
                        <span>Analyze Report →</span>
                        <span className="italic opacity-30">{new Date(item.pubDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </article>

                  {/* 💰 In-Grid Ad Slot (After 3rd Article) */}
                  {i === 2 && (
                    <div className="md:col-span-3 py-16 bg-white/5 border border-dashed border-white/10 rounded-[3.5rem] flex flex-col items-center justify-center space-y-4">
                       <span className="text-slate-800 text-[9px] tracking-[1.5em] uppercase">Tactical_Sponsor_Segment</span>
                       <div className="text-slate-600 font-mono text-xs italic">[ AD_UNIT_PLACEMENT_02 ]</div>
                    </div>
                  )}
                </>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-10 duration-1000">
             <button onClick={() => setSelectedPost(null)} className="mb-12 text-[#64ffda] font-black text-[10px] tracking-[0.4em] flex items-center gap-3 hover:gap-6 transition-all uppercase italic">
                <span>←</span> Return to Dashboard
             </button>
             
             {/* 💰 In-Article Ad Slot */}
             <div className="w-full h-24 bg-white/5 mb-12 border border-white/5 rounded-3xl flex items-center justify-center text-[8px] text-slate-700 tracking-[1em] uppercase">
                Broadcasting_Partner_Intel
             </div>

             <div className="w-full h-[450px] rounded-[3.5rem] overflow-hidden mb-12 border border-white/10 shadow-2xl">
                <img src={selectedPost.originalImg} className="w-full h-full object-cover" alt="Header" />
             </div>

             <h1 className="text-5xl md:text-7xl font-black mb-12 tracking-tighter leading-[0.9] italic text-white">{selectedPost.title}</h1>
             
             <div className="prose prose-invert max-w-none text-slate-300 text-xl leading-relaxed bg-[#112240] p-12 rounded-[3.5rem] border border-white/5 shadow-2xl font-light italic">
                <div dangerouslySetInnerHTML={{ __html: selectedPost.content || selectedPost.description }} />
             </div>
             
             {/* 🎯 Affiliate / Call to Action */}
             <div className="mt-16 p-12 bg-gradient-to-br from-[#64ffda]/5 to-transparent border border-[#64ffda]/20 rounded-[3.5rem] text-center">
                <h4 className="text-[10px] font-black text-[#64ffda] uppercase tracking-[0.4em] mb-4">Tactical Recommendation</h4>
                <p className="text-lg text-slate-300 font-light mb-8 italic">Protect your digital footprint with professional-grade encryption.</p>
                <a href="mailto:sameaminn@proton.me" className="px-12 py-5 bg-[#f8f9fa] text-[#0a192f] rounded-full font-black hover:bg-[#64ffda] transition-all uppercase text-[10px] tracking-[0.4em]">Explore Security Solutions</a>
             </div>
          </div>
        )}
      </main>

      <footer className="py-24 border-t border-white/5 bg-black/20 mt-24 text-center">
          <div className="flex justify-center flex-wrap gap-10 mb-12 text-[10px] font-black text-slate-600 uppercase tracking-widest italic">
             <button onClick={() => setActiveModal('about')} className="hover:text-[#64ffda]">The_Mission</button>
             <button onClick={() => setActiveModal('privacy')} className="hover:text-[#64ffda]">Privacy_Policy</button>
             <button onClick={() => setActiveModal('terms')} className="hover:text-[#64ffda]">Terms_of_Use</button>
             <button onClick={() => setActiveModal('contact')} className="hover:text-[#64ffda]">Contact</button>
          </div>
          <p className="text-[9px] text-slate-800 tracking-[1.2em] mb-4 uppercase italic font-black">Cyberha Intel // Infrastructure Node 2026</p>
          <div className="text-[10px] text-[#64ffda]/30 font-mono tracking-widest uppercase italic">sameaminn@proton.me</div>
      </footer>

      {/* ⚖️ MODALS (Unified Design) */}
      {activeModal && (
        <div className="fixed inset-0 bg-[#0a192f]/98 backdrop-blur-3xl z-[100] flex items-center justify-center p-6" onClick={() => setActiveModal(null)}>
           <div className="bg-[#112240] border border-white/10 max-w-2xl w-full p-12 rounded-[3.5rem] shadow-2xl overflow-y-auto max-h-[85vh]" onClick={e => e.stopPropagation()}>
              <h2 className="text-2xl font-black text-[#64ffda] uppercase italic mb-8 tracking-tighter">
                {activeModal === 'privacy' ? 'Privacy Protocol' : activeModal === 'terms' ? 'Terms of Engagement' : 'Strategic Intel'}
              </h2>
              <div className="text-slate-400 text-sm leading-relaxed space-y-6 font-light italic">
                {activeModal === 'privacy' && (
                  <>
                    <p>● <b>Zero-Knowledge:</b> We maintain a zero-log infrastructure. Your browsing activity is not recorded.</p>
                    <p>● <b>Monetization:</b> This node uses Google AdSense. Cookies are used for context-aware intelligence broadcasting.</p>
                  </>
                )}
                {activeModal === 'terms' && (
                  <>
                    <p>1. <b>Educational Use:</b> All intelligence is for educational and defensive purposes only.</p>
                    <p>2. <b>Liability:</b> Cyberha is not responsible for any misuse of provided tactical tools.</p>
                    <p>3. <b>Conduct:</b> Offensive cyber operations using our intel are strictly prohibited.</p>
                  </>
                )}
                {activeModal === 'about' && <p>Cyberha is a 2026 intelligence node dedicated to monitoring global threats and providing tactical digital tools for end-users.</p>}
                {activeModal === 'contact' && <p className="text-xl text-white font-black text-center uppercase tracking-widest">sameaminn@proton.me</p>}
              </div>
              <button onClick={() => setActiveModal(null)} className="mt-10 w-full py-4 bg-[#f8f9fa] text-[#0a192f] rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#64ffda] transition-all">Acknowledge_Session</button>
           </div>
        </div>
      )}

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