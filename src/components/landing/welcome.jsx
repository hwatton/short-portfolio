import { motion} from "framer-motion"
import "@fontsource/major-mono-display"

function WelcomeAnimation(props) {

const cols = ["rgb(255,0,0)", "rgb(0,255,0)", "rgb(0,0,255)"]


    const numOfElements = 20
    const texts = [...Array(numOfElements + 1)].map((el,i)=>{

        let col = cols[Math.floor(Math.random()*3)]
        
                return <motion.text
                key={"line_" + i}
              
                initial={{
                    fill : col,
                    translateY: -100,
                    opacity: 0
                }}
                style={{
                    mixBlendMode: "screen",
                    fontSize: "55px",
                    textAnchor: "middle",
                    fontFamily: "Major Mono Display"
                }}
                onAnimationComplete={()=>{
                    if (i === 10) {
                        props.handleExit()
                    }
                }}
                animate={{
                    fill: i=== 0 ? "rgb(0,0,255)": col,
                    
                    translateY: props.height*0.33 ,
                 opacity: i=== 0 ? 1 : 0.5,
                    transition:{
                        delay: i*0.15,
                        type: "spring", 
                        bounce: 0.8,
                        duration: 2.5 + 2 * i/numOfElements,
                        }
                        
        
                }}>welcome</motion.text>
        
        
            })

    return (
        <div id={"welcomeBack"}
       >
            <svg
            height={props.height*0.8}
            width={props.width}
            style={{
                willChange: "opacity",
                overflow: "hidden"
            }}>
<g style={{
    transform: "translate(" + props.width/2 +"px, 0px)"}}>
{texts}
</g>

            </svg>
        </div>
    )
}

export default WelcomeAnimation