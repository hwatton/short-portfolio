import * as d3 from "d3";
import {useState} from "react"
import {motion} from "framer-motion"
import useTimeout from "../../../helpers/useTimeout";

const lineFunction = (array, num) => {
  const liner = d3
    .line()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(d3.curveCardinal.tension(num));

  return liner(array);
};

function getNewLineData(height, width, cScl, nmLine) {
const scaleNum = 13
const spreadR = 250 + Math.floor(Math.random()*1000)
  const xScl = d3
    .scaleLinear()
    .range([-spreadR, width + spreadR])
    .domain([0, scaleNum]);

  const ht = height
  const masterLine = [...Array(scaleNum + 1)].map((el, i) => {
    return {
      x: xScl(i),
      y: -(ht / 2) + (ht / 2) * (Math.random() * 2 - 1)
    };
  });

  const lineData = [...Array(nmLine)].map((el, i) => {
    let mLine = [...masterLine].map((element, index) => {
      return { x: element.x, y: -80 + (element.y * i * 1.5) / nmLine };
    });

    mLine.push({ x: xScl(12), y: ht + 50 }, { x: -50, y: ht + 50 });
    const col = cScl(Math.random());

    return ({path: lineFunction(mLine, 0.4) + "z", colour: col})
  });

  return lineData
}

function Strata(props) {
  const colours = [
    "rgb(255,0,205)",
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
  

  const colScale =  (n) => {
        const scl = d3
          .scaleLinear()
          .range(colours)
          .domain([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]);

        return scl(n);
      }
    

  const ht = props.dims.height ? Math.min(props.dims.height *0.75, 580) : 300;
  const wd = props.dims.width ? Math.min(props.dims.width *0.8, 800) : 400;
  const numLines = 50;
  const ySpacing = ht / numLines;


  

    const [lineData, setLineData] = useState([])
    const [hasLoaded, setHasLoaded] = useState(false)

    useTimeout(() => {
      setLineData(getNewLineData(ht, wd, colScale, numLines))
      setHasLoaded(true)
    }, 200);

  const motionLines = lineData.map((el,i)=>{
return (
  <g
        key={"lineGroup" + i}
        style={{
          transform: "translate(0px, " + ySpacing * i * 2.9 + "px)"
        }}
      >
        <motion.path
        initial={{
          d : el.path,
        }}
        animate={{
          d : el.path,
          stroke: el.colour,
          fill: el.colour,
          transition: {
            duration: 2,
            ease: "easeInOut"
          }
        }}
          
          style={{
            strokeWidth: "3px",
            fillOpacity: 0.18
          }}
        />
      </g>
)
  })

  return (
    <div>
    <svg
      height={ht}
      width={wd}
      style={{
        margin: "5px",
        border: "0.5px solid black",
        backgroundColor: "black",
        transform: "rotate(180deg)"
      }}
    >
      {hasLoaded && motionLines}
    </svg>
    <div style={{width: "100%"}}><motion.button
          onClick={()=>{setLineData(getNewLineData(ht, wd, colScale, numLines))}}
          animate={{
            borderColor: colours,
            transition: {
              duration: 12,
              repeat: Infinity
            }
          }}
          whileHover={{
            color: "rgb(255,255,255)"
          }}
          style={{
            color: "rgb(255,0,255)",
            borderStyle: "solid",
            borderWidth: "1px",
           
            padding: "10px",
            backgroundColor: "black",
            borderRadius: "3px",
            cursor: "pointer"
          }}

    >refresh me!</motion.button></div>
    
    </div>
  );
}

export default Strata;
