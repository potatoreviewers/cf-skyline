// import { useRef, useEffect, Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { useRef } from 'react';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

const Model = () => {
  const url = 'http://localhost:8081';

  const geometry = useLoader(STLLoader, url);
  const ref = useRef();

  return (
    <>
      <mesh ref={ref}>
        <primitive object={geometry} attach="geometry" />
        <meshNormalMaterial attach="material" />
      </mesh>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />;
    </>
  )
}

function CanvasComponent() {

    return (
    <>
      <Canvas>
        <ambientLight />
        <directionalLight color="white" position={[100, 100, 5]} />
        <Model />
        <OrbitControls minDistance={500} maxDistance={200} />
      </Canvas>
    </>
    )
}

export default CanvasComponent;
