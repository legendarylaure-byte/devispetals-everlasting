'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Heart } from 'lucide-react';

const products = [
  { id: 1, name: 'Eternal Rose Blush', price: 'रू 2,500', image: '/images/logo_minimal.jpg' },
  { id: 2, name: 'Kathmandu Gold Lily', price: 'रू 3,200', image: '/images/logo_minimal.jpg' },
  { id: 3, name: 'Pearl Orchid Bundle', price: 'रू 4,800', image: '/images/logo_minimal.jpg' },
  { id: 4, name: 'Midnight Velvet Tulip', price: 'रू 2,900', image: '/images/logo_minimal.jpg' },
];

export default function ProductGallery() {
  return (
    <section id="collections" className="max-w-7xl mx-auto px-8 py-32">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div className="relative">
          <h2 className="text-6xl font-serif mb-6 leading-tight">The <br />Collection</h2>
          <div className="flex items-center gap-4">
            <div className="w-16 h-0.5 bg-primary" />
            <p className="text-gray-400 font-medium uppercase tracking-[0.3em] text-[10px]">Hand-selected Everlasting Beauty</p>
          </div>
        </div>
        <button 
          onClick={() => document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' })}
          className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-primary transition-all pb-2 border-b border-gray-100 hover:border-primary"
        >
          View All <div className="w-8 h-px bg-gray-200 group-hover:bg-primary group-hover:w-12 transition-all" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            onClick={() => window.dispatchEvent(new CustomEvent('open-order', { detail: { product: product.name } }))}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-50 mb-4 flex items-center justify-center">
              <Image 
                src={product.image} 
                alt={product.name} 
                width={200}
                height={266}
                className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
              />
              <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:text-primary transition-colors">
                <Heart size={18} />
              </button>
            </div>
            <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
            <p className="text-primary font-bold">{product.price}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
