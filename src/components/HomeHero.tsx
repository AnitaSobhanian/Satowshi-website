/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Play, Flame, Beer, ArrowDown, Sparkles } from 'lucide-react';
import { soundFx } from '../logic/audioFx';

interface HomeHeroProps {
  onSpinClick: () => void;
  onWatchEpisodes: () => void;
  onOpenPassport: () => void;
}

const TYPEWRITER_PHRASES = [
  'Where Bitcoin changed everything and nobody knows what they are doing!',
  'The only cartoon series where trading charts turns into a fist fight!',
  'Grandma says: nobody touches her TV... or face the flying slipper!',
  'Traded 10,000 Bitcoins for 20 pizzas? Best financial decision ever!',
];

export default function HomeHero({ onSpinClick, onWatchEpisodes, onOpenPassport }: HomeHeroProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [satowshiSpeech, setSatowshiSpeech] = useState<'default' | 'pizza' | 'stare'>('default');
  const [jonesSpeech, setJonesSpeech] = useState(false);

  // Typewriter effect with reduced-motion fallback
  useEffect(() => {
    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayText(TYPEWRITER_PHRASES[0]);
      return;
    }

    const currentPhrase = TYPEWRITER_PHRASES[phraseIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayText.length < currentPhrase.length) {
      timer = setTimeout(() => {
        setDisplayText(currentPhrase.slice(0, displayText.length + 1));
      }, 50);
    } else if (!isDeleting && displayText.length === currentPhrase.length) {
      timer = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && displayText.length > 0) {
      timer = setTimeout(() => {
        setDisplayText(currentPhrase.slice(0, displayText.length - 1));
      }, 25);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex]);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24 bg-halftone">
      {/* Decorative comic rays in background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center overflow-hidden">
        <div className="w-[800px] h-[800px] rounded-full border-[40px] border-amber-300 border-dashed animate-spin" style={{ animationDuration: '60s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Comic Ticker Joke */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-200 border-[2px] border-gray-900 text-xs sm:text-sm font-comic text-gray-900 shadow-[2px_2px_0px_#111827]">
            <Flame className="w-4 h-4 text-orange-600 animate-bounce" />
            <span>BREAKING NEWS: 1 BTC = 10,000 PEPPERONI PIZZAS</span>
            <span className="text-gray-400">·</span>
            <span className="text-emerald-700 font-bold">SIMP INDEX: 100% BULLISH</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headlines & Story intro */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 bg-yellow-300 border-[2px] border-gray-900 rounded-lg text-xs font-comic uppercase tracking-wider text-gray-900 rotate-[-1deg] shadow-[2px_2px_0px_#111827]">
                Official Fictional Animated Universe
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-comic text-gray-950 tracking-tight leading-[1.08] drop-shadow-[2px_2px_0px_#F59E0B]">
                HEY SATOWSHI! <br />
                <span className="text-amber-500 drop-shadow-[2px_2px_0px_#111827]">
                  WHAT A CRAZY RIDE!
                </span>
              </h1>
            </div>

            {/* Typewriter Box with Strictly Stable Fixed Size */}
            <div className="h-24 sm:h-20 bg-white border-[3px] border-gray-900 rounded-2xl px-5 shadow-[4px_4px_0px_#111827] flex items-center justify-center lg:justify-start overflow-hidden">
              <p className="font-comic text-base sm:text-lg md:text-xl text-gray-800 leading-snug line-clamp-2">
                <span>&ldquo;{displayText}&rdquo;</span>
                <span className="inline-block w-2.5 h-4 sm:h-5 bg-amber-500 ml-1 translate-y-0.5 animate-blink" />
              </p>
            </div>

            <p className="text-gray-700 font-round text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Step into the animated universe of <strong className="text-gray-950 font-semibold">Satowshi</strong>,
              the crypto bull who stumbled onto the most expensive pizza in history. Watch episodes on Grandma&rsquo;s TV,
              play the wild tavern bottle-spinning game, and inspect criminal case files!
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => {
                  soundFx.playPop();
                  onSpinClick();
                }}
                className="comic-btn bg-amber-400 hover:bg-amber-300 text-gray-950 px-6 py-3.5 rounded-2xl text-base sm:text-lg flex items-center gap-2.5 shadow-[4px_4px_0px_#111827]"
              >
                <Beer className="w-5 h-5 text-gray-900" />
                <span>Spin The Bottle!</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playStaticNoise();
                  onWatchEpisodes();
                }}
                className="comic-btn bg-white hover:bg-gray-100 text-gray-900 px-6 py-3.5 rounded-2xl text-base sm:text-lg flex items-center gap-2.5 shadow-[4px_4px_0px_#111827]"
              >
                <Play className="w-5 h-5 fill-current text-rose-500" />
                <span>Grandma&rsquo;s TV (Episodes)</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playStampSlam();
                  onOpenPassport();
                }}
                className="comic-btn bg-emerald-400 hover:bg-emerald-300 text-gray-950 px-5 py-3.5 rounded-2xl text-base flex items-center gap-2 shadow-[4px_4px_0px_#111827]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Satoshi&rsquo;s ID</span>
              </button>
            </div>
          </div>

          {/* Right Column: 2D Animated Scene with Satowshi & Jones */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-md sm:max-w-lg aspect-square flex items-center justify-center">
              {/* Comic Backdrop Sunburst Circle */}
              <div className="absolute w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] rounded-full bg-amber-300/80 border-[3.5px] border-gray-900 shadow-[6px_6px_0px_#111827]" />

              {/* Floating Bitcoin Coin Asset with animation */}
              <div
                className="absolute top-4 right-6 sm:right-10 z-20 w-16 h-16 sm:w-20 sm:h-20 bg-yellow-400 rounded-full border-[3px] border-gray-900 shadow-[3px_3px_0px_#111827] flex items-center justify-center text-2xl sm:text-3xl font-comic text-gray-900 animate-float"
                title="10,000 BTC Pizza Coin!"
              >
                ₿
              </div>

              {/* Satowshi Character Image */}
              <div className="relative z-10 w-72 sm:w-84 transition-transform hover:scale-105 duration-200">
                <img
                  src="/assets/aistudio/satowshi_f8205e9e.png"
                  alt="Satowshi The Crypto Bull"
                  className="w-full h-auto object-contain filter drop-shadow-[0_12px_12px_rgba(0,0,0,0.18)]"
                />

                {/* Clickable speech bubble from Satowshi */}
                <button
                  onClick={() => {
                    soundFx.playBoing();
                    setSatowshiSpeech(
                      satowshiSpeech === 'default' ? 'pizza' : satowshiSpeech === 'pizza' ? 'stare' : 'default'
                    );
                  }}
                  className="absolute -top-4 -left-6 sm:-left-12 bg-white border-[2.5px] border-gray-900 rounded-2xl px-3.5 py-2 shadow-[3px_3px_0px_#111827] text-xs font-comic text-gray-900 hover:bg-yellow-100 transition-transform hover:-translate-y-1"
                  aria-label="Satowshi Quote Bubble"
                >
                  {satowshiSpeech === 'default' && '👍 Diamond hooves! HODL!'}
                  {satowshiSpeech === 'pizza' && '🍕 20 extra-large pepperonis!'}
                  {satowshiSpeech === 'stare' && '👀 Winning the stare-down fight!'}
                </button>
              </div>

              {/* Jones the Chameleon Sidekick perched on the side */}
              <div className="absolute -bottom-2 -left-2 sm:left-2 z-20 w-32 sm:w-40 transition-transform hover:rotate-3 duration-200">
                <img
                  src="/assets/aistudio/jones_34ed27d4.png"
                  alt="Jones The Chameleon Sidekick"
                  className="w-full h-auto object-contain filter drop-shadow-[0_8px_8px_rgba(0,0,0,0.15)]"
                />
                <button
                  onClick={() => {
                    soundFx.playBoing();
                    setJonesSpeech(!jonesSpeech);
                  }}
                  className="absolute -top-6 right-0 bg-emerald-100 border-[2px] border-gray-900 rounded-xl px-2.5 py-1 text-[11px] font-comic text-gray-900 shadow-[2px_2px_0px_#111827] hover:bg-emerald-200"
                  aria-label="Jones Quote Bubble"
                >
                  {jonesSpeech ? '💨 "Shut up dude!"' : '🦎 Click me, boss!'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator prompt to Bottle Game */}
        <div className="mt-12 text-center">
          <button
            onClick={onSpinClick}
            className="inline-flex items-center gap-2 text-xs font-comic text-gray-600 hover:text-gray-950 transition-colors uppercase tracking-wider animate-bounce"
          >
            <span>Scroll Down to Spin The Bottle</span>
            <ArrowDown className="w-4 h-4 text-amber-500" />
          </button>
        </div>
      </div>
    </section>
  );
}
