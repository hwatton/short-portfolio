import {motion} from "framer-motion"

function Contact(){
    


    const contactForm = (
        <form name="contact-form" method="post" action="/">
            <input type="hidden" name="form-name" value="contact-form" />
      <div style={{
          margin: "10px"
        }}>
        <label 
                 style={{padding: "5px"}}
                 htmlFor="name">name</label> <br />
        <input
          type="text"
          id="name"
          name="name"
          placeholder="your name..."
          required
        />
      </div>
      <div style={{
          margin: "10px"
        }}>
        <label 
                 style={{padding: "5px"}}
                 htmlFor="email">e-mail</label> <br />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="your email..."
          required
        />
      </div>
      <div style={{
          margin: "10px"
        }}>
        <label 
                 style={{padding: "5px"}}

        htmlFor="message">message</label> <br />
        <textarea
          id="message"
          name="message"
          placeholder="your message..."
          required
        ></textarea>
      </div>
      <div>
        <input type="submit" className="submit" value="Send Message" />
      </div>
    </form>
    )

return (
    <div style={{
        width: "100%",
        textAlign: "center",
        paddingTop: "20px"
    }}>
   <h3 style={{fontSize: "20px"}}>Contact</h3>
    <p style={{
      margin: "0px",
      paddingTop: "20px"
    }}>You can get in touch via my instagram profile...  
            </p>
        <h3><motion.a 
        initial={{color: "rgb(255,255,255)"}}
        whileHover={{color: "rgb(195,0,255)"}}
        style={{
          
          textDecoration: "none"
        }}
            href="https://www.instagram.com/harry.edmond/?hl=en"
        target="_blank"
        rel="noopener noreferrer"
        > *** here ***</motion.a></h3>
        <p>...or, feel free to use the form below.</p>
        {contactForm}
    </div>
)

} 

export default Contact 