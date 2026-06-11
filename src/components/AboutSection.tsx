import { useInView } from '../hooks/useScrollProgress';

const stats = [
  { value: '50+', label: 'EVENTS', icon: '⚡' },
  { value: '10K+', label: 'PARTICIPANTS', icon: '👥' },
  { value: '₹20L', label: 'PRIZE POOL', icon: '🏆' },
  { value: '72', label: 'HOURS', icon: '⏱️' },
];

const pillars = [
  {
    title: 'INNOVATE',
    description: 'Push boundaries with cutting-edge hackathons and innovation challenges that reshape tomorrow.',
    color: 'cyber-blue',
    icon: '🔬',
  },
  {
    title: 'COMPETE',
    description: 'Battle the brightest minds in coding competitions, robotics wars, and technical olympiads.',
    color: 'cyber-pink',
    icon: '⚔️',
  },
  {
    title: 'CONNECT',
    description: 'Network with industry titans, tech visionaries, and fellow innovators from across the globe.',
    color: 'cyber-purple',
    icon: '🌐',
  },
];

export function AboutSection() {
  const { ref: sectionRef, isInView } = useInView(0.1);
  const { ref: statsRef, isInView: statsVisible } = useInView(0.2);
  const { ref: pillarsRef, isInView: pillarsVisible } = useInView(0.1);

  return (
    <section id="about" data-section="1" className="relative py-32 md:py-40 z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div
          ref={sectionRef}
          className={`text-center mb-20 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-cyber-blue"></div>
            <span className="font-mono text-xs text-cyber-blue/60 tracking-[0.3em]">001</span>
            <div className="w-8 h-[1px] bg-cyber-blue"></div>
          </div>
          <h2 className="font-orbitron text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">ABOUT</span>
            <span className="text-white/80"> THE EVENT</span>
          </h2>
          <p className="font-rajdhani text-lg md:text-xl text-white/40 max-w-3xl mx-auto leading-relaxed">
            Techfest 2026 is not just an event — it's a convergence of the world's most brilliant minds,
            a launchpad for revolutionary ideas, and a celebration of the relentless human spirit to innovate.
          </p>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`relative p-6 md:p-8 text-center border border-white/5 bg-dark-bg/50 backdrop-blur-sm transition-all duration-700 hover:border-cyber-blue/30 hover:bg-dark-surface/50 group ${
                statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="font-orbitron text-3xl md:text-4xl font-bold text-cyber-blue mb-2 group-hover:text-cyber-pink transition-colors duration-300">
                {stat.value}
              </div>
              <div className="font-rajdhani text-xs tracking-[0.3em] text-white/30">
                {stat.label}
              </div>
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyber-blue/20 group-hover:border-cyber-blue/60 transition-colors"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-cyber-blue/20 group-hover:border-cyber-blue/60 transition-colors"></div>
            </div>
          ))}
        </div>

        {/* Pillars */}
        <div ref={pillarsRef} className="grid md:grid-cols-3 gap-6 md:gap-8">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className={`group relative p-8 md:p-10 border border-white/5 bg-dark-bg/30 backdrop-blur-sm hover:bg-dark-surface/40 transition-all duration-700 cursor-pointer ${
                pillarsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              {/* Top accent line */}
              <div className={`absolute top-0 left-0 h-[2px] bg-${pillar.color} transition-all duration-500 w-0 group-hover:w-full`}></div>

              <div className="text-4xl mb-6">{pillar.icon}</div>
              <h3 className={`font-orbitron text-xl font-bold text-${pillar.color} mb-4 tracking-wider`}>
                {pillar.title}
              </h3>
              <p className="font-rajdhani text-base text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">
                {pillar.description}
              </p>

              {/* Arrow icon */}
              <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500">
                <span className={`font-rajdhani text-sm text-${pillar.color} tracking-widest`}>EXPLORE</span>
                <span className={`text-${pillar.color}`}>→</span>
              </div>

              {/* HUD corners */}
              <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-white/5 group-hover:border-cyber-blue/30 transition-colors"></div>
              <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-white/5 group-hover:border-cyber-blue/30 transition-colors"></div>
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-white/5 group-hover:border-cyber-blue/30 transition-colors"></div>
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-white/5 group-hover:border-cyber-blue/30 transition-colors"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
