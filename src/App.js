import "./App.css";
import { useState, useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import SideBar from "./Components/NavBar/SideBar";
import LoadingPage from "./Components/LoadingPage/LoadingPage";

// Lazy-loaded route pages: each becomes its own chunk instead of bloating main.js
const Home = lazy(() => import("./Components/Home/Home"));
const About = lazy(() => import("./Components/About/About"));
const Contact = lazy(() => import("./Components/Contact/Contact"));
const Projects = lazy(() => import("./Components/Projects/Project"));
const Blog = lazy(() => import("./Components/Blog/blog"));
const BlogPost = lazy(() => import("./Components/Blog/blogPost"));

// Theme Provider Component
const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

  return (
    <div className={`app ${isDarkMode ? "dark" : ""}`}>
      {children({ isDarkMode, toggleTheme })}
    </div>
  );
};

// Main App Content Component
const AppContent = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [loading, setLoading] = useState(true);

  // Show loading page for 3 seconds on mount
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    // Show the loading screen only once per browser session, and keep it
    // brief so crawlers/users see real content quickly.
    if (sessionStorage.getItem("hasLoadedOnce")) {
      setLoading(false);
      return;
    }
    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("hasLoadedOnce", "true");
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <ThemeProvider>
      {({ isDarkMode, toggleTheme }) => (
        <>
          <SideBar
            currentPath={currentPath}
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
          />
          <main
            className="main-content"
            //style={{ position: "relative", minHeight: "80vh" }}
          >
            <Suspense fallback={<LoadingPage />}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  //style={{ position: "absolute", width: "100%" }}
                >
                  <Routes location={location}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                </motion.div>
              </AnimatePresence>
            </Suspense>
          </main>
        </>
      )}
    </ThemeProvider>
  );
};

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  );
}

export default App;