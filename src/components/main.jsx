
import '../App.css';
import Nav from "./nav.jsx"
import WelcomeAnimation from './welcome';
import { AnimatePresence, motion } from "framer-motion"
import {useState} from "react"
import useWindowDims from "../helpers/useWindowDims.js"
import Landing from "./landing.jsx"
import BusinessCard from './businessCard';

function Main() {
    const window = useWindowDims()
    const [showWelcome, setShowWelcome] = useState(true)
  
  return (
    <div className="App"
    style={{
      minHeight: window.height*0.9
    }}>
      <Nav/>
      
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
      <BusinessCard 
      height={window.height}
      width={window.width}
      />
   </motion.div> }
      </AnimatePresence>
      
      
    </div>
  );
}

export default Main;