'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate authentication
    setTimeout(() => {
      router.push('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA] p-6">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full max-w-sm"
      >
        <div className="flex flex-col items-center text-center mb-16">
          <h1 className="text-4xl font-light tracking-tight text-slate-900 mb-3">RaceDoc</h1>
          <p className="text-slate-400 font-light text-sm tracking-wide">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-10">
          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Email</label>
              <input 
                type="email" 
                required
                className="w-full bg-transparent border-b border-slate-200 py-2 text-slate-900 font-light focus:outline-none focus:border-orange-500 transition-colors placeholder:text-slate-300"
                placeholder="admin@racedoc.com"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Password</label>
                <a href="#" className="text-[10px] text-slate-400 hover:text-orange-500 transition-colors uppercase tracking-widest">Forgot?</a>
              </div>
              <input 
                type="password" 
                required
                className="w-full bg-transparent border-b border-slate-200 py-2 text-slate-900 font-light focus:outline-none focus:border-orange-500 transition-colors placeholder:text-slate-300"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-4 bg-slate-900 hover:bg-black text-white rounded-full transition-all disabled:opacity-70 disabled:cursor-not-allowed font-light text-sm tracking-wide mt-4"
          >
            {isLoading ? (
              <div className="w-4 h-4 border border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Continue <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-16 text-center">
          <p className="text-xs text-slate-400 font-light tracking-wide">
            Don&apos;t have an account? <a href="#" className="text-slate-900 hover:text-orange-500 transition-colors">Contact Support</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
