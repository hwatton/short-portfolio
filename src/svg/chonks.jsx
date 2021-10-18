import {motion} from "framer-motion"

function ChonksSvg(props) {

    const ht = props.height
    const wd = props.width

    const cirks = [...Array(10)].map((el,i)=>{
let r = Math.random()*20 + 10
let x = Math.random() > 0.5 ? 0 - Math.random()*(r/2) : wd +  Math.random()*(r/2)
let y = Math.random() > 0.5 ? 0 - Math.random()*(r/2) : ht +  Math.random()*(r/2)

    
    return (<circle
   cx={x}
   cy={y}
   r={r}
    style={{
        stroke: "white",
        strokeWidth: "2px",
        fill: "black"
    }}/>
    
    )
    })



    return (
    <svg
    height={ht}
    width={wd}>
 {cirks}

    </svg>
    )
}

export default ChonksSvg
