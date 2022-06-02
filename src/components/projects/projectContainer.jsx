export default function ProjectContainer(props) {
    return <div style={{
        display: "flex",
        justifyContent: "center",
        padding: "0px"
    }}>
        {props.children}
    </div>
}