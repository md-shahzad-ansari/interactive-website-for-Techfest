import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };
    const handleDown = () => setClicking(true);
    const handleUp = () => setClicking(false);
    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
    };
  }, [visible]);

  // Only show on desktop
  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

  return (
    <>
      {/* Outer ring */}
      <div
        className="fixed pointer-events-none z-[9999] hidden md:block"
        style={{
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.15s ease-out, width 0.2s, height 0.2s, opacity 0.3s',
          width: clicking ? '35px' : '40px',
          height: clicking ? '35px' : '40px',
          border: '1px solid rgba(0, 240, 255, 0.3)',
          borderRadius: '50%',
          opacity: visible ? 1 : 0,
        }}
      ></div>
      {/* Inner dot */}
      <div
        className="fixed pointer-events-none z-[9999] hidden md:block"
        style={{
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%, -50%)',
          width: clicking ? '8px' : '4px',
          height: clicking ? '8px' : '4px',
          backgroundColor: '#00f0ff',
          borderRadius: '50%',
          transition: 'width 0.15s, height 0.15s, opacity 0.3s',
          opacity: visible ? 0.8 : 0,
          boxShadow: '0 0 10px rgba(0, 240, 255, 0.5)',
        }}
      ></div>
    </>
  );
}
