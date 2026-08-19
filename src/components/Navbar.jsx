import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { portfolio } from "../data/portfolio";
import { useTheme } from "@/hooks/useTheme";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isReaderRoute = [
    "/blog/tcp-ip-stack",
    "/tutorials/tcp-ip-stack",
    "/code-crafters/tcp-ip-stack",
  ].some((path) => location.pathname.startsWith(path));
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) {
      setActive("");
      return undefined;
    }

    const sections = portfolio.navLinks
      .map((nav) => document.getElementById(nav.id))
      .filter(Boolean);

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  const handleSectionClick = (event, id) => {
    setMobileOpen(false);
    setActive(id);

    if (!isHome) return;

    const section = document.getElementById(id);
    if (!section) return;

    event.preventDefault();
    section.scrollIntoView({ block: "start" });
  };

  const navItems = portfolio.navLinks.map((nav) => {
    const isActive = active === nav.id;
    const href = isHome ? `#${nav.id}` : `/#${nav.id}`;

    return (
      <a
        key={nav.id}
        href={href}
        onClick={(event) => handleSectionClick(event, nav.id)}
        className={`nav-link ${isActive ? "nav-link-active" : ""}`}
        aria-current={isActive ? "location" : undefined}
      >
        {nav.label}
      </a>
    );
  });

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header
      className={`site-header ${scrolled ? "site-header-scrolled" : ""}`}
    >
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <nav className="site-nav" aria-label="Primary navigation">
        <Link
          to="/"
          onClick={() => {
            setActive("");
            setMobileOpen(false);
            window.scrollTo({ top: 0 });
          }}
          className="brand-mark"
          aria-label={`${portfolio.person.name} home`}
        >
          <span>{portfolio.person.initials}</span>
        </Link>

        <div className="desktop-nav">{navItems}</div>

        <div className="nav-actions">
          {!isReaderRoute && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="theme-toggle"
                  onClick={toggleTheme}
                  aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
                >
                  {resolvedTheme === "dark" ? (
                    <Sun aria-hidden="true" />
                  ) : (
                    <Moon aria-hidden="true" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {resolvedTheme === "dark" ? "Light mode" : "Dark mode"}
              </TooltipContent>
            </Tooltip>
          )}

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="mobile-menu-button"
                aria-label="Open navigation menu"
              >
                <Menu aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="mobile-nav-sheet">
              <SheetTitle>Navigation</SheetTitle>
              <div className="mobile-nav" aria-label="Mobile navigation">
                {navItems}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
