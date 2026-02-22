"use client";
import { useEffect, useState } from "react";

export default function CyberhaMysticBlue() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [generatedPass, setGeneratedPass] = useState("");

  useEffect(() => {
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
      } catch (e) { console.error("Signal Lost"); } finally { setLoading(false); }
    }
    fetchIntel();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#0a192f] flex items-center justify-center">
      <div className="animate-pulse text-[#f8f9fa] font-light tracking-[0.5em] text-xs uppercase">Loading Intelligence...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a192f] text-[#f8f9fa] font-sans selection:bg-[#64ffda] selection:text-[#0a192f]" dir="ltr">
      
      {/* 🔵 Mystic Ticker */}
      <div className="bg-[#112240] border-b border-white/5 py-3 overflow-hidden sticky top-0 z-[70] backdrop-blur-xl">
        <div className="flex animate-marquee whitespace-nowrap text-[10px] font-medium text-[#64ffda] tracking-widest uppercase">
          {news.slice(0, 5).map((item, i) => (
            <span key={i} className="px-12 flex items-center gap-3">
              <span className="w-1 h-1 bg-[#64ffda] rounded-full shadow-[0_0_8px_#64ffda]"></span>
              INTEL_UPDATE: {item.title}
            </span>
          ))}
        </div>
      </div>

      <nav className="p-10 flex justify-between items-center max-w-7xl mx-auto">
        <div className="cursor-pointer group" onClick={() => setSelectedPost(null)}>
          <h1 className="text-3xl font-light tracking-tighter text-white">
            CYBERHA<span className="font-black text-[#64ffda]">.INTEL</span>
          </h1>
          <div className="h-[1px] w-0 group-hover:w-full bg-[#64ffda] transition-all duration-500"></div>
        </div>
        <div className="text-[9px] font-mono text-slate-500 tracking-[0.3em] uppercase hidden md:block text-right">
          Security Protocol: Active<br/>Node ID: Mystic_2026
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-10 px-6">
        {!selectedPost ? (
          <>
            {/* 🛡️ The Arsenal - Mystic Edition */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              {[
                { title: "Vault Guard", tool: "Key Gen", val: generatedPass || "••••••••", btn: "Generate", action: () => setGeneratedPass(Math.random().toString(36).slice(-12).toUpperCase()) },
                { title: "Link Pulse", tool: "Scanner", val: "VIRUSTOTAL_READY", btn: "Analyze Link", action: () => window.open('https://www.virustotal.com') },
                { title: "Breach Map", tool: "Leak Check", val: "Pwned_Database", btn: "Check Email", action: () => window.open('https://haveibeenpwned.com') }
              ].map((card, i) => (
                <div key={i} className="bg-[#112240] border border-white/5 p-10 rounded-[2.5rem] shadow-xl hover:border-[#64ffda]/20 transition-all duration-500">
                  <h3 className="text-[#64ffda] text-[10px] font-black uppercase tracking-[0.3em] mb-6">{card.title}</h3>
                  <div className="bg-[#0a192f] p-4 rounded-xl mb-6 text-center font-mono text-sm text-slate-400 border border-white/5 min-h-[50px] flex items-center justify-center">
                    {card.val}
                  </div>
                  <button onClick={card.action} className="w-full py-4 bg-[#f8f9fa] hover:bg-[#64ffda] text-[#0a192f] font-bold rounded-xl text-[10px] uppercase tracking-widest transition-all shadow-lg">
                    {card.btn}
                  </button>
                </div>
              ))}
            </section>

            {/* 📊 Intelligence Feed */}
            <div className="flex items-center gap-6 mb-12">
               <h2 className="text-2xl font-bold tracking-tight text-white italic">Recent Reports</h2>
               <div className="h-[1px] flex-grow bg-white/5"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {news.map((item, i) => (
                <article key={i} onClick={() => setSelectedPost(item)} className="group bg-[#112240] border border-white/5 rounded-[2.5rem] overflow-hidden hover:-translate-y-2 transition-all duration-500 cursor-pointer shadow-2xl">
                  <div className="h-56 relative overflow-hidden bg-[#0a192f]">
                    <img src={item.originalImg} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105" alt="Intel" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#112240] via-transparent to-transparent"></div>
                  </div>
                  <div className="p-8">
                    <h3 className="font-bold text-lg mb-6 leading-snug text-[#f8f9fa] group-hover:text-[#64ffda] transition-colors line-clamp-2">{item.title}</h3>
                    <div className="flex justify-between items-center text-[9px] font-bold text-slate-500 tracking-widest uppercase">
                       <span>Access Report →</span>
                       <span className="opacity-40">{new Date(item.pubDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700">
             <button onClick={() => setSelectedPost(null)} className="mb-12 text-[#64ffda] font-bold text-[10px] tracking-[0.4em] flex items-center gap-2 hover:gap-4 transition-all uppercase">
                <span>←</span> Back to Dashboard
             </button>
             
             <div className="w-full h-[400px] rounded-[3rem] overflow-hidden mb-12 border border-white/5 shadow-2xl">
                <img src={selectedPost.originalImg} className="w-full h-full object-cover shadow-inner" alt="Header" />
             </div>

             <h1 className="text-5xl font-bold mb-10 tracking-tighter leading-tight text-[#f8f9fa]">{selectedPost.title}</h1>
             
             <div className="prose prose-invert max-w-none text-slate-300 text-lg leading-relaxed bg-[#112240] p-12 rounded-[3rem] border border-white/5 font-light">
                <div dangerouslySetInnerHTML={{ __html: selectedPost.content || selectedPost.description }} />
             </div>
             
             <div className="mt-16 text-center">
                <a href={selectedPost.link} target="_blank" className="px-16 py-6 bg-[#f8f9fa] text-[#0a192f] rounded-full font-black hover:bg-[#64ffda] transition-all shadow-2xl uppercase text-[10px] tracking-[0.4em]">Source Intelligence</a>
             </div>
          </div>
        )}
      </main>

      <footer className="py-24 border-t border-white/5 bg-[#0a192f] mt-24 text-center">
          <div className="flex justify-center gap-10 mb-10 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
             <button onClick={() => setActiveModal('about')} className="hover:text-[#64ffda]">About</button>
             <button onClick={() => setActiveModal('privacy')} className="hover:text-[#64ffda]">Privacy</button>
             <button onClick={() => setActiveModal('contact')} className="hover:text-[#64ffda]">Contact</button>
          </div>
          <p className="text-[9px] text-slate-700 tracking-[1em] mb-4 uppercase">Cyberha Intel Hub // 2026</p>
          <div className="text-[10px] text-[#64ffda]/30 font-mono tracking-widest uppercase italic">Secure-Link: sameaminn@proton.me</div>
      </footer>

      {/* 🛡️ Privacy Modal */}
      {activeModal === 'privacy' && (
        <div className="fixed inset-0 bg-[#0a192f]/95 backdrop-blur-3xl z-[100] flex items-center justify-center p-6" onClick={() => setActiveModal(null)}>
           <div className="bg-[#112240] border border-white/10 max-w-2xl w-full p-12 rounded-[3rem] shadow-2xl" onClick={e => e.stopPropagation()}>
              <h2 className="text-2xl font-bold text-[#f8f9fa] uppercase mb-8 tracking-tighter italic">Compliance Protocols</h2>
              <div className="text-slate-400 text-sm leading-relaxed space-y-6 font-light italic">
                 <p>● Zero-Log System: No personal data is captured or retained during terminal sessions.</p>
                 <p>● Monetization: This node uses AdSense protocols for infrastructure maintenance.</p>
              </div>
              <button onClick={() => setActiveModal(null)} className="mt-12 w-full py-4 bg-[#64ffda] text-[#0a192f] rounded-full text-[10px] font-black uppercase tracking-widest transition-all">Acknowledge</button>
           </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 45s linear infinite; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  );
}