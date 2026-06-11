import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [visible, setVisible] = useState(true);

  const phases = [
    'INITIALIZING QUANTUM CORES...',
    'LOADING NEURAL NETWORKS...',
    'CALIBRATING HOLOGRAPHICS...',
    'SYNCING NEXUS PROTOCOL...',
    'SYSTEM READY',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 8 + 2;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            setTimeout(onComplete, 500);
          }, 400);
          return 100;
        }
        return next;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const idx = Math.min(Math.floor(progress / 25), phases.length - 1);
    setPhase(idx);
  }, [progress, phases.length]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-dark-bg flex flex-col items-center justify-center transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Grid background */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>

      {/* Central element */}
      <div className="relative mb-12">
        {/* Rotating squares */}
        <div className="w-24 h-24 relative">
          <div className="absolute inset-0 border-2 border-cyber-blue/30 rotate-slow"></div>
          <div className="absolute inset-2 border border-cyber-pink/20 rotate-reverse"></div>
          <div className="absolute inset-4 border border-cyber-purple/30 rotate-slow" style={{ animationDuration: '10s' }}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-orbitron text-2xl font-bold text-cyber-blue">
              TF
            </span>
          </div>
        </div>
      </div>

      {/* Title */}
      <h1 className="font-orbitron text-3xl md:text-4xl font-bold mb-8 tracking-wider">
        <span className="text-cyber-blue">TECH</span>
        <span className="text-white">FEST</span>
        <span className="text-white/20 ml-3">2026</span>
      </h1>

      {/* Progress bar */}
      <div className="w-64 md:w-80">
        <div className="flex justify-between mb-2">
          <span className="font-mono text-[10px] text-white/30 tracking-widest">LOADING</span>
          <span className="font-mono text-[10px] text-cyber-blue tracking-widest">
            {Math.floor(progress)}%
          </span>
        </div>
        <div className="h-[2px] bg-white/5 relative overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyber-blue via-cyber-pink to-cyber-purple transition-all duration-200"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="font-mono text-[10px] text-white/20 mt-3 tracking-widest text-center h-4">
          {phases[phase]}
        </p>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-8 left-8 font-mono text-[10px] text-white/10">
        <div>SYS.BOOT v2.6.0</div>
        <div>NODE: ALPHA</div>
      </div>
      <div className="absolute bottom-8 right-8 font-mono text-[10px] text-white/10 text-right">
        <div>MEM: 128TB</div>
        <div>CORES: 4096</div>
      </div>
    </div>
  );
}
