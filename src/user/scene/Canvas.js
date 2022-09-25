// import { useRef, useEffect, Suspense } from 'react';
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Stars from "./stars";
import Model from "./model";

const max_distance = 500;

const light_distance = 100;

function CanvasComponent(props) {

  return (
    <>
      <Canvas
        shadowmap
        colorManagement
        camera={{ fov: 75, position: [90, 90, 90] }}
      >
        <OrbitControls
          minDistance={50}
          maxDistance={max_distance / 2}
          // autoRotate={true}
          enablePan={false}
          minPolarAngle={Math.PI / 3.2}
          maxPolarAngle={Math.PI / 2.2}
        />
        <axesHelper args={[max_distance]} />

        <pointLight position={[light_distance, light_distance, light_distance]} intensity={0.2} color={"rgb(150, 181, 255)"}/>
        <pointLight position={[light_distance, light_distance, -light_distance]} intensity={0.2} color={"rgb(150, 253, 255)"}/>
        <pointLight position={[-30, 100, 40]} intensity={0.15} color={"white"}/>

        <Model url={props.url} />

        <Stars />
      </Canvas>
    </>
  );
}

export default CanvasComponent;
