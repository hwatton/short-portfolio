import { useState, useRef, useEffect } from "react";


/*
the fundamental path function (way down below) goes with full credit to :
https://francoisromain.medium.com/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74
it's always just a bit of good old maths in the end isn't it?!

I had a go at writing my own, from the d3 version, but it's a bit much 
to get my head round! I get the steps, it's all simple & logical 
but it's a flippin' headache, so hey, that's what the internet is for I guess.
Thanks Francois Romain.
*/

export default function NeonPath(props) {
    const [points, setPoints] = useState([]);
    const [down, setDown] = useState(false);
    const [glowingComponent, setGlowingComponent] = useState(false);
    const [svgDims, setSvgDims] = useState({ x: 0, y: 0 });
    const svgElement = useRef(null);
  
    const GlowingPath = (props) => {
      let inside = [];
      let pointsArr = props.points.map((el, i) => {
        return [el.x, el.y];
      });
  
      for (let i = 30; i > 0; i--) {
        inside.push(
          <path
            key={"pathStroke" + i}
            d={getBezierPath(pointsArr)}
            style={{
              stroke: "magenta",
              strokeLinecap: "round",
              strokeWidth: 0 + i * 2 + "px",
              opacity: 1 / (i * i * 0.1),
              fill: "none"
            }}
          />
        );
      }
  
      return inside;
    };
  
    useEffect(() => {
      if (svgElement) {
        setSvgDims({
          x: svgElement.current.getBoundingClientRect().x,
          y: svgElement.current.getBoundingClientRect().y
        });
      }
    }, [svgElement, props]);
  
    function handleMove(e) {
      if (down) {
        let cP = [...points];
        cP.push({
          x: e.clientX - svgDims.x,
          y: e.clientY - svgDims.y
        });
  
        setPoints(cP);
      }
    }
  
    function handleMouseDown() {
      setGlowingComponent(false);
      setDown(true);
      setPoints([]);
    }
  
    function handleMouseUp() {
      setDown(false);
      setGlowingComponent(true);
    }
  
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
 
  
    const DynoPath = (props) => {
      return (
        <path
          d={pToP(props.points)}
          style={{
            stroke: "magenta",
            strokeWidth: "2px"
          }}
        />
      );
    };
  
    return (
      
     
      <div style={{
        borderRadius: "20px",
        boxShadow: "0 0 20px #f0f",
        backgroundColor: "black",
        overflow: "hidden",
        margin: "15px"
      }}>
        <div style={{ width: "100%",
        borderBottom: "1px solid magenta"}}>
        <p>... drag and draw ...</p>
        </div>
        <svg
          ref={svgElement}
          style={{ backgroundColor: "black", opacity: 1 }}
          width={props.dims.width ? props.dims.width*0.9 : 500}
          height={props.dims.height ? props.dims.height*0.7 : 500}
          onMouseDown={() => handleMouseDown()}
          onMouseUp={() => handleMouseUp()}
          onMouseMove={(e) => {
            handleMove(e);
          }}
        
        >
          <defs>
            <defs>
              <filter id="glow">
                <fegaussianblur
                  className="blur"
                  result="coloredBlur"
                  stdDeviation="4"
                ></fegaussianblur>
                <femerge>
                  <femergenode in="coloredBlur"></femergenode>
                  <femergenode in="coloredBlur"></femergenode>
                  <femergenode in="coloredBlur"></femergenode>
                  <femergenode in="SourceGraphic"></femergenode>
                </femerge>
              </filter>
            </defs>
          </defs>
  
          <path
            d={pToP(points)}
            style={{
              stroke: "magenta",
              strokeWidth: "2px",
              fillOpacity: 0,
              filter: "url(#glow)"
            }}
          />
          {glowingComponent ? (
            <GlowingPath points={points} />
          ) : (
            <DynoPath points={points} />
          )}
        </svg>
      </div>
    
       
    );
  }


/**** Line helper function(s) *****/

const line = (pointA, pointB) => {
    const lengthX = pointB[0] - pointA[0];
    const lengthY = pointB[1] - pointA[1];
    return {
      length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
      angle: Math.atan2(lengthY, lengthX)
    };
  };
  
  const controlPoint = (current, previous, next, reverse) => {
    // When 'current' is the first or last point of the array
    // 'previous' or 'next' don't exist.
    // Replace with 'current'
    const p = previous || current;
    const n = next || current;
    // The smoothing ratio
    const smoothing = 0.1;
    // Properties of the opposed-line
    const o = line(p, n);
    // If is end-control-point, add PI to the angle to go backward
    const angle = o.angle + (reverse ? Math.PI : 0);
    const length = o.length * smoothing;
    // The control point position is relative to the current point
    const x = current[0] + Math.cos(angle) * length;
    const y = current[1] + Math.sin(angle) * length;
    return [x, y];
  };
  
  const bezierCommand = (point, i, a) => {
    // start control point
    const [cpsX, cpsY] = controlPoint(a[i - 1], a[i - 2], point);
    // end control point
    const [cpeX, cpeY] = controlPoint(point, a[i - 1], a[i + 1], true);
    return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`;
  };
  
  const svgPath = (points, command) => {
    // build the d attributes by looping over the points
    const d = points.reduce(
      (acc, point, i, a) =>
        i === 0
          ? // if first point
            `M ${point[0]},${point[1]}`
          : // else
            `${acc} ${command(point, i, a)}`,
      ""
    );
    return d;
  };
  
  function getBezierPath(points) {
    return svgPath(points, bezierCommand);
  }
  
  
  