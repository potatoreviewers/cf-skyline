// import { useRef, useEffect, Suspense } from 'react';
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Stars from "./stars";
import Model from "./model";

const max_distance = 500;


function CanvasComponent(props) {

  return (
    <>
      <Canvas
        camera={{ fov: 75, position: [90, 90, 90] }}
      >
        <OrbitControls
          minDistance={50}
          maxDistance={max_distance / 2}
        // autoRotate={true}
        // enablePan={false}
        // minPolarAngle={Math.PI / 3.2}
        // maxPolarAngle={Math.PI / 2.2}
        />
        <axesHelper args={[max_distance]} />


        <Model data={props.data} username={props.username} year={props.year} />

        <Stars />
      </Canvas>
    </>
  );
}

export default CanvasComponent;
