"use client";
import { useEffect, useState } from "react";

export default function CyberhaUltimatePro() {
  const [news, setNews] = useState<any[]>([]);
  const [filteredNews, setFilteredNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeModal, setActiveModal] = useState<string | null>(null);

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
      } catch (err) { console.error("Intelligence Error"); } finally { setLoading(false); }
    }
    fetchAndProcess();
  }, []);

  useEffect(() => {
    const results = news.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNews(results.slice(0, 24));
  }, [searchTerm, news]);

  const Modal = ({ title, content }: { title: string, content: string }) => (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[100] p-6 flex items-center justify-center">
      <div className="bg-[#0a0a0a] border border-cyan-500/20 max-w-2xl w-full max-h-[80vh] overflow-y-auto p-10 rounded-3xl relative shadow-2xl">
        <button onClick={() => setActiveModal(null)} className="absolute top-6 left-6 text-cyan-500 font-bold hover:text-white transition-colors">إغلاق ×</button>
        <h2 className="text-3xl font-black mb-6 text-white border-b border-cyan-500/20 pb-4">{title}</h2>
        <div className="text-slate-300 leading-loose text-sm whitespace-pre-wrap">{content}</div>
      </div>
    </div>
  );

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-cyan-500 animate-pulse font-mono">[جاري استدعاء الأنظمة الأمنية...]</div>;

  return (
    <div className="min-h-screen bg-[#020202] text-slate-200" dir="rtl">
      
      {/* 🔴 شريط التنبيهات الأحمر (نظام إنذار الثغرات) */}
      <div className="bg-red-600/10 border-b border-red-600/30 py-2.5 overflow-hidden relative z-[60]">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="text-red-500 font-bold text-xs uppercase px-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
             عاجل: اكتشاف ثغرة Zero-day في أنظمة التشفير واسعة النطاق ... مجموعات الفدية تستهدف قطاع الطاقة ... سيبرها تتبع نشاطاً مشبوهاً في بروتوكولات الويب الآن ...
          </span>
          {/* نكرر النص لضمان استمرارية الحركة */}
          <span className="text-red-500 font-bold text-xs uppercase px-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
             عاجل: اكتشاف ثغرة Zero-day في أنظمة التشفير واسعة النطاق ... مجموعات الفدية تستهدف قطاع الطاقة ... سيبرها تتبع نشاطاً مشبوهاً في بروتوكولات الويب الآن ...
          </span>
        </div>
      </div>

      {activeModal === 'privacy' && <Modal title="سياسة الخصوصية" content="في سيبرها، نلتزم بحماية خصوصيتك تماماً. نحن لا نجمع أي بيانات شخصية عن الزوار ولا نستخدم ملفات تتبع. نحن منصة محايدة لعرض الأخبار العالمية." />}
      {activeModal === 'about' && <Modal title="من نحن" content="سيبرها هي بوابتك الأولى في الشرق الأوسط لرصد التهديدات السيبرانية العالمية. نجمع لك الأخبار من 5 وكالات عالمية كبرى لنضعك في قلب الحدث." />}
      {activeModal === 'contact' && <Modal title="اتصل بنا" content="للتعاون أو الاستفسارات البرمجية، تواصل معنا عبر: admin@cyberha.live" />}

      <nav className="border-b border-white/5 p-6 bg-black/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-black text-white cursor-pointer" onClick={() => setSelectedPost(null)}>سيبرها<span className="text-cyan-500">.LIVE</span></h1>
          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              placeholder="ابحث في الرادار العالمي..." 
              className="bg-white/5 border border-white/10 rounded-xl py-2 px-6 w-full focus:border-cyan-500 outline-none transition-all text-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-6">
        {!selectedPost ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item, i) => (
              <article key={i} onClick={() => setSelectedPost(item)} className="bg-[#080808] border border-white/5 rounded-3xl overflow-hidden hover:border-cyan-500/40 transition-all cursor-pointer group shadow-2xl">
                <div className="relative h-44 overflow-hidden">
                   <div className="absolute top-3 right-3 bg-black/70 px-2 py-1 rounded text-[9px] text-cyan-500 border border-cyan-500/20 z-10">{item.author || 'Global Feed'}</div>
                   <img src={item.thumbnail || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"} className="h-full w-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold group-hover:text-cyan-400 transition-colors leading-tight">{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700">
            <button onClick={() => setSelectedPost(null)} className="mb-8 text-cyan-500 font-bold">← العودة للرادار</button>
            <img src={selectedPost.thumbnail} className="w-full rounded-[2.5rem] mb-10 border border-white/10 shadow-2xl" />
            <h1 className="text-4xl md:text-5xl font-black mb-8 leading-tight">{selectedPost.title}</h1>
            <div className="prose prose-invert max-w-none text-slate-300 text-xl leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: selectedPost.content || selectedPost.description }} />
            </div>
            <div className="mt-12 pt-8 border-t border-white/5 text-center">
               <a href={selectedPost.link} target="_blank" className="bg-white text-black px-12 py-4 rounded-full font-black hover:bg-cyan-500 hover:text-white transition-all inline-block">تصفح التقرير في المصدر</a>
            </div>
          </div>
        )}
      </main>

      <footer className="py-20 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-8 mb-8 text-xs font-bold text-slate-500">
            <button onClick={() => setActiveModal('about')} className="hover:text-cyan-500">من نحن</button>
            <button onClick={() => setActiveModal('privacy')} className="hover:text-cyan-500">سياسة الخصوصية</button>
            <button onClick={() => setActiveModal('contact')} className="hover:text-cyan-500">اتصل بنا</button>
          </div>
          <p className="text-[10px] text-slate-700 tracking-[0.4em] uppercase">Cyberha Hub &copy; 2026 - Powered by Intelligence</p>
        </div>
      </footer>

      {/* 🟢 أكواد الأنيميشن المطلوبة للشريط الأحمر */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
}