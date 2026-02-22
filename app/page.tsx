"use client";
import { useEffect, useState } from "react";

export default function CyberhaIntelligenceHub() {
  const [news, setNews] = useState<any[]>([]);
  const [filteredNews, setFilteredNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // 🌍 المصادر العالمية الموثوقة
  const FEEDS = [
    "https://www.bleepingcomputer.com/feed/",
    "https://thehackernews.com/rss",
    "https://www.darkreading.com/rss.xml",
    "https://threatpost.com/feed/",
    "https://www.securityweek.com/rss"
  ];

  useEffect(() => {
    async function fetchAllData() {
      try {
        setLoading(true);
        const responses = await Promise.all(FEEDS.map(url => 
          fetch(`https://api.rss2json.com/v1/api.json?rss_url=${url}`).then(res => res.json())
        ));
        
        let combined = responses.flatMap(data => {
            // إضافة اسم المصدر لكل خبر لضمان المصداقية
            const sourceName = data.feed.title.split(' - ')[0]; 
            return (data.items || []).map((item: any) => ({ ...item, source: sourceName }));
        });

        combined.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
        setNews(combined);
        setFilteredNews(combined.slice(0, 24));
      } catch (err) {
        console.error("Critical Intelligence Link Failure");
      } finally {
        setLoading(false);
      }
    }
    fetchAllData();
  }, []);

  // محرك البحث الفوري
  useEffect(() => {
    const results = news.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNews(results.slice(0, 24));
  }, [searchTerm, news]);

  const Modal = ({ title, content }: { title: string, content: string }) => (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[100] p-6 flex items-center justify-center" onClick={() => setActiveModal(null)}>
      <div className="bg-[#0a0a0a] border border-cyan-500/20 max-w-2xl w-full p-10 rounded-3xl relative shadow-2xl" onClick={e => e.stopPropagation()}>
        <button onClick={() => setActiveModal(null)} className="absolute top-6 left-6 text-cyan-500 font-bold">إغلاق ×</button>
        <h2 className="text-3xl font-black mb-6 text-white border-b border-cyan-500/10 pb-4">{title}</h2>
        <div className="text-slate-400 leading-relaxed text-sm whitespace-pre-wrap">{content}</div>
      </div>
    </div>
  );

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center font-mono text-cyan-500 animate-pulse">
      [إقامة اتصال مشفر مع وكالات الأنباء العالمية...]
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020202] text-slate-200 shadow-inner selection:bg-cyan-500 selection:text-black" dir="rtl">
      
      {/* 🔴 شريط التنبيهات الأحمر (أخبار حقيقية مباشرة من المصادر) */}
      <div className="bg-red-600/10 border-b border-red-600/30 py-2.5 overflow-hidden sticky top-0 z-[70] backdrop-blur-md">
        <div className="flex animate-marquee whitespace-nowrap">
          {news.slice(0, 5).map((item, i) => (
            <span key={i} className="text-red-500 font-bold text-[11px] uppercase px-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping"></span>
              عاجل من {item.source}: {item.title} 
            </span>
          ))}
        </div>
      </div>

      {activeModal === 'privacy' && <Modal title="سياسة الخصوصية" content="خصوصيتك هي أولويتنا. نحن في سيبرها لا نقوم بجمع أي بيانات تعريفية عن الزوار. يتم جلب المحتوى من مصادر عامة موثوقة لغرض التوعية الأمنية فقط." />}
      {activeModal === 'about' && <Modal title="من نحن" content="سيبرها هي منصة استخبارات تقنية تهدف لتقريب المسافة بين وكالات الأمن السيبراني العالمية والجمهور العربي، عبر رصد حي ومباشر لأهم الثغرات والتهديدات." />}
      {activeModal === 'contact' && <Modal title="اتصل بنا" content="للدعم الفني أو الاستفسارات: contact@cyberha.live" />}

      <nav className="p-6 bg-black/40 border-b border-white/5 sticky top-[37px] z-50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-3xl font-black text-white tracking-tighter" onClick={() => setSelectedPost(null)}>
              سيبرها<span className="text-cyan-500">.INTEL</span>
            </h1>
            <span className="text-[8px] font-mono text-cyan-800 tracking-[0.3em] uppercase">Global Threat Intelligence</span>
          </div>

          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="ابحث في قاعدة بيانات الثغرات..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-6 focus:border-cyan-500 outline-none transition-all text-sm font-light"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-16 px-6">
        {!selectedPost ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredNews.map((item, i) => (
              <article key={i} onClick={() => setSelectedPost(item)} className="group bg-[#080808] border border-white/5 rounded-[2rem] overflow-hidden hover:border-cyan-500/30 transition-all duration-500 cursor-pointer shadow-2xl flex flex-col h-full">
                <div className="relative h-52 overflow-hidden">
                   <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[9px] text-cyan-400 border border-white/5 z-10 font-mono">
                      SOURCE: {item.source}
                   </div>
                   <img src={item.thumbnail || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"} className="h-full w-full object-cover group-hover:scale-110 transition duration-1000 opacity-80 group-hover:opacity-100" />
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold group-hover:text-cyan-400 transition-colors leading-tight mb-4">{item.title}</h3>
                  <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center">
                     <span className="text-[10px] text-slate-600 font-mono">{new Date(item.pubDate).toLocaleDateString()}</span>
                     <span className="text-cyan-600 text-[10px] font-black uppercase tracking-widest">تحليل التقرير</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <button onClick={() => setSelectedPost(null)} className="mb-12 text-cyan-500 font-bold hover:tracking-widest transition-all">← العودة للاستخبارات العالمية</button>
            <img src={selectedPost.thumbnail} className="w-full rounded-[3rem] mb-12 shadow-2xl border border-white/10" />
            <h1 className="text-4xl md:text-6xl font-black mb-10 leading-[1.1] text-white tracking-tighter">{selectedPost.title}</h1>
            <div className="prose prose-invert max-w-none text-slate-300 leading-[2] text-xl font-light italic bg-white/5 p-8 rounded-3xl border border-white/5">
              <div dangerouslySetInnerHTML={{ __html: selectedPost.content || selectedPost.description }} />
            </div>
            <div className="mt-16 text-center">
               <a href={selectedPost.link} target="_blank" className="bg-white text-black px-12 py-5 rounded-full font-black hover:bg-cyan-500 hover:text-white transition-all transform hover:scale-105 shadow-2xl inline-block">تصفح المصدر: {selectedPost.source}</a>
            </div>
          </div>
        )}
      </main>

      <footer className="py-24 border-t border-white/5 bg-black/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-12 mb-12 text-xs font-bold text-slate-500">
            <button onClick={() => setActiveModal('about')} className="hover:text-cyan-500 transition-colors">من نحن</button>
            <button onClick={() => setActiveModal('privacy')} className="hover:text-cyan-500 transition-colors">سياسة الخصوصية</button>
            <button onClick={() => setActiveModal('contact')} className="hover:text-cyan-500 transition-colors">اتصل بنا</button>
          </div>
          <p className="text-[9px] text-slate-800 tracking-[0.6em] uppercase">Cyberha Intelligence Network &copy; 2026</p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}"use client";
import { useEffect, useState } from "react";

export default function CyberhaUltimateSystem() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [generatedPass, setGeneratedPass] = useState("");
  const [targetLink, setTargetLink] = useState("");

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

  const genPass = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*";
    setGeneratedPass(Array.from({length: 18}, () => chars[Math.floor(Math.random()*chars.length)]).join(''));
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0a192f] flex items-center justify-center font-mono text-[#64ffda]">
      <div className="flex flex-col items-center gap-4 animate-pulse">
        <div className="w-12 h-[1px] bg-[#64ffda]"></div>
        <p className="tracking-[0.5em] text-[10px] uppercase italic">Syncing Cyberha System...</p>
      </div>
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
          <h1 className="text-3xl font-light tracking-tighter text-white">
            CYBERHA<span className="font-black text-[#64ffda]">.INTEL</span>
          </h1>
          <div className="h-[1px] w-0 group-hover:w-full bg-[#64ffda] transition-all duration-700"></div>
        </div>
        <div className="text-[9px] font-mono text-slate-500 text-right uppercase tracking-[0.3em]">
           Operational: 2026.V3<br/>Status: <span className="text-green-500 font-bold uppercase">Authorized</span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-10 px-6">
        {!selectedPost ? (
          <>
            {/* 🛡️ THE CYBER ARSENAL */}
            <h2 className="text-center text-[10px] font-black text-slate-600 uppercase tracking-[1.2em] mb-12 italic">Tactical Arsenal</h2>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              <div className="bg-[#112240] border border-white/5 p-10 rounded-[2.5rem] shadow-2xl group hover:border-[#64ffda]/20 transition-all">
                <h3 className="text-[#64ffda] font-bold text-xs uppercase italic mb-6">Password Shield</h3>
                <div className="bg-[#0a192f] p-5 rounded-2xl mb-6 font-mono text-center text-[#64ffda] border border-white/5 min-h-[60px] flex items-center justify-center text-lg">{generatedPass || "••••••••••••••••"}</div>
                <button onClick={genPass} className="w-full bg-[#f8f9fa] hover:bg-[#64ffda] text-[#0a192f] font-black py-4 rounded-xl text-[10px] uppercase tracking-widest transition-all">Generate Key</button>
              </div>

              <div className="bg-[#112240] border border-white/5 p-10 rounded-[2.5rem] shadow-2xl group hover:border-[#64ffda]/20 transition-all">
                <h3 className="text-[#64ffda] font-bold text-xs uppercase italic mb-6">Link Sentinel</h3>
                <input type="text" placeholder="Paste URL to scan..." className="w-full bg-[#0a192f] border border-white/10 p-4 rounded-xl mb-6 text-xs text-white focus:outline-none focus:border-[#64ffda] placeholder:text-slate-700" onChange={(e) => setTargetLink(e.target.value)} />
                <button onClick={() => window.open(`https://www.virustotal.com/gui/search/${encodeURIComponent(targetLink)}`, '_blank')} className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black py-4 rounded-xl text-[10px] uppercase tracking-widest transition-all">Execute Scan</button>
              </div>

              <div className="bg-[#112240] border border-white/5 p-10 rounded-[2.5rem] shadow-2xl group hover:border-[#ff2a2a]/20 transition-all">
                <h3 className="text-[#ff2a2a] font-bold text-xs uppercase italic mb-6">Breach Radar</h3>
                <p className="text-[10px] text-slate-500 mb-8 font-light italic leading-relaxed">Check if your email credentials have been leaked in global database breaches.</p>
                <button onClick={() => window.open('https://haveibeenpwned.com/', '_blank')} className="w-full bg-[#ff2a2a]/10 border border-[#ff2a2a]/20 hover:bg-[#ff2a2a]/20 text-[#ff2a2a] font-black py-4 rounded-xl text-[10px] uppercase tracking-widest transition-all">Scan Identity</button>
              </div>
            </section>

            {/* 📊 REPORTS FEED */}
            <div className="flex items-center gap-6 mb-12"><h2 className="text-2xl font-bold uppercase tracking-tighter italic text-white">Intelligence Reports</h2><div className="h-[1px] flex-grow bg-white/5"></div></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {news.map((item, i) => (
                <article key={i} onClick={() => setSelectedPost(item)} className="group bg-[#112240] border border-white/5 rounded-[3rem] overflow-hidden hover:scale-[1.03] transition-all duration-700 cursor-pointer shadow-2xl">
                  <div className="h-56 relative overflow-hidden bg-[#0a192f]">
                    <img src={item.originalImg} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" alt="Intel" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#112240] via-transparent to-transparent"></div>
                  </div>
                  <div className="p-8">
                    <h3 className="font-bold text-lg mb-6 group-hover:text-[#64ffda] transition-colors leading-snug line-clamp-2 italic text-[#f8f9fa]">{item.title}</h3>
                    <div className="flex justify-between items-center text-[9px] font-black text-slate-600 tracking-widest uppercase"><span>Analyze →</span><span className="italic opacity-30">{new Date(item.pubDate).toLocaleDateString()}</span></div>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-10 duration-1000">
             <button onClick={() => setSelectedPost(null)} className="mb-12 text-[#64ffda] font-black text-[10px] tracking-[0.4em] flex items-center gap-3 hover:gap-6 transition-all uppercase italic"><span>←</span> Dashboard</button>
             <div className="w-full h-[450px] rounded-[3.5rem] overflow-hidden mb-12 border border-white/10 shadow-2xl"><img src={selectedPost.originalImg} className="w-full h-full object-cover" alt="Header" /></div>
             <h1 className="text-5xl md:text-7xl font-black mb-12 tracking-tighter leading-[0.9] italic text-white">{selectedPost.title}</h1>
             <div className="prose prose-invert max-w-none text-slate-300 text-xl leading-relaxed bg-[#112240] p-12 rounded-[3.5rem] border border-white/5 shadow-2xl font-light italic"><div dangerouslySetInnerHTML={{ __html: selectedPost.content || selectedPost.description }} /></div>
             <div className="mt-16 text-center"><a href={selectedPost.link} target="_blank" className="px-16 py-6 bg-[#f8f9fa] text-[#0a192f] rounded-full font-black hover:bg-[#64ffda] transition-all shadow-2xl uppercase text-[10px] tracking-[0.4em] italic">Open Source Dispatch</a></div>
          </div>
        )}
      </main>

      {/* 底部 - FOOTER */}
      <footer className="py-24 border-t border-white/5 bg-black/20 mt-24 text-center">
          <div className="flex justify-center gap-10 mb-10 text-[10px] font-black text-slate-600 uppercase tracking-widest italic">
             <button onClick={() => setActiveModal('about')} className="hover:text-[#64ffda]">The_Mission</button>
             <button onClick={() => setActiveModal('privacy')} className="hover:text-[#64ffda]">Privacy_Policy</button>
             <button onClick={() => setActiveModal('terms')} className="hover:text-[#64ffda]">Terms_of_Use</button>
             <button onClick={() => setActiveModal('contact')} className="hover:text-[#64ffda]">Contact</button>
          </div>
          <p className="text-[9px] text-slate-900 tracking-[1.2em] mb-4 uppercase italic font-black">Cyberha Intel // Infrastructure Node 2026</p>
      </footer>

      {/* ⚖️ MODALS (PRIVACY & TERMS) */}
      {activeModal === 'privacy' && (
        <div className="fixed inset-0 bg-[#0a192f]/98 backdrop-blur-3xl z-[100] flex items-center justify-center p-6" onClick={() => setActiveModal(null)}>
           <div className="bg-[#112240] border border-white/10 max-w-2xl w-full p-12 rounded-[3.5rem] shadow-2xl" onClick={e => e.stopPropagation()}>
              <h2 className="text-2xl font-black text-[#64ffda] uppercase italic mb-8">Privacy Protocol</h2>
              <div className="text-slate-400 text-sm leading-relaxed space-y-4 font-light italic">
                 <p>● We maintain a zero-log infrastructure. Your browsing activity is not monitored or recorded.</p>
                 <p>● This node uses Google AdSense and third-party partners to serve context-aware intelligence via cookies.</p>
              </div>
              <button onClick={() => setActiveModal(null)} className="mt-10 w-full py-4 bg-[#f8f9fa] text-[#0a192f] rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#64ffda] transition-all">Acknowledge</button>
           </div>
        </div>
      )}

      {activeModal === 'terms' && (
        <div className="fixed inset-0 bg-[#0a192f]/98 backdrop-blur-3xl z-[100] flex items-center justify-center p-6" onClick={() => setActiveModal(null)}>
           <div className="bg-[#112240] border border-white/10 max-w-2xl w-full p-12 rounded-[3.5rem] shadow-2xl max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <h2 className="text-2xl font-black text-[#64ffda] uppercase italic mb-8">Terms of Engagement</h2>
              <div className="text-slate-400 text-sm leading-relaxed space-y-6 font-light italic">
                 <p>1. <b>Intel Usage:</b> All content provided on Cyberha.Intel is for educational and informational purposes only.</p>
                 <p>2. <b>No Liability:</b> Cyberha is not responsible for any misuse of the tactical tools or intelligence provided. Use them at your own risk.</p>
                 <p>3. <b>Third-Party:</b> We are not responsible for the content of external links scanned or visited through our Sentinel tools.</p>
                 <p>4. <b>Ethical Conduct:</b> Users are strictly prohibited from using information from this node for illegal offensive cyber operations.</p>
              </div>
              <button onClick={() => setActiveModal(null)} className="mt-10 w-full py-4 bg-[#f8f9fa] text-[#0a192f] rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#64ffda] transition-all">Accept Terms</button>
           </div>
        </div>
      )}

      {activeModal === 'contact' && <div className="fixed inset-0 bg-black/95 flex items-center justify-center p-6 z-[100] text-[#64ffda] italic font-black uppercase tracking-widest" onClick={() => setActiveModal(null)}>sameaminn@proton.me</div>}
      {activeModal === 'about' && <div className="fixed inset-0 bg-black/95 flex items-center justify-center p-6 z-[100] text-white italic max-w-xl mx-auto text-center" onClick={() => setActiveModal(null)}>Cyberha is an intelligence node dedicated to monitoring global threats and providing tactical digital tools for end-users.</div>}

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 45s linear infinite; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  );
} هات الكود النهاي من الاتنين 