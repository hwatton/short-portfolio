
import "@fontsource/major-mono-display"

import megaProjectsArray from "./megaProjectsArray"
import useWindowDims from "../../helpers/useWindowDims.js"
import ProjectCard from "./projectCard"
import {Route, Switch, useLocation, Link} from "react-router-dom"
import {cloneElement} from "react"
import ProjectContainer from "./projectContainer"
import {motion} from "framer-motion"



function ProjectsTwo() {

    //add in breadbrumbs above routes, when not rendering projects cards

const window = useWindowDims()

const imageDims = window.width > 650 ? {
    height: 300, width: 300
} : {height: 150, width: 150}

const location = useLocation()

const breadcrumbs = location.pathname.split("/").length >= 3 
? <><span style={{textDecoration: "underLine", fontWeight: 800}}><Link to="/projects" >{`projects`}</Link></span><span>{`/`}</span><span>{location.pathname.split("/")[2] }</span></>
: <span style={{ fontWeight: 800}}>projects</span>
/**
//slight of hand for the left padding of the breadcrumb div....
//this will totally fail if I resize the images in the grid!! 
//could be probably easily sorted by including it in the conatiner for the project cards or something like that.
//maybe even abs positioned using a ref to locate the top left projectcard item.


ok- this isn't great. I gues because my nav/header floats, there's no obvious position to bind this to visually.
this quik section of horrid if statements works ok for my personal site though.  

EDIT: no it doesn't really. to sort!
 * 
 */

let breadcrumbLeftPosition =10    
if (window.width > 657) { breadcrumbLeftPosition = 20 +(window.width - 657)/2}
if (window.width > 978) { breadcrumbLeftPosition = 20 + (window.width - 978)/2}
if (location.pathname !== "/projects") {breadcrumbLeftPosition = 30}


   
    const projectCards = megaProjectsArray.map((el,i)=>{
        return <ProjectCard key={"projectCard_" + i} data={el} imageDims={imageDims}/>
    }) 

    let projectRoutes = megaProjectsArray.map((el,i)=>{
const pNm = "/projects/" + el.image.slice(0,-1)
        return <Route key={"projectRoute_" + i}  path={pNm}>
            <ProjectContainer>
            {cloneElement(el.component, {words: el.image, dims: window} )}
            </ProjectContainer>
        </Route>
    }) 

    const cardContainer = (
        <div style={{
            display: "flex",
            justifyContent: imageDims.width === 300 ? "center" : "space-around",
            flexWrap: "wrap"
        }}>
             <div style={{
           display: "flex",
           justifyContent: "center",
           flexWrap: "wrap",
           padding: "20px",
           color: "white",
           backgroundColor: "black"
       }}>
           
           
            <p>I'm currently updating this page and adding in a whole bunch of interactive projects.</p>
            <p>Please take a look at (most of) these on <a href="https://codesandbox.io/dashboard/all/?workspace=08b90dfe-0aa6-49de-bd81-a76b01c6903d"
        target="_blank"
        rel="noopener noreferrer"
       ><motion.span style={{color: "rgb(255,0,255)"}} whileHover={{color: "rgb(255,0,0)"}}>codesandbox</motion.span></a></p>
       
       </div>
             { window && projectCards}
             </div>
    )

    projectRoutes.push(<Route key={"projectRoute_basic"}  path={"/projects"}>
    {cardContainer}
</Route>)



    

    return (
        <div style={{
            width: "100%",
            textAlign: "center",
            fontSize :"12px",
            fontFamily: "Major mono display",
          
        }}>
           
       <motion.div 
       style={{         
        textAlign: "left", paddingLeft: "20px", display: "block"}}
       animate={{
        paddingLeft: breadcrumbLeftPosition +"px"
       }}>
           <p style={{ fontStyle: "italic", fontSize: window.width > 650 ? "20px" : "12px"}}>{breadcrumbs}</p>
       </motion.div>
       
      <Switch>
          {projectRoutes}
          </Switch>
        </div>
    )
}

export default ProjectsTwo

