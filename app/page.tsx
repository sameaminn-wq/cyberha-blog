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

    const fetchVault = async () => {
      try {
        const vRes = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json"));
        const vJson = await vRes.json();
        const vData = JSON.parse(vJson.contents);
        setVault(vData.vulnerabilities.slice(0, 20).map((v: any) => ({
          cveID: v.cveID,
          vulnerabilityName: v.vulnerabilityName,
          shortDescription: v.shortDescription,
          date: v.dateAdded
        })));
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
      
      {/* 🔴 Ticker - Slowed down to 60s */}
      <div className="bg-red-600 py-2 overflow-hidden sticky top-0 z-50 shadow-2xl h-10 flex items-center border-b border-black/20">
        <div className="flex animate-marquee whitespace-nowrap text-[13px] font-black italic tracking-wider">
          {newsLoading ? (
            <span className="px-10 uppercase">جاري الاتصال بالقنوات العالمية المشفرة...</span>
          ) : (
            news.slice(0, 10).map((n, i) => (
              <span key={i} className="px-10">عاجل :: {n.source} :: {n.title} [إصدار 2026]</span>
            ))
          )}
        </div>
      </div>

      <nav className="p-8 max-w-7xl mx-auto flex justify-between items-center">
        <div className="cursor-pointer" onClick={() => {setView("hub"); setSelectedPost(null);}}>
          <h1 className="text-3xl font-black tracking-tighter">سيبرها<span className="text-red-600">.INTEL</span></h1>
        </div>
        <div className="flex gap-10 font-black text-[12px] uppercase tracking-[0.2em]">
           <button onClick={() => {setView("hub"); setSelectedPost(null);}} className={view === 'hub' ? 'text-red-600' : 'text-slate-500 hover:text-white transition-colors'}>العمليات الميدانية</button>
           <button onClick={() => setView("vault")} className={view === 'vault' ? 'text-red-600' : 'text-slate-500 hover:text-white transition-colors'}>الأرشيف السيادي</button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-6 lg:px-12">
        {view === "hub" && !selectedPost && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
               <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[2.5rem] shadow-2xl">
                  <h3 className="text-red-600 text-[15px] font-black mb-6 uppercase tracking-[0.3em]">PROT-KEY اشكال كلمات المرور القوية</h3>
                  <div className="bg-black p-8 rounded-2xl text-red-500 font-mono mb-8 text-center break-all border border-red-600/10 min-h-[100px] flex items-center justify-center text-xl shadow-inner">
                    {generatedPass || "0000-0000-0000-0000"}
                  </div>
                  <button onClick={() => setGeneratedPass(Math.random().toString(36).slice(-8) + "-" + Math.random().toString(36).toUpperCase().slice(-8) + "-" + Math.random().toString(36).slice(-8))} className="w-full py-5 bg-red-600 rounded-2xl font-black hover:bg-white hover:text-black transition-all active:scale-95 shadow-lg shadow-red-600/20 uppercase text-sm">إصدار مفتاح وصول</button>
               </div>

               <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[2.5rem] shadow-2xl">
                  <h3 className="text-red-600 text-[15px] font-black mb-6 uppercase tracking-[0.3em]">SCAN-RADAR // رادار كشف التهديدات</h3>
                  <input id="uScan" type="text" placeholder="https://threat-actor.com" className="w-full bg-black border border-white/10 p-5 rounded-2xl mb-8 text-sm outline-none focus:border-red-600 transition-all font-mono text-center placeholder:text-slate-800" />
                  <button onClick={() => {
                    const u = (document.getElementById('uScan') as HTMLInputElement).value;
                    if(u) window.open(`https://www.virustotal.com/gui/search/${encodeURIComponent(u)}`, '_blank');
                  }} className="w-full py-5 bg-transparent border-2 border-red-600 text-red-600 rounded-2xl font-black hover:bg-red-600 hover:text-white transition-all active:scale-95 uppercase text-sm">بدء المسح الراداري</button>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {newsLoading ? (
                [1,2,3].map(i => <div key={i} className="bg-[#0a0a0a] h-72 rounded-[3rem] animate-pulse border border-white/5"></div>)
              ) : (
                news.map((n, i) => (
                  <div key={i} onClick={() => setSelectedPost(n)} className="group bg-[#0a0a0a] rounded-[3rem] overflow-hidden cursor-pointer border border-white/5 hover:border-red-600/50 transition-all duration-500 shadow-xl">
                    <div className="h-56 overflow-hidden relative">
                      <div className="absolute top-6 right-6 bg-red-600 px-4 py-1 rounded-full text-[9px] font-black z-10 shadow-xl">{n.source}</div>
                      <img src={n.img} className="w-full h-full object-cover opacity-20 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" alt="Intel" />
                    </div>
                    <div className="p-10 text-right">
                      <h3 className="font-black text-xl leading-tight group-hover:text-red-500 transition-colors line-clamp-2">{n.title}</h3>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {view === "vault" && (
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-1000">
             <div className="mb-16 border-r-8 border-red-600 pr-8">
               <h2 className="text-5xl font-black uppercase tracking-tighter">سجل الثغرات (CISA)</h2>
               <p className="text-slate-500 mt-4 font-bold text-sm">قاعدة بيانات الثغرات المستغلة عالمياً - تحديث فوري 2026</p>
             </div>
             <div className="grid gap-6">
                {vaultLoading ? (
                   [1,2,3,4].map(i => <div key={i} className="h-40 bg-[#0a0a0a] rounded-[2.5rem] animate-pulse"></div>)
                ) : (
                  vault.map((v, i) => (
                    <div key={i} className="bg-[#0a0a0a] p-10 rounded-[3rem] border border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 hover:bg-black hover:border-red-600/30 transition-all shadow-2xl">
                      <div className="text-right w-full">
                        <div className="flex items-center gap-4 mb-4">
                           <span className="text-red-600 font-mono text-sm font-black bg-red-600/10 px-4 py-1 rounded-lg border border-red-600/20">{v.cveID}</span>
                           <span className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">{v.date}</span>
                        </div>
                        <h4 className="text-2xl font-black tracking-tight">{v.vulnerabilityName}</h4>
                        <p className="text-slate-500 text-sm mt-4 leading-relaxed italic">{v.shortDescription}</p>
                      </div>
                      <a href={`https://nvd.nist.gov/vuln/detail/${v.cveID}`} target="_blank" rel="noreferrer" className="bg-white text-black hover:bg-red-600 hover:text-white px-10 py-5 rounded-2xl font-black transition-all whitespace-nowrap text-xs uppercase shadow-xl">تحليل المتجهات</a>
                    </div>
                  ))
                )}
             </div>
          </div>
        )}

        {selectedPost && (
          <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-10 duration-700">
            <button onClick={() => setSelectedPost(null)} className="text-red-600 mb-12 font-black text-[10px] uppercase tracking-[0.4em] flex items-center gap-3 hover:gap-6 transition-all"><span>←</span> العودة للعمليات الميدانية</button>
            <h1 className="text-5xl md:text-7xl font-black mb-12 text-right leading-[1.1] tracking-tighter italic">{selectedPost.title}</h1>
            <div className="prose prose-invert max-w-none text-right text-slate-300 text-xl leading-relaxed bg-[#0a0a0a] p-12 rounded-[4rem] border border-white/5 shadow-2xl" dangerouslySetInnerHTML={{ __html: selectedPost.description }} />
          </div>
        )}
      </main>

      {/* 📜 Footer */}
      <footer className="py-24 border-t border-white/5 bg-black mt-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex flex-wrap justify-center gap-12 mb-16 text-[11px] font-black text-slate-600 uppercase tracking-[0.3em]">
            <button onClick={() => setActiveModal('about')} className="hover:text-red-600 transition-colors">عن المنظومة</button>
            <button onClick={() => setActiveModal('privacy')} className="hover:text-red-600 transition-colors">بروتوكول البيانات</button>
            <button onClick={() => setActiveModal('terms')} className="hover:text-red-600 transition-colors">قواعد الاشتباك</button>
            <button onClick={() => setActiveModal('contact')} className="hover:text-red-600 transition-colors">القناة الآمنة</button>
          </div>
          <p className="text-[10px] text-slate-800 tracking-[1.5em] font-black italic uppercase">Cyberha Intel Ops // Classified 2026</p>
        </div>
      </footer>

      {/* 🛡️ Cookie Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-8 left-8 right-8 md:left-auto md:max-w-md bg-red-600 text-white p-8 rounded-[3rem] z-[150] shadow-[0_30px_60px_-15px_rgba(220,38,38,0.5)] flex flex-col gap-6 border border-white/20 animate-in slide-in-from-bottom-20">
          <p className="text-[11px] font-black leading-relaxed uppercase tracking-wider text-center">تستخدم "سيبرها" بروتوكولات الكوكيز المتقدمة لتحليل النشاط السيبراني وضمان استقرار الواجهة البرمجية.</p>
          <button onClick={() => {localStorage.setItem("cyberha_consent", "true"); setShowCookieBanner(false);}} className="bg-black text-white py-4 rounded-2xl text-[10px] font-black uppercase hover:bg-white hover:text-black transition-all shadow-2xl border border-white/10">تأكيد الهوية والموافقة</button>
        </div>
      )}

      {/* 🛡️ Modals - Professional & Strict */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-[200] flex items-center justify-center p-6" onClick={() => setActiveModal(null)}>
          <div className="bg-[#0a0a0a] border border-red-600/30 max-w-2xl w-full p-12 rounded-[4rem] shadow-2xl relative text-right max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h2 className="text-4xl font-black text-red-600 mb-10 uppercase italic border-b-2 border-red-600/10 pb-6 tracking-tighter">
              {activeModal === 'privacy' && "بروتوكول خصوصية البيانات"}
              {activeModal === 'terms' && "شروط الاستخدام الصارمة"}
              {activeModal === 'about' && "منظومة سيبرها الاستخباراتية"}
              {activeModal === 'contact' && "نقطة الاتصال المشفرة"}
            </h2>
            
            <div className="text-slate-400 leading-relaxed text-sm font-medium space-y-8">
              {activeModal === 'privacy' && (
                <>
                  <p><strong className="text-white">أولاً:</strong> نحن لا نقوم بتخزين أي هويات شخصية؛ يتم تشفير كافة طلبات الفحص الراداري عبر قنواتنا الخاصة لضمان عدم تعقب المستخدم.</p>
                  <p><strong className="text-white">ثانياً:</strong> ملفات الكوكيز المستخدمة هي ملفات تقنية بحتة تهدف لرفع كفاءة استجابة الخادم وتخصيص تدفق الأخبار الاستخباراتية.</p>
                  <p><strong className="text-white">ثالثاً:</strong> لا يتم مشاركة سجلات الوصول مع أي جهة خارجية إلا في الحالات التي يقتضيها أمن المنظومة الوطني.</p>
                </>
              )}
              {activeModal === 'terms' && (
                <>
                  <p><strong className="text-white underline decoration-red-600">القاعدة الأساسية:</strong> يُمنع استخدام أدوات سيبرها (المولد أو الرادار) في أي هجوم سيبراني فعلي. المنصة للاستخدام الدفاعي والبحثي فقط.</p>
                  <p><strong className="text-white">المسؤولية:</strong> المستخدم وحده يتحمل التبعات القانونية لاستغلال البيانات الواردة في هذا الأرشيف خارج إطار القانون السيبراني المعمول به عالمياً.</p>
                  <p><strong className="text-white">حق الوصول:</strong> تحتفظ الإدارة بحق حظر أي بروتوكول IP يظهر نشاطاً مريباً أو محاولات عبث بالمنظومة.</p>
                </>
              )}
              {activeModal === 'about' && (
                <>
                  <p>تأسست <span className="text-white font-bold">سيبرها (Cyberha)</span> كمنظومة استخباراتية مستقلة تهدف لردم الفجوة المعلوماتية في الشرق الأوسط بين المهاجمين والمدافعين.</p>
                  <p>نعتمد على دمج تقنيات الذكاء الاصطناعي مع تدفقات البيانات من منظومات (CISA, NVD, MITRE) لنقدم للمختصين رؤية شاملة للتهديدات قبل وقوعها.</p>
                </>
              )}
              {activeModal === 'contact' && (
                <div className="bg-black p-10 rounded-[2.5rem] border border-red-600/20 text-center shadow-inner">
                  <p className="mb-6 text-[10px] uppercase tracking-[0.4em] text-slate-600">مفتاح الاتصال المباشر:</p>
                  <p className="text-red-600 font-black text-2xl select-all tracking-tight">sameaminn@proton.me</p>
                  <p className="mt-6 text-[10px] text-slate-700 italic">نقبل  الرسائل المشفرة  عبر  ProtonMail.</p>
                </div>
              )}
            </div>

            <button onClick={() => setActiveModal(null)} className="mt-12 w-full py-5 bg-red-600 text-white rounded-2xl font-black uppercase hover:bg-white hover:text-black transition-all shadow-xl text-xs tracking-widest">إغلاق القناة الأمنية</button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 60s linear infinite; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #dc2626; border-radius: 20px; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  );
}