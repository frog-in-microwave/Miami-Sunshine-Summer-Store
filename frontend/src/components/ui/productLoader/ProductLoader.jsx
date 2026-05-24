import { forwardRef } from "react";
import "./ProductLoader.css";

const ProductLoader = forwardRef((props, ref) => {
  return (
    <div ref={ref} className={`vibe-loader`}>
      <span className="brand-font">SCANNING_WAVES...</span>
      <div className="loader-bar"></div>
    </div>
  );
});

export default ProductLoader;
