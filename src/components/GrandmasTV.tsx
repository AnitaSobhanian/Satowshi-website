/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Play, Maximize2, Minimize2, Radio, ExternalLink, ListVideo } from 'lucide-react';
import { EPISODES, Episode, TV_COMPANIONS, TvCompanion } from '../logic/tvData';

export default function GrandmasTV() {
  const [currentChannelIndex, setCurrentChannelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isStaticGlitch, setIsStaticGlitch] = useState(false);
  const [tvPowerOn, setTvPowerOn] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeCompanion, setActiveCompanion] = useState<TvCompanion>(TV_COMPANIONS[0]);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const currentEp: Episode = EPISODES[currentChannelIndex];

  // Channel switch handler with static glitch
  const handleSwitchChannel = (index: number) => {
    if (index === currentChannelIndex && tvPowerOn) return;

    setIsStaticGlitch(true);
    setIsPlaying(false);

    setTimeout(() => {
      setCurrentChannelIndex(index);
      setIsStaticGlitch(false);
    }, 280);
  };

  const togglePower = () => {
    setTvPowerOn(!tvPowerOn);
    if (tvPowerOn) {
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current || !tvPowerOn) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleSelectChapter = (timestampStr: string) => {
    if (!videoRef.current) return;
    const parts = timestampStr.split(':').map(Number);
    let seconds = 0;
    if (parts.length === 2) {
      seconds = parts[0] * 60 + parts[1];
    }
    videoRef.current.currentTime = seconds;
    videoRef.current.play().catch(() => {});
    setIsPlaying(true);
  };

  // Keyboard navigation for TV: 1, 2, 3 to switch channels, Space for play/pause
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === '1') handleSwitchChannel(0);
      else if (e.key === '2') handleSwitchChannel(1);
      else if (e.key === '3') handleSwitchChannel(2);
      else if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentChannelIndex, tvPowerOn, isPlaying]);

  return (
    <section className="py-12 md:py-20 bg-[#FDF6E2] min-h-[calc(100vh-80px)] relative overflow-hidden">
      {/* Living Room Halftone Wallpaper */}
      <div className="absolute inset-0 bg-halftone pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Section Heading */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-200 border-[2px] border-gray-900 rounded-lg text-xs font-comic uppercase text-gray-950 shadow-[2px_2px_0px_#111827]">
            <Radio className="w-3.5 h-3.5 text-amber-900" />
            <span>Living Room Cinema &amp; TV Console</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-comic text-gray-950 tracking-tight">
            GRANDMA&rsquo;S TV: CHANNEL SURFING
          </h1>
          <p className="text-gray-700 font-round text-sm sm:text-base max-w-xl mx-auto">
            Tune the vintage CRT set, jump through story chapters, or watch the complete animated series on our official YouTube channel!
          </p>
        </div>

        {/* Main TV Stage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: The Vintage CRT TV Console */}
          <div className="lg:col-span-8 flex flex-col items-center">
            {/* TV Shell Case */}
            <div className="relative w-full max-w-2xl bg-[#5C3214] border-[6px] border-gray-950 rounded-[36px] p-5 sm:p-7 shadow-[10px_10px_0px_#111827]">
              {/* Antenna on top */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4 z-20 pointer-events-auto">
                <div
                  className="w-1.5 h-14 bg-gray-400 border border-gray-900 rounded-full rotate-[-28deg] animate-antenna origin-bottom cursor-pointer hover:rotate-[-34deg] transition-transform"
                  title="Wiggle Antenna"
                />
                <div
                  className="w-1.5 h-14 bg-gray-400 border border-gray-900 rounded-full rotate-[28deg] animate-antenna origin-bottom cursor-pointer hover:rotate-[34deg] transition-transform"
                  title="Wiggle Antenna"
                />
              </div>

              {/* TV Screen Container */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                {/* CRT Screen Display */}
                <div className="sm:col-span-9">
                  <div
                    className={`crt-screen relative w-full aspect-video rounded-3xl border-[5px] border-gray-950 overflow-hidden shadow-inner flex items-center justify-center ${
                      isFullscreen ? 'fixed inset-4 z-50 rounded-2xl aspect-auto max-w-none max-h-none' : ''
                    }`}
                  >
                    {!tvPowerOn ? (
                      // TV Off state
                      <div className="w-full h-full bg-[#111827] flex flex-col items-center justify-center text-center p-6 space-y-2">
                        <div className="w-4 h-4 rounded-full bg-red-600 animate-ping mb-2" />
                        <span className="font-comic text-gray-500 text-lg uppercase tracking-widest">
                          TV OFF · NO SIGNAL
                        </span>
                        <button
                          onClick={togglePower}
                          className="comic-btn bg-emerald-400 text-gray-950 px-4 py-2 rounded-xl text-xs mt-2"
                        >
                          Turn TV On
                        </button>
                      </div>
                    ) : isStaticGlitch ? (
                      // Static Noise Glitch
                      <div className="w-full h-full bg-black flex flex-col items-center justify-center relative overflow-hidden">
                        <div
                          className="absolute inset-0 opacity-80"
                          style={{
                            backgroundImage: `radial-gradient(circle, #fff 10%, transparent 10%)`,
                            backgroundSize: '4px 4px',
                          }}
                        />
                        <span className="relative z-10 font-comic text-white text-xl uppercase tracking-wider animate-pulse">
                          TUNING FREQUENCY...
                        </span>
                      </div>
                    ) : (
                      // Real Video Player
                      <div className="relative w-full h-full group">
                        <video
                          ref={videoRef}
                          src={currentEp.videoUrl}
                          playsInline
                          controls
                          onPlay={() => setIsPlaying(true)}
                          onPause={() => setIsPlaying(false)}
                          className="w-full h-full object-contain bg-black"
                          poster={currentEp.thumbnail}
                        />

                        {/* Top-Right CRT Channel Watermark */}
                        <div className="absolute top-3 right-3 z-30 pointer-events-none px-2.5 py-1 rounded bg-black/60 border border-green-400/60 font-typewriter text-xs font-bold text-green-400 shadow-sm">
                          {currentEp.channelCode} · {currentEp.duration}
                        </div>

                        {/* Fullscreen Toggle Button */}
                        <button
                          onClick={() => setIsFullscreen(!isFullscreen)}
                          className="absolute bottom-3 right-3 z-30 bg-gray-900/80 text-white p-2 rounded-lg border border-gray-600 hover:bg-gray-800 transition-colors"
                          title={isFullscreen ? 'Exit Fullscreen' : 'Expand TV'}
                          aria-label={isFullscreen ? 'Exit Fullscreen' : 'Expand TV'}
                        >
                          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Dial Panel: Vintage Knobs & Speaker Grille */}
                <div className="sm:col-span-3 flex sm:flex-col items-center justify-between sm:justify-center gap-3 bg-[#45240C] p-3 rounded-2xl border-[3px] border-gray-950">
                  {/* Channel Knob */}
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-comic text-[10px] text-amber-200 uppercase tracking-widest">
                      CH KNOB
                    </span>
                    <button
                      onClick={() => handleSwitchChannel((currentChannelIndex + 1) % EPISODES.length)}
                      className="tv-control-target w-12 h-12 rounded-full bg-[#E5E7EB] border-[3px] border-gray-950 shadow-[2px_2px_0px_#111827] flex items-center justify-center font-comic text-xs text-gray-950 hover:bg-amber-300 transition-transform active:rotate-45"
                      title="Turn Channel Knob"
                      aria-label="Turn Channel Knob"
                    >
                      CH {currentChannelIndex + 1}
                    </button>
                  </div>

                  {/* Power Button */}
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-comic text-[10px] text-amber-200 uppercase tracking-widest">
                      POWER
                    </span>
                    <button
                      onClick={togglePower}
                      className={`tv-control-target w-9 h-9 rounded-full border-[2.5px] border-gray-950 flex items-center justify-center font-comic text-[11px] shadow-sm transition-colors ${
                        tvPowerOn ? 'bg-red-500 text-white' : 'bg-gray-600 text-gray-300'
                      }`}
                      aria-label="Toggle TV Power"
                    >
                      PWR
                    </button>
                  </div>

                  {/* Speaker Slits */}
                  <div className="w-full max-w-[80px] space-y-1 py-1">
                    <div className="h-1 bg-gray-950 rounded-full" />
                    <div className="h-1 bg-gray-950 rounded-full" />
                    <div className="h-1 bg-gray-950 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Bottom Wooden Brand Badge */}
              <div className="mt-4 pt-3 border-t-[2px] border-amber-950/40 flex items-center justify-between text-xs text-amber-200 font-comic">
                <span>GRANDMA-VISION 3000 · CRT COLOR SYSTEM</span>
                <span className="text-[11px] font-round text-amber-300/80">Press 1, 2, or 3 to tune channel</span>
              </div>
            </div>

            {/* Chapter Selection Bar & Direct YouTube Link */}
            <div className="mt-6 w-full max-w-2xl bg-white border-[3px] border-gray-950 rounded-2xl p-4 shadow-[5px_5px_0px_#111827] space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-200 pb-3">
                <div className="flex items-center gap-2">
                  <ListVideo className="w-4 h-4 text-amber-600" />
                  <span className="font-comic text-xs uppercase text-gray-900 tracking-wider">
                    Select Chapter / Scene:
                  </span>
                </div>

                {/* Direct Link to YouTube Channel requested by user */}
                <a
                  href={currentEp.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="comic-btn px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-comic rounded-xl flex items-center gap-1.5 shadow-sm"
                >
                  <span>Watch on YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Chapter Buttons */}
              <div className="flex flex-wrap gap-2">
                {currentEp.chapters.map((chap, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectChapter(chap.timestamp)}
                    className="comic-btn px-3 py-1.5 rounded-lg text-xs bg-amber-50 hover:bg-amber-100 text-gray-900 border-[1.5px] border-gray-800 flex items-center gap-1.5"
                  >
                    <span className="font-mono text-[10px] text-amber-800 font-bold">{chap.timestamp}</span>
                    <span className="font-round">{chap.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Multi-Character Living Room Watch Party & Teaser Info */}
          <div className="lg:col-span-4 space-y-6">
            {/* TV Watch-Party Companion Selector (Multiple Characters, not just Grandma!) */}
            <div className="bg-white border-[3.5px] border-gray-950 rounded-3xl p-5 shadow-[6px_6px_0px_#111827] space-y-4">
              <div>
                <span className="text-[10px] font-comic uppercase tracking-wider text-gray-500 block">
                  Watch TV With A Character:
                </span>
                <div className="flex gap-2 mt-2">
                  {TV_COMPANIONS.map((comp) => {
                    const isSelected = activeCompanion.id === comp.id;
                    return (
                      <button
                        key={comp.id}
                        onClick={() => setActiveCompanion(comp)}
                        className={`w-11 h-11 rounded-xl border-[2px] p-0.5 overflow-hidden transition-all ${
                          isSelected
                            ? 'border-gray-950 bg-amber-300 ring-2 ring-amber-500 scale-110 shadow-sm'
                            : 'border-gray-300 bg-gray-50 hover:bg-amber-50'
                        }`}
                        title={`Watch with ${comp.name}`}
                        aria-label={`Select ${comp.name} as TV companion`}
                      >
                        <img src={comp.avatar} alt={comp.name} className="w-full h-full object-contain" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Companion Card */}
              <div className="flex items-center gap-3 pt-1">
                <img
                  src={activeCompanion.avatar}
                  alt={activeCompanion.name}
                  className="w-14 h-14 object-contain rounded-xl bg-amber-50 border-[2px] border-gray-900 shrink-0"
                />
                <div>
                  <h3 className="font-comic text-lg text-gray-950">{activeCompanion.name}</h3>
                  <p className="text-xs text-gray-600 font-round">{activeCompanion.title}</p>
                </div>
              </div>

              {/* Live Character Speech Bubble */}
              <div
                className="p-3.5 rounded-2xl border-[2px] border-gray-900 text-xs text-gray-900 font-round shadow-sm"
                style={{ backgroundColor: activeCompanion.bgColor }}
              >
                <span className="font-comic block text-[11px] text-gray-700 mb-1">
                  {activeCompanion.name} says:
                </span>
                &ldquo;{activeCompanion.reaction}&rdquo;
              </div>
            </div>

            {/* Non-Spoiler Teaser Card */}
            <div className="bg-white border-[3.5px] border-gray-950 rounded-3xl p-5 shadow-[6px_6px_0px_#111827] space-y-3">
              <div className="flex items-center justify-between border-b-[2px] border-gray-200 pb-2">
                <span className="font-comic text-xs uppercase text-amber-700 tracking-wider">
                  Channel Guide · {currentEp.channelCode}
                </span>
                <span className="text-xs font-mono font-bold text-gray-500">{currentEp.duration}</span>
              </div>

              <h2 className="font-comic text-xl text-gray-950 leading-tight">
                {currentEp.title}
              </h2>

              <p className="font-round text-xs text-gray-500 italic">
                &ldquo;{currentEp.tagline}&rdquo;
              </p>

              {/* Spoiler-Free Teaser */}
              <div className="bg-amber-50/80 p-3.5 rounded-xl border border-amber-300">
                <span className="font-comic text-[11px] uppercase text-amber-900 block mb-1">Episode Teaser</span>
                <p className="font-round text-xs text-gray-800 leading-relaxed">
                  {currentEp.teaser}
                </p>
              </div>

              {/* Channel switcher buttons */}
              <div className="pt-2">
                <span className="text-[10px] font-comic uppercase text-gray-500 block mb-1.5">
                  Tune Other Channels:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {EPISODES.map((ep, idx) => (
                    <button
                      key={ep.id}
                      onClick={() => handleSwitchChannel(idx)}
                      className={`comic-btn py-1.5 rounded-lg text-xs font-comic text-center ${
                        currentChannelIndex === idx
                          ? 'bg-amber-400 text-gray-950'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {ep.channelCode}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
