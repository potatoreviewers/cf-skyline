import * as THREE from "three";
const max_distance = 500;

const Star = ({ position }) => {
  return (
    <>
      <mesh position={position}>
        <octahedronGeometry attach="geometry" args={[0.5, 0]} />
        <meshBasicMaterial attach="material" color="white" />
      </mesh>
    </>
  );
};

// generate array of random stars
const generateStars = () => {
  const stars = [];
  for (let i = 0; i < 100; i++) {
    stars.push(
      new THREE.Vector3(
        Math.random() * max_distance - max_distance / 2,
        Math.random() * max_distance - max_distance / 2,
        Math.random() * max_distance - max_distance / 2
      )
    );
  }
  return stars;
};

const Stars = () => {
  const stars = generateStars();
  return (
    <>
      {stars.map((star, index) => (
        <Star key={index} position={star} />
      ))}
    </>
  );
};

export default Stars;