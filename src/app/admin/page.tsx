'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  BrainCircuit,
  LogOut,
  Sparkles,
  ArrowUpRight,
  Activity
} from 'lucide-react';
import Image from 'next/image';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [cmsContent, setCmsContent] = useState({
    heroTitle: 'Blooms that Never Fade',
    heroSub: 'Experience the soul of Nepalese craftsmanship...',
    heritageText: 'Established in 2026 in the heart of Kathmandu...',
    instagram: 'https://instagram.com/devispetals',
    facebook: 'https://facebook.com/devispetals',
    whatsapp: '+9715611588'
  });

  const stats = [
    { label: 'Revenue', value: 'रू 1,25,000', icon: <TrendingUp size={20} />, color: 'bg-emerald-500', trend: '+12.5%' },
    { label: 'Orders', value: '12', icon: <ShoppingBag size={20} />, color: 'bg-rose-500', trend: '+4.2%' },
    { label: 'Leads', value: '45', icon: <Users size={20} />, color: 'bg-violet-500', trend: '+22.1%' },
  ];

  const orders = [
    { id: '#8801', name: 'Sujal P.', phone: '9841223344', product: 'Eternal Rose', status: 'Pending', date: 'May 12' },
    { id: '#8802', name: 'Rajesh K.', phone: '9851099887', product: 'Custom Bundle', status: 'Shipped', date: 'May 11' },
    { id: '#8803', name: 'Sita S.', phone: '9801122334', product: 'Gold Lily', status: 'Delivered', date: 'May 10' },
  ];

  return (
    <div className="flex min-h-screen bg-[#fafafa] text-metal-black">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-100 p-8 flex flex-col">
        <div className="flex items-center gap-4 mb-12 px-2">
          <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
             <Image src="/images/logo_minimal.jpg" alt="Logo" width={24} height={24} className="rounded-lg" />
          </div>
          <span className="font-black text-lg tracking-tighter uppercase">Devis Petals</span>
        </div>

        <nav className="space-y-2 flex-1">
          <SidebarLink icon={<LayoutDashboard size={20} />} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <SidebarLink icon={<ShoppingBag size={20} />} label="Orders" active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
          <SidebarLink icon={<BrainCircuit size={20} />} label="Lead Gen" active={activeTab === 'leads'} onClick={() => setActiveTab('leads')} />
          <SidebarLink icon={<Activity size={20} />} label="CMS" active={activeTab === 'cms'} onClick={() => setActiveTab('cms')} />
          <SidebarLink icon={<Sparkles size={20} />} label="Social" active={activeTab === 'social'} onClick={() => setActiveTab('social')} />
        </nav>

        <button className="flex items-center gap-3 text-gray-400 hover:text-red-500 transition-colors px-4 py-4 mt-auto font-bold text-sm">
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-black tracking-tight mb-2 uppercase">
              {activeTab === 'dashboard' ? 'CEO Overview' : activeTab}
            </h1>
            <p className="text-gray-400 font-medium">Managing the everlasting legacy of Devis Petals.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
               <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-200"></div>
               <span className="text-xs font-black uppercase tracking-widest text-gray-500">System Live</span>
            </div>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-50">
                  <div className={`w-12 h-12 ${stat.color} text-white rounded-xl flex items-center justify-center mb-6`}>{stat.icon}</div>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-black">{stat.value}</h3>
                </div>
              ))}
            </div>
            
            <div className="bg-white p-10 rounded-[48px] shadow-sm border border-gray-50">
               <h2 className="text-xl font-black mb-8">Strategic Growth</h2>
               <div className="space-y-4">
                 <Suggestion text="Focus on the wedding season in Kathmandu valley (Oct-Dec)." />
                 <Suggestion text="Partner with luxury gift shops in Thamel and Durbar Marg." />
               </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-[48px] shadow-sm border border-gray-50 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="p-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Order ID</th>
                  <th className="p-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Customer</th>
                  <th className="p-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Product</th>
                  <th className="p-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                  <th className="p-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="p-8 font-bold">{order.id}</td>
                    <td className="p-8">
                      <div className="font-bold">{order.name}</div>
                      <div className="text-xs text-gray-400">{order.phone}</div>
                    </td>
                    <td className="p-8 font-medium">{order.product}</td>
                    <td className="p-8">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-8 text-gray-400 font-medium">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'cms' && (
          <div className="bg-white p-12 rounded-[48px] shadow-sm border border-gray-100 max-w-4xl">
            <h2 className="text-2xl font-black mb-10">Front-end Content Manager</h2>
            <div className="space-y-8">
              <CmsInput label="Hero Title" value={cmsContent.heroTitle} onChange={(v: string) => setCmsContent({...cmsContent, heroTitle: v})} />
              <CmsInput label="Hero Subtitle" value={cmsContent.heroSub} onChange={(v: string) => setCmsContent({...cmsContent, heroSub: v})} />
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Heritage Story</label>
                <textarea 
                  value={cmsContent.heritageText}
                  onChange={(e) => setCmsContent({...cmsContent, heritageText: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-3xl p-6 text-sm min-h-[150px]"
                />
              </div>
              <button className="bg-primary text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl">
                Update Website Content
              </button>
            </div>
          </div>
        )}

        {activeTab === 'social' && (
          <div className="bg-white p-12 rounded-[48px] shadow-sm border border-gray-100 max-w-2xl">
            <h2 className="text-2xl font-black mb-10">Social Media Connectivity</h2>
            <div className="space-y-8">
              <CmsInput label="Instagram URL" value={cmsContent.instagram} onChange={(v: string) => setCmsContent({...cmsContent, instagram: v})} />
              <CmsInput label="Facebook URL" value={cmsContent.facebook} onChange={(v: string) => setCmsContent({...cmsContent, facebook: v})} />
              <CmsInput label="WhatsApp Number" value={cmsContent.whatsapp} onChange={(v: string) => setCmsContent({...cmsContent, whatsapp: v})} />
              <button className="bg-metal-black text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl">
                Sync Social Accounts
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function SidebarLink({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: any }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-sm ${
        active 
          ? 'bg-metal-black text-white shadow-xl shadow-gray-200' 
          : 'text-gray-400 hover:text-metal-black hover:bg-gray-50'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function Suggestion({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
      <p className="text-sm font-medium text-gray-300 leading-relaxed">{text}</p>
    </div>
  );
}

function CmsInput({ label, value, onChange }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">{label}</label>
      <input 
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm"
      />
    </div>
  );
}
