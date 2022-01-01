import "@fontsource/major-mono-display"
import {AnimatePresence, motion} from "framer-motion"


function Landing(props) {
const dWid = Math.max(props.width/2, 320)
const marg = (props.width - dWid)/2



const favouriteThings = {
    list: [
"javAscript",
"React",
"d3.js",
"framer-motion",
"html/css",
"data visuAlisation",
"Animation/interactive",
"cReative coding",
"Maths pRoblems & concepts",
"Adobe (ps, ill, xd)",
"Azure, sql, python, VbA",
"pRoblem solving",
"project mAnagement"
], heading: "fAvourite Things:" }
const thingsToDo  = {
    list: [
    "uX design",
    "data analysis",
    "three.js",
    "react native"], heading: "things i'd like to do:"}
const thingsNoComputer = {
    list: [
"painting",
"cycling",
"Running",
"Reading about Any of the above",
"my cat Jeff",
"lego with the kids",
"walking",
"black sheep ale"],
heading: "fAvourite Things that don't require a computer:" }

function MotionListFromTextArray(props) {
    const listItems =  props.data.list.map((el,i)=>{
        return(
            <motion.li
            key={"liElement" + el}
            className={"movingLi"}
            initial={{ opacity: 0, x: -1000}}
            animate={{ opacity: 1,
                x: 0,
                transition: {
                  delay: i * 0.2 + props.groupDelay,
                  type: "spring",
                  bounce: "0.2"
                }
            }}
            exit={{
                opacity: 1,
                x: -5000,
                transition: {
                  delay: i * 0.08,
                  type: "spring",
                  bounce: "0.2", 
                  stiffness: 150 
                }
              }}
            >
            {el}
            </motion.li>
        )
    })

    const fT = (
        <AnimatePresence>
<motion.h3 
initial={{opacity: 0}}
animate={{opacity: 1, transition: {duration: 3}}}>
    {props.data.heading}</motion.h3>
        <ul style={{
            width: dWid*0.8,
            marginLeft: dWid*0.1,
            
            textAlign: "left"
            }}>
{listItems}
            </ul>
                      </AnimatePresence>

    )

    return fT
}

const halfStuff= (   <div style={{
    transform: "translate(0px, 30px)",
    fontFamily: "Major mono display",
    fontSize: 16 ,
    width: Math.max(props.width/2, 320),
    marginLeft: marg,
}}>
    <h2 style={{margin: "0px"}}>my nAme is</h2>
    <h2 style={{margin: "0px"}}>HArrY WAtton</h2>
<br />
<br />
    <p>i'm a fRoNt-end DeveLopeR, wIth a BackgrOuNd in FinE Art mANufactUrinG aNd ProduCtion.</p>

<br />
 
      <p>this site is like a business card or a small portfolio. you cAn find out a bit more about me below or to see more of my work, check out my profiles via the links below:</p>

</div>)



const animatedLists = (
    <div style={{
        transform: "translate(0px, 50px)",
        fontFamily: "Major mono display",
        fontSize: 16 ,
        width: Math.max(props.width/2, 320),
        marginLeft: marg,
        paddingBottom: "100px"    }}>
        <motion.div 
        initial={{
            opacity: 0
        }}
        animate={{
            opacity: 1,
            transition: {
                delay: 0
            }
        }}>
        <MotionListFromTextArray 
        data={favouriteThings}
        groupDelay={0}/>
        </motion.div>
        <motion.div
        initial={{
            opacity: 0
        }}
        animate={{
            opacity: 1,
            transition: {
                delay: 1
            }
        }}>
        <MotionListFromTextArray 
        data={thingsToDo}
        groupDelay={1.5} />
        </motion.div>
        <motion.div
        initial={{
            opacity: 0        }}
        animate={{
            opacity: 1,
            transition: {
                delay: 2
            }
        }}>
        <MotionListFromTextArray 
        data={thingsNoComputer}
        groupDelay={2.5}/>
        </motion.div>

        
    </div>
)





    return (
        <>
        {halfStuff}
         {animatedLists}
     
      
       </>
    )
}

export default Landing