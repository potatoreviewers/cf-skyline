// import { useRef, useEffect, Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { useRef } from 'react';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from 'three';

const max_distance = 500;

const Model = ({url}) => {

  const geometry = useLoader(STLLoader, url);
  const ref = useRef();

  return (
    <>
      <mesh ref={ref} 
        rotation={new THREE.Euler(- Math.PI / 2, 0, 0)}
        position={[0, 5, 0]}
      >
        <primitive object={geometry} attach="geometry" args={[0, 0, 0]} />
        {/* <boxGeometry attach="geometry" args={[20, 40, 20]}  position={[0, 40, 0]} /> */}
        <meshNormalMaterial attach="material" />
      </mesh>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />;
    </>
  )
}

const Star = ({position}) => {
  return (
    <>
      <mesh position={position}>
        <sphereGeometry attach="geometry" args={[0.35, 32, 32]} />
        <meshStandardMaterial attach="material" color="azure" />
        <pointLight position={position} intensity={200}/>
      </mesh>
    </>
  )
}

// generate array of random stars
const generateStars = () => {
  const stars = [];
  for (let i = 0; i < 100; i++) {
    stars.push(new THREE.Vector3(
      Math.random() * max_distance - max_distance / 2,
      Math.random() * max_distance - max_distance / 2,
      Math.random() * max_distance - max_distance / 2
    ));
  }
  return stars;
}

const Stars = () => {
  const stars = generateStars();
  return (
    <>
      {stars.map((star, index) => (
        <Star key={index} position={star} />
      ))}
    </>
  )
}

function CanvasComponent(props) {

    return (
    <>
      <Canvas camera={{fov: 75, position: [90, 90, 90]}}>
        <ambientLight />
        <Model url={props.url} />
        <OrbitControls minDistance={50} maxDistance={max_distance / 2} autoRotate={true} enablePan={false}  minPolarAngle={Math.PI / 3.2} maxPolarAngle={Math.PI / 2.2} autoRotateSpeed={3.0}/>

        <Stars />
      </Canvas>
    </>
    )
}

export default CanvasComponent;
