import HundredLines from "./hundredLines/hundredLines"
import FlowerMachine from "./individualProjects/flowerMachine/flowerMachine"
import AnglesSpirals from "./anglesSpirals/anglesSpirals"
import Bonacci from "./individualProjects/bonacci"
import Bipper from "./bipper/bipper.jsx"
import Project from "./project"
import PlaceHolder from "./individualProjects/placeHolder"
import Maze from "./maze/maze"
import NeonPath from "./individualProjects/neonPath"
import ColourUI from "./individualProjects/colourUI"
import FlippyCounter from "./individualProjects/flippyCounter"
import Strata from "./individualProjects/strata"
import FibStacks from "./threeJS/fibStacks/FibStacks"
import Robinator from "./individualProjects/robin"
import RhoThetaDK from "./individualProjects/radialMachine"
import Mountain from "./individualProjects/rainbowMountain"
import CrazyDrawing from "./individualProjects/crazyDrawing"




 
 const megaProjectsArray = [
new Project("Hundred Lines", <HundredLines/>, ["framer-motion", "d3.js","animation"],  "hundredLines_"),
new Project("Auto Bipper", <Bipper radius={7.5} gridSize={10} />, ["framer-motion", "animation","react"],"bipper_"),
new Project("Neon Path", <NeonPath/>, ["interactive", "d3.js", "react"], "neonPath_"),
new Project("Maze", <Maze/>, ["algorithms", "aws", "react"],"maze_"),
new Project("Adjustable Angle Phyllotaxis", <AnglesSpirals/>, ["interactive","maths", "react"],"golden_angles_"),
new Project("Flippy Counter", <FlippyCounter/>, ["framer-motion", "animation", "react"],"flippyCounter_"),
new Project("Flower Machine", <FlowerMachine/>, ["interactive","d3.js", "svg", "react"],"flowerMachine_"),
new Project("Many Bonacci", <Bonacci/>, ["maths", "animation", "react", "interactive"],"bonacci_"),
new Project("Radial Drawing Machine", <RhoThetaDK/>, ["interactive","machines", "maths", "react"],"radialMachine_"),
new Project("Rainbow Mountain", <Mountain/>, ["interactive", "react"],"rainbowmountain_"),
new Project("3D Fibonacci Star Stacks", <FibStacks/>, ["three.js" ,"animation", "react"],"rotatingstart_"),
new Project("Strata", <Strata/>, ["svg", "d3.js", "react"],"strata_"),
new Project("Colour Name UI", <ColourUI/>, [ "api", "axios", "react"],"colorUI_"),
new Project("Crazy Drawing With Lines", <CrazyDrawing/>, ["interactive", "d3.js", "react"],"crazy_lines_"),
new Project("Robinator", <Robinator/>, ["canvas", "animation", "react"],"robin_"),
new Project("Radial Reflection", <PlaceHolder mandala/>, ["interactive", "framer-motion", "machines", "react"],"mandala_"),

]

export default megaProjectsArray 

