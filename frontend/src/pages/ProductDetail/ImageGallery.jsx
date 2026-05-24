import React, { useState, useEffect } from "react";
import "./ProductDetail.css";

const ImageGallery = ({ product }) => {

  const images = [product?.image, ...product?.galleryImages] || [product?.image];
  const [activeImg, setActiveImg] = useState(product?.image);
  useEffect(() => {
    setActiveImg(product?.image);
  }, [product]);

  return (
    <div className="gallery-container">
      <div className="main-image-wrapper">
        <img
          src={activeImg}
          alt={product.name}
          className="main-image"
          key={activeImg}
        />
        <div className="badge brand-font">MANIFEST ITEM</div>
      </div>

      <div className="thumbnail-grid">
        {images.map((img, i) => (
          <div
            key={i}
            className={`thumb-item ${activeImg === img ? "active" : ""}`}
            onClick={() => setActiveImg(img)}
          >
            <img src={img} alt={`View ${i}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
