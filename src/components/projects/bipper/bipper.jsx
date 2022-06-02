import { useRef, useState } from "react";
import * as d3 from "d3";
import { motion } from "framer-motion";
import useInterval from "../../../helpers/useInterval";

function Bipper(props) {
  /*props: 
size: grid size
r: radius of circles
now also recieves dims.height / dims.width via window.
use this to make the grid size different, or maybe toggleable
also make it shrink depending on the size of the window
*/


  const size = props.gridSize;
  const r = props.radius;

 

  const svgRef = useRef();
  const colours = [
    "rgb(120,0,210)",
    "rgb(50,170,250)",
    "rgb(100,250,175)",
    "rgb(125,255,0)",
    "rgb(255,255,0)",
    "rgb(255,125,0)",
    "rgb(255,0,0)",
    "rgb(255,0,205)",
    "rgb(120,0,210)"
  ];
 
  const colScale = d3
    .scaleLinear()
    .range(colours)
    .domain([0, 1.25, 2.5, 3.75, 5, 6.25, 7.5, 8.75, 10, 11.25]);

  const ht = size * r * 4;
  const wd = size * r * 4;

  let initLocations = [];

  const startRow = Math.floor(size / 2);
  const startCol = Math.floor(size / 2);

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      initLocations.push({
        id: "id_" + j + "_" + i,
        fill: 0,
        row: i,
        col: j,
        x: r * 2 + i * r * 4,
        y: r * 2 + j * r * 4,
        empty: false
      });
    }
  }

  const pos = startRow * size + startCol;

  initLocations[pos].empty = true;

  const [locations, setLocations] = useState(initLocations);
  // locations is a reference to all positions.........

  //below: the logic.
  function selectAndMove(data) {
    const emptyCell = data.filter((d) => {
      return d.empty === true;
    })[0];

    const eR = emptyCell.row;
    const eC = emptyCell.col;

    const num = Math.floor(Math.random() * 4);
    let tC;
    let tR;
    switch (num) {
      case 1:
        tC = eC - 1;
        tR = eR;

        break;
      case 2:
        tC = eC + 1;
        tR = eR;

        break;
      case 3:
        tC = eC;
        tR = eR + 1;

        break;
      case 0:
        tC = eC;
        tR = eR - 1;

        break;

      default:
        console.log("switch failed");
    }

    if (tC < 0) {
      tC = 1;
    }
    if (tC > size - 1) {
      tC = size - 2;
    }
    if (tR < 0) {
      tR = 1;
    }
    if (tR > size - 1) {
      tR = size - 2;
    }
    // now tC, tR is defined.

    const newCellObj = data.filter((d) => {
      return d.row === tR && d.col === tC;
    })[0];

    let newLocations = [...locations];
    /*
     * at this point,
     * newCellObject is the data of the circle that's going to move.
     * emptyCell is the locations entry that's empty
     
*/

    const targetIndex = data.findIndex((d) => {
      return d.id === newCellObj.id;
    });

    const emptyIndex = data.findIndex((d) => {
      return d.id === emptyCell.id;
    });

    // ^ look for it in the original data, not the new array

    //below : there's clearly a way of setting the object in one go, probably with a spread.

    const newEmptyCellData = {
      ...data[targetIndex],
      ...{
        empty: false,

        x: emptyCell.x,
        y: emptyCell.y,
        row: emptyCell.row,
        col: emptyCell.col,
        fill: limitR(newCellObj.fill + (0.3 + Math.random() * 0.7), 10, 0)
      }
    };

    const newMovedCellData = {
      ...data[emptyIndex],
      ...{
        empty: true,
        x: newCellObj.x,
        y: newCellObj.y,
        row: newCellObj.row,
        col: newCellObj.col
      }
    };

    newLocations[emptyIndex] = newMovedCellData;
    newLocations[targetIndex] = newEmptyCellData;

    return newLocations;
  }

  const [running, setRunning] = useState(true);
  const initDelay = 100;
  const [delay, setDelay] = useState(initDelay);

  useInterval(() => {
    if (running) {
      setLocations(selectAndMove(locations));
    } else {
      setDelay(null);
    }
  }, delay);

  function handleClick() {
    if (running) {
      setRunning(false);
    } else {
      setRunning(true);
      setDelay(initDelay);
      setLocations(selectAndMove(locations));
    }
  }

  function handleReset() {
    setRunning(false);
    setLocations(initLocations);
  }

  const circleMaps = locations.map((el, i) => {
    return (
      !el.empty && (
        <motion.circle
          key={el.id}
          animate={{
            cx: el.x,
            cy: el.y,
            fill: colScale(el.fill),
            transition: {
              damping: 7,
              type: "spring",
              bounce: 3
            }
          }}
          id={el.id}
          r={r}
        />
      )
    );
  });

  return (
    <div
      style={{
        backgroundColor: "black",
        borderRadius: "10px",
        borderStyle: "solid",
        borderWidth: "2px",
        borderColor: "rgb(220,0,220)",
        padding: "10px",
        width: wd
      }}
     
    >
      <svg
        ref={svgRef}
        style={{
          backgroundColor: "black"
        }}
        height={ht}
        width={wd}
      >
        {circleMaps}
      </svg>
      <br />

      <motion.button
        style={{
          backgroundColor: "black",
          padding: "5px 20px 5px 20px",
          color: "rgb(255,255,255)",
          fontFamily: "Courier, sans-serif",
          fontSize: "20px",
          borderRadius: "10px",
          borderStyle: "solid",
          borderWidth: "3px",
          marginTop: "20px"
        }}
        animate={{
          borderColor: colours,
          transition: {
            repeat: "Infinity",
            duration: 10
          }
        }}
        whileHover={{
          color: running ? "rgb(255,0,255)"  : "rgb(150,255,150)"
        }}
        onClick={() => handleClick()}
      >
        {running ? "pause" : "start"}
      </motion.button>
      <motion.button
        style={{
          backgroundColor: "black",
          padding: "5px 20px 5px 20px",
          color: "rgb(255,255,255)",
          fontFamily: "Courier, sans-serif",
          fontSize: "20px",
          borderRadius: "10px",
          borderStyle: "solid",
          borderWidth: "3px",
          margin: "20px"
        }}
        animate={{
          borderColor: colours,
          transition: {
            repeat: "Infinity",
            duration: 10
          }
        }}
        whileHover={{
          color: running ? "rgb(255,0,255)" : "rgb(150,255,150)"
        }}
        onClick={() => handleReset()}
      >
        reset
      </motion.button>
    </div>
  );
}

export default Bipper;

function limitR(num, upperLimit, lowerLimit) {
  let returnValue = num;

  if (num > upperLimit) {
    returnValue = lowerLimit;
  }

  return returnValue;
}
