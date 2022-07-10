import "@fontsource/major-mono-display"
import {
    Link,
    useLocation
  } from "react-router-dom";
import { useState, useEffect} from "react"
import BurgerBar from "./burgerBar";

function Nav(props) {

    const [showMenu, setShowMenu] = useState(false)
    const { pathname } = useLocation();
    const [overRideAnimProp, setOverRideAnimProp] = useState(false)
  useEffect(() =>{
    setShowMenu(false);
    if(pathname !== "/") { setOverRideAnimProp(true)}
  }, [pathname])

const navheight = props.dims.width > 450 ? "35px" : "35px"

const listStyle= {
    display: "block",
    width: "100px",
    textAlign: "left",
    paddingLeft: "5px",
    height: "25px"
}



const responsiveNav = props.dims.width > 450 
? ( 
    <div style={{
        height: "35px",
        width: "500px"
        
    }}>
<ul>
    <li style={{fontWeight: pathname === "/" ? "800" : "400"}}> <Link to="/">home</Link></li>
    <li style={{fontWeight: pathname === "/about" ? "800" : "400"}}><Link to="/about">about</Link></li>
    <li style={{fontWeight: pathname === "/contact" ? "800" : "400"}}><Link to="/contact">contact</Link></li>
    <li style={{fontWeight: pathname === "/projects" ? "800" : "400"}}><Link to="/projects">projects</Link></li>
    </ul>
    </div>
    ) 
:(
    <div>
        <div 
        style={{
            width: "100%",
            height:  "35px",
            position: "relative"
        }}>
            {(!props.animating || overRideAnimProp) &&
            <div style={{
                paddingTop: "5px",
                height: "0px", width: "100%",
                position: "relative"}}>
            <div 
            id={"burgerContainer"}
        onClick={()=>{setShowMenu(!showMenu)}}
        style={{
position: "absolute",
left: 2,
cursor: "pointer"
        }}><BurgerBar size={25}/></div>
        </div>
        }</div>
        
   
    </div>
)

    return <div id={"navBar"}
    style={{
        fontFamily: "Major mono display",
        height: navheight,
        textAlign: "center",
        width: "100%"
    }}>
        {responsiveNav}
{props.children}
        {showMenu &&
        <div style={{
            display: "block",
            position: "absolute",
            left: 0,
            top: "25px",
            backgroundColor: "rgba(10,30,33, 0.9)"
        }}>
        <ul>
    <li style={listStyle}><Link to="/">home</Link></li>
    <li style={listStyle}><Link to="/about">about</Link></li>
    <li style={listStyle}><Link to="/contact">contact</Link></li>
    <li style={listStyle}><Link to="/projects">projects</Link></li>
    </ul>
        </div>
}

    </div>
}

export default Nav