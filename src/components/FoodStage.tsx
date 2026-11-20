import {
  Component,
  Suspense,
  useMemo,
  useRef,
  useState,
  type ErrorInfo,
  type ReactNode,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bounds, Center, Float, useGLTF } from "@react-three/drei";
import type { Group } from "three";

function FoodModel({ modelPath, reducedMotion }: { modelPath: string; reducedMotion: boolean }) {
  const { scene } = useGLTF(modelPath);
  const model = useMemo(() => scene.clone(true), [scene]);
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!group.current || reducedMotion) return;
    group.current.rotation.y += delta * 0.055;
    group.current.rotation.z = Math.sin(performance.now() * 0.00022) * 0.008;
  });

  return (
    <group ref={group}>
      <primitive object={model} />
    </group>
  );
}

function PlateStudy({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<Group>(null);
  useFrame((_, delta) => {
    if (!group.current || reducedMotion) return;
    group.current.rotation.y += delta * 0.035;
  });

  return (
    <group ref={group}>
      <mesh position={[0, -0.12, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.42, 1.5, 0.14, 96]} />
        <meshStandardMaterial color="#E8DDCB" roughness={0.32} metalness={0.04} />
      </mesh>
      <mesh position={[0, -0.035, 0]}>
        <cylinderGeometry args={[1.12, 1.12, 0.018, 96]} />
        <meshStandardMaterial color="#F3EBDD" roughness={0.26} metalness={0.025} />
      </mesh>
      <mesh position={[0, -0.018, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.31, 0.025, 12, 96]} />
        <meshStandardMaterial color="#C7B9A7" roughness={0.3} metalness={0.12} />
      </mesh>
      <mesh position={[0, -0.018, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.07, 0.012, 10, 96]} />
        <meshStandardMaterial color="#D2C3B0" roughness={0.34} metalness={0.08} />
      </mesh>
    </group>
  );
}

function Scene({ modelPath, reducedMotion }: { modelPath?: string | null; reducedMotion: boolean }) {
  return (
    <>
      <ambientLight intensity={0.82} />
      <directionalLight position={[4.5, 6, 5]} intensity={2.1} />
      <directionalLight position={[-4, 1.5, -3]} intensity={0.75} color="#B65D3B" />
      <pointLight position={[0, -2, 3]} intensity={0.35} color="#F3EBDD" />
      {modelPath ? (
        <Bounds fit clip margin={1.28}>
          <Center>
            <Float speed={1.15} rotationIntensity={reducedMotion ? 0 : 0.025} floatIntensity={reducedMotion ? 0 : 0.1}>
              <FoodModel modelPath={modelPath} reducedMotion={reducedMotion} />
            </Float>
          </Center>
        </Bounds>
      ) : (
        <Float speed={0.8} rotationIntensity={reducedMotion ? 0 : 0.025} floatIntensity={reducedMotion ? 0 : 0.04}>
          <PlateStudy reducedMotion={reducedMotion} />
        </Float>
      )}
    </>
  );
}

interface BoundaryProps { children: ReactNode; resetKey: string; }
interface BoundaryState { hasError: boolean; resetKey: string; }

class SceneErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { hasError: false, resetKey: this.props.resetKey };

  static getDerivedStateFromProps(props: BoundaryProps, state: BoundaryState): Partial<BoundaryState> | null {
    return props.resetKey !== state.resetKey
      ? { hasError: false, resetKey: props.resetKey }
      : null;
  }

  static getDerivedStateFromError(): Partial<BoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Crave4more 3D scene could not be rendered.", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="stage-fallback" role="img" aria-label="Three-dimensional food scene unavailable; visual placeholder shown">
          <span className="stage-fallback__plate" />
        </div>
      );
    }
    return this.props.children;
  }
}

export function FoodStage({ modelPath, posterPath }: { modelPath?: string | null; posterPath?: string | null }) {
  const [reducedMotion] = useState(() =>
    typeof window === "undefined"
      ? true
      : window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  return (
    <div className="food-stage">
      {posterPath && <img className="food-stage__poster" src={posterPath} alt="" decoding="async" />}
      <SceneErrorBoundary resetKey={modelPath ?? "procedural-plate"}>
        <Canvas
          className="food-stage__canvas"
          camera={{ position: [0, 4.5, 6.3], fov: 36 }}
          dpr={[1, 1.45]}
          gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
          frameloop={reducedMotion ? "demand" : "always"}
          aria-label="Decorative three-dimensional food scene"
        >
          <Suspense fallback={null}>
            <Scene modelPath={modelPath} reducedMotion={reducedMotion} />
          </Suspense>
        </Canvas>
      </SceneErrorBoundary>
    </div>
  );
}
