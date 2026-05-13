'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-login', handleOpen);
    return () => window.removeEventListener('open-login', handleOpen);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate premium login experience
    setTimeout(() => {
      setIsLoading(false);
      setIsOpen(false);
      router.push('/admin');
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-metal-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[40px] shadow-2xl overflow-hidden border border-white/20"
          >
            <div className="bg-metal-black p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 blur-[60px] rounded-full" />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div className="p-3 bg-primary rounded-2xl shadow-xl shadow-primary/20">
                    <ShieldCheck size={28} />
                  </div>
                  <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                    <X size={24} />
                  </button>
                </div>
                <h2 className="text-3xl font-serif mb-2 tracking-tight">CEO Portal</h2>
                <p className="text-primary font-black uppercase tracking-widest text-[10px]">Administrative Intelligence</p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="p-10 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Executive ID</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@devispetals.com"
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Secure Key</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-metal-black text-white py-5 rounded-[20px] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-xl hover:bg-primary transition-all disabled:opacity-50"
              >
                {isLoading ? 'Authenticating...' : 'Enter Portal'}
                {!isLoading && <ArrowRight size={16} className="text-primary" />}
              </button>
              
              <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                Authorized Personnel Only
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
