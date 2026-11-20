import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
const HomePage = lazy(() => import("./pages/HomePage").then((module) => ({ default: module.HomePage })));
const MenuPage = lazy(() => import("./pages/MenuPage").then((module) => ({ default: module.MenuPage })));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage").then((module) => ({ default: module.CheckoutPage })));
const ProductPage = lazy(() => import("./pages/ProductPage").then((module) => ({ default: module.ProductPage })));
const {
  AboutPage,
  ContactPage,
  NotFoundPage,
  OrderStatusPage,
  PolicyPage,
} = {
  AboutPage: lazy(() => import("./pages/EditorialPages").then((module) => ({ default: module.AboutPage }))),
  ContactPage: lazy(() => import("./pages/EditorialPages").then((module) => ({ default: module.ContactPage }))),
  NotFoundPage: lazy(() => import("./pages/EditorialPages").then((module) => ({ default: module.NotFoundPage }))),
  OrderStatusPage: lazy(() => import("./pages/EditorialPages").then((module) => ({ default: module.OrderStatusPage }))),
  PolicyPage: lazy(() => import("./pages/EditorialPages").then((module) => ({ default: module.PolicyPage }))),
};

function RouteLoading() {
  return <div className="route-loading" role="status">Loading page…</div>;
}

function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const normalizedPath = pathname.replace(/\/+$/, "") || "/";
    const entries: Record<string, { title: string; description: string }> = {
      "/": { title: "A little more to love", description: "The Crave4more visual experience — warm editorial design, considered detail and a cinematic food stage." },
      "/menu": { title: "Menu preview", description: "The Crave4more menu structure is being prepared. Confirmed dishes and details will be published here." },
      "/checkout": { title: "Your order", description: "Review the Crave4more cart preview. Live ordering and payment are not enabled." },
      "/about": { title: "Our approach", description: "The creative direction behind the Crave4more digital food experience." },
      "/contact": { title: "Contact", description: "Verified Crave4more contact details will be published here when supplied." },
      "/privacy": { title: "Privacy notice draft", description: "The Crave4more privacy notice is a draft awaiting owner and legal review." },
      "/terms": { title: "Terms draft", description: "The Crave4more terms are a draft awaiting owner and legal review." },
      "/refunds": { title: "Refunds and cancellations draft", description: "The Crave4more refund policy is a draft awaiting owner and legal review." },
    };
    const entry = entries[normalizedPath] ?? (normalizedPath.startsWith("/menu/")
      ? { title: "Product details", description: "Crave4more product details are published only after confirmation." }
      : pathname.startsWith("/order/")
        ? { title: "Order status preview", description: "Crave4more order tracking is not connected to a live order service yet." }
        : { title: "Page not found", description: "The Crave4more page you requested could not be found." });

    document.title = `${entry.title} — Crave4more`;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) description.content = entry.description;
    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = `${entry.title} — Crave4more`;
    const ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (ogDescription) ogDescription.content = entry.description;
  }, [pathname]);
  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <PageMetadata />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={<RouteLoading />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/menu/:slug" element={<ProductPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order/:reference" element={<OrderStatusPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PolicyPage />} />
            <Route path="/terms" element={<PolicyPage />} />
            <Route path="/refunds" element={<PolicyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}
