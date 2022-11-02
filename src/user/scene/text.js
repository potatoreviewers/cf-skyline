// import React from "react";

import myFont from "./Ubuntu_Bold.json";
import { extend } from "@react-three/fiber";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";



export default function Text({ text, size, x, y, z,
  rotationX = 0, rotationY = 0, rotationZ = 0,
}) {
  const font = new FontLoader().parse(myFont);
  const shift = size * text.length / 2;

  extend({ TextGeometry })

  return (
    <mesh
      position={[x - shift, y, z]}
      rotation-x={rotationX}
      rotation-y={rotationY}
      rotation-z={rotationZ}
    >
      <textGeometry args={[text, { font, size: size, height: size / 4 }]} />
      <meshStandardMaterial color={"cyan"} />
      <ambientLight />
    </mesh>
  )
}