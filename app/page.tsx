"use client";
import { useEffect, useState } from "react";

export default function CyberhaUltimateSystem() {
  const [news, setNews] = useState<any[]>([]);
  const [vault, setVault] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [view, setView] = useState<"hub" | "vault">("hub");

  // 📡 مصادر الاستخبارات والثغرات
  const FEEDS = [
    "https://thehackernews.com/rss",
    "https://www.bleepingcomputer.com/feed/",
    "https://www.darkreading.com/rss.xml"
  ];

  useEffect(() => {
    async function initSystem() {
      try {
        setLoading(true);
        // جلب الأخبار
        const newsRes = await Promise.all(FEEDS.map(url => 
          fetch(`https://api.rss2json.com/v1/api.json?rss_url=${url}`).then(res => res.json())
        ));
        let combinedNews = newsRes.flatMap(data => (data.items || []).map((item: any) => ({
          ...item, source: data.feed.title?.split(' - ')[0] || "Global Intel", 
          img: item.thumbnail || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"
        })));
        setNews(combinedNews.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()));

        // جلب بيانات المخزن (CISA Known Vulnerabilities)
        const vaultRes = await fetch("https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json");
        const vaultData = await vaultRes.json();
        setVault(vaultData.vulnerabilities.slice(0, 15));
      } catch (err) { console.error("Link Failure"); }
      finally { setLoading(false); }
    }
    initSystem();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center font-mono text-[#38bdf8]">
      <div className="text-center tracking-[0.8em] animate-pulse uppercase italic">Initializing_Cyberha_Secure_Link...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-[#f8fafc] font-sans selection:bg-[#38bdf8] selection:text-[#020617]" dir="ltr">
      
      {/* 🔴 شريط الأنباء الصارم */}
      <div className="bg-[#38bdf8]/10 border-b border-[#38bdf8]/20 py-2 overflow-hidden sticky top-0 z-[100] backdrop-blur-xl">
        <div className="flex animate-marquee whitespace-nowrap text-[9px] font-black text-[#38bdf8] tracking-widest uppercase italic">
          {news.slice(0, 8).map((item, i) => (
            <span key={i} className="px-12 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#38bdf8] rounded-full animate-ping"></span>
              ALERT_LEVEL_1 :: {item.source} :: {item.title}
            </span>
          ))}
        </div>
      </div>

      <nav className="p-8 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 border-b border-white/5">
        <div className="cursor-pointer" onClick={() => {setView("hub"); setSelectedPost(null);}}>
          <h1 className="text-4xl font-black tracking-tighter text-white">
            CYBERHA<span className="text-[#38bdf8]">.INTEL</span>
          </h1>
          <p className="text-[8px] text-slate-500 tracking-[0.7em] uppercase italic">Premium Cyber Intelligence Terminal</p>
        </div>
        <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest italic text-slate-400">
           <button onClick={() => setView("hub")} className={view === 'hub' ? 'text-[#38bdf8] border-b border-[#38bdf8]' : 'hover:text-white'}>Hub</button>
           <button onClick={() => setView("vault")} className={view === 'vault' ? 'text-[#38bdf8] border-b border-[#38bdf8]' : 'hover:text-white'}>The_Vault</button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-6">
        {view === "hub" && !selectedPost && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.slice(0, 15).map((item, i) => (
              <article key={i} onClick={() => setSelectedPost(item)} className="group bg-[#0f172a] border border-white/5 rounded-[2rem] overflow-hidden hover:border-[#38bdf8]/30 transition-all cursor-pointer shadow-2xl">
                <img src={item.img} className="h-48 w-full object-cover opacity-40 group-hover:opacity-100 transition-all duration-700" alt="Intel" />
                <div className="p-8">
                  <div className="text-[8px] font-black text-[#38bdf8] mb-4 tracking-widest uppercase">{item.source}</div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#38bdf8] leading-tight transition-colors italic line-clamp-2">{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        )}

        {view === "vault" && (
          <div className="animate-in fade-in duration-700">
            <h2 className="text-3xl font-black text-white mb-10 italic border-l-4 border-[#38bdf8] pl-6 uppercase">Exploit_Registry</h2>
            <div className="grid gap-4">
              {vault.map((v, i) => (
                <div key={i} className="bg-[#0f172a] border border-white/5 p-6 rounded-2xl flex justify-between items-center hover:bg-[#1e293b] transition-all group">
                  <div>
                    <span className="text-[#38bdf8] font-mono text-[10px] block mb-2">{v.cveID}</span>
                    <h4 className="text-white font-bold italic group-hover:tracking-wider transition-all">{v.vulnerabilityName}</h4>
                  </div>
                  <a href={`https://nvd.nist.gov/vuln/detail/${v.cveID}`} target="_blank" className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-widest">Patch_Details →</a>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedPost && view === "hub" && (
          <div className="max-w-3xl mx-auto animate-in slide-in-from-bottom-8 duration-700">
            <button onClick={() => setSelectedPost(null)} className="mb-10 text-[#38bdf8] text-[10px] font-black tracking-widest">← RETURN_TO_HUB</button>
            <h1 className="text-5xl font-black text-white mb-10 italic leading-[0.9] uppercase tracking-tighter">{selectedPost.title}</h1>
            <div className="prose prose-invert max-w-none text-slate-300 text-lg leading-relaxed bg-[#0f172a] p-10 rounded-[2.5rem] border border-white/5 italic shadow-2xl">
              <div dangerouslySetInnerHTML={{ __html: selectedPost.content || selectedPost.description }} />
            </div>
          </div>
        )}
      </main>

      <footer className="py-20 border-t border-white/5 bg-black/40 mt-20 text-center">
          <div className="flex justify-center flex-wrap gap-10 mb-10 text-[10px] font-black text-slate-500 uppercase tracking-widest italic">
             <button onClick={() => setActiveModal('about')} className="hover:text-[#38bdf8]">The_Agency</button>
             <button onClick={() => setActiveModal('privacy')} className="hover:text-[#38bdf8]">Privacy_Protocol</button>
             <button onClick={() => setActiveModal('terms')} className="hover:text-[#38bdf8]">Terms_of_Use</button>
             <button onClick={() => setActiveModal('contact')} className="hover:text-[#38bdf8]">Secure_Line</button>
          </div>
          <p className="text-[8px] text-slate-800 tracking-[1.2em] font-black uppercase">Cyberha Intel // Secure Node 2026</p>
      </footer>

      {/* ⚖️ MODALS (السياسات الصارمة) */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-[200] flex items-center justify-center p-6" onClick={() => setActiveModal(null)}>
           <div className="bg-[#0f172a] border border-[#38bdf8]/20 max-w-2xl w-full p-12 rounded-[3rem] shadow-2xl relative overflow-y-auto max-h-[80vh]" onClick={e => e.stopPropagation()}>
              <h2 className="text-2xl font-black text-[#38bdf8] uppercase italic mb-8">
                {activeModal === 'privacy' && "Privacy_Zero_Protocol"}
                {activeModal === 'terms' && "Terms_of_Engagement"}
                {activeModal === 'about' && "The_Cyberha_Mission"}
                {activeModal === 'contact' && "Encrypted_Comm_Link"}
              </h2>
              <div className="text-slate-400 text-xs leading-relaxed space-y-6 font-medium italic">
                {activeModal === 'privacy' && (
                  <>
                    <p>1. **انعدام الأثر:** سيبرها تتبع سياسة "عدم السجلات" المطلقة. لا يتم تخزين ملفات تعريف الارتباط (Cookies) أو تتبع البصمة الرقمية للزوار.</p>
                    <p>2. **تشفير الأطراف:** جميع العمليات التكتيكية (مثل توليد كلمات السر) تتم محلياً في متصفحك ولا تُرسل لخوادمنا نهائياً.</p>
                    <p>3. **حماية البيانات:** نحن لا نبيع أو نشارك أي بيانات؛ ببساطة لأننا لا نجمعها في المقام الأول.</p>
                  </>
                )}
                {activeModal === 'terms' && (
                  <>
                    <p>1. **الغرض الدفاعي:** منصة سيبرها مُخصصة للأغراض التعليمية والدفاعية فقط. يُحظر استخدام الأدوات المتاحة في أي نشاط هجومي.</p>
                    <p>2. **المسؤولية القانونية:** المستخدم هو المسؤول الوحيد عن كيفية استخدامه للمعلومات المتاحة. "سيبرها" غير مسؤولة عن أي سوء استخدام.</p>
                    <p>3. **حق الوصول:** نحتفظ بالحق في تقييد الوصول إلى الأجزاء المتقدمة من "المخزن" في حال رصد نشاط آلي مشبوه.</p>
                  </>
                )}
                {activeModal === 'about' && (
                  <p>سيبرها هي المحطة المركزية للاستخبارات التقنية في 2026. نهدف لتوفير وصول مباشر وسريع لأحدث التهديدات والثغرات العالمية لتمكين المتخصصين من حماية البنى التحتية الرقمية.</p>
                )}
                {activeModal === 'contact' && (
                  <div className="text-center">
                    <p className="mb-4">للتواصل عبر القنوات المشفرة:</p>
                    <div className="bg-black/50 p-4 rounded-xl text-white font-mono select-all">sameaminn@proton.me</div>
                  </div>
                )}
              </div>
              <button onClick={() => setActiveModal(null)} className="mt-10 w-full py-4 bg-[#38bdf8] text-[#020617] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all">Close_Terminal</button>
           </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 50s linear infinite; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #020617; }
        ::-webkit-scrollbar-thumb { background: #38bdf8; border-radius: 10px; }
      `}</style>
    </div>
  );
}