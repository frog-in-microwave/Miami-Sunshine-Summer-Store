import { useState, useEffect} from "react";
import ProductCard from "../../components/ui/ProductCard/ProductCard.jsx";
import {fetchProducts} from "../../fetchingServices/fetchProducts.js";
import {useDispatch, useSelector} from "react-redux";
const FeaturedProducts = () => {
  

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);


  const [featured, setfeatured] = useState([]);



  useEffect(() => {
    const load = async () => {
    const data = await dispatch(fetchProducts({page: 1, limit: 10}));
    if(!data.payload){
      return;
    }
    const products = data.payload;
    setfeatured(products);
    }
    load();
  }, [])






  return (
    <section className="featured-section">
      <div className="section-header">
        <h2 className="brand-font">
          Summer <span className="text-pink">Collection</span>
        </h2>
        <p>Curated essentials for the Miami lifestyle.</p>
      </div>
      <div className="product-grid">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
