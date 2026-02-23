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
}

export default function CyberhaSystem() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [vault, setVault] = useState<VaultItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<NewsItem | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [view, setView] = useState<"hub" | "vault">("hub");
  const [generatedPass, setGeneratedPass] = useState("");

  useEffect(() => {
    const FEEDS = [
      "https://thehackernews.com/rss",
      "https://www.bleepingcomputer.com/feed/",
      "https://www.darkreading.com/rss.xml"
    ];

    async function init() {
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

        const vRes = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json"));
        const vJson = await vRes.json();
        const vData = JSON.parse(vJson.contents);
        setVault(vData.vulnerabilities.slice(0, 15));
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    }
    init();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center text-red-600 font-bold animate-pulse" dir="rtl">
      جاري استدعاء البروتوكولات الأمنية...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-red-600" dir="rtl">
      
      {/* 🔴 Ticker */}
      <div className="bg-red-600 py-2 overflow-hidden sticky top-0 z-50 shadow-2xl">
        <div className="flex animate-marquee whitespace-nowrap text-[14px] font-black italic">
          {news.slice(0, 8).map((n, i) => (
            <span key={i} className="px-10">تنبيه استخباراتي عاجل :: {n.source} :: {n.title}</span>
          ))}
        </div>
      </div>

      {/* Nav */}
      <nav className="p-8 max-w-7xl mx-auto flex justify-between items-center border-b border-white/5">
        <div className="cursor-pointer" onClick={() => {setView("hub"); setSelectedPost(null);}}>
          <h1 className="text-3xl font-black tracking-tighter">سيبرها<span className="text-red-600">.INTEL</span></h1>
        </div>
        <div className="flex gap-8 font-bold text-sm uppercase">
           <button onClick={() => {setView("hub"); setSelectedPost(null);}} className={view === 'hub' ? 'text-red-600' : 'text-slate-500 hover:text-white'}>العمليات</button>
           <button onClick={() => setView("vault")} className={view === 'vault' ? 'text-red-600' : 'text-slate-500 hover:text-white'}>المخزن</button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-6">
        {view === "hub" && !selectedPost && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
               <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem] shadow-2xl">
                  <h3 className="text-red-600 text-xs font-black mb-4 uppercase tracking-widest">// مولد مفاتيح التشفير</h3>
                  <div className="bg-black p-6 rounded-xl text-red-500 font-mono mb-6 text-center break-all border border-white/5 min-h-[80px] flex items-center justify-center text-lg">
                    {generatedPass || "••••-••••-••••"}
                  </div>
                  <button onClick={() => setGeneratedPass(Math.random().toString(36).slice(-12) + Math.random().toString(36).toUpperCase().slice(-12))} className="w-full py-4 bg-red-600 rounded-xl font-black hover:bg-white hover:text-black transition-all">توليد مفتاح سيادي</button>
               </div>

               <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem] shadow-2xl">
                  <h3 className="text-red-600 text-xs font-black mb-4 uppercase tracking-widest">// رادار تحليل الروابط الصادرة</h3>
                  <input id="uScan" type="text" placeholder="https://external-target.com" className="w-full bg-black border border-white/10 p-4 rounded-xl mb-6 text-sm outline-none focus:border-red-600 transition-all font-mono" />
                  <button onClick={() => {
                    const u = (document.getElementById('uScan') as HTMLInputElement).value;
                    if(u) window.open(`https://www.virustotal.com/gui/search/${encodeURIComponent(u)}`, '_blank');
                  }} className="w-full py-4 bg-red-600/10 border border-red-600 text-red-600 rounded-xl font-black hover:bg-red-600 hover:text-white transition-all">بدء الفحص الاستخباراتي</button>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {news.map((n, i) => (
                <div key={i} onClick={() => setSelectedPost(n)} className="group bg-[#0a0a0a] rounded-[2.5rem] overflow-hidden cursor-pointer border border-white/5 hover:border-red-600/50 transition-all shadow-xl">
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute top-4 right-4 bg-red-600 px-3 py-1 rounded-full text-[10px] font-bold z-10">{n.source}</div>
                    <img src={n.img} className="w-full h-full object-cover opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt="Intel" />
                  </div>
                  <div className="p-8 text-right"><h3 className="font-bold text-lg leading-tight group-hover:text-red-500 transition-colors">{n.title}</h3></div>
                </div>
              ))}
            </div>
          </>
        )}

        {view === "vault" && (
          <div className="animate-in fade-in duration-700">
             <h2 className="text-3xl font-black mb-10 border-r-4 border-red-600 pr-6">قاعدة بيانات الثغرات المستغلة (CISA)</h2>
             <div className="grid gap-4">
                {vault.map((v, i) => (
                  <div key={i} className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 hover:bg-black transition-all">
                    <div className="text-right w-full">
                      <span className="text-red-600 font-mono text-sm font-bold">{v.cveID}</span>
                      <h4 className="text-xl font-bold mt-1">{v.vulnerabilityName}</h4>
                      <p className="text-slate-500 text-sm mt-2 line-clamp-2 italic">{v.shortDescription}</p>
                    </div>
                    <a href={`https://nvd.nist.gov/vuln/detail/${v.cveID}`} target="_blank" rel="noreferrer" className="bg-white/5 hover:bg-red-600 px-8 py-3 rounded-xl font-bold transition-all whitespace-nowrap">تقرير فني</a>
                  </div>
                ))}
             </div>
          </div>
        )}

        {selectedPost && (
          <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-8">
            <button onClick={() => setSelectedPost(null)} className="text-red-600 mb-8 font-black text-sm uppercase tracking-widest">← العودة للأرشيف</button>
            <h1 className="text-5xl font-black mb-10 text-right leading-tight italic">{selectedPost.title}</h1>
            <div className="prose prose-invert max-w-none text-right text-slate-300 text-lg leading-relaxed bg-[#0a0a0a] p-10 rounded-[3rem] border border-white/5" dangerouslySetInnerHTML={{ __html: selectedPost.description }} />
          </div>
        )}
      </main>

      {/* 📜 Footer & Legal Sections */}
      <footer className="py-20 border-t border-white/5 bg-black mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex flex-wrap justify-center gap-10 mb-12 text-sm font-black text-slate-500 uppercase tracking-widest">
            <button onClick={() => setActiveModal('about')} className="hover:text-red-600 transition-colors">من نحن</button>
            <button onClick={() => setActiveModal('privacy')} className="hover:text-red-600 transition-colors">سياسة الخصوصية</button>
            <button onClick={() => setActiveModal('terms')} className="hover:text-red-600 transition-colors">شروط الاستخدام</button>
            <button onClick={() => setActiveModal('contact')} className="hover:text-red-600 transition-colors">الاتصال الآمن</button>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="h-px w-20 bg-red-600"></div>
            <p className="text-[10px] text-slate-800 tracking-[1.2em] font-black italic">CYBERHA INTEL STATION // 2026</p>
          </div>
        </div>
      </footer>

      {/* 🛡️ Modal System */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100] flex items-center justify-center p-4" onClick={() => setActiveModal(null)}>
          <div className="bg-[#0a0a0a] border border-red-600/20 max-w-2xl w-full p-10 rounded-[3rem] shadow-2xl relative text-right" onClick={e => e.stopPropagation()}>
            <h2 className="text-3xl font-black text-red-600 mb-6 uppercase">
              {activeModal === 'about' && "من نحن // سيبرها"}
              {activeModal === 'privacy' && "بروتوكول الخصوصية 2026"}
              {activeModal === 'terms' && "قواعد الاشتباك الرقمي"}
              {activeModal === 'contact' && "الاتصال الهجومي المشفر"}
            </h2>
            
            <div className="text-slate-300 leading-relaxed text-sm italic space-y-4">
              {activeModal === 'about' && (
                <p>سيبرها هي المحطة الرائدة في الشرق الأوسط لمراقبة استخبارات التهديدات السيبرانية (CTI). نقوم بتحليل البيانات الضخمة من مصادر عالمية لتوفير رؤية استراتيجية لحظية للمدافعين عن الأمن الرقمي.</p>
              )}
              {activeModal === 'privacy' && (
                <p>وفقاً لتحديثات 2026، المنصة تعتمد سياسة "صفر بيانات". لا يتم تخزين ملفات تعريف الارتباط، ولا يتم تعقب عناوين IP. جميع عمليات المسح والتوليد تتم في ذاكرة المتصفح المؤقتة وتنتهي بإغلاق النافذة.</p>
              )}
              {activeModal === 'terms' && (
                <p>يُحظر استخدام المعلومات الواردة في أي نشاط عدائي. المنصة مخصصة للأغراض البحثية والدفاعية فقط. "سيبرها" غير مسؤولة عن أي سوء استخدام للأدوات التكتيكية المتوفرة.</p>
              )}
              {activeModal === 'contact' && (
                <div className="bg-black/50 p-6 rounded-2xl border border-white/5">
                  <p className="mb-2">قناة الاتصال الوحيدة المعتمدة:</p>
                  <p className="text-red-600 font-mono font-bold select-all text-lg">sameaminn@proton.me</p>
                  <p className="mt-4 text-[10px] text-slate-500 italic">يُنصح باستخدام تشفير PGP عند المراسلات الحساسة.</p>
                </div>
              )}
            </div>

            <button onClick={() => setActiveModal(null)} className="mt-10 w-full py-4 bg-red-600 text-white rounded-xl font-black hover:bg-white hover:text-black transition-all uppercase tracking-widest">إغلاق القناة</button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 45s linear infinite; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #dc2626; border-radius: 10px; }
      `}</style>
    </div>
  );
}