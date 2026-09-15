import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import SEO from "../SEO/SEO"
import CodeBlock from "./CodeBlock"
import { blogPosts } from "./blogPosts"
import { useViewCounter } from "../../lib/view-counter/useViewCounter"
import "./blogPost.css"


const BlogPost = () => {
  const { slug } = useParams()
  const [lang, setLang] = useState("en")
  const views = useViewCounter(slug)
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
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title[lang],
            "description": post.description[lang],
            "image": "https://ghoudizakaria.vercel.app/og-image.png",
            "author": {
              "@type": "Person",
              "name": "Ghoudi Zakaria",
              "url": "https://ghoudizakaria.vercel.app"
            },
            "datePublished": `${post.date}T00:00:00Z`,
            "inLanguage": lang
          })}
        </script>
      </Helmet>
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

        {views !== null && (
          <div className="blog-post-meta">
  <span className="blog-post-date">{post.date}</span>
  {views !== null && (
    <span className="blog-post-views">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      {views.toLocaleString()}
    </span>
  )}
</div>
<h1 className="blog-post-title" dir={lang === "ar" ? "rtl" : "ltr"}>
  {post.title[lang]}
</h1>
 <div className="blog-post-content" dir={lang === "ar" ? "rtl" : "ltr"}>
          {blocks.map((block, i) => {
            if (block.type === "heading") {
              return <h3 key={i} className="blog-post-heading">{block.text}</h3>
            }
            if (block.type === "image") {
              return (
                <img
                  key={i}
                  src={block.src}
                  alt={block.text || ""}
                  className="blog-post-image"
                />
              )
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
