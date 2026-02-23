"use client";
import { useEffect, useState } from "react";

export default function CyberhaVault() {
  const [vulnerabilities, setVulnerabilities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchVulnerabilities() {
      try {
        setLoading(true);
        // استخدام بروكسي لتجنب حجب البيانات
        const res = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json"));
        const proxyData = await res.json();
        const data = JSON.parse(proxyData.contents);
        
        setVulnerabilities(data.vulnerabilities.slice(0, 20));
      } catch (err) {
        console.error("Critical Connection Failure");
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchVulnerabilities();
  }, []);

  if (error) return <div className="text-red-500 p-20 text-center font-mono uppercase">Offline_Mode: Failed to bridge CISA Data</div>;

  return (
    <div className="min-h-screen bg-[#050810] text-[#e0e0e0] font-mono p-8" dir="ltr">
      <div className="max-w-7xl mx-auto mb-12 flex justify-between items-end border-b border-[#64ffda]/20 pb-8">
        <div>
          <h1 className="text-4xl font-black text-white italic tracking-tighter">THE_VAULT</h1>
          <p className="text-[#64ffda] text-[10px] tracking-[0.5em] uppercase mt-2">Exploit Database & Patch Registry</p>
        </div>
        <div className="text-right flex flex-col items-end">
          <span className="text-red-500 text-[10px] font-black animate-pulse uppercase">● Live_Feed_Active</span>
          <span className="text-[8px] text-slate-500 mt-1">SEC_NODE: 2026_ALPHA</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="text-center py-20">
             <div className="w-10 h-10 border-2 border-[#64ffda] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
             <p className="animate-pulse text-slate-500 uppercase tracking-widest text-xs">Accessing Encrypted Records...</p>
          </div>
        ) : (
          <div className="grid gap-4 animate-in fade-in duration-1000">
            {vulnerabilities.map((v, i) => (
              <div key={i} className="bg-[#0d1117] border border-white/5 p-6 rounded-2xl hover:border-[#64ffda]/40 transition-all group shadow-xl">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-red-950 text-red-500 text-[10px] font-black px-3 py-1 rounded-full border border-red-500/20">
                        {v.cveID}
                      </span>
                      <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">
                        {v.dateAdded}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#64ffda] transition-colors mb-2 italic">
                      {v.vulnerabilityName}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-4xl italic">
                      {v.shortDescription}
                    </p>
                  </div>
                  <div className="flex flex-col justify-between items-end min-w-[150px]">
                    <span className="text-[10px] font-black text-slate-600 uppercase mb-4">Vendor: {v.vendorProject}</span>
                    <a 
                      href={`https://nvd.nist.gov/vuln/detail/${v.cveID}`} 
                      target="_blank" 
                      className="bg-white/5 hover:bg-[#64ffda] hover:text-black text-white text-[9px] font-black px-4 py-2 rounded-lg transition-all uppercase tracking-widest border border-white/10"
                    >
                      View_Details
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}