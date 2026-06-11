import { useEffect, useState } from 'react';

export function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    setLoaded(true);
    const targetDate = new Date('2026-03-15T09:00:00');
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          mins: Math.floor((diff / (1000 * 60)) % 60),
          secs: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" data-section="0" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* HUD overlay elements */}
      <div className="absolute top-20 left-6 md:left-12 flex flex-col gap-2 z-10">
        <div className={`text-cyber-blue/40 font-mono text-xs transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          SYS.STATUS: ONLINE
        </div>
        <div className={`text-cyber-blue/40 font-mono text-xs transition-all duration-1000 delay-700 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          PROTOCOL: QUANTUM-7
        </div>
        <div className={`text-cyber-blue/40 font-mono text-xs transition-all duration-1000 delay-900 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          NODE: ALPHA-PRIME
        </div>
      </div>

      <div className="absolute top-20 right-6 md:right-12 flex flex-col items-end gap-2 z-10">
        <div className={`text-cyber-pink/40 font-mono text-xs transition-all duration-1000 delay-600 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
          LAT: 19.0760° N
        </div>
        <div className={`text-cyber-pink/40 font-mono text-xs transition-all duration-1000 delay-800 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
          LONG: 72.8777° E
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Pre-title */}
        <div className={`transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-cyber-blue"></div>
            <span className="font-rajdhani text-cyber-blue/80 text-sm md:text-base tracking-[0.3em] uppercase">
              Initializing the future
            </span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-cyber-blue"></div>
          </div>
        </div>

        {/* Title */}
        <h1 className={`transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}>
          <span className="block font-orbitron text-5xl md:text-7xl lg:text-9xl font-black tracking-tight leading-none">
            <span className="gradient-text">TECH</span>
            <span className="text-white">FEST</span>
          </span>
          <span className="block font-orbitron text-2xl md:text-4xl lg:text-5xl font-light tracking-[0.5em] text-white/30 mt-2">
            2 0 2 6
          </span>
        </h1>

        {/* Subtitle */}
        <p className={`font-rajdhani text-lg md:text-2xl text-white/50 mt-6 md:mt-8 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Where <span className="text-cyber-blue">quantum computing</span> meets{' '}
          <span className="text-cyber-pink">neural interfaces</span> — redefining the boundaries of possibility
        </p>

        {/* Countdown */}
        <div className={`flex justify-center gap-4 md:gap-8 mt-10 md:mt-14 transition-all duration-1000 delay-900 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { value: countdown.days, label: 'DAYS' },
            { value: countdown.hours, label: 'HOURS' },
            { value: countdown.mins, label: 'MINS' },
            { value: countdown.secs, label: 'SECS' },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <div className="relative">
                <div className="w-16 h-16 md:w-20 md:h-20 border border-cyber-blue/20 flex items-center justify-center bg-dark-bg/40 backdrop-blur-sm">
                  <span className="font-orbitron text-2xl md:text-3xl font-bold text-cyber-blue tabular-nums">
                    {String(item.value).padStart(2, '0')}
                  </span>
                </div>
                {/* Corner decorations */}
                <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-cyber-blue"></div>
                <div className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-cyber-blue"></div>
                <div className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-cyber-blue"></div>
                <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-cyber-blue"></div>
              </div>
              <span className="font-rajdhani text-[10px] md:text-xs tracking-widest text-white/30 mt-2">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row justify-center gap-4 mt-10 md:mt-14 transition-all duration-1000 delay-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button
            onClick={() => document.querySelector('#register')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative font-rajdhani font-bold text-base tracking-widest px-10 py-4 bg-gradient-to-r from-cyber-blue to-cyber-purple text-dark-bg hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all duration-500"
          >
            <span className="relative z-10">ENTER THE NEXUS</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyber-purple to-cyber-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
          <button
            onClick={() => document.querySelector('#events')?.scrollIntoView({ behavior: 'smooth' })}
            className="font-rajdhani font-semibold text-base tracking-widest px-10 py-4 border border-white/20 text-white/70 hover:border-cyber-pink/50 hover:text-cyber-pink hover:bg-cyber-pink/5 transition-all duration-500"
          >
            EXPLORE EVENTS
          </button>
        </div>

        {/* Scroll indicator */}
        <div className={`mt-16 md:mt-20 flex flex-col items-center transition-all duration-1000 delay-[1200ms] ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <span className="font-mono text-[10px] tracking-widest text-white/20 mb-3">SCROLL TO EXPLORE</span>
          <div className="w-[1px] h-12 relative overflow-hidden">
            <div className="w-full h-full bg-gradient-to-b from-cyber-blue to-transparent animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
