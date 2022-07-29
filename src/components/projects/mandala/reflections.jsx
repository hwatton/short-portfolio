const Reflections = (props) => {
    const arrayOfGroups = [...Array(12)].map((e, ind) => {
      const circleComponents = props.data.map((el, i) => {
        let element = (
          <g clipPath={"url(#clipSegment0)"} key={el.key}>
            <path
              d={el.path}
              style={{
                stroke: el.fill,
                strokeWidth: el.r * 2 + "px",
                fill: "none",
                strokeLinecap: "round"
              }}
            />
          </g>
        );
  
        return element;
      });
  
      const flippedComponents = props.data.map((el, i) => {
        let element = (
          <g clipPath={"url(#clipSegment23)"} key={el.key}>
            <path
              d={el.path}
              style={{
                stroke: el.fill,
                strokeWidth: el.r * 2,
                fill: "none",
                transformOrigin:
                  props.svgSize / 2 + "px " + props.svgSize / 2 + "px",
                transform: "scale(-1, 1)",
                strokeLinecap: "round"
              }}
            />
          </g>
        );
  
        return element;
      });
  
      return (
        <g
          key={"reflection" + ind}
          style={{
            transformOrigin:
              props.svgSize / 2 - 0 + "px " + (props.svgSize / 2 - 0) + "px",
            transform: "rotate(" + 30 * ind + "deg) "
          }}
        >
          {flippedComponents}
          {circleComponents}
        </g>
      );
    });
  
    return arrayOfGroups;
  };
  
  export default Reflections;
  