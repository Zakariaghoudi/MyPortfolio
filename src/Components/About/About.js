
import { useState, useEffect } from "react"
import "./About.css"
import { DiHtml5, DiResponsive, DiCss3, DiJavascript1, DiReact, DiNodejs, DiGithub } from 'react-icons/di';
import img3 from "../../Assets/img3.jpg"
const About = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animation on mount for components
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`about-page ${isVisible ? "animate-fade-in" : ""}`} >
      <h2 className="page-title">About Me</h2>

      <div className="about-content">
        <img src={img3} className="img3"/>
        <p className="section-content">
          I am a highly motivated and results-driven web developer with a strong foundation in modern web technologies.
          My journey into programming began with a fascination for how digital experiences are built, leading me to
          immerse myself in front-end and back-end development.
        </p>
        <p className="section-content">
          At GoMyCode, I've honed my skills in various aspects of web development, including responsive design,
          single-page applications, and API integration. I am passionate about creating user-centric solutions that are
          not only functional but also intuitive and aesthetically pleasing.
        </p>

        <h4 className="subsection-title">Skills & Expertise</h4>

        <div className="skills-grid"> {/* array of icons of skills */}
          {[
            {icon: <DiHtml5 color="#e34c26" size="60px" /> },
            {icon: <DiCss3 color="#2965f1" size="60px" /> },
            {icon: <DiJavascript1 color="#f7df1e" size="60px" /> },
            {icon: <DiReact color="#61dafb" size="60px" /> },
            {icon: <DiNodejs color="#68a063" size="60px" /> },
            {icon: <DiGithub color="#333" size="60px" /> },
            {icon: <DiResponsive color="#ff9800" size="75px" /> },
          ].map((skill, index) => (
            <span key={index} className="skill-tag" style={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
              {skill.icon}
              
            </span>
          ))}
        </div>

        <h4 className="subsection-title">My Approach</h4>
        <p className="section-content">
          I believe in continuous learning and adapting to new technologies. My development process emphasizes clean
          code, modular architecture, and thorough testing to ensure robust and maintainable applications. I enjoy
          collaborating with teams and contributing to projects that make a real impact.
        </p>

        <h4 className="subsection-title">Education & Experience</h4>
        <div className="experience-section">
          <div className="experience-item">
            <h5 className="experience-title">Web Development Bootcamp</h5>
            <p className="experience-company">GoMyCode - 2025</p>
            <p className="experience-description">
              Intensive full-stack web development program covering modern technologies including React, Node.js, and
              database management. Completed multiple real-world projects and collaborated with peers on team-based
              assignments.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About;
