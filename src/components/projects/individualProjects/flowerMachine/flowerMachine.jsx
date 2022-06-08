import React, { useState, useEffect } from "react";
import "./flowerStyles.css";
import Flower from "./flower.jsx";
import flowerData from "./flowerData.js";

export default function FlowerMachine(props) {

  const startData = [
    { step: "1", id: "box_1", name: "Size", value: 125 },
    { step: "1", id: "box_2", name: "Minimum Petals", value: 5 },
    { step: "1", id: "box_3", name: "Maximum Petals:", value: 20 },
    { step: "1", id: "box_4", name: "Number of Flowers:", value: 6 },
    { step: "2", id: "box_5", name: "Stroke-width:", value: 1 }
  ];

  const [dataInputs, setDataInputs] = useState(startData);
  const [dontReload, setDontReload]  = useState(false)
useEffect(()=>{
if (props.dims.width && !dontReload) {
  console.log("running")
  setDontReload(true)
  setDataInputs([
      { step: "1", id: "box_1", name: "Size", value: Math.max(50, Math.floor(props.dims.width*0.17)) },
      { step: "1", id: "box_2", name: "Minimum Petals", value: 5 },
      { step: "1", id: "box_3", name: "Maximum Petals:", value: 20 },
      { step: "1", id: "box_4", name: "Number of Flowers:", value: 10 },
      { step: "2", id: "box_5", name: "Stroke-width:", value: 1 }
    ])
}
},[props, dontReload])


  const [sliderVal, setSliderVal] = useState("50");

  function editData(e) {
    let obj = dataInputs.find((x) => x.id === e.target.id);
    let index = dataInputs.indexOf(obj);

    let dt = [...dataInputs];
    dt[index].value = parseInt(e.target.value, 10);

    setDataInputs(dt);
  }

  const inputBoxes = dataInputs.map((item, i) => (
    <div className="inputCard" key={"inputCard_" + i}>
      <div className="dataTextholder">
        <p className="dataText">{item.name}</p>
      </div>
      <input
        className="flowerInput"
        id={item.id}
        key={item.id + "_" + i}
        onChange={(e) => editData(e)}
        type="number"
        step={item.step}
        value={item.value}
      ></input>
    </div>
  ));
  inputBoxes.push(
    <div className="slidecontainer" key={"inputCard_slider"}>
      <p className="dataText">Jank factor</p>
      <input
        key={"sliderBox"}
        type="range"
        min="0"
        max="100"
        value={sliderVal}
        onChange={(e) => setSliderVal(e.target.value)}
        className="slider"
        id="myRange"
      />
    </div>
  );

  let flowerNumber = dataInputs[3].value;
  let flowerComps = [];
  let minP = dataInputs[1].value;
  let maxP = dataInputs[2].value;
  let size = dataInputs[0].value;
  let strokeSize = dataInputs[4].value;

  for (let i = 0; i < flowerNumber; i++) {
    let petals = minP + Math.floor(Math.random() * (maxP - minP));
    let dt = flowerData(size, size, petals, sliderVal);

    let element = (
      <Flower
        key={`key_${i}`}
        id={i}
        stroke={strokeSize}
        data={dt}
        height={size}
        width={size}
      />
    );
    flowerComps.push(element);
  }
  
  const titleText = props.dims.width > 500 ? "*** The Flower Machine ***" : "The Flower Machine"

  return (
    <div style={{
      maxWidth: "90%"
    }}>
      <div className="headerTitle">{titleText}</div>
      <div className="flexHolder">
        <div className="inputBoxes">{inputBoxes}</div>
        <br />
        <div
          style={{
            borderStyle: "solid",
            borderWidth: "0.5px",
            borderColor: "grey"
          }}
        >
          <div className="flowers">{dontReload && flowerComps}</div>
        </div>
      </div>
      <br />
      <div style={{
        padding: "20px",
        backgroundColor: "black",
        border: "1px solid white",
        marginBottom: "20px"
      }}>
        <p>This machine was made to generate some sort of wonky flower shapes for a friend who wanted to cnc lots of similar, but unique flowers.</p>
        <p>That's why there's a text string under the flower, so we could easily copy it and use it elsewhere. </p>
        <p>Slide the Jank Factor around to shake some JANK into them flowers!</p>
      </div>
    </div>
  );
}