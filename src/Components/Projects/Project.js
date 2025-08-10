
import { useState, useEffect } from "react"
import "./Project.css"
import calcul from "../../Assets/images/calcul.png"
import clock from "../../Assets/images/clock.jpeg"
import todolist from "../../Assets/images/todolist.png"
import weatherapp from "../../Assets/images/weather.png"
import movieApp from "../../Assets/images/movieapp.png"
import chatApp from "../../Assets/images/chat-app.png"
const ExternalLinkIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"> </path>
    <polyline points="15 3 21 3 21 9"> </polyline>
    <line x1="10" x2="21" y1="14" y2="3"></line>
  </svg>
)

const GithubIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.44-.78-3.46 0 0-1 0-2 1.5-1.06-.27-2-1.5-3-1.5s-1.94 1.23-3 1.5c-1 1.5-2 1.5-2 1.5-.5.92-.86 2.1-.78 3.46 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
)

const ProjectCard = ({ title, description, techStack, imageUrl, liveLink, githubLink }) => {
  return (
    <div className="project-card">
      <img
        src={imageUrl || "/placeholder.svg"}
        alt={title}
        className="project-image"
        onError={(e) => {
          e.target.onError = null
          e.target.src = "/placeholder.svg?height=400&width=600&text=Project+Image"
        }}
      />
      <div className="project-content">
        <h4 className="project-title">{title}</h4>
        <p className="project-description">{description}</p>
        <div className="project-tech-stack">
          {techStack.map((tech, index) => (
            <span key={index} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>
        <div className="project-links">
          <a href={liveLink} target="_blank" rel="noopener noreferrer" className="project-link project-link-primary">
            Live Demo
            <ExternalLinkIcon />
          </a>
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link project-link-secondary"
          >
            GitHub
            <GithubIcon />
          </a>
        </div>
      </div>
    </div>
  )
}

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const projects = [
     {
      title: "Movie App",
      description: "A movie web application building with react js ",
      techStack: ["React", "Node.js"],
      imageUrl: movieApp,
      liveLink: "https://movie-apps-eight.vercel.app/",
      githubLink: "https://github.com/Zakariaghoudi/movie-apps",
    },
    
    {
      title: "Simple Clock",
      description:"This a simple simple e-clock web application. ",
      techStack: ["HTML","CSS", "JavaScript"],
      imageUrl: clock,
      liveLink: "https://clock-pi-three.vercel.app/",
      githubLink: "https://github.com/Zakariaghoudi/Clock",
    },
    
    {
      title: "Calculator",
      description:"This is a simple, aesthetically pleasing calculator web app.",
      techStack: ["HTML", "CSS3", "JavaScript"],
      imageUrl: calcul,
      liveLink: "https://calculator-nu-ivory-79.vercel.app",
      githubLink: "https://github.com/Zakariaghoudi/Calculator",
    },
    
    {  title: "ToDo List  App",
      description:"This is a simple, aesthetically pleasing to do list  web app.",
      techStack: ["React js ", "CSS3", "redux"],
      imageUrl: todolist,
      liveLink: "https://todolist-woad-seven.vercel.app/" ,
      githubLink: "https://github.com/Zakariaghoudi/redux",
    },

     {
      title: "Weather App",
      description: "A weather web application building with react js,  ",
      techStack: ["React", "Node.js", "axios"],
      imageUrl: weatherapp,
      liveLink: "https://weather-app-eight-ebon-77.vercel.app/",
      githubLink: "https://github.com/Zakariaghoudi/Weather-App",
    },
     {
      title: "Chat Application",
      description: "An innovative Chat application integrating the power of AI   ",
      techStack: ["React", "Node.js", "axios"],
      imageUrl: chatApp,
      liveLink: "https://chat-application-nine-nu.vercel.app/",
      githubLink: "https://github.com/Zakariaghoudi/chat-application",
   
     }
  ]

  return (
    <div className={`projects-page ${isVisible ? "animate-fade-in" : ""}`} >
      <h2 className="page-title">My Projects</h2>
      <div className="projects-content">
        <h3 className="section-title">Featured Work</h3>
        <p className="projects-intro">
          Here are some of the projects I've worked on recently. Each project represents a unique challenge and learning
          opportunity, showcasing different aspects of web development.
        </p>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project}  />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects
