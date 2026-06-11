import { useState } from 'react';
import { useInView } from '../hooks/useScrollProgress';

const categories = ['ALL', 'CODING', 'ROBOTICS', 'AI/ML', 'DESIGN', 'GAMING'];

const events = [
  {
    id: 1,
    title: 'QUANTUM HACK',
    category: 'CODING',
    description: 'A 48-hour hackathon building quantum computing solutions for real-world problems.',
    prize: '₹5,00,000',
    participants: '500+',
    difficulty: 'EXPERT',
    color: '#00f0ff',
    date: 'MAR 13-15',
  },
  {
    id: 2,
    title: 'MECH ARENA',
    category: 'ROBOTICS',
    description: 'Build and battle autonomous robots in an arena of steel and strategy.',
    prize: '₹3,00,000',
    participants: '200+',
    difficulty: 'HARD',
    color: '#ff00e5',
    date: 'MAR 14',
  },
  {
    id: 3,
    title: 'NEURAL FORGE',
    category: 'AI/ML',
    description: 'Train neural networks to solve unseen challenges in a competitive ML battleground.',
    prize: '₹4,00,000',
    participants: '300+',
    difficulty: 'EXPERT',
    color: '#8b5cf6',
    date: 'MAR 13-14',
  },
  {
    id: 4,
    title: 'PIXEL WARS',
    category: 'DESIGN',
    description: 'Design futuristic interfaces and experiences that push creative boundaries.',
    prize: '₹2,00,000',
    participants: '250+',
    difficulty: 'MEDIUM',
    color: '#39ff14',
    date: 'MAR 15',
  },
  {
    id: 5,
    title: 'CODE ROYALE',
    category: 'CODING',
    description: 'Last-coder-standing competitive programming with escalating difficulty rounds.',
    prize: '₹2,50,000',
    participants: '1000+',
    difficulty: 'HARD',
    color: '#ff6b00',
    date: 'MAR 14',
  },
  {
    id: 6,
    title: 'CYBER LEAGUE',
    category: 'GAMING',
    description: 'Esports tournament featuring Valorant, CS2, and custom game jams.',
    prize: '₹3,00,000',
    participants: '400+',
    difficulty: 'ALL LEVELS',
    color: '#00f0ff',
    date: 'MAR 13-15',
  },
];

export function EventsSection() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { ref: headerRef, isInView: headerVisible } = useInView(0.2);
  const { ref: gridRef, isInView: gridVisible } = useInView(0.05);

  const filteredEvents = activeCategory === 'ALL'
    ? events
    : events.filter(e => e.category === activeCategory);

  return (
    <section id="events" data-section="2" className="relative py-32 md:py-40 z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-cyber-pink"></div>
            <span className="font-mono text-xs text-cyber-pink/60 tracking-[0.3em]">002</span>
            <div className="w-8 h-[1px] bg-cyber-pink"></div>
          </div>
          <h2 className="font-orbitron text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white/80">FLAGSHIP </span>
            <span className="gradient-text">EVENTS</span>
          </h2>
          <p className="font-rajdhani text-lg text-white/40 max-w-2xl mx-auto">
            Choose your arena. Master your domain. Conquer the impossible.
          </p>
        </div>

        {/* Category filter */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-1000 delay-200 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-rajdhani text-sm tracking-widest px-5 py-2 border transition-all duration-300 ${
                activeCategory === cat
                  ? 'border-cyber-blue bg-cyber-blue/10 text-cyber-blue shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                  : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, i) => (
            <div
              key={event.id}
              className={`group relative overflow-hidden border border-white/5 bg-dark-bg/40 backdrop-blur-sm cursor-pointer transition-all duration-700 hover:border-white/20 ${
                gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
              onMouseEnter={() => setHoveredCard(event.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Top color bar */}
              <div
                className="h-[2px] transition-all duration-500"
                style={{
                  background: `linear-gradient(to right, transparent, ${event.color}, transparent)`,
                  opacity: hoveredCard === event.id ? 1 : 0.3,
                }}
              ></div>

              <div className="p-6 md:p-8">
                {/* Category & difficulty */}
                <div className="flex justify-between items-center mb-4">
                  <span
                    className="font-mono text-[10px] tracking-widest px-3 py-1 border"
                    style={{ borderColor: event.color + '40', color: event.color }}
                  >
                    {event.category}
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-white/30">
                    {event.difficulty}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-orbitron text-xl md:text-2xl font-bold mb-3 transition-colors duration-300"
                  style={{ color: hoveredCard === event.id ? event.color : 'white' }}
                >
                  {event.title}
                </h3>

                {/* Description */}
                <p className="font-rajdhani text-sm text-white/40 leading-relaxed mb-6 group-hover:text-white/60 transition-colors">
                  {event.description}
                </p>

                {/* Meta */}
                <div className="flex justify-between items-end">
                  <div>
                    <div className="font-mono text-[10px] text-white/20 mb-1">PRIZE POOL</div>
                    <div className="font-orbitron text-lg font-bold" style={{ color: event.color }}>
                      {event.prize}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[10px] text-white/20 mb-1">{event.date}</div>
                    <div className="font-rajdhani text-sm text-white/40">{event.participants}</div>
                  </div>
                </div>

                {/* Register button */}
                <div className="mt-6 overflow-hidden">
                  <button
                    className="w-full py-3 font-rajdhani font-semibold text-sm tracking-widest border transition-all duration-500 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100"
                    style={{
                      borderColor: event.color + '50',
                      color: event.color,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = event.color + '15';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    REGISTER NOW →
                  </button>
                </div>
              </div>

              {/* Background glow */}
              <div
                className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-3xl"
                style={{ background: event.color }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
