
import { useState } from "react"
import { Link } from "react-router-dom"
import SEO from "../SEO/SEO"
import { blogPosts } from "./blogPosts"
import "./blog.css"

const Blog = () => {
  const [lang, setLang] = useState("en")

  return (
    <>
      <SEO
        title="Blog | Ghoudi Zakaria"
        description="Notes on real bugs, fixes, and lessons learned while building HiSabi, Vounis, and other projects."
        path="/blog"
      />
      <div className="blog-page">
        <div className="blog-header">
          <h1 className="blog-title">Blog</h1>
          <button
            className="lang-toggle"
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
          >
            {lang === "en" ? "العربية" : "English"}
          </button>
        </div>
        <p className="blog-subtitle">
          {lang === "en"
            ? "Real bugs, real fixes, and what I learned along the way."
            : "أخطاء حقيقية، حلول حقيقية، والدروس اللي تعلمتها في الطريق."}
        </p>

        <div className="blog-list">
          {blogPosts.map((post) => (
            <Link to={`/blog/${post.slug}`} key={post.slug} className="blog-card">
              <span className="blog-card-date">{post.date}</span>
              <h2 className="blog-card-title">{post.title[lang]}</h2>
              <p className="blog-card-description">{post.description[lang]}</p>
              <div className="blog-card-tags">
                {post.tags.map((tag, i) => (
                  <span key={i} className="blog-tag">{tag}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Blog
