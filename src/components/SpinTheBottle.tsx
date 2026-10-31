/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { RotateCw, CheckCircle2, HelpCircle, Zap, Sparkles, Volume2 } from 'lucide-react';
import {
  BOTTLE_CHARACTERS,
  BottleCharacter,
  ChallengeQuestion,
  calculateBottleTarget,
  getRandomQuestion,
} from '../logic/bottleGame';
import { soundFx } from '../logic/audioFx';

export default function SpinTheBottle() {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<BottleCharacter | null>(null);
  const [activeQuestion, setActiveQuestion] = useState<ChallengeQuestion | null>(null);
  const [challengeType, setChallengeType] = useState<'truth' | 'dare' | null>(null);
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [spinCount, setSpinCount] = useState(0);

  const prevQuestionIdRef = useRef<string | undefined>(undefined);
  const tickIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger spin logic
  const handleSpin = () => {
    if (isSpinning) return;

    soundFx.playPop();
    setIsSpinning(true);
    setSelectedCharacter(null);
    setActiveQuestion(null);
    setChallengeType(null);
    setChallengeCompleted(false);

    // Pick random target character index
    const randomIndex = Math.floor(Math.random() * BOTTLE_CHARACTERS.length);
    const { finalAngle, character } = calculateBottleTarget(randomIndex, rotationAngle, 5);

    // Audio ticks during spin
    let tickCount = 0;
    const maxTicks = 20;
    tickIntervalRef.current = setInterval(() => {
      soundFx.playSpinTick(500 + tickCount * 15);
      tickCount++;
      if (tickCount >= maxTicks) {
        if (tickIntervalRef.current) clearInterval(tickIntervalRef.current);
      }
    }, 120);

    setRotationAngle(finalAngle);

    // Animation takes 3.2s
    setTimeout(() => {
      if (tickIntervalRef.current) clearInterval(tickIntervalRef.current);
      setIsSpinning(false);
      setSelectedCharacter(character);
      setSpinCount((prev) => prev + 1);
      soundFx.playBoing();

      // Mini confetti burst
      try {
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#F59E0B', '#10B981', '#3B82F6', '#EF4444'],
        });
      } catch {
        // Safe fallback
      }
    }, 3200);
  };

  // Keyboard shortcut: Spacebar to spin, 1 for Truth, 2 for Dare, R to spin again
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space') {
        e.preventDefault();
        if (!isSpinning && !activeQuestion) {
          handleSpin();
        }
      } else if (e.key === '1' && selectedCharacter && !challengeType) {
        handleSelectChoice('truth');
      } else if (e.key === '2' && selectedCharacter && !challengeType) {
        handleSelectChoice('dare');
      } else if (e.key.toLowerCase() === 'r' && activeQuestion) {
        handleSpin();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSpinning, selectedCharacter, challengeType, activeQuestion]);

  const handleSelectChoice = (type: 'truth' | 'dare') => {
    if (!selectedCharacter) return;
    soundFx.playPop();
    setChallengeType(type);

    const question = getRandomQuestion(selectedCharacter.id, type, prevQuestionIdRef.current);
    prevQuestionIdRef.current = question.id;
    setActiveQuestion(question);
  };

  const handleCompleteChallenge = () => {
    soundFx.playVictoryChime();
    setChallengeCompleted(true);
    try {
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#10B981', '#EC4899', '#3B82F6'],
      });
    } catch {
      // Safe fallback
    }
  };

  return (
    <section id="spin-bottle-section" className="py-16 md:py-24 bg-[#FFF8E7] border-y-[4px] border-gray-950 relative overflow-hidden">
      {/* Halftone Overlay */}
      <div className="absolute inset-0 bg-halftone pointer-events-none opacity-40" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-200 border-[2px] border-gray-900 rounded-lg text-xs font-comic uppercase text-gray-900 shadow-[2px_2px_0px_#111827]">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>Episode 3 Tavern Scene</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-comic text-gray-950 tracking-tight">
            SPIN THE BOTTLE: TRUTH OR DARE!
          </h2>
          <p className="text-gray-700 font-round text-sm sm:text-base">
            Spin the Old Whiskey bottle with the crew from Episode 3. Whoever the bottle points to gives you a challenge.
            No cowards allowed!
          </p>
        </div>

        {/* Main Game Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Table with Circular Characters */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] rounded-full bg-[#854D0E] border-[6px] border-gray-950 shadow-[10px_10px_0px_#111827] flex items-center justify-center p-4">
              {/* Wooden tabletop grain ring */}
              <div className="absolute inset-3 rounded-full border-[3px] border-[#A16207] border-dashed opacity-50 pointer-events-none" />
              <div className="absolute inset-14 rounded-full bg-[#713F12] border-[3px] border-gray-950/40 pointer-events-none" />

              {/* Characters seated around the table */}
              {BOTTLE_CHARACTERS.map((char) => {
                // Calculate position on circumference (radius ~150px on sm, ~120px on mobile)
                const rad = ((char.angle - 90) * Math.PI) / 180;
                const isSelected = selectedCharacter?.id === char.id;

                return (
                  <div
                    key={char.id}
                    className="absolute transition-all duration-300"
                    style={{
                      left: `calc(50% + ${Math.cos(rad) * 44}% - 34px)`,
                      top: `calc(50% + ${Math.sin(rad) * 44}% - 34px)`,
                    }}
                  >
                    <div
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-[3px] border-gray-950 overflow-hidden bg-white shadow-[3px_3px_0px_#111827] flex items-center justify-center transition-all duration-200 ${
                        isSelected
                          ? 'ring-4 ring-amber-400 scale-125 z-30 shadow-[0_0_20px_rgba(245,158,11,0.8)]'
                          : 'opacity-90 hover:opacity-100 hover:scale-105'
                      }`}
                      style={{ backgroundColor: `${char.color}15` }}
                    >
                      <img
                        src={char.avatar}
                        alt={char.name}
                        className="w-full h-full object-contain p-1"
                        onError={(e) => {
                          // Fallback avatar initial
                          (e.currentTarget as HTMLElement).style.display = 'none';
                        }}
                      />
                      <span className="sr-only">{char.name}</span>
                    </div>

                    {/* Character Name Tag */}
                    <div
                      className={`absolute -bottom-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md border-[1.5px] border-gray-900 text-[10px] font-comic whitespace-nowrap shadow-sm z-30 ${
                        isSelected ? 'bg-amber-400 text-gray-950 font-bold scale-110' : 'bg-white text-gray-800'
                      }`}
                    >
                      {char.name}
                    </div>
                  </div>
                );
              })}

              {/* Center Spinning "Old Whiskey" Bottle (Episode 3 exact prop!) */}
              <div
                className="relative z-20 bottle-spin-target cursor-pointer select-none"
                onClick={handleSpin}
                role="button"
                tabIndex={0}
                aria-label="Spin the Old Whiskey Bottle"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSpin();
                  }
                }}
              >
                <div
                  className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center transition-transform"
                  style={{
                    transform: `rotate(${rotationAngle}deg)`,
                    transition: isSpinning ? 'transform 3.2s cubic-bezier(0.12, 0.8, 0.15, 1)' : 'none',
                  }}
                >
                  {/* SVG Bottle Representation based on Episode 3 Old Whiskey Bottle */}
                  <svg
                    width="60"
                    height="120"
                    viewBox="0 0 60 120"
                    className="filter drop-shadow-[4px_6px_6px_rgba(0,0,0,0.5)] transform -translate-y-4"
                  >
                    {/* Bottle Cap */}
                    <rect x="24" y="2" width="12" height="10" rx="2" fill="#1F2937" stroke="#111827" strokeWidth="2" />
                    {/* Bottle Neck */}
                    <path d="M25 12h10v20h-10z" fill="#92400E" stroke="#111827" strokeWidth="2" />
                    {/* Bottle Body */}
                    <rect x="12" y="32" width="36" height="78" rx="6" fill="#B45309" stroke="#111827" strokeWidth="3" />
                    {/* Liquid Highlight */}
                    <rect x="15" y="36" width="30" height="70" rx="4" fill="#D97706" />
                    {/* Bottle Label "Old Whiskey" */}
                    <rect x="16" y="52" width="28" height="38" rx="2" fill="#FEF3C7" stroke="#78350F" strokeWidth="1.5" />
                    <text x="30" y="66" textAnchor="middle" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif" fill="#78350F">
                      OLD
                    </text>
                    <text x="30" y="75" textAnchor="middle" fontSize="5.5" fontWeight="bold" fontFamily="sans-serif" fill="#78350F">
                      WHISKEY
                    </text>
                    <text x="30" y="84" textAnchor="middle" fontSize="4.5" fill="#92400E">
                      No. 7
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interaction Card (Truth / Dare Dialogue) */}
          <div className="lg:col-span-5">
            <div className="bg-white border-[3.5px] border-gray-950 rounded-3xl p-6 sm:p-7 shadow-[8px_8px_0px_#111827] space-y-5">
              {/* Status Header */}
              <div className="flex items-center justify-between border-b-[2px] border-gray-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
                  <span className="font-comic text-xs uppercase tracking-wider text-gray-600">
                    {isSpinning ? 'Bottle Is Spinning...' : selectedCharacter ? 'Target Acquired!' : 'Ready to Spin'}
                  </span>
                </div>
                <span className="text-xs font-comic text-gray-500">
                  Spins: {spinCount}
                </span>
              </div>

              {/* State 1: Before spinning */}
              {!selectedCharacter && !isSpinning && (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-amber-100 border-[2.5px] border-gray-900 mx-auto flex items-center justify-center text-3xl font-comic text-amber-600 shadow-sm">
                    🍾
                  </div>
                  <div>
                    <h3 className="font-comic text-2xl text-gray-900">Take Your Chances!</h3>
                    <p className="text-gray-600 text-sm font-round mt-1">
                      Click the bottle or hit the button below to start. Spacebar also spins!
                    </p>
                  </div>
                  <button
                    onClick={handleSpin}
                    className="comic-btn w-full bg-amber-400 hover:bg-amber-300 text-gray-950 py-3.5 rounded-2xl text-lg flex items-center justify-center gap-2"
                  >
                    <RotateCw className="w-5 h-5 text-gray-900" />
                    <span>SPIN THE BOTTLE!</span>
                  </button>
                </div>
              )}

              {/* State 2: While spinning */}
              {isSpinning && (
                <div className="text-center py-8 space-y-3">
                  <div className="inline-block animate-spin text-4xl">
                    🌀
                  </div>
                  <h3 className="font-comic text-2xl text-gray-900">Round and round it goes...</h3>
                  <p className="text-gray-600 text-sm font-round">
                    Listening for the click... who will the whiskey bottle land on?
                  </p>
                </div>
              )}

              {/* State 3: Bottle landed on Character, choose Truth or Dare */}
              {selectedCharacter && !challengeType && !isSpinning && (
                <div className="space-y-4 animate-stamp">
                  <div className="flex items-center gap-3 bg-amber-50 p-3 rounded-2xl border-[2px] border-gray-900">
                    <img
                      src={selectedCharacter.avatar}
                      alt={selectedCharacter.name}
                      className="w-14 h-14 object-contain rounded-xl bg-white border border-gray-900"
                    />
                    <div>
                      <span className="text-xs font-comic uppercase text-amber-700">The Bottle Pointed To</span>
                      <h4 className="font-comic text-xl text-gray-900">{selectedCharacter.name}</h4>
                      <p className="text-xs text-gray-600 font-round">{selectedCharacter.tagline}</p>
                    </div>
                  </div>

                  <p className="font-comic text-base text-gray-900 text-center">
                    Pick your poison! Press <kbd className="px-1.5 py-0.5 bg-gray-200 border border-gray-800 rounded text-xs font-mono">1</kbd> for Truth or <kbd className="px-1.5 py-0.5 bg-gray-200 border border-gray-800 rounded text-xs font-mono">2</kbd> for Dare:
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleSelectChoice('truth')}
                      className="comic-btn bg-sky-400 hover:bg-sky-300 text-gray-950 py-3 rounded-2xl text-lg flex items-center justify-center gap-2"
                    >
                      <HelpCircle className="w-5 h-5" />
                      <span>TRUTH</span>
                    </button>
                    <button
                      onClick={() => handleSelectChoice('dare')}
                      className="comic-btn bg-rose-400 hover:bg-rose-300 text-gray-950 py-3 rounded-2xl text-lg flex items-center justify-center gap-2"
                    >
                      <Zap className="w-5 h-5" />
                      <span>DARE</span>
                    </button>
                  </div>
                </div>
              )}

              {/* State 4: Question / Challenge Active */}
              {selectedCharacter && activeQuestion && challengeType && (
                <div className="space-y-4">
                  {/* Badge & Type */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-lg border-[2px] border-gray-900 text-xs font-comic uppercase shadow-[2px_2px_0px_#111827] ${
                        challengeType === 'truth' ? 'bg-sky-300 text-gray-900' : 'bg-rose-300 text-gray-900'
                      }`}
                    >
                      {challengeType.toUpperCase()} CHALLENGE
                    </span>
                    <span className="text-xs font-comic text-gray-500 uppercase">
                      From {selectedCharacter.name}
                    </span>
                  </div>

                  {/* Challenge Text */}
                  <div className="bg-amber-50 border-[2.5px] border-gray-900 rounded-2xl p-4 shadow-[3px_3px_0px_#111827]">
                    <p className="font-comic text-lg sm:text-xl text-gray-900 leading-snug">
                      &ldquo;{activeQuestion.text}&rdquo;
                    </p>
                  </div>

                  {/* Character Reaction Speech Bubble */}
                  <div className="flex items-start gap-3 bg-white p-3 rounded-xl border border-gray-300">
                    <img
                      src={selectedCharacter.avatar}
                      alt={selectedCharacter.name}
                      className="w-10 h-10 object-contain rounded-lg shrink-0"
                    />
                    <div className="text-xs text-gray-700 font-round">
                      <strong className="font-comic text-gray-900">{selectedCharacter.name} says: </strong>
                      {activeQuestion.characterComment}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-2">
                    {!challengeCompleted ? (
                      <button
                        onClick={handleCompleteChallenge}
                        className="comic-btn w-full bg-emerald-400 hover:bg-emerald-300 text-gray-950 py-3 rounded-2xl text-base flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        <span>I Completed This Challenge!</span>
                      </button>
                    ) : (
                      <div className="p-3 bg-emerald-100 border-[2px] border-emerald-600 rounded-xl text-center font-comic text-emerald-900 text-sm">
                        🎉 Challenge accepted & completed! Grandma approves!
                      </div>
                    )}

                    <button
                      onClick={handleSpin}
                      className="comic-btn w-full bg-amber-300 hover:bg-amber-200 text-gray-950 py-2.5 rounded-2xl text-sm flex items-center justify-center gap-2"
                    >
                      <RotateCw className="w-4 h-4" />
                      <span>Spin Again (R)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
