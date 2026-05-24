import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  // Array of vibey background colors
  const bgColors = ["#FFB627", "#FF6B35", "#00E5FF", "#FFD1DC"];
  const randomBg = bgColors[product.id % bgColors.length];

  return (
    <div  className="vibe-card" style={{ backgroundColor: randomBg }}>
      <Link to={`/product/${product.id}`}>
      {product.status ? <div className="card-tag brand-font">{product.status || ""}</div> : null}
        
        <div className="card-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="card-info">
          <div className="info-left">
            <h3 className="brand-font">{product.name}</h3>
            <span className="card-category">{product.category}</span>
          </div>
          <div className="card-price brand-font">${product.price}</div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
