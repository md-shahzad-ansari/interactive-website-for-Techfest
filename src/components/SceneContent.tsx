import { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Torus, Icosahedron, Octahedron, Ring, Text } from '@react-three/drei';

interface SceneContentProps {
  scrollProgress: number;
  activeSection: number;
}

function ParticleField({ count = 2500, scrollProgress }: { count?: number; scrollProgress: number }) {
  const mesh = useRef<THREE.Points>(null!);
  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 25 + 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      sizes[i] = Math.random() * 0.06 + 0.01;
      const colorChoice = Math.random();
      if (colorChoice < 0.4) {
        colors[i3] = 0; colors[i3 + 1] = 0.94; colors[i3 + 2] = 1;
      } else if (colorChoice < 0.7) {
        colors[i3] = 1; colors[i3 + 1] = 0; colors[i3 + 2] = 0.9;
      } else {
        colors[i3] = 0.55; colors[i3 + 1] = 0.36; colors[i3 + 2] = 0.96;
      }
    }
    return { positions, colors, sizes };
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.015 + scrollProgress * Math.PI * 0.5;
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.008) * 0.15;
      // Subtle breathing effect
      const s = 1 + Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
      mesh.current.scale.set(s, s, s);
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function DataStream({ scrollProgress }: { scrollProgress: number }) {
  const ref = useRef<THREE.Points>(null!);
  const count = 500;
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
      velocities[i] = Math.random() * 0.05 + 0.02;
    }
    return { positions, velocities };
  }, []);

  useFrame(() => {
    if (ref.current) {
      const pos = ref.current.geometry.attributes.position;
      for (let i = 0; i < count; i++) {
        const y = pos.getY(i) - velocities[i] * (1 + scrollProgress * 2);
        pos.setY(i, y < -15 ? 15 : y);
      }
      pos.needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#00f0ff"
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function CentralOrb({ scrollProgress, activeSection }: { scrollProgress: number; activeSection: number }) {
  const groupRef = useRef<THREE.Group>(null!);
  const orbRef = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const ring3Ref = useRef<THREE.Mesh>(null!);
  const { pointer } = useThree();

  const getColor = (section: number) => {
    const colors = ['#00f0ff', '#ff00e5', '#8b5cf6', '#39ff14', '#ff6b00', '#00f0ff'];
    return colors[section % colors.length];
  };

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      // Follow mouse slightly
      const targetX = pointer.x * 0.5;
      const targetY = pointer.y * 0.3 - scrollProgress * 4;
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.03;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.03;
      groupRef.current.rotation.y = t * 0.2;
    }
    if (orbRef.current) {
      const scale = 1 + Math.sin(t * 0.5) * 0.08;
      orbRef.current.scale.set(scale, scale, scale);
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.5;
      ring1Ref.current.rotation.z = t * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = t * 0.4;
      ring2Ref.current.rotation.x = t * -0.15;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = t * -0.3;
      ring3Ref.current.rotation.y = t * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
        <Icosahedron ref={orbRef} args={[1.5, 2]}>
          <MeshDistortMaterial
            color={getColor(activeSection)}
            emissive={getColor(activeSection)}
            emissiveIntensity={0.5}
            roughness={0.05}
            metalness={0.95}
            distort={0.25 + scrollProgress * 0.3}
            speed={3}
            transparent
            opacity={0.8}
          />
        </Icosahedron>
      </Float>

      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color={getColor(activeSection)}
          transparent
          opacity={0.05}
        />
      </mesh>

      {/* Orbiting rings */}
      <Ring ref={ring1Ref} args={[2.0, 2.12, 64]} rotation={[Math.PI / 3, 0, 0]}>
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.25} side={THREE.DoubleSide} />
      </Ring>
      <Ring ref={ring2Ref} args={[2.5, 2.58, 64]} rotation={[Math.PI / 2, Math.PI / 4, 0]}>
        <meshBasicMaterial color="#ff00e5" transparent opacity={0.15} side={THREE.DoubleSide} />
      </Ring>
      <Ring ref={ring3Ref} args={[3.0, 3.06, 64]} rotation={[Math.PI / 6, Math.PI / 3, Math.PI / 5]}>
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.1} side={THREE.DoubleSide} />
      </Ring>

      {/* Orbiting small spheres */}
      <OrbitingSphere radius={2.8} speed={0.6} color="#00f0ff" size={0.06} offset={0} />
      <OrbitingSphere radius={3.2} speed={-0.4} color="#ff00e5" size={0.05} offset={Math.PI / 2} />
      <OrbitingSphere radius={2.4} speed={0.8} color="#8b5cf6" size={0.04} offset={Math.PI} />
    </group>
  );
}

function OrbitingSphere({ radius, speed, color, size, offset }: { radius: number; speed: number; color: string; size: number; offset: number }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.y = Math.sin(t * 0.7) * radius * 0.5;
      ref.current.position.z = Math.sin(t) * radius;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </mesh>
  );
}

function FloatingGeometries({ scrollProgress }: { scrollProgress: number }) {
  const group1 = useRef<THREE.Group>(null!);
  const group2 = useRef<THREE.Group>(null!);
  const group3 = useRef<THREE.Group>(null!);
  const group4 = useRef<THREE.Group>(null!);
  const { pointer } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const mx = pointer.x;
    const my = pointer.y;
    
    if (group1.current) {
      group1.current.position.x = Math.sin(t * 0.3) * 5 - 3 + mx * 0.5;
      group1.current.position.y = Math.cos(t * 0.4) * 2 + scrollProgress * -8 + my * 0.3;
      group1.current.position.z = Math.sin(t * 0.2) * 2 - 4;
      group1.current.rotation.x = t * 0.4;
      group1.current.rotation.z = t * 0.2;
    }
    if (group2.current) {
      group2.current.position.x = Math.cos(t * 0.25) * 5 + 3 + mx * -0.3;
      group2.current.position.y = Math.sin(t * 0.35) * 2 + 1 + scrollProgress * -6 + my * 0.2;
      group2.current.position.z = Math.cos(t * 0.15) * 2 - 3;
      group2.current.rotation.y = t * 0.3;
      group2.current.rotation.z = t * -0.15;
    }
    if (group3.current) {
      group3.current.position.x = Math.sin(t * 0.2 + 2) * 4 + mx * 0.4;
      group3.current.position.y = Math.cos(t * 0.3 + 1) * 3 - 2 + scrollProgress * -10 + my * -0.2;
      group3.current.position.z = Math.cos(t * 0.1) * 3 - 5;
      group3.current.rotation.x = t * -0.2;
      group3.current.rotation.y = t * 0.25;
    }
    if (group4.current) {
      group4.current.position.x = Math.cos(t * 0.15 + 3) * 6 + mx * -0.2;
      group4.current.position.y = Math.sin(t * 0.2 + 2) * 3 + 3 + scrollProgress * -12 + my * 0.15;
      group4.current.position.z = Math.sin(t * 0.12) * 2 - 6;
      group4.current.rotation.x = t * 0.15;
      group4.current.rotation.z = t * -0.1;
    }
  });

  return (
    <>
      <group ref={group1}>
        <Torus args={[0.6, 0.15, 16, 32]}>
          <MeshWobbleMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={0.4}
            factor={0.3}
            speed={2}
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.6}
          />
        </Torus>
      </group>

      <group ref={group2}>
        <Octahedron args={[0.7]}>
          <MeshDistortMaterial
            color="#ff00e5"
            emissive="#ff00e5"
            emissiveIntensity={0.4}
            distort={0.2}
            speed={3}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.6}
          />
        </Octahedron>
      </group>

      <group ref={group3}>
        <Icosahedron args={[0.5, 0]}>
          <MeshDistortMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.4}
            distort={0.4}
            speed={2}
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.5}
          />
        </Icosahedron>
      </group>

      <group ref={group4}>
        <Torus args={[0.5, 0.12, 12, 24]}>
          <MeshWobbleMaterial
            color="#39ff14"
            emissive="#39ff14"
            emissiveIntensity={0.3}
            factor={0.5}
            speed={1.5}
            metalness={0.7}
            roughness={0.3}
            transparent
            opacity={0.5}
          />
        </Torus>
      </group>
    </>
  );
}

function WireframeSphere({ scrollProgress }: { scrollProgress: number }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
      ref.current.rotation.x = state.clock.elapsedTime * 0.02;
      const scale = 8 + scrollProgress * 5;
      ref.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1, 2]} />
      <meshBasicMaterial
        color="#00f0ff"
        wireframe
        transparent
        opacity={0.03}
      />
    </mesh>
  );
}

function GridFloor({ scrollProgress }: { scrollProgress: number }) {
  const ref = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = -5 + scrollProgress * -3;
      ref.current.rotation.x = -Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
    }
  });

  return (
    <group ref={ref}>
      <gridHelper args={[60, 60, '#00f0ff', '#00f0ff']} />
      <mesh rotation={[0, 0, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.01} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function FloatingText3D({ scrollProgress }: { scrollProgress: number }) {
  const ref = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = 4 + scrollProgress * -15;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
      const targetScale = hovered ? 1.1 : 1;
      ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
    }
  });

  return (
    <group ref={ref} position={[0, 4, -3]}>
      <Text
        fontSize={0.3}
        color="#00f0ff"
        anchorX="center"
        anchorY="middle"
        font={undefined}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        material-transparent
        material-opacity={hovered ? 0.6 : 0.15}
      >
        {'< REDEFINING TOMORROW />'}
      </Text>
    </group>
  );
}

export function SceneContent({ scrollProgress, activeSection }: SceneContentProps) {
  return (
    <>
      <ParticleField scrollProgress={scrollProgress} />
      <DataStream scrollProgress={scrollProgress} />
      <CentralOrb scrollProgress={scrollProgress} activeSection={activeSection} />
      <FloatingGeometries scrollProgress={scrollProgress} />
      <WireframeSphere scrollProgress={scrollProgress} />
      <GridFloor scrollProgress={scrollProgress} />
      <FloatingText3D scrollProgress={scrollProgress} />
      <fog attach="fog" args={['#030014', 8, 35]} />
    </>
  );
}
