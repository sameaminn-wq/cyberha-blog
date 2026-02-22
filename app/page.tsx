"use client";
import { useEffect, useState } from "react";

export default function CyberhaGlobalV5() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const FEEDS = [
    "https://www.bleepingcomputer.com/feed/",
    "https://thehackernews.com/rss",
    "https://www.darkreading.com/rss.xml",
    "https://threatpost.com/feed/",
    "https://www.securityweek.com/rss"
  ];

  const GET_URL = (url: string) => `https://api.rss2json.com/v1/api.json?rss_url=${url}`;

  useEffect(() => {
    async function fetchGlobalNews() {
      try {
        setLoading(true);
        const responses = await Promise.all(FEEDS.map(url => fetch(GET_URL(url))));
        const dataResults = await Promise.all(responses.map(res => res.json()));
        let combined = dataResults.flatMap(data => data.items || []);
        combined.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
        setNews(combined.slice(0, 25));
      } catch (err) {
        console.error("Connection Error");
      } finally {
        setLoading(false);
      }
    }
    fetchGlobalNews();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center font-mono text-cyan-500 animate-pulse">
      [إقامة اتصال بـ 5 وكالات عالمية...]
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020202] text-slate-200 shadow-inner" dir="rtl">
      <nav className="border-b border-cyan-500/20 p-6 bg-black/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-black text-white cursor-pointer" onClick={() => setSelectedPost(null)}>
            سيبرها <span className="text-cyan-500 text-xs">GLOBAL FEED</span>
          </h1>
          <div className="flex items-center gap-2 text-green-500 font-mono text-[10px]">
             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> LIVE
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-6">
        {!selectedPost ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <article key={index} onClick={() => setSelectedPost(item)} className="group bg-[#080808] border border-white/5 rounded-3xl overflow-hidden hover:border-cyan-500/50 transition-all duration-500 cursor-pointer shadow-2xl">
                <div className="h-52 overflow-hidden relative">
                   {/* تم إصلاح الخطأ هنا عبر التأكد من وجود item قبل قراءة author */}
                   <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-cyan-400 border border-white/5 z-10">
                      {(item && item.author) ? item.author : "Global News"}
                   </div>
                   {item?.thumbnail ? (
                     <img src={item.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                   ) : (
                     <div className="w-full h-full bg-slate-900 flex items-center justify-center text-4xl">📡</div>
                   )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4 leading-tight group-hover:text-cyan-400 transition">{item?.title || "No Title"}</h3>
                  <div className="flex justify-between items-center text-[10px] text-slate-600 font-mono">
                    <span>{item?.pubDate ? new Date(item.pubDate).toLocaleDateString('ar-EG') : ""}</span>
                    <span className="text-cyan-900">اقرأ المزيد +</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700">
            <button onClick={() => setSelectedPost(null)} className="mb-8 text-cyan-500 font-bold hover:tracking-widest transition-all">← العودة للبث العالمي</button>
            
            {selectedPost.thumbnail && (
              <img src={selectedPost.thumbnail} className="w-full rounded-[2.5rem] mb-10 shadow-2xl border border-white/5" />
            )}

            <h1 className="text-4xl md:text-6xl font-black mb-10 leading-tight text-white">{selectedPost.title}</h1>
            
            <div className="prose prose-invert max-w-none text-slate-300 leading-loose text-xl">
              <div dangerouslySetInnerHTML={{ __html: selectedPost.content || selectedPost.description || "" }} />
            </div>

            <div className="mt-16 text-center border-t border-white/5 pt-12">
              <a href={selectedPost.link} target="_blank" className="bg-white text-black px-12 py-5 rounded-full font-black hover:bg-cyan-500 hover:text-white transition-all transform hover:-translate-y-1 shadow-xl">
                فتح المقال الأصلي كاملاً
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}