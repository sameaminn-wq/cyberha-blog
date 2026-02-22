"use client";
import { useEffect, useState } from "react";

export default function CyberhaUltimateCommand() {
  const [news, setNews] = useState<any[]>([]);
  const [filteredNews, setFilteredNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [generatedPass, setGeneratedPass] = useState("");
  const [targetLink, setTargetLink] = useState("");

  // 📡 مصادر جلب البيانات التقنية العالمية
  const FEEDS = [
    "https://www.bleepingcomputer.com/feed/",
    "https://thehackernews.com/rss",
    "https://www.darkreading.com/rss.xml",
    "https://www.securityweek.com/rss"
  ];

  useEffect(() => {
    async function fetchIntel() {
      try {
        setLoading(true);
        const responses = await Promise.all(FEEDS.map(url => 
          fetch(`https://api.rss2json.com/v1/api.json?rss_url=${url}`).then(res => res.json())
        ));
        
        let combined = responses.flatMap(data => {
            const sourceName = data.feed.title.split(' - ')[0]; 
            return (data.items || []).map((item: any) => {
                let img = item.thumbnail;
                if (!img || img.includes("standard")) {
                    const match = item.description.match(/<img[^>]+src="([^">]+)"/);
                    img = match ? match[1] : "https://images.unsplash.com/photo-1550751827-4bd374c3f58b";
                }
                return { ...item, source: sourceName, originalImg: img };
            });
        });

        combined.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
        setNews(combined);
        setFilteredNews(combined.slice(0, 18));
      } catch (err) {
        console.error("Signal Lost");
      } finally {
        setLoading(false);
      }
    }
    fetchIntel();
  }, []);

  // محرك البحث الفوري
  useEffect(() => {
    const results = news.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNews(results.slice(0, 18));
  }, [searchTerm, news]);

  const genPass = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*";
    setGeneratedPass(Array.from({length: 20}, () => chars[Math.floor(Math.random()*chars.length)]).join(''));
  };

  if (loading) return (
    <div className="min-h-screen bg-[#020202] flex items-center justify-center font-mono text-[#64ffda]">
      <p className="text-[10px] tracking-[0.8em] animate-pulse uppercase italic">Synchronizing_Cyberha_System...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a192f] text-[#f8f9fa] selection:bg-[#64ffda] selection:text-[#0a192f]" dir="ltr">
      
      {/* 🔴 شريط الأنباء العاجلة */}
      <div className="bg-[#ff2a2a]/10 border-b border-[#ff2a2a]/20 py-3 overflow-hidden sticky top-0 z-[70] backdrop-blur-md">
        <div className="flex animate-marquee whitespace-nowrap text-[10px] font-black text-[#ff2a2a] tracking-widest uppercase italic">
          {news.slice(0, 8).map((item, i) => (
            <span key={i} className="px-12 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#ff2a2a] rounded-full"></span>
              LIVE_INTEL FROM {item.source}: {item.title}
            </span>
          ))}
        </div>
      </div>

      <nav className="p-10 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-8">
        <div className="cursor-pointer" onClick={() => setSelectedPost(null)}>
          <h1 className="text-4xl font-light tracking-tighter text-white">
            CYBERHA<span className="font-black text-[#64ffda]">.INTEL</span>
          </h1>
          <div className="text-[9px] font-mono text-slate-500 tracking-[0.4em] uppercase">Tactical Intelligence Node</div>
        </div>

        <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="Search Intelligence Base..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-8 focus:border-[#64ffda] outline-none transition-all text-xs font-mono"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-10 px-6">
        {!selectedPost ? (
          <>
            {/* 🛡️ قسم الترسانة (Arsenal Section) */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              <div className="bg-[#112240] border border-white/5 p-10 rounded-[2.5rem] shadow-2xl transition-all hover:border-[#64ffda]/20">
                <h3 className="text-[#64ffda] font-bold text-xs uppercase italic mb-6">Key Generator</h3>
                <div className="bg-[#0a192f] p-5 rounded-2xl mb-6 font-mono text-center text-[#64ffda] border border-white/5 break-all">
                  {generatedPass || "••••••••••••"}
                </div>
                <button onClick={genPass} className="w-full bg-[#f8f9fa] hover:bg-[#64ffda] text-[#0a192f] font-black py-4 rounded-xl text-[10px] uppercase tracking-widest transition-all">Generate_Key</button>
              </div>

              <div className="bg-[#112240] border border-white/5 p-10 rounded-[2.5rem] shadow-2xl transition-all hover:border-[#64ffda]/20">
                <h3 className="text-[#64ffda] font-bold text-xs uppercase italic mb-6">Link Sentinel</h3>
                <input type="text" placeholder="URL Target..." className="w-full bg-[#0a192f] border border-white/10 p-4 rounded-xl mb-6 text-xs text-white focus:outline-none focus:border-[#64ffda]" onChange={(e) => setTargetLink(e.target.value)} />
                <button onClick={() => window.open(`https://www.virustotal.com/gui/search/${encodeURIComponent(targetLink)}`, '_blank')} className="w-full bg-white/5 border border-white/10 text-white font-black py-4 rounded-xl text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">Scan_Deep</button>
              </div>

              <div className="bg-[#112240] border border-white/5 p-10 rounded-[2.5rem] shadow-2xl flex flex-col justify-center border-l-[#ff2a2a] border-l-2">
                <h3 className="text-[#ff2a2a] font-black text-[10px] uppercase tracking-widest mb-4">Daily Threat Advisory</h3>
                <p className="text-lg text-slate-200 font-light italic leading-tight">"Ransomware actors are increasingly exploiting unpatched VPN endpoints. Audit your network perimeters."</p>
              </div>
            </section>

            {/* 📊 خلاصة التقارير (Reports Grid) */}
            <div className="flex items-center gap-6 mb-12">
               <h2 className="text-2xl font-bold uppercase tracking-tighter italic text-white">Latest Dispatches</h2>
               <div className="h-[1px] flex-grow bg-white/5"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredNews.map((item, i) => (
                <article key={i} onClick={() => setSelectedPost(item)} className="group bg-[#112240] border border-white/5 rounded-[3rem] overflow-hidden hover:scale-[1.03] transition-all duration-700 cursor-pointer shadow-2xl flex flex-col h-full">
                  <div className="h-52 relative overflow-hidden bg-[#0a192f]">
                    <div className="absolute top-6 left-6 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] text-[#64ffda] border border-white/5 z-10 font-black tracking-widest uppercase">
                       {item.source}
                    </div>
                    <img src={item.originalImg} className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-all duration-1000" alt="Intel" />
                  </div>
                  <div className="p-10 flex-grow flex flex-col">
                    <h3 className="font-bold text-xl mb-8 group-hover:text-[#64ffda] transition-colors leading-tight italic text-[#f8f9fa]">{item.title}</h3>
                    <div className="mt-auto flex justify-between items-center text-[9px] font-black text-slate-600 tracking-widest uppercase">
                      <span>Analyze Report →</span>
                      <span className="opacity-30">{new Date(item.pubDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          /* عرض الخبر الفردي */
          <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-10 duration-1000">
             <button onClick={() => setSelectedPost(null)} className="mb-12 text-[#64ffda] font-black text-[10px] tracking-[0.4em] flex items-center gap-3 hover:gap-6 transition-all uppercase italic"><span>←</span> RETURN TO HUB</button>
             <img src={selectedPost.originalImg} className="w-full rounded-[3.5rem] mb-12 shadow-2xl border border-white/10 h-[450px] object-cover" alt="Header" />
             <h1 className="text-4xl md:text-7xl font-black mb-12 tracking-tighter leading-[0.9] italic text-white uppercase">{selectedPost.title}</h1>
             <div className="prose prose-invert max-w-none text-slate-300 text-xl leading-relaxed bg-[#112240] p-12 rounded-[3.5rem] border border-white/5 font-light italic">
                <div dangerouslySetInnerHTML={{ __html: selectedPost.content || selectedPost.description }} />
             </div>
             <div className="mt-16 text-center">
                <a href={selectedPost.link} target="_blank" className="px-16 py-6 bg-white text-[#0a192f] rounded-full font-black hover:bg-[#64ffda] transition-all shadow-2xl uppercase text-[10px] tracking-[0.4em] italic inline-block">Confirm Source Dispatch</a>
             </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="py-24 border-t border-white/5 bg-black/20 mt-24 text-center">
          <div className="flex justify-center gap-10 mb-10 text-[10px] font-black text-slate-600 uppercase tracking-widest italic">
             <button onClick={() => setActiveModal('about')} className="hover:text-[#64ffda]">The_Mission</button>
             <button onClick={() => setActiveModal('privacy')} className="hover:text-[#64ffda]">Privacy_Protocol</button>
             <button onClick={() => setActiveModal('contact')} className="hover:text-[#64ffda]">Contact</button>
          </div>
          <p className="text-[9px] text-slate-900 tracking-[1.2em] uppercase italic font-black">Cyberha Intel // 2026.V_INTEGRATED</p>
      </footer>

      {/* MODALS */}
      {activeModal && (
        <div className="fixed inset-0 bg-[#0a192f]/98 backdrop-blur-3xl z-[100] flex items-center justify-center p-6" onClick={() => setActiveModal(null)}>
           <div className="bg-[#112240] border border-white/10 max-w-2xl w-full p-12 rounded-[3.5rem] shadow-2xl" onClick={e => e.stopPropagation()}>
              <h2 className="text-2xl font-black text-[#64ffda] uppercase italic mb-8">System_Protocol</h2>
              <div className="text-slate-400 text-sm leading-relaxed space-y-4 font-light italic">
                {activeModal === 'privacy' && <p>● Zero-log infrastructure. Your data is not recorded. Intelligence is shared for educational defense only.</p>}
                {activeModal === 'about' && <p>● Cyberha is an independent intelligence hub for global cyber threat monitoring and tactical toolsets.</p>}
                {activeModal === 'contact' && <p className="text-center text-white font-black py-4 italic">COMM_LINK: sameaminn@proton.me</p>}
              </div>
              <button onClick={() => setActiveModal(null)} className="mt-10 w-full py-4 bg-[#f8f9fa] text-[#0a192f] rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#64ffda] transition-all">Close_Terminal</button>
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