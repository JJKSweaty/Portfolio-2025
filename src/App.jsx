import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ScrollProgress } from "./components";
import { ThemeProvider } from "./components/ThemeProvider";
import Home from "./pages/Home";
import ProjectCaseStudy from "./pages/projects/ProjectCaseStudy";

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

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToLocation />
        <ScrollProgress />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectCaseStudy />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
