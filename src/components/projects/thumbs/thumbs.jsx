import { motion } from "framer-motion";
import * as d3 from "d3";

export function NeonThumb(props) {
  const wd = props.width;
  const ht = props.height;

  const lineF = d3
    .line()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(d3.curveBasis);


  const points = [...Array(12)].map((el, i) => {
    return { x: wd * Math.random(), y: ht * Math.random() };
  });

  const lNum = 6;
  const neonHackPaths = [...Array(lNum)].map((el, i) => {
    const opNum =
      1 - (0.0001 + Math.pow(lNum, 3) - i * i * i) / Math.pow(lNum, 3);

    return (
      <motion.path
        key={"neonThumbPath_" + i}
        d={lineF(points)}
        initial={{
          pathLength: 0
        }}
        animate={{
          pathLength: 1,
          transition: {
            duration: 5,
            repeat: "Infinity",
            repeatType: "reverse"
          }
        }}
        style={{
          stroke: "magenta",
          strokeWidth: (lNum - i) * 4 + "px",
          strokeLinecap: "round",
          fill: "none",
          strokeOpacity: opNum
        }}
      />
    );
  });

  return (
    <svg
      style={{
        backgroundColor: props.backgroundColor ? props.backgroundColor : "black"
      }}
      height={props.height}
      width={props.width}
    >
      {neonHackPaths}
    </svg>
  );
}

export function HunSpin(props) {
  
  const lineNum = props.lineNum ? props.lineNum : 25;
  const lines = [...Array(lineNum)].map((el, i) => {
    return (
      <motion.path
        key={"hunSpinLine_" + i}
        style={{
          strokeWidth: "1.5px",
          transform: "rotate(" + (i * 360) / lineNum + "deg)"
        }}
        initial={{
          stroke: "rgb(11,11,22)"
        }}
        animate={{
          stroke: [
            "rgb(255,0,0)",
            "rgb(255,0,255)",
            "rgb(0,0,255)",
            "rgb(0,255,255)",
            "rgb(0,255,0)",
            "rgb(255,255,0)",
            "rgb(255,0,0)"
          ],
          transition: {
            duration: 9,
            repeat: "Infinity"
          }
        }}
        d={"M-"+props.height*0.1 +",0L0," + (props.height / 2 - 2)}
      />
    );
  });

  return (
    <svg
      style={{
        backgroundColor: props.backgroundColor ? props.backgroundColor : "black"
      }}
      height={props.height}
      width={props.width}
    >
      <g
        style={{
          transform:
            "translate( " + props.width / 2 + "px, " + props.height / 2 + "px)"
        }}
      >
        <motion.g
          animate={{
            rotate: 360,
            transition: {
              repeat: "Infinity",
              duration: 13,
              ease: "linear"
            }
          }}
        >
          {lines}
        </motion.g>
      </g>
    </svg>
  );
}


export function BipThumble(props) {
    const wd = props.width;
    const ht = props.height;
  
    const locations = [
      [
        { x: wd * 0.25, y: ht * 0.25 },
        { x: wd * 0.75, y: ht * 0.25 },
        { x: wd * 0.75, y: ht * 0.75 },
        { x: wd * 0.25, y: ht * 0.75 }
      ],
      [
        { x: wd * 0.25, y: ht * 0.75 },
        { x: wd * 0.25, y: ht * 0.25 },
        { x: wd * 0.75, y: ht * 0.25 },
        { x: wd * 0.75, y: ht * 0.75 }
      ],
      [
        { x: wd * 0.75, y: ht * 0.75 },
        { x: wd * 0.25, y: ht * 0.75 },
        { x: wd * 0.25, y: ht * 0.25 },
        { x: wd * 0.75, y: ht * 0.25 }
      ],
      [
        { x: wd * 0.75, y: ht * 0.25 },
        { x: wd * 0.75, y: ht * 0.75 },
        { x: wd * 0.25, y: ht * 0.75 },
        { x: wd * 0.25, y: ht * 0.25 }
      ]
    ];
  
    const dots = locations.map((el, i) => {
      return (
        <motion.circle
          key={"bipThumbledot_" + i}
          fill={"yellow"}
          r={ht / 9}
          animate={{
            fill: [
              "rgb(255,255,0)",
              "rgb(255,0,255)",
              "rgb(25,50,255)",
              "rgb(25,255,25)",
              "rgb(255,255,0)"
            ],
            cx: [el[0].x, el[1].x, el[2].x, el[3].x],
            cy: [el[0].y, el[1].y, el[2].y, el[3].y],
            transition: {
              duration: 4,
              repeat: "Infinity"
            }
          }}
        />
      );
    });
    return (
      <svg
        style={{
          backgroundColor: props.backgroundColor ? props.backgroundColor : "black"
        }}
        height={props.height}
        width={props.width}
      >
        {dots}
      </svg>
    );
  }

  
 

