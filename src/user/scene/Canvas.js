// import { useRef, useEffect, Suspense } from 'react';
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Stars from "./stars";
import Model from "./model";

const max_distance = 500;

export const base_position = [-60, 4, -6.5]

function CanvasComponent(props) {

  return (
    <>
      <Canvas
        camera={{ fov: 75, position: [90, 90, 90] }}
      >
        <OrbitControls
          minDistance={50}
          maxDistance={max_distance / 2}
          autoRotate={true}
          // autoRotateSpeed={1}
          enablePan={false}
          minPolarAngle={Math.PI / 3.2}
          maxPolarAngle={Math.PI / 2.2}
        />


        <mesh position={base_position}>
          <Model data={props.data} username={props.username} year={props.year} />
          <meshBasicMaterial attach="material" color="white" />
        </mesh>

        <Stars />
      </Canvas>
    </>
  );
}

export default CanvasComponent;
