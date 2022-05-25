
import "@fontsource/major-mono-display"

import megaProjectsArray from "./megaProjectsArray"


function ProjectsTwo(props) {
    /* rewrite projects. 
    lets have it properly responsively sized.
    lets put more stuff in here, with routing.
    lets have a card for each project, with title, thumbnail and a couple of tags

    So. This will be the page container for that unloading of stuff. 
    I'm goin to do all of that in abother component, which I can switch out wiht an "active" filter

    maybe I do it here
    */

    console.log(props)
    
    const projectCards = megaProjectsArray.map((el,i)=>{
        return (
            <div key={"projectCard_" + i}>
                <p>
                    {el.title}
                </p>
            </div>
        )
    }) 

    return (
        <div style={{
            width: "100%",
            textAlign: "center",
            fontSize :"12px",
            fontFamily: "Major mono display",
            marginTop: -12
        }}>
            <h2>I'm currently updating this page and adding in a whole bunch of interactive projects.</h2>
            <h3>Please take a look at (most of) these on <a href="https://codesandbox.io/dashboard/all/?workspace=08b90dfe-0aa6-49de-bd81-a76b01c6903d"
        target="_blank"
        rel="noopener noreferrer"
       ><span>codesandbox</span></a></h3>
            {projectCards}
        </div>
    )
}

export default ProjectsTwo

