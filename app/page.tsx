"use client";
import { useEffect, useState } from "react";

export default function CyberhaUltimate2026() {
  const [news, setNews] = useState<any[]>([]);
  const [filteredNews, setFilteredNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // 🌍 الربط مع وكالات الاستخبارات التقنية العالمية
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
            const sourceName = data.feed?.title?.split(' - ')[0] || "Global Source"; 
            return (data.items || []).map((item: any) => ({ ...item, source: sourceName }));
        });

        combined.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
        setNews(combined);
        setFilteredNews(combined.slice(0, 24));
      } catch (err) {
        console.error("Critical Intel Failure");
      } finally {
        setLoading(false);
      }
    }
    fetchAllData();
  }, []);

  // محرك البحث الفوري
  useEffect(() => {
    const results = news.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNews(results.slice(0, 24));
  }, [searchTerm, news]);

  // مكون النوافذ المنبثقة القانونية
  const Modal = ({ title, content }: { title: string, content: any }) => (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-[100] p-6 flex items-center justify-center" onClick={() => setActiveModal(null)}>
      <div className="bg-[#0a0a0a] border border-cyan-500/20 max-w-2xl w-full p-10 rounded-[2.5rem] relative shadow-2xl overflow-y-auto max-h-[90vh]" onClick={e => e.stopPropagation()}>
        <button onClick={() => setActiveModal(null)} className="absolute top-6 left-6 text-cyan-500 font-black hover:scale-110 transition">إغلاق ×</button>
        <h2 className="text-3xl font-black mb-8 text-white border-b border-white/5 pb-4">{title}</h2>
        <div className="text-slate-400 leading-relaxed text-sm space-y-4">{content}</div>
      </div>
    </div>
  );

  if (loading) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono text-cyan-500 animate-pulse">
      <div className="mb-4 text-2xl tracking-[0.3em]">CYBERHA.INTEL</div>
      <div className="text-xs">[Establishing Encrypted Link to Global Feeds...]</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020202] text-slate-200 selection:bg-cyan-500 selection:text-black" dir="rtl">
      
      {/* 🔴 شريط التنبيهات الأحمر (أخبار حقيقية مباشرة) */}
      <div className="bg-red-600/10 border-b border-red-600/30 py-2.5 overflow-hidden sticky top-0 z-[70] backdrop-blur-md">
        <div className="flex animate-marquee whitespace-nowrap">
          {news.slice(0, 8).map((item, i) => (
            <span key={i} className="text-red-500 font-bold text-[11px] px-10 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping"></span>
              عاجل من {item.source}: {item.title} 
            </span>
          ))}
        </div>
      </div>

      {/* مودالات الصفحات القانونية */}
      {activeModal === 'privacy' && (
        <Modal title="سياسة الخصوصية 2026" content={
          <div className="space-y-4 text-right">
            <p className="text-cyan-500 font-bold italic">آخر تحديث: فبراير 2026</p>
            <p>1. <b>حماية الزوار:</b> نحن في منصة سيبرها لا نقوم بجمع أو تخزين أي بيانات شخصية تخص المستخدمين نهائياً.</p>
            <p>2. <b>المصادر الخارجية:</b> المحتوى المعروض يتم جلبه آلياً من وكالات أنباء عالمية، والروابط الخارجية تتبع سياسات تلك المواقع.</p>
            <p>3. <b>ملفات تعريف الارتباط:</b> نستخدم ملفات Cache مؤقتة لضمان سرعة عرض الأخبار والبحث فقط.</p>
            <p>4. <b>الأمان:</b> تصفحك للموقع محمي بالكامل عبر بروتوكولات تشفير SSL المتقدمة.</p>
          </div>
        } />
      )}
      
      {activeModal === 'contact' && (
        <Modal title="قنوات الاتصال الرسمية" content={
          <div className="text-center py-10">
            <p className="mb-6 text-lg text-white font-light">للاستفسارات الأمنية، الإعلانات، أو طلبات الشراكة:</p>
            <a href="mailto:sameaminn@proton.me" className="text-2xl font-black text-cyan-400 hover:text-white transition-all underline decoration-cyan-500/20 underline-offset-8">
              sameaminn@proton.me
            </a>
            <p className="mt-10 text-slate-500 text-[10px] tracking-widest uppercase italic">Secure Communication via ProtonMail</p>
          </div>
        } />
      )}

      {activeModal === 'about' && (
        <Modal title="عن سيبرها.LIVE" content="سيبرها هي أول رادار عربي متخصص في جمع وتحليل الأخبار الأمنية من 5 وكالات استخبارات تقنية عالمية. نحن نوفر لك المعلومة فور صدورها في لندن أو نيويورك، لتكون دائماً على دراية بأحدث التهديدات الرقمية." />
      )}

      <nav className="p-6 border-b border-white/5 sticky top-[37px] z-50 bg-black/40 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-right">
            <h1 className="text-3xl font-black text-white tracking-tighter cursor-pointer" onClick={() => setSelectedPost(null)}>
              سيبرها<span className="text-cyan-500">.INTEL</span>
            </h1>
            <p className="text-[8px] font-mono text-cyan-800 tracking-[0.4em] uppercase">Global Threat Radar Active</p>
          </div>
          
          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="ابحث في قاعدة بيانات الثغرات..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-6 focus:border-cyan-500 outline-none text-sm font-light transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-16 px-6">
        {!selectedPost ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredNews.map((item, i) => (
              <article key={i} onClick={() => setSelectedPost(item)} className="group bg-[#080808] border border-white/5 rounded-[2rem] overflow-hidden hover:border-cyan-500/30 transition-all duration-500 cursor-pointer shadow-2xl flex flex-col h-full">
                <div className="relative h-52 overflow-hidden">
                   <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[9px] text-cyan-400 border border-white/5 z-10 font-mono tracking-tighter">
                      SOURCE: {item.source}
                   </div>
                   <img src={item.thumbnail || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"} className="h-full w-full object-cover group-hover:scale-110 transition duration-1000 opacity-80 group-hover:opacity-100" />
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold group-hover:text-cyan-400 transition-colors leading-tight mb-4">{item.title}</h3>
                  <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center">
                     <span className="text-[10px] text-slate-600 font-mono">{new Date(item.pubDate).toLocaleDateString()}</span>
                     <span className="text-cyan-600 text-[10px] font-black uppercase tracking-widest">عرض التقرير +</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <button onClick={() => setSelectedPost(null)} className="mb-10 text-cyan-500 font-bold hover:tracking-widest transition-all">← العودة للاستخبارات العالمية</button>
            <img src={selectedPost.thumbnail} className="w-full rounded-[3rem] mb-12 shadow-2xl border border-white/10" />
            <h1 className="text-4xl md:text-5xl font-black mb-10 leading-[1.1] text-white tracking-tighter">{selectedPost.title}</h1>
            <div className="prose prose-invert max-w-none text-slate-300 leading-[2] text-xl font-light italic bg-white/5 p-8 rounded-3xl border border-white/5">
              <div dangerouslySetInnerHTML={{ __html: selectedPost.content || selectedPost.description }} />
            </div>
            <div className="mt-16 text-center">
               <a href={selectedPost.link} target="_blank" className="bg-white text-black px-12 py-5 rounded-full font-black hover:bg-cyan-500 hover:text-white transition-all shadow-2xl inline-block">تصفح المصدر الأصلي: {selectedPost.source}</a>
            </div>
          </div>
        )}
      </main>

      <footer className="py-24 border-t border-white/5 bg-black/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-12 mb-12 text-xs font-bold text-slate-500">
            <button onClick={() => setActiveModal('about')} className="hover:text-cyan-500 transition-colors">من نحن</button>
            <button onClick={() => setActiveModal('privacy')} className="hover:text-cyan-500 transition-colors">سياسة الخصوصية</button>
            <button onClick={() => setActiveModal('contact')} className="hover:text-cyan-500 transition-colors">اتصل بنا</button>
          </div>
          <p className="text-[9px] text-slate-800 tracking-[0.4em] uppercase mb-4">Cyberha Intelligence Network &copy; 2026</p>
          <p className="text-[8px] text-slate-900 font-mono tracking-widest">OFFICIAL INQUIRIES: sameaminn@proton.me</p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 40s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
      `}</style>
    </div>
  );
}