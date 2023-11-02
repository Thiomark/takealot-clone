import { useContext } from "react";
import { useRouter } from "next/router";
import { ProductContext } from "../providers/ProductProvider";
import Image from "next/image";

const ProductComponent = ({ showAddToCart, product }) => {
  const router = useRouter();
  const { addItemToCart } = useContext(ProductContext);

  if (!product) {
    return <h1>loading...</h1>;
  }

  const discountedPrice = product.sale
  ? (product.price - product.price * product.sale).toFixed(2)
  : product.price;

  return (
    <div
      className="md:min-w-[280px] min-w-[68%] w-full cursor-pointer bg-white p-4"
      onClick={() => {
        router.push("/" + product.id);
      }}
    >
      <div className="md:h-64 h-52 justify-center items-center relative bg-gray-200 mb-4">
        {product.sale && (
          <span className="bg-blue-450 p-2 absolute top-0 left-0 font-bold text-xs text-white h-12 w-12 z-20 rounded text-center flex items-center">
            {product.sale * 100} % off
          </span>
        )}
        <img
          className="w-full absolute h-full"
          src={`placeholder-images/${product.displayedImage}-placeholder.png`}
          alt={product.name}
          srcSet=""
        />
      </div>
      <div className="h-14">
        <p className="text-sm text-gray-600 pb-4">{product.name}</p>
      </div>
      <h1 className="text-sm font-bold mb-1">
        R {product.price}{" "}
        {product.sale && (
          <span className="text-xs text-gray-400 font-normal line-through ml-2">
            R {discountedPrice}
          </span>
        )}
      </h1>
      <h1 className="flex text-sm space-x-1 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="bi mr-2 w-4 h-4 text-yellow-400 bi-star-fill"
          viewBox="0 0 16 16"
        >
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
        </svg>
        {product.rating}
        <span className="text-gray-700 text-xs">({product.reviews})</span>
      </h1>
      {showAddToCart && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            addItemToCart({ ...product, id: Date.now() + Math.random() });
          }}
          className="w-full border-green-450 text-green-450 flex space-x-2 py-3 mt-4 border justify-center items-center text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi h-5 w-5 bi-cart"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
          <span>Add to Cart</span>
        </button>
      )}
    </div>
  );
};

export default ProductComponent;
