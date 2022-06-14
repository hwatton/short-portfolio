import "./fibStackStyles.css";

import Scene from "./extrudedForm";
import LeafSpinner from "./leafSpinner";
import ShapeSpinner from "./shapeSpinner";
import TwoDee from "./twoDee";

export default function FibStacks(props) {



  return (
    <div
    style={{position: "relative"

    }}
  >

    {props.dims.width > 20 && 
    <>
     <ShapeSpinner dims={props.dims}/>
        <LeafSpinner dims={props.dims}/>
        <Scene dims={props.dims}/>
        <TwoDee dims={props.dims}/>
    </>
    }
     

</div>
  );
}

/**
 *     <div
      style={{
        position: "relative"
      }}
    >
      <div
        style={{
          position: "absolute",
          fontFamily: "courier",
          color: "grey",
          left: "50%",
          transform: "translate(-50%, 0%)"
        }}
      >
        <h2>Rotating Fibonacci 3D Stacks</h2>
      <ShapeSpinner />
        <LeafSpinner />
        <Scene />
        <TwoDee />
      
      </div>
    </div>
 */