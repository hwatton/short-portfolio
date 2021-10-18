import {motion} from "framer-motion"

function JewelSvg(props) {

    const ht = props.height
    const wd = props.width

    const triangles = [...Array(20)].map((el,i)=>{

        const fillVal = 100 + Math.random()*155
        const fillColour = "rgb(" + fillVal +"," + fillVal +"," + fillVal + ")"
const basicPath = "M0,0L"+ wd + ",0L" + 2*wd/3 + "," + ht + "z"
const rotate = Math.random()*120
const scale = 1 + Math.random()
        
    
    return (<motion.path
    d={basicPath}
    initial={{
        rotate: rotate,
        scale: scale}}
        animate={{
            rotate: rotate*1.5,
            transition:{
                duration: 30
            }
            
        }}
    style={{
        stroke: "white",
        strokeWidth: "0.5px",
        fill: fillColour,
        opacity: Math.random(),
        transformOrigin: Math.random()*130 + "% " + Math.random()*130 + "%"
    }}/>
    
    )
    })

    const pad = 20

    return (
    <svg
    height={ht}
    width={wd}>
 
{triangles}
    </svg>
    )
}

export default JewelSvg
