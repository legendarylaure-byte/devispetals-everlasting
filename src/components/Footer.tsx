'use client';

import { Mail, Phone, Globe, Share2, MessageCircle, MapPin } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function Footer() {
  return (
    <footer className="bg-metal-black text-white pt-24 pb-12 px-8 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Company Info */}
          <div>
            <div className="flex flex-col gap-1 mb-8">
              <span className="font-black text-4xl tracking-tighter uppercase leading-none">Devis Petals</span>
              <span className="text-sm font-bold text-primary tracking-[0.3em] uppercase italic">डेभिस पेटल्स प्रा.लि.</span>
            </div>
            <p className="text-gray-400 text-lg max-w-md leading-relaxed mb-10 font-medium">
              Crafting everlasting memories through the art of handmade floral design. 
              From the heart of Kathmandu to your most cherished moments.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="p-3 bg-white/5 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <Phone size={20} className="text-primary" />
                </div>
                <div>
                   <p className="text-[10px] uppercase font-black tracking-widest text-gray-500">Call our Concierge</p>
                   <p className="font-bold text-lg">+977 1 55XXXXX</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="p-3 bg-white/5 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <Mail size={20} className="text-primary" />
                </div>
                <div>
                   <p className="text-[10px] uppercase font-black tracking-widest text-gray-500">Email Us</p>
                   <p className="font-bold text-lg underline decoration-primary underline-offset-4">anila.maharjan7@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="p-3 bg-white/5 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <MapPin size={20} className="text-primary" />
                </div>
                <div>
                   <p className="text-[10px] uppercase font-black tracking-widest text-gray-500">Our Origins</p>
                   <p className="font-bold text-lg">Kathmandu, Nepal</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media & Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="font-black uppercase tracking-[0.2em] text-xs mb-8 text-gray-500">Social Bloom</h4>
              <div className="flex flex-col gap-6">
                <SocialLink icon={<Globe size={20} />} label="Instagram" href="#" />
                <SocialLink icon={<Share2 size={20} />} label="Facebook" href="#" />
                <SocialLink icon={<MessageCircle size={20} />} label="WhatsApp" href="#" />
              </div>
            </div>
            <div>
              <h4 className="font-black uppercase tracking-[0.2em] text-xs mb-8 text-gray-500">Quick Portal</h4>
              <nav className="flex flex-col gap-4 font-bold text-sm text-gray-400">
                <a href="#" className="hover:text-primary transition-colors">Collections</a>
                <a href="#" className="hover:text-primary transition-colors">Custom Orders</a>
                <a href="#story" className="hover:text-primary transition-colors">Our Story</a>
                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('open-login'))}
                  className="text-primary font-black text-left hover:brightness-125 transition-all"
                >
                  CEO Portal Access
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
            © 2026 Devis Petals Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-gray-600">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ icon, label, href }: { icon: any, label: string, href: string }) {
  return (
    <MagneticButton>
      <a href={href} className="flex items-center gap-3 group">
        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-primary transition-all">
          {icon}
        </div>
        <span className="font-bold group-hover:text-primary transition-colors">{label}</span>
      </a>
    </MagneticButton>
  );
}
