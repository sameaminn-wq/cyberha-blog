"use client";
import { useEffect, useState } from "react";

interface NewsItem {
  title: string;
  source: string;
  pubDate: string;
  img: string;
  description: string;
}

interface VaultItem {
  cveID: string;
  vulnerabilityName: string;
  shortDescription: string;
  date: string;
}

export default function CyberhaSystem() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [vault, setVault] = useState<VaultItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [vaultLoading, setVaultLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<NewsItem | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [view, setView] = useState<"hub" | "vault">("hub");
  const [generatedPass, setGeneratedPass] = useState("");
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    // 1. جلب الأخبار بشكل منفصل
    const fetchNews = async () => {
      const FEEDS = [
        "https://thehackernews.com/rss",
        "https://www.bleepingcomputer.com/feed/",
        "https://www.darkreading.com/rss.xml"
      ];
      try {
        const responses = await Promise.all(FEEDS.map(url => 
          fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`).then(res => res.json())
        ));
        let combined: NewsItem[] = responses.flatMap(data => (data.items || []).map((item: any) => ({
          title: item.title,
          source: data.feed.title?.split(' - ')[0] || "استخبارات",
          pubDate: item.pubDate,
          img: item.thumbnail || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
          description: item.description
        })));
        setNews(combined.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()));
      } catch (e) { console.error("News Error:", e); }
      finally { setNewsLoading(false); }
    };

    // 2. جلب الثغرات العالمية (CISA KEV) بشكل منفصل
    const fetchVault = async () => {
      try {
        // نستخدم AllOrigins لتخطي مشكلة الـ CORS وزيادة السرعة
        const vRes = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json"));
        const vJson = await vRes.json();
        const vData = JSON.parse(vJson.contents);
        const mappedVault = vData.vulnerabilities.slice(0, 20).map((v: any) => ({
          cveID: v.cveID,
          vulnerabilityName: v.vulnerabilityName,
          shortDescription: v.shortDescription,
          date: v.dateAdded
        }));
        setVault(mappedVault);
      } catch (e) { console.error("Vault Error:", e); }
      finally { setVaultLoading(false); }
    };

    fetchNews();
    fetchVault();

    const consent = localStorage.getItem("cyberha_consent");
    if (!consent) setTimeout(() => setShowCookieBanner(true), 2000);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-red-600" dir="rtl">
      
      {/* 🔴 Ticker - يعمل بمجرد تحميل أول خبر */}
      <div className="bg-red-600 py-2 overflow-hidden sticky top-0 z-50 shadow-2xl h-10 flex items-center">
        <div className="flex animate-marquee whitespace-nowrap text-[14px] font-black italic">
          {newsLoading ? (
            <span className="px-10">جاري الاتصال بالأقمار الصناعية لرفع البيانات...</span>
          ) : (
            news.slice(0, 10).map((n, i) => (
              <span key={i} className="px-10 uppercase">عاجل :: {n.source} :: {n.title}</span>
            ))
          )}
        </div>
      </div>

      <nav className="p-8 max-w-7xl mx-auto flex justify-between items-center border-b border-white/5">
        <div className="cursor-pointer" onClick={() => {setView("hub"); setSelectedPost(null);}}>
          <h1 className="text-3xl font-black tracking-tighter hover:text-red-500 transition-all">سيبرها<span className="text-red-600">.LIVE</span></h1>
        </div>
        <div className="flex gap-8 font-bold text-sm">
           <button onClick={() => {setView("hub"); setSelectedPost(null);}} className={view === 'hub' ? 'text-red-600' : 'text-slate-500 hover:text-white'}>اخر الاخبار </button>
           <button onClick={() => setView("vault")} className={view === 'vault' ? 'text-red-600' : 'text-slate-500 hover:text-white'}>مخزن الثغرات</button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-6 lg:px-12">
        {view === "hub" && !selectedPost && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
               {/* مولد المفاتيح */}
               <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem] shadow-2xl hover:border-red-600/20 transition-all">
                  <h3 className="text-red-600 text-xs font-black mb-4 uppercase tracking-widest"> بروتوكول التشفير السيادي</h3>
                  <div className="bg-black p-6 rounded-xl text-red-500 font-mono mb-6 text-center break-all border border-white/5 min-h-[80px] flex items-center justify-center text-lg shadow-inner">
                    {generatedPass || "••••-••••-••••"}
                  </div>
                  <button onClick={() => setGeneratedPass(Math.random().toString(36).slice(-12) + Math.random().toString(36).toUpperCase().slice(-12))} className="w-full py-4 bg-red-600 rounded-xl font-black hover:bg-white hover:text-black transition-all shadow-lg shadow-red-600/20">توليد مفتاح سيادي</button>
               </div>

               {/* الرادار */}
               <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem] shadow-2xl hover:border-red-600/20 transition-all">
                  <h3 className="text-red-600 text-xs font-black mb-4 uppercase tracking-widest"> رادار تحليل التهديدات</h3>
                  <input id="uScan" type="text" placeholder="أدخل رابطاً للفحص..." className="w-full bg-black border border-white/10 p-4 rounded-xl mb-6 text-sm outline-none focus:border-red-600 transition-all font-mono text-center" />
                  <button onClick={() => {
                    const u = (document.getElementById('uScan') as HTMLInputElement).value;
                    if(u) window.open(`https://www.virustotal.com/gui/search/${encodeURIComponent(u)}`, '_blank');
                  }} className="w-full py-4 bg-red-600/10 border border-red-600 text-red-600 rounded-xl font-black hover:bg-red-600 hover:text-white transition-all">بدء الفحص الراداري</button>
               </div>
            </div>

            {/* قسم الأخبار مع حالة التحميل */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {newsLoading ? (
                [1,2,3,4,5,6].map(i => (
                  <div key={i} className="bg-[#0a0a0a] h-64 rounded-[2.5rem] animate-pulse border border-white/5"></div>
                ))
              ) : (
                news.map((n, i) => (
                  <div key={i} onClick={() => setSelectedPost(n)} className="group bg-[#0a0a0a] rounded-[2.5rem] overflow-hidden cursor-pointer border border-white/5 hover:border-red-600/50 transition-all shadow-xl">
                    <div className="h-48 overflow-hidden relative">
                      <div className="absolute top-4 right-4 bg-red-600 px-3 py-1 rounded-full text-[10px] font-bold z-10">{n.source}</div>
                      <img src={n.img} className="w-full h-full object-cover opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt="Intel" loading="lazy" />
                    </div>
                    <div className="p-8 text-right"><h3 className="font-bold text-lg leading-tight group-hover:text-red-500 transition-colors line-clamp-2">{n.title}</h3></div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {view === "vault" && (
          <div className="animate-in fade-in duration-700">
             <h2 className="text-3xl font-black mb-10 border-r-4 border-red-600 pr-6 uppercase tracking-tighter">سجل الثغرات العالمية </h2>
             <div className="grid gap-4">
                {vaultLoading ? (
                   [1,2,3,4].map(i => <div key={i} className="h-32 bg-[#0a0a0a] rounded-[2rem] animate-pulse border border-white/5"></div>)
                ) : (
                  vault.map((v, i) => (
                    <div key={i} className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 hover:bg-black hover:border-red-600/30 transition-all">
                      <div className="text-right w-full">
                        <div className="flex items-center gap-3 mb-2">
                           <span className="text-red-600 font-mono text-sm font-bold bg-red-600/10 px-3 py-1 rounded-md">{v.cveID}</span>
                           <span className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">{v.date}</span>
                        </div>
                        <h4 className="text-xl font-bold">{v.vulnerabilityName}</h4>
                        <p className="text-slate-500 text-sm mt-2 line-clamp-2 italic">{v.shortDescription}</p>
                      </div>
                      <a href={`https://nvd.nist.gov/vuln/detail/${v.cveID}`} target="_blank" rel="noreferrer" className="bg-white/5 hover:bg-red-600 px-8 py-4 rounded-xl font-black transition-all whitespace-nowrap text-sm uppercase">التحليل كامل </a>
                    </div>
                  ))
                )}
             </div>
          </div>
        )}

        {selectedPost && (
          <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-8">
            <button onClick={() => setSelectedPost(null)} className="text-red-600 mb-8 font-black text-sm uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all"><span>←</span> عودة لمركز العمليات</button>
            <h1 className="text-4xl md:text-5xl font-black mb-10 text-right leading-tight italic">{selectedPost.title}</h1>
            <div className="prose prose-invert max-w-none text-right text-slate-300 text-lg leading-relaxed bg-[#0a0a0a] p-10 rounded-[3rem] border border-white/5 shadow-2xl" dangerouslySetInnerHTML={{ __html: selectedPost.description }} />
          </div>
        )}
      </main>

      {/* 📜 Footer */}
      <footer className="py-20 border-t border-white/5 bg-black mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex flex-wrap justify-center gap-10 mb-12 text-sm font-black text-slate-500 uppercase tracking-widest">
            <button onClick={() => setActiveModal('about')} className="hover:text-red-600 transition-colors">عن سيبرها</button>
            <button onClick={() => setActiveModal('privacy')} className="hover:text-red-600 transition-colors">الخصوصية</button>
            <button onClick={() => setActiveModal('terms')} className="hover:text-red-600 transition-colors">القواعد</button>
            <button onClick={() => setActiveModal('contact')} className="hover:text-red-600 transition-colors">تواصل آمن</button>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="h-px w-20 bg-red-600"></div>
            <p className="text-[10px] text-slate-800 tracking-[1.2em] font-black italic uppercase">Cyberha Intel Station // 2026</p>
          </div>
        </div>
      </footer>

      {/* 🛡️ Cookie Banner */}
{showCookieBanner && (
  <div className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-sm bg-red-600 text-white p-6 rounded-[2rem] z-[150] shadow-2xl flex flex-col gap-4 border border-white/20 animate-in slide-in-from-bottom-10">
    <p className="text-xs font-bold leading-relaxed">
      تستخدم سيبرها ملفات الكوكيز لتحليل البيانات وتحسين الأداء الرقمي. استمرارك يعني موافقتك.
    </p>
    <button 
      onClick={() => {
        // 1. حفظ الاختيار في المتصفح لكي لا يظهر مجدداً
        localStorage.setItem("cyberha_consent", "true");
        // 2. إخفاء البنر فوراً من الشاشة
        setShowCookieBanner(false);
      }} 
      className="bg-white text-black py-3 rounded-xl text-[10px] font-black uppercase hover:bg-black hover:text-white transition-all shadow-xl"
    >
      موافق 
    </button>
  </div>
)}

      {/* 🛡️ Modal System */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/98 backdrop-blur-3xl z-[200] flex items-center justify-center p-4" onClick={() => setActiveModal(null)}>
          <div className="bg-[#0a0a0a] border-2 border-red-600/20 max-w-2xl w-full p-10 rounded-[3.5rem] shadow-2xl relative text-right max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h2 className="text-3xl font-black text-red-600 mb-8 uppercase italic border-b border-red-600/20 pb-4 tracking-tighter">
              {activeModal === 'privacy' && "بروتوكول الخصوصية"}
              {activeModal === 'terms' && "اتفاقية الاستخدام"}
              {activeModal === 'about' && "المنظومة التقنية"}
              {activeModal === 'contact' && "الاتصال الآمن"}
            </h2>
            <div className="text-slate-300 leading-relaxed text-sm italic space-y-6">
              {activeModal === 'privacy' && <p>نحن نلتزم بسياسة "شفافية البيانات 2026". نجمع فقط البيانات التقنية لضمان استمرارية الخدمة تحت ظروف الضغط السيبراني العالي.</p>}
              {activeModal === 'terms' && <p>المنصة مخصصة للمدافعين والباحثين. يمنع منعاً باتاً استخدام المعلومات الواردة في أي غرض عدائي رقمي.</p>}
              {activeModal === 'about' && <p>سيبرها هي المحطة الرائدة في الشرق الأوسط لمراقبة التهديدات السيبرانية لحظة بلحظة، وتقديم رؤية تكتيكية شاملة للمدافعين.</p>}
              {activeModal === 'contact' && <p className="text-red-600 font-black text-xl select-all bg-black p-4 rounded-xl border border-white/5">sameaminn@proton.me</p>}
            </div>
            <button onClick={() => setActiveModal(null)} className="mt-10 w-full py-4 bg-red-600 text-white rounded-2xl font-black uppercase hover:bg-white hover:text-black transition-all">إغلاق القناة</button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 35s linear infinite; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #dc2626; border-radius: 10px; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  );
}