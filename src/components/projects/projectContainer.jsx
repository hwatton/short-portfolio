export default function ProjectContainer(props) {
    return <div style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px"
    }}>
        {props.children}
    </div>
}