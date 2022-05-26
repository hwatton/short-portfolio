
import "@fontsource/major-mono-display"

import megaProjectsArray from "./megaProjectsArray"
import useWindowDims from "../../helpers/useWindowDims.js"
import ProjectCard from "./projectCard"


function ProjectsTwo(props) {
    /* rewrite projects. 
    lets have it properly responsively sized.
    lets put more stuff in here, with routing.
    lets have a card for each project, with title, thumbnail and a couple of tags

    So. This will be the page container for that unloading of stuff. 
    I'm goin to do all of that in abother component, which I can switch out wiht an "active" filter

    maybe I do it here

    it's coming in as a big bad boy array.
have an active project state. if that's set, then render that projct in it' own space, under the nav bar.
!!!USE THW WINDOW DIMS LIKE A HERO ON ALL ANIMATIONS. JUST GO AND MAKE THEM ALL RESPONSIVE
!!! IF THEY REALLY CAN'T BE DONE EASILY (ie without wasting my whole life remaking old projects) (rainbow mountain!) lets have a message to express this sadness.
OR, have a mobile friendly property on the project. filter projects if the window dims are less than 400px wide or similar,  
     it gets it's component rendered )a <Route path={activeProject.path}/>, the card is a <Link/>
    breadcrumbs?
    */

 //the project card images are ALL to be 150 x 150px (it should mean that two will flex on a phone, )

const window = useWindowDims()

const imageDims = window.width > 500 ? {
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
           flexWrap: "wrap"
       }}>
            <h2>I'm currently updating this page and adding in a whole bunch of interactive projects.</h2>
            <h3>Please take a look at (most of) these on <a href="https://codesandbox.io/dashboard/all/?workspace=08b90dfe-0aa6-49de-bd81-a76b01c6903d"
        target="_blank"
        rel="noopener noreferrer"
       ><span style={{color: "white"}}>codesandbox</span></a></h3>
       </div>
       <div style={{
           display: "flex",
           justifyContent: "center",
           flexWrap: "wrap"
       }}>
            { window && projectCards}
            </div>
        </div>
    )
}

export default ProjectsTwo

