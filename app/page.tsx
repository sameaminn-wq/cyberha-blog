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
    <div className="min-h-screen bg-black flex items-center justify-center text-red-600 font-bold animate-pulse">
      جاري تحميل بروتوكولات سيبرها...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans" dir="rtl">
      <div className="bg-red-600 py-3 overflow-hidden sticky top-0 z-50 shadow-xl">
        <div className="flex animate-marquee whitespace-nowrap text-[16px] font-black italic">
          {news.slice(0, 8).map((n, i) => (
            <span key={i} className="px-10">تحديث عاجل :: {n.source} :: {n.title}</span>
          ))}
        </div>
      </div>

      <nav className="p-8 max-w-7xl mx-auto flex justify-between items-center border-b border-white/5">
        <div className="cursor-pointer" onClick={() => {setView("hub"); setSelectedPost(null);}}>
          <h1 className="text-4xl font-black">سيبرها<span className="text-red-600">.LIVE</span></h1>
        </div>
        <div className="flex gap-8 font-bold">
           <button onClick={() => {setView("hub"); setSelectedPost(null);}} className={view === 'hub' ? 'text-red-600' : 'text-slate-500'}>مركز العمليات</button>
           <button onClick={() => setView("vault")} className={view === 'vault' ? 'text-red-600' : 'text-slate-500'}>مخزن الثغرات</button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-6">
        {view === "hub" && !selectedPost && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
               <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem]">
                  <h3 className="text-red-600 font-bold mb-4">توليد مفتاح تشفير</h3>
                  <div className="bg-black p-4 rounded-xl text-red-500 font-mono mb-4 text-center break-all">
                    {generatedPass || "••••••••"}
                  </div>
                  <button onClick={() => setGeneratedPass(Math.random().toString(36).slice(-10) + Math.random().toString(36).toUpperCase().slice(-10))} className="w-full py-3 bg-red-600 rounded-xl font-bold">توليد الآن</button>
               </div>

               <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem]">
                  <h3 className="text-red-600 font-bold mb-4">رادار فحص الروابط</h3>
                  <input id="uScan" type="text" placeholder="أدخل الرابط..." className="w-full bg-black border border-white/10 p-3 rounded-xl mb-4 text-sm outline-none focus:border-red-600" />
                  <button onClick={() => {
                    const u = (document.getElementById('uScan') as HTMLInputElement).value;
                    if(u) window.open(`https://www.virustotal.com/gui/search/${encodeURIComponent(u)}`, '_blank');
                  }} className="w-full py-3 bg-red-600/20 border border-red-600 text-red-600 rounded-xl font-bold hover:bg-red-600 hover:text-white transition-all">بدء الفحص</button>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {news.map((n, i) => (
                <div key={i} onClick={() => setSelectedPost(n)} className="bg-[#0a0a0a] rounded-[2rem] overflow-hidden cursor-pointer hover:border-red-600 border border-transparent transition-all">
                  <img src={n.img} className="h-48 w-full object-cover opacity-40 hover:opacity-100 transition-opacity" alt="Cyber News" />
                  <div className="p-6 text-right"><h3 className="font-bold leading-tight">{n.title}</h3></div>
                </div>
              ))}
            </div>
          </>
        )}

        {view === "vault" && (
          <div className="grid gap-4">
            {vault.map((v, i) => (
              <div key={i} className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 flex justify-between items-center shadow-lg">
                <div className="text-right">
                  <span className="text-red-600 font-mono text-sm">{v.cveID}</span>
                  <h4 className="font-bold">{v.vulnerabilityName}</h4>
                </div>
                <a href={`https://nvd.nist.gov/vuln/detail/${v.cveID}`} target="_blank" rel="noreferrer" className="bg-white/10 px-4 py-2 rounded-lg text-xs font-bold">تحليل الثغرة</a>
              </div>
            ))}
          </div>
        )}

        {selectedPost && (
          <div className="max-w-3xl mx-auto">
            <button onClick={() => setSelectedPost(null)} className="text-red-600 mb-8 font-bold">← عودة للأخبار</button>
            <h1 className="text-4xl font-black mb-8 text-right">{selectedPost.title}</h1>
            <div className="prose prose-invert max-w-none text-right text-slate-300" dangerouslySetInnerHTML={{ __html: selectedPost.description }} />
          </div>
        )}
      </main>

      <footer className="py-12 text-center text-[10px] text-slate-700 uppercase tracking-[1em]">سيبرها // 2026</footer>

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 40s linear infinite; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #dc2626; }
      `}</style>
    </div>
  );
}