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

const navheight = props.dims.width > 450 ? "35px" : "25px"

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
        width: "100%"
        
    }}>
<ul>
    <li>
    <Link to="/">home</Link>
    </li>
    <li><Link to="/about">about</Link></li>
    <li><Link to="/contact">contact</Link></li>
    <li><Link to="/projects">projects</Link></li>
    </ul>
    </div>
    ) 
:(
    <div>
        <div 
        style={{
            width: "100%",
            position: "relative"
        }}>
            {(!props.animating || overRideAnimProp) &&
            <div style={{
                paddingTop: "5px",
                height: "20px", width: "100%"}}>
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
        textAlign: "center"
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