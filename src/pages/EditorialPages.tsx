import { Link, useLocation, useParams } from "react-router-dom";
import { PageIntro } from "../components/PageIntro";
import { site } from "../content/site";

export function AboutPage() {
  return (
    <div className="page-shell editorial-page">
      <PageIntro eyebrow="OUR APPROACH / 01" title="A little more feeling. A little less noise." description="Crave4more is being shaped as a warm, thoughtful food experience — where the visual story has atmosphere, and the practical details stay beautifully clear." />
      <section className="editorial-block">
        <p className="eyebrow">THE IDEA</p>
        <div>
          <h2>Let the food<br /><em>take the stage.</em></h2>
          <p>The experience pairs an editorial interface with carefully art-directed food scenes. Motion is used with intention: to reveal texture, guide attention and make each transition feel connected.</p>
          <p>The menu, ingredients, allergens and ordering information will be published only after they are confirmed. The current 3D scene is a visual study, not a promise that the pictured dish is available to order.</p>
        </div>
      </section>
    </div>
  );
}

export function ContactPage() {
  const { address, phone, email, openingHours } = site.business;
  const hasDetails = Boolean(address || phone || email || openingHours);
  return (
    <div className="page-shell contact-page">
      <PageIntro eyebrow="CONTACT / 01" title="Let's stay in touch." description="The contact area is ready for the verified business details." />
      <section className="contact-panel">
        {hasDetails ? (
          <div className="contact-details">
            {address && <p><span>ADDRESS</span>{address}</p>}
            {phone && <p><span>PHONE</span><a href={`tel:${phone}`}>{phone}</a></p>}
            {email && <p><span>EMAIL</span><a href={`mailto:${email}`}>{email}</a></p>}
            {openingHours && <p><span>HOURS</span>{openingHours}</p>}
          </div>
        ) : (
          <div className="contact-pending">
            <span className="menu-empty__symbol" aria-hidden="true">✳</span>
            <h2>Official details will appear here.</h2>
            <p>Address, opening hours, phone, email and social links have not been supplied yet. We have left them blank rather than publishing invented information.</p>
          </div>
        )}
      </section>
    </div>
  );
}

const policies = {
  privacy: { label: "PRIVACY", title: "Your information matters.", note: "A complete privacy notice must be prepared after the business confirms its operator details, the customer data it needs, its service providers and retention practices." },
  terms: { label: "TERMS", title: "Clear expectations matter.", note: "Terms of service must be completed for the real business, applicable jurisdiction, ordering model, fulfilment rules and customer support process." },
  refunds: { label: "REFUNDS & CANCELLATIONS", title: "The details should be clear.", note: "A refund and cancellation policy must reflect the actual menu, preparation workflow, pickup or delivery service, payment provider and applicable consumer rules." },
} as const;

type PolicyKind = keyof typeof policies;

export function PolicyPage() {
  const { pathname } = useLocation();
  const kind = pathname.replace(/^\//, "") as PolicyKind;
  const policy = policies[kind] ?? policies.privacy;
  return (
    <div className="page-shell policy-page">
      <PageIntro eyebrow={`${policy.label} / DRAFT`} title={policy.title} description="This is a publication placeholder, not a final legal policy." />
      <section className="policy-notice" role="note">
        <span className="status-pill"><i /> DRAFT — NOT FOR PRODUCTION</span>
        <h2>Owner and legal review required.</h2>
        <p>{policy.note}</p>
        <p>This page must be reviewed and completed before the website goes live. No customer data collection or payment processing is enabled in this build.</p>
        <Link className="text-link text-link--dark" to="/contact">Return to contact <span aria-hidden="true">↗</span></Link>
      </section>
    </div>
  );
}

export function OrderStatusPage() {
  const { reference } = useParams<{ reference: string }>();
  return (
    <div className="page-shell order-page">
      <PageIntro eyebrow="ORDER STATUS / PREVIEW" title="Your order, clearly tracked." description="Order status will be connected to a verified order service before launch." />
      <section className="policy-notice">
        <span className="status-pill"><i /> NO LIVE ORDER SERVICE</span>
        <h2>We cannot verify this reference.</h2>
        <p>Reference: <code>{reference || "—"}</code></p>
        <p>This project does not yet have an order database or payment provider connected. No order is being described as paid, accepted or in preparation.</p>
        <Link className="button button--ink" to="/menu">Back to the menu <span aria-hidden="true">↗</span></Link>
      </section>
    </div>
  );
}

export function NotFoundPage() {
  return (
    <div className="page-shell not-found-page">
      <PageIntro eyebrow="404 / PAGE NOT FOUND" title="This page took a detour." description="The address may have changed, or the page may not exist yet." />
      <Link className="button button--ink" to="/">Back home <span aria-hidden="true">↗</span></Link>
    </div>
  );
}
