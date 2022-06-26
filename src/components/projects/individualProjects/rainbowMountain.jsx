import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

function rainbowHSL(num) {
  let val = 400 * num;

  return "hsl(" + val + ",100%, 50%)";
}

function Mountain(props) {

return props.dims.width > 20 && <MountainWaitingOnDims dims={props.dims}/>

}

function MountainWaitingOnDims(props) {
  const pad = 30;

  const wd = Math.min(props.dims.width * 0.8, 850) 
  const ht = props.dims.width < props.dims.height ? wd :(wd * 5) / 8;

// here: now we're in potentially mobile world and in useWindow dims as props world, lets handle that.



  const xSize = wd - pad * 2;
  const ySize = ht - pad * 2;
  const lNum = 12;
  const [svgOffset, setSvgOffset] = useState(0);
  const svgContainer = useRef(null);
  const [technical, setTechnical] = useState({
    steps: 25,
    strokeWidth: "5",
    opacity: 0.5
  });
  const [showHandles, setShowHandles] = useState(true);

  useEffect(() => {
    if (svgContainer.current) {
      let inf = svgContainer.current.getBoundingClientRect();

      setSvgOffset(inf);
    }
  }, [svgContainer, wd]);

  let randArr = [...Array(lNum)].map((el, i) => {
    return xSize * Math.random();
  });

  randArr.sort((a, b) => a - b);

  const firstPoints = [...Array(lNum)].map((el, i) => {
    return {
      tX: pad + (xSize * i) / (lNum - 1),
      tY: Math.max(
        pad,
        Math.min(
          pad +
            (Math.random() * 100 - 50) +
            ySize * ((i - 5.5) / lNum) * ((i - 5.5) / lNum) * 5,
          pad + ySize
        )
      ),
      bX: pad + randArr[i],
      //(xSize * i) / (lNum - 1),
      bY: pad + ySize
    };
  });

  const [points, setPoints] = useState(firstPoints);

  function handlePointDrag(index, x, y) {
    let newPoints = [...points];
    newPoints[index].tX = Math.min(
      Math.max(0, x - svgOffset.x),
      xSize + pad + pad
    );
    newPoints[index].tY = Math.min(Math.max(0, y - svgOffset.y), ySize + pad);
    setPoints(newPoints);
  }

  function stepSlideHandler(val) {
    let tmpDat = { ...technical };
    tmpDat.steps = val;
    setTechnical(tmpDat);
  }

  function strokeSlideHandler(val) {
    let tmpDat = { ...technical };
    tmpDat.strokeWidth = val / 10;
    setTechnical(tmpDat);
  }

  function opacitySlideHandler(val) {
    let tmpDat = { ...technical };
    tmpDat.opacity = val;
    setTechnical(tmpDat);
  }

  const animPoints = points.map((el, i) => {
    return (
      <g
        key={"animatingPoint_" + i}
        style={{
          transform: "translate(" + el.tX + "px, " + el.tY + "px)"
        }}
      >
        <motion.circle
          cx={0}
          cy={0}
          initial={{
            rotate: 0,
            fill: "rgb(255,255,255)",
            fillOpacity: 0.5,
            r: 10,
            stroke: rainbowHSL(i / lNum),
            strokeDasharray: "5",
            opacity: 0.5
          }}
          key={"anim_circle" + i}
          fill={"rgba(0,0,0,0)"}
          style={{
            strokeWidth: "2px"
          }}
          animate={{
            opacity: 0.7,
            rotate: 360,
            transition: {
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.3,
              duration: 9.5
            }
          }}
        />
      </g>
    );
  });

  const draggableCircles = points.map((el, i) => {
    return (
      <motion.circle
        drag
        dragConstraints={svgContainer}
        initial={{
          cx: el.tX,
          cy: el.tY,
          r: 12,
          stroke: "rgba(50,50,50,0.5)"
        }}
        onDrag={(event, info) => handlePointDrag(i, info.point.x, info.point.y)}
        key={"circle" + i}
        fill={"rgba(0,0,0,0)"}
        style={{
          strokeWidth: "0px",
          cursor: "grab"
        }}
        whileHover={{
          fill: "rgba(255,255,255,0.0)",
          stroke: "rgba(255,255,255,0.9)",
          strokeWidth: "3px"
        }}
      />
    );
  });

  const masterLines = points.map((el, i) => {
    let thisPathData = "M" + el.tX + "," + el.tY + "L" + el.bX + "," + el.bY;
    return (
      <g key={"primaryLine_" + i}>
        <path
          key={"line_" + i}
          d={thisPathData}
          style={{
            stroke: "rgba(0,0,0,0)",
            //rainbowHSL(i / lNum),
            strokeWidth: "5px",
            opacity: 1
          }}
        />
      </g>
    );
  });

  const steps = technical.steps; //number of gaps in between the lines between each master line
  let lineGroups = [];

  for (let i = 0; i < 11; i++) {
    let tx1 = points[i].tX;
    let tx2 = points[i + 1].tX;
    let ty1 = points[i].tY;
    let ty2 = points[i + 1].tY;

    let dtX = tx2 - tx1;
    let dtY = ty2 - ty1;

    let xtStep = dtX / steps;
    let ytStep = dtY / steps;

    let bx1 = points[i].bX;
    let bx2 = points[i + 1].bX;
    let by1 = points[i].bY;
    let by2 = points[i + 1].bY;

    let dbX = bx2 - bx1;
    let dbY = by2 - by1;

    let xbStep = dbX / steps;
    let ybStep = dbY / steps;

    for (let j = 0; j < steps; j++) {
      let ntx = tx1 + xtStep * j + xtStep / 2;
      let nty = ty1 + ytStep * j + ytStep / 2;

      let nbx = bx1 + xbStep * j + xbStep / 2;
      let nby = by1 + ybStep * j + ybStep / 2;

      lineGroups.push({
        x1: ntx,
        y1: nty,
        x2: nbx,
        y2: nby,
        groupIndex: j
      });

      //also do the second array of points in here and push them all to an
      //array of objects, just like  "points" is.
    }
  }
  /**
   * the below bit contains a total maths fudge.
   * Something i was doin didn't quite work in the layout
   * but I figured there was a cheap and nasty *0.915 move that
   * would negate the really obvious thing I had missed,
   * whatever it is!
   */

  const slaveLines = lineGroups.map((el, i) => {
    let slavePathData = "M" + el.x1 + "," + el.y1 + "L" + el.x2 + "," + el.y2;

    return (
      <motion.path
        key={"line_" + i}
        initial={{
          d: slavePathData,
          stroke: rainbowHSL((i * 0.915) / (steps * (lNum - 1)))
        }}
        animate={{
          d: slavePathData,
          stroke: rainbowHSL((i * 0.915) / (steps * (lNum - 1))),
          strokeWidth: technical.strokeWidth + "px",
          opacity: parseFloat(technical.opacity, 10)
        }}
        style={{
          strokeLinecap: "round"
        }}
      />
    );
  });

  const blockOut = (
    <rect
      height={pad}
      width={wd * 1.2}
      x={0}
      y={pad + ySize}
      fill="rgb(5,5,0)"
    />
  );

  return (
    <div
      style={{
        border: "1px solid white",
        borderRadius: "5px",
        backgroundColor: "rgb(5,5,0)",
        marginTop: "20px"
      }}
    >
      <div>
        <svg ref={svgContainer} height={ht} width={wd}>
          {slaveLines}

          {masterLines}
          {blockOut}
          {showHandles && animPoints}

          {showHandles && draggableCircles}
        </svg>
      </div>
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingTop: "10px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
          backgroundColor: "rgb(5,5,0)",
          borderTop: "1px solid white",
          textAlign: "left",
          fontSize: "8px"
        }}
      >
        <div
          style={{
            width: "100px"
          }}
        >
          <input
            type="range"
            style={{
                width: "95%"
            }}
            onChange={(e) => {
              stepSlideHandler(e.target.value);
            }}
            min={2}
            max={100}
            value={technical.steps}
          ></input>
          <p style={{ color: "white" }}>resolution (2-100)</p>
          <p style={{ color: "white" }}>
            {"currently: " + technical.steps + " lines per section"}
          </p>
        </div>
        <div style={{width: "100px" }}>
          <input
            type="range"
            onChange={(e) => {
              strokeSlideHandler(e.target.value);
            }}
            style={{
                width: "95%"
            }}
            min={1}
            max={500}
            value={technical.strokeWidth * 10}
          ></input>
          <p style={{ color: "white" }}>line width (0.1px - 50px)</p>
          <p style={{ color: "white" }}>
            {"currently: " + technical.strokeWidth + "px"}
          </p>
        </div>
        <div style={{ width: "100px" }}>
          <input
            type="range"
            style={{
                width: "95%"
            }}
            onChange={(e) => {
              opacitySlideHandler(e.target.value);
            }}
            min={0}
            max={1}
            step={0.05}
            value={technical.opacity}
          ></input>
          <p style={{ color: "white" }}>opacity</p>
          <p style={{ color: "white" }}>
            {"currently: " +
              parseFloat(technical.opacity, 10).toFixed(2) * 100 +
              "%"}
          </p>
        </div>
        <motion.button
          style={{
            color: "white",
            width: "70px",
            height: "40px",
            marginLeft: "30px",
            marginTop: "0px",
            marginBottom: "20px",
            backgroundColor: "rgb(0,0,0)",
            border: "3px solid orange",
            borderRadius: "5px",
            fontSize: "8px",
            fontFamily: "inherit"
          }}
          whileHover={{
            backgroundColor: "rgb(30,30,30)"
          }}
          onClick={() => setShowHandles(!showHandles)}
        >
          {showHandles ? "hide handles" : "show handles"}
        </motion.button>
      </div>
    </div>
  );
}

export default Mountain;
