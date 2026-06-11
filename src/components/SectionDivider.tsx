export function SectionDivider({ variant = 'default' }: { variant?: 'default' | 'alt' }) {
  if (variant === 'alt') {
    return (
      <div className="relative z-10 py-8 flex items-center justify-center">
        <div className="flex items-center gap-4 w-full max-w-md mx-auto px-6">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-cyber-pink/30"></div>
          <div className="w-2 h-2 rotate-45 border border-cyber-pink/40"></div>
          <div className="w-1 h-1 bg-cyber-pink/60"></div>
          <div className="w-2 h-2 rotate-45 border border-cyber-pink/40"></div>
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-cyber-pink/30"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 py-8 flex items-center justify-center">
      <div className="flex items-center gap-4 w-full max-w-lg mx-auto px-6">
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-cyber-blue/20"></div>
        <div className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-cyber-blue/40 rounded-full"></div>
          ))}
        </div>
        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-cyber-blue/20"></div>
      </div>
    </div>
  );
}
