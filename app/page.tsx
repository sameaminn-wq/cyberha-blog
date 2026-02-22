"use client";
import { useEffect, useState } from "react";

export default function CyberhaUltimatePro() {
  const [news, setNews] = useState<any[]>([]);
  const [filteredNews, setFilteredNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const FEEDS = [
    "https://www.bleepingcomputer.com/feed/",
    "https://thehackernews.com/rss",
    "https://www.darkreading.com/rss.xml",
    "https://threatpost.com/feed/",
    "https://www.securityweek.com/rss"
  ];

  useEffect(() => {
    async function fetchAndProcess() {
      try {
        setLoading(true);
        const responses = await Promise.all(FEEDS.map(url => 
          fetch(`https://api.rss2json.com/v1/api.json?rss_url=${url}`).then(res => res.json())
        ));
        
        let combined = responses.flatMap(data => data.items || []);
        combined.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
        
        setNews(combined);
        setFilteredNews(combined.slice(0, 24));
      } catch (err) {
        console.error("Critical Error in Intelligence Feed");
      } finally {
        setLoading(false);
      }
    }
    fetchAndProcess();
  }, []);

  // محرك البحث الذكي
  useEffect(() => {
    const results = news.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNews(results.slice(0, 24));
  }, [searchTerm, news]);

  if (loading) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono text-cyan-500">
      <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <div className="animate-pulse text-sm">INITIALIZING GLOBAL SECURITY ENGINE...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020202] text-slate-200" dir="rtl">
      {/* 1. شريط التهديدات العاجلة */}
      <div className="bg-red-900/20 border-b border-red-500/30 py-2 overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-marquee text-[10px] font-bold text-red-400 px-4">
           🔴 تنبيه أمني: اكتشاف ثغرات Zero-day جديدة في أنظمة التشفير العالمية ... متابعة حية لآخر هجمات الفدية Ransomware ... سيبرها ترصد تحركات مجموعات الهاكرز النشطة الآن 🔴
        </div>
      </div>

      <nav className="border-b border-white/5 p-6 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-black text-white cursor-pointer" onClick={() => setSelectedPost(null)}>
            سيبرها<span className="text-cyan-500">.CORE</span>
          </h1>
          
          {/* 2. شريط البحث */}
          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="ابحث عن ثغرة، شركة، أو نوع هجوم..." 
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 px-6 focus:outline-none focus:border-cyan-500 transition-all text-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-6">
        {!selectedPost ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item, index) => (
              <article key={index} onClick={() => setSelectedPost(item)} className="group bg-[#080808] border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/40 transition-all cursor-pointer">
                <div className="h-48 overflow-hidden">
                  <img src={item.thumbnail || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"} className="w-full h-full object-cover group-hover:scale-110 transition duration-700 opacity-70 group-hover:opacity-100" />
                </div>
                <div className="p-6">
                  <div className="text-[9px] text-cyan-600 mb-2 font-mono uppercase tracking-widest">{item.author || "Intelligence"}</div>
                  <h3 className="text-lg font-bold mb-4 leading-tight group-hover:text-cyan-400 transition">{item.title}</h3>
                  <p className="text-slate-500 text-xs line-clamp-2 italic leading-relaxed">جاري تحليل التقرير الأمني الكامل...</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700">
            <button onClick={() => setSelectedPost(null)} className="mb-10 text-cyan-500 font-bold hover:text-white transition flex items-center gap-2">← العودة للرادار العالمي</button>
            
            <img src={selectedPost.thumbnail} className="w-full rounded-3xl mb-12 shadow-2xl border border-white/10" />
            
            <h1 className="text-4xl md:text-5xl font-black mb-8 leading-tight text-white">{selectedPost.title}</h1>
            
            <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-xl space-y-8 font-light shadow-inner p-2">
              {/* حل مشكلة جلب المحتوى الأكبر */}
              <div dangerouslySetInnerHTML={{ __html: selectedPost.content || selectedPost.description }} className="news-content-style" />
            </div>

            <div className="mt-20 p-12 bg-white/5 rounded-[3rem] border border-white/5 text-center">
              <h4 className="text-sm text-slate-500 mb-6 font-mono">التقرير الكامل متاح في الوكالة الأصلية</h4>
              <a href={selectedPost.link} target="_blank" className="inline-block bg-white text-black px-12 py-5 rounded-full font-black hover:bg-cyan-500 hover:text-white transition-all transform hover:-scale-105">
                تصفح المصدر الأصلي (EN)
              </a>
            </div>
          </div>
        )}
      </main>

      <footer className="py-20 border-t border-white/5 text-center text-slate-700 text-[10px] font-mono tracking-[0.5em]">
        CYBERHA INTELLIGENCE HUB &copy; 2026
      </footer>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 30s linear infinite;
        }
        .news-content-style img { border-radius: 1.5rem; margin: 2rem 0; border: 1px solid rgba(255,255,255,0.1); }
      `}</style>
    </div>
  );
}