
import "@fontsource/major-mono-display"

import megaProjectsArray from "./megaProjectsArray"
import useWindowDims from "../../helpers/useWindowDims.js"
import ProjectCard from "./projectCard"
import {Route, Switch} from "react-router-dom"
import {cloneElement} from "react"


function ProjectsTwo(props) {

    //add in breadbrumbs above routes, when not rendering projects cards

const window = useWindowDims()

const imageDims = window.width > 650 ? {
    height: 300, width: 300
} : {height: 150, width: 150}
//above: maybe do a switch, check out common breakpoints.
    
    const projectCards = megaProjectsArray.map((el,i)=>{
        return <ProjectCard key={"projectCard_" + i} data={el} imageDims={imageDims}/>
    }) 

    let projectRoutes = megaProjectsArray.map((el,i)=>{
const pNm = "/projects/" + el.image.slice(0,-1)
        return <Route key={"projectRoute_" + i}  path={pNm}>
            {cloneElement(el.component, {words: el.image, dims: window} )}
        </Route>
    }) 

    const cardContainer = (
        <div style={{
            display: "flex",
            justifyContent: imageDims.width === 300 ? "center" : "space-around",
            flexWrap: "wrap"
        }}>
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
            <div style={{
           display: "flex",
           justifyContent: "center",
           flexWrap: "wrap",
           padding: "20px"
       }}>
           
           <h3 style={{ width: "100%", fontSize: "20px"}}>Projects</h3>
            <p>I'm currently updating this page and adding in a whole bunch of interactive projects.</p>
            <p>Please take a look at (most of) these on <a href="https://codesandbox.io/dashboard/all/?workspace=08b90dfe-0aa6-49de-bd81-a76b01c6903d"
        target="_blank"
        rel="noopener noreferrer"
       ><span style={{color: "white"}}>codesandbox</span></a></p>
       </div>
       <div style={{width: "100%", textAlign: "left"}}>
           <p style={{marginLeft: "20px", fontStyle: "italic"}}>breadcrumbs/....</p>
       </div>
      <Switch>
          {projectRoutes}
          </Switch>
        </div>
    )
}

export default ProjectsTwo

