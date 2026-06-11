import { useInView } from '../hooks/useScrollProgress';

export function ParallaxBanner() {
  const { ref, isInView } = useInView(0.1);

  const marqueeItems = [
    'QUANTUM COMPUTING', '◆', 'NEURAL NETWORKS', '◆', 'ROBOTICS', '◆',
    'BLOCKCHAIN', '◆', 'CYBERSECURITY', '◆', 'SPACE TECH', '◆',
    'AR/VR', '◆', 'IOT', '◆', 'EDGE COMPUTING', '◆', 'WEB3', '◆',
  ];

  return (
    <div
      ref={ref}
      className={`relative z-10 py-6 overflow-hidden border-y border-white/5 transition-all duration-1000 ${
        isInView ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
          <span
            key={i}
            className={`mx-4 font-orbitron text-sm tracking-[0.3em] ${
              item === '◆' ? 'text-cyber-blue/30 text-xs' : 'text-white/10'
            }`}
          >
            {item}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
