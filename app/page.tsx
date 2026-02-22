"use client";
import { useEffect, useState } from "react";

export default function CyberhaMonetized2026() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // ... (نفس الدوال السابقة لجلب البيانات وكلمات السر)

  const Modal = ({ title, content }: { title: string, content: any }) => (
    <div className="fixed inset-0 bg-[#05070a]/95 backdrop-blur-xl z-[100] p-6 flex items-center justify-center">
      <div className="bg-[#0d1117] border border-white/10 max-w-2xl w-full p-10 rounded-[2rem] relative shadow-2xl overflow-y-auto max-h-[85vh]">
        <h2 className="text-2xl font-bold mb-6 text-[#00f2ff] tracking-tight uppercase">{title}</h2>
        <div className="text-slate-400 leading-relaxed font-light space-y-4">{content}</div>
        <button onClick={() => setActiveModal(null)} className="mt-8 px-8 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold">DISMISS</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#05070a] text-[#e6edf3]" dir="ltr">
      
      {/* 🔴 ALERT TICKER */}
      <div className="bg-[#ff2a2a]/5 border-b border-[#ff2a2a]/20 py-3 overflow-hidden sticky top-0 z-[70] backdrop-blur-md italic">
        <div className="flex animate-marquee whitespace-nowrap text-[10px] font-bold text-[#ff2a2a]">
          {news.slice(0, 5).map((item, i) => (
            <span key={i} className="px-10 uppercase">● Live_Incident: {item.title}</span>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-10 px-6">
        {!selectedPost ? (
          <>
            {/* 🗺️ RADAR CARD */}
            <section className="mb-16">
               {/* AD SLOT 01: Top Banner (أعلى الرادار) */}
               <div className="text-center mb-10 text-slate-800 text-[9px] tracking-widest">[ PUBLIC_ANNOUNCEMENT_SPACE ]</div>
               
               <div className="bg-[#0d1117] border border-white/5 p-16 rounded-[3rem] text-center shadow-2xl">
                  <h2 className="text-5xl font-black mb-6 tracking-tighter italic">GLOBAL RADAR</h2>
                  <a href="https://cybermap.kaspersky.com/" target="_blank" className="px-12 py-4 bg-[#00f2ff] text-black font-black rounded-full text-[10px] tracking-widest uppercase shadow-lg shadow-[#00f2ff]/20 inline-block">Launch Tactical View</a>
               </div>
            </section>

            {/* NEWS GRID WITH IN-FEED ADS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {news.map((item, i) => (
                <>
                  <article key={i} onClick={() => setSelectedPost(item)} className="bg-[#0d1117] border border-white/5 rounded-[2.5rem] overflow-hidden hover:scale-[1.02] transition-all cursor-pointer shadow-xl">
                    <div className="h-44 relative overflow-hidden bg-slate-800">
                      <img src={item.thumbnail || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"} className="w-full h-full object-cover opacity-60" />
                    </div>
                    <div className="p-8">
                      <h3 className="font-bold text-lg mb-4 line-clamp-2">{item.title}</h3>
                      <p className="text-[9px] font-black text-[#00f2ff] tracking-widest uppercase">Analyze Intel →</p>
                    </div>
                  </article>

                  {/* AD SLOT 02: In-Feed Ad (يظهر بعد الخبر الثالث) */}
                  {i === 2 && (
                    <div className="md:col-span-3 h-32 bg-white/5 border border-dashed border-white/10 rounded-[2.5rem] flex items-center justify-center text-slate-700 text-xs tracking-[1em] uppercase">
                       [ Sponsored_Intelligence_Stream ]
                    </div>
                  )}
                </>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-4xl mx-auto">
             <button onClick={() => setSelectedPost(null)} className="mb-10 text-[#00f2ff] font-bold text-[10px] tracking-widest uppercase">← Back to Dashboard</button>
             <h1 className="text-4xl font-black mb-10 tracking-tighter leading-tight">{selectedPost.title}</h1>
             
             {/* AD SLOT 03: In-Article Ad (فوق المحتوى) */}
             <div className="w-full h-24 bg-cyan-900/10 border border-cyan-500/10 rounded-2xl mb-10 flex items-center justify-center text-cyan-900 text-[10px] tracking-widest">
                [ TACTICAL_PARTNER_AD_01 ]
             </div>

             <div className="prose prose-invert max-w-none text-slate-400 text-lg leading-relaxed bg-[#0d1117] p-12 rounded-[3rem] border border-white/5">
                <div dangerouslySetInnerHTML={{ __html: selectedPost.content || selectedPost.description }} />
             </div>

             {/* AD SLOT 04: Affiliate Link (روابط الإحالة في الأسفل) */}
             <div className="mt-16 p-10 bg-gradient-to-r from-[#00f2ff]/5 to-transparent border-l-2 border-[#00f2ff] rounded-2xl">
                <p className="text-xs font-bold text-[#00f2ff] mb-2 uppercase tracking-widest">Strategic Partner Recommendation:</p>
                <p className="text-sm text-slate-400">Secure your digital life with our trusted VPN partner. <a href="#" className="underline text-white font-bold">Get 70% Off Now</a></p>
             </div>
          </div>
        )}
      </main>

      <footer className="py-20 border-t border-white/5 bg-black/20 mt-20 text-center">
          <div className="flex justify-center gap-10 mb-10 text-[10px] font-black text-slate-600 uppercase tracking-widest">
             <button onClick={() => setActiveModal('privacy')} className="hover:text-[#00f2ff]">Privacy Policy</button>
             <button onClick={() => setActiveModal('about')} className="hover:text-[#00f2ff]">About</button>
             <button onClick={() => setActiveModal('contact')} className="hover:text-[#00f2ff]">Contact</button>
          </div>
          <p className="text-[10px] text-slate-900 font-mono italic">Support: sameaminn@proton.me</p>
      </footer>

      {/* 🛡️ التحديث القانوني لعام 2026 */}
      {activeModal === 'privacy' && (
        <Modal title="Privacy & Advertising Policy" content={
          <>
            <p>1. <b>Zero Log Policy:</b> We do not collect personal identification from our visitors.</p>
            <p>2. <b>Advertising:</b> We use <b>Google AdSense</b> and third-party advertising partners. These partners may use cookies to serve ads based on your visit to this and other sites on the Internet.</p>
            <p>3. <b>Affiliate Disclosure:</b> Some links on this platform are affiliate links. We may receive a commission at no extra cost to you if you purchase through these links.</p>
            <p>4. <b>Cookies:</b> You can choose to disable or selectively turn off our cookies or third-party cookies in your browser settings.</p>
          </>
        } />
      )}
      {/* ... باقي المودالات */}

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 40s linear infinite; }
      `}</style>
    </div>
  );
}