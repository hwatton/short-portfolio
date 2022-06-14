import * as d3 from "d3";
import { useState } from "react";

function TwoDee() {
  const [ht, wd] = [500, 500];
  const lineF = d3
    .line()
    .x((d) => d.x)
    .y((d) => d.y);

  const spNum = 18;
  const [shrink, setShrink] = useState(60.8);
  const manySpirals = [...Array(spNum)].map((element, index) => {
    const pointNum = 500;

    const points = [...Array(pointNum)].map((el, i) => {
      let rad = i * shrink; //this value controls the spread of the spiral

      let x = rad * Math.cos(2 * Math.PI * i * ((index * 137.5 + 1) / 360));
      let y = rad * Math.sin(2 * Math.PI * i * ((index * 137.5 + 1) / 360));

      return { x: x, y: y };
    });

    return (
      <g
        key={"spiralPath_" + index}
        style={{
          transform:
            "translate(" +
            wd / 2 +
            "px, " +
            ht / 2 +
            "px) rotate(" +
            (index * 137.5 + index * Math.pow(shrink, 1.1)) +
            "deg)"
        }}
      >
        <path
          d={lineF(points)}
          style={{
            stroke: "purple",
            strokeWidth: "1px",
            fill: "none",
            strokeOpacity: "0.4"
          }}
        />
      </g>
    );
  });
  //generate 100 points in a spiral from the centre

  function handleChange(val) {
    setShrink(val);
  }

  return (
    <div style={{display: "block"}}>
      <br />
      <p>... accidental 2d spiral idea </p>
      <div>
      <input
        type="range"
        style={{ width: wd, marginBottom: "13px" }}
        max={90}
        step={0.5}
        value={shrink}
        min={1}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      />
      </div>
      <svg
        style={{
          backgroundColor: "rgb(228,219,224)"
        }}
        height={ht}
        width={wd}
      >
        {manySpirals}
      </svg>
      <br />
      
    </div>
  );
}

export default TwoDee;
