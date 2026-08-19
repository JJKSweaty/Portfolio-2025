import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import { Navbar, ScrollProgress } from "./components";
import { ThemeProvider } from "./components/ThemeProvider";
import Home from "./pages/Home";

const TcpIpStackTutorial = lazy(() => import("./pages/TcpIpStackTutorial"));
const ProjectCaseStudy = lazy(() => import("./pages/projects/ProjectCaseStudy"));
const TcpIpStackPage = lazy(() => import("./pages/projects/TcpIpStackPage"));

const ScrollToLocation = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: "start" });
      });
      return;
    }

    window.scrollTo({ top: 0, left: 0 });
  }, [location.pathname, location.hash]);

  return null;
};

const NotFound = () => {
  useEffect(() => {
    document.title = "Page not found - Jonathan Jacob Koshy";
  }, []);

  return (
    <div className="app-shell">
      <Navbar />
      <main id="main-content" className="site-container not-found">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p>The page you requested does not exist.</p>
        <Link className="button button-primary" to="/">
          Back home
        </Link>
      </main>
    </div>
  );
};

const RouteFallback = () => (
  <main className="route-loading" role="status" aria-live="polite">
    Loading page…
  </main>
);

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToLocation />
        <ScrollProgress />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog/tcp-ip-stack" element={<TcpIpStackTutorial />} />
            <Route path="/blog/tcp-ip-stack/:chapterId" element={<TcpIpStackTutorial />} />
            <Route path="/tutorials/tcp-ip-stack" element={<TcpIpStackTutorial />} />
            <Route path="/code-crafters/tcp-ip-stack" element={<TcpIpStackTutorial />} />
            <Route path="/projects/userspace-tcp-ip-stack" element={<TcpIpStackPage />} />
            <Route path="/projects/:slug" element={<ProjectCaseStudy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
