import { Link } from "react-router-dom";
import { site } from "../content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div>
          <p className="eyebrow eyebrow--light">A LITTLE MORE TO LOVE</p>
          <p className="site-footer__statement">Stay close<br /><em>to what you crave.</em></p>
        </div>
        <Link className="round-link" to="/menu" aria-label="Explore the menu">
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div className="site-footer__bottom">
        <Link className="site-footer__brand" to="/">CRAVE4MORE</Link>
        <div className="site-footer__links" aria-label="Footer navigation">
          <Link to="/menu">Menu</Link>
          <Link to="/about">Our approach</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="site-footer__legal">
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/refunds">Refunds</Link>
        </div>
        <p className="site-footer__credit">An experience by <span>{site.developer}</span></p>
      </div>
    </footer>
  );
}
