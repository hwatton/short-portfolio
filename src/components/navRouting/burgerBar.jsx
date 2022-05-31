function BurgerBar(props) {

    const gP = props.size/7

    const bars = [...Array(3)].map((el,i)=>{
        const pathString = "M" + gP +"," + ((gP*1.5) + i*gP*2 ) + "L" + (props.size - gP) + "," + ((gP*1.5) + i*gP*2 )

        return <path
        key={"burgerBar_" + i}
        d={pathString}
        style={{
            
            stroke: "rgb(255,10,230)",
            strokeWidth: gP*0.5
        }}/>
    })

    return <svg style={{
        backgroundColor: "rgba(10,30,33, 0.8)",
    }} height={props.size} width={props.size}>
{bars}
    </svg>
}

export default BurgerBar