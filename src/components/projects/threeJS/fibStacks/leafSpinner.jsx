import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./fibStackStyles.css";
import * as THREE from "three";
import { useRef } from "react";
import * as d3 from "d3";

const RotatingLeafShape = (props) => {
  const shape = new THREE.Shape();

  shape.moveTo(0, 0);
  shape.quadraticCurveTo(5, 7, 0, 20);
  shape.quadraticCurveTo(-5, 7, 0, 0);

  const extrudeSettings = {
    steps: 1,
    depth: props.thickNess,
    bevelEnabled: false
  };

  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.z += props.reverse ? props.rate : -props.rate;
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
        color={d3.interpolateRainbow(props.colVal)}
        metalness={0.1}
        roughness={0.2}
      />
    </mesh>
  );
};

//const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);

const LeafSpinner = () => {
  const starThickness = 0.5;
  const starNumber = 50;
  const zOffset = (starNumber * starThickness) / 2;

  const stars = [...Array(starNumber)].map((el, i) => {
    return (
      <RotatingLeafShape
        key={"rotatingStar_" + i}
        rate={((i + 1) * 0.00618) / 12}
        zPos={i * starThickness - zOffset}
        thickNess={starThickness}
        colVal={(i + 1) / starNumber}
        reverse={Math.floor(i / 2) === i / 2}
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
          position: [0, 0, 35]
        }}
      >
        {stars} <OrbitControls />
        <directionalLight
          intensity={1.0}
          color="white"
          position={[-10, 130, 130]}
        />
      </Canvas>
    
      <div style={{
          marginBottom: "20px",
          width: "100%",
          display: "flex",
          justifyContent: "center"
       
      }}>
          <div>
      <p
        style={{
            width: "280px",
          marginTop: "20px",
          padding: "0px 20px 0px 20px"
        }}
      >
        two sets of leaf shapes rotating in opposite directions... 
      </p>
      <p
       style={{
        width: "280px",
      marginTop: "20px",
      padding: "0px 20px 0px 20px"
    }}
      >
         the rate of rotation is staggered by the golden ratio {" "}
      </p>
      </div>
   
      </div>
    </div>
  );
};

export default LeafSpinner;
