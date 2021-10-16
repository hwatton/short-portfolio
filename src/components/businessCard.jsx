import { motion } from "framer-motion"
import { useState} from "react"

function BusinessCard(props) {

    const trans = {
        duration: 4
    }

const pinkyCard = {
    border: "5px solid rgb(255,10,255)",
    backgroundColor: "rgb(255,255,255)",
    borderRadius: "40px",
    color: "rgb(185,0,245)"
}

const darkCard = {
    border: "2px solid rgb(255,255,220)",
    backgroundColor: "rgb(0,0,0)",
    borderRadius: "5px",
    color: "rgb(200,200,200)"
}

const lightCard = {
    border: "0.7px solid rgb(25,35,125)",
    backgroundColor: "rgb(255,255,230)",
    borderRadius: "20px",
    color: "rgb(150,150,150)"
}

const nameStylePinky = {
    position: "absolute",
    whiteSpace: "nowrap",
    left: "5%",
    top: "5%"
}

const nameStyleDark = {
    position: "absolute",
    whiteSpace: "nowrap",
    left: "6%",
    top: "5%"
}

const nameStyleLight = {
    position: "absolute",
    whiteSpace: "nowrap",
    left: "60%",
    top: "70%"
}


const variants = [
   {div: darkCard, name: nameStyleDark},
   {div: pinkyCard, name: nameStylePinky},
    {div: lightCard, name: nameStyleLight},
]

const [activeVar, setActiveVar] = useState(variants[Math.floor(Math.random()*variants.length)])

function handleClick() {
    console.log("click")

    let current = variants[Math.floor(Math.random()*variants.length)]


    setActiveVar(current)
}
    return(
        <motion.div
        id={"businessCard"}
        initial={{
            height: "300px",
            width: "500px",
            color: "rgb(255,10,230)",
            border: "1px solid rgb(255,10,0)",
            backgroundColor: "rgb(30,0,50)",
            borderRadius: "0px"
            

        }}
        animate={activeVar.div}
        transition={trans}
        
        onClick={()=>handleClick()}
       >
           <motion.h2
           animate={activeVar.name}
           transition={trans}>
               harry watton
           </motion.h2>



        </motion.div>
    )
}

export default BusinessCard