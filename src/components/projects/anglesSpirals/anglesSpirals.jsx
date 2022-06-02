import {useState} from 'react'

const baseColours = [
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
  
  const randomColourArray = [...Array(500)].map(() => {
    return baseColours[Math.floor(Math.random() * baseColours.length)];
  });

function AnglesSpirals(props) {

  const size = props.dims.height? Math.max(Math.min(props.dims.height, props.dims.width)*0.5, 290) : 290
//314
    const [angle, setAngle] = useState(137.5);
    const [num, setNum] = useState(45);
    const [bW, setbW] = useState(false);
    const dims = { height: size, width: size };

    

return (
<div style={{
  display: "flex",
  flexWrap: "wrap",
  justifyContent:"center",
  alignItems: "center"
}} >
  <div style={{margin: "10px"}}>
        <Angler
          colours={randomColourArray}
          blackAndWhite={bW}
          angle={angle}
          shapeNumber={num}
          dims={dims}
        />
       </div>
       <div style={{margin: "10px"}}>
        <ControlPanel
          angle={angle}
          blackAndWhite={bW}
          handleColour={() => setbW(!bW)}
          shapeNumber={num}
          handleNumber={(v) => {
            setNum(v);
          }}
          handleAngle={(v) => setAngle(v)}
          dims={dims}
        />
     </div>
      </div>
)

        }

        function Angler(props) {
            const ht = props.dims.height;
            const wd = props.dims.width;
            const colours = props.colours;
            const angle = props.angle;
            const shapeNum = parseInt(props.shapeNumber, 10);
            const coeff = 0.1;
          
            const shapes = [...Array(shapeNum)]
              .map((el, i) => {
                const col = colours[i];
          
                return (
                  <g
                    key={"shape_" + i}
                    style={{
                      transform: "translate(" + wd / 2 + "px, " + ht / 2 + "px)"
                    }}
                  >
                    <path
                      d={
                        "M00,0Q" +
                        ht * coeff +
                        ", -" +
                        ht * coeff +
                        " " +
                        ht / 3 +
                        ", 0M" +
                        ht / 3 +
                        ",0Q" +
                        ht * coeff +
                        "," +
                        ht * coeff +
                        " 0,0"
                      }
                      style={
                        props.blackAndWhite
                          ? {
                              fill: "black",
                              stroke: "white",
                              strokeWidth: "1.5px",
                              fillOpacity: "1",
                              transform:
                                "rotate(" +
                                angle * i +
                                "deg) scale(" +
                                (0.2 + i / shapeNum) +
                                ")"
                            }
                          : {
                              fill: col,
                              stroke: col,
                              strokeWidth: "1.5px",
                              fillOpacity: "0.2",
                              transform:
                                "rotate(" +
                                angle * i +
                                "deg) scale(" +
                                (0.5 + i / shapeNum) +
                                ")"
                            }
                      }
                    />
                  </g>
                );
              })
              .reverse();
          
            return (
                <a href="https://codesandbox.io/s/golden-angles-lpngwm" target="_blank" rel="noopener noreferrer" >
              <svg
                height={ht}
                width={wd}
                style={{
                  backgroundColor: "black",
                  borderRadius: "10px"
                }}
              >
                {shapes}
              </svg>
              </a>
            );
          }
          
          function ControlPanel(props) {
            return (
              <div style={{
                backgroundColor: "black",
                padding: "10px 0px 30px 0px",
                borderRadius: "10px"
              }}>
                <div>
                  <div
                    style={{
                      margin: "10px",
                      width: props.dims.width - 20,
                      display: "flex",
                      justifyContent: "center",
                      columnGap: "50px"
                    }}
                  >
                    <div>
                      <input
                        type="radio"
                        id="b&w"
                        name="fav_language"
                        checked={props.blackAndWhite}
                        onChange={props.handleColour}
                      />
                        <label htmlFor="b&w">b&w</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="multiColour"
                        name="fav_language"
                        checked={!props.blackAndWhite}
                        onChange={props.handleColour}
                      />
                        <label htmlFor="multiColour">multiColour</label>
                    </div>
                  </div>
                  <div style={{ margin: "20px 10px 0px 10px" }}>
                    <p> {"number: " + props.shapeNumber}</p>
                    <input
                      type="range"
                      min={0}
                      max={200}
                      step={1}
                      value={props.shapeNumber}
                      onChange={(e) => props.handleNumber(e.target.value)}
                      style={{ width: props.dims.width * 0.8 }}
                    />
                  </div>
          
                  <div style={{ margin: "20px 10px 0px 10px" }}>
                    <p>{"angle: " + props.angle + "°"}</p>
          
                    <input
                      type="range"
                      style={{ width: props.dims.width * 0.8 }}
                      min={0}
                      max={360}
                      step={0.5}
                      value={props.angle}
                      onChange={(e) => props.handleAngle(e.target.value)}
                    />
                  </div>
                </div>
               
              </div>
            );
          }
          
          
          

        export default AnglesSpirals