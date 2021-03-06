import * as d3 from "d3";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import  "./hunLineStyles.css"

//helper variables
const lineFunc = d3
    .line()
    .x((d) => {
      return d.x;
    })
    .y((d) => {
      return d.y;
    })
    .curve(d3.curveLinear);
    
    //ARRAYS OF COLOURS, SOME BY HAND, SOME TAKEN FROM D3.
  const magmarr = [...Array(11)].map((el, i) => {
    return d3.interpolateMagma(0.1 * i);
  });

  const viridarr = [...Array(11)].map((el, i) => {
    return d3.interpolateViridis(0.1 * i);
  });

  const cubicHearr = [...Array(11)].map((el, i) => {
    return d3.interpolateCubehelixDefault(0.1 * i);
  });

  const turboarr = [...Array(11)].map((el, i) => {
    return d3.interpolateTurbo(0.1 * i);
  });

  //array of functions
  const funcs = [
    linesAndLinesTwo,
    doubleSpiroStar,
    smallerSpiroStar,
    triangleTippedWheel,
    wobbleStar,
    fourAngleCircle,
    fourCircle,
    madness,
    chevronStar,
    superMegaStar,
    megaSpiroStar,
    megaStar,
    geometricStarCannonTwo,
    geometricStarCannon,
    circleWheelInside,
    circleWheel,
    manyPointStar,
    madStar,
    weirdStar,
    lineStar,
    linesAndLines,
    angleWheelL,
    angleWheelR,
    fivePointStar,
    fiftyPointStar
  ];

 

  const colourArray = [
    ["#ff1493", "#120052", "#652ec7", "#00c2ba", "#82e0bf", "#ff1493"],
    ["#FF3C00", "#FF7600", "#FF9D00", "#FF6701", "#FF3C00"],
    ["#050305", "#120a3d", "#412854", "#4cc35b", "#68da23", "#050305"],
    ["#b7ff00", "#7eff00", "#46c34c", "#479f78", "#cfffb1", "#b7ff00"],
    ["#00ff45", "#40f916", "#89ff00", "#00ff11", "#75ff0a", "#00ff45"],
    ["#fb00be", "#ff0000", "#ff00ce", "#ff07a9", "#ee006c", "#fb00be"],
    magmarr,
    viridarr,
    cubicHearr,
    turboarr,
    [
      "#ff0000",
      "#ffa500",
      "#ffff00",
      "#008000",
      "#0000ff",
      "#4b0082",
      "#ee82ee",
      "#ff0000"
    ]
  ];

function HundredLines(props) {
  //SET UP DIMENSIONS

  const wd = Math.min(props.dims.width, props.dims.height) > 500 ? 500 : 300

  const ht = wd
  const [lineData, setLineData] = useState(null);
  const [colourScheme, setColourScheme] = useState([
    "#ff0000",
    "#ffa500",
    "#ffff00",
    "#008000",
    "#0000ff",
    "#4b0082",
    "#ee82ee",
    "#ff0000"
  ]);
  const colorScale = d3
    .scaleLinear()
    .range(colourScheme)
    .domain(d3.ticks(0, 1, colourScheme.length));

    useEffect(()=>{
setLineData(funcs[Math.floor(Math.random() * funcs.length)](wd,ht))
    },[props.dims.width, ht, wd])

 

  function handleAnimationEnd(num) {
    if (num === 98) {
      setColourScheme(
        colourArray[Math.floor(Math.random() * colourArray.length)]
      );
      setLineData(funcs[Math.floor(Math.random() * funcs.length)](wd,ht))
    }
  }

  

  const linePaths = lineData
    ? lineData.map((el, i) => {


        return (
          <motion.path
            key={"path_" + i}
            initial={{
              d: "M" + wd / 2 + "," + ht / 2 + "L" + wd / 2 + "," + ht / 2,
              stroke: "#000000"
            }}
            animate={{
              d: lineFunc(el),
              stroke: colorScale(i / 100),

              transition: {
                duration: 3,
                ease: "linear"
              }
            }}
          
            onAnimationComplete={()=>{handleAnimationEnd(i)}}
            style={{
              strokeWidth: "2px",
              strokeLinecap: "round"
            }}
          />
        );
      })
    : null;

    

 

  return (
 
    <div>
    <div style={{position: "relative",  display: "flex", justifyContent: "center", paddingTop: "30px"}}>
{props.dims.width >20 &&
      <svg
        height={ht}
        width={wd}
        style={{
          backgroundColor: "black",
          border: "20px solid black"
        }}
      >
        <g className={"spinner"}>
           {linePaths}

        </g>
      </svg>
}
</div>
<div style={{
  width: wd - 40,
  paddingLeft: "40px"
}}>
  <p>This is an animation I've made a few times now. I'd love to keep adding to it if I can find some time!</p>
  <p>This uses framer-motion to move between updating sets of data.</p>
  <p>The last version I made had a totally mind bending hack using requestAnimationFrame and useEffect. *yuck* It didn't work very well and it just looked awful in the code!</p>
  <p>It was horrible and I knew there was a simpler way. This seems to do it nicely.</p> 
  <p>I'd like to load all of the transitions in at the beginning and maybe I'd lose that "jerk" as the new data comes in and it decideds what to do....</p>
</div>
</div>
  
  );

      }

export default HundredLines;

//from here: a list of interesting things that return new data for the points

function fivePointStar(wd,ht) {
  //f5
  /*
creates arrays of inner points and outer points
it's a total badBoy
then returns 10 paths that make up each line between those points
*/
  let dataset = [];
  let cx = wd / 2;
  let cy = ht / 2;
  let rad = d3.min([ht / 2 - 20, wd / 2 - 20]);
  let inner_rad = rad / 2;
  let outer = [];
  let inner = [];
  let inward = true;

  for (let i = 0; i < 5; i++) {
    let vi = i + 0.5;
    let x = cx + rad * Math.cos((2 * Math.PI * i) / 5);
    let y = cy + rad * Math.sin((2 * Math.PI * i) / 5);
    outer.push({ x: x, y: y });
    let x_two = cx + inner_rad * Math.cos((2 * Math.PI * vi) / 5);
    let y_two = cy + inner_rad * Math.sin((2 * Math.PI * vi) / 5);
    inner.push({ x: x_two, y: y_two });
  }

  let stx, sty, fx, fy;

  outer.push(outer[0]);
  //inner + outer compiled
  let oC = 0;
  let iC = 0;

  for (let j = 0; j < 10; j++) {
    if (inward) {
      //inward
      stx = outer[oC].x;
      sty = outer[oC].y;

      fx = inner[iC].x;
      fy = inner[iC].y;

      oC = oC + 1;
    } else {
      //outward
      stx = inner[iC].x;
      sty = inner[iC].y;

      fx = outer[oC].x;
      fy = outer[oC].y;

      iC = iC + 1;
    }

    for (let i = 0; i < 10; i++) {
      let x = stx + (fx - stx) * (i / 10);
      let y = sty + (fy - sty) * (i / 10);
      let x2 = stx + (fx - stx) * ((i + 1) / 10);
      let y2 = sty + (fy - sty) * ((i + 1) / 10);

      dataset.push([
        { x: x, y: y },
        { x: x2, y: y2 }
      ]);
    }
    inward = !inward;
  }

  return dataset;
}

function lineStar(wd,ht) {
  //f4
  let dataset = [];
  let cx = wd / 2;
  let cy = ht / 2;
  let rad = d3.min([ht / 2 - 20, wd / 2 - 20]);

  for (let i = 0; i < 100; i++) {
    let x = cx + rad * Math.cos((2 * Math.PI * i) / 100);
    let y = cy + rad * Math.sin((2 * Math.PI * i) / 100);
    let x2 = cx;
    let y2 = cy;

    dataset.push([
      { x: x, y: y },
      { x: x2, y: y2 }
    ]);
  }

  return dataset;
}

function linesAndLines(wd,ht) {
  //f4
  let dataset = [];
  let cx = wd / 2;
  let cy = ht / 2;
  let rad = d3.min([ht / 2 - 20, wd / 2 - 20]);

  for (let i = 0; i < 100; i++) {
    let x = cx + rad * Math.cos((2 * Math.PI * i) / 200);
    let y = cy + rad * Math.sin((2 * Math.PI * i) / 200);
    let x2 = cx + rad * Math.cos((2 * Math.PI * -i) / 200);
    let y2 = cy + rad * Math.sin((2 * Math.PI * -i) / 200);

    dataset.push([
      { x: x, y: y },
      { x: x2, y: y2 }
    ]);
  }

  return dataset;
}

function linesAndLinesTwo(wd,ht) {
  //f4
  let dataset = [];
  let cx = wd / 2;
  let cy = ht / 2;
  let rad = d3.min([ht / 2 - 20, wd / 2 - 20]);

  for (let i = 0; i < 50; i++) {
    let x = cx + rad * Math.cos((2 * Math.PI * i) / 100);
    let y = cy + rad * Math.sin((2 * Math.PI * i) / 100);
    let x2 = cx + rad * Math.cos((2 * Math.PI * -i) / 100);
    let y2 = cy + rad * Math.sin((2 * Math.PI * -i) / 100);

    dataset.push([
      { x: x, y: y },
      { x: x2, y: y2 }
    ]);
  }

  for (let i = 0; i < 50; i++) {
    let x = cx + rad * Math.cos((2 * Math.PI * (i + 25)) / 100);
    let y = cy + rad * Math.sin((2 * Math.PI * (i + 25)) / 100);
    let x2 = cx + rad * Math.cos((2 * Math.PI * (-i + 25)) / 100);
    let y2 = cy + rad * Math.sin((2 * Math.PI * (-i + 25)) / 100);

    dataset.push([
      { x: x, y: y },
      { x: x2, y: y2 }
    ]);
  }

  return dataset;
}

function triangleTippedWheel(wd,ht) {
  //f4
  let dataset = [];
  let cx = wd / 2;
  let cy = ht / 2;
  let rad = d3.min([ht / 2 - 20, wd / 2 - 20]);
  let radDip = 0.25 + Math.random() * 0.75;

  for (let i = 0; i < 25; i++) {
    let x = cx + rad * Math.cos((2 * Math.PI * (i - 0.5)) / 25);
    let y = cy + rad * Math.sin((2 * Math.PI * (i - 0.5)) / 25);
    let x2 = cx + rad * Math.cos((2 * Math.PI * (i + 0.5)) / 25);
    let y2 = cy + rad * Math.sin((2 * Math.PI * (i + 0.5)) / 25);

    dataset.push([
      { x: x, y: y },
      { x: x2, y: y2 }
    ]);

    x = cx + rad * Math.cos((2 * Math.PI * (i + 0.5)) / 25);
    y = cy + rad * Math.sin((2 * Math.PI * (i + 0.5)) / 25);
    x2 = cx + rad * radDip * Math.cos((2 * Math.PI * (i + 0.5)) / 25);
    y2 = cy + rad * radDip * Math.sin((2 * Math.PI * (i + 0.5)) / 25);

    dataset.push([
      { x: x, y: y },
      { x: x2, y: y2 }
    ]);

    x = cx + rad * radDip * Math.cos((2 * Math.PI * (i + 0.5)) / 25);
    y = cy + rad * radDip * Math.sin((2 * Math.PI * (i + 0.5)) / 25);
    x2 = cx + rad * Math.cos((2 * Math.PI * (i - 0.5)) / 25);
    y2 = cy + rad * Math.sin((2 * Math.PI * (i - 0.5)) / 25);

    dataset.push([
      { x: x, y: y },
      { x: x2, y: y2 }
    ]);

    x = cx + rad * radDip * Math.cos((2 * Math.PI * (i + 0.5)) / 25);
    y = cy + rad * radDip * Math.sin((2 * Math.PI * (i + 0.5)) / 25);
    x2 = cx;
    y2 = cy;

    dataset.push([
      { x: x, y: y },
      { x: x2, y: y2 }
    ]);
  }

  return dataset;
}

function wobbleStar(wd,ht) {
  //f4
  let dataset = [];
  let cx = wd / 2;
  let cy = ht / 2;
  let rad = d3.min([ht / 2 - 20, wd / 2 - 20]);
  let k = 0;
  let tmp = 0;
  let wobDepth = 1 + Math.random() * 4;

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 5; j++) {
      tmp = rad - (j / 5) * (rad / wobDepth);
      let x = cx + tmp * Math.cos((2 * Math.PI * k) / 100);
      let y = cy + tmp * Math.sin((2 * Math.PI * k) / 100);
      let x2 = cx;
      let y2 = cy;
      dataset.push([
        { x: x, y: y },
        { x: x2, y: y2 }
      ]);
      k++;
    }

    for (let j = 4; j > -1; j--) {
      tmp = rad - (j / 5) * (rad / wobDepth);
      let x = cx + tmp * Math.cos((2 * Math.PI * k) / 100);
      let y = cy + tmp * Math.sin((2 * Math.PI * k) / 100);
      let x2 = cx;
      let y2 = cy;
      dataset.push([
        { x: x, y: y },
        { x: x2, y: y2 }
      ]);
      k++;
    }
  }

  return dataset;
}

function fourCircle(wd,ht) {
  //f4
  let dataset = [];
  let cx = wd / 2;
  let cy = ht / 2;
  let rad = d3.min([ht / 2 - 20, wd / 2 - 20]);
  let rad2 = rad * 0.75;
  let rad3 = rad * 0.5;
  let rad4 = rad * 0.25;

  for (let i = 0; i < 25; i++) {
    let x = cx + rad * Math.cos((2 * Math.PI * i) / 25);
    let y = cy + rad * Math.sin((2 * Math.PI * i) / 25);
    let x2 = cx + rad * Math.cos((2 * Math.PI * (i + 1)) / 25);
    let y2 = cy + rad * Math.sin((2 * Math.PI * (i + 1)) / 25);

    dataset.push([
      { x: x, y: y },
      { x: x2, y: y2 }
    ]);

    x = cx + rad2 * Math.cos((2 * Math.PI * i) / 25);
    y = cy + rad2 * Math.sin((2 * Math.PI * i) / 25);
    x2 = cx + rad2 * Math.cos((2 * Math.PI * (i + 1)) / 25);
    y2 = cy + rad2 * Math.sin((2 * Math.PI * (i + 1)) / 25);

    dataset.push([
      { x: x, y: y },
      { x: x2, y: y2 }
    ]);

    x = cx + rad3 * Math.cos((2 * Math.PI * i) / 25);
    y = cy + rad3 * Math.sin((2 * Math.PI * i) / 25);
    x2 = cx + rad3 * Math.cos((2 * Math.PI * (i + 1)) / 25);
    y2 = cy + rad3 * Math.sin((2 * Math.PI * (i + 1)) / 25);

    dataset.push([
      { x: x, y: y },
      { x: x2, y: y2 }
    ]);

    x = cx + rad4 * Math.cos((2 * Math.PI * i) / 25);
    y = cy + rad4 * Math.sin((2 * Math.PI * i) / 25);
    x2 = cx + rad4 * Math.cos((2 * Math.PI * (i + 1)) / 25);
    y2 = cy + rad4 * Math.sin((2 * Math.PI * (i + 1)) / 25);

    dataset.push([
      { x: x, y: y },
      { x: x2, y: y2 }
    ]);
  }

  return dataset;
}

function fourAngleCircle(wd,ht) {
  //f4
  let dataset = [];
  let cx = wd / 2;
  let cy = ht / 2;
  let rad = d3.min([ht / 2 - 20, wd / 2 - 20]);
  let rad2 = rad * 0.75;
  let rad3 = rad * 0.5;
  let rad4 = rad * 0.25;

  for (let i = 0; i < 25; i++) {
    let x = cx + rad * Math.cos((2 * Math.PI * i) / 25);
    let y = cy + rad * Math.sin((2 * Math.PI * i) / 25);
    let x2 = cx + rad * 0.9 * Math.cos((2 * Math.PI * (i + 2)) / 25);
    let y2 = cy + rad * 0.9 * Math.sin((2 * Math.PI * (i + 2)) / 25);

    dataset.push([
      { x: x, y: y },
      { x: x2, y: y2 }
    ]);

    x = cx + rad2 * Math.cos((2 * Math.PI * i) / 25);
    y = cy + rad2 * Math.sin((2 * Math.PI * i) / 25);
    x2 = cx + rad2 * 0.9 * Math.cos((2 * Math.PI * (i + 2)) / 25);
    y2 = cy + rad2 * 0.9 * Math.sin((2 * Math.PI * (i + 2)) / 25);

    dataset.push([
      { x: x, y: y },
      { x: x2, y: y2 }
    ]);

    x = cx + rad3 * Math.cos((2 * Math.PI * i) / 25);
    y = cy + rad3 * Math.sin((2 * Math.PI * i) / 25);
    x2 = cx + rad3 * 0.9 * Math.cos((2 * Math.PI * (i + 2)) / 25);
    y2 = cy + rad3 * 0.9 * Math.sin((2 * Math.PI * (i + 2)) / 25);

    dataset.push([
      { x: x, y: y },
      { x: x2, y: y2 }
    ]);

    x = cx + rad4 * Math.cos((2 * Math.PI * i) / 25);
    y = cy + rad4 * Math.sin((2 * Math.PI * i) / 25);
    x2 = cx + rad4 * 0.9 * Math.cos((2 * Math.PI * (i + 2)) / 25);
    y2 = cy + rad4 * 0.9 * Math.sin((2 * Math.PI * (i + 2)) / 25);

    dataset.push([
      { x: x, y: y },
      { x: x2, y: y2 }
    ]);
  }

  return dataset;
}

function madness(wd,ht) {
  //f4
  let dataset = [];
  let cx = wd / 2;
  let cy = ht / 2;
  let rad = d3.min([ht / 2 - 20, wd / 2 - 20]);

  for (let i = 0; i < 100; i++) {
    let rnd = Math.random() * 100;
    let x = cx + rad * Math.cos((2 * Math.PI * rnd) / 100);
    let y = cy + rad * Math.sin((2 * Math.PI * rnd) / 100);

    rnd = Math.random() * 100;

    let x2 = cx + rad * Math.cos((2 * Math.PI * rnd) / 100);
    let y2 = cy + rad * Math.sin((2 * Math.PI * rnd) / 100);

    dataset.push([
      { x: x, y: y },
      { x: x2, y: y2 }
    ]);
  }

  return dataset;
}

function angleWheelR(wd,ht) {
  //f2
  let dataset = [];
  let cx = wd / 2;
  let cy = ht / 2;
  let rad = d3.min([ht / 2 - 20, wd / 2 - 20]);
  let rad_two = Math.random() * rad;

  for (let i = 0; i < 100; i++) {
    let x = cx + rad * Math.cos((2 * Math.PI * i) / 100);
    let y = cy + rad * Math.sin((2 * Math.PI * i) / 100);
    let x2 = cx + rad_two * Math.cos((2 * Math.PI * (i + 2)) / 100);
    let y2 = cy + rad_two * Math.sin((2 * Math.PI * (i + 2)) / 100);

    dataset.push([
      { x: x, y: y },
      { x: x2, y: y2 }
    ]);
  }

  return dataset;
}

function madStar(wd,ht) {
  let dataset = [];
  let cx = wd / 2;
  let cy = ht / 2;
  let rad = d3.min([ht / 2 - 20, wd / 2 - 20]);
  let rad_two = Math.random() * rad;

  for (let i = 0; i < 100; i++) {
    let x = cx + rad * Math.cos((2 * Math.PI * i) / 100);
    let y = cy + rad * Math.sin((2 * Math.PI * i) / 100);
    let x2 = cx + rad_two * Math.cos((2 * Math.PI * (i + 50)) / 100);
    let y2 = cy + rad_two * Math.sin((2 * Math.PI * (i + 50)) / 100);

    dataset.push([
      { x: x, y: y },
      { x: x2, y: y2 }
    ]);
  }

  return dataset;
}

function megaStar(wd,ht) {
  let dataset = [];
  let cx = wd / 2;
  let cy = ht / 2;
  let rad = d3.min([ht / 2 - 20, wd / 2 - 20]);


  for (let i = 0; i < 100; i++) {
    let x = cx + rad * Math.cos((2 * Math.PI * i) / 200);
    let y = cy + rad * Math.sin((2 * Math.PI * i) / 200);
    let x2 = cx + rad * Math.cos((2 * Math.PI * (i + 100)) / 200);
    let y2 = cy + rad * Math.sin((2 * Math.PI * (i + 100)) / 200);

    dataset.push([
      { x: x, y: y },
      { x: x2, y: y2 }
    ]);
  }

  return dataset;
}

function chevronStar(wd,ht) {
  let dataset = [];
  let cx = wd / 2;
  let cy = ht / 2;
  let rad = d3.min([ht / 2 - 20, wd / 2 - 20]);
  let rad_two = rad / 2;
  let depth = 2 + Math.random() * 20;

  for (let i = 0; i < 50; i++) {
    let x = cx + rad * Math.cos((2 * Math.PI * i) / 50);
    let y = cy + rad * Math.sin((2 * Math.PI * i) / 50);
    let x2 = cx + rad_two * Math.cos((2 * Math.PI * (i + depth)) / 50);
    let y2 = cy + rad_two * Math.sin((2 * Math.PI * (i + depth)) / 50);

    dataset.push([
      { x: x, y: y },
      { x: x2, y: y2 }
    ]);
    dataset.push([
      { x: x2, y: y2 },
      { x: cx, y: cy }
    ]);
  }

  return dataset;
}

function superMegaStar(wd,ht) {
  let dataset = [];
  let cx = wd / 2;
  let cy = ht / 2;
  let rad = d3.max([ht / 2 + 20, wd / 2 + 20]);

  for (let i = 0; i < 100; i++) {
    let x = cx + rad * 2 * Math.cos((2 * Math.PI * i) / 200);
    let y = cy + rad * 2 * Math.sin((2 * Math.PI * i) / 200);
    let x2 = cx + rad * 2 * Math.cos((2 * Math.PI * (i + 100)) / 200);
    let y2 = cy + rad * 2 * Math.sin((2 * Math.PI * (i + 100)) / 200);

    dataset.push([
      { x: x, y: y },
      { x: x2, y: y2 }
    ]);
  }

  return dataset;
}

function megaSpiroStar(wd,ht) {
  let dataset = [];
  let cx = wd / 2;
  let cy = ht / 2;
  let rad = d3.min([ht / 2 - 20, wd / 2 - 20]);

  let newDist = Math.random() * 60 + 20;

  for (let i = 0; i < 100; i++) {
    let x = cx + rad * Math.cos((2 * Math.PI * i) / 100);
    let y = cy + rad * Math.sin((2 * Math.PI * i) / 100);
    let x2 = cx + rad * Math.cos((2 * Math.PI * (i + newDist)) / 100);
    let y2 = cy + rad * Math.sin((2 * Math.PI * (i + newDist)) / 100);

    dataset.push([
      { x: x, y: y },
      { x: x2, y: y2 }
    ]);
  }

  return dataset;
}

function smallerSpiroStar(wd,ht) {
  let dataset = [];
  let cx = wd / 2;
  let cy = ht / 2;
  let rad = d3.min([ht / 2 - 20, wd / 2 - 20]);
  rad = rad * 0.25 + rad * Math.random() * 0.75;
  let newDist = Math.random() * 60 + 20;

  for (let i = 0; i < 100; i++) {
    let x = cx + rad * Math.cos((2 * Math.PI * i) / 100);
    let y = cy + rad * Math.sin((2 * Math.PI * i) / 100);
    let x2 = cx + rad * Math.cos((2 * Math.PI * (i + newDist)) / 100);
    let y2 = cy + rad * Math.sin((2 * Math.PI * (i + newDist)) / 100);

    dataset.push([
      { x: x, y: y },
      { x: x2, y: y2 }
    ]);
  }

  return dataset;
}

function doubleSpiroStar(wd,ht) {
  let dataset = [];
  let cx = wd / 2;
  let cy = ht / 2;
  let rad = d3.min([ht / 2 - 20, wd / 2 - 20]);
  rad = rad * 0.25 + rad * Math.random() * 0.5;
  let newDist = Math.random() * 60 + 20;

  for (let i = 0; i < 50; i++) {
    let x = cx + rad * Math.cos((2 * Math.PI * i) / 50);
    let y = cy + rad * Math.sin((2 * Math.PI * i) / 50);
    let x2 = cx + rad * Math.cos((2 * Math.PI * (i + newDist)) / 50);
    let y2 = cy + rad * Math.sin((2 * Math.PI * (i + newDist)) / 50);

    dataset.push([
      { x: x, y: y },
      { x: x2, y: y2 }
    ]);
  }

  rad = d3.min([ht / 2 - 20, wd / 2 - 20]);

  for (let i = 0; i < 50; i++) {
    let x = cx + rad * Math.cos((2 * Math.PI * i) / 50);
    let y = cy + rad * Math.sin((2 * Math.PI * i) / 50);
    let x2 = cx + rad * Math.cos((2 * Math.PI * (i + newDist)) / 50);
    let y2 = cy + rad * Math.sin((2 * Math.PI * (i + newDist)) / 50);

    dataset.push([
      { x: x, y: y },
      { x: x2, y: y2 }
    ]);
  }

  return dataset;
}

function manyPointStar(wd,ht) {
  //make a ziggy zagger
  let dataset = [];
  let cx = wd / 2;
  let cy = ht / 2;
  let rad = d3.min([ht / 2 - 20, wd / 2 - 20]);
  let rad_two = Math.random() * (rad * 0.6);
  let up = true;

  for (let k = 0; k < 5; k++) {


    for (let i = 0; i < 20; i++) {
      let iV = i + k * 0.5;
      if (up) {
        let x = cx + rad * Math.cos((2 * Math.PI * iV) / 20);
        let y = cy + rad * Math.sin((2 * Math.PI * iV) / 20);

        let x2 = cx + rad_two * Math.cos((2 * Math.PI * (iV + 1)) / 20);
        let y2 = cy + rad_two * Math.sin((2 * Math.PI * (iV + 1)) / 20);

        up = !up;
        dataset.push([
          { x: x, y: y },
          { x: x2, y: y2 }
        ]);
      } else {
        let x = cx + rad_two * Math.cos((2 * Math.PI * iV) / 20);
        let y = cy + rad_two * Math.sin((2 * Math.PI * iV) / 20);

        let x2 = cx + rad * Math.cos((2 * Math.PI * (iV + 1)) / 20);
        let y2 = cy + rad * Math.sin((2 * Math.PI * (iV + 1)) / 20);

        up = !up;
        dataset.push([
          { x: x, y: y },
          { x: x2, y: y2 }
        ]);
      }
    } //i
  } //k

  return dataset;
}

function fiftyPointStar(wd,ht) {
  //f2

  //make a ziggy zagger
  let dataset = [];
  let cx = wd / 2;
  let cy = ht / 2;
  let rad = d3.min([ht / 2 - 20, wd / 2 - 20]);
  let rad_two = Math.random() * (rad * 0.6);
  let up = true;

  for (let i = 0; i < 100; i++) {
    if (up) {
      let x = cx + rad * Math.cos((2 * Math.PI * i) / 100);
      let y = cy + rad * Math.sin((2 * Math.PI * i) / 100);

      let x2 = cx + rad_two * Math.cos((2 * Math.PI * (i + 1)) / 100);
      let y2 = cy + rad_two * Math.sin((2 * Math.PI * (i + 1)) / 100);

      up = !up;
      dataset.push([
        { x: x, y: y },
        { x: x2, y: y2 }
      ]);
    } else {
      let x = cx + rad_two * Math.cos((2 * Math.PI * i) / 100);
      let y = cy + rad_two * Math.sin((2 * Math.PI * i) / 100);

      let x2 = cx + rad * Math.cos((2 * Math.PI * (i + 1)) / 100);
      let y2 = cy + rad * Math.sin((2 * Math.PI * (i + 1)) / 100);

      up = !up;
      dataset.push([
        { x: x, y: y },
        { x: x2, y: y2 }
      ]);
    }
  }

  return dataset;
}

function weirdStar(wd,ht) {
  //f2

  //make a ziggy zagger
  let dataset = [];
  let cx = wd / 2;
  let cy = ht / 2;
  let rad = d3.min([ht / 2 - 20, wd / 2 - 20]);
  let rad_two = Math.random() * (rad * 0.6);
  let up = true;

  for (let i = 0; i < 100; i++) {
    if (up) {
      let x = cx + rad * Math.cos((2 * Math.PI * i) / 100);
      let y = cy + rad * Math.sin((2 * Math.PI * i) / 100);

      let x2 = cx + rad_two * Math.cos((3 * Math.PI * (i + 1)) / 100);
      let y2 = cy + rad_two * Math.sin((3 * Math.PI * (i + 1)) / 100);

      up = !up;
      dataset.push([
        { x: x, y: y },
        { x: x2, y: y2 }
      ]);
    } else {
      let x = cx + rad_two * Math.cos((3 * Math.PI * i) / 100);
      let y = cy + rad_two * Math.sin((3 * Math.PI * i) / 100);

      let x2 = cx + rad * Math.cos((2 * Math.PI * (i + 1)) / 100);
      let y2 = cy + rad * Math.sin((2 * Math.PI * (i + 1)) / 100);

      up = !up;
      dataset.push([
        { x: x, y: y },
        { x: x2, y: y2 }
      ]);
    }
  }

  return dataset;
}

function angleWheelL(wd,ht) {
  //f3
  let dataset = [];
  let cx = wd / 2;
  let cy = ht / 2;
  let rad = d3.min([ht / 2 - 20, wd / 2 - 20]);
  let rad_two = Math.random() * rad;

  for (let i = 0; i < 100; i++) {
    let x = cx + rad * Math.cos((2 * Math.PI * i) / 100);
    let y = cy + rad * Math.sin((2 * Math.PI * i) / 100);
    let x2 = cx + rad_two * Math.cos((2 * Math.PI * (i - 2)) / 100);
    let y2 = cy + rad_two * Math.sin((2 * Math.PI * (i - 2)) / 100);

    dataset.push([
      { x: x, y: y },
      { x: x2, y: y2 }
    ]);
  }

  return dataset;
}

function circleWheel(wd,ht) {
  //f1
  let dataset = [];
  let cx = wd / 2;
  let cy = ht / 2;
  let rad = d3.min([ht / 2 - 20, wd / 2 - 20]);

  for (let i = 0; i < 50; i++) {
    let x = cx + rad * Math.cos((2 * Math.PI * i) / 50);
    let y = cy + rad * Math.sin((2 * Math.PI * i) / 50);
    let x2 = cx + rad * Math.cos((2 * Math.PI * (i + 1)) / 50);
    let y2 = cy + rad * Math.sin((2 * Math.PI * (i + 1)) / 50);

    dataset.push([
      { x: x, y: y },
      { x: x2, y: y2 }
    ]);

    x = cx + rad * Math.cos((2 * Math.PI * i) / 50);
    y = cy + rad * Math.sin((2 * Math.PI * i) / 50);
    x2 = cx;
    y2 = cy;

    dataset.push([
      { x: x, y: y },
      { x: x2, y: y2 }
    ]);
  }
  //dataset.push(dataset[0])
  return dataset;
}

function circleWheelInside(wd,ht) {
  //f1
  let dataset = [];
  let cx = wd / 2;
  let cy = ht / 2;
  let rad = d3.min([ht / 2 - 20, wd / 2 - 20]);
  let rad_two = rad * 0.75;

  for (let i = 0; i < 50; i++) {
    let x = cx + rad_two * Math.cos((2 * Math.PI * i) / 50);
    let y = cy + rad_two * Math.sin((2 * Math.PI * i) / 50);
    let x2 = cx + rad_two * Math.cos((2 * Math.PI * (i + 1)) / 50);
    let y2 = cy + rad_two * Math.sin((2 * Math.PI * (i + 1)) / 50);

    dataset.push([
      { x: x, y: y },
      { x: x2, y: y2 }
    ]);

    x = cx + rad * Math.cos((2 * Math.PI * i) / 50);
    y = cy + rad * Math.sin((2 * Math.PI * i) / 50);
    x2 = cx;
    y2 = cy;

    dataset.push([
      { x: x, y: y },
      { x: x2, y: y2 }
    ]);
  }
  //dataset.push(dataset[0])
  return dataset;
}

function geometricStarCannon(wd,ht) {
  let dataset = [];
  let cx = wd / 2;
  let cy = ht / 2;
  let rad = d3.min([ht / 2 - 20, wd / 2 - 20]);
 

  for (let i = 0; i < 10; i++) {
    let ncx = cx + rad * Math.cos((2 * Math.PI * i) / 10);
    let ncy = cy + rad * Math.sin((2 * Math.PI * i) / 10);
    for (let j = 0; j < 10; j++) {
      let x = ncx + rad * Math.cos((2 * Math.PI * j) / 10);
      let y = ncy + rad * Math.sin((2 * Math.PI * j) / 10);
      let x2 = ncx + rad * Math.cos((2 * Math.PI * (j + 1)) / 10);
      let y2 = ncy + rad * Math.sin((2 * Math.PI * (j + 1)) / 10);
      dataset.push([
        { x: x, y: y },
        { x: x2, y: y2 }
      ]);
    }
  }
  return dataset;
}

function geometricStarCannonTwo(wd,ht) {
  let dataset = [];
  let cx = wd / 2;
  let cy = ht / 2;
  let rad = d3.min([ht / 2 - 20, wd / 2 - 20]);


  for (let i = 0; i < 20; i++) {
    let ncx = cx + rad * Math.cos((2 * Math.PI * i) / 20);
    let ncy = cy + rad * Math.sin((2 * Math.PI * i) / 20);
    for (let j = 0; j < 5; j++) {
      let x = ncx + rad * Math.cos((2 * Math.PI * j) / 5);
      let y = ncy + rad * Math.sin((2 * Math.PI * j) / 5);
      let x2 = ncx + rad * Math.cos((2 * Math.PI * (j + 1)) / 5);
      let y2 = ncy + rad * Math.sin((2 * Math.PI * (j + 1)) / 5);
      dataset.push([
        { x: x, y: y },
        { x: x2, y: y2 }
      ]);
    }
  }
  return dataset;
}
