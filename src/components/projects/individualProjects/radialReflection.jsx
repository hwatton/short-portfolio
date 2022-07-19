import { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";

function RadialReflection(props) {
  const ht = 500;
  const wd = ht;

  const [SVGDims, setSVGDims] = useState({ x: 0, y: 0 });
  const [mouseNow, setMouseNow] = useState({ x: null, y: null });
  
  const [colour, setColour] = useState({ r: 233, g: 13, b: 13, a: 1 });
  const svgRef = useRef(null);
  const [highlightSwitch, setHighlightSwitch] = useState(false);
  const [showToolBox, setShowToolBox] = useState(false);
  const [points, setPoints] = useState([]);
  const [down, setDown] = useState(false);
  const [shapeData, setShapeData] = useState({
    radius: "3",
    colour: { r: 233, g: 13, b: 13, a: 1 },
    shapeType: "path",
    transform: "45",
    path: ""
  });

  const [shapesArray, setShapesArray] = useState([]);
  //replace circles with this^
  //in it, add a field for shape Type

  const colourArray = [
    {
      name: "viridis",
      colours: [
        "#440154",
        "#481a6c",
        "#472f7d",
        "#414487",
        "#39568c",
        "#31688e",
        "#2a788e",
        "#23888e",
        "#1f988b",
        "#22a884",
        "#35b779",
        "#54c568",
        "#7ad151",
        "#a5db36",
        "#d2e21b",
        "#fde725"
      ]
    },

    {
      name: "turbo",
      colours: [
        "rgb(35, 23, 27)",
        "rgb(74, 65, 181)",
        "rgb(66, 111, 242)",
        "rgb(47, 157, 245)",
        "rgb(37, 198, 216)",
        "rgb(46, 229, 174)",
        "rgb(77, 248, 132)",
        "rgb(123, 254, 95)",
        "rgb(175, 244, 68)",
        "rgb(222, 221, 50)",
        "rgb(254, 185, 39)",
        "rgb(255, 142, 31)",
        "rgb(246, 95, 24)",
        "rgb(208, 51, 14)",
        "rgb(165, 20, 3)",
        "rgb(144, 12, 0)"
      ]
    },
    {
      name: "magma",
      colours: [
        "#000004",
        "#0b0924",
        "#20114b",
        "#3b0f70",
        "#57157e",
        "#721f81",
        "#8c2981",
        "#a8327d",
        "#c43c75",
        "#de4968",
        "#f1605d",
        "#fa7f5e",
        "#fe9f6d",
        "#febf84",
        "#fddea0",
        "#fcfdbf"
      ]
    }
  ];


  const activeColour = {
    name: "turbo",
    colours: [
      "rgb(35, 23, 27)",
      "rgb(74, 65, 181)",
      "rgb(66, 111, 242)",
      "rgb(47, 157, 245)",
      "rgb(37, 198, 216)",
      "rgb(46, 229, 174)",
      "rgb(77, 248, 132)",
      "rgb(123, 254, 95)",
      "rgb(175, 244, 68)",
      "rgb(222, 221, 50)",
      "rgb(254, 185, 39)",
      "rgb(255, 142, 31)",
      "rgb(246, 95, 24)",
      "rgb(208, 51, 14)",
      "rgb(165, 20, 3)",
      "rgb(144, 12, 0)"
    ]
  };

  useEffect(() => {
    if (svgRef) {
      let info = svgRef.current.getBoundingClientRect();
      setSVGDims(info);
    }
  }, [svgRef, props]);



  function pToP(array) {
    let string;

    const len = array.length;
    if (len > 0) {
      string = "M" + array[0].x + "," + array[0].y;

      for (let i = 1; i < len; i++) {
        string = string.concat("L" + array[i].x + "," + array[i].y);
      }
    }
    return string;
  }

  function handleMouseDown() {
    if (shapeData.shapeType === "path") {
      setDown(true);
      setPoints([]);
    }
  }

  function handleMouseUp() {
    const finalPath = pToP(points);
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

  function setMouseFunction(e) {
    let newObj = { x: e.clientX - SVGDims.x, y: e.clientY - SVGDims.y };
    setMouseNow(newObj);
    if (down) {
      let cP = [...points];
      cP.push({
        x: e.clientX - SVGDims.x,
        y: e.clientY - SVGDims.y
      });

      setPoints(cP);
    }
  }

  function handleSwitch() {
    setHighlightSwitch(true);
    setTimeout(() => {
      setHighlightSwitch(false);
    }, 2000);
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

  /**var x = x0 + r * Math.cos(2 * Math.PI * i / items);
    var y = y0 + r * Math.sin(2 * Math.PI * i / items);   */
  const pXone = 250 * Math.cos((2 * Math.PI * -1.0) / 4);
  const pYone = 250 * Math.sin((2 * Math.PI * -1.0) / 4);

  const pXtwo = 250 * Math.cos((2 * Math.PI * -2.5) / 12);
  const pYtwo = 250 * Math.sin((2 * Math.PI * -2.5) / 12);

  function Triangle(props) {
    const px1 = props.x + props.r * Math.cos((2 * Math.PI * 1) / 6);
    const py1 = props.y + props.r * Math.sin((2 * Math.PI * 1) / 6);

    const px2 = props.x + props.r * Math.cos((2 * Math.PI * 3) / 6);
    const py2 = props.y + props.r * Math.sin((2 * Math.PI * 3) / 6);

    const px3 = props.x + props.r * Math.cos((2 * Math.PI * 5) / 6);
    const py3 = props.y + props.r * Math.sin((2 * Math.PI * 5) / 6);

    return (
      <g
        style={{
          transformOrigin: props.x + "px " + props.y + "px",
          transform: "rotate(0deg)"
        }}
      >
        <path
          d={
            "M" +
            px1 +
            "," +
            py1 +
            "L" +
            px2 +
            "," +
            py2 +
            "L" +
            px3 +
            "," +
            py3 +
            "z"
          }
          fill={props.fill}
          style={props.transform}
        />
      </g>
    );
  }

  const Reflections = (props) => {
    const arrayOfGroups = [...Array(12)].map((e, ind) => {
      const circleComponents = props.data.map((el, i) => {
        let element;
        if (el.shapeType === "circle") {
          element = (
            <circle
              clipPath={"url(#clipSegment0)"}
              key={el.key}
              cx={el.cx}
              cy={el.cy}
              r={el.r}
              fill={el.fill}
            />
          );
        }
        if (el.shapeType === "rect") {
          element = (
            <g clipPath={"url(#clipSegment0)"} key={el.key}>
              <rect
                x={el.cx - el.r}
                y={el.cy - el.r}
                height={el.r * 2}
                width={el.r * 2}
                fill={el.fill}
                style={{
                  transformOrigin: el.cx + "px " + el.cy + "px",
                  transform: "rotate(" + el.transform + "deg)"
                }}
              />
            </g>
          );
        }

        if (el.shapeType === "triangle") {
          element = (
            <g clipPath={"url(#clipSegment0)"} key={el.key}>
              <Triangle
                x={el.cx}
                y={el.cy}
                r={el.r}
                fill={el.fill}
                transform={{
                  transformOrigin: el.cx + "px " + el.cy + "px",
                  transform: "rotate(" + el.transform + "deg)"
                }}
              />
            </g>
          );
        }

        if (el.shapeType === "path") {
          element = (
            <g clipPath={"url(#clipSegment0)"} key={el.key}>
              <path
                d={el.path}
                style={{
                  stroke: el.fill,
                  strokeWidth: el.r * 2 + "px",
                  fill: "none",
                  strokeLinecap: "round"
                }}
              />
            </g>
          );
        }

        return element;
      });

      const flippedComponents = props.data.map((el, i) => {
        let nx = 250 - (el.cx - 250);
        let element;

        if (el.shapeType === "circle") {
          element = (
            <circle
              clipPath={"url(#clipSegment23)"}
              key={el.key}
              cx={nx}
              cy={el.cy}
              r={el.r}
              fill={el.fill}
            />
          );
        }
        if (el.shapeType === "rect") {
          element = (
            <g clipPath={"url(#clipSegment23)"} key={el.key}>
              <rect
                x={nx - el.r}
                y={el.cy - el.r}
                height={el.r * 2}
                width={el.r * 2}
                fill={el.fill}
                style={{
                  transformOrigin: nx + "px " + el.cy + "px",
                  transform: "rotate(" + el.transform * -1 + "deg)"
                }}
              />
            </g>
          );
        }

        if (el.shapeType === "triangle") {
          element = (
            <g clipPath={"url(#clipSegment23)"} key={el.key}>
              <Triangle
                x={nx}
                y={el.cy}
                r={el.r}
                fill={el.fill}
                transform={{
                  transformOrigin: nx + "px " + el.cy + "px",
                  transform: "rotate(" + (180 - el.transform) + "deg)"
                }}
              />
            </g>
          );
        }

        if (el.shapeType === "path") {
          element = (
            <g clipPath={"url(#clipSegment23)"} key={el.key}>
              <path
                d={el.path}
                style={{
                  stroke: el.fill,
                  strokeWidth: el.r * 2,
                  fill: "none",
                  transformOrigin: "250px 250px",
                  transform: "scale(-1, 1)",
                  strokeLinecap: "round"
                }}
              />
            </g>
          );
        }

        return element;
      });

      return (
        <g
          key={"reflection" + ind}
          style={{
            transformOrigin: "250px 250px",
            transform: "rotate(" + 30 * ind + "deg) "
          }}
        >
          {flippedComponents}
          {circleComponents}
        </g>
      );
    });

    return arrayOfGroups;
  };

  const [showPath, setShowPath] = useState(true);

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
            transform: "translate(250px, 250px) rotate( " + i * 15 + "deg)"
          }}
        />
      </clipPath>
    );
  });

  const DynoPath = (props) => {
    return (
      <path
        clipPath={"url(#clipSegment0)"}
        d={pToP(props.points)}
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
      <circle
        clipPath={props.clip}
        style={{
          fillOpacity: 0.8
        }}
        cx={props.x}
        cy={props.y}
        r={props.r}
        fill={fillString}
      />
    );

    if (props.shape === "rect") {
      shp = (
        <rect
          clipPath={props.clip}
          x={props.x - (props.r * 2) / 2}
          y={props.y - (props.r * 2) / 2}
          height={props.r * 2}
          width={props.r * 2}
          fill={fillString}
          style={{
            fillOpacity: 0.8,
            transformOrigin: props.x + "px " + props.y + "px",
            transform: "rotate(" + props.transform + "deg)"
          }}
        />
      );
    }

    if (props.shape === "triangle") {
      shp = (
        <Triangle
          clipPath={props.clip}
          x={props.x}
          y={props.y}
          r={props.r}
          fill={fillString}
          transform={{
            fillOpacity: 0.8,
            transformOrigin: props.x + "px " + props.y + "px",
            transform: "rotate(" + props.transform + "deg)"
          }}
        />
      );
    }

    if (props.shape === "path") {
      shp = (
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
              fillOpacity: 0.8
            }}
            cx={props.x}
            cy={props.y}
            r={props.r}
            fill={fillString}
          />
        </g>
      );
    }

    return shp;
  };


  const radiusSlider = (
    <div
      style={{
        margin: "0px",
        padding: "0px"
      }}
    >
      <p style={{ marginTop: 10, color: "black", fontSize: "12px" }}>line width</p>
      <input
        onChange={(event) => handleRadiusSlider(event.target.value)}
        type="range"
        min="0.5"
        max="32"
        step="0.5"
        value={shapeData.radius}
        style={{ height: "10px", width: "200px", marginBottom: "10px" }}
      />
    </div>
  );



  const tabDivStyle = {
    position: "fixed",
    top: SVGDims.y ? SVGDims.y + SVGDims.height / 2 : 0,
    left: SVGDims.x ? SVGDims.x : 0,
    width: SVGDims.width? SVGDims.width - 5 : 600, // -5 for border
    height: 350,
    paddingTop: 5,
    backgroundColor: "rgba(255,255,255,1)",
    borderLeft: "5px ridge rgba(100,100,140,0.5)",
    borderTop: "5px ridge rgba(100,100,140,0.5)",
    borderBottom: "5px ridge rgba(100,100,140,0.5)",
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px",
    display: "flex"
  };

  const closedTabStyle = {
    position: "fixed",
    top: SVGDims.y ? SVGDims.y + SVGDims.height - 50 : 0,
    left: SVGDims.x ? SVGDims.x + SVGDims.width - 35 : 0,
    width: "30px",
    height: "40px",
    backgroundColor: "rgba(205,205,255,0.6)",
    borderLeft: "5px ridge rgba(100,100,140,0.5)",
    borderTop: "5px ridge rgba(100,100,140,0.5)",
    borderBottom: "5px ridge rgba(100,100,140,0.5)",
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px"
  };

  const PathPreview  = (props) => {
    return (
        <path
                    d={"M 2 18 Q 3 8, 10 10 T 110 52 T 120 30 T 40 50 T 20 70 T 120 80"}
                    style={{
                    strokeWidth: props.radius + "px",
                    stroke:
                     "rgb(" +
                     props.colour.r +
                     "," +
                     props.colour.g +
                     "," +
                     props.colour.b +
                     ")"
                         
                    }}
                    fill="none"
                    
                  />
    )

  }


  return  (
    <div style={{ height: "600px" }}>
      <svg
        ref={svgRef}
        onClick={(e) => addShape(e)}
        height={ht + 4}
        width={wd + 4}
        style={{
          backgroundColor: "rgb(220,220,220)",
          border: "1px solid black"
        }}
        onMouseMove={(e) => {
          setMouseFunction(e);
        }}
        onMouseDown={() => handleMouseDown()}
        onMouseUp={() => handleMouseUp()}
      >
        <g style={{ transform: "translate(2px ,2px)" }}>
          <defs>
            {anglePaths}
            <clipPath key={"clipCircle"} id={"clipCircle"}>
              <circle
                key={"circle_0"}
                cx={ht / 2}
                cy={ht / 2}
                r={ht / 2}
                fill={"none"}
              />
            </clipPath>
          </defs>
          <circle
            key={"circle_0"}
            cx={ht / 2}
            cy={ht / 2}
            r={ht / 2}
            fill={"white"}
            style={{ stroke: "black", strokeWidth: "2px" }}
          />
          <Reflections data={shapesArray} />

          <FloatyShape
            shape={shapeData.shapeType}
            x={mouseNow.x}
            y={mouseNow.y}
            r={shapeData.radius}
            fill={colour}
            clip={"url(#clipCircle)"}
            transform={shapeData.transform}
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
              transform: "translate(250px, 250px) rotate(0deg)"
            }}
          
          />
        </g>
      </svg>
      {showToolBox ? (
        <div style={tabDivStyle}>
          <div
            style={{
              position: "absolute",
              top: -15,
              left: 5,
              cursor: "pointer",
              color: highlightSwitch ? "white" : "black"
            }}
            onClick={() => setShowToolBox(false)}
            onMouseEnter={() => handleSwitch()}
          >
            <p>{">"}</p>
          </div>

          <div
            style={{
              marginLeft: "10px",
              marginTop: "20px",
              marginRight: "10px"
            }}
          >
            <SketchPicker
              presetColors={activeColour.colours}
              disableAlpha
              width={200}
              color={colour}
              onChangeComplete={(e) => setColour(e.rgb)}
            />
          </div>
          <div
            style={{
              marginLeft: "0px",
              marginTop: "20px",
              marginRight: "10px",
              fontSize: "10px",
              lineHeight: "15px"
            }}
          >
             <div >
            
            <div
              style={{
                marginTop: "0px",
                border: "1px solid grey",
                width: SVGDims.width - 260
              }}
            >
              {radiusSlider}
            </div>
              <svg
                style={{
                marginTop: "5px",
                border:
                      shapeData.shapeType === "path"
                        ? "1px solid blue"
                        : "1px solid rgba(0,0,0,0)"
                  }}
                height="100px"
                width="245px"
                >
                <g style={{transform: "translate(35px, 0px)"}}>
                <PathPreview
                colour={colour}
                radius={shapeData.radius}/>
                </g>
                </svg>
            </div>
          </div>
        </div>
      ) : (
        <div style={closedTabStyle}>
          <div
            style={{
              fontSize: "18px",
              position: "absolute",
              top: -8,
              left: 9,
              cursor: "pointer",
              color: highlightSwitch ? "white" : "black"
            }}
            onMouseEnter={() => handleSwitch()}
            onClick={() => setShowToolBox(true)}
          >
            <p>{"<"}</p>
          </div>
        </div>
      )}
      <div
        style={{
          marginTop: "20px"
        }}
      >
        <button onClick={() => setShowPath(!showPath)}>Toggle Segment</button>
        <button onClick={() => ctrlAndZ()}>Go back</button>
        <button onClick={() => setShapesArray([])}>Start Over</button>
      </div>
    </div>
  ) 
}

export default RadialReflection;
