import { useState } from 'react';
import { useInView } from '../hooks/useScrollProgress';

export function RegisterSection() {
  const [formData, setFormData] = useState({ name: '', email: '', college: '', event: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const { ref: sectionRef, isInView } = useInView(0.1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="register" data-section="5" className="relative py-32 md:py-40 z-10">
      <div className="max-w-4xl mx-auto px-6">
        <div
          ref={sectionRef}
          className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-cyber-orange"></div>
              <span className="font-mono text-xs text-cyber-orange/60 tracking-[0.3em]">005</span>
              <div className="w-8 h-[1px] bg-cyber-orange"></div>
            </div>
            <h2 className="font-orbitron text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">JOIN</span>
              <span className="text-white/80"> THE NEXUS</span>
            </h2>
            <p className="font-rajdhani text-lg text-white/40 max-w-2xl mx-auto">
              Register now and secure your place in the future of technology.
            </p>
          </div>

          {/* Form */}
          <div className="relative border border-white/5 bg-dark-bg/40 backdrop-blur-sm p-8 md:p-12">
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyber-blue/40"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyber-blue/40"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyber-blue/40"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyber-blue/40"></div>

            {submitted ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-6">🚀</div>
                <h3 className="font-orbitron text-2xl font-bold text-cyber-blue mb-4">
                  REGISTRATION SUCCESSFUL
                </h3>
                <p className="font-rajdhani text-lg text-white/40">
                  Welcome to the Nexus, {formData.name}. Check your email for further instructions.
                </p>
                <div className="mt-6 w-48 h-1 mx-auto bg-dark-surface overflow-hidden rounded">
                  <div className="h-full bg-gradient-to-r from-cyber-blue to-cyber-pink loading-bar"></div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="relative">
                    <label className="block font-mono text-[10px] tracking-widest text-white/30 mb-2">
                      FULL NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      className={`w-full bg-dark-bg/60 border ${
                        focused === 'name' ? 'border-cyber-blue shadow-[0_0_15px_rgba(0,240,255,0.1)]' : 'border-white/10'
                      } px-4 py-3 font-rajdhani text-white placeholder-white/20 outline-none transition-all duration-300`}
                      placeholder="Enter your name"
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <label className="block font-mono text-[10px] tracking-widest text-white/30 mb-2">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      className={`w-full bg-dark-bg/60 border ${
                        focused === 'email' ? 'border-cyber-pink shadow-[0_0_15px_rgba(255,0,229,0.1)]' : 'border-white/10'
                      } px-4 py-3 font-rajdhani text-white placeholder-white/20 outline-none transition-all duration-300`}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* College */}
                  <div className="relative">
                    <label className="block font-mono text-[10px] tracking-widest text-white/30 mb-2">
                      COLLEGE / ORGANIZATION
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.college}
                      onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                      onFocus={() => setFocused('college')}
                      onBlur={() => setFocused(null)}
                      className={`w-full bg-dark-bg/60 border ${
                        focused === 'college' ? 'border-cyber-purple shadow-[0_0_15px_rgba(139,92,246,0.1)]' : 'border-white/10'
                      } px-4 py-3 font-rajdhani text-white placeholder-white/20 outline-none transition-all duration-300`}
                      placeholder="Your institution"
                    />
                  </div>

                  {/* Event */}
                  <div className="relative">
                    <label className="block font-mono text-[10px] tracking-widest text-white/30 mb-2">
                      PRIMARY EVENT
                    </label>
                    <select
                      required
                      value={formData.event}
                      onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                      onFocus={() => setFocused('event')}
                      onBlur={() => setFocused(null)}
                      className={`w-full bg-dark-bg/60 border ${
                        focused === 'event' ? 'border-cyber-green shadow-[0_0_15px_rgba(57,255,20,0.1)]' : 'border-white/10'
                      } px-4 py-3 font-rajdhani text-white outline-none transition-all duration-300 appearance-none cursor-pointer`}
                    >
                      <option value="" className="bg-dark-bg">Select an event</option>
                      <option value="quantum" className="bg-dark-bg">Quantum Hack</option>
                      <option value="mech" className="bg-dark-bg">Mech Arena</option>
                      <option value="neural" className="bg-dark-bg">Neural Forge</option>
                      <option value="pixel" className="bg-dark-bg">Pixel Wars</option>
                      <option value="code" className="bg-dark-bg">Code Royale</option>
                      <option value="cyber" className="bg-dark-bg">Cyber League</option>
                    </select>
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="group relative w-full py-4 font-rajdhani font-bold text-base tracking-[0.3em] bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink text-dark-bg overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,240,255,0.3)]"
                  >
                    <span className="relative z-10">INITIALIZE REGISTRATION</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyber-pink via-cyber-purple to-cyber-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </button>
                </div>

                <p className="text-center font-mono text-[10px] text-white/20 tracking-widest mt-4">
                  BY REGISTERING, YOU AGREE TO THE NEXUS PROTOCOL v2.6
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
