
import { useRef, useState, useEffect } from "react"
import { useAnimation , motion } from "framer-motion"
import { Link } from "react-router-dom"
import "./Home.css"
import logo from '../../Assets/img.jpg'
import CV from '../../Assets/CV.pdf'
import calcul from "../../Assets/images/calcul.png"
import clock from "../../Assets/images/clock.jpeg"
import movieApp from "../../Assets/images/movieapp.png"
//useRef hooks to create reference fo pages sections
const Home = () => {
  const aboutRef = useRef(null)
  const projectsRef = useRef(null)
  const contactRef = useRef(null)
  const [isVisible, setIsVisible] = useState({
    hero: false,
    about: false,
    projects: false,
    contact: false,
  })
  

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.getAttribute("data-section")
            setIsVisible((prev) => ({ ...prev, [sectionName]: true })) 
          }
        })
      },
      { threshold: 0.1 },
    )

    const sections = document.querySelectorAll("[data-section]")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  const heroData = {
    name: "Ghoudi Zakaria",
    title: "Student in GoMyCode",
    description:
      "As a passionate and dedicated student, I am currently enhancing my skills in web development at GoMyCode. I thrive on creating intuitive and efficient web applications and am constantly exploring new technologies to build robust and engaging user experiences.",
    imageUrl:{logo}
  }

  const cvControls = useAnimation()
  
// Animation controls for button
  const handleCVClick = async () => {
    await cvControls.start({
      rotateY: [135, 90,0],
      background: [
        "linear-gradient(90deg, #007bff 0%, #00c6ff 100%)",
        "linear-gradient(90deg, #ff9800 0%, #ffc107 100%)",
        "linear-gradient(90deg, #007bff 0%, #00c6ff 100%)"
      ],
      color: ["#fff", "#222", "#fff"],
      transition: {
        duration: 0.7,
        times: [0, 0.5, 1],
        ease: "easeInOut"
      }
    })
  }

  return (
    <div className="home-container">

      {/* Hero Section */}

      <section className={`hero-section ${isVisible.hero ? "animate-fade-in" : ""}`} data-section="hero" >
        <div className="hero-content">
          <h1 className="hero-title">{heroData.name}</h1>
          <p className="hero-subtitle">{heroData.title}</p>
          <p className="hero-description">{heroData.description}</p>
          <div className="hero-buttons">
            <motion.a
              href={CV}
              className="btn btn-primary"
              download
              initial={{ boxShadow: "0 4px 24px rgba(0,123,255,0.15)", scale: 1, rotateX: 0, rotateY: 0, background: "linear-gradient(90deg, #007bff 0%, #00c6ff 100%)", color: "#fff" }}
              whileHover={{
                scale: 1.12,
                boxShadow: "0 8px 32px rgba(0,123,255,0.35)",
                rotateX: 12,
                y: -4,
                background: "linear-gradient(90deg, #007bff 0%, #00c6ff 100%)",
                color: "#fff"
              }}
              animate={cvControls}
              onClick={handleCVClick}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              style={{
                border: "none",
                outline: "none",
                padding: "0.75em 2em",
                fontWeight: 600,
                fontSize: "1.1em",
                borderRadius: "2em",
                background: "linear-gradient(90deg, #007bff 0%, #00c6ff 100%)",
                color: "#fff",
                boxShadow: "0 4px 24px rgba(0,123,255,0.15)",
                cursor: "pointer",
                perspective: 600,
                backfaceVisibility: "hidden"
              }}
            >
              Download CV
            </motion.a>
            <motion.button
              onClick={() => scrollToSection(contactRef)}
              className="btn btn-secondary"
              whileHover={{ scale: 1.08, boxShadow: "0 0 8px #6c757d" }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.button>
          </div>
        </div>
        <div className="hero-image-container">
          <div className="hero-image-bg"></div>
          <div className="hero-image-wrapper">
            <img
              src={logo}
              alt="logo"
              className="hero-image"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = {logo}
              }}
            />
          </div>
        </div>
      </section>

      {/* About Section */}

      <section ref={aboutRef} className={`section ${isVisible.about ? "animate-fade-in-up" : ""}`} data-section="about">
        <div className="about-preview">
          <h3 className="section-title">Who I Am</h3>
          <p className="section-content">
            I am a highly motivated and results-driven web developer with a strong foundation in modern web
            technologies. My journey into programming began with a fascination for how digital experiences are built,
            leading me to immerse myself in front-end and back-end development.
          </p>
          <p className="section-content">
            At GoMyCode, I've honed my skills in various aspects of web development, including responsive design,
            single-page applications, and API integration. I am passionate about creating user-centric solutions that
            are not only functional but also intuitive and aesthetically pleasing.
          </p>
        </div>
        <div className="section-button-container">
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
            <Link to="/about" className="btn btn-primary">
              Read More About Me
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}

      <section
        ref={projectsRef}
        className={`section ${isVisible.projects ? "animate-fade-in-up" : ""}`}
        data-section="projects"  >
        <div className="projects-preview">
          <h3 className="section-title">My Latest Projects</h3>
          <div className="projects-grid-preview">
            {[
              {
                title: "Movie App",
                description: "A movie web application building with react js ",
                techStack: ["React", "Node.js"],
                imageUrl: movieApp,
              },
              {
                title: "Simple Clock",
                description: "A simple e-clock web app.",
                techStack: ["HTML","CSS", "JavaScript"],
                imageUrl: clock,
              },
              {
                title: "Calculator",
                description: "This is a simple, aesthetically pleasing calculator web app.",
                techStack: ["HTML", "CSS3", "JavaScript"],
                imageUrl: calcul,
              },
            ].map((project, index ) => (
              <div key={index} className="project-card-preview">
                <img
                  src= {project.imageUrl}
                  alt={project.imageUrl}
                  className="project-image-preview"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = project.imageUrl
                  }}
                />
                <div className="project-content-preview">
                  <h4 className="project-title-preview">{project.title}</h4>
                  <p className="project-description-preview">{project.description}</p>
                  <div className="project-tech-stack-preview">
                    {project.techStack.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag-preview">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="section-button-container">
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
            <Link to="/projects" className="btn btn-primary">
              View All Projects
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}

      <section
        ref={contactRef}
        className={`section ${isVisible.contact ? "animate-fade-in-up" : ""}`}
        data-section="contact"  >
        <div className="contact-preview">
          <h3 className="section-title">Let's Connect!</h3>
          <p className="contact-intro">
            I'm always open to new opportunities, collaborations, and interesting discussions. Feel free to reach out!
          </p>
          <div className="contact-info">
            <div className="contact-item">
              <strong>Email:</strong> Zakariaghoudi1@gmail.com
            </div>
            <div className="contact-item">
              <strong>Location:</strong> Tunisia, Gabes
            </div>
            <div className="contact-item">
              <strong>Available for:</strong> Freelance & Full-time opportunities
            </div>
          </div>
        </div>
        <div className="section-button-container">
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
            <Link to="/contact" className="btn btn-primary">
              Get In Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
