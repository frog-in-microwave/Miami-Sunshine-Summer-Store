import React from "react";
import products from "../../data/fakeDatabase.json";
import ProductCard from "../../components/ui/ProductCard/ProductCard";
import "./ProductDetail.css";

const RelatedProducts = ({ currentId }) => {
  const suggestions = products.filter((p) => p.id !== currentId).slice(0, 4);

  return (
    <section className="related-products">
      <div className="related-header">
        <h2 className="brand-font">Complete the Look</h2>
      </div>
      <div className="related-grid">
        {suggestions.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
