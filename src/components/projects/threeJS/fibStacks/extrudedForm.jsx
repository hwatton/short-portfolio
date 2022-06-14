import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./fibStackStyles.css";
import * as THREE from "three";
import { useRef } from "react";

const RotatingStarShape = (props) => {
  const shape = new THREE.Shape();
  const spikes = 5;
  const stNum = spikes * 2;
  const rad = 15;
  const coeffRad = 0.4;

  const xOne = rad * Math.cos(0);
  const yOne = rad * Math.sin(0);
  shape.moveTo(xOne, yOne);

  for (let i = 1; i < stNum; i++) {
    if (i / 2 === Math.floor(i / 2)) {
      let x = rad * Math.cos((2 * Math.PI * i) / stNum);
      let y = rad * Math.sin((2 * Math.PI * i) / stNum);

      shape.lineTo(x, y);
    } else {
      let x = rad * coeffRad * Math.cos((2 * Math.PI * i) / stNum);
      let y = rad * coeffRad * Math.sin((2 * Math.PI * i) / stNum);

      shape.lineTo(x, y);
    }
  }

  const extrudeSettings = {
    steps: 1,
    depth: props.thickNess,
    bevelEnabled: false
  };

  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.z += props.rate;
  });

  return (
    <mesh ref={mesh} position={[0, 0, props.zPos]}>
      <extrudeBufferGeometry
        attach="geometry"
        args={[shape, extrudeSettings]}
      />
      <meshStandardMaterial
        transparent={true}
        opacity={0.15}
        color="#0055ff"
        metalness={1}
        roughness={0.5}
      />
    </mesh>
  );
};

//const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);

const Scene = () => {
  const starThickness = 2;
  const starNumber = 40;
  const zOffset = (starNumber * starThickness) / 2;

  const stars = [...Array(starNumber)].map((el, i) => {
    return (
      <RotatingStarShape
        key={"rotatingStar_" + i}
        rate={((i + 1) * 0.00618) / 15}
        zPos={i * starThickness - zOffset}
        thickNess={starThickness}
      />
    );
  });

  return (
    <div
      style={{
        textAlign: "center"
      }}
    >
      <Canvas
        pixelRatio={window.devicePixelRatio}
        camera={{
          position: [0, 0, 55]
        }}
      >
        {stars} <OrbitControls />
        <directionalLight
          intensity={2.0}
          color="magenta"
          position={[-10, 130, 130]}
        />
      </Canvas>
<div style={{
  display: "flex", 
  justifyContent: "center",
  width: "100%"
  }}>
    <div>
      <p
        style={{
   width: "280px",
          marginTop: "20px",
       
        }}
      >
        view straight on to pick up on the old golden ratio spiral action
      </p>
      </div>
      </div>
    </div>
  );
};

export default Scene;
