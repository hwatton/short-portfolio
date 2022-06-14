import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./fibStackStyles.css";
import * as THREE from "three";
import { useRef } from "react";
import * as d3 from "d3";

const RotatingShape = (props) => {
  const shape = new THREE.Shape();

  shape.moveTo(0, 5);
  shape.quadraticCurveTo(15, 15, 0, 30);
  shape.quadraticCurveTo(-15, 15, 0, 5);

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
        opacity={0.2 + 0.8 * (1 - props.colVal)}
        color={d3.interpolateMagma(props.colVal)}
        metalness={0.1}
        roughness={0.2}
      />
    </mesh>
  );
};

//const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);

const ShapeSpinner = (props) => {
  const starThickness = 0.5;
  const starNumber = 41;
  const zOffset = (starNumber * starThickness) / 2;


  const stars = [...Array(starNumber)].map((el, i) => {
    return (
      <RotatingShape
        key={"rotatingStar_" + i}
        rate={((i + 1) * 0.00618) / 12}
        zPos={i * starThickness - zOffset}
        thickNess={starThickness}
        colVal={(i + 1) / starNumber}
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
          position: [0, 0, 30]
        }}
      >
        {stars} <OrbitControls />
        <directionalLight
          intensity={1.0}
          color="white"
          position={[-10, 130, 130]}
        />
      </Canvas>
      <p
        style={{
          fontFamily: "courier",
          fontSize: "12px",
          width: "70%",
          paddingLeft: "15%",
          margin: "10px 0px 10px 0px",
          color: "grey"
        }}
      >
        ** rotate the view with your mouse... **
      </p>
   

    </div>
  );
};

export default ShapeSpinner;
