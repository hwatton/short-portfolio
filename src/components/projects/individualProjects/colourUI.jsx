import axios from "axios";
import { useEffect, useState } from "react";
import "./sliderStyles.css";
import useDebounce from "./../../../helpers/useDebounce";

function ColourUI(props) {
  const [data, setData] = useState({
    loading: true,
    data: null,
  });

  const wd = props.width > 650 ? 280 : 360;

  function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }

  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  const rndHex =
    componentToHex(Math.floor(Math.random() * 255)) +
    componentToHex(Math.floor(Math.random() * 255)) +
    componentToHex(Math.floor(Math.random() * 255));

  const [searchTerm, setString] = useState(rndHex);

  // sorry! deboucne used to trigger this a bit less while sliding
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    let uriString = "https://api.color.pizza/v1/" + debouncedSearchTerm;

    axios
      .get(uriString)
      .then((res) => {
        setData({
          loading: false,
          data: res.data.colors[0],
        });
      })
      .catch((err) => {
        console.log(err);
        setData({
          loading: true,
          data: null,
        });
      });
  }, [debouncedSearchTerm]);

  const [redValue, setRedValue] = useState(Math.floor(Math.random() * 255));
  const [greenValue, setGreenValue] = useState(Math.floor(Math.random() * 255));
  const [blueValue, setBlueValue] = useState(Math.floor(Math.random() * 255));
  let str;

  function blueF(num) {
    setBlueValue(parseInt(num, 10));
    str = rgbToHex(redValue, greenValue, parseInt(num, 10));
    setString(str.substring(1, 7));
  }

  function redF(num) {
    setRedValue(parseInt(num, 10));
    str = rgbToHex(parseInt(num, 10), greenValue, blueValue);
    setString(str.substring(1, 7));
  }

  function greenF(num) {
    setGreenValue(parseInt(num, 10));
    str = rgbToHex(redValue, parseInt(num, 10), blueValue);
    setString(str.substring(1, 7));
  }

  const colourTextStyle = {
    position: "relative",
    width: "130px",
    textAlign: "left",
    paddingLeft: "10px",
  };

  const colorNameStyle = {
    borderStyle: "solid",
    borderRadius: "10px",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "2px",
    paddingBottom: "2px",
    backgroundColor: "white",
    color: "black",
  };

  const dataContainerStyle = {
    backgroundColor: "white",
    borderStyle: "solid",
    borderRadius: "10px",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "5px",
    paddingBottom: "10px",
    color: "black",
  };

  const sliderStyle = {
    width: "140px",
    margin: "10px 10px 0px 10px",
  };

  const colorValuestyle = {
    backgroundColor: "white",
    paddingLeft: "15px",
    paddingRight: "5px",
    paddingTop: "0px",
    paddingBottom: "2px",
    borderRadius: "5px",
    marginLeft: "10px",
    color: "black",
  };

  const inputStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
  };

  const inputData = [
    <div key="1" style={inputStyle}>
      <input
        type="range"
        onChange={(e) => redF(e.target.value)}
        value={redValue}
        name="name"
        max="255"
        min="0"
        style={{ ...sliderStyle, ...{ accentColor: "rgb(225,0,0)" } }}
      />
      <div style={colourTextStyle}>
        <div
          style={{
            position: "absolute",
            left: "10px",
            top: "20px",
            height: "10px",
            width: "10px",
            backgroundColor:
              "rgb(255," + (255 - redValue) + "," + (255 - redValue) + ")",
            border: "1px solid red",
          }}
        ></div>
        <p style={colorValuestyle}>Red: {redValue}</p>
      </div>
    </div>,
    <div style={inputStyle} key="2">
      <input
        type="range"
        onChange={(e) => greenF(e.target.value)}
        value={greenValue}
        name="name"
        max="255"
        min="0"
        style={{ ...sliderStyle, ...{ accentColor: "rgb(0,225,0)" } }}
      />
      <div style={colourTextStyle}>
        <div
          style={{
            position: "absolute",
            left: "10px",
            top: "20px",
            height: "10px",
            width: "10px",
            backgroundColor:
              "rgb(" + (255 - greenValue) + ",255, " + (255 - greenValue) + ")",
            border: "1px solid green",
          }}
        ></div>
        <p style={colorValuestyle}>Green: {greenValue}</p>
      </div>
    </div>,
    <div style={inputStyle} key="3">
      <input
        type="range"
        onChange={(e) => blueF(e.target.value)}
        value={blueValue}
        name="name"
        max="255"
        min="0"
        style={{ ...sliderStyle, ...{ accentColor: "rgb(0,0,225)" } }}
      />
      <div style={colourTextStyle}>
        <div
          style={{
            position: "absolute",
            left: "10px",
            top: "20px",
            height: "10px",
            width: "10px",
            backgroundColor:
              "rgb(" + (255 - blueValue) + ", " + (255 - blueValue) + ",255)",
            border: "1px solid blue",
          }}
        ></div>
        <p style={colorValuestyle}>Blue: {blueValue}</p>
      </div>
    </div>,
  ];

  return (
    <div
      style={{
        fontFamily: "Courier New, Courier, monospace",
        textAlign: "center",
        color: "white",
        padding: wd > 500 ? "0px 10px 0px 10px" : "0px",
        fontSize: "1.2em",
      }}
    >
      <h2>Colour Name Interface</h2>
      <br />
      <div
        style={{
          maxWidth: wd + "px",
          backgroundColor: "#" + searchTerm,
          margin: "auto",
          padding: "40px",
          borderRadius: "20px",
          borderStyle: "solid",
          borderWidth: "1px",
        }}
      >
        <div style={dataContainerStyle}>{inputData}</div>
        <br />
        <br />
        <div style={colorNameStyle}>
          <p style={{ fontWeight: 800 }}>
            {data.loading ? "still loading" : data.data.name}
          </p>
          <p>Hex: {rgbToHex(redValue, greenValue, blueValue)}</p>
        </div>
      </div>
      <div style={{ margin: "5% 10% 5% 10%" }}>
        <h3>What is this?</h3>
        <p>Ever wanted to put a name to a subtle colour?</p>
        <p>
          Powered by the folks at{" "}
          <a
            href=" https://meodai.github.io/color-names/"
            target="_blank"
            rel="noopener noreferrer"
          >
            meodai
          </a>
          , this interface allows you to find out what the internet thinks it's
          called.
        </p>
        <p>
          I've used it to practice my React component wrangling skills and data
          fetching with axios.
        </p>
        <p>... and also because some of the names are excellent.</p>
      </div>
    </div>
  );
}

export default ColourUI;
