import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "./ImageGallery";
import ProductInfo from "./ProductInfo";
import RelatedProducts from "./RelatedProducts";
import products from "../../data/fakeDatabase.json";
import "./ProductDetail.css";

const ProductDetail = () => {
  // Get product ID from URL and find the corresponding product
  const { id } = useParams();
  // currently the id is a string, so we parse it to an integer to match the product IDs in our fake database. If no product is found, 
  // we default to the first product in the list.
  const product = products.find((p) => p.id === parseInt(id)) || products[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <main className="detail-main">
      <div className="detail-container">
        <ImageGallery product={product} />
        <ProductInfo product={product} />
      </div>
      <RelatedProducts currentId={product.id} />
    </main>
  );
};

export default ProductDetail;
