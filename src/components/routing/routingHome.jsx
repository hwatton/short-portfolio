import Nav from "../nav.jsx"
import MainTwo from "../mainTwo.jsx"
import React, {useEffect} from "react";
import useWindowDims from "../../helpers/useWindowDims.js"
import ProjectsTwo from "../projects/projectsTwo.jsx"
import Contact from "../contact/contact.jsx"
import About from "../about/about.jsx"


import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";

function Routing() {

  useEffect(() => {
    document.title = "Harry Watton - short portfolio site"
 }, []);

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
         
              <ProjectsTwo dims={window}/>
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