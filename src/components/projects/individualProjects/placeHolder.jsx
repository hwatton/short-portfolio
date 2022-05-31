function PlaceHolder(props) {

    return (
        <div style={{
            
            width: props.width,
            backgroundColor: "black",
            color: "white",
            position: "relative"
        }}>
            
                <p>page in development, interactive stuff coming soon!</p>
                <p>placeholder for: {props.words}</p>
        
        </div>
    )
}

export default PlaceHolder