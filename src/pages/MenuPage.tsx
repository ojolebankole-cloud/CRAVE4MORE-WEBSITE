import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageIntro } from "../components/PageIntro";
import { categories, publishedProducts } from "../content/catalogue";

export function MenuPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const visibleProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return publishedProducts.filter((product) => {
      const matchesQuery = !normalized || product.name.toLowerCase().includes(normalized);
      const matchesCategory = activeCategory === "all" || product.categoryId === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategory]);

  return (
    <div className="page-shell menu-page">
      <PageIntro
        eyebrow="THE MENU / 01"
        title="Find your next favourite."
        description="A considered menu experience is taking shape. Published dishes will appear here with their confirmed details."
      />
      <div className="menu-tools">
        <label className="search-field">
          <span className="sr-only">Search menu</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the menu" type="search" />
          <span aria-hidden="true">⌕</span>
        </label>
        {categories.length > 0 && (
          <div className="category-list" aria-label="Filter by category">
            <button type="button" className={activeCategory === "all" ? "category-chip is-active" : "category-chip"} onClick={() => setActiveCategory("all")}>All</button>
            {categories.filter((category) => category.enabled).map((category) => (
              <button key={category.id} type="button" className={activeCategory === category.id ? "category-chip is-active" : "category-chip"} onClick={() => setActiveCategory(category.id)}>{category.name}</button>
            ))}
          </div>
        )}
      </div>

      {visibleProducts.length === 0 ? (
        <section className="menu-empty" aria-live="polite">
          <span className="menu-empty__symbol" aria-hidden="true">✳</span>
          <p className="eyebrow">MENU PREVIEW</p>
          <h2>{query ? "Nothing published matches that search." : "The menu is being prepared."}</h2>
          <p>We are keeping this space clear until the actual dishes, names, ingredients, allergens and prices have been confirmed. No sample items or made-up prices are shown.</p>
          <Link className="text-link text-link--dark" to="/contact">Contact information <span aria-hidden="true">↗</span></Link>
        </section>
      ) : (
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <Link to={`/menu/${product.slug}`} className="product-card__link">
                {product.image && <img src={product.image} alt="" loading="lazy" />}
                <span>{product.name}</span>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
