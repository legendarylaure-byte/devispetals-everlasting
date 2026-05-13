'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Phone, MapPin, Mail, MessageSquare, Sparkles, CheckCircle2 } from 'lucide-react';

interface OrderModalProps {
  product?: string;
}

export default function OrderModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [productName, setProductName] = useState('Custom Bouquet');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: '',
    email: '',
    description: ''
  });

  useEffect(() => {
    const handleOpen = (e: any) => {
      setIsOpen(true);
      if (e.detail?.product) setProductName(e.detail.product);
      setIsSuccess(false);
    };
    window.addEventListener('open-order', handleOpen);
    return () => window.removeEventListener('open-order', handleOpen);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.mobile,
          address: formData.address,
          product: productName,
          message: formData.description,
        }),
      });
      
      if (res.ok) {
        setIsSuccess(true);
        setFormData({ name: '', mobile: '', address: '', email: '', description: '' });
      }
    } catch (err) {
      console.error('Order Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-metal-black/60 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="relative w-full max-w-2xl bg-white rounded-[48px] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Left Side: Visual/Branding */}
            <div className="hidden md:flex w-1/3 bg-primary/10 p-10 flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                 <Sparkles size={300} className="absolute -top-20 -left-20" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                  <Sparkles className="text-primary" size={24} />
                </div>
                <h2 className="text-2xl font-serif leading-tight mb-4">Reserve Your Everlasting Bloom</h2>
                <p className="text-gray-500 text-sm font-medium">Capture a moment that never fades. Our artisans are ready to craft your masterpiece.</p>
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-primary/50 italic">
                Kathmandu Heritage • 2026
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="flex-1 p-8 md:p-12 overflow-y-auto">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Order Details</p>
                  <h3 className="text-xl font-black tracking-tight">{productName}</h3>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField 
                      icon={<User size={18} />} 
                      label="Your Name *" 
                      placeholder="Sujal Pradhan" 
                      value={formData.name}
                      onChange={(val: string) => setFormData({...formData, name: val})}
                      required
                    />
                    <InputField 
                      icon={<Phone size={18} />} 
                      label="Mobile Number *" 
                      placeholder="+977 9812..." 
                      value={formData.mobile}
                      onChange={(val: string) => setFormData({...formData, mobile: val})}
                      required
                    />
                  </div>
                  
                  <InputField 
                    icon={<MapPin size={18} />} 
                    label="Delivery Address *" 
                    placeholder="Kathmandu, Nepal" 
                    value={formData.address}
                    onChange={(val: string) => setFormData({...formData, address: val})}
                    required
                  />

                  <InputField 
                    icon={<Mail size={18} />} 
                    label="Email ID (Optional)" 
                    placeholder="example@gmail.com" 
                    value={formData.email}
                    onChange={(val: string) => setFormData({...formData, email: val})}
                  />

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2 flex items-center gap-2">
                      <MessageSquare size={12} /> Message / Description
                    </label>
                    <textarea 
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Tell us about the occasion or any special requests..."
                      className="w-full bg-gray-50 border border-gray-100 rounded-[24px] py-4 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all min-h-[120px] resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-metal-black text-white py-5 rounded-[24px] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-xl hover:bg-primary transition-all disabled:opacity-50"
                  >
                    {isLoading ? 'Processing...' : 'Confirm Order'}
                    {!isLoading && <Send size={16} className="text-primary" />}
                  </button>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-serif mb-4">Order Received</h3>
                  <p className="text-gray-500 mb-10 leading-relaxed">
                    Thank you for choosing Devis Petals. We have sent a poetic confirmation to your email. Our artisans will reach out to you shortly.
                  </p>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="bg-metal-black text-white px-12 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px]"
                  >
                    Close Window
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function InputField({ icon, label, placeholder, value, onChange, required }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2 flex items-center gap-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>
        <input 
          type="text" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="w-full bg-gray-50 border border-gray-100 rounded-[24px] py-4 pl-14 pr-6 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>
    </div>
  );
}
