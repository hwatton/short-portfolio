import * as d3 from "d3";
import React, { useRef, useEffect } from "react";

const Flower = (props) => {
  const d3Container = useRef(null);

  useEffect(() => {
    const svgC = d3.select(d3Container.current);
    const path_id = "path_" + props.id;
    const srchID = "#" + path_id;
    const strWid = props.stroke + "px";

    d3.select(srchID).remove();

    const update = svgC
      .append("path")
      .attr("class", "flowerPath")
      .attr("id", path_id)
      .attr("d", props.data)
      .attr("fill", "none")
      .style("stroke", () => d3.interpolateRainbow(Math.random()))
      .style("stroke-width", strWid);

    update.exit().remove();
  }, [props]);

  return (
    <div className="container">
      <svg
        className="d3-component"
        width={props.width}
        height={props.height}
        ref={d3Container}
      />
      <div
        className="dataString"
        style={{
          width: props.width * 0.8,
          overflow: "hidden",
          fontSize: "8px",
          padding: props.width * 0.09
        }}
      >
        <p>{props.data}</p>
      </div>
    </div>
  );
};

export default Flower;
