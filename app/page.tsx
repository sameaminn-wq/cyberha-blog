"use client";
import { useEffect, useState } from "react";

export default function CyberhaUltimateGlobal() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  // قائمة الـ 10 وكالات العالمية الكبرى
  const FEEDS = [
    "https://www.bleepingcomputer.com/feed/",
    "https://thehackernews.com/rss",
    "https://www.darkreading.com/rss.xml",
    "https://threatpost.com/feed/",
    "https://www.securityweek.com/rss",
    "https://krebsonsecurity.com/feed/",
    "https://www.cyberscoop.com/feed/",
    "https://nakedsecurity.sophos.com/feed/",
    "https://www.wired.com/feed/category/security/latest/rss",
    "https://www.zdnet.com/topic/security/rss.xml"
  ];

  const GET_URL = (url: string) => `https://api.rss2json.com/v1/api.json?rss_url=${url}`;

  useEffect(() => {
    async function fetchUltimateNews() {
      try {
        setLoading(true);
        // جلب البيانات من 10 مصادر بشكل متوازٍ (Parallel)
        const responses = await Promise.all(FEEDS.map(url => fetch(GET_URL(url))));
        const dataResults = await Promise.all(responses.map(res => res.json()));
        
        // دمج النتائج وإزالة المكرر وترتيبها زمنياً
        let combined = dataResults.flatMap(data => data.items || []);
        combined.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

        // عرض أفضل 30 خبر محدث
        setNews(combined.slice(0, 30));
      } catch (err) {
        console.error("خطأ في الاتصال بالشبكة العالمية");
      } finally {
        setLoading(false);
      }
    }
    fetchUltimateNews();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono">
      <div className="w-20 h-1 bg-cyan-900 overflow-hidden mb-4">
        <div className="w-full h-full bg-cyan-500 animate-slide-loading"></div>
      </div>
      <div className="text-cyan-500 animate-pulse">[إقامة اتصال بـ 10 وكالات أنباء عالمية...]</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020202] text-slate-200" dir="rtl">
      {/* Navbar الاحترافي */}
      <nav className="border-b border-white/5 p-6 bg-black/90 backdrop-blur-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-3xl font-black text-white cursor-pointer" onClick={() => setSelectedPost(null)}>
              سيبرها<span className="text-cyan-500">.CORE</span>
            </h1>
            <span className="text-[9px] text-cyan-800 font-mono tracking-widest uppercase">10 International Sources Active</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-mono">
             <div className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full"></span> LIVE</div>
             <div className="text-slate-600 hidden md:block">UPDATE: {new Date().toLocaleTimeString()}</div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-6">
        {!selectedPost ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item, index) => (
              <article key={index} onClick={() => setSelectedPost(item)} className="group bg-[#080808] border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-500 cursor-pointer flex flex-col h-full shadow-2xl">
                <div className="h-44 overflow-hidden relative">
                   <div className="absolute top-3 left-3 bg-black/80 px-2 py-1 rounded text-[9px] text-slate-400 z-10 border border-white/5">
                      {item.author || 'Global News'}
                   </div>
                   {item.thumbnail ? (
                     <img src={item.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition duration-1000" />
                   ) : (
                     <div className="w-full h-full bg-slate-900/50 flex items-center justify-center">🛡️</div>
                   )}
                </div>
                <div className="p-6 flex-grow">
                  <h3 className="text-lg font-bold mb-4 leading-tight group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                  <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="text-[9px] text-slate-600 uppercase tracking-tighter">{new Date(item.pubDate).toDateString()}</span>
                    <span className="text-cyan-600 text-[10px] font-bold">عرض التقرير</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700">
            <button onClick={() => setSelectedPost(null)} className="mb-10 text-cyan-500 hover:text-white transition-colors flex items-center gap-2 font-bold">
               ← رجوع للرادار العالمي
            </button>
            
            {selectedPost.thumbnail && (
              <img src={selectedPost.thumbnail} className="w-full rounded-3xl mb-12 shadow-2xl border border-white/10" />
            )}

            <h1 className="text-4xl md:text-5xl font-black mb-10 leading-tight text-white tracking-tight">{selectedPost.title}</h1>
            
            <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-xl space-y-8 font-light italic">
              <div dangerouslySetInnerHTML={{ __html: selectedPost.content || selectedPost.description }} />
            </div>

            <div className="mt-20 text-center border-t border-white/5 pt-12">
              <a href={selectedPost.link} target="_blank" className="bg-cyan-600 text-white px-12 py-5 rounded-full font-black hover:bg-cyan-500 transition-all shadow-xl shadow-cyan-900/40">
                فتح المقال في الوكالة الأصلية
              </a>
            </div>
          </div>
        )}
      </main>

      <footer className="py-20 border-t border-white/5 text-center">
         <p className="text-slate-700 text-[10px] uppercase tracking-[0.4em]">Powered by Cyberha Global Hub 2026</p>
      </footer>
    </div>
  );
}