import * as d3 from "d3";

export default function LineFuncBasis(data) {
  const lF = d3
    .line()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(d3.curveBasis);

  return lF(data);
}