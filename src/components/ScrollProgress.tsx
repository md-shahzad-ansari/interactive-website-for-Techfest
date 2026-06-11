interface ScrollProgressProps {
  progress: number;
}

export function ScrollProgressBar({ progress }: ScrollProgressProps) {
  return (
    <>
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[60]">
        <div
          className="h-full bg-gradient-to-r from-cyber-blue via-cyber-pink to-cyber-purple transition-all duration-100"
          style={{ width: `${progress * 100}%` }}
        ></div>
      </div>

      {/* Side navigation dots */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
        {['hero', 'about', 'events', 'timeline', 'speakers', 'register'].map((section, i) => {
          const sectionProgress = progress * 5;
          const isActive = Math.abs(sectionProgress - i) < 0.8;
          return (
            <button
              key={section}
              onClick={() => document.querySelector(`#${section}`)?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center gap-3 justify-end"
            >
              <span className={`font-mono text-[9px] tracking-widest transition-all duration-300 ${isActive ? 'opacity-100 text-cyber-blue' : 'opacity-0 group-hover:opacity-60 text-white'}`}>
                {section.toUpperCase()}
              </span>
              <div className={`transition-all duration-300 ${isActive ? 'w-6 h-[2px] bg-cyber-blue' : 'w-2 h-2 border border-white/20 group-hover:border-white/50 rounded-full'}`}></div>
            </button>
          );
        })}
      </div>
    </>
  );
}
