/*
import HundredLines from "./hundredLines/hundredLines"
import FlippyCounter from "./flippyCounter/flippyCounter"
import Maze from "./maze/maze"
import Bipper from "./bipper/bipper.jsx"
import AnglesSpirals from "./anglesSpirals/anglesSpirals"
*/
import "@fontsource/major-mono-display"

import Project from "./project"
import PlaceHolder from "./individualProjects/placeHolder"


 
 const megaProjectsArray = [
new Project("Hundred Lines", <PlaceHolder/>, ["framer-motion", "d3.js","animation"],  "hundredLines_"),
new Project("Auto Bipper", <PlaceHolder/>, ["framer-motion", "animation","react"],"bipper_"),
new Project("Neon Path", <PlaceHolder/>, ["interactive", "d3.js", "react"], "neonPath_"),
new Project("Maze", <PlaceHolder/>, ["algorithms", "aws", "react"],"maze_"),
new Project("Adjustable Angle Phyllotaxis", <PlaceHolder/>, ["interactive","maths", "react"],"golden_angles_"),
new Project("Flippy Counter", <PlaceHolder/>, ["framer-motion", "animation", "react"],"flippyCounter_"),
new Project("Flower Machine", <PlaceHolder/>, ["interactive","d3.js", "svg", "react"],"flowerMachine_"),
new Project("Many Bonacci", <PlaceHolder/>, ["maths", "animation", "react", "interactive"],"bonacci_"),
new Project("Radial Drawing Machine", <PlaceHolder/>, ["interactive","machines", "maths", "react"],"radialMachine_"),
new Project("Rainbow Mountain", <PlaceHolder/>, ["interactive", "react"],"rainbowmountain_"),
new Project("3D Fibonacci Star Stacks", <PlaceHolder/>, ["three.js" ,"animation", "react"],"rotatingstart_"),
new Project("Stratae", <PlaceHolder/>, ["svg", "d3.js", "react"],"strata_"),
new Project("Colour Name UI", <PlaceHolder/>, [ "api", "react"],"colorUI_"),
new Project("Crazy Drawing With Lines", <PlaceHolder/>, ["interactive", "d3.js", "react"],"crazy_lines_"),
new Project("Robinator", <PlaceHolder/>, ["canvas", "animation", "react"],"robin_"),
new Project("Radial Reflection", <PlaceHolder/>, ["interactive", "framer-motion", "machines", "react"],"mandala_"),

]

export default megaProjectsArray 

/**
 * TODO:
 * 
 * <Bipper radius={7.5} gridSize={10} link={"https://codesandbox.io/s/automatic-spot-bipper-gn6yhj"}/>
 * <Maze  size={10} width={320} height={320} margin={20} />
 * 
 * update. pics gatrhered for all. will make a generic image component and just drop the url of the image in as props.
 * 
 *next :  make lightweight versions of all, that animate, but only on hover.
 maybe on mobile.... have a little play button that sets the animation through one cycle?
 or, on click/tap, start the animation and then fade to black, then fade in the main component route.
 ..or, one click selects, starts animation(! and in doing so passes null to other animations!) and shows a mini bottom nav  to go back, or  choose this project.
 * 
 * compoennts: go and get them all and put them in.
 * find animated blob ones.
 * maybe anythin else from old site that was actually ok. cells?
 * possibly bubble popper? maybe just a link to codepen.
 * 
 * images:
 * images needed for some, but.... generate the svg for:
 * hundred lines - make a big spinner basically
 * bipper - make a very simple animation, maybe a bit of cheeky state.
 * maze. get the function, thrash out a very simple one.
 * aAphyllo: draw up a simplae variation, statically.
 * flippy counter: just draw it out?
 * flower machine: do an aminated  path length flower // or just a janky flower
 * bonacci -  do a quick layout
 * radial machine - maybe a picture, maybe remake with a massiv cog anyway and have that
 * rinbow mountain - show a output picture.
 * 3D thing - picture. 
 *  stratae either generate, or possibly a picture
 * colour name UI - framer motion animation of a slider and colour changing.
 * neon path => some neon looking jazz
 * crazy drawing : png of output?
 * robinator : robin picture, obvs.
 * radial reflection : pictures (slideshow?) of output....
 * 
 * 
 https://harrywatton.blob.core.windows.net/$web/assets/
images/bipper_150.png
images/bipper_300.png
images/bonacci_150.png
images/bonacci_300.png
images/colorUI_150.png
images/colorUI_300.png
images/crazy_lines_150.png
images/crazy_lines_300.png
images/flippyCounter_150.png
images/flippyCounter_300.png
images/flowerMachine_150.png
images/flowerMachine_300.png
images/golden%20angles.png
images/golden_angles_150.png
images/golden_angles_300.png
images/hundredLines_150.png
images/hundredLines_300.png
images/mandala_150.png
images/mandala_300.png
images/maze.png
images/maze_150.png
images/maze_300.png
images/neonPath_150.png
images/neonPath_300.png
images/radialMachine_150.png
images/radialMachine_300.png
images/rainbowmountain_150.png
images/rainbowmountain_300.png
images/robin_150.png
images/robin_300.png
images/rotatingstart_150.png
images/rotatingstart_300.png
images/strata_150.png
images/strata_300.

*/