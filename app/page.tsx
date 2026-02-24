"use client";
import { useEffect, useState, useMemo } from "react";
// ملاحظة: تأكد من تثبيت lucide-react عبر الأمر: npm install lucide-react
import { ShieldAlert, Cpu, Zap, Activity } from "lucide-react";

interface NewsItem {
  title: string;
  source: string;
  pubDate: string;
  img: string;
  description: string;
  link: string;
  content?: string;
}

interface VaultItem {
  cveID: string;
  vulnerabilityName: string;
  shortDescription: string;
}

export default function CyberhaIntegratedAiSystem() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [vault, setVault] = useState<VaultItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<NewsItem | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [view, setView] = useState<"hub" | "vault">("hub");
  const [generatedPass, setGeneratedPass] = useState("");
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  // --- محرك الذكاء الاصطناعي الداخلي (للتحليل الفوري والسرعة) ---
  const aiAnalysis = useMemo(() => {
    if (news.length === 0) return "جاري تحليل البيانات...";
    
    // البحث عن الكلمات المفتاحية الخطيرة لإنشاء ملخص ذكي
    const criticalKeywords = ["zero-day", "critical", "exploit", "rce", "breach", "thorough"];
    const highAlertNews = news.find(item => 
      criticalKeywords.some(key => item.title.toLowerCase().includes(key))
    );

    if (highAlertNews) {
      return `تحليل سيبرها الذكي: تم رصد تهديد بمستوى خطورة عالٍ في "${highAlertNews.source}". الثغرة المذكورة قد تؤثر على البنية التحتية، يُنصح بالتحقق من التحديثات الأمنية فوراً.`;
    }
    return "الذكاء الاصطناعي: الحالة الأمنية العالمية مستقرة نسبياً اليوم. لا توجد هجمات Zero-day واسعة النطاق تم رصدها في الساعات الأخيرة.";
  }, [news]);

  useEffect(() => {
    const FEEDS = [
      "https://thehackernews.com/rss",
      "https://www.bleepingcomputer.com/feed/",
      "https://www.darkreading.com/rss.xml"
    ];

    async function initSystem() {
      try {
        // تنفيذ الطلبات بالتوازي لفتح الموقع بسرعة
        const [newsResponses, vRes] = await Promise.all([
          Promise.all(FEEDS.map(url => fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`).then(res => res.json()))),
          fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json")).then(res => res.json())
        ]);

        // معالجة الأخبار
        let combined: NewsItem[] = newsResponses.flatMap(data => (data.items || []).map((item: any) => ({
          title: item.title,
          source: data.feed.title?.split(' - ')[0] || "استخبارات عالمية",
          pubDate: item.pubDate,
          img: item.thumbnail || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
          description: item.description,
          link: item.link,
          content: item.content
        })));
        setNews(combined.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()));

        // معالجة الثغرات
        const vData = JSON.parse(vRes.contents);
        setVault(vData.vulnerabilities.slice(0, 15));

      } catch (e) {
        console.error("System Boot Error:", e);
      } finally {
        setLoading(false);
      }
    }

    initSystem();
    if (!localStorage.getItem("cyberha_consent")) setTimeout(() => setShowCookieBanner(true), 2000);
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-red-600 font-mono font-bold animate-pulse" dir="rtl">
      <div className="mb-4 text-4xl">📡</div>
      [جاري مزامنة بيانات الذكاء الاصطناعي وتجهيز المنظومة...]
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-red-600" dir="rtl">
      
      {/* 🔴 Ticker مع شعار AI */}
      <div className="bg-red-600 py-2 overflow-hidden sticky top-0 z-50 shadow-2xl flex items-center">
        <div className="bg-black text-white text-[10px] px-3 py-1 font-black ml-4 z-10 border-l border-white/20">AI LIVE</div>
        <div className="flex animate-marquee whitespace-nowrap text-[14px] font-black italic">
          {news.slice(0, 10).map((n, i) => (
            <span key={i} className="px-10 text-white">تحليل فوري :: {n.source} :: {n.title}</span>
          ))}
        </div>
      </div>

      <nav className="p-8 max-w-7xl mx-auto flex justify-between items-center border-b border-white/5">
        <div className="cursor-pointer" onClick={() => {setView("hub"); setSelectedPost(null);}}>
          <h1 className="text-3xl font-black tracking-tighter italic">سيبرها<span className="text-red-600">.AI</span></h1>
        </div>
        <div className="flex gap-8 font-bold text-sm">
           <button onClick={() => {setView("hub"); setSelectedPost(null);}} className={view === 'hub' ? 'text-red-600 border-b-2 border-red-600' : 'text-slate-500 hover:text-white transition-all'}>المركز العملياتي</button>
           <button onClick={() => setView("vault")} className={view === 'vault' ? 'text-red-600 border-b-2 border-red-600' : 'text-slate-500 hover:text-white transition-all'}>مخزن الثغرات</button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-6">
        
        {/* --- قسم ملخص الذكاء الاصطناعي الذكي (الجديد) --- */}
        {view === "hub" && !selectedPost && (
          <section className="mb-12 bg-gradient-to-br from-[#0a0000] to-[#050505] border border-red-600/20 p-8 rounded-[2.5rem] relative overflow-hidden group shadow-2xl shadow-red-900/5">
            <div className="absolute left-0 top-0 w-full h-full opacity-5 pointer-events-none">
                <Activity className="absolute -right-10 -bottom-10 w-64 h-64 text-red-600" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-red-600 p-2 rounded-lg">
                    <ShieldAlert size={20} className="text-white" />
                </div>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-red-500">Cyberha AI Intelligence Insights</h2>
              </div>
              <p className="text-2xl md:text-3xl font-bold italic leading-tight mb-8 max-w-4xl text-slate-100">
                "{aiAnalysis}"
              </p>
              <div className="flex flex-wrap gap-4 text-[10px] font-mono text-slate-500">
                <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10"><Cpu size={12} /> محرك التحليل: نشط</span>
                <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10"><Zap size={12} /> سرعة الاستجابة: 0.02ms</span>
              </div>
            </div>
          </section>
        )}

        {view === "hub" && !selectedPost && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
               <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem] shadow-xl hover:border-red-600/30 transition-all">
                  <h3 className="text-red-600 text-[10px] font-black mb-4 uppercase tracking-widest">موالد التشفير</h3>
                  <div className="bg-black p-6 rounded-xl text-red-500 font-mono mb-6 text-center break-all border border-white/5 min-h-[80px] flex items-center justify-center text-lg">{generatedPass || "••••-••••-••••"}</div>
                  <button onClick={() => setGeneratedPass(Math.random().toString(36).slice(-12) + Math.random().toString(36).toUpperCase().slice(-12))} className="w-full py-4 bg-red-600 rounded-xl font-black hover:bg-white hover:text-black transition-all">توليد مفتاح سيادي</button>
               </div>
               <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem] shadow-xl hover:border-red-600/30 transition-all">
                  <h3 className="text-red-600 text-[10px] font-black mb-4 uppercase tracking-widest">// فحص الروابط الذكي</h3>
                  <input id="uScan" type="text" placeholder="https://external-target.com" className="w-full bg-black border border-white/10 p-4 rounded-xl mb-6 text-sm outline-none focus:border-red-600 transition-all font-mono" />
                  <button onClick={() => {
                    const u = (document.getElementById('uScan') as HTMLInputElement).value;
                    if(u) window.open(`https://www.virustotal.com/gui/search/${encodeURIComponent(u)}`, '_blank');
                  }} className="w-full py-4 bg-red-600/10 border border-red-600 text-red-600 rounded-xl font-black hover:bg-red-600 hover:text-white transition-all">بدء الفحص</button>
               </div>
            </div>

            <h2 className="text-2xl font-black mb-10 border-r-4 border-red-600 pr-4 italic">آخر الاستخبارات العالمية:</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {news.map((n, i) => (
                <div key={i} onClick={() => setSelectedPost(n)} className="group bg-[#0a0a0a] rounded-[2.5rem] overflow-hidden cursor-pointer border border-white/5 hover:border-red-600/40 transition-all shadow-lg">
                  <div className="h-44 overflow-hidden relative">
                    <div className="absolute top-4 right-4 bg-red-600 px-3 py-1 rounded-full text-[10px] font-bold z-10">{n.source}</div>
                    <img src={n.img} className="w-full h-full object-cover opacity-30 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" alt="News" />
                  </div>
                  <div className="p-8 text-right">
                    <h3 className="font-bold text-lg leading-tight group-hover:text-red-500 transition-colors line-clamp-2">{n.title}</h3>
                    <p className="text-[10px] text-slate-500 mt-4 font-mono uppercase">{new Date(n.pubDate).toLocaleDateString('ar-EG')}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ... بقية الأجزاء (selectedPost و vault) تبقى كما هي مع لمسات تحسين بسيطة ... */}
        {selectedPost && (
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-500">
            <button onClick={() => setSelectedPost(null)} className="text-red-600 mb-8 font-black text-xs uppercase tracking-widest">← العودة للمنظومة</button>
            <h1 className="text-4xl md:text-6xl font-black mb-10 text-right italic leading-tight border-r-8 border-red-600 pr-6">{selectedPost.title}</h1>
            <div className="bg-[#0a0a0a] p-10 rounded-[3rem] border border-white/5">
              <div className="prose prose-invert max-w-none text-right text-slate-300 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: selectedPost.description }} />
              <div className="mt-12 text-center border-t border-white/10 pt-10">
                <a href={selectedPost.link} target="_blank" className="bg-red-600 text-white px-10 py-4 rounded-full font-black hover:bg-white hover:text-black transition-all">فتح المصدر الأصلي</a>
              </div>
            </div>
          </div>
        )}

        {view === "vault" && (
          <div className="animate-in fade-in duration-500">
             <h2 className="text-3xl font-black mb-10 border-r-4 border-red-600 pr-6 italic uppercase">سجل الثغرات النشطة (CVE)</h2>
             <div className="grid gap-4">
                {vault.map((v, i) => (
                  <div key={i} className="bg-[#0a0a0a] p-8 rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 hover:bg-black hover:border-red-600/30 transition-all group">
                    <div className="text-right w-full">
                      <span className="text-red-600 font-mono text-sm font-bold bg-red-600/10 px-3 py-1 rounded-lg">{v.cveID}</span>
                      <h4 className="text-xl font-bold mt-2 group-hover:text-red-500 transition-colors">{v.vulnerabilityName}</h4>
                      <p className="text-slate-500 text-sm mt-2 italic line-clamp-2">{v.shortDescription}</p>
                    </div>
                    <a href={`https://nvd.nist.gov/vuln/detail/${v.cveID}`} target="_blank" className="bg-white/5 hover:bg-red-600 px-8 py-3 rounded-xl font-bold transition-all whitespace-nowrap border border-white/10">تقرير فني</a>
                  </div>
                ))}
             </div>
          </div>
        )}
      </main>

      <footer className="py-20 border-t border-white/5 bg-black mt-20 text-center">
        <div className="h-px w-20 bg-red-600 mx-auto mb-6"></div>
        <p className="text-[10px] text-slate-800 tracking-[1em] font-black italic uppercase">Cyberha Intel Hub // AI Core v2.6</p>
      </footer>

      {/* مودال المعلومات والخصوصية (مختصرة للسرعة) */}
      {activeModal && (
         <div className="fixed inset-0 bg-black/98 backdrop-blur-xl z-[200] flex items-center justify-center p-4" onClick={() => setActiveModal(null)}>
            <div className="bg-[#0a0a0a] border-2 border-red-600/20 max-w-xl w-full p-10 rounded-[3rem] text-right shadow-2xl" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-black text-red-600 mb-6 italic uppercase underline decoration-white/10 underline-offset-8">بروتوكول النظام</h2>
                <p className="text-slate-300 italic mb-8">سيبرها هي منصة استخبارات تقنية عالمية تعتمد على الذكاء الاصطناعي لرصد وتحليل التهديدات السيبرانية لحظة وقوعها.</p>
                <button onClick={() => setActiveModal(null)} className="w-full py-4 bg-red-600 text-white rounded-2xl font-black hover:bg-white hover:text-black transition-all">إغلاق</button>
            </div>
         </div>
      )}

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 45s linear infinite; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #020202; }
        ::-webkit-scrollbar-thumb { background: #dc2626; border-radius: 10px; }
        ::selection { background: #dc2626; color: white; }
      `}</style>
    </div>
  );
}