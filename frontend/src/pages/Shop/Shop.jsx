import { useInView } from "react-intersection-observer";
import React, { useState, useEffect, useRef } from "react";
import "./Shop.css";

import ProductCard from "../../components/ui/ProductCard/ProductCard.jsx";
import ProductLoader from "../../components/ui/productLoader/ProductLoader.jsx";

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../fetchingServices/fetchProducts.js";
import { resetProducts, increasePageNumber, setActiveCategory, setSearchTerm, setIsAllLoaded } from "../../store/slices/productsSlice";

const Shop = () => {
  // 🔹 REDUX

  // the point in storing everything about the products in redux is to not need to reload the products again when the user enters to a specific product then exits back to the shop.
  // this ensures better user experience and faster loading times, as the products data will be already available in the store and we can just display it without needing to fetch it again from the backend, 
  // unless the user changes the category or search term which means they want to see different products, then we will fetch the new products based on the new filters and update the store with them.
  const dispatch = useDispatch(); // creation of the dispatch function to dispatch actions to the store

  const products = useSelector((state) => state.products.items); // getting the products from the store
  const pageCount = useSelector((state) => state.products.pageNumber); // getting the page number in the store to fetch the next page when needed
  const activeCategory = useSelector((state) => state.products.activeCategory); // getting the active category from the store to pass it as a parameter to the fetching function
  const searchTerm = useSelector((state) => state.products.searchTerm); // getting the search term from the store to pass it as a parameter to the fetching function
  const isAllLoaded = useSelector((state) => state.products.isAllLoaded); // getting the isAllLoaded flag from the store to stop showing the loader and prevent further API calls when all products are loaded


  // mobile state and filter toggle state
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900); // for phones
  const [isFilterOpen, setIsFilterOpen] = useState(false); // for mobile filter toggle




  // prevents duplicate API calls
  const isLoading = useRef(false);


  // 🔹 INFINITE SCROLL
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "200px",
  });

  const categories = ["All", "Surf Gear", "Apparel", "Accessories", "Limited"]; // for the sidebar categories







  // 🔹 CORE FETCH FUNCTION
  const loadProducts = async (pageNumber) => {
    if (isLoading.current || isAllLoaded) return;

    // setting the isLoading ref to true to prevent multiple API calls while one is already in progress
    isLoading.current = true;

    // calling the fetching function from the fetching services and passing the necessary parameters, then waiting for the result to check if there are more products to load or not, 
    // if there are no more products to load, we set the isAllLoaded flag to true to stop showing the loader and prevent further API calls
    const result = await dispatch(
      fetchProducts({
        page: pageNumber,
        limit: 24,
        search: searchTerm,
        category: activeCategory === "All" ? "" : activeCategory,
      }),
    );
    // if no more products to load, result.payload would be undefined which is falsey
    if (!result.payload) {
      dispatch(setIsAllLoaded(true)); // if there are no more products to load, set the isAllLoaded flag to true
    }
    // if the products are less than the limit, add them to the page but also set the isAllLoaded flag to true.
    // backend only returns less products than the limit if there exists no more products to load
    else if (result.payload.length < 24) {
      dispatch(increasePageNumber()); // increase the page number in the store for the next fetch if there are more products to load
      dispatch(setIsAllLoaded(true));
    } else {
      dispatch(increasePageNumber()); // increase the page number in the store for the next fetch if there are more products to load
    }

    isLoading.current = false;
  };

  






  
  // 🔹 RESET ON FILTER CHANGE
  const firstRender = useRef(true); // this is used to prevent useEffect from running on mount.

  //this useEffect runs when a filter is needed.
  // it resets the products, page number, items count and isAllLoaded flag in the store to their initial values
  // then it calls the load function again which in tur takes the new filters and adds filtered items to the store.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    dispatch(resetProducts());
    loadProducts(1);
  }, [searchTerm, activeCategory]);




  // 🔹 INFINITE SCROLL TRIGGER
  useEffect(() => {
    // inView changes if the loader started to be visble or is done being visble.
    // its true once the loader is visible sooo....
    if (inView) {

      loadProducts(pageCount);
    }
  }, [inView]);

  // =========================
  // 🔹 RENDER
  // =========================
  return (
    <div className="shop-vibe">
      {/* ================= SIDEBAR ================= */}
      <aside className="shop-sidebar">
        {/* Mobile toggle */}
        {isMobile && (
          <button
            className="sidebar-toggle brand-font"
            onClick={() => setIsFilterOpen((prev) => !prev)}
          >
            <span>FILTER</span>
            <span className={`toggle-arrow ${isFilterOpen ? "open" : ""}`}>
              ▼
            </span>
          </button>
        )}

        {/* Sidebar body */}
        <div
          className={`sidebar-body ${
            isMobile && !isFilterOpen ? "hidden" : ""
          }`}
        >
          {!isMobile && (
            <span className="sidebar-sticker brand-font">MANIFEST</span>
          )}

          {/* Categories */}
          <div className="category-list">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`cat-btn brand-font ${
                  activeCategory === cat ? "active" : ""
                }`}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  dispatch(setActiveCategory(cat));
                  if (isMobile) setIsFilterOpen(false);
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Info */}
          <div className="sidebar-info brand-font">
            <p>EST. 2026</p>
            <p>MIAMI, FL</p>
            <p className="highlight-txt">FREE SHIPPING ON ALL GEAR OVER $100</p>
          </div>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="shop-main">
        {/* HEADER */}
        <header className="shop-header">
          <div className="shop-header-top">
            <h1 className="brand-font">
              THE <span className="outline-text">DROPS</span>
            </h1>

            <div className="results-count brand-font">
              {products.length} ITEMS
            </div>
          </div>

          {/* SEARCH */}
          <div className="search-container">
            <input
              type="text"
              placeholder="SEARCH GEAR..."
              className="shop-search-input brand-font"
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />
          </div>
        </header>

        {/* PRODUCTS */}
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="no-results brand-font">
              NO GEAR MATCHES YOUR VIBE.
            </div>
          )}
        </div>

        {/* LOADER */}
        {!isAllLoaded && <ProductLoader ref={ref} />}
      </main>
    </div>
  );
};

export default Shop;
