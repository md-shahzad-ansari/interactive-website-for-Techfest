import { useState, useRef, useCallback } from 'react';
import { useInView } from '../hooks/useScrollProgress';

const features = [
  {
    icon: '⚛️',
    title: 'Quantum Workshops',
    description: 'Hands-on sessions with IBM Qiskit and Google Cirq quantum computing frameworks.',
    gradient: 'from-cyan-500/20 to-blue-600/20',
    borderColor: '#00f0ff',
    number: '01',
  },
  {
    icon: '🧠',
    title: 'AI Lab Access',
    description: 'Exclusive access to GPU clusters with NVIDIA A100s for training your models.',
    gradient: 'from-purple-500/20 to-pink-600/20',
    borderColor: '#8b5cf6',
    number: '02',
  },
  {
    icon: '🔗',
    title: 'Blockchain Arena',
    description: 'Build and deploy smart contracts on live testnets with mentor guidance.',
    gradient: 'from-green-500/20 to-emerald-600/20',
    borderColor: '#39ff14',
    number: '03',
  },
  {
    icon: '🛸',
    title: 'AR/VR Experience',
    description: 'Step into immersive mixed reality demos powered by Meta Quest and Apple Vision Pro.',
    gradient: 'from-orange-500/20 to-red-600/20',
    borderColor: '#ff6b00',
    number: '04',
  },
  {
    icon: '🤖',
    title: 'Robotics Lab',
    description: 'Design and program autonomous robots with ROS2 and custom PCB fabrication.',
    gradient: 'from-pink-500/20 to-rose-600/20',
    borderColor: '#ff00e5',
    number: '05',
  },
  {
    icon: '🔐',
    title: 'CTF Arena',
    description: 'Capture-the-flag cybersecurity challenges with real-world vulnerability scenarios.',
    gradient: 'from-blue-500/20 to-indigo-600/20',
    borderColor: '#00f0ff',
    number: '06',
  },
];

function TiltCard({ feature, index, isVisible }: { feature: typeof features[0]; index: number; isVisible: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (y - 0.5) * -15,
      y: (x - 0.5) * 15,
    });
  }, []);

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovering(false);
  };

  return (
    <div
      ref={cardRef}
      className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
      style={{
        transitionDelay: `${index * 120}ms`,
        perspective: '1000px',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative p-6 md:p-8 border border-white/5 bg-dark-bg/30 backdrop-blur-sm cursor-pointer overflow-hidden h-full transition-shadow duration-500"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: hovering ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
          transformStyle: 'preserve-3d',
          boxShadow: hovering ? `0 20px 60px -15px ${feature.borderColor}20` : 'none',
        }}
      >
        {/* Shine effect on hover */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
          style={{
            opacity: hovering ? 0.1 : 0,
            background: `radial-gradient(circle at ${(tilt.y / 15 + 0.5) * 100}% ${(-tilt.x / 15 + 0.5) * 100}%, ${feature.borderColor}, transparent 50%)`,
          }}
        ></div>

        {/* Number */}
        <span className="absolute top-4 right-4 font-orbitron text-5xl font-black opacity-[0.03]">
          {feature.number}
        </span>

        {/* Icon */}
        <div className="text-4xl mb-5" style={{ transform: 'translateZ(30px)' }}>
          {feature.icon}
        </div>

        {/* Title */}
        <h3
          className="font-orbitron text-base font-bold mb-3 tracking-wider transition-colors duration-300"
          style={{
            color: hovering ? feature.borderColor : 'white',
            transform: 'translateZ(20px)',
          }}
        >
          {feature.title}
        </h3>

        {/* Description */}
        <p
          className="font-rajdhani text-sm text-white/35 leading-relaxed transition-colors duration-300"
          style={{
            color: hovering ? 'rgba(255,255,255,0.55)' : undefined,
            transform: 'translateZ(10px)',
          }}
        >
          {feature.description}
        </p>

        {/* Bottom accent */}
        <div
          className="absolute bottom-0 left-0 h-[2px] transition-all duration-500"
          style={{
            width: hovering ? '100%' : '0%',
            background: `linear-gradient(to right, transparent, ${feature.borderColor}, transparent)`,
          }}
        ></div>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  const { ref: headerRef, isInView: headerVisible } = useInView(0.2);
  const { ref: gridRef, isInView: gridVisible } = useInView(0.05);

  return (
    <section data-section className="relative py-32 md:py-40 z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-cyber-blue"></div>
            <span className="font-mono text-xs text-cyber-blue/60 tracking-[0.3em]">LABS</span>
            <div className="w-8 h-[1px] bg-cyber-blue"></div>
          </div>
          <h2 className="font-orbitron text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">EXPERIENCE</span>
            <span className="text-white/80"> ZONES</span>
          </h2>
          <p className="font-rajdhani text-lg text-white/40 max-w-2xl mx-auto">
            Immersive labs and workshops where you don't just learn — you build the future.
          </p>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <TiltCard key={feature.title} feature={feature} index={i} isVisible={gridVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
