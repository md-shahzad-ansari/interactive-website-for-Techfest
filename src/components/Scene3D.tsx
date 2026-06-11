import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Environment } from '@react-three/drei';
import { SceneContent } from './SceneContent';

interface Scene3DProps {
  scrollProgress: number;
  activeSection: number;
}

export function Scene3D({ scrollProgress, activeSection }: Scene3DProps) {
  return (
    <div className="canvas-container interactive">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00e5" />
          <pointLight position={[0, 5, -5]} intensity={0.8} color="#8b5cf6" />
          <Environment preset="night" />
          <SceneContent scrollProgress={scrollProgress} activeSection={activeSection} />
        </Suspense>
      </Canvas>
    </div>
  );
}
