import "@fontsource/major-mono-display"


function Landing(props) {
const dWid = Math.max(props.width/2, 320)
const marg = (props.width - dWid)/2
    return (
        <div style={{
            transform: "translate(0px, 50px)",
            fontFamily: "Major mono display",
            fontSize: 16 ,
            width: Math.max(props.width/2, 320),
            marginLeft: marg
        }}>
            <h3>My nAmE is HaRrY WAtTon</h3>
            <p>i'm a fRoNt-end DeveLopeR, wIth a BackgrOuNd in FinE Art mANufactUrinG aNd ProduCtion.</p>
          <br />
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
             
              

     

        </div>
    )
}

export default Landing