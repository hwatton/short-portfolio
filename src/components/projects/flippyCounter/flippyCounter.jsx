import useInterval from "../../../helpers/useInterval";
import { useState } from "react";
import {motion} from 'framer-motion'

function FlippyCounter() {
  const [num, setNum] = useState(1);
  const [del, setDel] = useState(null);

  useInterval(() => {
    let newNum = Math.floor(Math.random() * 99);

    setNum(newNum);
  }, del);

  function handleClick() {
    if (del) {
      setDel(null);
    } else {
      setDel(800);
    }
  }

  const buttonStyle = {
      position: "absolute",
    backgroundColor: "black",
    border: "2px solid rgb(220,0,220)",
    borderRadius: "10px",
    color: "white",
    padding: "10px",
    bottom: 0,
    left: "50%",
    transform: "translate(-50%,0%)",
    cursor: "pointer",
    marginBottom: "10px"
  };

  return (
    <div style={{position: "relative", width: "100%", height: "330px",backgroundColor: "black",
    border: "2px solid rgb(220,0,220)",
    borderRadius: "10px", }}>
      <button
        style={buttonStyle}
        onClick={() => {
          handleClick();
        }}
      >
        {del > 10 ? "pause" : "start"}
      </button>

      <SevenSectionNumber number={num} />
    </div>
  );
}




const colours = [
  "rgb(255,0,0)",
  "rgb(255,255,0)",
  "rgb(255,0,255)",
  "rgb(0,255,255)",
  "rgb(195,255,0)",
  "rgb(255,255,255)"
];

function SevenSectionNumber(props) {
  const arrangements = [
    [1, 1, 1, 1, 0, 1, 1], //0
    [0, 1, 1, 0, 0, 0, 0], //1
    [0, 1, 0, 1, 1, 1, 1], //2
    [0, 1, 1, 0, 1, 1, 1], //3
    [1, 1, 1, 0, 1, 0, 0], //4
    [0, 1, 1, 0, 1, 1, 1], //5
    [1, 0, 1, 1, 1, 1, 1], //6
    [0, 1, 1, 0, 0, 1, 0], //7
    [1, 1, 1, 1, 1, 1, 1], //8
    [1, 1, 1, 0, 1, 1, 1] //9
  ];

  const units = props.number - 10 * Math.floor(props.number / 10);
  const tens = Math.floor(props.number / 10);

  return (
    <div
      style={{
        position: "relative"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "320px",
          padding: "0px",
          backgroundColor: "black",
          marginTop: "10px"
        }}
      >
        <div style={{ width: "150px" }}>
          <svg viewBox={"0 0 62 100"}>
            <PathSections data={arrangements[tens]} keyNum={1} />
          </svg>
        </div>
        <div style={{ width: "150px" }}>
          <svg viewBox={"0 0 62 100"}>
            <PathSections data={arrangements[units]} keyNum={2} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function PathSections(props) {
  const pathData = [
    "M20,10L25,15L20,45.3L14,50L10,46L15,15z",
    "M50,10L55,15L50,45L44,50L40,46L45,15z",
    "M44,50L49,55L44,86L38.6,91L34,87L39,55z",
    "M14,50L19,55L14,86.3L8,91L4,86L9,55z",
    "M20,46L39,46L43,50L38,55L20,55L15,50z",
    "M26,6L45,6L49,10L44,15L26,15L21,10z",
    "M14,87L33,87L38,91.5L32,96L14,96L8.5,91.5z"
  ];

  const newColour = colours[Math.floor(Math.random() * colours.length)];

  const paths = props.data.map((el, i) => {
    return el === 1 ? (
      <motion.path
        key={"path_section" + i + props.keyNum}
        d={pathData[i]}
        initial={{
          fill: "rgb(255,255,255)"
        }}
        animate={{
          fill: newColour,
          transition: {
            delay: Math.random() * 7 * 0.02
          }
        }}
      />
    ) : null;
  });

  return <>{paths}</>;
}

export default FlippyCounter;
