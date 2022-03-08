import { useEffect, useRef } from "react";
import * as d3 from "d3";

function ChasR() {
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

  const size = 14;
  const r = 5.5;

  const ht = size * r * 4;
  const wd = size * r * 4;

  let locations = [];

  const startRow = Math.floor(size / 2);
  const startCol = Math.floor(size / 2);

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      locations.push({
        id: "id_" + j + "_" + i,
        fill: 0,
        row: i,
        col: j,
        x: r * 2 + i * r * 4,
        y: r * 2 + j * r * 4
      });
    }
  }

  const pos = startRow * size + startCol;

  locations[pos].id = "empty";
  // locations is a reference to all positions.........

  const circles = locations;

  useEffect(() => {
    // use d3 to manually add these to the dom

    if (svgRef.current) {
      const svgC = d3.select(svgRef.current);

      svgC.selectAll(".movingCircle").remove();

      svgC
        .selectAll("circle")
        .data(
          circles.filter((d) => {
            return d.id !== "empty";
          })
        )
        .enter()
        .append("circle")
        .attr("class", "movingCircle")
        .attr("id", (d) => {
          return d.id;
        })
        .attr("cx", (d) => {
          return d.x;
        })
        .attr("cy", (d) => {
          return d.y;
        })
        .attr("r", r)
        .attr("fill", (d) => {
          return colScale(d.fill);
        });
    }

    moveEmAbout(circles);
  }, [svgRef]);

  function moveEmAbout(circleInput) {
    //OK, get rid of the state. just pass the chnaging
    //empty position back into the function

    const emptyCell = circleInput.filter((d) => {
      return d.id === "empty";
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
    // TINGKKLKLKLKLK
    //  console.log({ cols: tC, rows: tR });

    const newCell = circleInput.filter((d) => {
      return d.row === tR && d.col === tC;
    })[0];

    d3.select("#" + newCell.id)

      .transition()
      .duration(150)
      .attr("fill", () => {
        return colScale(newCell.fill + 0.7);
      })
      .attr("cx", emptyCell.x)
      .attr("cy", emptyCell.y)
      .on("end", () => {
        const newCircles = [...circleInput].map((el, i) => {
          let tmp = { ...el };
          if (el.row === emptyCell.row && el.col === emptyCell.col) {
            tmp.id = newCell.id;
            tmp.fill = limitR(
              newCell.fill + (0.3 + Math.random() * 0.7),
              10,
              0
            );
          }

          if (el.row === tR && el.col === tC) {
            tmp.id = "empty";
          }
          return tmp;
        });

        moveEmAbout(newCircles);
      });
  }

  return (
    <div>
      <svg
        ref={svgRef}
        style={{
          backgroundColor: "black", paddingBottom: "0px"
        }}
        height={ht}
        width={wd}
      ></svg>
    </div>
  );
}

export default ChasR;

function limitR(num, upperLimit, lowerLimit) {
  let returnValue = num;

  if (num > upperLimit) {
    returnValue = lowerLimit;
  }

  return returnValue;
}
