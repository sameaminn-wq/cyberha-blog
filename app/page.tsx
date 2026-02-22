"use client";
import { useEffect, useState } from "react";

export default function CyberhaComplete() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const RSS_URL = `https://api.rss2json.com/v1/api.json?rss_url=https://www.bleepingcomputer.com/feed/`;

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        const response = await fetch(RSS_URL);
        const data = await response.json();
        if (data.items) setNews(data.items.slice(0, 15));
      } catch (err) {
        console.error("خطأ في جلب البيانات");
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-cyan-400 animate-pulse font-mono">[جاري فحص وتحديث التقارير الأمنية...]</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020202] text-slate-200 font-sans" dir="rtl">
      {/* Navbar */}
      <nav className="border-b border-cyan-900/30 p-6 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-black text-white cursor-pointer" onClick={() => setSelectedPost(null)}>
            سيبرها<span className="text-cyan-500">.LIVE</span>
          </h1>
          <div className="flex items-center gap-2 text-green-500 font-mono text-[10px]">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            نظام رصد الأخبار نشط
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-6">
        {!selectedPost ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <article key={index} onClick={() => setSelectedPost(item)} className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all cursor-pointer group">
                <div className="h-48 bg-cyan-900/20 flex items-center justify-center">
                  {item.thumbnail ? <img src={item.thumbnail} className="w-full h-full object-cover" /> : <span className="text-4xl">🛡️</span>}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition leading-tight">{item.title}</h3>
                  <p className="text-slate-500 text-sm line-clamp-3">انقر لقراءة التقرير الأمني الكامل...</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button onClick={() => setSelectedPost(null)} className="mb-8 text-cyan-500 font-bold hover:text-cyan-400 transition flex items-center gap-2">
               <span>←</span> العودة لغرفة الأخبار
            </button>
            
            {/* عرض صورة الخبر داخل التقرير */}
            {selectedPost.thumbnail && (
              <div className="mb-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-cyan-900/10">
                <img src={selectedPost.thumbnail} className="w-full h-auto object-cover max-h-[450px]" alt="News Image" />
              </div>
            )}

            <h1 className="text-4xl md:text-5xl font-black mb-8 leading-tight text-white">{selectedPost.title}</h1>
            
            <div className="prose prose-invert max-w-none text-slate-300 leading-loose text-lg space-y-6">
              <div 
                dangerouslySetInnerHTML={{ __html: selectedPost.content || selectedPost.description }} 
                className="news-content-area"
              />
            </div>

            <div className="mt-12 p-8 border-t border-white/5 text-center">
              <a href={selectedPost.link} target="_blank" rel="noopener noreferrer" className="inline-block bg-cyan-600 hover:bg-cyan-500 text-white px-10 py-4 rounded-full font-bold transition-all shadow-lg shadow-cyan-900/40">
                مشاهدة التقرير في المصدر الأصلي
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}