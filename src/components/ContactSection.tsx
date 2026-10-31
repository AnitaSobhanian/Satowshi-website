/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ExternalLink, Radio } from 'lucide-react';

export const SOCIAL_LINKS = [
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@satowshi_official',
    url: 'https://instagram.com/satowshi_official',
    color: '#E1306C',
    svgIcon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
      </svg>
    ),
    badge: 'Art & Clips',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    handle: 'Satowshi Official',
    url: 'https://youtube.com/@satowshi_official',
    color: '#FF0000',
    svgIcon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
        <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
      </svg>
    ),
    badge: 'Full Episodes',
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    handle: '@SatowshiBull',
    url: 'https://x.com/satowshi',
    color: '#000000',
    svgIcon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    badge: 'Daily Updates',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'Satowshi Animated Series',
    url: 'https://linkedin.com/company/satowshi',
    color: '#0A66C2',
    svgIcon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect width="4" height="12" x="2" y="9"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
    badge: 'Production & Team',
  },
];

export default function ContactSection() {
  return (
    <section id="contact-section" className="py-12 md:py-16 bg-[#1E293B] text-white border-t-[4px] border-gray-950 relative overflow-hidden">
      {/* Subtle comic dot grid pattern */}
      <div className="absolute inset-0 bg-halftone-dark opacity-15 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Title Header - Compact & refined */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400 text-gray-950 rounded-lg text-xs font-comic uppercase tracking-wider shadow-[2px_2px_0px_#000]">
            <Radio className="w-3.5 h-3.5 text-gray-950" />
            <span>Community Channels</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-comic text-white tracking-tight">
            FIND US OUT THERE
          </h2>
          <p className="text-gray-300 font-round text-xs sm:text-sm">
            Catch episode drops, concept sketches, and behind-the-scenes animations directly on our official channels.
          </p>
        </div>

        {/* Compact Social Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group comic-box-sm bg-[#0F172A] hover:bg-[#1E293B] border-[2.5px] border-gray-900 p-4 rounded-2xl flex flex-col justify-between transition-all duration-150 hover:-translate-y-1 hover:shadow-[4px_4px_0px_#F59E0B] focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-label={`Open our ${link.name} page (opens in new tab)`}
            >
              {/* Header with App Icon */}
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center border border-gray-700 bg-gray-900 group-hover:scale-110 transition-transform"
                  style={{ color: link.color === '#000000' ? '#FFFFFF' : link.color }}
                >
                  {link.svgIcon}
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-amber-400 transition-colors" />
              </div>

              {/* Title & Badge */}
              <div className="space-y-1">
                <span className="text-[10px] font-comic uppercase tracking-wider text-amber-400 block">
                  {link.badge}
                </span>
                <h3 className="font-comic text-base sm:text-lg text-white group-hover:text-amber-300 transition-colors leading-tight">
                  {link.name}
                </h3>
                <p className="font-round text-[11px] text-gray-400 truncate">
                  {link.handle}
                </p>
              </div>

              {/* Action Link */}
              <div className="mt-3 pt-2.5 border-t border-gray-800 flex items-center justify-between text-[11px] font-comic text-gray-400 group-hover:text-amber-400">
                <span>Follow</span>
                <span>→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
