"use client";
import { useEffect, useState } from "react";

export default function CyberhaFinalUnified() {
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
    "Encrypted DNS (DoH) can help prevent tracking by your Internet Provider.",
    "Keep your OS updated daily. Ransomware often targets unpatched software."
  ];

  // 🛰️ نظام جلب التقارير المباشرة (LIVE REPORTS ENGINE)
  useEffect(() => {
    const day = Math.floor(Date.now() / 86400000);
    setDailyTip(tips[day % tips.length]);

    async function fetchLiveReports() {
      try {
        // سحب التقارير من Hacker News مباشرة
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
    fetchLiveReports();
  }, []);

  const genPass = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*";
    setGeneratedPass(Array.from({length: 20}, () => chars[Math.floor(Math.random()*chars.length)]).join(''));
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0a192f] flex flex-col items-center justify-center font-mono text-[#64ffda]">
      <p className="text-[10px] tracking-[0.8em] animate-pulse uppercase">Establishing_Integrated_Node...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a192f] text-[#f8f9fa] font-sans selection:bg-[#64ffda] selection:text-[#0a192f]" dir="ltr">
      
      {/* 🔴 الشريط الأحمر العلوي - لا غنى عنه */}
      <div className="bg-[#ff2a2a]/10 border-b border-[#ff2a2a]/20 py-3 overflow-hidden sticky top-0 z-[70] backdrop-blur-md">
        <div className="flex animate-marquee whitespace-nowrap text-[10px] font-black text-[#ff2a2a] tracking-widest uppercase italic">
          {news.map((item, i) => (
            <span key={i} className="px-12 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#ff2a2a] rounded-full shadow-[0_0_8px_#ff2a2a]"></span>
              LIVE_INTEL: {item.title}
            </span>
          ))}
        </div>
      </div>

      <nav className="p-10 flex justify-between items-center max-w-7xl mx-auto">
        <h1 onClick={() => setSelectedPost(null)} className="text-3xl font-light tracking-tighter text-white cursor-pointer uppercase">
          CYBERHA<span className="font-black text-[#64ffda]">.INTEL</span>
        </h1>
        <div className="text-[9px] font-mono text-slate-500 text-right uppercase tracking-[0.3em]">
           STATUS: <span className="text-green-500 font-bold tracking-normal">SYSTEMS_INTEGRATED</span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-10 px-6">
        {!selectedPost ? (
          <>
            {/* 1. قسم الرادار الاستراتيجي */}
            <section className="mb-20">
               <div className="bg-[#112240] border border-white/5 p-16 rounded-[3.5rem] text-center shadow-2xl relative overflow-hidden">
                  <h2 className="text-5xl font-black mb-4 tracking-tighter italic opacity-90 leading-none text-white">OFFENSIVE_RADAR</h2>
                  <p className="text-slate-400 mb-8 max-w-lg mx-auto text-sm font-light italic">Monitor global cyber attacks in real-time via the tactical map.</p>
                  <a href="https://cybermap.kaspersky.com/" target="_blank" className="px-10 py-4 bg-[#64ffda] text-[#0a192f] font-black rounded-full text-[10px] tracking-widest uppercase hover:bg-white transition-all">Open Radar Map</a>
               </div>
            </section>

            {/* 2. قسم الترسانة والنصيحة اليومية */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              {/* النصيحة اليومية */}
              <div className="bg-[#112240] border border-white/5 p-10 rounded-[2.5rem] flex flex-col justify-center border-l-[#ff2a2a] border-l-2">
                <h3 className="text-[#ff2a2a] font-bold text-xs uppercase italic mb-4">Daily Intel Tip</h3>
                <p className="text-lg text-slate-200 font-light italic leading-tight">"{dailyTip}"</p>
              </div>

              {/* مولد كلمات السر */}
              <div className="bg-[#112240] border border-white/5 p-10 rounded-[2.5rem] text-center">
                <h3 className="text-[#64ffda] font-bold text-xs uppercase italic mb-4 text-left">Key Gen</h3>
                <div className="bg-[#0a192f] p-4 rounded-xl mb-6 font-mono text-[#64ffda] break-all">{generatedPass || "••••••••"}</div>
                <button onClick={genPass} className="w-full bg-[#f8f9fa] py-3 rounded-xl text-[10px] font-black text-[#0a192f] uppercase hover:bg-[#64ffda] transition-all">Execute</button>
              </div>

              {/* فاحص الروابط */}
              <div className="bg-[#112240] border border-white/5 p-10 rounded-[2.5rem]">
                <h3 className="text-[#64ffda] font-bold text-xs uppercase italic mb-4">Link Sentinel</h3>
                <input type="text" placeholder="URL..." className="w-full bg-[#0a192f] p-3 rounded-xl mb-4 text-xs text-white border border-white/10" onChange={(e) => setTargetLink(e.target.value)} />
                <button onClick={() => window.open(`https://www.virustotal.com/gui/search/${encodeURIComponent(targetLink)}`, '_blank')} className="w-full bg-white/5 py-3 rounded-xl text-[10px] font-black text-white uppercase border border-white/10 hover:bg-white/10 transition-all">Scan</button>
              </div>
            </section>

            {/* 3. قسم التقارير المباشرة (LIVE REPORTS) - تم الدمج هنا */}
            <div className="flex items-center gap-6 mb-12">
               <h2 className="text-2xl font-bold uppercase tracking-tighter italic text-white">Live Intelligence Reports</h2>
               <div className="h-[1px] flex-grow bg-white/5"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {news.map((item, i) => (
                <article key={i} onClick={() => setSelectedPost(item)} className="group bg-[#112240] border border-white/5 rounded-[3rem] overflow-hidden hover:scale-[1.03] transition-all cursor-pointer shadow-2xl">
                  <div className="h-48 relative overflow-hidden bg-[#0a192f]">
                    <img src={item.originalImg} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-700" alt="Intel" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#112240] to-transparent"></div>
                  </div>
                  <div className="p-8">
                    <h3 className="font-bold text-lg mb-6 group-hover:text-[#64ffda] transition-colors leading-snug line-clamp-2 italic text-[#f8f9fa]">{item.title}</h3>
                    <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Analyze Report →</div>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          /* تفاصيل التقرير عند الضغط عليه */
          <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-10 duration-700">
             <button onClick={() => setSelectedPost(null)} className="mb-8 text-[#64ffda] font-black text-[10px] tracking-widest uppercase italic">← Return to Command</button>
             <div className="w-full h-[400px] rounded-[3rem] overflow-hidden mb-10 border border-white/10 shadow-2xl">
                <img src={selectedPost.originalImg} className="w-full h-full object-cover" alt="Header" />
             </div>
             <h1 className="text-4xl md:text-6xl font-black mb-10 tracking-tighter italic text-white leading-none">{selectedPost.title}</h1>
             <div className="prose prose-invert max-w-none text-slate-300 text-xl leading-relaxed bg-[#112240] p-10 rounded-[3rem] border border-white/5 italic">
                <div dangerouslySetInnerHTML={{ __html: selectedPost.content || selectedPost.description }} />
             </div>
          </div>
        )}
      </main>

      <footer className="py-20 border-t border-white/5 bg-black/20 mt-20 text-center">
          <div className="flex justify-center gap-10 mb-8 text-[10px] font-black text-slate-600 uppercase tracking-widest italic">
             <button onClick={() => setActiveModal('privacy')} className="hover:text-[#64ffda]">Privacy_Policy</button>
             <button onClick={() => setActiveModal('terms')} className="hover:text-[#64ffda]">Terms_of_Use</button>
             <button onClick={() => setActiveModal('contact')} className="hover:text-[#64ffda]">Contact</button>
          </div>
          <p className="text-[9px] text-slate-900 tracking-[1.2em] uppercase italic font-black">Cyberha Intel // Infrastructure 2026</p>
      </footer>

      {/* مودال السياسات والشروط */}
      {activeModal && (
        <div className="fixed inset-0 bg-[#0a192f]/98 backdrop-blur-3xl z-[100] flex items-center justify-center p-6" onClick={() => setActiveModal(null)}>
           <div className="bg-[#112240] border border-white/10 max-w-xl w-full p-12 rounded-[3.5rem] shadow-2xl" onClick={e => e.stopPropagation()}>
              <h2 className="text-xl font-black text-[#64ffda] uppercase italic mb-6">System Protocol</h2>
              <div className="text-slate-400 text-sm leading-relaxed space-y-4 italic font-light">
                {activeModal === 'privacy' && <p>Zero-log policy. Adsense cookies used for intelligence broadcasting.</p>}
                {activeModal === 'terms' && <p>All tactical data is for educational defense purposes only. Use at your own risk.</p>}
                {activeModal === 'contact' && <p className="text-center font-black text-white">sameaminn@proton.me</p>}
              </div>
              <button onClick={() => setActiveModal(null)} className="mt-8 w-full py-3 bg-[#f8f9fa] text-[#0a192f] rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#64ffda] transition-all">Close_Terminal</button>
           </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 50s linear infinite; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  );
}