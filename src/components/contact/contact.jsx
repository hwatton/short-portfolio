function Contact(props){
    

    const contactForm = (
        <form name="contact-form" method="post" action="/">
            <input type="hidden" name="form-name" value="contact-form" />
      <div>
        <label htmlFor="name">Full Name</label> <br />
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Jane Doe"
          required
        />
      </div>
      <div>
        <label htmlFor="email">E-mail</label> <br />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="doe@example.com"
          required
        />
      </div>
      <div>
        <label htmlFor="message">Message</label> <br />
        <textarea
          id="message"
          name="message"
          placeholder="Your message here!"
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
        textAlign: "center"
    }}>
    <p 
    style={{
        margin: "0px"
    }}>I'll be adding a contact form here soon</p>
    <p>for now, get in touch via my instagram profile,  
            <a 
            href="https://www.instagram.com/harry.edmond/?hl=en"
        target="_blank"
        rel="noopener noreferrer"
        > here</a></p>
        {contactForm}
    </div>
)

} 

export default Contact 