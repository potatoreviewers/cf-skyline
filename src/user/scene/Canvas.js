// import { useRef, useEffect, Suspense } from 'react';
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Stars from "./stars";
import Model from "./model";

const max_distance = 500;

export const base_position = [-62.4, 4.5, -7.2]

function CanvasComponent(props) {

  const degrees = Math.PI / 180;

  return (
    <>
      <Canvas
        camera={{ fov: 75, position: [90, 90, 90] }}
      >
        <OrbitControls
          minDistance={80}
          maxDistance={max_distance / 2}
          autoRotate={true}
          autoRotateSpeed={0.75}
          enablePan={false}
          minPolarAngle={30 * degrees}
          maxPolarAngle={90 * degrees}
        />


        < mesh position={base_position}>
          <Model data={props.data} username={props.username} year={props.year} />
        </mesh>

        <Stars />
      </Canvas>
    </>
  );
}

export default CanvasComponent;
