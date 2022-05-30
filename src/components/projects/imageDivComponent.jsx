

function ImageDivComponent(props) {
    const imgString =  `https://harrywatton.blob.core.windows.net/$web/assets/${props.source}${props.size}.png`

    return (
      
        <img
          height={props.size}
          width={props.size}
          src={imgString}
          alt={props.title}
        />
    
    );
  }
  
  export default ImageDivComponent;
 