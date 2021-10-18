import Nav from "../nav.jsx"
import Main from "../main.jsx"
import React from "react";
import Contact from "../contact.jsx"
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";

function Routing() {

    return (
        <Router>
        <div>
          <Nav/>
  

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
              <Main />
            </Route>
          </Switch>
        </div>
      </Router>
    )
}

function About() {
    return <p>About</p>
}
function Projects() {
    return <p>Projects</p>
}

export default Routing