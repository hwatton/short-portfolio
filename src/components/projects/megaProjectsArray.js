import HundredLines from "./hundredLines/hundredLines"
import FlippyCounter from "./flippyCounter/flippyCounter"
import Maze from "./maze/maze"
import Bipper from "./bipper/bipper.jsx"
import "@fontsource/major-mono-display"
import AnglesSpirals from "./anglesSpirals/anglesSpirals"
import Project from "./project"
 
 const megaProjectsArray = [
new Project("Hundred Lines", <HundredLines/>, ["framer-motion", "animation"],null),
new Project("Bipper", <Bipper radius={7.5} gridSize={10} link={"https://codesandbox.io/s/automatic-spot-bipper-gn6yhj"}/>, ["framer-motion", "animation","react"],null),
new Project("Maze", <Maze  size={10} width={320} height={320} margin={20} />, ["framer-motion", "animation", "aws", "react"],null),
new Project("Adjustable Angle Phyllotaxis", <AnglesSpirals/>, ["maths", "react"],null),
new Project("Flippy Counter", <FlippyCounter />, ["framer-motion", "animation", "react"],null),
new Project("Flower Machine", <FlippyCounter />, ["framer-motion", "animation", "react"],null),
new Project("Many Bonacci", <FlippyCounter />, ["framer-motion", "animation", "react"],null),
new Project("Radial Drawing Machine", <FlippyCounter />, ["framer-motion", "animation", "react"],null),
new Project("Rainbow Mountain", <FlippyCounter />, ["framer-motion", "animation", "react"],null),
new Project("Mandala Maker (unfinished)", <FlippyCounter />, ["framer-motion", "animation", "react"],null),
new Project("3D Fibonacci Star Stacks", <FlippyCounter />, ["framer-motion", "animation", "react"],null),
new Project("Stratae", <FlippyCounter />, ["framer-motion", "animation", "react"],null),
new Project("Colour Name UI", <FlippyCounter />, ["framer-motion", "animation", "react"],null),
new Project("Neon Path", <FlippyCounter />, ["framer-motion", "animation", "react"],null),
new Project("Crazy Drawing With Lines", <FlippyCounter />, ["framer-motion", "animation", "react"],null),
new Project("Robinator", <FlippyCounter />, ["framer-motion", "animation", "react"],null),
new Project("Radial Reflection", <FlippyCounter />, ["framer-motion", "animation", "react"],null),

]

export default megaProjectsArray 