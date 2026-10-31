/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, ShieldAlert, FolderOpen, AlertTriangle, Sparkles, Eye, Link as LinkIcon } from 'lucide-react';
import { CASE_FILES, CaseFile, filterCaseFiles, getConnectedSuspects } from '../logic/caseFiles';
import { soundFx } from '../logic/audioFx';

export default function CaseFilesDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [activeSuspect, setActiveSuspect] = useState<CaseFile>(CASE_FILES[0]);
  const [revealedSecrets, setRevealedSecrets] = useState<Record<string, boolean>>({});
  const [folderOpen, setFolderOpen] = useState(true);

  const filteredFiles = filterCaseFiles(CASE_FILES, searchQuery, selectedStatus);
  const connectedSuspects = getConnectedSuspects(activeSuspect.id, CASE_FILES);

  const statuses = ['ALL', 'WANTED', 'SUSPICIOUS', 'CASE CLOSED', 'OMEGA THREAT', 'AIRBORNE'];

  const handleSelectSuspect = (file: CaseFile) => {
    soundFx.playStampSlam();
    setActiveSuspect(file);
    setFolderOpen(true);
  };

  const toggleSecretReveal = (id: string) => {
    soundFx.playBoing();
    setRevealedSecrets((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="py-12 md:py-20 bg-[#E8DEC8] min-h-[calc(100vh-80px)] relative overflow-hidden">
      {/* Corkboard texture pattern */}
      <div className="absolute inset-0 bg-halftone pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-200 border-[2px] border-gray-950 rounded-lg text-xs font-comic uppercase text-red-950 shadow-[2px_2px_0px_#111827]">
            <ShieldAlert className="w-3.5 h-3.5 text-red-700" />
            <span>Precinct 21 Classified Archives</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-comic text-gray-950 tracking-tight">
            WANTED: VERY SUSPICIOUS CHARACTERS
          </h1>
          <p className="text-gray-700 font-round text-sm sm:text-base max-w-2xl mx-auto">
            Official police department criminal case files. Click a suspect folder to inspect their mugshot,
            hover over redacted intel bars to unmask secrets, and trace the connected crime network.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white border-[3.5px] border-gray-950 rounded-2xl p-4 shadow-[6px_6px_0px_#111827] flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search suspect name, crime, alias..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-amber-50/60 border-[2px] border-gray-950 rounded-xl text-xs sm:text-sm font-round focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => {
                  soundFx.playPop();
                  setSelectedStatus(status);
                }}
                className={`comic-btn px-3 py-1.5 rounded-lg text-xs transition-all ${
                  selectedStatus === status
                    ? 'bg-amber-400 text-gray-950 font-bold -translate-y-0.5 shadow-[2px_2px_0px_#111827]'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Detective Stage: Suspect List + Manila Case Folder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Suspect Thumbnails Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filteredFiles.map((file) => {
              const isSelected = activeSuspect.id === file.id;
              return (
                <button
                  key={file.id}
                  onClick={() => handleSelectSuspect(file)}
                  className={`relative p-3 rounded-2xl border-[3px] border-gray-950 text-left transition-all duration-150 flex flex-col items-center bg-white ${
                    isSelected
                      ? 'bg-amber-100 ring-4 ring-amber-500 shadow-[6px_6px_0px_#111827] -translate-y-1'
                      : 'hover:bg-amber-50 shadow-[3px_3px_0px_#111827]'
                  }`}
                  aria-label={`Open case file for ${file.name}`}
                >
                  {/* Pushpin at top */}
                  <div className="w-3.5 h-3.5 rounded-full bg-red-500 border border-gray-950 shadow-sm -mt-1 mb-1" />

                  {/* Mugshot Image */}
                  <div className="w-20 h-24 rounded-xl bg-amber-50 border border-gray-900 overflow-hidden p-1 flex items-center justify-center">
                    <img
                      src={file.mugshot}
                      alt={file.name}
                      className="w-full h-full object-contain filter contrast-105"
                    />
                  </div>

                  {/* Character Name & Status */}
                  <h4 className="font-comic text-xs text-gray-950 text-center mt-2 line-clamp-1">
                    {file.name}
                  </h4>
                  <span
                    className="text-[9px] font-typewriter font-bold uppercase px-1.5 py-0.5 rounded border border-gray-900 mt-1"
                    style={{ backgroundColor: `${file.stampColor}20`, color: file.stampColor }}
                  >
                    {file.status}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: The Open Manila Case Folder */}
          <div className="lg:col-span-7">
            <div className="relative bg-[#FDE68A] border-[4.5px] border-gray-950 rounded-3xl p-6 sm:p-8 shadow-[10px_10px_0px_#111827] space-y-6">
              {/* Folder Tab at top */}
              <div className="absolute -top-5 left-8 bg-[#FDE68A] border-t-[4px] border-x-[4px] border-gray-950 px-6 py-1 rounded-t-xl font-typewriter text-xs font-bold text-gray-900">
                📁 {activeSuspect.caseNumber}
              </div>

              {/* Rubber Stamp Slammed Down */}
              <div
                className="absolute top-6 right-6 px-3 py-1.5 rounded-lg border-[3px] font-comic text-xs sm:text-sm tracking-wider uppercase opacity-90 animate-stamp pointer-events-none"
                style={{
                  borderColor: activeSuspect.stampColor,
                  color: activeSuspect.stampColor,
                  transform: 'rotate(-8deg)',
                }}
              >
                ★ {activeSuspect.status} ★
              </div>

              {/* Suspect Mugshot & Height Chart */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center border-b-[2.5px] border-amber-900/30 pb-6 pt-2">
                {/* Mugshot with police height background */}
                <div className="sm:col-span-5 flex flex-col items-center">
                  <div className="relative w-40 h-52 bg-white border-[3px] border-gray-950 rounded-xl overflow-hidden shadow-[4px_4px_0px_#111827] flex items-center justify-center p-2">
                    {/* Height Chart Grid Background */}
                    <div className="absolute inset-0 flex flex-col justify-between py-2 px-1 opacity-20 pointer-events-none font-typewriter text-[8px]">
                      <div>7&apos;0&quot; ──────────────</div>
                      <div>6&apos;0&quot; ──────────────</div>
                      <div>5&apos;0&quot; ──────────────</div>
                      <div>4&apos;0&quot; ──────────────</div>
                      <div>3&apos;0&quot; ──────────────</div>
                    </div>

                    <img
                      src={activeSuspect.mugshot}
                      alt={activeSuspect.name}
                      className="w-full h-full object-contain relative z-10"
                    />

                    {/* Police ID Slate Bar at bottom */}
                    <div className="absolute bottom-1 left-2 right-2 bg-gray-950 text-white font-typewriter text-[9px] text-center py-0.5 rounded shadow">
                      {activeSuspect.caseNumber}
                    </div>
                  </div>
                </div>

                {/* Case Details */}
                <div className="sm:col-span-7 space-y-2">
                  <span className="text-[11px] font-typewriter uppercase text-gray-700 block">
                    SUSPECT DOSSIER
                  </span>
                  <h3 className="font-comic text-2xl sm:text-3xl text-gray-950 leading-tight">
                    {activeSuspect.name}
                  </h3>
                  <p className="font-typewriter text-xs text-amber-900 italic">
                    Known Aliases: {activeSuspect.alias}
                  </p>

                  {/* Danger Meter */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between text-xs font-comic mb-1">
                      <span>DANGER LEVEL:</span>
                      <span className="text-red-700 font-bold">{activeSuspect.dangerLabel}</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 border-[2px] border-gray-950 rounded-full overflow-hidden flex">
                      {[1, 2, 3, 4, 5].map((lvl) => (
                        <div
                          key={lvl}
                          className={`flex-1 border-r border-gray-950 last:border-r-0 ${
                            lvl <= activeSuspect.dangerLevel ? 'bg-red-500' : 'bg-transparent'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Case Fields */}
              <div className="space-y-3 font-round text-xs sm:text-sm text-gray-900">
                <div className="bg-white/80 p-3.5 rounded-xl border-[2px] border-gray-950 shadow-sm">
                  <strong className="font-comic text-gray-950 block mb-0.5 text-xs text-red-800">
                    PRIMARY OFFENSE / CRIME:
                  </strong>
                  {activeSuspect.crime}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white/80 p-3 rounded-xl border-[2px] border-gray-950 shadow-sm">
                    <strong className="font-comic text-gray-950 block mb-0.5 text-xs text-amber-800">
                      LAST SEEN:
                    </strong>
                    {activeSuspect.lastSeen}
                  </div>

                  <div className="bg-white/80 p-3 rounded-xl border-[2px] border-gray-950 shadow-sm">
                    <strong className="font-comic text-gray-950 block mb-0.5 text-xs text-emerald-800">
                      VERIFIED ALIBI:
                    </strong>
                    {activeSuspect.alibi}
                  </div>
                </div>

                <div className="bg-white/80 p-3 rounded-xl border-[2px] border-gray-950 shadow-sm">
                  <strong className="font-comic text-gray-950 block mb-0.5 text-xs text-purple-800">
                    SPECIAL CAPABILITIES:
                  </strong>
                  {activeSuspect.specialSkills}
                </div>

                {/* Redacted Black Marker Classified Intel */}
                <div className="bg-amber-100 p-3.5 rounded-xl border-[2px] border-amber-900/40 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <strong className="font-comic text-xs uppercase text-red-900 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      TOP SECRET INTEL (CONFIDENTIAL):
                    </strong>
                    <button
                      onClick={() => toggleSecretReveal(activeSuspect.id)}
                      className="comic-btn text-[10px] bg-white text-gray-900 px-2 py-0.5 rounded border border-gray-900 flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      {revealedSecrets[activeSuspect.id] ? 'Hide' : 'Reveal Intel'}
                    </button>
                  </div>

                  <p className="font-typewriter text-xs text-gray-800 leading-relaxed">
                    Undercover wiretap recording reveals: &ldquo;
                    <span
                      className={`redacted-marker ${revealedSecrets[activeSuspect.id] ? 'revealed' : ''}`}
                      onClick={() => toggleSecretReveal(activeSuspect.id)}
                      title="Hover or click to unmask redacted text"
                    >
                      {activeSuspect.redactedIntel}
                    </span>
                    &rdquo;
                  </p>
                </div>
              </div>

              {/* Connected Suspects Corkboard Network */}
              {connectedSuspects.length > 0 && (
                <div className="pt-2 border-t-[2px] border-amber-900/30">
                  <div className="flex items-center gap-2 mb-2 font-comic text-xs text-gray-900">
                    <LinkIcon className="w-3.5 h-3.5 text-red-600" />
                    <span>RED STRING CONNECTIONS (KNOWN ASSOCIATES):</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {connectedSuspects.map((assoc) => (
                      <button
                        key={assoc.id}
                        onClick={() => handleSelectSuspect(assoc)}
                        className="comic-btn px-2.5 py-1 bg-white hover:bg-amber-100 text-gray-950 rounded-lg text-xs flex items-center gap-1.5 border-[1.5px] border-gray-900"
                      >
                        <img src={assoc.mugshot} alt={assoc.name} className="w-4 h-4 object-contain rounded" />
                        <span>{assoc.name}</span>
                      </button>
                    ))}
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
