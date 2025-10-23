import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose,faBars } from '@fortawesome/free-solid-svg-icons'
import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo } from "../assets";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-black/80 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt='logo' className='w-9 h-9 mx-5' />
          <p className='text-white text-[18px] font-bold cursor-pointer flex mx-2'>
            Jonathan Jacob Koshy &nbsp;
            <span className='xl:block hidden text-[var(--theme-primary)]'> | Electrical Engineer</span>
          </p>
        </Link>

        <ul className='list-none hidden sm:flex flex-row gap-10 items-center'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-[var(--theme-primary)]" : "text-white"
              } hover:text-[var(--theme-primary)] text-[14px] font-medium cursor-pointer transition-colors duration-300`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
          <li>
            <ThemeToggle />
          </li>
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <button onClick={() => setToggle(!toggle)} className="text-[var(--theme-primary)] text-2xl cursor-pointer">
            <FontAwesomeIcon icon={toggle ? faClose : faBars} />
          </button>

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-black/95 backdrop-blur-sm absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl border border-[var(--theme-primary)]/20`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-[var(--theme-primary)]" : "text-white"
                  } hover:text-[var(--theme-primary)] transition-colors duration-300`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;