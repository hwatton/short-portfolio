import { AnimatePresence, motion } from "framer-motion"
import { useState} from "react"
import JewelSvg from "../svg/jewels"
import Chonks  from "../svg/chonks"


/**
 * Todo:
 * separate out the styles below into specific files. 
 * different card ideas:
 * painty card with dripping paint thing
 * mathy card with spirograph thing
 * one that animates out the text, maybe even draws it like a chalkboard
 * camoflage with stencil text - dystopian nightmare survivalist
 * star trek replicator engineer
 * ladybird catching expert (use ladybird thing!)
 * engineer - make some cogs that all move together.
 * copy some branding: heinz (bean supplier), google(seo wizard), burgerKing(junk food chef) 
 * probably do some of the above on illustrator. 
 * always 500 x 300.
 * */

function BusinessCard(props) {

    const trans = {
        duration: 4
    }

    //"pinky card"

const pinkyCard = {
    border: "5px solid rgb(255,10,255)",
    backgroundColor: "rgb(255,255,255)",
    borderRadius: "40px",
    color: "rgb(185,0,245)"
}

const nameStylePinky = {
    position: "absolute",
    whiteSpace: "nowrap",
    left: "10%",
    top: "5%",
    fontSize: "30px",
    fontFamily: "Brush Script MT"
    
}

const mottoStylePinky = {
    position: "absolute",
    whiteSpace: "nowrap",
    left: "50%",
    top: "80%",
    fontSize: "22px",
    fontFamily: "Brush Script MT"
}

    //"dark card"

const darkCard = {
    border: "2px solid rgb(50, 50, 50)",
    backgroundColor: "rgb(255,255,0)",
    borderRadius: "5px",
    color: "rgb(255,0,0)"
}

const nameStyleDark = {
    position: "absolute",
    whiteSpace: "nowrap",
    left: "6%",
    top: "5%",
    fontFamily: "courier"
}

const mottoStyleDark = {
    position: "absolute",
    whiteSpace: "nowrap",
    left: "6%",
    top: "70%",
    fontFamily: "courier"
}

    //"light card"

const lightCard = {
    border: "0.7px solid rgb(25,35,125)",
    backgroundColor: "rgb(0,0,0)",
    borderRadius: "5px",
    color: "rgb(30,30,30)",
  
}

const nameStyleLight = {
    position: "absolute",
    whiteSpace: "nowrap",
    left: "60%",
    top: "62%",
    fontStyle: "italic",
    fontFamily: "helvetica",
    fontSize: "28px",
    overflow: "hidden"
}

const mottoStyleLight = {
    position: "absolute",
    whiteSpace: "nowrap",
    left: "60%",
    top: "80%",
    fontStyle: "italic",
    fontFamily: "helvetica"
}


const variants = [
   {div: darkCard, 
    name: nameStyleDark, 
    motto: mottoStyleDark,
     mottoText: "Ticky and tacky, jacky the backy", 
     svg: <Chonks height={300} width={500}/>},
   {div: pinkyCard, name: nameStylePinky, motto: mottoStylePinky, mottoText: "Web design implementer"},
    {div: lightCard, 
        name: nameStyleLight, 
        motto: mottoStyleLight, 
        mottoText: "international jewel thief",
    svg: <JewelSvg height={300} width={500}/>}
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
            borderRadius: "0px",
            overflow: "hidden",
            boxShadow: "5px 5px 1px rgb(20,0,40)"
            

        }}
        animate={activeVar.div}
        transition={trans}
        
        onClick={()=>handleClick()}
       >
           <div style={{
               height: "100%",
               width: "100%"
           }}>
               <AnimatePresence>
           {activeVar.svg &&
            <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1, 
            transition: {
                duration: 2
            }}}
            exit={{opacity: 0}}>
            {activeVar.svg}
        </motion.div>
           }
           </AnimatePresence>
           <motion.p
           animate={activeVar.name}
           transition={trans}>
               harry watton
           </motion.p>
           <motion.p
            animate={activeVar.motto}
            transition={trans}>
               {activeVar.mottoText}
           </motion.p>
           
          
           </div>
           
           
           



        </motion.div>
    )
}

export default BusinessCard