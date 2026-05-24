import React from "react";
import HeroSection from "./HeroSection";
import PromoStrip from "./PromoStrip";
import FeaturedProducts from "./FeaturedProducts";
import "./Home.css";
import { useEffect } from "react";

const Home = () => {




    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);


    
  return (
    <div className="home-page">
      <main>
        <HeroSection />
        <PromoStrip />
        <FeaturedProducts />
      </main>
    </div>
  );
};

export default Home;
