import { Helmet } from "react-helmet-async";

// Change this once you buy a custom domain (recommended for SEO).
const SITE_URL = "https://ghoudizakaria.vercel.app";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

/**
 * Drop <SEO .../> at the top of any page component to set that page's
 * <title>, meta description, canonical URL, and social share tags.
 *
 * Example:
 *   <SEO
 *     title="Projects | Ghoudi Zakaria"
 *     description="A selection of web apps built by Ghoudi Zakaria using React and Node.js."
 *     path="/projects"
 *   />
 */
const SEO = ({ title, description, path = "/", image = DEFAULT_IMAGE }) => {
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph (Facebook, LinkedIn, WhatsApp) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
