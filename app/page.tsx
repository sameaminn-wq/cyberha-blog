"use client";
import { useEffect, useState } from "react";

export default function CyberhaSovereignSystem() {
  const [news, setNews] = useState<any[]>([]);
  const [vault, setVault] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [view, setView] = useState<"hub" | "vault">("hub");
  const [generatedPass, setGeneratedPass] = useState("");

  // 📡 مصادر البيانات: 5 مواقع أخبار + وكالة CISA للثغرات
  const FEEDS = [
    "https://thehackernews.com/rss",
    "https://www.bleepingcomputer.com/feed/",
    "https://www.darkreading.com/rss.xml",
    "https://www.securityweek.com/rss",
    "https://krebsonsecurity.com/feed/"
  ];

  useEffect(() => {
    async function initializeTerminal() {
      try {
        setLoading(true);
        // 1. جلب أخبار الاستخبارات
        const responses = await Promise.all(FEEDS.map(url => 
          fetch(`https://api.rss2json.com/v1/api.json?rss_url=${url}`).then(res => res.json())
        ));
        let combined = responses.flatMap(data => (data.items || []).map((item: any) => ({
          ...item, source: data.feed.title?.split(' - ')[0] || "Global Intel",
          img: item.thumbnail || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"
        })));
        setNews(combined.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()));

        // 2. جلب ثغرات "المخزن" من CISA API
        const vaultRes = await fetch("https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json");
        const vaultData = await vaultRes.json();
        setVault(vaultData.vulnerabilities.slice(0, 20));

      } catch (err) { console.error("Signal Lost"); }
      finally { setLoading(false); }
    }
    initializeTerminal();
  }, []);

  const genPass = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*()_+-=[]{}|";
    setGeneratedPass(Array.from({length: 24}, () => chars[Math.floor(Math.random()*chars.length)]).join(''));
  };

  if (loading) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center font-mono text-[#38bdf8]">
      <div className="text-center tracking-[1em] animate-pulse uppercase italic">Establishing_Secure_Connection...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-[#f1f5f9] font-sans selection:bg-[#38bdf8] selection:text-[#020617]" dir="ltr">
      
      {/* 🔴 شريط الحالة العلوي (Status Ticker) */}
      <div className="bg-[#0ea5e9]/10 border-b border-[#0ea5e9]/20 py-2.5 overflow-hidden sticky top-0 z-[100] backdrop-blur-2xl">
        <div className="flex animate-marquee whitespace-nowrap text-[10px] font-black text-[#38bdf8] tracking-widest uppercase italic">
          {news.slice(0, 10).map((item, i) => (
            <span key={i} className="px-12 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#38bdf8] rounded-full animate-ping"></span>
              LIVE_INTEL :: {item.source} :: {item.title}
            </span>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-8 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/5">
        <div className="cursor-pointer group" onClick={() => {setView("hub"); setSelectedPost(null);}}>
          <h1 className="text-4xl font-black tracking-tighter text-white group-hover:text-[#38bdf8] transition-all">
            CYBERHA<span className="text-[#38bdf8]">.INTEL</span>
          </h1>
          <p className="text-[8px] text-slate-500 tracking-[0.8em] uppercase italic">The Sovereign Intelligence Terminal</p>
        </div>

        <div className="flex items-center gap-10 text-[10px] font-black uppercase tracking-widest italic">
           <button onClick={() => {setView("hub"); setSelectedPost(null);}} className={view === 'hub' ? 'text-[#38bdf8] border-b-2 border-[#38bdf8] pb-1' : 'text-slate-500 hover:text-white transition-all'}>Dispatch_Hub</button>
           <button onClick={() => setView("vault")} className={view === 'vault' ? 'text-[#38bdf8] border-b-2 border-[#38bdf8] pb-1' : 'text-slate-500 hover:text-white transition-all'}>The_Vault</button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-6">
        
        {/* VIEW: HUB */}
        {view === "hub" && !selectedPost && (
          <>
            {/* الأدوات التكتيكية (Arsenal) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
               <div className="bg-[#0f172a] border border-[#38bdf8]/10 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#38bdf8]/5 rounded-full blur-3xl group-hover:bg-[#38bdf8]/10 transition-all"></div>
                  <h3 className="text-[#38bdf8] font-black text-[10px] uppercase mb-6 tracking-widest italic">// Password_Entropy_Gen</h3>
                  <div className="bg-black/40 p-5 rounded-2xl text-center text-xl font-mono text-[#38bdf8] border border-white/5 mb-6 break-all min-h-[70px] flex items-center justify-center">
                    {generatedPass || "••••••••••••••••"}
                  </div>
                  <button onClick={genPass} className="w-full py-4 bg-[#38bdf8] text-[#020617] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all rounded-2xl">Execute_Generation</button>
               </div>
               
               <div className="bg-[#0f172a] border border-red-500/10 p-10 rounded-[3rem] shadow-2xl">
                  <h3 className="text-red-500 font-black text-[10px] uppercase mb-6 tracking-widest italic">// Tactical_Radar</h3>
                  <div className="space-y-4">
                    <p className="text-sm text-slate-300 italic leading-relaxed">
                      "Warning: Advanced Persistent Threat (APT) activity detected targeting cloud-native environments. Monitor all egress traffic for anomalies."
                    </p>
                    <div className="flex items-center gap-3">
                       <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                       <span className="text-[9px] font-black text-red-500 uppercase">Alert_Level: Critical</span>
                    </div>
                  </div>
               </div>
            </div>

            {/* الأخبار */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {news.slice(0, 18).map((item, i) => (
                <article key={i} onClick={() => setSelectedPost(item)} className="group bg-[#0f172a] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-[#38bdf8]/30 transition-all cursor-pointer flex flex-col h-full shadow-2xl">
                  <div className="h-56 relative overflow-hidden">
                    <div className="absolute top-6 left-6 bg-black/70 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] text-[#38bdf8] z-10 font-bold uppercase tracking-widest border border-[#38bdf8]/20">
                       {item.source}
                    </div>
                    <img src={item.img} className="w-full h-full object-cover opacity-30 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" alt="Intel" />
                  </div>
                  <div className="p-10 flex-grow">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#38bdf8] transition-colors leading-tight italic mb-8">{item.title}</h3>
                    <div className="flex justify-between items-center text-[9px] font-black text-slate-600 uppercase tracking-widest border-t border-white/5 pt-6">
                      <span>Access_Report →</span>
                      <span>{new Date(item.pubDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        {/* VIEW: VAULT (المخزن) */}
        {view === "vault" && (
          <div className="max-w-5xl mx-auto animate-in fade-in duration-1000">
             <div className="mb-16">
                <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-2">The_Vault</h2>
                <p className="text-[#38bdf8] text-[10px] tracking-[0.6em] uppercase">CVE Registry & Decrypted Vulnerability Database</p>
             </div>
             <div className="grid gap-6">
                {vault.map((v, i) => (
                  <div key={i} className="bg-[#0f172a] border border-white/5 p-8 rounded-[2rem] hover:bg-[#1e293b] transition-all group flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                      <span className="text-[#38bdf8] font-mono text-xs block mb-3 font-bold">{v.cveID}</span>
                      <h4 className="text-xl font-bold text-white group-hover:text-[#38bdf8] transition-colors italic mb-3">{v.vulnerabilityName}</h4>
                      <p className="text-[11px] text-slate-400 italic max-w-2xl line-clamp-2">{v.shortDescription}</p>
                    </div>
                    <a href={`https://nvd.nist.gov/vuln/detail/${v.cveID}`} target="_blank" className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#38bdf8] hover:text-[#020617] transition-all shrink-0">Analyze_Patch</a>
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* VIEW: POST DETAILS */}
        {selectedPost && view === "hub" && (
          <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-10 duration-700">
             <button onClick={() => setSelectedPost(null)} className="mb-12 text-[#38bdf8] text-[10px] font-black tracking-[0.5em] hover:tracking-[0.7em] transition-all uppercase flex items-center gap-3">← RETURN_TO_DECODER</button>
             <h1 className="text-5xl md:text-7xl font-black mb-12 italic leading-[0.9] text-white uppercase tracking-tighter">{selectedPost.title}</h1>
             <div className="prose prose-invert max-w-none text-slate-300 text-xl leading-relaxed bg-[#0f172a] p-12 rounded-[3.5rem] border border-white/5 font-light italic shadow-2xl">
                <div dangerouslySetInnerHTML={{ __html: selectedPost.content || selectedPost.description }} />
             </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-24 border-t border-white/5 bg-black/40 mt-20 text-center">
          <div className="flex justify-center flex-wrap gap-12 mb-12 text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] italic">
             <button onClick={() => setActiveModal('about')} className="hover:text-[#38bdf8] transition-all">The_Agency</button>
             <button onClick={() => setActiveModal('privacy')} className="hover:text-[#38bdf8] transition-all">Privacy_Protocol</button>
             <button onClick={() => setActiveModal('terms')} className="hover:text-[#38bdf8] transition-all">Terms_of_Engagement</button>
             <button onClick={() => setActiveModal('contact')} className="hover:text-[#38bdf8] transition-all">Secure_Comms</button>
          </div>
          <p className="text-[9px] text-slate-800 tracking-[1.5em] font-black uppercase italic">Cyberha Intelligence // Operational Terminal 2026</p>
      </footer>

      {/* ⚖️ MODALS (السياسات والاتصال) */}
      {activeModal && (
        <div className="fixed inset-0 bg-[#020617]/98 backdrop-blur-3xl z-[200] flex items-center justify-center p-6" onClick={() => setActiveModal(null)}>
           <div className="bg-[#0f172a] border border-[#38bdf8]/30 max-w-2xl w-full p-12 rounded-[3.5rem] shadow-2xl relative overflow-y-auto max-h-[85vh] scrollbar-hide" onClick={e => e.stopPropagation()}>
              <h2 className="text-3xl font-black text-[#38bdf8] uppercase italic mb-8 tracking-tighter">
                {activeModal === 'privacy' && "Privacy_Zero_Log"}
                {activeModal === 'terms' && "Standard_Terms"}
                {activeModal === 'about' && "The_Cyberha_Matrix"}
                {activeModal === 'contact' && "Direct_Neural_Link"}
              </h2>
              <div className="text-slate-300 text-xs leading-relaxed space-y-6 font-medium italic border-l border-[#38bdf8]/20 pl-6">
                
                {activeModal === 'privacy' && (
                  <>
                    <p className="text-[#38bdf8] font-black underline underline-offset-4 mb-4 uppercase text-sm">سياسة الخصوصية الصارمة:</p>
                    <p>1. **بروتوكول انعدام الأثر:** لا يقوم نظام سيبرها بتخزين أي عناوين IP أو سجلات تصفح. بياناتك تبدأ وتنتهي في متصفحك.</p>
                    <p>2. **التشفير المحلي:** جميع الأدوات التكتيكية (مولدات المفاتيح) تعمل بواسطة محرك JavaScript المحلي ولا يتم إرسال النتائج إلى أي خادم خارجي.</p>
                    <p>3. **الحماية من الطرف الثالث:** نحن لا نستخدم أدوات تتبع من طرف ثالث (مثل Google Analytics)؛ خصوصيتك هي أولويتنا القصوى وغير قابلة للتفاوض.</p>
                  </>
                )}

                {activeModal === 'terms' && (
                  <>
                    <p className="text-[#38bdf8] font-black underline underline-offset-4 mb-4 uppercase text-sm">شروط الاستخدام القوية:</p>
                    <p>1. **الاستخدام الدفاعي فقط:** تمنح سيبرها حق الوصول لغرض التوعية والدفاع السيبراني. يُحظر استخدام التقارير أو الأدوات في أي نشاط هجومي ضد أي بنية تحتية رقمية.</p>
                    <p>2. **إخلاء المسؤولية الصارم:** سيبرها ليست مسؤولة عن أي أضرار ناتجة عن سوء فهم المعلومات أو التطبيق الخاطئ للأدوات. أنت وحدك المسؤول عن أفعالك الرقمية.</p>
                    <p>3. **الملكية الفكرية:** جميع تصاميم الواجهات والرموز البرمجية الخاصة بسيبرها محمية ولا يجوز إعادة إنتاجها لأغراض تجارية دون إذن كتابي مشفر.</p>
                  </>
                )}

                {activeModal === 'about' && (
                  <p>سيبرها هي المحطة الرائدة لاستخبارات التهديدات الرقمية في عام 2026. تم تصميمها لتكون حلقة الوصل بين تدفقات البيانات المعقدة من كبار وكالات الأمن وبين المستخدم التقني المحترف.</p>
                )}

                {activeModal === 'contact' && (
                  <div className="text-center py-6">
                    <p className="mb-6 opacity-60">تواصل عبر البريد المشفر (PGP Supported):</p>
                    <div className="bg-[#020617] p-5 rounded-2xl text-white font-mono select-all border border-[#38bdf8]/20 text-sm">sameaminn@proton.me</div>
                  </div>
                )}
              </div>
              <button onClick={() => setActiveModal(null)} className="mt-12 w-full py-5 bg-[#38bdf8] text-[#020617] rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] hover:bg-white transition-all shadow-2xl">Exit_Protocol</button>
           </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 55s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #020617; }
        ::-webkit-scrollbar-thumb { background: #38bdf8; border-radius: 10px; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}