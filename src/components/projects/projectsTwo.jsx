
import "@fontsource/major-mono-display"

import megaProjectsArray from "./megaProjectsArray"
import useWindowDims from "../../helpers/useWindowDims.js"
import ProjectCard from "./projectCard"


function ProjectsTwo(props) {
 

const window = useWindowDims()

const imageDims = window.width > 650 ? {
    height: 300, width: 300
} : {height: 150, width: 150}
//above: maybe do a switch, check out common breakpoints.
    
    const projectCards = megaProjectsArray.map((el,i)=>{
        return <ProjectCard key={"proojectCard_" + i} data={el} imageDims={imageDims}/>
    }) 

    return (
        <div style={{
            width: "100%",
            textAlign: "center",
            fontSize :"12px",
            fontFamily: "Major mono display",
            marginTop: -12
        }}>
            <div style={{
           display: "flex",
           justifyContent: "center",
           flexWrap: "wrap",
           padding: "20px"
       }}>
            <p>I'm currently updating this page and adding in a whole bunch of interactive projects.</p>
            <p>Please take a look at (most of) these on <a href="https://codesandbox.io/dashboard/all/?workspace=08b90dfe-0aa6-49de-bd81-a76b01c6903d"
        target="_blank"
        rel="noopener noreferrer"
       ><span style={{color: "white"}}>codesandbox</span></a></p>
       </div>
       <div style={{
           display: "flex",
           justifyContent: imageDims.width === 300 ? "center" : "space-around",
           flexWrap: "wrap"
       }}>
            { window && projectCards}
            </div>
        </div>
    )
}

export default ProjectsTwo

