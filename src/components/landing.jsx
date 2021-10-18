import "@fontsource/major-mono-display"


function Landing(props) {
const dWid = Math.max(props.width/2, 320)
const marg = (props.width - dWid)/2

const allTheStuff = (
    <div style={{
            transform: "translate(0px, 50px)",
            fontFamily: "Major mono display",
            fontSize: 16 ,
            width: Math.max(props.width/2, 320),
            marginLeft: marg,
            paddingBottom: "150px"
        }}>
            <h3 style={{margin: "0px"}}>My nAmE is HaRrY WAtTon</h3>
            <p>i'm a fRoNt-end DeveLopeR, wIth a BackgrOuNd in FinE Art mANufactUrinG aNd ProduCtion.</p>
          <br />
         
              <p>this site is like a business card or a small portfolio. you cAn find out a bit more about me below or to see more of my work, check out my profiles via the links below:</p>
         <p>(insert links here)</p>
       
          <h3>fAvourite Things:</h3>
              <ul style={{
                  width: dWid*0.8,
                  marginLeft: dWid*0.1,
                  textAlign: "left"
                  }}>
              <li>javascript</li>
              <li>react</li>
              <li>d3.js</li>
              <li>framer-motion</li>
              <li>html/css</li>
              <li>data visualisation</li>
              <li>animation/interactive</li>
              <li>creative coding</li>
              <li>Maths problems & concepts</li>
              <li>Adobe (pS, ill, xd)</li>
            
              <li>Azure, sql, python, VbA</li>
              <li>problem solving</li>
              <li>project management</li>
              </ul>
              <br />

             <h3> things i'd like to do:</h3>
             <ul style={{
                  width: dWid*0.8,
                  marginLeft: dWid*0.1,
                  
                  textAlign: "left"
                  }}>
             <li>UX design</li>
             <li>data analysis</li>
             <li>machine learning</li>
             <li>react native</li>
             </ul>

            <br />
            <h3>fAvourite Things that don't require a computer:</h3>
            <ul>
                <li>painting</li>
                <li>cycling</li>
                <li>running</li>
                <li>reading about any of the above ^</li>
                <li >my cat jeff</li>
                <li>walking</li>
                <li>black sheep ale</li>

            </ul>
            
            
             
              

     

        </div>
)



    return (
        <>
       {allTheStuff}
       </>
    )
}

export default Landing