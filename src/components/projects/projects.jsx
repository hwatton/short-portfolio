function Projects(props){

    return (
        <div style={{
            width: "100%",
            textAlign: "center"
        }}>
   
        <p style={{margin: 0}}>The following projects are mostly to be found  
            <a 
            href="https://codesandbox.io/dashboard/all/?workspace=08b90dfe-0aa6-49de-bd81-a76b01c6903d"
        target="_blank"
        rel="noopener noreferrer"
        > here</a> on codesandbox, where I generally head to make stuff at the moment.</p>
        <p>For now, I'm dropping a few in as embeds, but I hope to give them a bit more space as I develop this site.</p>
        <div style={{margin: "30px"}}>
        <iframe
        title="flippy Counter"
  src="https://codesandbox.io/embed/reverent-austin-kchhy?file=/src/flippyCounter.jsx:633-792"
  style={{
      width:"500px", height:"500px", border:"0", borderRadius: "4px", overflow:"hidden"}}
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
        </div>
        <div style={{marginTop: "50px"}}>
        <iframe
        title="rainbow Mountain"
  src="https://codesandbox.io/embed/rainbow-mountain-again-szp1b"
  style={{
      width:"800px", height:"500px", border:"0", borderRadius: "4px", overflow:"hidden"}}
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
        </div>
        </div>
    )
    
    } 
    
    export default Projects 