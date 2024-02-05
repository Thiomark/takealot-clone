import Layout from "@/components/Layout";
import TakealotIcon from "@/components/TakealotIcon";
import Image from "next/image";
import Link from "next/link";

const ReviewOrder: React.FC = () => {
  return (
    <div className="relative bg-gray-100">
      <header className="hidden bg-white lg:block">
        <div className="container w-full px-10 py-4 mx-auto">
          <TakealotIcon />
        </div>
      </header>
      <div className="w-full py-6 mx-auto lg:container ">
        <div className="grid grid-cols-[1fr_auto_1fr] absolute lg:static bg-white lg:bg-transparent py-4 lg:py-0 left-0 right-0 top-0 lg:flex lg:flex-row-reverse items-center justify-between px-6">
          <Link href="/cart" className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="hidden text-gray-400 bi bi-cart-fill lg:block"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-5 h-5 bi bi-arrow-left lg:hidden"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
              />
            </svg>
            <span className="hidden text-xs text-blue-450 lg:block">
              Back to Cart
            </span>
          </Link>
          <h1 className="font-bold  lg:text-gray-600 lg:text-xl">
            Review your order
          </h1>
        </div>
        <div className="grid gap-4 p-6 mt-8 xl:grid-cols-6 lg:mt-0">
          <div className="grid gap-4 xl:col-span-4">
            <div className="p-6 bg-white">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Delivery Method</p>
                <button className="text-xs font-semibold text-blue-450">
                  Change
                </button>
              </div>
              <p className="text-lg font-bold">Delivery</p>
            </div>
            <div className="p-6 bg-white">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Delivery Address</p>
                <button className="text-xs font-semibold text-blue-450">
                  Change
                </button>
              </div>
              <div className="relative grid my-2 select-none w-fit items-center whitespace-nowrap rounded-full bg-gray-900/10 py-0.5 px-3 text-[.6rem] font-semibold uppercase text-gray-900">
                <span className="">Residential</span>
              </div>
              <p className="font-bold text-md">The Hangar, M405</p>
              <p className="font-bold text-md">3 Bosbok Nook</p>
              <p className="font-bold text-md">Zwartkop, Centurion, 0157</p>
              <div className="flex items-center mt-3 space-x-3 text-sm text-gray-500">
                <span>itumeleng</span>
                <span>0787576092</span>
              </div>
            </div>
            <div className="p-6 bg-white">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Delivery by</p>
                <button className="text-xs font-semibold text-blue-450">
                  Change
                </button>
              </div>
              <p className="font-bold text-md">Thursday, 15 February 2024</p>
              <div className="flex items-center mt-3 space-x-3 text-sm text-gray-500">
                <span>Standard Delivery</span>
                <span>Free</span>
              </div>
            </div>
            <div className="p-6 bg-white">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Payment Method</p>
                <button className="text-xs font-semibold text-blue-450">
                  Change
                </button>
              </div>
              <p className="font-bold text-md">EFT with payFast</p>
            </div>
          </div>
          <div className="space-y-4 xl:col-span-2">
            <div className="p-6 bg-white">
              <p className="text-sm text-gray-600">Order Summary</p>
              <div className="flex items-center justify-between text-sm">
                <p>3 items</p>
                <p>R 2,127</p>
              </div>
              <div className="flex items-center justify-between text-sm">
                <p>Delivery</p>
                <p>Free</p>
              </div>
              <div className="flex items-center justify-between py-3 mt-3 text-sm border-t border-dashed">
                <p className="font-bold">TO PAY:</p>
                <p className="text-xl font-bold  text-green-450">R 2123</p>
              </div>
              <div className="flex items-center justify-between p-2 text-xs bg-gray-100">
                <div className="flex items-center space-x-3">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />

                  <span>
                    Donate R 5 to Beautiful Gate Children&apos;s Charity
                  </span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-question-circle-fill text-green-450"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247m2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
                </svg>
              </div>
              <div className="flex flex-col items-center justify-center py-4">
                <button className="w-full max-w-xs p-3 text-sm uppercase bg-green-450 text-gray-50">
                  Pay with payfast
                </button>
                <div className="flex items-center mt-4 space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-5 h-5 bi bi-lock-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                  </svg>
                  <span>Secure checkout</span>
                </div>
              </div>
            </div>
            <div className="p-6 bg-white">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-gray-600">
                  Items for delivery
                </p>
                <button className="text-xs font-semibold text-blue-450">
                  Show Details
                </button>
              </div>
              <div className="flex flex-wrap gap-3 mt-2">
                {[...Array(4)].map((img, idx) => (
                  <Image
                    key={idx}
                    alt="product"
                    src={
                      "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    }
                    height={70}
                    width={70}
                    objectFit="contain"
                    className=" aspect-square"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewOrder;
