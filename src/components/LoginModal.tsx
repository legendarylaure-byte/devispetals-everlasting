'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, User, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleOpen = () => { setIsOpen(true); setError(''); };
    window.addEventListener('open-login', handleOpen);
    return () => window.removeEventListener('open-login', handleOpen);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (!auth) throw new Error('Authentication not configured');
      await signInWithEmailAndPassword(auth, email, password);
      setIsOpen(false);
      router.push('/admin');
    } catch (err: any) {
      const code = err.code || '';
      if (code === 'auth/user-not-found' || code === 'auth/invalid-credential' || code === 'auth/wrong-password') {
        setError('Invalid executive credentials. Please try again.');
      } else if (code === 'auth/too-many-requests') {
        setError('Too many attempts. Please wait before trying again.');
      } else {
        setError(err.message || 'Authentication failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
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

              {error && (
                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl">
                  <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                  <p className="text-xs font-bold text-red-500 leading-relaxed">{error}</p>
                </div>
              )}

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
