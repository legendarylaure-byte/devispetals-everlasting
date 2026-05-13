'use client';

// Devis Petals Elite Platform - Production Build
// Deployment Trigger: 2026-05-13
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingBag, MessageSquare, ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import ProductGallery from '@/components/ProductGallery';
import AIChat from '@/components/AIChat';
import MagneticButton from '@/components/MagneticButton';
import Footer from '@/components/Footer';
import LoginModal from '@/components/LoginModal';
import OrderModal from '@/components/OrderModal';
import { Sparkles, Heart, Globe } from 'lucide-react';

const FloralCanvas = dynamic(() => import('@/components/Three/FloralCanvas'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-primary/5 animate-pulse rounded-3xl" />
});

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-12 py-10 max-w-[1400px] mx-auto relative z-50">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <div className="p-2.5 bg-white rounded-[20px] shadow-2xl border border-gray-50 flex items-center justify-center">
            <Image 
              src="/images/logo_minimal.jpg" 
              alt="Devis Petals Logo" 
              width={64} 
              height={64} 
              className="rounded-xl shadow-xl border-2 border-primary/20"
            />
          </div>
          <div className="flex flex-col -gap-1">
            <span className="font-black text-3xl tracking-tighter uppercase leading-none">Devis Petals</span>
            <span className="text-xs font-bold text-primary tracking-widest uppercase mt-1">डेभिस पेटल्स प्रा.लि.</span>
          </div>
        </motion.div>
        
        <div className="hidden lg:flex gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
          <a href="#collections" className="hover:text-primary transition-all">Collections</a>
          <a href="#heritage" className="hover:text-primary transition-all">Our Heritage</a>
          <a href="#contact" className="hover:text-primary transition-all">Contact</a>
        </div>

        <div className="flex items-center gap-6">
          <motion.button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-order', { detail: { product: 'Premium Collection' } }))}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-metal-black text-white px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-3 shadow-2xl shadow-gray-200"
          >
            Order Now <ArrowRight size={16} className="text-primary" />
          </motion.button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-20 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-primary font-bold uppercase tracking-[0.4em] text-xs mb-6 block drop-shadow-sm">
            Handmade in Kathmandu • Est. 2026
          </span>
          <h1 className="text-7xl md:text-9xl font-serif mb-8 leading-[0.9] tracking-tighter">
            Blooms that <br />
            <span className="bg-gradient-to-r from-primary via-[#f8d7da] to-primary bg-clip-text text-transparent animate-gradient">Never Fade</span>
          </h1>
          <p className="text-gray-500 text-xl mb-12 max-w-lg leading-relaxed font-medium">
            Experience the soul of Nepalese craftsmanship with our everlasting bouquets. 
            Crafted with love, designed for eternity.
          </p>
          
          <div className="flex gap-4">
            <MagneticButton>
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('open-order', { detail: { product: 'Hero Bouquet' } }))}
                className="bg-primary text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
              >
                <ShoppingBag size={20} /> Pre-order Now
              </button>
            </MagneticButton>
            
            <MagneticButton>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="border border-metal-black px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-metal-black hover:text-white transition-all"
              >
                <MessageSquare size={20} /> Talk to Us
              </button>
            </MagneticButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/10 to-transparent border border-white/50 backdrop-blur-sm"
        >
          <FloralCanvas />
        </motion.div>
      </section>

      <div id="collections">
        <ProductGallery />
      </div>

      {/* Our Heritage Section */}
      <section id="heritage" className="py-32 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl relative z-10">
              <Image 
                src="/images/logo_minimal.jpg" 
                alt="Our Heritage" 
                fill 
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/20 blur-[80px] rounded-full -z-0" />
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-primary/10 blur-[60px] rounded-full -z-0" />
          </div>
          <div>
            <div className="mb-12">
              <h2 className="text-6xl font-serif mb-6 leading-tight">Our <br />Heritage</h2>
              <div className="w-24 h-1 bg-primary mb-10" />
            </div>
            <div className="space-y-8 text-gray-500 text-lg leading-relaxed font-medium">
              <p>
                Established in 2026 in the heart of Kathmandu, Devis Petals was born from a simple yet profound vision: to capture the fleeting beauty of nature and make it eternal. 
              </p>
              <p>
                Our artisans combine ancient Nepalese craft techniques with modern preservation artistry, ensuring each bloom tells a story of love, patience, and everlasting devotion.
              </p>
              <div className="pt-8">
                <button className="text-metal-black font-black uppercase tracking-widest text-xs border-b-2 border-primary pb-2 hover:text-primary transition-colors">
                  Learn More About Our Craft
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Devis Promise - Unique Proposals */}
      <section className="max-w-7xl mx-auto px-8 py-32 border-t border-gray-100">
        <div className="text-center mb-24 relative">
          <div className="inline-block relative">
            <h2 className="text-5xl font-serif mb-6 relative z-10">The Devis Promise</h2>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          </div>
          <p className="text-gray-400 font-bold uppercase tracking-[0.4em] text-[10px] mt-4">Our Unrivaled Standards of Excellence</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <PromiseCard 
            icon={<Heart className="text-primary" size={32} />}
            title="Everlasting Craftsmanship"
            description="Our blooms are preserved through a proprietary process that maintains their vibrant color and velvety texture for years, not days."
          />
          <PromiseCard 
            icon={<Globe className="text-primary" size={32} />}
            title="Heritage of Kathmandu"
            description="Every petal is hand-shaped by artisans in our Kathmandu atelier, preserving the rich artistic heritage of the Himalayas."
          />
          <PromiseCard 
            icon={<Sparkles className="text-primary" size={32} />}
            title="Devi’s AI Concierge"
            description="Our advanced floral intelligence creates personalized poetry and bespoke gift advice for your most significant life milestones."
          />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2 className="text-5xl font-serif mb-8">Let’s Bloom Together</h2>
          <p className="text-gray-500 text-xl mb-16 leading-relaxed">
            Whether you’re seeking a custom bouquet or have a question for our artisans, we’re here to help you create something timeless.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="p-10 rounded-[40px] bg-gray-50 border border-gray-100 group hover:bg-white hover:shadow-2xl hover:shadow-gray-100 transition-all">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">Email Us</p>
              <p className="text-xl font-bold">contact@devispetals.com</p>
            </div>
            <div className="p-10 rounded-[40px] bg-gray-50 border border-gray-100 group hover:bg-white hover:shadow-2xl hover:shadow-gray-100 transition-all">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">Call Us</p>
              <p className="text-xl font-bold">+977 1 55XXXXX</p>
            </div>
          </div>
          <MagneticButton>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-order', { detail: { product: 'Custom Request' } }))}
              className="bg-metal-black text-white px-16 py-6 rounded-[24px] font-black uppercase tracking-[0.2em] text-xs shadow-2xl hover:bg-primary transition-all"
            >
              Send a Request
            </button>
          </MagneticButton>
        </div>
      </section>

      <Footer />

      <AIChat />

      <LoginModal />

      <OrderModal />
    </main>
  );
}


function PromiseCard({ icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center group p-8 rounded-[40px] hover:bg-white hover:shadow-2xl hover:shadow-gray-100 transition-all border border-transparent hover:border-gray-50"
    >
      <div className="w-24 h-24 bg-primary/10 rounded-[40px] flex items-center justify-center mb-10 group-hover:bg-primary group-hover:scale-110 transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:shadow-primary/20">
        <div className="group-hover:text-white transition-colors">
          {icon}
        </div>
      </div>
      <h3 className="font-serif text-2xl mb-4 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-gray-400 font-medium leading-relaxed group-hover:text-gray-500 transition-colors">{description}</p>
    </motion.div>
  );
}
