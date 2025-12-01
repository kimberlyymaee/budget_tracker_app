"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function Home() {
  const words = ["Finances", "Budget", "Savings", "Life"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any existing timeouts on mount
    const cleanup = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
        fadeTimeoutRef.current = null;
      }
    };
    
    cleanup();
    
    const DISPLAY_TIME = 3000; // Word visible for 3 seconds
    const FADE_TIME = 500; // Fade transition takes 0.5 seconds
    
    const showNextWord = () => {
      // Start fade out
      setIsVisible(false);
      
      // After fade out completes, switch word and fade in
      fadeTimeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsVisible(true);
        
        // After word is visible, wait for display time, then start next transition
        timeoutRef.current = setTimeout(showNextWord, DISPLAY_TIME);
      }, FADE_TIME);
    };

    // Start first transition after initial display time
    timeoutRef.current = setTimeout(showNextWord, DISPLAY_TIME);

    return cleanup;
  }, []); // Empty dependency array - only run once on mount
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-transparent to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/40 bg-white/80 backdrop-blur-md shadow-sm dark:border-slate-700/40 dark:bg-slate-900/80">
        <div className="mx-auto max-w-7xl">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center pl-2 sm:pl-4 lg:pl-12 xl:pl-20">
              <Logo />
            </div>

            {/* Desktop navigation */}
            <div className="hidden sm:flex items-center gap-4 sm:gap-6 pr-2 sm:pr-4 lg:pr-12 xl:pr-20">
              <Link
                href="/login"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200 dark:text-slate-400 dark:hover:text-slate-100"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-gradient-to-r from-cyan-600 to-teal-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 sm:hidden"
              aria-label="Toggle navigation"
              onClick={() => setIsNavOpen((open) => !open)}
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {isNavOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>

          {/* Mobile navigation panel */}
          {isNavOpen && (
            <div className="sm:hidden border-t border-slate-200/60 bg-white/95 px-4 pb-4 pt-3 shadow-md dark:border-slate-700/60 dark:bg-slate-900/95">
              <div className="rounded-2xl border border-slate-100 bg-white/90 p-3 shadow-sm text-center dark:border-slate-700 dark:bg-slate-900/90">
                <div className="mb-3 text-[11px] text-slate-500 dark:text-slate-400">
                  Choose how you want to continue.
                </div>
                <div className="flex gap-2">
                  <Link
                    href="/login"
                    className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:border-cyan-400 hover:text-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                    onClick={() => setIsNavOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    className="inline-flex flex-1 items-center justify-center rounded-full bg-gradient-to-r from-cyan-600 to-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                    onClick={() => setIsNavOpen(false)}
                  >
                    Get started
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-32 pb-20 sm:px-6 sm:pt-36 sm:pb-24 lg:px-8">
        {/* Animated background elements - floating gradient blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-teal-400/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        
        {/* Subtle geometric pattern background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="geometric-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="2" fill="none" stroke="#06b6d4" strokeWidth="0.5" opacity="0.3" />
                <path d="M0 30 L60 30" stroke="#14b8a6" strokeWidth="0.5" opacity="0.2" />
                <path d="M30 0 L30 60" stroke="#14b8a6" strokeWidth="0.5" opacity="0.2" />
                <path d="M0 0 L60 60" stroke="#06b6d4" strokeWidth="0.5" opacity="0.15" />
                <path d="M60 0 L0 60" stroke="#06b6d4" strokeWidth="0.5" opacity="0.15" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#geometric-pattern)" />
          </svg>
          
          {/* Additional geometric shapes */}
          <div className="absolute top-1/4 right-1/4 w-32 h-32 border border-cyan-300/20 rounded-lg rotate-45"></div>
          <div className="absolute bottom-1/4 left-1/4 w-24 h-24 border border-teal-300/20 rounded-full"></div>
          <div className="absolute top-1/2 right-1/3 w-16 h-16 border border-blue-300/20 rounded-lg rotate-12"></div>
        </div>
        
        <div className="mx-auto flex min-h-[80vh] max-w-7xl items-center justify-center relative z-10 lg:block">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="text-center lg:text-left px-4 sm:px-6 lg:px-0 lg:pl-20 xl:pl-32">
              {/* Tagline */}
              <div className="mb-4 flex justify-center lg:justify-start">
                <span className="text-sm font-semibold tracking-wider text-cyan-600 uppercase">
                  Track Today
                </span>
              </div>
              
              {/* Social proof badge */}
              <div className="mb-6 flex justify-center lg:justify-start">
                <div className="flex items-center gap-4">
                  <div className="h-px w-6 bg-slate-300 dark:bg-slate-600"></div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-900 dark:text-slate-100">PHP Budget Tracker</span>
                    <span className="text-slate-400 dark:text-slate-500">•</span>
                    <span className="text-slate-600 dark:text-slate-400">Trusted by 10K+ users</span>
                  </div>
                  <div className="h-px w-6 bg-slate-300 dark:bg-slate-600"></div>
                </div>
              </div>
              
              <h1 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-6xl lg:text-7xl mb-8">
                <span className="block animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                  Take Control
                </span>
                <span className="block animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
                  of Your
                </span>
                <span className="block animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
                  <span className="inline-flex items-baseline">
                    <span
                      className={`inline-block bg-gradient-to-r from-cyan-600 via-teal-500 to-blue-600 bg-clip-text text-transparent transition-opacity duration-500 ease-in-out ${
                        isVisible ? "opacity-100" : "opacity-0"
                      }`}
                      style={{ minWidth: "150px", display: "inline-block" }}
                    >
                      {words[currentIndex]}
                    </span>
                    <span className="ml-2 text-slate-900 dark:text-slate-100">Today</span>
                  </span>
                </span>
              </h1>
              
              <p className="text-xl leading-8 text-slate-600 dark:text-slate-400 sm:text-2xl max-w-xl mb-8">
                Track food, transport, bills, and more — all in one clean, modern dashboard.
                <span className="block mt-2 text-lg text-slate-500 dark:text-slate-400">
                  Make smarter financial decisions with real-time insights.<span className="ml-1.5">✨</span>
                </span>
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/register"
                  className="group relative rounded-full bg-gradient-to-r from-cyan-600 to-teal-600 px-8 py-4 text-base font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 w-full sm:w-auto text-center"
                >
                  <span className="relative z-10">Start Tracking Free</span>
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-700 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
                <button
                  className="flex items-center justify-center gap-2 rounded-full border-2 border-slate-300 bg-white/80 backdrop-blur-sm px-6 py-4 text-base font-semibold text-slate-700 shadow-md transition-all duration-300 hover:border-cyan-400 hover:text-cyan-600 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 w-full sm:w-auto dark:border-slate-600 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:border-cyan-500 dark:hover:text-cyan-400"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  Watch Demo
                </button>
              </div>
            </div>
            
            {/* Right Side - Illustration */}
            <div className="relative flex items-center justify-center mt-12 lg:mt-0 -translate-x-4 sm:-translate-x-6 lg:-translate-x-12">
              {/* Feature Card - Top Left */}
              <div className="absolute top-0 left-2 lg:top-1 lg:left-4 block animate-fade-in animate-float" style={{ animationFillMode: 'both' }}>
                <div className="bg-white/90 backdrop-blur-md rounded-2xl px-2.5 py-2 max-w-[170px] shadow-[0_18px_45px_rgba(15,23,42,0.18)] border border-slate-100/80 dark:bg-slate-800/90 dark:border-slate-700/70 transform -rotate-2 scale-[0.8] lg:scale-95 hover:rotate-0 transition-transform duration-300 opacity-80 hover:opacity-100">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                        Secure
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                        Bank-level
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stat Badge - Top Right */}
              <div className="absolute top-0 right-16 lg:top-1 lg:right-20 block animate-fade-in animate-float-delay-1" style={{ animationFillMode: 'both' }}>
                <div className="bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full px-3.5 py-2 max-w-[190px] shadow-[0_18px_45px_rgba(8,145,178,0.35)] backdrop-blur-sm flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity duration-300 transform scale-[0.8] lg:scale-95 origin-center">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-[11px] font-semibold text-white">
                    ⭐
                  </span>
                  <div className="text-left">
                    <p className="text-xs font-semibold text-white leading-tight">
                      10K+ users
                    </p>
                    <p className="text-[10px] text-cyan-50/90 leading-tight">
                      and counting
                    </p>
                  </div>
                </div>
              </div>

              {/* Mini Card - Bottom Right */}
              <div className="absolute bottom-0 right-16 lg:bottom-1 lg:right-20 block animate-fade-in animate-float-delay-2" style={{ animationFillMode: 'both' }}>
                <div className="bg-white/90 backdrop-blur-md rounded-2xl px-2.5 py-2 max-w-[170px] shadow-[0_18px_45px_rgba(15,23,42,0.18)] border border-slate-100/80 dark:bg-slate-800/90 dark:border-slate-700/70 transform rotate-1 scale-[0.8] lg:scale-95 hover:rotate-0 transition-transform duration-300 opacity-80 hover:opacity-100">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                        Real-time
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                        Analytics
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Card - Bottom Left */}
              <div className="absolute bottom-0 left-2 lg:bottom-1 lg:left-4 block animate-fade-in animate-float-delay-3" style={{ animationFillMode: 'both' }}>
                <div className="bg-white/90 backdrop-blur-md rounded-2xl px-2.5 py-2 max-w-[170px] shadow-[0_18px_45px_rgba(15,23,42,0.18)] border border-slate-100/80 dark:bg-slate-800/90 dark:border-slate-700/70 transform -rotate-1 scale-[0.8] lg:scale-95 hover:rotate-0 transition-transform duration-300 opacity-80 hover:opacity-100">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                        Free Plan
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                        Available
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative gradient blob behind illustration */}
              <div className="absolute inset-0 -z-10 hidden lg:block">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/20 via-teal-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
              </div>

              {/* Main illustration */}
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md -translate-x-1 sm:-translate-x-2">
                <Image
                  src="/blueman.png"
                  alt="Person tracking monthly budget on a tablet"
                  width={800}
                  height={800}
                  priority
                  className="h-auto w-full scale-[1.08] origin-center drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
              Everything you need to manage expenses
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
              Powerful features designed to help you understand and control your spending.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-6 sm:mt-20 lg:grid-cols-3 pl-4 lg:pl-12 xl:pl-20 pr-4 lg:pr-12 xl:pr-20">
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-[0_24px_60px_rgba(8,145,178,0.22)] backdrop-blur dark:border-slate-700 dark:bg-slate-800/90 dark:shadow-[0_24px_60px_rgba(8,145,178,0.35)]">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 dark:bg-cyan-900/30">
                <svg
                  className="h-5 w-5 text-cyan-600 dark:text-cyan-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0a6 6 0 11-12 0 6 6 0 0112 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Track Expenses</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Easily record and categorize your daily expenses. Track food, transport, bills,
                and more with intuitive categories.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-[0_24px_60px_rgba(8,145,178,0.22)] backdrop-blur dark:border-slate-700 dark:bg-slate-800/90 dark:shadow-[0_24px_60px_rgba(8,145,178,0.35)]">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 dark:bg-cyan-900/30">
                <svg
                  className="h-5 w-5 text-cyan-600 dark:text-cyan-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Visual Insights</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Get a clear picture of your spending patterns with beautiful charts and
                visualizations. Understand where your money goes.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-[0_24px_60px_rgba(8,145,178,0.22)] backdrop-blur dark:border-slate-700 dark:bg-slate-800/90 dark:shadow-[0_24px_60px_rgba(8,145,178,0.35)]">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 dark:bg-cyan-900/30">
                <svg
                  className="h-5 w-5 text-cyan-600 dark:text-cyan-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Secure & Private</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Your financial data is kept secure and private. Built with modern security
                practices to protect your information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-gradient-to-b from-sky-50 via-transparent to-slate-50">
        {/* Animated background elements - floating gradient blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-teal-400/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        {/* Subtle geometric pattern background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="geometric-pattern-cta" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="2" fill="none" stroke="#06b6d4" strokeWidth="0.5" opacity="0.3" />
                <path d="M0 30 L60 30" stroke="#14b8a6" strokeWidth="0.5" opacity="0.2" />
                <path d="M30 0 L30 60" stroke="#14b8a6" strokeWidth="0.5" opacity="0.2" />
                <path d="M0 0 L60 60" stroke="#06b6d4" strokeWidth="0.5" opacity="0.15" />
                <path d="M60 0 L0 60" stroke="#06b6d4" strokeWidth="0.5" opacity="0.15" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#geometric-pattern-cta)" />
          </svg>
          
          {/* Additional geometric shapes */}
          <div className="absolute top-1/4 right-1/4 w-32 h-32 border border-cyan-300/20 rounded-lg rotate-45"></div>
          <div className="absolute bottom-1/4 left-1/4 w-24 h-24 border border-teal-300/20 rounded-full"></div>
          <div className="absolute top-1/2 right-1/3 w-16 h-16 border border-blue-300/20 rounded-lg rotate-12"></div>
        </div>

        {/* Floating peso (₱) symbols with bounce animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 text-8xl text-cyan-400/10 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3s' }}>₱</div>
          <div className="absolute top-40 right-20 text-7xl text-teal-400/10 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '2.5s' }}>₱</div>
          <div className="absolute bottom-20 left-1/4 text-8xl text-blue-400/10 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}>₱</div>
          <div className="absolute top-1/3 right-1/3 text-6xl text-cyan-400/10 animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '2.8s' }}>₱</div>
          <div className="absolute bottom-1/3 right-1/4 text-7xl text-teal-400/10 animate-bounce" style={{ animationDelay: '1.2s', animationDuration: '3.2s' }}>₱</div>
          <div className="absolute top-1/2 left-1/5 text-6xl text-blue-400/10 animate-bounce" style={{ animationDelay: '1.8s', animationDuration: '2.8s' }}>₱</div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <div className="rounded-3xl border border-slate-200/60 bg-white/70 backdrop-blur-md p-12 shadow-[var(--shadow-soft)] dark:border-slate-700/60 dark:bg-slate-800/70">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
                Ready to take control?
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
                Join thousands of users managing their finances better every day.
              </p>
              <div className="mt-8 flex items-center justify-center gap-x-6">
                <Link
                  href="/register"
                  className="rounded-full bg-cyan-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-150 hover:-translate-y-[2px] hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                >
                  Get Started Free
                </Link>
                <Link
                  href="/login"
                  className="text-base font-semibold leading-6 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  Already have an account?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 bg-white/80 backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-900/80">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()} PH Expense Tracker. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
