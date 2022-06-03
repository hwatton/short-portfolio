import * as d3 from "d3";
import { useState } from "react";

function Bonacci(props) {
  const [hMB, setHMB] = useState(1);
  const dims = props.dims;
  const maxB = 2;
  const minB = 0;

  const ht = dims ? dims.height * 0.6 : 0;
  const wd = dims ? dims.width * 0.9 : 0;

  const scale = Math.min(ht, wd) / 30;
  const cRadius = scale / 4;

  //here, put all the following calculation into an effect possibly
  //to avoid the error in using the unresolved values on
  //the first render

  const phi = (1 + Math.sqrt(5)) / 2;
  const gA = (360 - 360 / phi) * hMB;
  //console.log(phi, gA);
  let cirques = [];
  let plotNum = 1000;
  for (let i = 1; i < plotNum; i++) {
    //has to be starting from 1, not 0, like in an array.map
    const dist = Math.sqrt(i);
    const angle = gA * i - 1;
    const x = wd / 2 + dist * scale * Math.cos((angle * Math.PI) / 180);
    const y = ht / 2 + dist * scale * Math.sin((angle * Math.PI) / 180);

    cirques.push(
      <circle
        key={"fibCirque_" + i}
        cx={x}
        cy={y}
        r={cRadius}
        fill={d3.interpolateSinebow(((i * gA) % 360) / 360)}
      />
    );
  }

  return (
    <div>
      <svg
        height={ht}
        width={wd}
        style={{
          backgroundColor: "black",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)"
        }}
      >
        {cirques}
      </svg>

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "90%",
          transform: "translate(-50%, -50%)",
          padding: "0px 20px 20px 20px",
          backgroundColor: "rgba(0,0,0,0.8)",
          color: "white",
          fontFamily: "courier",
          border: "0.5px solid grey",
          borderRadius: "10px"
        }}
      >
        <div>
          <h4>
            {"howMany Bonaccis? " +
              parseFloat(hMB, 10).toFixed(4) +
              " " +
              (hMB === 1 ? "Bonacci" : "Bonaccis")}
          </h4>
        </div>

        <input
          type="range"
          style={{ width: wd * 0.8, height: "25px" }}
          min={minB}
          max={maxB}
          step={(maxB - minB) / 10000}
          value={hMB}
          onChange={(e) => setHMB(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Bonacci;
