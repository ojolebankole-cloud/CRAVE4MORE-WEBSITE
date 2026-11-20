import { Link, useParams } from "react-router-dom";
import { PageIntro } from "../components/PageIntro";
import { useCart } from "../context/CartContext";
import { categories, publishedProducts } from "../content/catalogue";

function formatPrice(priceMinor: number, currency: string) {
  const formatter = new Intl.NumberFormat("en", {
    style: "currency",
    currency,
  });

  const fractionDigits =
    formatter.resolvedOptions().maximumFractionDigits ?? 2;

  return formatter.format(priceMinor / 10 ** fractionDigits);
}

export function ProductPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const { addItem } = useCart();
  const product = publishedProducts.find((item) => item.slug === slug);

  if (!product) {
    return (
      <div className="page-shell product-page">
        <PageIntro eyebrow="MENU / PRODUCT" title="This dish is not published yet." description="Product pages appear only when the dish and its details have been confirmed." />
        <Link className="button button--ink" to="/menu">Back to the menu <span aria-hidden="true">↗</span></Link>
      </div>
    );
  }

  const category = categories.find((item) => item.id === product.categoryId);

  return (
    <div className="page-shell product-page">
      <PageIntro eyebrow={category?.name ?? "MENU / PRODUCT"} title={product.name} description={product.shortDescription} />
      <section className="product-detail">
        <div className="product-detail__visual">
          {(product.image || product.poster) && <img src={product.image || product.poster} alt={product.name} />}
          {product.model && <span className="product-detail__model-note">3D scene available for this item</span>}
        </div>
        <div className="product-detail__copy">
          <p>{product.description}</p>
          <p className="product-detail__price">{formatPrice(product.priceMinor, product.currency)}</p>
          {product.ingredients.length > 0 && <p><strong>Ingredients</strong><br />{product.ingredients.join(", ")}</p>}
          {product.allergens.length > 0 && <p><strong>Allergen information</strong><br />{product.allergens.join(", ")}</p>}
          {product.dietaryTags.length > 0 && <p><strong>Dietary notes</strong><br />{product.dietaryTags.join(", ")}</p>}
          <button className="button button--ink" type="button" disabled={!product.available} onClick={() => addItem(product.id)}>
            {product.available ? "Add to cart" : "Currently unavailable"}<span aria-hidden="true">↗</span>
          </button>
        </div>
      </section>
    </div>
  );
}
