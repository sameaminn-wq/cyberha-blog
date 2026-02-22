"use client";
import { useEffect, useState } from "react";

export default function CyberhaMasterSystem() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [generatedPass, setGeneratedPass] = useState("");
  const [targetLink, setTargetLink] = useState("");

  // 📡 نظام جلب التقارير ومعالجة الصور الأصلية
  useEffect(() => {
    async function fetchIntel() {
      try {
        // جلب البيانات من المصدر العالمي عبر RSS to JSON
        const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://thehackernews.com/rss`);
        const data = await res.json();
        
        // معالجة كل تقرير لاستخراج الصورة الأصلية من داخل المحتوى (Description)
        const processed = data.items.map((item: any) => {
          let imgUrl = item.thumbnail;
          // إذا كانت الصورة مفقودة أو صغيرة، نقوم بالبحث عنها داخل وصف المقال
          if (!imgUrl || imgUrl.includes("standard")) {
            const match = item.description.match(/<img[^>]+src="([^">]+)"/);
            imgUrl = match ? match[1] : "https://images.unsplash.com/photo-1550751827-4bd374c3f58b";
          }
          return { ...item, originalImg: imgUrl };
        });

        setNews(processed);
      } catch (e) { 
        console.error("Link Failure: Intelligence feed disconnected."); 
      } finally { 
        setLoading(false); 
      }
    }
    fetchIntel();
  }, []);

  // 🛡️ دالة توليد كلمات السر (الترسانة)
  const genPass = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*";
    setGeneratedPass(Array.from({length: 18}, () => chars[Math.floor(Math.random()*chars.length)]).join(''));
  };

  if (loading) return (
    <div className="min-h-screen bg-[#05070a] flex items-center justify-center font-mono text-[#00f2ff]">
      <div className="flex flex-col items-center gap-6">
        <div className="w-12 h-[1px] bg-[#00f2ff] animate-pulse shadow-[0_0_10px_#00f2ff]"></div>
        <p className="tracking-[0.6em] text-[10px] uppercase italic">Establishing Secure Node...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#05070a] text-[#e6edf3] font-sans selection:bg-[#00f2ff] selection:text-black" dir="ltr">
      
      {/* 🔴 الشريط الإخباري الحي (TICKER) */}
      <div className="bg-[#ff2a2a]/5 border-b border-[#ff2a2a]/20 py-3 overflow-hidden sticky top-0 z-[70] backdrop-blur-md">
        <div className="flex animate-marquee whitespace-nowrap text-[10px] font-bold text-[#ff2a2a] tracking-widest uppercase italic">
          {news.slice(0, 8).map((item, i) => (
            <span key={i} className="px-12 flex items-center gap-2">
              <span className="w-1 h-1 bg-[#ff2a2a] rounded-full shadow-[0_0_8px_#ff2a2a]"></span>
              URGENT_INTEL: {item.title}
            </span>
          ))}
        </div>
      </div>

      <nav className="p-10 flex justify-between items-center max-w-7xl mx-auto">
        <div className="group cursor-pointer" onClick={() => setSelectedPost(null)}>
          <h1 className="text-3xl font-black tracking-tighter italic uppercase">
            CYBERHA<span className="text-[#00f2ff]">.INTEL</span>
          </h1>
          <div className="h-[2px] w-0 group-hover:w-full bg-[#00f2ff] transition-all duration-700"></div>
        </div>
        <div className="text-[9px] font-mono text-slate-600 text-right uppercase tracking-[0.3em]">
           Operational: 2026.V2<br/>Protocol: <span className="text-green-500">ENCRYPTED</span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-10 px-6">
        {!selectedPost ? (
          <>
            {/* 🛡️ THE CYBER ARSENAL (أدوات التوعية) */}
            <h2 className="text-center text-[10px] font-black text-slate-800 uppercase tracking-[1.2em] mb-12 italic">The Cyber Arsenal</h2>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              
              {/* أداة 1: مولد كلمات السر */}
              <div className="bg-[#0d1117] border border-white/5 p-10 rounded-[2.5rem] hover:border-[#00f2ff]/30 transition-all shadow-2xl">
                <h3 className="text-[#00f2ff] font-bold text-xs uppercase italic mb-6">Password Shield</h3>
                <div className="bg-black/50 p-5 rounded-2xl mb-6 font-mono text-center text-[#00f2ff] border border-white/5 min-h-[60px] flex items-center justify-center text-lg">
                  {generatedPass || "••••••••••••••••"}
                </div>
                <button onClick={genPass} className="w-full bg-[#00f2ff] hover:bg-white text-black font-black py-4 rounded-xl text-[10px] uppercase tracking-widest transition-all">Execute Key Gen</button>
              </div>

              {/* أداة 2: فاحص الروابط */}
              <div className="bg-[#0d1117] border border-white/5 p-10 rounded-[2.5rem] hover:border-[#00f2ff]/30 transition-all shadow-2xl">
                <h3 className="text-[#00f2ff] font-bold text-xs uppercase italic mb-6">Link Sentinel</h3>
                <input 
                  type="text" 
                  placeholder="Paste URL to scan..." 
                  className="w-full bg-black/50 border border-white/10 p-4 rounded-xl mb-6 text-xs text-white focus:outline-none focus:border-[#00f2ff] placeholder:text-slate-800"
                  onChange={(e) => setTargetLink(e.target.value)}
                />
                <button 
                  onClick={() => window.open(`https://www.virustotal.com/gui/search/${encodeURIComponent(targetLink)}`, '_blank')}
                  className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black py-4 rounded-xl text-[10px] uppercase tracking-widest transition-all"
                >Scan Tactical Link</button>
              </div>

              {/* أداة 3: فاحص التسريبات */}
              <div className="bg-[#0d1117] border border-white/5 p-10 rounded-[2.5rem] hover:border-[#ff2a2a]/30 transition-all shadow-2xl">
                <h3 className="text-[#ff2a2a] font-bold text-xs uppercase italic mb-6">Breach Radar</h3>
                <p className="text-[10px] text-slate-500 mb-8 font-light italic leading-relaxed">Analyze global databases to detect if your digital identity has been compromised in recent leaks.</p>
                <button 
                  onClick={() => window.open('https://haveibeenpwned.com/', '_blank')}
                  className="w-full bg-[#ff2a2a]/10 border border-[#ff2a2a]/20 hover:bg-[#ff2a2a]/20 text-[#ff2a2a] font-black py-4 rounded-xl text-[10px] uppercase tracking-widest transition-all"
                >Execute Leak Scan</button>
              </div>
            </section>

            {/* 📊 REPORTS FEED (التقارير مع الصور الأصلية) */}
            <div className="flex items-center gap-6 mb-12 px-2">
               <h2 className="text-2xl font-black uppercase tracking-tighter italic">Intelligence Reports</h2>
               <div className="h-[1px] flex-grow bg-white/5 shadow-[0_0_10px_white]"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {news.map((item, i) => (
                <article key={i} onClick={() => setSelectedPost(item)} className="group bg-[#0d1117] border border-white/5 rounded-[3rem] overflow-hidden hover:scale-[1.03] transition-all duration-700 cursor-pointer shadow-2xl">
                  <div className="h-56 relative overflow-hidden bg-[#05070a]">
                    <img src={item.originalImg} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" alt="Cyber Report Image" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] to-transparent"></div>
                  </div>
                  <div className="p-8">
                    <h3 className="font-bold text-lg mb-6 group-hover:text-[#00f2ff] transition-colors leading-snug line-clamp-2 italic">{item.title}</h3>
                    <div className="flex justify-between items-center text-[9px] font-black text-slate-700 tracking-[0.2em] uppercase">
                       <span>Read Full Intel →</span>
                       <span className="italic opacity-30">{new Date(item.pubDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-10 duration-1000">
             <button onClick={() => setSelectedPost(null)} className="mb-12 text-[#00f2ff] font-black text-[10px] tracking-[0.4em] flex items-center gap-3 hover:gap-6 transition-all uppercase italic">
                <span>←</span> Return to Dashboard
             </button>
             
             {/* عرض الصورة الأصلية للخبر بشكل كبير */}
             <div className="w-full h-[450px] rounded-[3.5rem] overflow-hidden mb-12 border border-white/10 shadow-2xl">
                <img src={selectedPost.originalImg} className="w-full h-full object-cover shadow-[inset_0_0_100px_black]" alt="Header" />
             </div>

             <h1 className="text-5xl md:text-7xl font-black mb-12 tracking-tighter leading-[0.95] italic">{selectedPost.title}</h1>
             
             <div className="prose prose-invert max-w-none text-slate-400 text-xl leading-relaxed bg-[#0d1117] p-12 rounded-[3.5rem] border border-white/5 shadow-2xl font-light italic">
                <div dangerouslySetInnerHTML={{ __html: selectedPost.content || selectedPost.description }} />
             </div>
             
             <div className="mt-16 text-center">
                <a href={selectedPost.link} target="_blank" className="px-16 py-6 bg-white text-black rounded-full font-black hover:bg-[#00f2ff] transition-all shadow-2xl uppercase text-[10px] tracking-[0.4em] italic">Open Original Dispatch</a>
             </div>
          </div>
        )}
      </main>

      <footer className="py-24 border-t border-white/5 bg-black/40 mt-24 text-center">
          <div className="flex justify-center gap-12 mb-12 text-[10px] font-black text-slate-500 uppercase tracking-widest italic">
             <button onClick={() => setActiveModal('about')} className="hover:text-[#00f2ff]">About_Hub</button>
             <button onClick={() => setActiveModal('privacy')} className="hover:text-[#00f2ff]">Compliance_2026</button>
             <button onClick={() => setActiveModal('contact')} className="hover:text-[#00f2ff]">Secure_Contact</button>
          </div>
          <p className="text-[9px] text-slate-900 tracking-[1.2em] mb-4 uppercase italic font-black">Cyberha Intel // Infrastructure Node</p>
          <div className="text-[8px] font-mono text-[#00f2ff]/20 tracking-widest">sameaminn@proton.me</div>
      </footer>

      {/* مودال سياسة الخصوصية والتوافق مع أدسنس */}
      {activeModal === 'privacy' && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-[100] flex items-center justify-center p-6">
           <div className="bg-[#0d1117] border border-white/10 max-w-2xl w-full p-12 rounded-[3.5rem] shadow-2xl">
              <h2 className="text-2xl font-black text-[#00f2ff] uppercase italic mb-8 tracking-tighter">Privacy Protocol</h2>
              <div className="text-slate-500 text-sm leading-relaxed space-y-4 font-light italic">
                 <p>1. <b>Zero Log:</b> We do not collect or store visitor information.</p>
                 <p>2. <b>Monetization:</b> This node uses Google AdSense and third-party tactical partners. They may use cookies to deliver context-aware intelligence.</p>
                 <p>3. <b>Affiliate:</b> Some links may generate a commission for node maintenance.</p>
              </div>
              <button onClick={() => setActiveModal(null)} className="mt-10 w-full py-4 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#00f2ff] hover:text-black transition-all">Close Terminal</button>
           </div>
        </div>
      )}

      {/* مودالات أخرى */}
      {activeModal === 'contact' && <div className="fixed inset-0 bg-black/95 flex items-center justify-center p-6 z-[100] backdrop-blur-xl animate-in fade-in italic font-black" onClick={() => setActiveModal(null)}>sameaminn@proton.me</div>}

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 45s linear infinite; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  );
}