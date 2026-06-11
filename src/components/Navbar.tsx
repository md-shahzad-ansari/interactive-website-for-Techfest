import { useState, useEffect } from 'react';

interface NavbarProps {
  activeSection: number;
  scrollY: number;
}

const navItems = [
  { label: 'HOME', href: '#hero' },
  { label: 'ABOUT', href: '#about' },
  { label: 'EVENTS', href: '#events' },
  { label: 'TIMELINE', href: '#timeline' },
  { label: 'SPEAKERS', href: '#speakers' },
  { label: 'REGISTER', href: '#register' },
];

export function Navbar({ scrollY }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    if (scrollY > lastScroll && scrollY > 200) {
      setVisible(false);
    } else {
      setVisible(true);
    }
    setLastScroll(scrollY);
  }, [scrollY, lastScroll]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      } ${scrollY > 100 ? 'bg-dark-bg/80 backdrop-blur-xl border-b border-cyber-blue/10' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('#hero')}>
          <div className="w-10 h-10 relative">
            <div className="absolute inset-0 border-2 border-cyber-blue rotate-45 transition-transform hover:rotate-[225deg] duration-700"></div>
            <div className="absolute inset-1 border border-cyber-pink rotate-45 transition-transform hover:rotate-[225deg] duration-700 delay-100"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-cyber-blue font-orbitron font-bold text-xs">TF</span>
            </div>
          </div>
          <span className="font-orbitron font-bold text-lg tracking-wider">
            <span className="text-cyber-blue">TECH</span>
            <span className="text-white">FEST</span>
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.href)}
              className="font-rajdhani font-medium text-sm tracking-widest text-white/60 hover:text-cyber-blue transition-all duration-300 relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyber-blue group-hover:w-full transition-all duration-300"></span>
            </button>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => scrollTo('#register')}
          className="hidden md:block font-rajdhani font-semibold text-sm tracking-widest px-6 py-2 border border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/10 hover:border-cyber-blue transition-all duration-300 relative overflow-hidden group"
        >
          <span className="relative z-10">JOIN NOW</span>
          <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue/0 via-cyber-blue/10 to-cyber-blue/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
        </button>

        {/* Mobile menu btn */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`w-6 h-[2px] bg-cyber-blue transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-[2px] bg-cyber-blue transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-[2px] bg-cyber-blue transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-500 overflow-hidden ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-dark-bg/95 backdrop-blur-xl border-t border-cyber-blue/10 px-6 py-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.href)}
              className="font-rajdhani font-medium text-base tracking-widest text-white/60 hover:text-cyber-blue transition-all text-left py-2 border-b border-white/5"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
