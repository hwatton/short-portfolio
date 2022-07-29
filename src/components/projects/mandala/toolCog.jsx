const ToolCog = (props) => {
    //originally 254 x 254
    const pathD =
      "M 26 -248L-26 -248C-42 -223 -43 -197 -44 -174L-94 -154C-109 -175 -125 -184 -160 -197L-197 -160C-184 -125 -175 -109 -154 -94L-174 -44C-197 -43 -223 -42 -248 -26L-248 26C-223 42 -197 43 -174 44L-154 94C-175 109 -184 125 -197 160L-160 197C-125 184 -109 175 -94 154L-44 174C-43 197 -42 223 -26 248L26 248C42 223 43 197 44 174L94 154C109 175 125 184 160 197L197 160C184 125 175 109 154 94L174 44C197 43 223 42 248 26L248 -26C223 -42 197 -43 174 -44L154 -94C175 -109 184 -125 197 -160L160 -197C125 -184 109 -175 94 -154L44 -174C43 -197 42 -223 26 -248 zM0 -80C44 -80 80 -44 80 0C80 44 44 80 0 80C-44 80 -80 44 -80 0C-80 -44 -44 -80 0 -80z";
  
    const data = [
      { tran: "scale(0.25) translate(100%, 100%)", col: "#981fac" },
      { tran: "scale(0.3) translate(230%, 190%) rotate(8deg) ", col: "#ff006a" },
      { tran: "scale(0.2) translate(130%, 400%) rotate(45deg) ", col: "#fe9900" }
    ];
  
    return (
      <svg
        style={{ margin: "10px" }}
        height={props.height}
        viewBox={"0 0 254 254"}
        preserveAspectRatio={"xMinYMin meet"}
      >
        {data.map((el, i) => {
          return (
            <path
              key={"cog_" + i}
              d={pathD}
              fill={el.col}
              style={{
                transform: el.tran
              }}
            />
          );
        })}
      </svg>
    );
  };
  
  export default ToolCog;
