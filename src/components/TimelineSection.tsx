import { useInView } from '../hooks/useScrollProgress';

const timelineData = [
  {
    day: 'DAY 01',
    date: 'MARCH 13',
    events: [
      { time: '09:00', title: 'GENESIS — Opening Ceremony', description: 'Grand inauguration with holographic displays and keynote address', color: '#00f0ff' },
      { time: '11:00', title: 'QUANTUM HACK Begins', description: '48-hour hackathon kickoff with problem statements revealed', color: '#8b5cf6' },
      { time: '14:00', title: 'NEURAL FORGE — Round 1', description: 'First ML challenge: Unsupervised learning on mystery datasets', color: '#ff00e5' },
      { time: '18:00', title: 'CYBER LEAGUE — Qualifiers', description: 'Esports qualifiers across all game titles begin', color: '#39ff14' },
    ],
  },
  {
    day: 'DAY 02',
    date: 'MARCH 14',
    events: [
      { time: '09:00', title: 'CODE ROYALE — Arena Opens', description: '5 rounds of competitive programming, each harder than the last', color: '#ff6b00' },
      { time: '12:00', title: 'MECH ARENA — Battles Begin', description: 'Robot combat round-robin with live commentary', color: '#ff00e5' },
      { time: '15:00', title: 'Tech Talks — Industry Leaders', description: 'Sessions from Google, Microsoft, and ISRO leaders', color: '#00f0ff' },
      { time: '21:00', title: 'MIDNIGHT CHALLENGE', description: 'Surprise challenge revealed — solve it before dawn', color: '#8b5cf6' },
    ],
  },
  {
    day: 'DAY 03',
    date: 'MARCH 15',
    events: [
      { time: '09:00', title: 'PIXEL WARS — Design Sprint', description: '6-hour intensive design challenge with live critiques', color: '#39ff14' },
      { time: '12:00', title: 'QUANTUM HACK — Final Submissions', description: 'Hackathon finale with demo presentations to judges', color: '#8b5cf6' },
      { time: '16:00', title: 'GRAND FINALE', description: 'Final battles, results, and championship announcements', color: '#ff6b00' },
      { time: '19:00', title: 'NEXUS — Closing Ceremony', description: 'Award distribution, cultural performances, and farewell', color: '#00f0ff' },
    ],
  },
];

function TimelineDay({ day, isInView, index }: { day: typeof timelineData[0]; isInView: boolean; index: number }) {
  return (
    <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      {/* Day header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="font-orbitron text-2xl md:text-3xl font-bold gradient-text">{day.day}</div>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-cyber-blue/30 to-transparent"></div>
        <div className="font-mono text-sm text-white/30 tracking-widest">{day.date}</div>
      </div>

      {/* Events */}
      <div className="relative pl-8 md:pl-12 space-y-6">
        {/* Vertical line */}
        <div className="absolute left-3 md:left-5 top-0 bottom-0 w-[1px] bg-gradient-to-b from-cyber-blue/30 via-cyber-pink/30 to-cyber-purple/30"></div>

        {day.events.map((event, i) => (
          <div key={i} className="relative group">
            {/* Dot */}
            <div
              className="absolute -left-[22px] md:-left-[30px] top-2 w-3 h-3 border-2 bg-dark-bg transition-all duration-300 group-hover:scale-150"
              style={{ borderColor: event.color }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
                style={{ background: event.color }}
              ></div>
            </div>

            {/* Content card */}
            <div className="p-4 md:p-6 border border-white/5 bg-dark-bg/30 backdrop-blur-sm hover:border-white/15 transition-all duration-500 group-hover:translate-x-2">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="font-mono text-xs tracking-widest" style={{ color: event.color }}>
                  {event.time}
                </span>
                <div className="w-[1px] h-3 bg-white/10"></div>
                <h4 className="font-orbitron text-sm md:text-base font-semibold text-white group-hover:text-white transition-colors">
                  {event.title}
                </h4>
              </div>
              <p className="font-rajdhani text-sm text-white/35 group-hover:text-white/55 transition-colors leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TimelineSection() {
  const { ref: headerRef, isInView: headerVisible } = useInView(0.2);
  const { ref: contentRef, isInView: contentVisible } = useInView(0.05);

  return (
    <section id="timeline" data-section="3" className="relative py-32 md:py-40 z-10">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-20 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-cyber-purple"></div>
            <span className="font-mono text-xs text-cyber-purple/60 tracking-[0.3em]">003</span>
            <div className="w-8 h-[1px] bg-cyber-purple"></div>
          </div>
          <h2 className="font-orbitron text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">EVENT</span>
            <span className="text-white/80"> TIMELINE</span>
          </h2>
          <p className="font-rajdhani text-lg text-white/40 max-w-2xl mx-auto">
            Three days of non-stop innovation, competition, and discovery.
          </p>
        </div>

        {/* Timeline content */}
        <div ref={contentRef} className="space-y-16">
          {timelineData.map((day, i) => (
            <TimelineDay key={day.day} day={day} isInView={contentVisible} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
