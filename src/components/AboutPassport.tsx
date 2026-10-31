/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, MapPin, Users, Stamp, Sparkles, AlertCircle } from 'lucide-react';
import { soundFx } from '../logic/audioFx';

export default function AboutPassport() {
  const [activePage, setActivePage] = useState<'id' | 'stamps' | 'associates' | 'seals'>('id');
  const [placedStamps, setPlacedStamps] = useState<string[]>(['fictional']);
  const [revealedNote, setRevealedNote] = useState(false);

  const availableStamps = [
    { id: 'fictional', label: 'FICTIONAL DOCUMENT', color: '#DC2626', rotation: '-6deg' },
    { id: 'hodl', label: 'CERTIFIED DIAMOND HOOVES', color: '#2563EB', rotation: '8deg' },
    { id: 'simp', label: 'VERIFIED SIMP SUPREME', color: '#D97706', rotation: '-12deg' },
    { id: 'pizza', label: 'PAID 10,000 BTC FOR LUNCH', color: '#059669', rotation: '4deg' },
    { id: 'grandma', label: 'GRANDMA APPROVED (BARELY)', color: '#7C3AED', rotation: '-4deg' },
  ];

  const handleAddStamp = (stampId: string) => {
    soundFx.playStampSlam();
    if (!placedStamps.includes(stampId)) {
      setPlacedStamps((prev) => [...prev, stampId]);
    }
  };

  const pages = [
    { id: 'id', label: 'Official Passport ID', icon: ShieldCheck },
    { id: 'stamps', label: 'Places Visited & Visas', icon: MapPin },
    { id: 'associates', label: 'Known Associates', icon: Users },
    { id: 'seals', label: 'Rubber Stamps Lab', icon: Stamp },
  ];

  return (
    <section className="py-12 md:py-20 bg-[#F3E8D2] min-h-[calc(100vh-80px)] relative overflow-hidden">
      {/* Halftone & Leather texture */}
      <div className="absolute inset-0 bg-halftone pointer-events-none opacity-30" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Title Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-300 border-[2px] border-gray-900 rounded-lg text-xs font-comic uppercase text-gray-950 shadow-[2px_2px_0px_#111827]">
            <Sparkles className="w-3.5 h-3.5 text-amber-800" />
            <span>Classified Bovine Registry</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-comic text-gray-950 tracking-tight">
            SATOSHI&rsquo;S OFFICIAL ID <br className="hidden sm:inline" />
            <span className="text-amber-600 text-3xl sm:text-5xl">(DEFINITELY NOT FAKE)</span>
          </h1>
          <p className="text-gray-700 font-round text-sm sm:text-base max-w-xl mx-auto">
            The certified passport of Satowshi, issued by the Central Bank of Decentralized Chaos.
            Flip through his visas, inspect his biometric details, and stamp his passport.
          </p>
        </div>

        {/* Page Switcher Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {pages.map((p) => {
            const Icon = p.icon;
            const isActive = activePage === p.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  soundFx.playPop();
                  setActivePage(p.id as 'id' | 'stamps' | 'associates' | 'seals');
                }}
                className={`comic-btn px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-amber-400 text-gray-950 -translate-y-1 shadow-[4px_4px_0px_#111827]'
                    : 'bg-white text-gray-800 hover:bg-amber-100'
                }`}
              >
                <Icon className="w-4 h-4 text-gray-900" />
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>

        {/* Passport Booklet Container */}
        <div className="relative bg-[#FFFBEB] border-[4px] border-gray-950 rounded-3xl shadow-[10px_10px_0px_#111827] overflow-hidden p-6 sm:p-10">
          {/* Top Gold Ribbon Accent */}
          <div className="flex items-center justify-between border-b-[2.5px] border-amber-900/20 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-amber-500 border border-gray-900" />
              <span className="font-comic text-xs uppercase tracking-widest text-amber-950">
                SOVEREIGN REPUBLIC OF SATOWSHI · OFFICIAL PASSPORT
              </span>
            </div>
            <span className="font-typewriter text-xs font-bold text-red-700 tracking-wider">
              DOC NO: #BTC-2009-HODL
            </span>
          </div>

          {/* PAGE 1: BIOMETRIC ID CARD */}
          {activePage === 'id' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Photo Area with Passport Stamp */}
              <div className="md:col-span-5 flex flex-col items-center">
                <div className="relative group w-48 h-56 sm:w-56 sm:h-64 rounded-2xl border-[3.5px] border-gray-950 bg-amber-100/70 overflow-hidden shadow-[5px_5px_0px_#111827] p-2 flex flex-col items-center justify-center">
                  {/* Holographic Watermark effect */}
                  <div className="absolute top-2 right-2 text-2xl opacity-20 pointer-events-none font-comic">
                    ₿
                  </div>

                  <img
                    src="/assets/aistudio/satowshi_f8205e9e.png"
                    alt="Satowshi Passport Photo"
                    className="w-full h-full object-contain filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform duration-200"
                  />

                  {/* Stamp over photo */}
                  <div className="absolute bottom-2 left-2 right-2 bg-red-600/90 text-white text-[10px] font-comic uppercase text-center py-0.5 rounded border border-gray-900 rotate-[-4deg] shadow-sm">
                    VERIFIED IMMUTABLE BULL
                  </div>
                </div>
                <span className="mt-3 text-[11px] font-typewriter text-gray-500">
                  SUBJECT SIGNATURE: ✍️ Satowshi Nakamoto-ish
                </span>
              </div>

              {/* Identity Fields in Typewriter Layout */}
              <div className="md:col-span-7 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-xl border-[2px] border-gray-900 shadow-sm">
                    <span className="text-[10px] font-comic uppercase text-gray-500 block">Full Name</span>
                    <span className="font-comic text-base text-gray-950">Satowshi &ldquo;The Bull&rdquo;</span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border-[2px] border-gray-900 shadow-sm">
                    <span className="text-[10px] font-comic uppercase text-gray-500 block">Date of Genesis</span>
                    <span className="font-comic text-base text-gray-950">January 3, 2009 (Block #0)</span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border-[2px] border-gray-900 shadow-sm">
                    <span className="text-[10px] font-comic uppercase text-gray-500 block">Official Occupation</span>
                    <span className="font-comic text-base text-gray-950">Chief Simp &amp; Pizza Pioneer</span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border-[2px] border-gray-900 shadow-sm">
                    <span className="text-[10px] font-comic uppercase text-gray-500 block">Current Status</span>
                    <span className="font-comic text-base text-emerald-600 flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                      Extremely Bullish
                    </span>
                  </div>
                </div>

                {/* Funny Quirks / Case Details */}
                <div className="bg-amber-50 p-4 rounded-xl border-[2px] border-gray-900 space-y-2">
                  <div className="text-xs font-round text-gray-800">
                    <strong className="font-comic text-gray-900">Known Weakness: </strong>
                    Pretty cows with briefcases, 20-slice pepperoni pizza, screaming &ldquo;Handjob&rdquo; when put under a 5-second countdown timer.
                  </div>
                  <div className="text-xs font-round text-gray-800">
                    <strong className="font-comic text-gray-900">Special Skills: </strong>
                    Dancing on brass poles at Watchyo Nutts Bar, surviving 99% portfolio drawdowns, staring down fast muscle cars.
                  </div>
                </div>

                {/* Peelable Sticky Note Easter Egg */}
                <div className="pt-1">
                  <button
                    onClick={() => {
                      soundFx.playBoing();
                      setRevealedNote(!revealedNote);
                    }}
                    className="comic-btn text-xs bg-yellow-200 text-gray-900 px-3 py-1.5 rounded-lg border-[1.5px] border-gray-900 hover:bg-yellow-300"
                  >
                    📌 {revealedNote ? 'Hide Secret Note' : 'Click to Peel Detective Sticky Note!'}
                  </button>

                  {revealedNote && (
                    <div className="mt-2 p-3 bg-yellow-100 border-[2px] border-yellow-500 rounded-xl font-marker text-xs text-yellow-900 shadow-sm animate-stamp">
                      &ldquo;Note from Officer Jones: Subject has never won an argument with Grandma. If seen near a TV, confiscate all remote controls immediately.&rdquo;
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* PAGE 2: PLACES VISITED & VISAS */}
          {activePage === 'stamps' && (
            <div className="space-y-6">
              <p className="font-round text-sm text-gray-700">
                Official travel log across the Satowshi cartoon timeline:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border-[2.5px] border-gray-950 shadow-[4px_4px_0px_#111827] space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 border border-gray-900 flex items-center justify-center text-sm">
                    🍕
                  </div>
                  <h4 className="font-comic text-base text-gray-950">No Steak Pizza</h4>
                  <p className="text-xs text-gray-600 font-round">
                    Location of the 2010 transaction. Fired for handing out free pizzas to girls.
                  </p>
                  <span className="inline-block text-[10px] font-typewriter text-red-600 border border-red-500 px-1.5 py-0.5 rounded rotate-[-3deg]">
                    BANNED ON SIGHT
                  </span>
                </div>

                <div className="bg-white p-4 rounded-2xl border-[2.5px] border-gray-950 shadow-[4px_4px_0px_#111827] space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 border border-gray-900 flex items-center justify-center text-sm">
                    🍻
                  </div>
                  <h4 className="font-comic text-base text-gray-950">Watchyo Nutts Bar</h4>
                  <p className="text-xs text-gray-600 font-round">
                    Scene of the legendary breaking news broadcast and pole celebration dance.
                  </p>
                  <span className="inline-block text-[10px] font-typewriter text-emerald-600 border border-emerald-500 px-1.5 py-0.5 rounded rotate-[2deg]">
                    VIP POLE DANCER
                  </span>
                </div>

                <div className="bg-white p-4 rounded-2xl border-[2.5px] border-gray-950 shadow-[4px_4px_0px_#111827] space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 border border-gray-900 flex items-center justify-center text-sm">
                    🍷
                  </div>
                  <h4 className="font-comic text-base text-gray-950">Rosetta Cafe &amp; Bar</h4>
                  <p className="text-xs text-gray-600 font-round">
                    Site of the awkward date with Abolian, cactus extraction, and Emily&rsquo;s bottle spins.
                  </p>
                  <span className="inline-block text-[10px] font-typewriter text-amber-600 border border-amber-500 px-1.5 py-0.5 rounded rotate-[-2deg]">
                    CACTUS CONFISCATED
                  </span>
                </div>

                <div className="bg-white p-4 rounded-2xl border-[2.5px] border-gray-950 shadow-[4px_4px_0px_#111827] space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-100 border border-gray-900 flex items-center justify-center text-sm">
                    🧶
                  </div>
                  <h4 className="font-comic text-base text-gray-950">Arandale Fabrics</h4>
                  <p className="text-xs text-gray-600 font-round">
                    Purchased the emergency $20 red cloth (&ldquo;Ass here please&rdquo;) to catch High.
                  </p>
                  <span className="inline-block text-[10px] font-typewriter text-blue-600 border border-blue-500 px-1.5 py-0.5 rounded rotate-[4deg]">
                    HEROIC CATCH VERIFIED
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* PAGE 3: KNOWN ASSOCIATES */}
          {activePage === 'associates' && (
            <div className="space-y-4">
              <p className="font-round text-sm text-gray-700">
                Individuals cataloged in Satowshi&rsquo;s primary orbit:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-2xl border-[2.5px] border-gray-950 shadow-[3px_3px_0px_#111827] flex items-center gap-3">
                  <img
                    src="/assets/aistudio/jones_34ed27d4.png"
                    alt="Jones"
                    className="w-14 h-14 object-contain rounded-xl bg-emerald-50 border border-gray-900"
                  />
                  <div>
                    <h4 className="font-comic text-base text-gray-950">Jones The Chameleon</h4>
                    <span className="text-xs text-emerald-700 font-comic">Tactical Earpiece Coach</span>
                    <p className="text-[11px] text-gray-600 font-round mt-0.5">Always tells him the truth 10 seconds too late.</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border-[2.5px] border-gray-950 shadow-[3px_3px_0px_#111827] flex items-center gap-3">
                  <img
                    src="/assets/aistudio/harvey_4bfe5089.png"
                    alt="Harvey"
                    className="w-14 h-14 object-contain rounded-xl bg-red-50 border border-gray-900"
                  />
                  <div>
                    <h4 className="font-comic text-base text-gray-950">Harvey The Cowboy</h4>
                    <span className="text-xs text-red-700 font-comic">Arch-Rival &amp; Car Smirker</span>
                    <p className="text-[11px] text-gray-600 font-round mt-0.5">Burns photos of Satowshi out of sheer jealousy.</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border-[2.5px] border-gray-950 shadow-[3px_3px_0px_#111827] flex items-center gap-3">
                  <img
                    src="/assets/aistudio/grandma_acce9c8f.png"
                    alt="Grandma"
                    className="w-14 h-14 object-contain rounded-xl bg-purple-50 border border-gray-900"
                  />
                  <div>
                    <h4 className="font-comic text-base text-gray-950">Grandma The Baker</h4>
                    <span className="text-xs text-purple-700 font-comic">Supreme Matriarch</span>
                    <p className="text-[11px] text-gray-600 font-round mt-0.5">Will feed you cupcakes or kick you through a wall.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PAGE 4: RUBBER STAMPS LAB */}
          {activePage === 'seals' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="font-comic text-xl text-gray-950">Stamp Satowshi&rsquo;s Passport!</h4>
                <p className="text-xs sm:text-sm text-gray-700 font-round">
                  Click any official rubber stamp below to slam it down with satisfying sound effects!
                </p>
              </div>

              {/* Stamp Palette */}
              <div className="flex flex-wrap gap-2.5">
                {availableStamps.map((stamp) => (
                  <button
                    key={stamp.id}
                    onClick={() => handleAddStamp(stamp.id)}
                    className="stamp-target comic-btn px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-900"
                    style={{ borderColor: stamp.color }}
                  >
                    <Stamp className="w-4 h-4" style={{ color: stamp.color }} />
                    <span style={{ color: stamp.color }}>{stamp.label}</span>
                  </button>
                ))}
              </div>

              {/* Stamped Canvas Surface */}
              <div className="relative min-h-[160px] bg-amber-50/60 rounded-2xl border-[2px] border-dashed border-gray-400 p-6 flex flex-wrap gap-4 items-center justify-center">
                {placedStamps.map((sId) => {
                  const stampInfo = availableStamps.find((s) => s.id === sId);
                  if (!stampInfo) return null;
                  return (
                    <div
                      key={sId}
                      className="px-4 py-2 rounded-lg border-[3px] font-comic text-sm tracking-wider uppercase shadow-md animate-stamp"
                      style={{
                        borderColor: stampInfo.color,
                        color: stampInfo.color,
                        transform: `rotate(${stampInfo.rotation})`,
                      }}
                    >
                      ★ {stampInfo.label} ★
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom Official Disclaimer Footer */}
          <div className="mt-8 pt-4 border-t-[2px] border-gray-200 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 font-round gap-2">
            <div className="flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>OFFICIAL NOTICE: This document is 100% fictional for parody &amp; cartoon entertainment only.</span>
            </div>
            <span className="font-typewriter text-gray-600">CERTIFIED IN RETRO CARTOON 2D</span>
          </div>
        </div>
      </div>
    </section>
  );
}
