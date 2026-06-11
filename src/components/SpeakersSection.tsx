import { useState } from 'react';
import { useInView } from '../hooks/useScrollProgress';

const speakers = [
  {
    name: 'Dr. Aria Quantum',
    role: 'Quantum Computing Lead',
    org: 'Google DeepMind',
    topic: 'Quantum Supremacy in Real-World Applications',
    color: '#00f0ff',
    avatar: '🧬',
  },
  {
    name: 'Prof. Nexus Chen',
    role: 'Director of AI Research',
    org: 'MIT CSAIL',
    topic: 'The Future of AGI and Human-AI Collaboration',
    color: '#ff00e5',
    avatar: '🤖',
  },
  {
    name: 'Zara Patel',
    role: 'CTO & Co-Founder',
    org: 'NeuralLink Systems',
    topic: 'Brain-Computer Interfaces: The Next Frontier',
    color: '#8b5cf6',
    avatar: '🧠',
  },
  {
    name: 'Dr. Orion Webb',
    role: 'Chief Scientist',
    org: 'ISRO',
    topic: 'Mars Colony: Engineering the Impossible',
    color: '#39ff14',
    avatar: '🚀',
  },
  {
    name: 'Kai Nakamura',
    role: 'VP of Engineering',
    org: 'Tesla Robotics',
    topic: 'Autonomous Systems at Scale',
    color: '#ff6b00',
    avatar: '⚙️',
  },
  {
    name: 'Elena Frost',
    role: 'Head of Security',
    org: 'CrowdStrike',
    topic: 'Cybersecurity in the Age of Quantum Threats',
    color: '#00f0ff',
    avatar: '🔐',
  },
];

export function SpeakersSection() {
  const [activeSpeaker, setActiveSpeaker] = useState<number | null>(null);
  const { ref: headerRef, isInView: headerVisible } = useInView(0.2);
  const { ref: gridRef, isInView: gridVisible } = useInView(0.05);

  return (
    <section id="speakers" data-section="4" className="relative py-32 md:py-40 z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-20 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-cyber-green"></div>
            <span className="font-mono text-xs text-cyber-green/60 tracking-[0.3em]">004</span>
            <div className="w-8 h-[1px] bg-cyber-green"></div>
          </div>
          <h2 className="font-orbitron text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white/80">KEYNOTE </span>
            <span className="gradient-text">SPEAKERS</span>
          </h2>
          <p className="font-rajdhani text-lg text-white/40 max-w-2xl mx-auto">
            Learn from the architects of tomorrow. Industry pioneers sharing their vision.
          </p>
        </div>

        {/* Speakers grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {speakers.map((speaker, i) => (
            <div
              key={speaker.name}
              className={`group relative border border-white/5 bg-dark-bg/30 backdrop-blur-sm overflow-hidden cursor-pointer transition-all duration-700 hover:border-white/20 ${
                gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
              onMouseEnter={() => setActiveSpeaker(i)}
              onMouseLeave={() => setActiveSpeaker(null)}
            >
              <div className="p-8">
                {/* Avatar */}
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div
                    className="w-full h-full hexagon flex items-center justify-center text-3xl transition-transform duration-500 group-hover:scale-110"
                    style={{ background: `linear-gradient(135deg, ${speaker.color}20, ${speaker.color}05)` }}
                  >
                    {speaker.avatar}
                  </div>
                  {/* Rotating border */}
                  <div
                    className="absolute -inset-2 rounded-full border border-dashed opacity-0 group-hover:opacity-30 transition-all duration-500 rotate-slow"
                    style={{ borderColor: speaker.color }}
                  ></div>
                </div>

                {/* Info */}
                <div className="text-center">
                  <h3
                    className="font-orbitron text-lg font-bold mb-1 transition-colors duration-300"
                    style={{ color: activeSpeaker === i ? speaker.color : 'white' }}
                  >
                    {speaker.name}
                  </h3>
                  <p className="font-rajdhani text-sm text-white/40 mb-1">{speaker.role}</p>
                  <p
                    className="font-mono text-xs tracking-widest mb-4"
                    style={{ color: speaker.color + '80' }}
                  >
                    {speaker.org}
                  </p>

                  {/* Divider */}
                  <div className="w-12 h-[1px] mx-auto mb-4 transition-all duration-500 group-hover:w-full"
                    style={{ background: `linear-gradient(to right, transparent, ${speaker.color}40, transparent)` }}
                  ></div>

                  {/* Topic */}
                  <p className="font-rajdhani text-sm text-white/30 group-hover:text-white/50 transition-colors leading-relaxed">
                    "{speaker.topic}"
                  </p>
                </div>
              </div>

              {/* Bottom accent */}
              <div
                className="h-[1px] transition-all duration-700"
                style={{
                  background: `linear-gradient(to right, transparent, ${speaker.color}, transparent)`,
                  opacity: activeSpeaker === i ? 0.6 : 0,
                }}
              ></div>

              {/* Background glow */}
              <div
                className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-700 blur-3xl"
                style={{ background: speaker.color }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
