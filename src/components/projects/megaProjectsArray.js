import HundredLines from "./hundredLines/hundredLines"
import FlippyCounter from "./flippyCounter/flippyCounter"
import Maze from "./maze/maze"
import Bipper from "./bipper/bipper.jsx"
import "@fontsource/major-mono-display"
import AnglesSpirals from "./anglesSpirals/anglesSpirals"
import Project from "./project"
import {HunSpin, NeonThumb, BipThumble} from "./thumbs/thumbs"

 
 const megaProjectsArray = [
new Project("Hundred Lines", <HundredLines/>, ["framer-motion", "d3.js","animation"],  (d) => <HunSpin height={d.height} width={d.width} window={d}/>),
new Project("Auto Bipper", <Bipper radius={7.5} gridSize={10} link={"https://codesandbox.io/s/automatic-spot-bipper-gn6yhj"}/>, ["framer-motion", "animation","react"],(d) => <BipThumble height={d.height} width={d.width} window={d}/>),
new Project("Neon Path", <FlippyCounter />, ["interactive", "d3.js", "react"], (d) => <NeonThumb height={d.height} width={d.width} window={d}/>),
new Project("Maze", <Maze  size={10} width={320} height={320} margin={20} />, ["algorithms", "aws", "react"],null),
new Project("Adjustable Angle Phyllotaxis", <AnglesSpirals/>, ["interactive","maths", "react"],null),
new Project("Flippy Counter", <FlippyCounter />, ["framer-motion", "animation", "react"],null),
new Project("Flower Machine", <FlippyCounter />, ["interactive","d3.js", "svg", "react"],null),
new Project("Many Bonacci", <FlippyCounter />, ["maths", "animation", "react", "interactive"],null),
new Project("Radial Drawing Machine", <FlippyCounter />, ["interactive","machines", "maths", "react"],null),
new Project("Rainbow Mountain", <FlippyCounter />, ["interactive", "react"],null),
new Project("3D Fibonacci Star Stacks", <FlippyCounter />, ["three.js" ,"animation", "react"],null),
new Project("Stratae", <FlippyCounter />, ["svg", "d3.js", "react"],null),
new Project("Colour Name UI", <FlippyCounter />, [ "api", "react"],null),
new Project("Crazy Drawing With Lines", <FlippyCounter />, ["interactive", "d3.js", "react"],null),
new Project("Robinator", <FlippyCounter />, ["canvas", "animation", "react"],null),
new Project("Radial Reflection", <FlippyCounter />, ["interactive", "framer-motion", "machines", "react"],null),

]

export default megaProjectsArray 

/**
 * TODO:
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
 * URLS:
https://harrywatton.blob.core.windows.net/$web/assets/bipper_150.png
https://harrywatton.blob.core.windows.net/$web/assets/bipper_300.png
https://harrywatton.blob.core.windows.net/$web/assets/bonacci_150.png
https://harrywatton.blob.core.windows.net/$web/assets/bonacci_300.png
https://harrywatton.blob.core.windows.net/$web/assets/colorUI_150.png
https://harrywatton.blob.core.windows.net/$web/assets/colorUI_300.png
https://harrywatton.blob.core.windows.net/$web/assets/crazy_lines_150.png
https://harrywatton.blob.core.windows.net/$web/assets/crazy_lines_300.png
https://harrywatton.blob.core.windows.net/$web/assets/flippyCounter_150.png
https://harrywatton.blob.core.windows.net/$web/assets/flippyCounter_300.png
https://harrywatton.blob.core.windows.net/$web/assets/flowerMachine_150.png
https://harrywatton.blob.core.windows.net/$web/assets/flowerMachine_300.png
https://harrywatton.blob.core.windows.net/$web/assets/golden%20angles.png
https://harrywatton.blob.core.windows.net/$web/assets/golden_angles_150.png
https://harrywatton.blob.core.windows.net/$web/assets/golden_angles_300.png
https://harrywatton.blob.core.windows.net/$web/assets/hun%20neon%20bip.png
https://harrywatton.blob.core.windows.net/$web/assets/hundredLines_150.png
https://harrywatton.blob.core.windows.net/$web/assets/hundredLines_300.png
https://harrywatton.blob.core.windows.net/$web/assets/mandala_150.png
https://harrywatton.blob.core.windows.net/$web/assets/mandala_300.png
https://harrywatton.blob.core.windows.net/$web/assets/maze.png
https://harrywatton.blob.core.windows.net/$web/assets/maze_150.png
https://harrywatton.blob.core.windows.net/$web/assets/maze_300.png
https://harrywatton.blob.core.windows.net/$web/assets/neonPath_150.png
https://harrywatton.blob.core.windows.net/$web/assets/neonPath_300.png
https://harrywatton.blob.core.windows.net/$web/assets/radialMachine_150.png
https://harrywatton.blob.core.windows.net/$web/assets/radialMachine_300.png
https://harrywatton.blob.core.windows.net/$web/assets/rainbowmountain_150.png
https://harrywatton.blob.core.windows.net/$web/assets/rainbowmountain_300.png
https://harrywatton.blob.core.windows.net/$web/assets/robin_150.png
https://harrywatton.blob.core.windows.net/$web/assets/robin_300.png
https://harrywatton.blob.core.windows.net/$web/assets/rotatingstart_150.png
https://harrywatton.blob.core.windows.net/$web/assets/rotatingstart_300.png
https://harrywatton.blob.core.windows.net/$web/assets/strata_150.png
https://harrywatton.blob.core.windows.net/$web/assets/strata_300.png
 */