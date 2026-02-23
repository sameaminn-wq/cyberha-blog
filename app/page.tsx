"use client";
import { useEffect, useState } from "react";

// تعريف الأنواع لمنع أخطاء Vercel
interface NewsItem {
  title: string;
  source: string;
  pubDate: string;
  link: string;
  thumbnail?: string;
  description: string;
  content?: string;
}

interface VaultItem {
  cveID: string;
  vulnerabilityName: string;
  shortDescription: string;
}

export default function CyberhaFinalSystem() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [vault, setVault] = useState<VaultItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<NewsItem | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [view, setView] = useState<"hub" | "vault">("hub");
  const [generatedPass, setGeneratedPass] = useState("");

  const FEEDS = [
    "https://thehackernews.com/rss",
    "https://www.bleepingcomputer.com/feed/",
    "https://www.darkreading.com/rss.xml"
  ];

  useEffect(() => {
    async function initializeSystem() {
      try {
        setLoading(true);
        // 1. جلب الأخبار
        const responses = await Promise.all(FEEDS.map(url => 
          fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`).then(res => res.json())
        ));
        
        let combined: NewsItem[] = responses.flatMap(data => (data.items || []).map((item: any) => ({
          title: item.title,
          source: data.feed.title?.split(' - ')[0] || "معلومات عالمية",
          pubDate: item.pubDate,
          link: item.link,
          thumbnail: item.thumbnail,
          description: item.description,
          content: item.content
        })));
        
        setNews(combined.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()));

        // 2. جلب الثغرات (CISA)
        const vaultRes = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json"));
        const vaultJson = await vaultRes.json();
        const vaultData = JSON.parse(vaultJson.contents);
        setVault(vaultData.vulnerabilities.slice(0, 15));

      } catch (err) { 
        console.error("فشل في تحديث البيانات");
      } finally { 
        setLoading(false); 
      }
    }
    initializeSystem();
  }, []);

  const genPass = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*()_+";
    setGeneratedPass(Array.from({length: 24}, () => chars[Math.floor(Math.random()*chars.length)]).join(''));
  };

  if (loading) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center font-mono text-red-600" dir="rtl">
      <div className="text-center tracking-widest animate-pulse font-bold text-2xl uppercase">جاري تشغيل الانظمة ... ...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-[#f1f5f9] font-sans selection:bg-red-600 selection:text-white" dir="rtl">
      
      {/* 🔴 شريط الأنباء (خط 16) */}
      <div className="bg-red-600 py-3 overflow-hidden sticky top-0 z-[100] shadow-lg">
        <div className="flex animate-marquee whitespace-nowrap text-[16px] font-black text-white italic uppercase">
          {news.slice(0, 8).map((item, i) => (
            <span key={i} className="px-12 flex items-center gap-4">
              <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
              تحديث أمني عاجل :: {item.source} :: {item.title}
            </span>
          ))}
        </div>
      </div>

      <nav className="p-8 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/5">
        <div className="cursor-pointer group" onClick={() => {setView("hub"); setSelectedPost(null);}}>
          <h1 className="text-4xl font-black tracking-tighter text-white group-hover:text-red-500 transition-all">
            سيبرها<span className="text-red-600">.LIVE</span>
          </h1>
          <p className="text-[10px] text-slate-500 tracking-[0.5em] uppercase italic">محطة المعلومات السريعة </p>
        </div>

        <div className="flex items-center gap-10 text-[14px] font-black uppercase tracking-widest">
           <button onClick={() => {setView("hub"); setSelectedPost(null);}} className={view === 'hub' ? 'text-red-600 border-b-2 border-red-600 pb-1' : 'text-slate-500 hover:text-white transition-all'}>مركز العمليات</button>
           <button onClick={() => setView("vault")} className={view === 'vault' ? 'text-red-600 border-b-2 border-red-600 pb-1' : 'text-slate-500 hover:text-white transition-all'}>مخزن الثغرات</button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-6">
        {view === "hub" && !selectedPost && (
          <>
            {/* الأدوات التكتيكية */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
               <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[3rem] shadow-2xl relative group">
                  <h3 className="text-red-600 font-black text-[15px] uppercase mb-6 tracking-widest italic"> مولد مفاتيح التشفير</h3>
                  <div className="bg-black p-5 rounded-2xl text-center text-xl font-mono text-red-500 border border-white/5 mb-6 break-all min-h-[70px] flex items-center justify-center">
                    {generatedPass || "••••••••••••••••"}
                  </div>
                  <button onClick={genPass} className="w-full py-4 bg-red-600 text-white text-[12px] font-black uppercase hover:bg-white hover:text-black transition-all rounded-2xl">توليد مفتاح</button>
               </div>
               
               <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[3rem] shadow-2xl relative group overflow-hidden">
                  <h3 className="text-red-600 font-black text-[15px] uppercase mb-6 tracking-widest italic"> رادار فحص الروابط المشبوهة</h3>
                  <div className="space-y-6">
                    <input type="text" id="urlScanner" placeholder="أدخل رابط الموقع للفحص..." className="w-full bg-black border border-white/10 p-4 rounded-2xl text-xs text-white placeholder:text-slate-600 focus:border-red-600 outline-none transition-all italic" />
                    <button onClick={() => {
                        const url = (document.getElementById('urlScanner') as HTMLInputElement).value;
                        if(url) window.open(`https://www.virustotal.com/gui/search/${encodeURIComponent(url)}`, '_blank');
                    }} className="w-full py-4 bg-red-600/10 border border-red-600/40 text-red-600 text-[11px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all rounded-2xl flex items-center justify-center gap-3">
                      <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
                      بدء تحليل التهديد
                    </button>
                  </div>
               </div>
            </div>

            {/* شبكة الأخبار */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {news.map((item, i) => (
                <article key={i} onClick={() => setSelectedPost(item)} className="group bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-red-600/30 transition-all cursor-pointer shadow-2xl flex flex-col h-full">
                  <div className="h-56 relative overflow-hidden">
                    <div className="absolute top-6 right-6 bg-red-600 px-4 py-1 rounded-full text-[10px] text-white z-10 font-bold uppercase">{item.source}</div>
                    <img src={item.thumbnail || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"} className="w-full h-full object-cover opacity-20 group-hover:opacity-100 transition-all duration-1000" alt="News" />
                  </div>
                  <div className="p-10 flex-grow text-right">
                    <h3 className="text-xl font-bold text-white group-hover:text-red-500 transition-colors italic leading-tight">{item.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        {view === "vault" && (
          <div className="animate-in fade-in duration-1000">
             <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-12 border-r-4 border-red-600 pr-6">قاعدة بيانات الثغرات العالمية</h2>
             <div className="grid gap-6">
                {vault.map((v, i) => (
                  <div key={i} className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2.5rem] hover:border-red-600/40 transition-all group flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-right w-full">
                      <span className="text-red-600 font-mono text-[12px] block mb-2 font-bold">{v.cveID}</span>
                      <h4 className="text-xl font-bold text-white group-hover:text-red-500 italic mb-2">{v.vulnerabilityName}</h4>
                      <p className="text-[12px] text-slate-500 italic max-w-2xl">{v.shortDescription}</p>
                    </div>
                    <a href={`https://nvd.nist.gov/vuln/detail/${v.cveID}`} target="_blank" rel="noreferrer" className="bg-white/5 text-white px-8 py-3 rounded-xl text-[12px] font-black uppercase hover:bg-red-600 transition-all shadow-xl italic whitespace-nowrap">تحليل الثغرة</a>
                  </div>
                ))}
             </div>
          </div>
        )}

        {selectedPost && (
          <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-10">
             <button onClick={() => setSelectedPost(null)} className="mb-10 text-red-600 text-[12px] font-black tracking-widest uppercase">← العودة للمركز</button>
             <h1 className="text-5xl font-black mb-10 italic text-white text-right leading-tight">{selectedPost.title}</h1>
             <div className="prose prose-invert max-w-none text-slate-300 text-xl leading-relaxed bg-[#0a0a0a] p-12 rounded-[3.5rem] border border-white/5 italic shadow-2xl text-right">
                <div dangerouslySetInnerHTML={{ __html: selectedPost.content || selectedPost.description }} />
             </div>
          </div>
        )}
      </main>

      <footer className="py-24 border-t border-white/5 bg-black mt-20 text-center">
          <div className="flex justify-center flex-wrap gap-12 mb-12 text-[13px] font-black text-slate-500 uppercase tracking-widest italic">
             <button onClick={() => setActiveModal('about')} className="hover:text-red-600">من نحن</button>
             <button onClick={() => setActiveModal('privacy')} className="hover:text-red-600">الخصوصية</button>
             <button onClick={() => setActiveModal('terms')} className="hover:text-red-600">الشروط</button>
             <button onClick={() => setActiveModal('contact')} className="hover:text-red-600">اتصل بنا</button>
          </div>
          <p className="text-[10px] text-slate-900 tracking-[1.5em] font-black uppercase italic">سيبرها للمعلومات التقنية // 2026</p>
      </footer>

      {activeModal && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[200] flex items-center justify-center p-6" onClick={() => setActiveModal(null)}>
           <div className="bg-[#0a0a0a] border border-red-600/20 max-w-2xl w-full p-12 rounded-[3.5rem] shadow-2xl relative text-right" onClick={e => e.stopPropagation()}>
              <h2 className="text-3xl font-black text-red-600 uppercase italic mb-8 tracking-tighter">
                {activeModal === 'privacy' ? "بروتوكول الخصوصية" : activeModal === 'terms' ? "شروط الاستخدام" : activeModal === 'about' ? "حول المنصة" : "الاتصال المشفر"}
              </h2>
              <div className="text-slate-300 text-md leading-relaxed space-y-4 italic">
                {activeModal === 'privacy' && <p>لا نقوم بتخزين أي بيانات. جميع الأدوات تعمل محلياً تماماً.</p>}
                {activeModal === 'terms' && <p>المنصة للأغراض التعليمية والتوعوية  فقط ونحن غير مسؤلين عن اي استخدام اخر لها واي مستخدم مسؤل كامل المسؤلية عن استخدمه الشخصي للبيانت والمعلومات.</p>}
                {activeModal === 'about' && <p>سيبرها هي المحطة الأولى لاستخبارات التهديدات الرقمية.</p>}
                {activeModal === 'contact' && <p>للتواصل: sameaminn@proton.me</p>}
              </div>
              <button onClick={() => setActiveModal(null)} className="mt-12 w-full py-5 bg-red-600 text-white rounded-2xl font-black uppercase">إغلاق</button>
           </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 50s linear infinite; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #dc2626; border-radius: 10px; }
      `}</style>
    </div>
  );
}