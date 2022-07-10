function PlaceHolder(props) {
const message = props.mandala ? (
    <>
    <p>Page in development.</p>
    <br/>
    <p>I made this as a working/functional version that I would later jazz up with some sexy stylings.</p>
    <p>I never got round to that, but I'd like to, so I'm hoping to make a bespoke interactive component (adding in better touch handling too...) for this site.</p>
    <p>A version of it can be found <a href="https://codesandbox.io/s/radial-reflection-k2ffb?file=/src/App.js" target="_blank" rel="noopener noreferrer">here</a> on codeSandbox...</p>
    </>
) : (
    <>
    <p>page in development, interactive stuff coming soon!</p>
                <p>placeholder for: {props.words}</p>
    </>
);
    return (
        <div style={{
            
            width: props.width,
            backgroundColor: "black",
            color: "white",
            position: "relative"
        }}>
            
                {message}
        
        </div>
    )
}

export default PlaceHolder