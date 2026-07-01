import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { PortfolioCursor, ScrollProgress } from "./components";
import { ThemeProvider } from "./components/ThemeProvider";
import Home from "./pages/Home";
import TcpIpStackTutorial from "./pages/TcpIpStackTutorial";
import ProjectCaseStudy from "./pages/projects/ProjectCaseStudy";
import TcpIpStackPage from "./pages/projects/TcpIpStackPage";

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
        <PortfolioCursor />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/tcp-ip-stack" element={<TcpIpStackTutorial />} />
          <Route path="/tutorials/tcp-ip-stack" element={<TcpIpStackTutorial />} />
          <Route path="/code-crafters/tcp-ip-stack" element={<TcpIpStackTutorial />} />
          <Route path="/projects/userspace-tcp-ip-stack" element={<TcpIpStackPage />} />
          <Route path="/projects/:slug" element={<ProjectCaseStudy />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
