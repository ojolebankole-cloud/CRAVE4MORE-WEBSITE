import { Link } from "react-router-dom";
import { PageIntro } from "../components/PageIntro";
import { useCart } from "../context/CartContext";

export function CheckoutPage() {
  const { lines, itemCount, clearCart } = useCart();

  return (
    <div className="page-shell checkout-page">
      <PageIntro eyebrow="YOUR ORDER / 01" title="A clear path to the good part." description="Your cart and checkout structure are ready. Live ordering stays switched off until the real menu, fulfilment settings and payment account are configured." />
      <section className="checkout-panel">
        <div className="checkout-panel__main">
          <p className="eyebrow">CART SUMMARY</p>
          {lines.length === 0 ? (
            <div className="checkout-empty">
              <h2>Your cart is taking a little rest.</h2>
              <p>There are no published menu items to add yet. When the menu is confirmed, your selected dishes will appear here.</p>
              <Link className="button button--ink" to="/menu">Explore menu progress <span aria-hidden="true">↗</span></Link>
            </div>
          ) : (
            <div className="checkout-draft">
              <p>{itemCount} item(s) saved in this browser. Product and price details cannot be verified in this preview.</p>
              <button className="text-link text-link--dark" type="button" onClick={clearCart}>Clear draft cart</button>
            </div>
          )}
        </div>
        <aside className="checkout-panel__aside">
          <span className="checkout-panel__aside-number">01—03</span>
          <h3>Ordering is not live yet.</h3>
          <p>No payment will be requested or collected here. A real checkout requires server-side price validation, merchant configuration and verified payment callbacks.</p>
          <span className="status-pill"><i /> PRE-LAUNCH PREVIEW</span>
        </aside>
      </section>
    </div>
  );
}
