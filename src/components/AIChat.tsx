'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: 'Namaste! I am Devi’s AI. How may I help you bloom today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Order Flow State
  const [orderStep, setOrderStep] = useState<'none' | 'name' | 'email' | 'phone' | 'payment'>('none');
  const [orderData, setOrderData] = useState({ 
    customerName: '', 
    customerEmail: '', 
    customerPhone: '', 
    product: 'Custom Bouquet',
    paymentMethod: 'cod' as 'khalti' | 'esewa' | 'fonepay' | 'cod'
  });

  const startOrderFlow = () => {
    setOrderStep('name');
    setMessages(prev => [...prev, { role: 'bot', text: 'I am delighted to help you reserve an everlasting bloom. I am Devi’s AI, your guide. May I start with your name?' }]);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);

    // Conversational Order Logic
    if (orderStep !== 'none') {
      handleOrderStep(userMsg);
      return;
    }

    // Trigger order flow if user wants to buy
    if (userMsg.toLowerCase().includes('order') || userMsg.toLowerCase().includes('buy')) {
      startOrderFlow();
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', text: data.reply || "My apologies, the floral oracle is currently reflecting. Please ensure your connection is stable and try again soon." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: 'I am momentarily lost in the garden. Please check your internet connection and try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOrderStep = async (value: string) => {
    if (orderStep === 'name') {
      setOrderData(prev => ({ ...prev, customerName: value }));
      setOrderStep('email');
      setMessages(prev => [...prev, { role: 'bot', text: `Lovely to meet you, ${value}. What is your email address so I can send you a poem once the order is placed?` }]);
    } else if (orderStep === 'email') {
      setOrderData(prev => ({ ...prev, customerEmail: value }));
      setOrderStep('phone');
      setMessages(prev => [...prev, { role: 'bot', text: 'And your phone number for the delivery team in Kathmandu?' }]);
    } else if (orderStep === 'phone') {
      setOrderData(prev => ({ ...prev, customerPhone: value }));
      setOrderStep('payment');
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: 'Perfect. How would you like to pay? I can arrange Khalti, Esewa, Fonepay, or Cash on Delivery.' 
      }]);
    } else if (orderStep === 'payment') {
      const method = value.toLowerCase();
      let paymentMethod: any = 'cod';
      if (method.includes('khalti')) paymentMethod = 'khalti';
      else if (method.includes('esewa')) paymentMethod = 'esewa';
      else if (method.includes('fonepay')) paymentMethod = 'fonepay';

      const finalData = { ...orderData, paymentMethod };
      setOrderData(finalData);
      setOrderStep('none');
      setIsLoading(true);
      
      try {
        const res = await fetch('/api/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(finalData),
        });
        const data = await res.json();
        
        let reply = `✨ Order Confirmed! ✨\n\n${data.poem}\n\n${data.message}`;
        if (paymentMethod !== 'cod') {
          reply += `\n\n🔗 Please complete your payment here: ${data.paymentUrl || 'link_placeholder'}`;
        }
        
        setMessages(prev => [...prev, { role: 'bot', text: reply }]);
      } catch (err) {
        setMessages(prev => [...prev, { role: 'bot', text: 'Something went wrong with the order. Please try again.' }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {/* Floating Trigger */}
      <motion.div 
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-8 right-8 bg-white p-1 rounded-full shadow-2xl cursor-pointer border-2 border-primary z-50"
      >
        <div className="relative">
           <Image 
             src="/images/logo_minimal.jpg" 
             alt="AI Bot" 
             width={56} 
             height={56} 
             className="rounded-full" 
           />
           <div className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-28 right-8 w-[380px] h-[500px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-100"
          >
            {/* Header */}
            <div className="bg-metal-black text-white p-8 flex justify-between items-center border-b border-white/10 shadow-lg relative z-20">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-primary rounded-2xl shadow-xl shadow-primary/30 animate-pulse">
                  <Sparkles className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-black text-2xl tracking-tighter leading-none mb-1 text-white drop-shadow-md">Devi’s AI</h3>
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Oracle & Guide</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 bg-white/5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                <X size={24} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-white text-metal-black shadow-sm rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm space-x-1 flex">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask Devi’s AI..." 
                className="flex-1 bg-gray-100 rounded-full px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-metal-black text-white p-3 rounded-full hover:bg-primary transition-colors disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
