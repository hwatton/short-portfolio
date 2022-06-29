import {  useRef, useState, useEffect } from "react";
import * as d3 from "d3";
import { motion } from "framer-motion";

//on csb, I have this working without framer. 
//but, framer's touch support is basically better than handling the synthetic events, especially for drawing I find.
//it. just. works. 

/**
 * 
also, features/problems....(a matter of perspective....
    I dropped a load of line stuff. doesn't need it visually.
    the colours constanly refresh due to the way that "pan" handles. This really could be dealt with....
    dop a colour into the points array, and store it all as an object
 */

export default function CrazyDrawing(props) {
  const ht = Math.min(props.dims.width *0.95, (props.dims.height*0.8 - 20));
  const wd = ht;
  const svgRef = useRef(null);

  const [points, setPoints] = useState([]);
  const [svgDims, setSvgDims] = useState({ x: 0, y: 0 });
  const [down, setDown] = useState(false);



  function addPoints(e) {
    let newX = e.clientX - svgDims.x;
    let newY = e.clientY - svgDims.y;
    let newPoints = [...points];
    newPoints.push({ x: newX, y: newY });
    setPoints(newPoints);
  }

  const colours = [
    "rgb(0,0,0)",

    "rgb(10,0,30)",
    "rgb(15,0,90)",
    "rgb(120,0,210)",
    "rgb(50,170,250)",
    "rgb(100,250,175)",
    "rgb(125,255,0)",
    "rgb(255,255,0)",
    "rgb(255,125,0)",
    "rgb(255,0,0)",
    "rgb(255,0,205)"
  ];

  const tickArray = [...Array(colours.length)].map((el, i) => {
    return 1 / i;
  });

  const colScale = d3.scaleLinear().range(colours).domain(tickArray);

  useEffect(() => {
    if (svgRef.current) {
      let dims = svgRef.current.getBoundingClientRect();
      setSvgDims(dims);
    }
  }, [svgRef, props]);


  const PerspectivePaths = (props) => {
    let filledPaths = [];

    const pLen = props.points.length;

    for (let j = 0; j < pLen - 1; j++) {
      filledPaths.push(
        <path
          key={"persPath_Filled" + j}
          d={
            "M" +
            props.points[j].x +
            "," +
            props.points[j].y +
            "L" +
            props.centre.x +
            "," +
            props.centre.y +
            "," +
            props.points[j + 1].x +
            "," +
            props.points[j + 1].y
          }
          style={{
            stroke: "black",
            fill: colScale(1 - j / pLen + 0.1 * (Math.random() * 2 - 1)),
            strokeWidth: "1.5px",
            fillOpacity: "100%",
            strokeOpacity: "20%",
            strokeLinecap: "round"
          }}
        />
      );
    }

    return filledPaths;
  };

  return props.dims.width > 20 && ( 
    <div style={{alignText: "center"}}>
    <motion.svg
      id={"svgContainer"}
      height={ht}
      width={wd}
      ref={svgRef}
      onPanStart={() => {
        setPoints([]);
        setDown(true);

      }}
      onPanEnd={() => {
        setDown(false);
      }}
      onPan={(e) => {
        if (down) {
          addPoints(e);
        }
      }}
      style={{
        border: "0.1px solid white",
        marginTop: "20px",
        backgroundColor: "black",
        touchAction: "none"
      }}
    >
      <PerspectivePaths points={points} centre={{ x: wd * 0.1, y: ht * 0.6 }} />

      <PerspectivePaths points={points} centre={{ x: wd * 0.9, y: ht * 0.6 }} />


      
    </motion.svg>
    <div style={{width: wd, marginTop: "20px", marginBottom: "50px"}}>
        <p>The starting point of this little drawing app was a prompt from <a href="https://genuary.art/" target="blank" rel="noopener noreferrer" style={{color: "red"}}> #genuary2022</a> - using perspective.</p>
        <p>I made this crude 2 point perspetive idea to start with, just playing with ideas.</p>
        <p>It clearly isn't perspective in any way! but i kinda like it. It's awkward to control, but gives interesteing results.</p>
        <p>Hey, it's a fun thing. </p>
    </div>

    </div>
  );
}
