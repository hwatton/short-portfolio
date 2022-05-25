import HundredLines from "./hundredLines/hundredLines"
import FlippyCounter from "./flippyCounter/flippyCounter"
import Maze from "./maze/maze"
import Bipper from "./bipper/bipper.jsx"
import "@fontsource/major-mono-display"
import AnglesSpirals from "./anglesSpirals/anglesSpirals"



function Projects(props){


    return (
        <div style={{
            width: "100%",
            textAlign: "center",
            fontSize :"12px",
            fontFamily: "Major mono display"
        }}>
           <div style={{width: "320px", margin: "0 auto", display: "flex", flexWrap: "wrap"}}>

        <p style={{margin: 0}}>The following projects are mostly to be found  
            <a 
            href="https://codesandbox.io/dashboard/all/?workspace=08b90dfe-0aa6-49de-bd81-a76b01c6903d"
        target="_blank"
        rel="noopener noreferrer"
        > here</a> on codesandbox, where I generally head to make stuff at the moment.</p>
        <p>For now, I'm dropping a few bits below, will add more as and when I can...</p>
        <br/>
        <div style={{width: "320px", margin: "20px 0px 10px 0px"}}>
        <Bipper radius={7.5} gridSize={10} link={"https://codesandbox.io/s/automatic-spot-bipper-gn6yhj"}/>

        </div>
      <div style={{
          width: "320px",
          margin: "20px 0px 10px 0px",
          paddingTop: "30px",
          backgroundColor: "rgb(10,0,15)",
          borderRadius: "10px",
          border: "2px solid rgb(220,0,220)"
        }}>
        <a href="https://master.d1wyot3bqt0ync.amplifyapp.com/" target="_blank" rel="noopener noreferrer" >
        <Maze 
        size={10}
        width={320}
        height={320}
        margin={20} />
        </a>
        </div>
        
        <div style={{margin: "20px 0px 30px 0px"}}>
        
        <HundredLines  />
        
        </div>
        <div style={{
          width: "320px",
          margin: "20px 0px 10px 0px",
          paddingBottom: "10px",
          backgroundColor: "rgb(10,0,15)",
          borderRadius: "10px",
          border: "2px solid rgb(220,0,220)"
        }}>

        <AnglesSpirals  />
       
        </div>
        <div style={{margin: "20px 0px 30px 0px"}}>

        <FlippyCounter  />
       
        </div>
       
        
      
        <div style={{margin: "20px 0px 30px 0px", width: "320px"}}>
            <p>The embed below is horrible. click on the link to try it out if you're on a wide screen.</p>
            <p>I promise to make a better one for small screens!</p>
        <iframe
        title="rainbow Mountain"
  src="https://codesandbox.io/embed/rainbow-mountain-again-szp1b"
  style={{
      width:"320px", height:"320px", border:"0", borderRadius: "4px", overflow:"hidden"}}
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
</div>
        </div>
        </div>
    )
    
    } 
    
    export default Projects 