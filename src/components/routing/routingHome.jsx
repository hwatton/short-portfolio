import Nav from "../nav.jsx"
import MainTwo from "../mainTwo.jsx"
import React from "react";
import useWindowDims from "../../helpers/useWindowDims.js"
import Projects from "../projects/projects.jsx"
import Contact from "../contact/contact.jsx"
import About from "../about/about.jsx"


import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";

function Routing() {

    const window = useWindowDims()

    return (
        <Router>
               <Nav/>
      <div className={"linearGrad"}
          style={{
              margin: "0px",
              height: window.height  }}>
               

          <Switch>
         
            <Route path="/about">
      
              <About />
            </Route>
            <Route path="/projects">
         
              <Projects />
            </Route>
            <Route path="/contact">
         
              <Contact />
            </Route>
            <Route path="/">
          
              <MainTwo />
            </Route>
          </Switch>
        </div>
      </Router>
    )
}



export default Routing