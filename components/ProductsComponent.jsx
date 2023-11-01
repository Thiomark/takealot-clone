import ProductComponent from "./ProductComponent";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const ProductsComponent = ({
  title,
  showMoreButton = true,
  showAddToCart,
  sides,
  products,
}) => {
  const buttons =
    "h-10 w-10 z-50 hidden top-2/4 group-hover:flex -translate-y-2/4 absolute shadow bg-gray-750 text-white justify-center items-center rounded-full ";

  return (
    <div>
      <div className={`${sides ? "sides" : ""}`}>
        <div className="flex py-2 items-center justify-between">
          <h1 className="capitalize tet-sm">{title}</h1>
          {showMoreButton && (
            <button className="px-3 py-2 font-semibold text-xs rounded-full md:rounded-none md:text-sm border-[1.5px] border-gray-500">
              View More
            </button>
          )}
        </div>
        <Slider {...settings}>
          {products && products.length > 0
            ? products.map((product, index) => (
                <div key={index} className="pr-6">
                  <ProductComponent
                    product={product}
                    showAddToCart={showAddToCart}
                  />
                </div>
              ))
            : [...Array(12)].map((product, index) => (
                <div key={index} className="pr-6">
                  <ProductComponent showAddToCart={showAddToCart} />
                </div>
              ))}
        </Slider>
      </div>
    </div>
  );
};

ProductsComponent.defaultProps = {
  sides: true,
};

export default ProductsComponent;
