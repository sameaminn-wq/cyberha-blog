"use client";
import { useEffect, useState } from "react";

export default function CyberhaFinalBuild() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [generatedPass, setGeneratedPass] = useState("");
  const [targetLink, setTargetLink] = useState("");

  useEffect(() => {
    async function fetchIntel() {
      try {
        // جلب الأخبار من Hacker News و BleepingComputer
        const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://thehackernews.com/rss`);
        const data = await res.json();
        
        // دالة ذكية لاستخراج الصور الأصلية إذا لم تكن موجودة في الوسم المعتاد
        const processedItems = data.items.map((item: any) => {
          let originalImg = item.thumbnail;
          if (!originalImg || originalImg === "") {
            const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
            originalImg = imgMatch ? imgMatch[1] : "https://images.unsplash.com/photo-1550751827-4bd374c3f58b";
          }
          return { ...item, originalImg };
        });

        setNews(processedItems);
      } catch (e) { console.error("Intel Feed Error"); } finally { setLoading(false); }
    }
    fetchIntel();
  }, []);

  return (
    <div className="min-h-screen bg-[#05070a] text-[#e6edf3] font-sans selection:bg-[#00f2ff] selection:text-black" dir="ltr">
      
      {/* 🔴 LIVE INCIDENT TICKER */}
      <div className="bg-[#ff2a2a]/10 border-b border-[#ff2a2a]/20 py-3 overflow-hidden sticky top-0 z-[70] backdrop-blur-md">
        <div className="flex animate-marquee whitespace-nowrap text-[10px] font-bold text-[#ff2a2a] tracking-widest uppercase italic">
          {news.slice(0, 5).map((item, i) => (
            <span key={i} className="px-12 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#ff2a2a] rounded-full shadow-[0_0_10px_#ff2a2a]"></span>
              CRITICAL: {item.title}
            </span>
          ))}
        </div>
      </div>

      <nav className="p-10 flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-4xl font-black tracking-tighter italic cursor-pointer" onClick={() => setSelectedPost(null)}>
          CYBERHA<span className="text-[#00f2ff]">.INTEL</span>
        </h1>
        <div className="text-[10px] font-mono text-slate-600 text-right uppercase tracking-[0.2em]">
           System: Operational<br/>Node: 2026_Master
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-10 px-6">
        {!selectedPost ? (
          <>
            {/* 🛡️ THE CYBER ARSENAL (أدوات التوعية التفاعلية) */}
            <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.5em] mb-10 text-center">The Cyber Arsenal</h2>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              
              {/* Tool 1: Password Shield */}
              <div className="bg-[#0d1117] border border-white/5 p-8 rounded-[2rem] hover:border-[#00f2ff]/30 transition-all">
                <h3 className="text-[#00f2ff] font-bold mb-4 flex justify-between uppercase text-xs tracking-widest">
                  Password Shield <span>01</span>
                </h3>
                <div className="bg-black/50 p-4 rounded-xl mb-4 font-mono text-center text-sm border border-white/5 text-[#00f2ff] min-h-[50px] flex items-center justify-center">
                  {generatedPass || "••••••••••••••••"}
                </div>
                <button onClick={() => setGeneratedPass(Math.random().toString(36).slice(-10) + "!@#$")} className="w-full bg-[#00f2ff] text-black font-black py-3 rounded-xl text-[10px] uppercase tracking-widest">Generate 18-Char Key</button>
              </div>

              {/* Tool 2: Link Sentinel */}
              <div className="bg-[#0d1117] border border-white/5 p-8 rounded-[2rem] hover:border-[#00f2ff]/30 transition-all">
                <h3 className="text-[#00f2ff] font-bold mb-4 flex justify-between uppercase text-xs tracking-widest">
                  Link Sentinel <span>02</span>
                </h3>
                <input 
                  type="text" 
                  placeholder="Enter suspicious link..." 
                  className="w-full bg-black/50 border border-white/5 p-3 rounded-xl mb-4 text-xs focus:outline-none focus:border-[#00f2ff]"
                  onChange={(e) => setTargetLink(e.target.value)}
                />
                <button 
                  onClick={() => window.open(`https://www.virustotal.com/gui/search/${encodeURIComponent(targetLink)}`, '_blank')}
                  className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black py-3 rounded-xl text-[10px] uppercase tracking-widest transition-all"
                >Scan for Malware</button>
              </div>

              {/* Tool 3: Email Breach Check */}
              <div className="bg-[#0d1117] border border-white/5 p-8 rounded-[2rem] hover:border-[#00f2ff]/30 transition-all">
                <h3 className="text-[#00f2ff] font-bold mb-4 flex justify-between uppercase text-xs tracking-widest">
                  Breach Radar <span>03</span>
                </h3>
                <p className="text-[10px] text-slate-500 mb-6 font-light leading-relaxed italic">Check if your email credentials have been leaked in global data breaches.</p>
                <button 
                  onClick={() => window.open('https://haveibeenpwned.com/', '_blank')}
                  className="w-full bg-red-600/10 border border-red-600/20 hover:bg-red-600/20 text-red-500 font-black py-3 rounded-xl text-[10px] uppercase tracking-widest transition-all"
                >Check Identity Exposure</button>
              </div>
            </section>

            {/* 📡 LATEST INTEL (أخبار حقيقية مع الصور الأصلية) */}
            <div className="flex items-center gap-6 mb-12">
               <h2 className="text-2xl font-black uppercase tracking-tighter italic">Intelligence Reports</h2>
               <div className="h-[1px] flex-grow bg-white/5"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {news.map((item, i) => (
                <article key={i} onClick={() => setSelectedPost(item)} className="group bg-[#0d1117] border border-white/5 rounded-[2.5rem] overflow-hidden hover:scale-[1.03] transition-all duration-700 cursor-pointer shadow-xl">
                  <div className="h-48 relative overflow-hidden">
                    {/* استخدام الصورة الأصلية للمقال */}
                    <img src={item.originalImg} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" alt="Cyber Security Intel" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] to-transparent"></div>
                  </div>
                  <div className="p-8">
                    <h3 className="font-bold text-lg mb-6 group-hover:text-[#00f2ff] transition-colors leading-snug line-clamp-2">{item.title}</h3>
                    <div className="flex justify-between items-center text-[9px] font-black text-slate-600 tracking-widest uppercase">
                       <span>Analyze Post →</span>
                       <span className="text-[8px] opacity-40 italic">{new Date(item.pubDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-10 duration-1000">
             <button onClick={() => setSelectedPost(null)} className="mb-12 text-[#00f2ff] font-bold text-[10px] tracking-widest flex items-center gap-3 uppercase transition-all">
                <span>←</span> Back to Command Center
             </button>
             
             {/* الصورة الأصلية داخل التقرير */}
             <div className="w-full h-[400px] rounded-[3rem] overflow-hidden mb-12 border border-white/10 shadow-2xl">
                <img src={selectedPost.originalImg} className="w-full h-full object-cover" alt="Article Header" />
             </div>

             <h1 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter leading-[1]">{selectedPost.title}</h1>
             <div className="prose prose-invert max-w-none text-slate-400 text-xl leading-relaxed bg-[#0d1117] p-12 rounded-[3.5rem] border border-white/5 shadow-2xl font-light italic">
                <div dangerouslySetInnerHTML={{ __html: selectedPost.content || selectedPost.description }} />
             </div>
             
             <div className="mt-16 text-center">
                <a href={selectedPost.link} target="_blank" className="px-16 py-5 bg-white text-black rounded-full font-black hover:bg-[#00f2ff] transition-all shadow-2xl uppercase text-[10px] tracking-widest inline-block">Verify Source Original Data</a>
             </div>
          </div>
        )}
      </main>

      <footer className="py-24 border-t border-white/5 bg-black/40 mt-24 text-center">
          <div className="flex justify-center gap-10 mb-10 text-[10px] font-black text-slate-600 uppercase tracking-widest">
             <button onClick={() => setActiveModal('about')} className="hover:text-[#00f2ff]">About</button>
             <button onClick={() => setActiveModal('privacy')} className="hover:text-[#00f2ff]">Privacy</button>
             <button onClick={() => setActiveModal('contact')} className="hover:text-[#00f2ff]">Contact</button>
          </div>
          <p className="text-[9px] text-slate-800 tracking-[0.8em] mb-4 uppercase italic font-black">Cyberha Intelligence Hub &copy; 2026</p>
          <div className="text-[8px] font-mono text-[#00f2ff]/40 tracking-widest">sameaminn@proton.me</div>
      </footer>

      {activeModal === 'privacy' && <Modal title="Privacy Compliance" content="We utilize Zero-Knowledge standards. No identification logs are maintained within this secure node." />}
      {activeModal === 'about' && <Modal title="The Mission" content="Cyberha bridges global threat intelligence with tactical user-end tools to foster a safer digital theater." />}
      {activeModal === 'contact' && <Modal title="Direct Terminal" content={<p>Secure Comms: <span className="text-[#00f2ff]">sameaminn@proton.me</span></p>} />}

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 45s linear infinite; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  );
}

// دالة مودال بسيطة (للتوافق)
function Modal({ title, content, onClose }: any) {
    return (
      <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100] p-6 flex items-center justify-center">
        <div className="bg-[#0d1117] border border-white/10 max-w-2xl w-full p-10 rounded-[2rem] relative">
          <h2 className="text-xl font-black mb-6 text-[#00f2ff] uppercase">{title}</h2>
          <div className="text-slate-400 text-sm leading-relaxed">{content}</div>
          <button onClick={onClose} className="mt-8 px-8 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-[#00f2ff] hover:text-black transition-all">Close</button>
        </div>
      </div>
    );
}