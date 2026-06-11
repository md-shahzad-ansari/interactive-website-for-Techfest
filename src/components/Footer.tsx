export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-dark-bg/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 relative">
                <div className="absolute inset-0 border-2 border-cyber-blue rotate-45"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-cyber-blue font-orbitron font-bold text-[10px]">TF</span>
                </div>
              </div>
              <span className="font-orbitron font-bold text-sm tracking-wider">
                <span className="text-cyber-blue">TECH</span>
                <span className="text-white">FEST</span>
              </span>
            </div>
            <p className="font-rajdhani text-sm text-white/30 leading-relaxed">
              The premier technology festival pushing the boundaries of innovation and human potential.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-mono text-xs tracking-widest text-cyber-blue/60 mb-4">NAVIGATION</h4>
            <div className="flex flex-col gap-2">
              {['Home', 'About', 'Events', 'Timeline', 'Speakers', 'Register'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="font-rajdhani text-sm text-white/30 hover:text-cyber-blue transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Events */}
          <div>
            <h4 className="font-mono text-xs tracking-widest text-cyber-pink/60 mb-4">EVENTS</h4>
            <div className="flex flex-col gap-2">
              {['Quantum Hack', 'Mech Arena', 'Neural Forge', 'Pixel Wars', 'Code Royale', 'Cyber League'].map((item) => (
                <span key={item} className="font-rajdhani text-sm text-white/30">{item}</span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-xs tracking-widest text-cyber-purple/60 mb-4">CONNECT</h4>
            <div className="flex flex-col gap-3">
              <a href="#" className="font-rajdhani text-sm text-white/30 hover:text-cyber-blue transition-colors">
                📧 hello@techfest2026.io
              </a>
              <a href="#" className="font-rajdhani text-sm text-white/30 hover:text-cyber-blue transition-colors">
                📱 +91 98765 43210
              </a>
              <div className="flex gap-4 mt-2">
                {['𝕏', 'in', 'ig', 'yt'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/30 hover:border-cyber-blue/50 hover:text-cyber-blue text-xs font-bold transition-all duration-300"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[10px] text-white/20 tracking-widest">
            © 2026 TECHFEST. ALL RIGHTS RESERVED. BUILT WITH ❤️ AND QUANTUM BITS.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse"></div>
            <span className="font-mono text-[10px] text-white/20 tracking-widest">ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
