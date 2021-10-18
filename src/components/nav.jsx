import "@fontsource/major-mono-display"
import {
    Link
  } from "react-router-dom";

function Nav() {
    return <div id={"navBar"}
    style={{
        fontFamily: "Major mono display"
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
}

export default Nav