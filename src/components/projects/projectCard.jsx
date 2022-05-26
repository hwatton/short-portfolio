import {useState} from "react"
import {AnimatePresence, motion} from "framer-motion" 

function ProjectCard(props) {

    const [hover, setHover] = useState(false)

    //BOO: don't rerender the "image" on hover.
    //the "image" can sit in a div behind te motion div.

    return (
        <div key={"projectCard_" + props.data.title}>
                
                {props.data.image ? (
                    <div style={{position: "relative",}}>
                        <div style={{ display: "inline-block", margin: "2px"}}>
                        {props.data.image(props.imageDims)}
                        </div>
                    <motion.div
                    style={{position: "absolute", 
                    top: 0, 
                    left:2,
                    height: props.imageDims.height,
                    width: props.imageDims.width
                }}
                    onHoverStart={()=>{setHover(true)}}
                    onHoverEnd={()=>{setHover(false)}}>
                   
                    <AnimatePresence>
                    {hover && <motion.div 
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    exit={{opacity: 0}}
                    style={{
                        position: "absolute",
                        bottom: 40,
                        left: 0,
                        width: "100%",
                        textAlign: "left",
                        backgroundColor: "rgba(0,0,0,0.9)"
                    }}>
                        <h2 style={{marginLeft: "5px" }}>{props.data.title}</h2>
                        </motion.div>}
                    </AnimatePresence>
                    </motion.div>
                    </div>
                    ) :(
                        <div style={{
                            position: "relative",
                            height: props.imageDims.height,
                            width: props.imageDims.width,
                            backgroundColor: "rgba(0,0,0,0.9)",
                            margin: "2px"
                        }}>
                             <p style={{
                                 position: "absolute",
                                 left: 10,
                                 top: "50%",
                                 width: props.imageDims.width/2
                             }}>
                    {props.data.title}
                </p>
                        </div>
                    )
                   
                    }
            </div>
    )
}

export default ProjectCard