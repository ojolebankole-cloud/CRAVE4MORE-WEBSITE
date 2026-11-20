import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

const links = [
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "Our approach" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const { itemCount } = useCart();

  function closeMenu() {
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuToggleRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="wordmark" to="/" aria-label="Crave4more home" onClick={closeMenu}>
          <span className="wordmark__main">CRAVE4MORE</span>
          <span className="wordmark__sub">A LITTLE MORE TO LOVE</span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => isActive ? "nav-link is-active" : "nav-link"}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="site-header__actions">
          <Link to="/checkout" className="cart-link" aria-label={`Open cart, ${itemCount} items`}>
            <span>Cart</span>
            <span className="cart-link__count" aria-live="polite">{itemCount}</span>
          </Link>
          <button
            ref={menuToggleRef}
            className={`menu-toggle${menuOpen ? " is-open" : ""}`}
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className={({ isActive }) => isActive ? "mobile-nav__link is-active" : "mobile-nav__link"}
              >
                {link.label}<span aria-hidden="true">↗</span>
              </NavLink>
            ))}
            <Link className="mobile-nav__link" to="/checkout" onClick={closeMenu}>
              Cart ({itemCount})<span aria-hidden="true">↗</span>
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
      <span className="sr-only" aria-live="polite">{location.pathname === "/" ? "Home page" : "Page changed"}</span>
    </header>
  );
}
