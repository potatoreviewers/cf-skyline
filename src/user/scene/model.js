// import { useRef, useEffect, Suspense } from 'react';
import { useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import * as THREE from "three";
import STL_URL from "./muratsat-2022.stl"

const Model = ({ url }) => {
  const geometry = useLoader(STLLoader, STL_URL);
  const ref = useRef();

  return (
    <>
      <mesh castShadow={true} ref={ref} rotation={new THREE.Euler(-Math.PI / 2, 0, 0)} position={[0, 0, 0]} geometry={geometry}>
        <meshStandardMaterial attach="material" color="azure" />
      </mesh>
    </>
  );
};

export default Model;