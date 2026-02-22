"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// --- توصيل قاعدة البيانات ---
const supabaseUrl = 'https://fmhxwxqxtxcnuchmfdmd.supabase.co'; 
const supabaseKey = 'sb_publishable_OX1jD5ZZxDzzH69JS_FFsw_e3z2Ip1r';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function CyberhaHome() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    // جلب البيانات من جدول posts الذي أنشأته في SQL Editor
    async function getPosts() {
      const { data } = await supabase.from('posts').select('*');
      if (data) setPosts(data);
    }
    getPosts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8" dir="rtl">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-cyan-400 mb-2 font-serif">سيبرها | Cyberha</h1>
        <p className="text-slate-400">منصة التوعية بالأمن السيبراني - بيانات حية</p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-cyan-500 transition shadow-lg">
            <div className="text-4xl mb-4">{post.icon}</div>
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-slate-400 leading-relaxed">{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}