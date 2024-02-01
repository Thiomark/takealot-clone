import Head from "next/head";
import React from "react";
import HeaderComponent from "@/components/HeaderComponent";
import ProductsComponent from "@/components/ProductsComponent";
import FooterComponent from "@/components/FooterComponent";
import CarousalsComponent from "@/components/home-screen/CarousalsComponent";
import { useProducts } from "@/providers/ProductProvider";

const Home: React.FC = () => {
  const { products, loading } = useProducts();

  // Filter products based on your criteria for different components
  // For demonstration, using all products for Load Shedding Essentials as an example
  // Implement your own filtering logic based on product properties or categories
  const loadSheddingEssentials = products; // Placeholder for actual filtering logic

  return (
    <div>
      <Head>
        <title>Takealot.com</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderComponent />
      <CarousalsComponent />
      <div className="pb-10 bg-gray-50">
        {false ? (
          <p>Loading products...</p>
        ) : (
          <>
            <ProductsComponent
              title="Load Shedding Essentials"
              products={loadSheddingEssentials}
            />
          </>
        )}
        {/* <ProductsComponent products={[]} title="New on Takealot" />
        <ProductsComponent products={[]} title="Your Premium Liquor Choices" />
        <ProductsComponent products={[]} title="Makeup" />
        <ProductsComponent products={[]}title="Sports & Training" /> */}
      </div>
      <FooterComponent />
    </div>
  );
};

export default Home;
