import Nav from "./nav.jsx"
import MainTwo from "../landing/mainTwo.jsx"
import React, {useEffect, useState} from "react";
import useWindowDims from "../../helpers/useWindowDims.js"
import ProjectsTwo from "../projects/projectsTwo.jsx"
import Contact from "../contact/contact.jsx"
import About from "../about/about.jsx"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";

/*
problem. i want the burger to hide during the loading animtion.
Maintwo and landing and wlecome all need a tweak, so their conditional rendering 
is more controlled in this component and that state can be passed to the burger
*/

function Routing() {

  useEffect(() => {
    document.title = "Harry Watton - short portfolio site"
 }, []);

    const window = useWindowDims()
    const [animating, setAnimating] = useState(true)

   
function hideBurgerDuringAnimation() {
 setAnimating(false)
}


    return (
        <Router>
          <ScrollToTop />
               <Nav dims={window} animating={animating}>
      <div className={"linearGrad"}
          style={{
              margin: "0px 0px 0px 0px",
              overflow: "hidden"  }}>
                <Switch>
         
         <Route path="/about">
   
           <About dims={window}/>
         </Route>
         <Route path="/projects">
      
           <ProjectsTwo 
           dims={window}
         />
         </Route>
         <Route path="/contact">
      
           <Contact 
           />
         </Route>
         <Route path="/">
       
           <MainTwo 
         toggleBurgerOff={()=>hideBurgerDuringAnimation()}
       
           window={window}/>
         </Route>
       </Switch>
          
          
          </div>
          </Nav>

      </Router>
    )
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}



export default Routing