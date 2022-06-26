import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as d3 from "d3";

function RhoThetaDK(props) {

    //dependancy array removed from use effect. will it build on netlify?!
    // this can be updated to support gestures



  const wd = 500;
  const ht = 500;
  //mL is the hypotensuse, the max Length of the pen.
  const mL = Math.sqrt(((ht / 2) * ht) / 2 + ((wd / 2) * wd) / 2);

  //gross... just trying to get it to work!

  const [angle, setAngle] = useState(180);
  const [armLength, setArmLength] = useState(wd / 5);
  const [points, setPoints] = useState([]);
  const [showTip, setShowTip] = useState(true);

  const radialKey = useRef(null);
  const armKey = useRef(null);

  const angleRef = useRef(angle);
  const armLengthRef = useRef(armLength);
  const pointsRef = useRef(points);

  //adding keydown handler to the whole document

  useEffect(() => {
    document.addEventListener("keydown", newHandleKeyDown);
    document.addEventListener("keyup", newHandleKeyUp);

    return () => {
      document.removeEventListener("keydown", newHandleKeyDown);
      document.removeEventListener("keyup", newHandleKeyUp);
    };
  });

  //keyDown handlers:
  /**
   * so, write a a generic "move the position function:
   * movePos(radialValIncrease, armValIncrease)
   *
   * and just decide what the values are, that are required to be sent.
   */

  function movePosition(radialValInc, armValInc) {
    //no movement: *ref.current for both.

    const newAngle = angleRef.current + radialValInc;
    const newArmLength = Math.max(0, armLengthRef.current + armValInc);

    const newX =
      wd / 2 + newArmLength * Math.cos((2 * Math.PI * newAngle) / 360);
    const newY =
      ht / 2 + newArmLength * Math.sin((2 * Math.PI * newAngle) / 360);

    let newPoints = [...pointsRef.current];
    newPoints.push({ x: newX, y: newY });

    pointsRef.current = newPoints;
    angleRef.current = newAngle;
    armLengthRef.current = newArmLength;

    setPoints(newPoints);
    setAngle(newAngle);
    setArmLength(newArmLength);
  }

  function newHandleKeyUp(e) {
    // console.log(e);
    switch (e.key) {
      case "a" || "s":
        radialKey.current = false;

        break;
      case "k" || "l":
        armKey.current = false;

        break;

      default:
        break;
    }
  }

  function newHandleKeyDown(e) {
    let angleValTemp = 0;
    let armValTemp = 0;
    let step = 1;
    /* console.log({
      angKey: radialKey.current,
      logArmKey: armKey.current
    });
    */
    switch (e.key) {
      case "a":
        //turn on the radial key, give it a value,
        radialKey.current = "a";
        //reduce angle,
        angleValTemp = -step;
        //check if the armKey is pressed and get a value
        if (armKey.current) {
          armValTemp = armKey.current === "k" ? -step : step;
        } else {
          armValTemp = 0;
        }

        break;

      case "s":
        //turn on the radial key, give it a value,
        radialKey.current = "s";
        //reduce angle,
        angleValTemp = step;
        //check if the armKey is pressed and get a value
        if (armKey.current) {
          armValTemp = armKey.current === "k" ? -step : step;
        } else {
          armValTemp = 0;
        }

        break;

      case "k":
        //turn on the arm key, give it a value,
        armKey.current = "k";
        //reduce angle,
        armValTemp = -step;
        //check if the radialKey is pressed and get a value
        if (radialKey.current) {
          angleValTemp = radialKey.current === "a" ? -step : step;
        } else {
          angleValTemp = 0;
        }

        break;

      case "l":
        //turn on the arm key, give it a value,
        armKey.current = "l";
        //reduce angle,
        armValTemp = step;
        //check if the radialKey is pressed and get a value
        if (radialKey.current) {
          angleValTemp = radialKey.current === "a" ? -step : step;
        } else {
          angleValTemp = 0;
        }

        break;

      default:
        console.log("switch failed");
        break;
    } // switch ends

    // call movePosition with teh temp Values

    movePosition(angleValTemp, armValTemp);
  }


  //helper line function. it's basically my favourite thing in d3.
  const lineFunc = d3
    .line()
    .x((d) => d.x)
    .y((d) => d.y);

  const drawingPoint = (
    <circle
      cx={wd / 2 + armLength * Math.cos((2 * Math.PI * angle) / 360)}
      cy={ht / 2 + armLength * Math.sin((2 * Math.PI * angle) / 360)}
      r={3}
      fill={"none"}
      style={{
        stroke: "white",
        strokeWidth: "0.5px",
        fill: "black"
      }}
    />
  );

  const lineThing = (
    <g
      style={{
        transform:
          "translate(" +
          (wd / 2 + armLength * Math.cos((2 * Math.PI * angle) / 360)) +
          "px, " +
          (ht / 2 + armLength * Math.sin((2 * Math.PI * angle) / 360)) +
          "px)"
      }}
    >
      <path
        d={"M0,0,L0," + mL}
        style={{
          stroke: "purple",
          strokeWidth: "5px",
          transform: "rotate(" + (angle - 270) + "deg)"
        }}
      />
    </g>
  );

  const tinyWeeCastellations = [...Array(12)].map((el, i) => {
    let nx = wd / 2 + 7 * Math.cos((2 * Math.PI * i) / 12);
    let ny = ht / 2 + 7 * Math.sin((2 * Math.PI * i) / 12);
    let pathString = "M" + wd / 2 + "," + ht / 2 + "L" + nx + "," + ny;

    return (
      <path
        key={"castle_" + i}
        d={pathString}
        style={{
          stroke: "grey",
          strokeWidth: "2px"
        }}
      />
    );
  });

  return props.dims.width > 20 && (
      
    <div style={{ fontFamily: "courier", position: "relative"}}>
        {props.dims.width < 500 && (

    <div style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: props.dims.width * 0.9,
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.95)",
        color: "white"
    }}>
        <div style={{width: "80%", marginLeft: "10%", marginTop: "40%"}}>
<p >Looks like you're on a mobile.</p>
<p >currently this machine requires keyboard input, but I'm adding in some more functionality soon and hoping to incorporate some gestures (it'll probably work better that way too....)</p>
   </div>
    </div>
    )}
      <svg
        height={ht}
        width={wd}
        style={{
          backgroundColor: "black"
        }}
      >
        <path
          d={lineFunc(points)}
          style={{
            stroke: "white",

            fill: "none"
          }}
        />
        {lineThing}
        {drawingPoint}

        <text
          x={5}
          y={ht - 5}
          fill={"white"}
          style={{
            fontFamily: "courier",
            fontSize: "10px"
          }}
        >
          use keys: A + S (rotation), K + L (radius)
        </text>
        {tinyWeeCastellations}
        <circle
          cx={wd / 2}
          cy={ht / 2}
          r={5}
          style={{ stroke: "white", strokeWidth: "0.5px" }}
        />
        {showTip && (
          <g
            onClick={() => setShowTip(false)}
            style={{ transform: "translate(0px, -60px)", cursor: "pointer" }}
          >
            <rect
              x={wd / 6}
              y={ht / 2 - 20}
              height={160}
              width={(wd * 4) / 6}
              opacity={1}
              fill={"rgb(255,255,255)"}
              animate={{
                opacity: 0,
                transition: {
                  duration: 50,
                  delay: 3
                }
              }}
            />
            <text
              x={wd / 2}
              y={ht / 2}
              fill={"black"}
              style={{
                fontFamily: "courier",
                fontSize: "14px",
                textAnchor: "middle"
              }}
            >
              This machine works with
            </text>
            <text
              x={wd / 2}
              y={20 + ht / 2}
              fill={"black"}
              style={{
                fontFamily: "courier",
                fontSize: "14px",
                textAnchor: "middle"
              }}
            >
              keyboard controls.
            </text>
            <text
              x={wd / 2}
              y={40 + ht / 2}
              fill={"black"}
              style={{
                fontFamily: "courier",
                fontSize: "14px",
                textAnchor: "middle"
              }}
            >
              Use A/S to control angle...
            </text>
            <text
              x={wd / 2}
              y={60 + ht / 2}
              fill={"black"}
              style={{
                fontFamily: "courier",
                fontSize: "14px",
                textAnchor: "middle"
              }}
            >
              Use K/L to control radius...
            </text>
            <text
              x={wd / 2}
              y={110 + ht / 2}
              fill={"black"}
              style={{
                fontFamily: "courier",
                fontSize: "11px",
                textAnchor: "middle"
              }}
            >
              ** If it becomes unresponsive, **
            </text>
            <text
              x={wd / 2}
              y={125 + ht / 2}
              fill={"black"}
              style={{
                fontFamily: "courier",
                fontSize: "11px",
                textAnchor: "middle"
              }}
            >
              ** please refresh your browser! **
            </text>
            <text
              x={wd / 2}
              y={80 + ht / 2}
              fill={"red"}
              style={{
                fontFamily: "courier",
                fontSize: "14px",
                textAnchor: "middle"
              }}
            >
              Click this message to begin...
            </text>
          </g>
        )}
      </svg>

      <div>
        <motion.button
          style={{
            backgroundColor: "rgb(0, 155, 0)",
            border: "2px solid rgb(20,205,0)",
            marginTop: "20px",
            width: wd * 0.3,
            height: "20px",
            color: "rgb(240, 240, 205)"
          }}
          whileHover={{
            backgroundColor: "rgb(20,205,0)",
            color: "rgb(255, 255, 255)"
          }}
          onClick={() => {
            pointsRef.current = [];
            setPoints([]);
          }}
        >
          clear line
        </motion.button>
      </div>
      <div
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "20px"
        }}
      >
        <div style={{ width: "150px"}}>
          <p >
            Angle: <span>{angle - 270}</span>°{" "}
          </p>
    </div>  <div style={{ width: "150px"}}>
          <p >
            Arm Length: <span>{armLength}</span>px
          </p>
        </div>

        </div>
<div style={{
    width: "100%",
    display: "flex",
    justifyContent: "center"
}}>
      <div style={{
          position: "relative",
          width: "40%"
        
        }}>
            <h3>What's going on here?</h3>
<p>Ok, so firstly, I know it doesn't work flawlessly. Hanling the keydowns ain't perfect.</p>
<p>I made this, as I have plans on making a real world machine. So I wanted to see how it feels to control it. And yeah, you're not going to be able to draw anything useful with it!</p>
<p>But, that's why I thought it would be worth watching as it blasts round some unnatural shapes.</p>
<p>So, that's on it's way. I'm working on it!</p>

</div>
      </div>
    </div>
  )
  
}

export default RhoThetaDK;
