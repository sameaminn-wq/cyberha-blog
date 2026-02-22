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
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] p-6 flex items-center justify-center">
      <div className="bg-[#0a0a0a] border border-white/10 max-w-2xl w-full max-h-[80vh] overflow-y-auto p-10 rounded-3xl relative shadow-2xl">
        <button onClick={() => setActiveModal(null)} className="absolute top-6 left-6 text-cyan-500 font-bold">إغلاق ×</button>
        <h2 className="text-3xl font-black mb-6 text-white border-b border-cyan-500/20 pb-4">{title}</h2>
        <div className="text-slate-300 leading-loose text-sm whitespace-pre-wrap">{content}</div>
      </div>
    </div>
  );

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-cyan-500 animate-pulse font-mono">[جاري بناء المنصة السيبرانية...]</div>;

  return (
    <div className="min-h-screen bg-[#020202] text-slate-200" dir="rtl">
      {activeModal === 'privacy' && <Modal title="سياسة الخصوصية" content="في سيبرها، نلتزم بحماية خصوصيتك. نحن لا نجمع بيانات شخصية عن الزوار. الأخبار المعروضة هي خلاصات عامة من وكالات عالمية. نستخدم ملفات تعريف الارتباط لتحسين تجربة المستخدم فقط." />}
      {activeModal === 'about' && <Modal title="من نحن" content="سيبرها هي منصة رائدة لرصد الأخبار والتهديدات السيبرانية عالمياً. هدفنا هو تزويد المحترفين والمهتمين بالأمن الرقمي بأحدث المعلومات من 5 مصادر عالمية كبرى في مكان واحد." />}
      {activeModal === 'contact' && <Modal title="اتصل بنا" content="للتواصل معنا بخصوص الاستفسارات البرمجية أو الإعلانات: support@cyberha.live" />}

      <nav className="border-b border-white/5 p-6 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-black text-white cursor-pointer" onClick={() => setSelectedPost(null)}>سيبرها<span className="text-cyan-500">.LIVE</span></h1>
          <input 
            type="text" 
            placeholder="ابحث عن ثغرة..." 
            className="bg-white/5 border border-white/10 rounded-full py-2 px-6 w-full md:w-80 focus:border-cyan-500 outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-6">
        {!selectedPost ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredNews.map((item, i) => (
              <article key={i} onClick={() => setSelectedPost(item)} className="bg-[#080808] border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/40 transition-all cursor-pointer">
                <img src={item.thumbnail || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"} className="h-44 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-lg font-bold group-hover:text-cyan-400">{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto animate-in fade-in duration-700 text-right">
            <button onClick={() => setSelectedPost(null)} className="mb-8 text-cyan-500">← العودة للرئيسية</button>
            <h1 className="text-4xl font-black mb-10 leading-tight">{selectedPost.title}</h1>
            <div className="prose prose-invert max-w-none text-slate-300 text-xl leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: selectedPost.content || selectedPost.description }} />
            </div>
          </div>
        )}
      </main>

      {/* Footer مع الصفحات القانونية المطلوبة لجوجل */}
      <footer className="py-20 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <div className="flex gap-8 mb-8 text-xs font-bold text-slate-500">
            <button onClick={() => setActiveModal('about')} className="hover:text-cyan-500">من نحن</button>
            <button onClick={() => setActiveModal('privacy')} className="hover:text-cyan-500">سياسة الخصوصية</button>
            <button onClick={() => setActiveModal('contact')} className="hover:text-cyan-500">اتصل بنا</button>
          </div>
          <p className="text-[10px] text-slate-700 tracking-[0.5em]">CYBERHA GLOBAL HUB &copy; 2026</p>
        </div>
      </footer>
    </div>
  );
}