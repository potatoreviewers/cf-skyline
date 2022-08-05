// import { useRef, useEffect, Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const Model = () => {
    return (
        <mesh position={[0, 0, 0]}>
            <torusKnotGeometry attach="geometry" args={[100, 40, 16, 16]} />
            <meshNormalMaterial attach="material" />
        </mesh>
    );
}

function CanvasComponent() {
    var canvas = <Canvas></Canvas>;
    console.log(canvas);

    return (
      <Canvas background="black">
        <color attach={'background'} args={['rgb(0,3,115)']} />
        <ambientLight />
        <directionalLight color="white" position={[100, 100, 5]} />
        <Model />
        <OrbitControls minDistance={500} maxDistance={200} />
      </Canvas>
    )
}

export default CanvasComponent;
