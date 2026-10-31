/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, Sparkles, Tv, FolderLock, UserCheck } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'about' | 'episodes' | 'characters' | 'bottle';
  setActiveTab: (tab: 'home' | 'about' | 'episodes' | 'characters' | 'bottle') => void;
  onNavigateSection?: (sectionId: string) => void;
}

export default function Navbar({ activeTab, setActiveTab, onNavigateSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exact menu requested: home - satowshi id - case files - grandmas tv
  const navItems = [
    { id: 'home', label: 'Home', icon: Sparkles },
    { id: 'about', label: "Satowshi's ID", icon: UserCheck },
    { id: 'characters', label: 'Case Files', icon: FolderLock },
    { id: 'episodes', label: "Grandma's TV", icon: Tv },
  ];

  const handleItemClick = (id: string) => {
    setActiveTab(id as 'home' | 'about' | 'episodes' | 'characters' | 'bottle');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFindUsClick = () => {
    setMobileMenuOpen(false);
    if (onNavigateSection) {
      onNavigateSection('contact');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FFFBEB]/95 backdrop-blur-md border-b-[3.5px] border-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => handleItemClick('home')}
            className="flex items-center gap-3 group text-left focus:outline-none"
            aria-label="Satowshi Home"
          >
            <div className="relative">
              <img
                src="/assets/aistudio/99385254-2695-41c4-9243-f43e78dce24c_c69ea96b.png"
                alt="Satowshi Official Logo"
                className="h-12 md:h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-105 group-hover:rotate-1"
              />
            </div>
          </button>

          {/* Desktop Navigation: Home - Satowshi ID - Case Files - Grandma's TV */}
          <nav className="hidden md:flex items-center gap-2" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`px-4 py-2 rounded-xl font-comic text-sm tracking-wide transition-all duration-150 flex items-center gap-2 ${
                    isActive
                      ? 'bg-amber-400 text-gray-950 comic-box-sm -translate-y-0.5'
                      : 'text-gray-700 hover:text-gray-950 hover:bg-amber-100/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-gray-900' : 'text-gray-500'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-3">
            {/* Find Us Button - Fully functional on desktop & mobile */}
            <button
              onClick={handleFindUsClick}
              className="comic-btn bg-amber-400 hover:bg-amber-300 text-gray-950 px-5 py-2.5 rounded-xl text-sm font-comic shadow-[3px_3px_0px_#111827] flex items-center gap-2"
              aria-label="Find Us (Social Links)"
            >
              <span>Find Us</span>
              <span className="text-xs">→</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl border-[2.5px] border-gray-900 bg-amber-200 text-gray-900"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFBEB] border-t-[3px] border-gray-900 px-4 pt-3 pb-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full px-4 py-3 rounded-xl font-comic text-base flex items-center gap-3 transition-colors ${
                  isActive
                    ? 'bg-amber-400 text-gray-950 comic-box-sm font-bold'
                    : 'text-gray-800 hover:bg-amber-100'
                }`}
              >
                <Icon className="w-5 h-5 text-gray-700" />
                {item.label}
              </button>
            );
          })}
          <div className="pt-2">
            <button
              onClick={handleFindUsClick}
              className="w-full comic-btn bg-amber-400 text-gray-950 py-3 rounded-xl text-center text-sm font-comic"
            >
              Find Us Out There (Socials)
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
