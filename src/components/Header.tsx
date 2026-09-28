import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Languages,
  Mic,
  Bell,
  Sparkles,
  MapPin,
  Check,
  ChevronDown
} from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  onOpenNotifications: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenNotifications }) => {
  const {
    t,
    language,
    setLanguage,
    languagesList,
    location,
    notifications,
    startVoiceInput,
    isListening,
    setActiveTab
  } = useApp();

  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.isRead).length;
  const currentLangObj = languagesList.find(l => l.code === language) || languagesList[0];

  return (
    <header className="sticky top-0 z-30 bg-[#1F5C3F] text-white shadow-warm-md border-b border-[#184831]">
      {/* Top micro announcement bar */}
      <div className="bg-[#143D2A] px-3 sm:px-4 py-1.5 text-xs flex justify-between items-center text-[#FBF6EE]/90 border-b border-[#0F3021]">
        <div className="flex items-center gap-2 text-[11px] font-medium tracking-wide min-w-0">
          <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-pulse shrink-0"></span>
          <span className="text-[#F5A623] font-bold shrink-0">VayalWay</span>
          <span className="text-emerald-300 shrink-0">•</span>
          <span className="text-emerald-50 truncate">{t.appTagline}</span>
        </div>

        {/* Location in top bar for tablet and laptop */}
        <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-emerald-50 truncate max-w-[240px] shrink-0 ml-2">
          <MapPin className="w-3.5 h-3.5 text-[#F5A623] shrink-0" />
          <span className="truncate">{location ? location.split(',')[0] : 'Choose Location'}</span>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5">
        {/* Row 1: Brand & Top Utilities (Guaranteed spacious spacing with zero overlap) */}
        <div className="flex items-center justify-between gap-2">
          {/* App Logo & Title */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#F5A623] via-[#D2691E] to-[#1F5C3F] p-0.5 shadow-warm-sm flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#1F5C3F] rounded-[13px] sm:rounded-[14px] flex items-center justify-center text-lg sm:text-xl shadow-inner">
                🌾
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="font-black text-lg sm:text-2xl tracking-tight text-white flex items-center leading-tight">
                  Vayal<span className="text-[#F5A623]">Way</span>
                </h1>
                {/* On desktop: horizontal badge */}
                <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D2691E] text-white shadow-xs uppercase tracking-wider shrink-0">
                  Mandi Net
                </span>
              </div>
              {/* On mobile: clean subtitle placed vertically underneath, preventing horizontal collision */}
              <div className="sm:hidden text-[9px] font-black text-[#F5A623] uppercase tracking-wider leading-none mt-0.5">
                Mandi Net
              </div>
              <p className="text-[10px] sm:text-[11px] text-emerald-100 font-medium truncate max-w-[180px] sm:max-w-md hidden sm:block">
                {t.appTagline}
              </p>
            </div>
          </div>

          {/* Right utility controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Tablet & Desktop Voice Input Quick Button */}
            <button
              onClick={() => startVoiceInput('general')}
              title={t.voiceActionPrompt}
              aria-label="Voice input"
              className={`hidden sm:flex min-h-[44px] items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all shadow-warm-sm shrink-0 ${
                isListening
                  ? 'bg-rose-600 text-white animate-pulse ring-2 ring-rose-300'
                  : 'bg-gradient-to-r from-[#D2691E] to-[#F5A623] hover:opacity-95 text-white active:scale-95'
              }`}
            >
              <Mic className={`w-4 h-4 shrink-0 ${isListening ? 'animate-bounce' : ''}`} />
              <span className="whitespace-nowrap">{isListening ? t.listening : t.tapToSpeak}</span>
            </button>

            {/* Language Selector Dropdown - 44px min touch target */}
            <div className="relative shrink-0">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="min-h-[40px] sm:min-h-[44px] flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-2xl bg-[#276E4D] hover:bg-[#2F815B] border border-[#399368] text-xs font-bold text-white transition active:scale-95 shadow-warm-sm"
                aria-label="Change language"
              >
                <Languages className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F5A623] shrink-0" />
                <span className="font-semibold whitespace-nowrap">{currentLangObj.nativeName}</span>
                <ChevronDown className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-100 transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsLangDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-52 max-w-[calc(100vw-24px)] bg-white text-[#26201A] rounded-2xl shadow-warm-lg border border-[#F5A623]/30 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3.5 py-1.5 border-b border-amber-100 text-[11px] font-bold text-[#D2691E] uppercase tracking-wider flex items-center justify-between">
                      <span>{t.selectLanguage}</span>
                      <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
                    </div>
                    <div className="max-h-64 overflow-y-auto divide-y divide-amber-50/60">
                      {languagesList.map((item) => {
                        const isSelected = item.code === language;
                        return (
                          <button
                            key={item.code}
                            onClick={() => {
                              setLanguage(item.code as Language);
                              setIsLangDropdownOpen(false);
                            }}
                            className={`w-full min-h-[44px] px-3.5 py-2.5 text-left text-xs flex items-center justify-between transition-colors ${
                              isSelected
                                ? 'bg-[#FBF6EE] text-[#D2691E] font-black'
                                : 'text-[#26201A] hover:bg-[#FBF6EE]/60 font-medium'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="text-base">{item.flag}</span>
                              <div>
                                <div className="text-[13px] leading-tight font-bold">{item.nativeName}</div>
                                <div className="text-[10px] text-stone-500">{item.label}</div>
                              </div>
                            </div>
                            {isSelected && <Check className="w-4 h-4 text-[#D2691E] shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Notification Bell - 44px min touch target */}
            <button
              onClick={onOpenNotifications}
              className="min-h-[40px] min-w-[40px] sm:min-h-[44px] sm:min-w-[44px] relative p-2 sm:p-2.5 rounded-2xl bg-[#276E4D] hover:bg-[#2F815B] border border-[#399368] text-emerald-100 hover:text-white transition active:scale-95 flex items-center justify-center shadow-warm-sm"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F5A623] text-[#26201A] font-black text-[10px] rounded-full flex items-center justify-center shadow-xs">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Row 2: Mobile Dedicated Voice Input & Location Row (Spacious, accessible thumb reach, zero overlap) */}
        <div className="sm:hidden mt-2 pt-2 border-t border-[#184831] flex items-center gap-2">
          {/* Voice Button on Mobile */}
          <button
            onClick={() => startVoiceInput('general')}
            title={t.voiceActionPrompt}
            aria-label="Voice input"
            className={`flex-1 min-h-[44px] flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black transition-all shadow-warm-sm ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse ring-2 ring-rose-300'
                : 'bg-gradient-to-r from-[#D2691E] to-[#F5A623] hover:opacity-95 text-white active:scale-95'
            }`}
          >
            <Mic className={`w-4 h-4 shrink-0 ${isListening ? 'animate-bounce' : ''}`} />
            <span className="truncate">{isListening ? t.listening : t.tapToSpeak}</span>
          </button>

          {/* Location indicator button on Mobile (tappable to open location selector) */}
          <button
            onClick={() => setActiveTab('compare')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border truncate max-w-[145px] shrink-0 min-h-[44px] transition active:scale-95 ${
              location
                ? 'bg-[#143D2A] text-emerald-100 border-[#276E4D]'
                : 'bg-[#D2691E]/25 text-[#F5A623] border-[#F5A623]/50'
            }`}
            title="Select or speak location"
          >
            <MapPin className="w-3.5 h-3.5 text-[#F5A623] shrink-0" />
            <span className="truncate">{location ? location.split(',')[0] : 'Choose Location'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
