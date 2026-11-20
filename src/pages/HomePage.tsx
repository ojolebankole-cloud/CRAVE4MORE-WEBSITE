import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ScrollReveal } from "../components/ScrollReveal";

const SignatureStage = lazy(() => import("../components/SignatureStage").then((module) => ({ default: module.SignatureStage })));

function SignatureStageFallback() {
  return (
    <section className="hero-stage signature-stage signature-stage--loading" aria-label="Crave4more visual stage" aria-busy="true">
      <div className="hero-stage__grain" aria-hidden="true" />
      <div className="hero-stage__copy">
        <p className="eyebrow eyebrow--light"><span className="eyebrow__dot" /> FOOD, IN FOCUS <span className="eyebrow__divider">/</span> CRAVE4MORE</p>
        <h1>A little more<br /><em>to love.</em></h1>
        <p className="hero-stage__lead">A first look at the Crave4more visual world: warm light, tactile detail and one clear focal point.</p>
        <div className="hero-stage__actions"><Link className="button button--copper" to="/menu">Explore the menu <span aria-hidden="true">↗</span></Link></div>
      </div>
      <div className="hero-stage__visual" aria-hidden="true">
        <div className="hero-stage__orbit hero-stage__orbit--outer" />
        <div className="hero-stage__orbit hero-stage__orbit--inner" />
        <span className="stage-fallback__plate" />
      </div>
      <div className="hero-stage__foot"><span>ASSET DEVELOPMENT PREVIEW</span><span className="hero-stage__foot-right">BY KOLEDEV</span></div>
    </section>
  );
}

export function HomePage() {
  return (
    <ScrollReveal>
      <div className="home-page">
        <Suspense fallback={<SignatureStageFallback />}><SignatureStage /></Suspense>

        <section className="intro-section" id="experience" aria-labelledby="intro-title">
          <div className="intro-section__meta" data-reveal>
            <span className="eyebrow">01 / THE EXPERIENCE</span>
            <span className="intro-section__line" />
            <span className="micro-copy">A MORE THOUGHTFUL FOOD JOURNEY</span>
          </div>
          <div className="intro-section__body" data-reveal>
            <h2 id="intro-title">The first taste<br />is <em>the feeling.</em></h2>
            <p>
              Before the first bite, there is the anticipation. The colour, the texture, the detail. Crave4more brings those
              moments forward through a calm editorial world and a carefully guided digital experience.
            </p>
            <Link className="text-link text-link--dark" to="/about">The thinking behind it <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="intro-section__stamp" aria-hidden="true"><span>CRAVE</span><b>✳</b><span>MORE</span></div>
        </section>

        <section className="craft-section" aria-labelledby="craft-title">
          <div className="craft-section__top" data-reveal>
            <p className="eyebrow eyebrow--light">02 / THE DETAILS</p>
            <span className="micro-copy micro-copy--light">LESS NOISE. MORE FEELING.</span>
          </div>
          <div className="craft-section__heading" data-reveal>
            <h2 id="craft-title">Made to be<br /><em>remembered.</em></h2>
            <p>Every part of the journey has a role. The visual story draws you in. The information stays clear. The next step is always easy to find.</p>
          </div>
          <div className="craft-grid">
            <article className="craft-card" data-reveal>
              <span className="craft-card__number">01</span>
              <div className="craft-card__mark craft-card__mark--orbit" aria-hidden="true"><i /><i /><i /></div>
              <h3>The first look</h3>
              <p>A focused visual centre, thoughtful light and room for the food to speak.</p>
            </article>
            <article className="craft-card" data-reveal>
              <span className="craft-card__number">02</span>
              <div className="craft-card__mark craft-card__mark--type" aria-hidden="true">Aa</div>
              <h3>The details</h3>
              <p>Readable information and a considered rhythm, without decoration getting in the way.</p>
            </article>
            <article className="craft-card" data-reveal>
              <span className="craft-card__number">03</span>
              <div className="craft-card__mark craft-card__mark--path" aria-hidden="true"><i /><i /><i /></div>
              <h3>The handoff</h3>
              <p>A clear route from discovery to the practical details that make ordering feel simple.</p>
            </article>
          </div>
        </section>

        <section className="menu-invitation" aria-labelledby="menu-invitation-title">
          <div className="menu-invitation__side" data-reveal>
            <p className="eyebrow">03 / THE MENU</p>
            <span className="menu-invitation__side-note">A WORK IN PROGRESS</span>
          </div>
          <div className="menu-invitation__main" data-reveal>
            <h2 id="menu-invitation-title">Good things<br />are worth<br /><em>getting right.</em></h2>
            <div className="menu-invitation__bottom">
              <p>The visual stage is taking shape. Dish names, ingredients, allergen details and prices will appear here once the real menu has been confirmed.</p>
              <Link className="button button--ink" to="/menu">View menu progress <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
          <div className="menu-invitation__mark" aria-hidden="true">C.</div>
        </section>
      </div>
    </ScrollReveal>
  );
}
