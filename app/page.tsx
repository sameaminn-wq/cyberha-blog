"use client";
import { useEffect, useState } from "react";

export default function CyberhaEmpire2026() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [generatedPass, setGeneratedPass] = useState("");

  const FEEDS = [
    "https://www.bleepingcomputer.com/feed/",
    "https://thehackernews.com/rss",
    "https://www.darkreading.com/rss.xml"
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const responses = await Promise.all(FEEDS.map(url => fetch(`https://api.rss2json.com/v1/api.json?rss_url=${url}`).then(r => r.json())));
        let combined = responses.flatMap(data => (data.items || []).map((item: any) => ({ ...item, source: data.feed.title.split(' ')[0] })));
        combined.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
        setNews(combined.slice(0, 12));
      } catch (e) { console.error("Intel Error"); } finally { setLoading(false); }
    }
    fetchData();
  }, []);

  const genPass = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    setGeneratedPass(Array.from({length: 16}, () => chars[Math.floor(Math.random()*chars.length)]).join(''));
  };

  const Modal = ({ title, content }: { title: string, content: any }) => (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-[100] p-6 flex items-center justify-center" onClick={() => setActiveModal(null)}>
      <div className="bg-[#0a0a0a] border border-cyan-500/20 max-w-2xl w-full p-10 rounded-[2.5rem] relative" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-black mb-6 text-cyan-500">{title}</h2>
        <div className="text-slate-400 leading-relaxed">{content}</div>
        <button onClick={() => setActiveModal(null)} className="mt-8 text-white font-bold bg-cyan-900/30 px-6 py-2 rounded-full">إغلاق</button>
      </div>
    </div>
  );

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-cyan-500 font-mono animate-pulse">LOADING CYBERHA CORE...</div>;

  return (
    <div className="min-h-screen bg-[#020202] text-slate-200" dir="rtl">
      
      {/* 1. الشريط الأحمر الحي */}
      <div className="bg-red-600/10 border-b border-red-600/30 py-2 overflow-hidden sticky top-0 z-[70] backdrop-blur-md text-[10px] font-bold text-red-500">
        <div className="flex animate-marquee whitespace-nowrap">
          {news.slice(0, 5).map((item, i) => (
            <span key={i} className="px-10">🔴 عاجل: {item.title} ({item.source})</span>
          ))}
        </div>
      </div>

      <nav className="p-8 border-b border-white/5 flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-4xl font-black tracking-tighter cursor-pointer" onClick={() => setSelectedPost(null)}>سيبرها<span className="text-cyan-500">.INTEL</span></h1>
        <div className="hidden md:flex gap-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
           <span className="text-green-500 animate-pulse">● System Online</span>
           <span>Server: Global_v2</span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-6">
        
        {!selectedPost ? (
          <>
            {/* 2. خريطة التهديدات الحية (Strategic View) */}
            <section className="mb-20">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="text-3xl font-black">رادار التهديدات <span className="text-cyan-500">العالمي</span></h2>
                  <p className="text-slate-500 text-xs">مراقبة حية للهجمات السيبرانية في الوقت الفعلي</p>
                </div>
              </div>
              <div className="h-[400px] w-full rounded-[2.5rem] overflow-hidden border border-white/5 bg-slate-900/20 relative group">
                {/* دمج خريطة كاسبرسكي الحية */}
                <iframe src="https://cybermap.kaspersky.com/en/widget/visual" width="100%" height="100%" frameBorder="0"></iframe>
                <div className="absolute inset-0 pointer-events-none border-[20px] border-[#020202] rounded-[2.5rem]"></div>
              </div>
            </section>

            {/* 3. أدوات التوعية التفاعلية */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
              <div className="bg-cyan-500/5 border border-cyan-500/10 p-10 rounded-[3rem]">
                <h3 className="text-2xl font-bold mb-4">🛡️ درع كلمات السر</h3>
                <p className="text-slate-400 text-sm mb-6 font-light">ولد كلمة سر يستحيل كسرها بهجمات القوة الغاشمة.</p>
                <div className="bg-black/50 p-4 rounded-2xl mb-4 font-mono text-cyan-500 text-center border border-white/5 tracking-widest">{generatedPass || "••••••••••••••••"}</div>
                <button onClick={genPass} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-cyan-900/20">توليد كلمة سر معقدة</button>
              </div>

              <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4 text-white">📡 مركز التوعية</h3>
                <ul className="space-y-4 text-sm text-slate-400">
                  <li className="flex gap-2"> <span className="text-cyan-500">✔</span> لا تقم بتثبيت تطبيقات من خارج المتاجر الرسمية.</li>
                  <li className="flex gap-2"> <span className="text-cyan-500">✔</span> تأكد من وجود قفل الحماية (HTTPS) قبل إدخال بياناتك.</li>
                  <li className="flex gap-2"> <span className="text-cyan-500">✔</span> حدّث راوتر المنزل وكلمة سر الواي فاي دورياً.</li>
                </ul>
              </div>
            </section>

            {/* 4. قسم الأخبار العالمي */}
            <h2 className="text-3xl font-black mb-10">آخر <span className="text-cyan-500">الاستخبارات التقنية</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {news.map((item, i) => (
                <article key={i} onClick={() => setSelectedPost(item)} className="bg-[#080808] border border-white/5 rounded-[2rem] overflow-hidden hover:border-cyan-500/30 transition-all cursor-pointer group">
                  <div className="h-40 relative overflow-hidden">
                    <img src={item.thumbnail || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition duration-700" />
                    <div className="absolute bottom-4 right-4 bg-black/80 px-3 py-1 rounded-full text-[8px] text-cyan-400 font-mono tracking-tighter border border-white/5">{item.source}</div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg leading-tight group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700">
             <button onClick={() => setSelectedPost(null)} className="mb-10 text-cyan-500 font-bold">← عودة للرادار</button>
             <h1 className="text-4xl font-black mb-10 leading-tight">{selectedPost.title}</h1>
             <div className="prose prose-invert max-w-none text-slate-300 text-lg leading-relaxed bg-white/5 p-8 rounded-[2rem] border border-white/5 shadow-inner">
                <div dangerouslySetInnerHTML={{ __html: selectedPost.content || selectedPost.description }} />
             </div>
             <div className="mt-12 text-center">
                <a href={selectedPost.link} target="_blank" className="bg-white text-black px-12 py-4 rounded-full font-black hover:bg-cyan-500 hover:text-white transition-all inline-block shadow-2xl">تصفح المصدر الأصلي</a>
             </div>
          </div>
        )}
      </main>

      {/* 5. الفوتر القانوني والاتصال */}
      <footer className="py-24 border-t border-white/5 bg-black/50 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-12 mb-12 text-xs font-bold text-slate-500">
            <button onClick={() => setActiveModal('privacy')} className="hover:text-cyan-500 transition-colors">سياسة الخصوصية 2026</button>
            <button onClick={() => setActiveModal('about')} className="hover:text-cyan-500 transition-colors">عن سيبرها</button>
            <button onClick={() => setActiveModal('contact')} className="hover:text-cyan-500 transition-colors">اتصل بنا</button>
          </div>
          <p className="text-[10px] text-slate-800 tracking-[0.5em] mb-4">CYBERHA HUB &copy; sameaminn@proton.me</p>
        </div>
      </footer>

      {activeModal === 'privacy' && <Modal title="سياسة الخصوصية 2026" content={<p>سيبرها تلتزم بحماية الخصوصية المطلقة للزوار. لا نقوم بجمع أي بيانات تعريفية، والموقع مؤمن بالكامل لعام 2026 وفق المعايير العالمية.</p>} />}
      {activeModal === 'contact' && <Modal title="اتصل بنا" content={<p className="text-center py-6 text-xl">راسلنا رسمياً عبر:<br/><span className="text-cyan-400 font-black">sameaminn@proton.me</span></p>} />}
      {activeModal === 'about' && <Modal title="عن سيبرها" content={<p>أول منصة عربية تدمج بين استخبارات التهديدات العالمية وأدوات التوعية الأمنية التفاعلية في مكان واحد.</p>} />}

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 35s linear infinite; }
      `}</style>
    </div>
  );
}