import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import SEO from "../SEO/SEO"
import CodeBlock from "./CodeBlock"
import { blogPosts } from "./blogPosts"
import "./BlogPost.css"

const BlogPost = () => {
  const { slug } = useParams()
  const [lang, setLang] = useState("en")
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="blog-post-page">
        <p>Post not found.</p>
        <Link to="/blog" className="back-link">← Back to Blog</Link>
      </div>
    )
  }

  const blocks = post.content[lang]

  return (
    <>
      <SEO
        title={`${post.title[lang]} | Ghoudi Zakaria`}
        description={post.description[lang]}
        path={`/blog/${post.slug}`}
      />
      <div className="blog-post-page">
        <div className="blog-post-topbar">
          <Link to="/blog" className="back-link">← Back to Blog</Link>
          <button
            className="lang-toggle"
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
          >
            {lang === "en" ? "العربية" : "English"}
          </button>
        </div>

        <span className="blog-post-date">{post.date}</span>
        <h1 className="blog-post-title" dir={lang === "ar" ? "rtl" : "ltr"}>
          {post.title[lang]}
        </h1>

        <div className="blog-post-tags">
          {post.tags.map((tag, i) => (
            <span key={i} className="blog-tag">{tag}</span>
          ))}
        </div>

        <div className="blog-post-content" dir={lang === "ar" ? "rtl" : "ltr"}>
          {blocks.map((block, i) => {
            if (block.type === "heading") {
              return <h3 key={i} className="blog-post-heading">{block.text}</h3>
            }
            if (block.type === "paragraph") {
              return <p key={i} className="blog-post-paragraph">{block.text}</p>
            }
            if (block.type === "code") {
              return <CodeBlock key={i} code={block.code} language={block.language} />
            }
            return null
          })}
        </div>
      </div>
    </>
  )
}

export default BlogPost

