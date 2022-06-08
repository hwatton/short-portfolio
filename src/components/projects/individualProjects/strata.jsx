import * as d3 from "d3";

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
  const lineFunction = (array, num) => {
    const liner = d3
      .line()
      .x((d) => d.x)
      .y((d) => d.y)
      .curve(d3.curveCardinal.tension(num));

    return liner(array);
  };

  const colScale =  (n) => {
        const scl = d3
          .scaleLinear()
          .range(colours)
          .domain([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]);

        return scl(n);
      }
    

  const ht = props.dims.height ? Math.min(props.dims.height *0.8, 600) : 300;
  const wd = props.dims.width ? Math.min(props.dims.width *0.8, 800) : 400;
  const numLines = 50;
  const ySpacing = ht / numLines;

  const xScale = d3
    .scaleLinear()
    .range([-50, wd + 50])
    .domain([0, 4]);

  const masterLine = [...Array(5)].map((el, i) => {
    return {
      x: xScale(i),
      y: -(ht / 2) + (ht / 2) * (Math.random() * 2 - 1)
    };
  });

  const lines = [...Array(numLines)].map((el, i) => {
    let mLine = [...masterLine].map((element, index) => {
      return { x: element.x, y: (element.y * i * 2) / numLines };
    });

    mLine.push({ x: xScale(4), y: ht + 50 }, { x: -50, y: ht + 50 });
    const col = colScale(Math.random());

    return (
      <g
        key={"lineGroup" + i}
        style={{
          transform: "translate(0px, " + ySpacing * i * 2.9 + "px)"
        }}
      >
        <path
          d={lineFunction(mLine, 0.4) + "z"}
          style={{
            stroke: col,
            strokeWidth: "3px",
            fill: col,
            fillOpacity: 0.18
          }}
        />
      </g>
    );
  });

  return (
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
      {lines}
    </svg>
  );
}

export default Strata;
