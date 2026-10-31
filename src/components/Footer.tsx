/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUp, Sparkles, Film, Clapperboard } from 'lucide-react';
import { SOCIAL_LINKS } from './ContactSection';

interface FooterProps {
  onNavigateTab: (tab: 'home' | 'about' | 'episodes' | 'characters' | 'bottle') => void;
}

export default function Footer({ onNavigateTab }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Official production credits derived directly from the animated series reference video credits!
  const productionCredits = [
    { role: 'Creators', names: 'Peiman Sobhanian · Milad Kazemi · Ali Madandoost' },
    { role: 'Directors', names: 'Nima Valibeigi · Milad Ahmadi' },
    { role: 'Producers', names: 'Milad Kazemi · Peiman Sobhanian' },
    { role: 'Written By', names: 'Nima Valibeigi' },
    { role: 'Art Director', names: 'Milad Ahmadi' },
    { role: 'Character Design', names: 'Ali Madandoost' },
    { role: 'Animation Supervisor', names: 'Negar Aminfar' },
    { role: 'Animators', names: 'Sahar Karami · Delafrooz Sherafati · Negar Aminfar · Ali Madandoost' },
    { role: 'Editor & Sound Design', names: 'Omid Sadeghi' },
    { role: 'Storyboard Assistant', names: 'Kiana Zarei' },
    { role: 'Music & Voices', names: 'Suno · ElevenLabs' },
  ];

  return (
    <footer className="bg-[#0F172A] text-white border-t-[4px] border-gray-950 pt-16 pb-12 relative overflow-hidden">
      {/* Dark Halftone Texture */}
      <div className="absolute inset-0 bg-halftone-dark pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Top Section: Brand + Social Icons + Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between">
          {/* Brand & Socials Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/99385254-2695-41c4-9243-f43e78dce24c_c69ea96b.png"
                alt="Satowshi Logo"
                className="h-12 w-auto object-contain filter drop-shadow-[0_2px_4px_rgba(255,255,255,0.15)]"
              />
            </div>
            <p className="font-round text-xs sm:text-sm text-gray-400 max-w-sm leading-relaxed">
              The original 2D animated cartoon universe of Satowshi and his gang.
              Million dollar dreams with nowhere to hide!
            </p>

            {/* Social Icons for each app */}
            <div className="pt-2">
              <span className="font-comic text-[11px] uppercase tracking-wider text-gray-400 block mb-2.5">
                Official Channels:
              </span>
              <div className="flex items-center gap-2.5">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-white transition-all hover:scale-110 hover:border-amber-400"
                    title={link.name}
                    aria-label={`Visit our ${link.name} channel`}
                  >
                    {link.svgIcon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-comic text-sm uppercase text-amber-400 tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-comic text-gray-300">
              <li>
                <button
                  onClick={() => onNavigateTab('home')}
                  className="hover:text-amber-400 transition-colors"
                >
                  → Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('about')}
                  className="hover:text-amber-400 transition-colors"
                >
                  → Satowshi&rsquo;s ID
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('characters')}
                  className="hover:text-amber-400 transition-colors"
                >
                  → Case Files
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('episodes')}
                  className="hover:text-amber-400 transition-colors"
                >
                  → Grandma&rsquo;s TV
                </button>
              </li>
            </ul>
          </div>

          {/* Back to top & Jump button */}
          <div className="md:col-span-4 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs font-round text-gray-400">
              <div className="flex items-center gap-2 font-comic text-amber-400 text-sm">
                <Film className="w-4 h-4" />
                <span>Animation Production</span>
              </div>
              <p>
                Handcrafted frame-by-frame 2D animation with original character designs, humor, and satirical storytelling.
              </p>
            </div>

            <button
              onClick={scrollToTop}
              className="comic-btn w-full bg-slate-800 hover:bg-slate-700 text-gray-200 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 border-[2px] border-slate-700"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back To Top</span>
            </button>
          </div>
        </div>

        {/* OFFICIAL ANIMATION PRODUCTION CREDITS (Based on the reference video credits!) */}
        <div className="pt-8 border-t border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-xs font-comic text-amber-400 uppercase tracking-widest">
            <Clapperboard className="w-4 h-4 text-amber-400" />
            <span>Official Animation Production Credits</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
            {productionCredits.map((credit, idx) => (
              <div key={idx} className="space-y-0.5">
                <span className="text-[10px] font-comic uppercase text-amber-300 block">
                  {credit.role}
                </span>
                <p className="font-round text-xs text-gray-300 leading-snug">
                  {credit.names}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Legal Disclaimer */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between text-[11px] text-gray-500 font-round gap-4 text-center md:text-left">
          <p>
            © {new Date().getFullYear()} Satowshi Animated Series. All characters, stories, and crypto pizza debts are 100% fictional.
          </p>
          <div className="flex items-center gap-1.5 text-gray-400 font-comic text-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>&ldquo;He was nobody... now he&rsquo;s on a golden throne!&rdquo;</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
