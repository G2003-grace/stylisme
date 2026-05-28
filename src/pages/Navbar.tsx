import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <header className="flex justify-between items-center px-10 py-5 bg-[#1a1a1a] text-white border-b border-[#C8A165]/30">
      <Link to="/" className="flex items-center gap-3">
        <img
          src="/WhatsApp%20Image%202026-04-28%20at%2012.02.27.jpeg"
          alt="SamStyle"
          className="h-12 w-12 object-cover rounded-full ring-2 ring-[#C8A165]"
        />
        <span className="font-serif text-xl tracking-wide text-[#C8A165]">
          SamStyle
        </span>
      </Link>

      <nav className="flex gap-10 text-xs tracking-[0.3em] uppercase">
        <Link to="/" className="hover:text-[#C8A165] transition">
          Accueil
        </Link>
        <Link to="/propos" className="hover:text-[#C8A165] transition">
          À propos
        </Link>
        <Link to="/catalogue" className="hover:text-[#C8A165] transition">
          Catalogue
        </Link>
        <Link to="/contact" className="hover:text-[#C8A165] transition">
          Contact
        </Link>
      </nav>

      <div className="flex items-center gap-6">
        <Link
          to="/clients"
          className="flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-white hover:text-[#C8A165] transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-4 w-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          <span className="hidden md:inline">Mon espace</span>
        </Link>
        <Link
          to="/catalogue"
          className="border border-[#C8A165] text-[#C8A165] px-6 py-2 text-xs tracking-[0.2em] uppercase hover:bg-[#C8A165] hover:text-white transition"
        >
        Commander
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
