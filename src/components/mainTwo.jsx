
import '../App.css';
import WelcomeAnimation from './welcome';
import { AnimatePresence, motion } from "framer-motion"
import {useState} from "react"
import Landing from "./landing.jsx"

function MainTwo(props) {
    const window = props.window
    const [showWelcome, setShowWelcome] = useState(true)
  
const oldStuff = (
    <div className="main"
    style={{height: "100%"}}
    >
      <AnimatePresence exitBeforeEnter>
          {showWelcome && 
          <motion.div
          key="before"
          initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 ,
             transition: {
                 duration: 2
             }}}>
          <WelcomeAnimation 
        height={window.height}
        width={300}
        handleExit={()=>setShowWelcome(false)}/>
     </motion.div> }
        
          {!showWelcome && 
          <motion.div
          key="after"
          initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}>
        <Landing 
        height={window.height}
        width={window.width}
        />
     </motion.div> }
        </AnimatePresence>
        
        
      </div>
)


  return (
      <>
      
   {window.width && oldStuff}
   </>
  )
}

export default MainTwo;