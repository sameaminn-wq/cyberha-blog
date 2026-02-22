"use client";
import { useEffect, useState } from "react";

export default function CyberhaIntelligence2026() {
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
    async function fetchAllData() {
      try {
        setLoading(true);
        const responses = await Promise.all(FEEDS.map(url => 
          fetch(`https://api.rss2json.com/v1/api.json?rss_url=${url}`).then(res => res.json())
        ));
        let combined = responses.flatMap(data => {
            const sourceName = data.feed.title.split(' - ')[0]; 
            return (data.items || []).map((item: any) => ({ ...item, source: sourceName }));
        });
        combined.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
        setNews(combined);
        setFilteredNews(combined.slice(0, 24));
      } catch (err) { console.error("Intel Failure"); } finally { setLoading(false); }
    }
    fetchAllData();
  }, []);

  useEffect(() => {
    const results = news.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNews(results.slice(0, 24));
  }, [searchTerm, news]);

  // مكون النافذة المنبثقة (Modal)
  const Modal = ({ title, content }: { title: string, content: any }) => (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-[100] p-6 flex items-center justify-center" onClick={() => setActiveModal(null)}>
      <div className="bg-[#0a0a0a] border border-cyan-500/20 max-w-2xl w-full p-10 rounded-[2rem] relative shadow-2xl overflow-y-auto max-h-[90vh]" onClick={e => e.stopPropagation()}>
        <button onClick={() => setActiveModal(null)} className="absolute top-6 left-6 text-cyan-500 font-bold hover:scale-110 transition">إغلاق ×</button>
        <h2 className="text-3xl font-black mb-8 text-white border-b border-white/5 pb-4">{title}</h2>
        <div className="text-slate-400 leading-relaxed text-sm space-y-4">{content}</div>
      </div>
    </div>
  );

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-cyan-500 font-mono animate-pulse">Establishing Secure Connection 2026...</div>;

  return (
    <div className="min-h-screen bg-[#020202] text-slate-200" dir="rtl">
      
      {/* الشريط الأحمر بالأخبار الحقيقية */}
      <div className="bg-red-600/10 border-b border-red-600/30 py-2.5 overflow-hidden sticky top-0 z-[70] backdrop-blur-md">
        <div className="flex animate-marquee whitespace-nowrap">
          {news.slice(0, 5).map((item, i) => (
            <span key={i} className="text-red-500 font-bold text-[11px] px-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping"></span>
              عاجل من {item.source}: {item.title} 
            </span>
          ))}
        </div>
      </div>

      {/* محتوى النوافذ المنبثقة */}
      {activeModal === 'privacy' && (
        <Modal title="سياسة الخصوصية المحدثة 2026" content={
          <>
            <p>تاريخ التحديث: فبراير 2026</p>
            <p>1. <b>جمع البيانات:</b> منصة سيبرها لا تقوم بجمع أي بيانات شخصية (مثل الاسم أو رقم الهاتف) من زوارها بشكل تلقائي.</p>
            <p>2. <b>ملفات تعريف الارتباط:</b> نستخدم ملفات تعريف ارتباط تقنية فقط لضمان سرعة تحميل الأخبار وتحسين أداء البحث.</p>
            <p>3. <b>المحتوى الخارجي:</b> الروابط الموجهة لوكالات الأنباء العالمية تخضع لسياسات الخصوصية الخاصة بتلك المواقع.</p>
            <p>4. <b>أمن المعلومات:</b> نطبق أعلى معايير التشفير لضمان تصفح آمن لجميع زوار المنصة.</p>
          </>
        } />
      )}
      
      {activeModal === 'contact' && (
        <Modal title="قنوات الاتصال الرسمية" content={
          <div className="text-center py-6">
            <p className="mb-4 text-lg text-white">للتواصل بخصوص الشراكات، الإعلانات، أو الاستفسارات البرمجية:</p>
            <a href="mailto:sameaminn@proton.me" className="text-2xl font-black text-cyan-400 hover:text-white transition-colors underline decoration-cyan-500/30 underline-offset-8">
              sameaminn@proton.me
            </a>
            <p className="mt-8 text-slate-500 text-xs italic">استجابة سريعة عبر بريد البروتون المحمي.</p>
          </div>
        } />
      )}

      {activeModal === 'about' && (
        <Modal title="عن سيبرها 2026" content="سيبرها هي المركز العصبي للأمن السيبراني في المنطقة العربية. نقوم برصد وتحليل وتجميع خلاصات 5 وكالات استخبارات تقنية عالمية لنضعها بين يديك بذكاء واحترافية." />
      )}

      <nav className="p-6 border-b border-white/5 sticky top-[37px] z-50 bg-black/40 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <h1 className="text-3xl font-black text-white cursor-pointer" onClick={() => setSelectedPost(null)}>
            سيبرها<span className="text-cyan-500">.INTEL</span>
          </h1>
          <input 
            type="text" 
            placeholder="ابحث في الرادار العالمي..." 
            className="w-full md:w-80 bg-white/5 border border-white/10 rounded-xl py-2 px-6 focus:border-cyan-500 outline-none text-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-16 px-6">
        {!selectedPost ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {filteredNews.map((item, i) => (
              <article key={i} onClick={() => setSelectedPost(item)} className="bg-[#080808] border border-white/5 rounded-[2rem] overflow-hidden hover:border-cyan-500/40 transition-all cursor-pointer group shadow-2xl">
                <div className="relative h-44 overflow-hidden">
                   <div className="absolute top-3 right-3 bg-black/80 px-2 py-1 rounded text-[9px] text-cyan-500 border border-white/5 z-10">{item.source}</div>
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
            <button onClick={() => setSelectedPost(null)} className="mb-8 text-cyan-500">← العودة للرادار</button>
            <h1 className="text-4xl font-black mb-10 leading-tight">{selectedPost.title}</h1>
            <div className="prose prose-invert max-w-none text-slate-300 text-xl leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: selectedPost.content || selectedPost.description }} />
            </div>
            <div className="mt-12 text-center">
               <a href={selectedPost.link} target="_blank" className="bg-white text-black px-12 py-4 rounded-full font-black hover:bg-cyan-500 hover:text-white transition-all inline-block">تصفح المصدر: {selectedPost.source}</a>
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
          <p className="text-[10px] text-slate-800 tracking-[0.5em] uppercase">Cyberha Intelligence 2026 &copy; sameaminn@proton.me</p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 35s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
      `}</style>
    </div>
  );
}