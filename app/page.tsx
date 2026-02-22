"use client";
import { useEffect, useState } from "react";

export default function CyberhaEmpire2026() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [generatedPass, setGeneratedPass] = useState("");
  const [dailyTip, setDailyTip] = useState("");

  // مصفوفة التوعية الذكية (تختار نصيحة بناءً على اليوم)
  const tips = [
    "لا تستخدم نفس كلمة السر لأكثر من حساب، استخدم مدير كلمات سر.",
    "تجنب الشحن من شواحن عامة في المطارات (هجمات Juice Jacking).",
    "احذر من رسائل 'ربحت جائزة' التي تطلب رقم هاتفك وكود التحقق.",
    "قم بتغطية كاميرا اللابتوب عند عدم الاستخدام لضمان خصوصيتك.",
    "تأكد من تحديث تطبيق الواتساب دائماً لسد ثغرات التنصت.",
    "لا تشارك صور تذاكر الطيران أو البوردينج باس على السوشيال ميديا.",
    "استخدم تطبيق Google Authenticator بدلاً من رسائل SMS للتحقق.",
    "افحص أي ملف تحمله عبر موقع VirusTotal قبل فتحه.",
    "المؤسسات البنكية لن تطلب منك رقمك السري عبر الهاتف أبداً.",
    "احذف التطبيقات التي تطلب صلاحيات الوصول للموقع والكاميرا دون سبب.",
    "عند استخدام Wi-Fi عام، فعل دائماً خدمة VPN لتشفير بياناتك.",
    "راقب استهلاك البطارية؛ الارتفاع المفاجئ قد يعني وجود برمجيات تعدين أو تجسس."
  ];

  useEffect(() => {
    // دالة اختيار نصيحة اليوم بناءً على التاريخ (تتغير كل 24 ساعة)
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    setDailyTip(tips[dayOfYear % tips.length]);

    async function fetchData() {
      try {
        const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://www.bleepingcomputer.com/feed/`);
        const data = await res.json();
        setNews(data.items.slice(0, 9));
      } catch (e) { console.error("Intel Error"); } finally { setLoading(false); }
    }
    fetchData();
  }, []);

  const genPass = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    setGeneratedPass(Array.from({length: 16}, () => chars[Math.floor(Math.random()*chars.length)]).join(''));
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-cyan-500 font-mono">INITIALIZING SYSTEM...</div>;

  return (
    <div className="min-h-screen bg-[#020202] text-slate-200" dir="rtl">
      
      {/* 🔴 شريط الأخبار */}
      <div className="bg-red-600/10 border-b border-red-600/30 py-2 overflow-hidden sticky top-0 z-[70] backdrop-blur-md">
        <div className="flex animate-marquee whitespace-nowrap text-[10px] font-bold text-red-500 uppercase">
          {news.map((item, i) => (
            <span key={i} className="px-10">🚨 عاجل: {item.title}</span>
          ))}
        </div>
      </div>

      <nav className="p-8 border-b border-white/5 flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-4xl font-black cursor-pointer" onClick={() => setSelectedPost(null)}>سيبرها<span className="text-cyan-500">.INTEL</span></h1>
        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest hidden md:block text-left">
           Secure_Access: Granted<br/>Session_Time: 2026_Active
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-6">
        {!selectedPost ? (
          <>
            {/* 🗺️ رادار التهديدات (رابط تفاعلي لتجنب الرفض) */}
            <section className="mb-20">
               <div className="bg-gradient-to-r from-cyan-900/20 to-black border border-cyan-500/20 p-12 rounded-[3rem] text-center">
                  <h2 className="text-4xl font-black mb-4 uppercase italic">خريطة التهديدات الحية</h2>
                  <p className="text-slate-400 mb-8 max-w-xl mx-auto text-sm">بسبب بروتوكولات الأمان العالمية، يرجى فتح الرادار في نافذة مستقلة لمشاهدة الهجمات السيبرانية الحية التي ترصدها الوكالات الآن.</p>
                  <a href="https://cybermap.kaspersky.com/" target="_blank" className="bg-cyan-600 hover:bg-white hover:text-black text-white px-10 py-4 rounded-full font-black transition-all inline-block shadow-xl shadow-cyan-900/40">
                    فتح الرادار العالمي الآن ←
                  </a>
               </div>
            </section>

            {/* 🛡️ أدوات التوعية المحدثة (تتغير يومياً) */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
              <div className="bg-cyan-500/5 border border-cyan-500/10 p-10 rounded-[3rem] group hover:border-cyan-500/40 transition-all">
                <h3 className="text-2xl font-bold mb-4">🛡️ درع كلمات السر</h3>
                <div className="bg-black/50 p-4 rounded-2xl mb-6 font-mono text-cyan-500 text-center border border-white/5 tracking-widest text-lg">{generatedPass || "••••••••••••••••"}</div>
                <button onClick={genPass} className="w-full bg-cyan-600 text-white py-4 rounded-2xl font-bold hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-900/40">توليد كلمة سر معقدة</button>
              </div>

              <div className="bg-red-500/5 border border-red-500/10 p-10 rounded-[3rem] relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/10 rounded-full blur-3xl group-hover:bg-red-500/20 transition-all"></div>
                <h3 className="text-2xl font-bold mb-4 text-red-500 italic uppercase">💡 نصيحة اليوم الأمنية</h3>
                <div className="min-h-[100px] flex items-center">
                   <p className="text-xl text-slate-200 font-light leading-relaxed animate-in fade-in duration-1000">"{dailyTip}"</p>
                </div>
                <p className="mt-6 text-[10px] text-slate-600 font-mono uppercase tracking-widest">التحديث القادم: بعد 24 ساعة</p>
              </div>
            </section>

            {/* الأخبار */}
            <h2 className="text-3xl font-black mb-10 tracking-tighter uppercase italic text-white/90">آخر التقارير الاستخباراتية</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {news.map((item, i) => (
                <article key={i} onClick={() => setSelectedPost(item)} className="bg-[#080808] border border-white/5 rounded-[2rem] overflow-hidden hover:border-cyan-500/30 transition-all cursor-pointer group shadow-2xl">
                  <div className="h-44 relative">
                    <img src={item.thumbnail || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg leading-tight group-hover:text-cyan-400">{item.title}</h3>
                    <div className="mt-4 text-[9px] text-slate-600 uppercase font-mono tracking-widest font-bold">Press to Analyze +</div>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-4xl mx-auto animate-in fade-in duration-700">
             <button onClick={() => setSelectedPost(null)} className="mb-10 text-cyan-500 font-bold hover:tracking-[0.2em] transition-all uppercase text-xs">← Back to Dashboard</button>
             <h1 className="text-4xl md:text-5xl font-black mb-10 leading-[1.1]">{selectedPost.title}</h1>
             <div className="prose prose-invert max-w-none text-slate-300 text-xl leading-relaxed italic bg-white/5 p-10 rounded-[3rem] border border-white/5 shadow-2xl">
                <div dangerouslySetInnerHTML={{ __html: selectedPost.content || selectedPost.description }} />
             </div>
             <div className="mt-12 text-center">
                <a href={selectedPost.link} target="_blank" className="bg-white text-black px-12 py-5 rounded-full font-black hover:bg-cyan-500 hover:text-white transition-all shadow-2xl inline-block uppercase text-sm tracking-widest">Explore Full Report</a>
             </div>
          </div>
        )}
      </main>

      <footer className="py-20 border-t border-white/5 bg-black/50 mt-20 text-center">
          <p className="text-[10px] text-slate-800 tracking-[0.5em] mb-4 uppercase">Cyberha Intel &copy; 2026 | sameaminn@proton.me</p>
          <div className="flex justify-center gap-6 text-[9px] font-bold text-slate-600">
             <span>Security Protocol: AES-256</span>
             <span>Status: Monitoring</span>
          </div>
      </footer>

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 30s linear infinite; }
      `}</style>
    </div>
  );
}