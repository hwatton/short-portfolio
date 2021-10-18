import {motion} from "framer-motion"

function ChonksSvg(props) {

    const ht = props.height
    const wd = props.width
    const r = ht / 200
    const xNum = 3+  Math.floor( wd / (r*4))
    const yNum = 3 + Math.floor(ht / (r*4))
    const spare = (wd % (r*4))

    const cirks = [...Array(xNum)].map((el,i)=>{

const pants = [...Array(yNum)].map((thing,index)=>{

    let x = i*(r*4) + r + spare - 10
    let y = index*(r*4) + r + spare - 10

    let x2 = x + 0.0002*(i - wd/2) * (i - wd/2) 
    let y2 = y + 0.0003*(index - ht/2) *(index - ht/2) 


let dist = r*3
    return (
         <path
         d={"M" + x + "," + y + "L" + x2 + "," +  y2 }
         style={{
             stroke: "green",
             strokeWidth: "1.5px"
         }}/>
         
         )
})

return pants

    
    
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
