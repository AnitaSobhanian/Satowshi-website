/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'bottle' | 'tv' | 'stamp'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device supports fine hover (desktop vs touch)
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    document.body.classList.add('custom-cursor-enabled');

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Inspect target element for contextual cursor reactions
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('button, a, input, select, textarea, [role="button"], .interactive-target');
      const isBottleTarget = target.closest('.bottle-spin-target');
      const isTvTarget = target.closest('.tv-control-target');
      const isStampTarget = target.closest('.stamp-target');

      if (isBottleTarget) {
        setCursorType('bottle');
        setIsHovering(true);
      } else if (isTvTarget) {
        setCursorType('tv');
        setIsHovering(true);
      } else if (isStampTarget) {
        setCursorType('stamp');
        setIsHovering(true);
      } else if (interactive) {
        setCursorType('pointer');
        setIsHovering(true);
      } else {
        setCursorType('default');
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.classList.remove('custom-cursor-enabled');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: `translate(-50%, -50%) scale(${isClicking ? 0.82 : isHovering ? 1.25 : 1})`,
      }}
      aria-hidden="true"
    >
      {cursorType === 'bottle' ? (
        // Whiskey Bottle cursor
        <div className="flex items-center justify-center -rotate-12 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
            <rect x="8" y="8" width="8" height="13" rx="2" fill="#D97706" stroke="#111827" strokeWidth="2" />
            <rect x="10" y="3" width="4" height="5" fill="#B45309" stroke="#111827" strokeWidth="1.5" />
            <circle cx="12" cy="14" r="2.5" fill="#FEF08A" stroke="#111827" strokeWidth="1" />
          </svg>
        </div>
      ) : cursorType === 'tv' ? (
        // TV Remote cursor
        <div className="flex items-center justify-center filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <rect x="6" y="2" width="12" height="20" rx="3" fill="#374151" stroke="#111827" strokeWidth="2" />
            <circle cx="12" cy="6" r="2" fill="#EF4444" />
            <rect x="8" y="10" width="8" height="2" rx="1" fill="#9CA3AF" />
            <rect x="8" y="14" width="8" height="2" rx="1" fill="#9CA3AF" />
          </svg>
        </div>
      ) : cursorType === 'stamp' ? (
        // Rubber Stamp cursor
        <div className="flex items-center justify-center rotate-6 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
            <path d="M7 18h10v3H7v-3zM9 14h6v4H9v-4zM10 6h4v8h-4V6z" fill="#DC2626" stroke="#111827" strokeWidth="1.5" />
          </svg>
        </div>
      ) : isHovering ? (
        // Cartoon Pointer / Thumbs up
        <div className="relative flex items-center justify-center filter drop-shadow-[0_3px_5px_rgba(0,0,0,0.35)]">
          <div className="w-8 h-8 rounded-full bg-amber-400 border-[2.5px] border-gray-900 flex items-center justify-center text-xs font-bold font-comic text-gray-900 shadow-sm animate-pulse">
            ₿
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-gray-900" />
        </div>
      ) : (
        // Default Comic Cartoon Hoof / Pointer
        <div className="relative filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 3L17 14L11 15L9 21L4 3Z"
              fill="#F59E0B"
              stroke="#111827"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <circle cx="9" cy="9" r="1.5" fill="#FFFFFF" />
          </svg>
        </div>
      )}
    </div>
  );
}
