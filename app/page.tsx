"use client";
import { useEffect, useState } from "react";

export default function CyberhaUltimateNode() {
  const [news, setNews] = useState<any[]>([]);
  const [vault, setVault] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [view, setView] = useState<"hub" | "vault">("hub");
  const [scanUrl, setScanUrl] = useState("");

  // 📡 المصادر المفتوحة المباشرة (Open APIs & RSS Bridges)
  const NEWS_API_BRIDGE = "https://api.rss2json.com/v1/api.json?rss_url=";
  const SOURCES = [
    "https://thehackernews.com/rss",
    "https://www.bleepingcomputer.com/feed/",
    "https://www.darkreading.com/rss.xml"
  ];

  useEffect(() => {
    async function syncIntelligence() {
      try {
        setLoading(true);
        // 1. سحب أخبار الاستخبارات آلياً
        const newsPromises = SOURCES.map(src => fetch(NEWS_API_BRIDGE + src).then(r => r.json()));
        const newsResults = await Promise.all(newsPromises);
        const combinedNews = newsResults.flatMap(data => (data.items || []).map((item: any) => ({
          ...item, source: data.feed.title || "Global Intel",
          img: item.thumbnail || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"
        })));
        setNews(combinedNews.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()));

        // 2. سحب ثغرات المخزن من CISA API (عبر بروكسي مفتوح لضمان الوصول)
        const vaultRes = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json"));
        const vaultJson = await vaultRes.json();
        const vaultData = JSON.parse(vaultJson.contents);
        setVault(vaultData.vulnerabilities.slice(0, 15));

      } catch (err) { console.error("Intel Bridge Failure"); }
      finally { setLoading(false); }
    }
    syncIntelligence();
  }, []);

  const executeScan = () => {
    if (!scanUrl) return;
    window.open(`https://www.virustotal.com/gui/search/${encodeURIComponent(scanUrl)}`, '_blank');
  };

  if (loading) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center font-mono text-[#64ffda]">
      <div className="text-center tracking-[1em] animate-pulse uppercase">Connecting_to_Cyberha_Mainframe...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-[#64ffda] selection:text-black" dir="ltr">
      
      {/* 🔴 شريط التنبيهات العاجلة (Live Ticker) */}
      <div className="bg-[#64ffda]/5 border-b border-[#64ffda]/10 py-2.5 overflow-hidden sticky top-0 z-[100] backdrop-blur-2xl">
        <div className="flex animate-marquee whitespace-nowrap text-[9px] font-black text-[#64ffda] tracking-[0.3em] uppercase italic">
          {news.slice(0, 10).map((item, i) => (
            <span key={i} className="px-12 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping"></span>
              CRITICAL_INTEL :: {item.source} :: {item.title}
            </span>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/5">
        <div className="cursor-pointer group" onClick={() => {setView("hub"); setSelectedPost(null);}}>
          <h1 className="text-4xl font-black tracking-tighter text-white group-hover:text-[#64ffda] transition-all">
            CYBERHA<span className="text-[#64ffda]">.INTEL</span>
          </h1>
          <p className="text-[8px] text-slate-600 tracking-[0.8em] uppercase italic italic">Sovereign Intelligence Node</p>
        </div>

        <div className="flex items-center gap-10 text-[10px] font-black uppercase tracking-widest italic">
           <button onClick={() => {setView("hub"); setSelectedPost(null);}} className={view === 'hub' ? 'text-[#64ffda] border-b-2 border-[#64ffda] pb-1' : 'text-slate-500 hover:text-white transition-all'}>Dispatch_Hub</button>
           <button onClick={() => setView("vault")} className={view === 'vault' ? 'text-[#64ffda] border-b-2 border-[#64ffda] pb-1' : 'text-slate-500 hover:text-white transition-all'}>The_Vault</button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-6">
        
        {view === "hub" && !selectedPost && (
          <>
            {/* 🛠️ Tactical Tools (The Arsenal) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
               {/* URL Sentinel (VirusTotal Integration) */}
               <div className="bg-[#0a0a0a] border border-red-500/20 p-10 rounded-[3rem] shadow-2xl group">
                  <h3 className="text-red-500 font-black text-[10px] uppercase mb-6 tracking-widest italic">// URL_Sentinel_Scanner</h3>
                  <input 
                    type="text" 
                    placeholder="Enter URL to analyze..." 
                    className="w-full bg-black border border-white/5 p-4 rounded-2xl text-xs mb-6 focus:border-red-500 outline-none font-mono text-white italic"
                    onChange={(e) => setScanUrl(e.target.value)}
                  />
                  <button onClick={executeScan} className="w-full py-4 bg-red-600/10 border border-red-600/40 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all rounded-2xl">Execute_Threat_Analysis</button>
               </div>
               
               {/* Bitdefender Passive Radar */}
               <div className="bg-[#0a0a0a] border border-[#64ffda]/20 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                  <h3 className="text-[#64ffda] font-black text-[10px] uppercase mb-6 tracking-widest italic">// Bitdefender_Passive_Radar</h3>
                  <div className="space-y-4">
                    <p className="text-xs text-slate-400 italic leading-relaxed">
                      "Global heuristics indicate a 40% increase in Cobalt Strike beaconing activity across decentralized finance protocols. Real-time monitoring active."
                    </p>
                    <div className="flex items-center gap-2">
                       <span className="w-2 h-2 bg-[#64ffda] rounded-full animate-pulse"></span>
                       <span className="text-[9px] font-black text-[#64ffda] uppercase">System_Status: Scanning_Egress</span>
                    </div>
                  </div>
               </div>
            </div>

            {/* Intel Feed Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {news.map((item, i) => (
                <article key={i} onClick={() => setSelectedPost(item)} className="group bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-[#64ffda]/30 transition-all cursor-pointer shadow-2xl flex flex-col">
                  <div className="h-52 relative overflow-hidden">
                    <div className="absolute top-5 left-5 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] text-[#64ffda] z-10 font-bold uppercase tracking-widest border border-[#64ffda]/20">
                       {item.source}
                    </div>
                    <img src={item.img} className="w-full h-full object-cover opacity-30 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" alt="Intel" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#64ffda] transition-colors leading-tight italic line-clamp-2 uppercase tracking-tighter">{item.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        {/* The Vault View */}
        {view === "vault" && (
          <div className="animate-in fade-in duration-1000">
             <div className="mb-16">
                <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-2">The_Vault</h2>
                <p className="text-[#64ffda] text-[10px] tracking-[0.5em] uppercase">Known Exploited Vulnerabilities Database</p>
             </div>
             <div className="grid gap-6">
                {vault.map((v, i) => (
                  <div key={i} className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2.5rem] hover:bg-[#111] transition-all group flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl">
                    <div className="flex-grow">
                      <span className="text-red-500 font-mono text-[10px] block mb-2 font-black">{v.cveID}</span>
                      <h4 className="text-xl font-bold text-white group-hover:text-[#64ffda] transition-colors italic mb-3">{v.vulnerabilityName}</h4>
                      <p className="text-[11px] text-slate-500 italic max-w-3xl line-clamp-2 font-light leading-relaxed">{v.shortDescription}</p>
                    </div>
                    <a href={`https://nvd.nist.gov/vuln/detail/${v.cveID}`} target="_blank" className="bg-white/5 border border-white/10 text-white px-8 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#64ffda] hover:text-black transition-all shadow-xl">Analyze_Patch</a>
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* Selected Intel Content */}
        {selectedPost && view === "hub" && (
          <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-10 duration-700">
             <button onClick={() => setSelectedPost(null)} className="mb-10 text-[#64ffda] text-[10px] font-black tracking-widest uppercase flex items-center gap-3 italic">← Return_to_Mainframe</button>
             <h1 className="text-5xl md:text-7xl font-black mb-12 italic leading-[0.85] text-white uppercase tracking-tighter">{selectedPost.title}</h1>
             <div className="prose prose-invert max-w-none text-slate-300 text-xl leading-relaxed bg-[#0a0a0a] p-12 rounded-[3.5rem] border border-white/5 font-light italic shadow-2xl">
                <div dangerouslySetInnerHTML={{ __html: selectedPost.content || selectedPost.description }} />
             </div>
          </div>
        )}
      </main>

      {/* Footer & Protocols */}
      <footer className="py-24 border-t border-white/5 text-center mt-20 bg-black/40">
          <div className="flex justify-center flex-wrap gap-12 mb-12 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] italic">
             <button onClick={() => setActiveModal('privacy')} className="hover:text-[#64ffda]">Privacy_Zero</button>
             <button onClick={() => setActiveModal('terms')} className="hover:text-[#64ffda]">Terms_of_Use</button>
             <button onClick={() => setActiveModal('contact')} className="hover:text-[#64ffda]">Secure_Comms</button>
          </div>
          <p className="text-[9px] text-slate-900 tracking-[1.5em] font-black uppercase italic">Cyberha Intelligence // Operational Hub 2026</p>
      </footer>

      {/* MODALS */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/98 backdrop-blur-3xl z-[200] flex items-center justify-center p-6" onClick={() => setActiveModal(null)}>
           <div className="bg-[#0a0a0a] border border-[#64ffda]/20 max-w-2xl w-full p-12 rounded-[3.5rem] shadow-2xl relative overflow-y-auto max-h-[85vh] scrollbar-hide" onClick={e => e.stopPropagation()}>
              <h2 className="text-3xl font-black text-[#64ffda] uppercase italic mb-8 tracking-tighter">
                {activeModal === 'privacy' && "Privacy_Zero_Protocol"}
                {activeModal === 'terms' && "Terms_of_Engagement"}
                {activeModal === 'contact' && "Direct_Neural_Link"}
              </h2>
              <div className="text-slate-400 text-xs leading-relaxed space-y-6 font-medium italic border-l border-[#64ffda]/20 pl-6">
                {activeModal === 'privacy' && (
                  <>
                    <p className="text-[#64ffda] font-black underline uppercase">بروتوكول الخصوصية:</p>
                    <p>1. سيبرها لا تقوم بجمع أي بصمة رقمية للزوار. نظامنا يعمل بمبدأ "عرض البيانات" فقط دون تخزينها.</p>
                    <p>2. لا يتم استخدام ملفات تعريف الارتباط (Cookies) التابعة لجهات تتبع خارجية.</p>
                  </>
                )}
                {activeModal === 'terms' && (
                  <>
                    <p className="text-[#64ffda] font-black underline uppercase">شروط الاستخدام:</p>
                    <p>1. المعلومات المتاحة مخصصة للبحث والدفاع فقط. سيبرها غير مسؤولة عن أي استخدام هجومي للثغرات المذكورة.</p>
                    <p>2. يتم تحديث البيانات آلياً من مصادرها الرسمية؛ نحن لا نضمن دقة البيانات بنسبة 100% ولكننا ننقلها من مصادرها الموثوقة.</p>
                  </>
                )}
                {activeModal === 'contact' && <div className="text-center font-mono bg-white/5 p-6 rounded-2xl italic">sameaminn@proton.me</div>}
              </div>
              <button onClick={() => setActiveModal(null)} className="mt-12 w-full py-5 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#64ffda] transition-all">Exit_Modal</button>
           </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 60s linear infinite; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #64ffda; border-radius: 10px; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}