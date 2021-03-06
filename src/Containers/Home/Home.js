import React from "react";

// Components
import Slider from "../../Components/Slider/Slider";
import SaleProducts from "../../Components/SaleProducts/SaleProducts";
import TopSale from "../../Components/TopSale/TopSale";
import FeaturedProducts from "../../Components/FeaturedProducts/FeaturedProducts";
import AddonBanner from "../../Components/AddonBanner/AddonBanner";
import Subscribe from "../../Components/Subscribe/Subscribe";

import "./Home.css";
const Home = () => {
  return (
    <>
      <Slider />
      <SaleProducts count={4} />
      <TopSale />
      <FeaturedProducts count={8} />
      <AddonBanner />
      <Subscribe />
    </>
  );
};

export default Home;
