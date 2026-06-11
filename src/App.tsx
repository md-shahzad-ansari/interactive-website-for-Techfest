import { useState, useCallback } from 'react';
import { useScrollProgress } from './hooks/useScrollProgress';
import { Scene3D } from './components/Scene3D';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { ScrollProgressBar } from './components/ScrollProgress';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { EventsSection } from './components/EventsSection';
import { TimelineSection } from './components/TimelineSection';
import { SpeakersSection } from './components/SpeakersSection';
import { RegisterSection } from './components/RegisterSection';
import { Footer } from './components/Footer';
import { SectionDivider } from './components/SectionDivider';
import { ParallaxBanner } from './components/ParallaxBanner';
import { FeaturesSection } from './components/FeaturesSection';
import { CustomCursor } from './components/CustomCursor';

export default function App() {
  const [loading, setLoading] = useState(true);
  const { scrollY, scrollProgress, activeSection } = useScrollProgress();

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <div className="relative scanline-overlay noise-overlay">
      {/* Custom cursor */}
      {!loading && <CustomCursor />}

      {/* Loading screen */}
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* 3D Background Scene */}
      {!loading && (
        <Scene3D scrollProgress={scrollProgress} activeSection={activeSection} />
      )}

      {/* Navigation */}
      {!loading && <Navbar activeSection={activeSection} scrollY={scrollY} />}

      {/* Scroll progress indicator */}
      {!loading && <ScrollProgressBar progress={scrollProgress} />}

      {/* Main content */}
      <main className="relative">
        <HeroSection />

        <SectionDivider />

        <AboutSection />

        <ParallaxBanner />

        <EventsSection />

        <SectionDivider variant="alt" />

        <TimelineSection />

        <SectionDivider />

        <SpeakersSection />

        <SectionDivider variant="alt" />

        <FeaturesSection />

        <ParallaxBanner />

        <RegisterSection />

        <Footer />
      </main>

      {/* Background gradient overlays */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        {/* Top vignette */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-dark-bg to-transparent"></div>
        {/* Bottom vignette */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-dark-bg to-transparent"></div>
        {/* Side vignettes */}
        <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-dark-bg/50 to-transparent"></div>
        <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-dark-bg/50 to-transparent"></div>
      </div>

      {/* Ambient gradient blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle, #00f0ff, transparent)',
            top: '10%',
            left: '20%',
            transform: `translateY(${scrollY * -0.1}px)`,
          }}
        ></div>
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[150px] opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle, #ff00e5, transparent)',
            top: '40%',
            right: '10%',
            transform: `translateY(${scrollY * -0.15}px)`,
          }}
        ></div>
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-[150px] opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle, #8b5cf6, transparent)',
            bottom: '20%',
            left: '30%',
            transform: `translateY(${scrollY * -0.05}px)`,
          }}
        ></div>
      </div>
    </div>
  );
}
