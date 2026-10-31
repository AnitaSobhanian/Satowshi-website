/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import HomeHero from './components/HomeHero';
import SpinTheBottle from './components/SpinTheBottle';
import AboutPassport from './components/AboutPassport';
import GrandmasTV from './components/GrandmasTV';
import CaseFilesDirectory from './components/CaseFilesDirectory';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { Tv, FolderLock, Sparkles, ArrowRight, ShieldAlert } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'episodes' | 'characters' | 'bottle'>('home');

  // Handle URL hash on initial load
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'about' || hash === 'episodes' || hash === 'characters' || hash === 'bottle') {
      setActiveTab(hash as typeof activeTab);
    }
  }, []);

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    window.location.hash = tab === 'home' ? '' : tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Robust Find Us / section scroll handler for desktop & mobile
  const handleScrollToSection = (sectionId: string) => {
    if (sectionId === 'contact') {
      if (activeTab !== 'home') {
        setActiveTab('home');
        window.location.hash = '';
        setTimeout(() => {
          const el = document.getElementById('contact-section');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 120);
      } else {
        const el = document.getElementById('contact-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FEF9EF] text-gray-900 selection:bg-amber-300 selection:text-gray-950">
      {/* Custom Contextual Animated Cartoon Cursor */}
      <CustomCursor />

      {/* Main Comic Sticky Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onNavigateSection={handleScrollToSection}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {/* 1. HOME VIEW */}
        {activeTab === 'home' && (
          <div>
            {/* Animated Hero Section with Typewriter & 2D Scene */}
            <HomeHero
              onSpinClick={() => {
                const el = document.getElementById('spin-bottle-section');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              onWatchEpisodes={() => handleTabChange('episodes')}
              onOpenPassport={() => handleTabChange('about')}
            />

            {/* Spin The Bottle Game (4 characters: Satowshi, Emily, Jones, High) */}
            <SpinTheBottle />

            {/* Universe Previews Banner: Grandma's TV & Police Case Files */}
            <section className="py-16 md:py-20 bg-[#FFFBEB] border-b-[4px] border-gray-950">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-300 border-[2px] border-gray-950 rounded-lg text-xs font-comic uppercase text-gray-950 shadow-[2px_2px_0px_#111827]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Explore More Of The Animated World</span>
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-comic text-gray-950">
                    CHOOSE YOUR ADVENTURE
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Card 1: Grandma's TV */}
                  <div
                    onClick={() => handleTabChange('episodes')}
                    className="comic-box bg-white p-7 rounded-3xl cursor-pointer hover:-translate-y-2 transition-transform duration-200 flex flex-col justify-between space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-14 h-14 rounded-2xl bg-purple-100 border-[3px] border-gray-950 flex items-center justify-center shadow-sm">
                          <Tv className="w-7 h-7 text-purple-700" />
                        </div>
                        {/* Multiple character avatars shown */}
                        <div className="flex -space-x-3">
                          <img src="/assets/aistudio/grandma_acce9c8f.png" alt="Grandma" className="w-10 h-10 rounded-full border-2 border-gray-900 bg-white" />
                          <img src="/assets/aistudio/jones_34ed27d4.png" alt="Jones" className="w-10 h-10 rounded-full border-2 border-gray-900 bg-emerald-100" />
                          <img src="/assets/aistudio/harvey_4bfe5089.png" alt="Harvey" className="w-10 h-10 rounded-full border-2 border-gray-900 bg-red-100" />
                        </div>
                      </div>

                      <h3 className="font-comic text-2xl sm:text-3xl text-gray-950">
                        Grandma&rsquo;s TV (Episodes)
                      </h3>
                      <p className="font-round text-sm text-gray-700 leading-relaxed">
                        Watch all 3 episodes on the vintage CRT set with channel knobs and remote controls.
                        Enjoy live character commentary and chapter selectors!
                      </p>
                    </div>

                    <div className="comic-btn w-full bg-purple-300 text-gray-950 py-3 rounded-2xl text-center text-sm flex items-center justify-center gap-2">
                      <span>Watch On Grandma&rsquo;s TV</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Card 2: Criminal Case Files */}
                  <div
                    onClick={() => handleTabChange('characters')}
                    className="comic-box bg-white p-7 rounded-3xl cursor-pointer hover:-translate-y-2 transition-transform duration-200 flex flex-col justify-between space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-14 h-14 rounded-2xl bg-red-100 border-[3px] border-gray-950 flex items-center justify-center shadow-sm">
                          <FolderLock className="w-7 h-7 text-red-700" />
                        </div>
                        {/* Multiple character avatars shown */}
                        <div className="flex -space-x-3">
                          <img src="/assets/aistudio/satowshi_f8205e9e.png" alt="Satowshi" className="w-10 h-10 rounded-full border-2 border-gray-900 bg-white" />
                          <img src="/assets/aistudio/abolian_e77e6eb3.png" alt="Abolian" className="w-10 h-10 rounded-full border-2 border-gray-900 bg-blue-100" />
                          <img src="/assets/aistudio/body-bulder_8101fa6a.png" alt="Bruno" className="w-10 h-10 rounded-full border-2 border-gray-900 bg-orange-100" />
                        </div>
                      </div>

                      <h3 className="font-comic text-2xl sm:text-3xl text-gray-950">
                        Wanted: Criminal Case Files
                      </h3>
                      <p className="font-round text-sm text-gray-700 leading-relaxed">
                        Manila folders, police mugshots against height charts, danger meters, and redacted
                        black marker secrets you can reveal on hover.
                      </p>
                    </div>

                    <div className="comic-btn w-full bg-amber-400 text-gray-950 py-3 rounded-2xl text-center text-sm flex items-center justify-center gap-2">
                      <span>Open Detective Case Files</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Social Links Contact Section - Rendered ONLY on Home Page as requested */}
            <ContactSection />
          </div>
        )}

        {/* 2. ABOUT PAGE: SATOWSHI ID */}
        {activeTab === 'about' && (
          <div>
            <AboutPassport />
          </div>
        )}

        {/* 3. CASE FILES PAGE */}
        {activeTab === 'characters' && (
          <div>
            <CaseFilesDirectory />
          </div>
        )}

        {/* 4. GRANDMA'S TV EPISODES PAGE */}
        {activeTab === 'episodes' && (
          <div>
            <GrandmasTV />
          </div>
        )}

        {/* 5. BOTTLE DIRECT VIEW */}
        {activeTab === 'bottle' && (
          <div>
            <SpinTheBottle />
          </div>
        )}
      </main>

      {/* Global Cartoon Footer with Animation Production Credits & App Icons */}
      <Footer onNavigateTab={handleTabChange} />
    </div>
  );
}
