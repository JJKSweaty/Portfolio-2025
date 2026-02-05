import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faBars } from "@fortawesome/free-solid-svg-icons";
import { navLinks } from "../constants";
import { logo } from "../assets";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* ── track scroll position ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── highlight active section on scroll ── */
  useEffect(() => {
    const sections = navLinks.map((n) => document.getElementById(n.id)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = navLinks.find((n) => n.id === entry.target.id);
            if (match) setActive(match.title);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNav = useCallback(
    (title) => {
      setActive(title);
      setMobileOpen(false);
    },
    []
  );

  return (
    <>
      {/* ─── Desktop: floating centered pill ─── */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-50 hidden sm:flex justify-center pointer-events-none pt-4"
      >
        <div
          className={`pointer-events-auto flex items-center gap-1 px-1.5 py-1.5 rounded-full border transition-all duration-300 ${
            scrolled
              ? "bg-black/70 backdrop-blur-xl border-white/[0.08] shadow-lg shadow-black/20"
              : "bg-white/[0.03] backdrop-blur-md border-white/[0.06]"
          }`}
        >
          {/* logo */}
          <Link
            to="/"
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.1] transition-colors ml-0.5"
            aria-label="Home"
          >
            <img src={logo} alt="" className="w-5 h-5" />
          </Link>

          {/* divider */}
          <div className="w-px h-5 bg-white/[0.08] mx-1" />

          {/* nav links */}
          {navLinks.map((nav) => {
            const isActive = active === nav.title;
            return (
              <a
                key={nav.id}
                href={`#${nav.id}`}
                onClick={() => handleNav(nav.title)}
                className={`relative px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/[0.06]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{nav.title}</span>
              </a>
            );
          })}

          {/* divider */}
          <div className="w-px h-5 bg-white/[0.08] mx-1" />

          {/* theme toggle */}
          <div className="mr-0.5">
            <ThemeToggle />
          </div>
        </div>
      </motion.nav>

      {/* ─── Mobile: top bar + drawer ─── */}
      <nav
        className={`sm:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-3 transition-all duration-300 ${
          scrolled
            ? "bg-black/70 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <Link
          to="/"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
          className="flex items-center gap-2.5"
        >
          <img src={logo} alt="" className="w-7 h-7" />
          <span className="text-white text-sm font-semibold tracking-tight">JJK</span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center justify-center w-9 h-9 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <FontAwesomeIcon icon={mobileOpen ? faClose : faBars} className="text-lg" />
          </button>
        </div>
      </nav>

      {/* mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="sm:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="sm:hidden fixed top-14 left-4 right-4 z-50 rounded-2xl border border-white/[0.08] bg-black/90 backdrop-blur-xl p-5 shadow-2xl"
            >
              <ul className="flex flex-col gap-1">
                {navLinks.map((nav) => {
                  const isActive = active === nav.title;
                  return (
                    <li key={nav.id}>
                      <a
                        href={`#${nav.id}`}
                        onClick={() => handleNav(nav.title)}
                        className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? "text-white bg-white/[0.06]"
                            : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
                        }`}
                      >
                        {nav.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;