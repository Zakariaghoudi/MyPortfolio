
import { useState, useEffect } from "react"
import "./Contact.css"
import logo2 from '../../Assets/img2.jpg'
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState("")
  const [errors, setErrors] = useState({})

//validate form in conditionnal

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  /*const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setStatus("sending")
    console.log("Form Data Submitted:", formData)

    setTimeout(() => {
      setStatus("success")
      setFormData({ name: "", email: "", message: "" })
      setErrors({})

      // Reset status after 5 seconds
      setTimeout(() => {
        setStatus("")
      }, 5000)
    }, 1500)
  }

 **/ return (
    <form action="https://formsubmit.co/412c4971eb389ab58bb5f11fce503f8a" method="POST"  className="contact-form">
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`form-input ${errors.name ? "error" : ""}`}
          placeholder="Your full name"
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`form-input ${errors.email ? "error" : ""}`}
          placeholder="your.email@example.com"
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="message" className="form-label">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className={`form-textarea ${errors.message ? "error" : ""}`}
          placeholder="Tell me about your project or just say hello..."
          rows="5"
        />
        {errors.message && <span className="error-message">{errors.message}</span>}
      </div>

      <button type="submit" className="form-submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>

      {status === "success" && (
        <p className="form-message success">Message sent successfully! I'll get back to you soon.</p>
      )}
      {status === "error" && <p className="form-message error">Failed to send message. Please try again.</p>}
    </form>
  )
}

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animation on mount
    
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`contact-page ${isVisible ? "animate-fade-in" : ""}`} >

      <div className="contact-content">
        <h3 className="section-title">Let's Connect!</h3>
        <img src={logo2} className="image2"/>
        <ContactForm />
      </div>
    </div>
  )
}

export default Contact
