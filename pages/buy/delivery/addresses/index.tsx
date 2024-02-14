import TakealotIcon from "@/components/TakealotIcon";
import Link from "next/link";
import { useEffect } from "react";
import { useAuth } from "@/providers/FirebaseAuthProvider";

const OrderAddress: React.FC = () => {
  const { fetchAddresses, addresses } = useAuth();

  useEffect(() => {
    fetchAddresses()
  }, [])


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
          <h1 className="font-bold lg:text-gray-600 lg:text-xl">
            Review your order
          </h1>
        </div>
        <div className="grid gap-4 p-6 mt-8 xl:grid-cols-6 lg:mt-0">
          <div className="grid gap-4 xl:col-span-4">
            <div>
              <div className="p-6 space-y-3 bg-white">
                {addresses.map(addresse => (<div key={addresse.id} className="p-6 bg-blue-50 grid grid-cols-[auto_1fr_auto]">
                  <div className="flex items-center p-4 mb-4 space-x-3 ">
                    <input
                      id="default-radio-1"
                      type="radio"
                      value=""
                      name="default-radio"
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>

                  <div>
                    <div className="relative grid my-2 select-none w-fit items-center whitespace-nowrap rounded-full bg-green-400 py-0.5 px-3 text-[.6rem] font-semibold uppercase text-gray-50">
                      <span className="">Residential</span>
                    </div>
                    <p className="font-bold text-md">The Hangar, M405</p>
                    <p className="font-bold text-md">3 Bosbok Nook</p>
                    <p className="font-bold text-md">
                      Zwartkop, Centurion, 0157
                    </p>
                    <div className="flex items-center mt-3 space-x-3 text-sm text-gray-500">
                      <span>itumeleng</span>
                      <span>0787576092</span>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-blue-450">
                    <button className="hover:underline">Delete</button>
                    <span className="px-3">&#x2022;</span>
                    <button className="hover:underline">Edit</button>
                  </div>
                </div>))}
              </div>
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
                <p className="text-xl font-bold text-green-450">R 2123</p>
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
            {/* <div className="p-6 bg-white">
              <p className="mb-4 font-bold">Order Review</p>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Delivery Method</p>
                <button className="text-xs font-semibold text-blue-450">
                  Change
                </button>
              </div>
              <p className="text-lg font-bold">Delivery</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderAddress;
