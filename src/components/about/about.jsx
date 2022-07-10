function About(props) {

const divWidth = Math.max(280,Math.min(props.dims.width*0.8, 510))

    return (
        <div style={{
            width: "100%",
            textAlign: "center",
            paddingTop: "20px"
        }}>{ props.dims.width && (
            <div style={{
                width: divWidth,
                paddingLeft: (props.dims.width - divWidth)/2}}>
            <h3 style={{fontSize: "20px"}}>About me</h3>
        <p>I've worked in the fine art industry for about 15 years, as an artist, fabricator, project manager, designer and basically anything else that happened to be my job on that day.</p>
       <p>In the past 3 or 4 years, I've been working more and more with digital art, programming and now, mostly in web design.</p>
        <p>I started by programming cells in Excel via macros/VBA and now I mostly work in Javascript and often with d3.js and React.</p>
        <p>My favourite projects are problem solving for a particular graphic effect, programmatically making visualisations with data or making interactive graphics UI.</p>
        <p>I've got lots to learn still, but I like a challenge and I love to learn new things. So it's all working out so far.</p>
        <p>This site is here to show a few of the more creative projects that I've made since late 2020, ish...</p>
        <p>In that time I've done loads of web tutorials etc, a few more physical art projects (CNC work, illustrator scripting etc) and I occasionally join in with a more collaborative arts/maths group  - so I'll give most things a go. Get in touch if you're interested in collaborating.</p>
        
            </div>
        )

        }
           
      </div>
    ) 
    
}

export default About