import { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import ToolCog from "./toolCog";
import { motion } from "framer-motion";
import { curveCardinal, line } from "d3";
import { PBucket } from "./paintBucket";
import Reflections from "./reflections";

function Mandala() {
  const windowDims = useWindowDimensions();
  const ht = Math.max(320, Math.min(500, windowDims.width - 4));
  const wd = ht;
  const svgSize = wd - 20;

  /* states/refs : this is a bit horrible. */
  /* i have remade thsi using redux, which 
  looks neater,m buts it's overkill really for the lite
  version here.
  
  probabbly better if most of the below is one or two
  objects, that are keys with boolean values */

  const [SVGDims, setSVGDims] = useState({ x: 0, y: 0 });
  const [mouseNow, setMouseNow] = useState({ x: null, y: null });
  const [colour, setColour] = useState({ r: 233, g: 13, b: 13, a: 1 });
  const svgRef = useRef(null);
  const [showBPicker, setShowBPicker] = useState(false);
  const [showToolBox, setShowToolBox] = useState(false);
  const [points, setPoints] = useState([]);
  const [down, setDown] = useState(false);
  const [leftTools, setLeftTools] = useState(true);
  const [bckCol, setBckCol] = useState({ r: 255, g: 255, b: 255, a: 1 });
  const [shapeData, setShapeData] = useState({
    radius: "3",
    colour: { r: 233, g: 13, b: 13, a: 1 },
    shapeType: "path",
    transform: "45",
    path: ""
  });
  const [showPath, setShowPath] = useState(true);
  const [shapesArray, setShapesArray] = useState([]);

  //effects

  useEffect(() => {
    if (svgRef && windowDims.width) {
      let info = svgRef.current.getBoundingClientRect();
      setSVGDims(info);
    }
  }, [svgRef, windowDims]);

  useEffect(() => {
    if (windowDims.width > 820) {
      setLeftTools(true);
    } else {
      setLeftTools(false);
    }
  }, [windowDims]);

  //handlers

  const lineFunc = line()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(curveCardinal);

  function handleStartOver() {
    setShapesArray([]);
  }

  function handleMouseDown() {
    if (shapeData.shapeType === "path") {
      setDown(true);
      setPoints([]);
    }
  }

  function handleMouseUp() {
    const finalPath = lineFunc(points);
    let pC = [...shapesArray];
    pC.push({
      key: "shape_" + shapesArray.length,
      shapeType: shapeData.shapeType,
      path: finalPath,
      r: shapeData.radius,
      fill: "rgb(" + colour.r + "," + colour.g + "," + colour.b + ")",
      transform: shapeData.transform
    });
    setShapesArray(pC);

    setDown(false);
  }

  function updateSvgDimsOnMouseEnter() {
    let info = svgRef.current.getBoundingClientRect();
    setSVGDims(info);
  }

  function setMouseFunction(e) {
    let nX = e.clientX - SVGDims.x;
    let newObj = { x: nX, y: e.clientY - SVGDims.y };
    setMouseNow(newObj);
    if (down) {
      let cP = [...points];
      cP.push({
        x: nX,
        y: e.clientY - SVGDims.y
      });

      setPoints(cP);
    }
  }

  function addShape(e) {
    let nx = e.clientX - SVGDims.x;
    let ny = e.clientY - SVGDims.y;

    let pC = [...shapesArray];

    pC.push({
      key: "shape_" + shapesArray.length,
      shapeType: shapeData.shapeType,
      cx: nx,
      cy: ny,
      r: shapeData.radius,
      fill: "rgb(" + colour.r + "," + colour.g + "," + colour.b + ")",
      transform: shapeData.transform
    });
    setShapesArray(pC);
  }

  function ctrlAndZ() {
    let arr = [...shapesArray];

    arr.pop();

    setShapesArray(arr);
  }

  function handleRadiusSlider(v) {
    let tempObject = { ...shapeData };
    tempObject.radius = v;
    setShapeData(tempObject);
  }

  //drawing elements/maths

  const pXone = (svgSize / 2) * Math.cos((2 * Math.PI * -1.0) / 4);
  const pYone = (svgSize / 2) * Math.sin((2 * Math.PI * -1.0) / 4);

  const pXtwo = (svgSize / 2) * Math.cos((2 * Math.PI * -2.5) / 12);
  const pYtwo = (svgSize / 2) * Math.sin((2 * Math.PI * -2.5) / 12);

  const anglePaths = [...Array(24)].map((el, i) => {
    return (
      <clipPath key={"clipSegmentKey" + i} id={"clipSegment" + i}>
        <path
          d={
            "M0,0L" +
            pXone +
            "," +
            pYone +
            "A" +
            svgSize / 2 +
            "," +
            svgSize / 2 +
            " 0 0 1 " +
            pXtwo +
            "," +
            pYtwo +
            "L0,0"
          }
          style={{
            transform:
              "translate(" +
              (svgSize / 2 - 0) +
              "px, " +
              (svgSize / 2 - 0) +
              "px) rotate( " +
              i * 15 +
              "deg)"
          }}
        />
      </clipPath>
    );
  });

  const DynoPath = (props) => {
    return (
      <path
        clipPath={"url(#clipSegment0)"}
        d={lineFunc(props.points)}
        style={{
          stroke: props.show ? props.stroke : "none",
          strokeWidth: props.strokeWidth + "px",
          fill: "none",
          strokeLinecap: "round"
        }}
      />
    );
  };

  const FloatyShape = (props) => {
    const fillString =
      "rgb(" + props.fill.r + "," + props.fill.g + "," + props.fill.b + ")";

    let shp = (
      <g>
        <DynoPath
          stroke={fillString}
          points={points}
          strokeWidth={props.r * 2}
          show={down}
        />
        <circle
          clipPath={props.clip}
          style={{
            fillOpacity: props.opacity ? props.opacity : 0.8
          }}
          cx={props.x}
          cy={props.y}
          r={props.r}
          fill={fillString}
        />
      </g>
    );

    return shp;
  };

  const sliderText = (input) => {
    let name = "dimension";

    switch (input) {
      case "rect":
        name = "width";
        break;
      case "circle":
        name = "radius";
        break;
      case "path":
        name = "line width";
        break;
      default:
        name = "dimension";
    }
    return name;
  };
  const radiusSlider = (
    <div
      style={{
        marginTop: "10px",
        padding: "5px 20px 0px 20px",
        display: "flex",
        justifyContent: "center"
      }}
    >
      <p style={{ marginRight: 10 }}>{sliderText(shapeData.shapeType)}</p>
      <input
        style={{ width: "150px" }}
        onChange={(event) => handleRadiusSlider(event.target.value)}
        type="range"
        min="1"
        max="30"
        value={shapeData.radius}
      />
    </div>
  );

  const bckgrndPicker = (
    <motion.div
      style={{
        position: "absolute",
        left: 15,
        bottom: 55,
        width: "70px",
        height: "70px",
        backgroundColor: "rgb(255,255,255)",
        borderRadius: "10px",
        border: "1px solid magenta",
        cursor: "pointer"
      }}
      onClick={() =>
        showBPicker ? setShowBPicker(false) : setShowBPicker(true)
      }
      whileHover={{backgroundColor:"rgb(255,255,230)" }}
    >
      <PBucket />
    </motion.div>
  );

  const tabDivStyle =
    windowDims.width > 500
      ? {
          position: "absolute",
          top: "10px",
          width: "310px",
          left: "50%",
          transform: "translate(-50%, 0%)",
          backgroundColor: "rgb(255,255,255)",
          border: "1px solid magenta",
          borderRadius: "10px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center"
        }
      : {
          position: "absolute",
          top: "10%",
          width: "280px",
          left: "50%",
          transform: "translate(-50%, 0%)",
          paddingTop: 5,
          backgroundColor: "rgba(255,255,255,0.9)",
          border: "1px solid magenta",
          borderRadius: "10px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center"
        };

  const closedTabStyle = {
    position: "absolute",
    right: 15,
    bottom: 55,
    width: "70px",
    height: "70px",
    backgroundColor: "rgb(255,255,255)",
    borderRadius: "10px",
    border: "1px solid magenta",
    cursor: "pointer"
  };

  const btnStylo = {
    backgroundColor: "white",
    border: "1px solid rgb(205, 0, 255)",
    borderRadius: "5px",
    fontSize: "14px",
    margin: "2px"
  };

  const toolBoxLeft = (
    <div
      style={{
        width: "310px",
        height: ht - 20,
        marginRight: "10px",
        backgroundColor: "rgb(255,255,255)",
        border: "1px solid magenta",
        borderRadius: "10px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center"
      }}
    >
      <div style={{ marginTop: "30px" }}>
        <SketchPicker
          disableAlpha
          width={200}
          color={colour}
          onChangeComplete={(e) => setColour(e.rgb)}
        />
      </div>

      <div
        style={{
          width: "300px"
        }}
      >
        {radiusSlider}
      </div>

      <div
        style={{
          display: "flex",
          marginTop: "0px",
          marginBottom: "10px",
          backgroundColor: "white"
        }}
      >
        <p>Preview:</p>
        <svg
          height="70"
          width="70"
          style={{
            backgroundColor: "white",
            marginLeft: "20px",
            border: "0.5px solid black"
          }}
        >
          <FloatyShape
            shape={"path"}
            x={35}
            y={35}
            opacity={1}
            r={shapeData.radius}
            fill={colour}
            transform={shapeData.transform}
          />
        </svg>
      </div>
    </div>
  );

  return windowDims.width ? (
    <div
      style={{
        margin: "0px",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        fontFamily: "courier, sans-serif",
        color: "black"
      }}
    >
      {leftTools && toolBoxLeft}
      <div
        style={{
          position: "relative",
          display: "block",
          margin: "0px"
        }}
        id={"editorSvgHolder"}
      >
        <motion.svg
          ref={svgRef}
          height={svgSize}
          width={svgSize}
          style={{
            backgroundColor: "rgb(250,250,245)",
            border: "1px solid rgb(205,0,255)",
            margin: "0px",
            borderRadius: "10px",
            touchAction: "none"
          }}
          onClick={(e) => addShape(e)}
          onMouseEnter={() => updateSvgDimsOnMouseEnter()}
          onMouseMove={(e) => {
            setMouseFunction(e);
          }}
          onMouseDown={() => handleMouseDown()}
          onMouseUp={() => handleMouseUp()}
          onPanStart={() => handleMouseDown()}
          onPanEnd={() => handleMouseUp()}
          onPan={(e) => {
            setMouseFunction(e);
          }}
        >
          <g style={{ transform: "translate(0px ,0px)" }}>
            <defs>
              {anglePaths}
              <clipPath key={"clipCircle"} id={"clipCircle"}>
                <circle
                  key={"circle_0"}
                  cx={svgSize / 2 - 0}
                  cy={svgSize / 2 - 0}
                  r={svgSize / 2}
                  fill={"none"}
                />
              </clipPath>
            </defs>
            <circle
              key={"circle_0"}
              cx={svgSize / 2 - 0}
              cy={svgSize / 2 - 0}
              r={svgSize / 2}
              fill={"rgb(" + bckCol.r + "," + bckCol.g + "," + bckCol.b + ")"}
              style={{ stroke: "black", strokeWidth: "0.5px" }}
            />
            <Reflections data={shapesArray} svgSize={svgSize} />

            <FloatyShape
              shape={shapeData.shapeType}
              x={mouseNow.x}
              y={mouseNow.y}
              r={shapeData.radius}
              fill={colour}
              clip={"url(#clipCircle)"}
              transform={shapeData.transform}
              opacity={0.9}
            />

            <path
              d={
                "M0,0L" +
                pXone +
                "," +
                pYone +
                "A" +
                250 +
                "," +
                250 +
                " 0 0 1 " +
                pXtwo +
                "," +
                pYtwo +
                "L0,0"
              }
              style={{
                stroke: showPath ? "blue" : "none",
                fill: showPath ? "blue" : "none",
                strokeDasharray: "5",
                fillOpacity: "0.1",
                transform:
                  "translate(" +
                  svgSize / 2 +
                  "px, " +
                  svgSize / 2 +
                  "px) rotate(0deg)"
              }}
            />
          </g>
        </motion.svg>
        {!showToolBox && !leftTools && showPath && (
          <motion.div
            whileHover={{
              backgroundColor: "rgb(255, 255, 230)"
            }}
            style={closedTabStyle}
            onClick={() => setShowToolBox(true)}
          >
            <ToolCog height={50} />
          </motion.div>
        )}
        {showPath && bckgrndPicker}
        {showBPicker && (
          <div style={tabDivStyle}>
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                right: 15,
                cursor: "pointer",
                color: "rgb(0,0,0)"
              }}
              whileHover={{ color: "rgb(255,0,255)" }}
              onClick={() => setShowBPicker(false)}
            >
              <p>{"X"}</p>
            </motion.div>
            <div style={{ margin: "30px" }}>
              <SketchPicker
                disableAlpha
                width={200}
                color={bckCol}
                onChangeComplete={(e) => setBckCol(e.rgb)}
              />
            </div>
          </div>
        )}
        {showToolBox && !leftTools && (
          <div style={tabDivStyle}>
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                right: 15,
                cursor: "pointer",
                color: "rgb(0,0,0)"
              }}
              whileHover={{ color: "rgb(255,0,255)" }}
              onClick={() => setShowToolBox(false)}
            >
              <p>{"x"}</p>
            </motion.div>
            <div style={{ marginTop: "30px" }}>
              <SketchPicker
                disableAlpha
                width={200}
                color={colour}
                onChangeComplete={(e) => setColour(e.rgb)}
              />
            </div>

            <div
              style={{
                width: "300px"
              }}
            >
              {radiusSlider}
            </div>

            <div
              style={{
                display: "flex",
                marginTop: "0px",
                marginBottom: "10px",
                backgroundColor: "white"
              }}
            >
              <p>Preview:</p>
              <svg
                height="70"
                width="70"
                style={{
                  backgroundColor: "white",
                  marginLeft: "20px",
                  border: "0.5px solid black"
                }}
              >
                <FloatyShape
                  shape={"path"}
                  x={35}
                  y={35}
                  r={shapeData.radius}
                  fill={colour}
                  transform={shapeData.transform}
                  opacity={1}
                />
                <path
                  d="M8,72 Q2,40 33,58 T35,34 T5,19 T75, 12"
                  fill="none"
                  style={{
                    stroke:
                      "rgb(" + colour.r + "," + colour.g + "," + colour.b + ")",
                    strokeWidth: shapeData.radius * 2 + "px"
                  }}
                />
              </svg>
            </div>
          </div>
        )}

        <div
          style={{
            marginTop: "20px"
          }}
        >
          <motion.button
            whileHover={{
              scale: 1.1
            }}
            style={btnStylo}
            onClick={() => setShowPath(!showPath)}
          >
            {showPath ? "Hide Tools" : "Show Tools"}
          </motion.button>
          <motion.button
            whileHover={{
              scale: 1.1
            }}
            style={btnStylo}
            onClick={() => ctrlAndZ()}
          >
            Undo
          </motion.button>
          <motion.button
            whileHover={{
              scale: 1.1
            }}
            style={btnStylo}
            onClick={() => handleStartOver()}
          >
            Start Over
          </motion.button>
        </div>
      </div>
      <div style={{position: "relative", width: "100%", color: "white", marginTop: "10px"}}>
        <div style={{width: (ht -20 )+ "px", marginLeft: "50%", transform: "translate(-50%, 0%)"}}>
        <h3>Tell me more. What is this?</h3>
        <p>I wanted to make a full blown app for drawing mandalas.</p>
        <p>This was the functional starting point of it, which I've rewritten to feature here on my personal site.</p>
        <p>The full blown version featured routes, a redux store and loads (too much) of other things.</p>
        <p>It stalled a bit as newer projects came along and the full version never reallty got finished. But hey, that's how it goes sometimes!</p>
        <p>Still to fix : if you resize your window from 500px down to 300px or so, The drawing heads off all over the place. That's a fixable bug, but I suspected no-one would notice it on this light version. Well, until now I guess.</p>
        </div>
        </div>
    </div>
  ) : null;
}

function useWindowDimensions() {
  
  // with proper credit to:: https://joshwcomeau.com/react/the-perils-of-rehydration/
  // It's all doable, but it's just easier to Crtl +C Ctrl+V!
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export default Mandala;
