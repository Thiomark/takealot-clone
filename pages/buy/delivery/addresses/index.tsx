import TakealotIcon from "@/components/TakealotIcon";
import Link from "next/link";
import { useEffect } from "react";
import { useAuth } from "@/providers/FirebaseAuthProvider";
import { useCart } from "@/providers/CartProvider";
import ShippingMethod from "@/components/checkout/ShippingMethod";
import { useRouter } from "next/router";
import OrderSummary from "@/components/checkout/OrderSummary";

const OrderAddress: React.FC = () => {
  const { fetchAddresses, addresses } = useAuth();
  const { personalInfo, shippingAddress } = useCart();
  const router = useRouter();

  useEffect(() => {
    fetchAddresses();
  }, []);

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
                <header className="flex items-center justify-between">
                  <span>Delivery Addresses</span>
                  <button
                    onClick={() => router.push("/buy/delivery/addresses/add")}
                    className="px-8 py-3 text-sm text-white bg-blue-450"
                  >
                    Add Address
                  </button>
                </header>
                <div className="p-6 bg-blue-50 grid grid-cols-[auto_1fr_auto]">
                  <div className="flex items-center p-4 mb-4 space-x-3 ">
                    <input
                      defaultChecked
                      type="radio"
                      value=""
                      name="selected-address"
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>

                  <div>
                    <div className="relative grid my-2 select-none w-fit items-center whitespace-nowrap rounded-full bg-green-400 py-0.5 px-3 text-[.6rem] font-semibold uppercase text-gray-50">
                      <span className="">{shippingAddress?.address_type}</span>
                    </div>
                    {shippingAddress?.complex_or_building && (
                      <p className="font-bold text-md">
                        {shippingAddress.complex_or_building}
                      </p>
                    )}
                    <p className="font-bold text-md">
                      {shippingAddress?.street_address}
                    </p>
                    <p className="font-bold text-md">
                      {shippingAddress?.suburb}, {shippingAddress?.city_or_town}
                      , {shippingAddress?.post_code}
                    </p>
                    <div className="flex items-center mt-3 space-x-3 text-sm text-gray-500">
                      <span>{personalInfo?.first_name}</span>
                      <span>{personalInfo?.phone_number}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-blue-450">
                    <button className="hover:underline">Delete</button>
                    <span className="px-3">&#x2022;</span>
                    <button className="hover:underline">Edit</button>
                  </div>
                </div>
                {addresses.map((addresse) => (
                  <div
                    key={addresse.id}
                    className="p-6 bg-blue-50 grid grid-cols-[auto_1fr_auto]"
                  >
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
                        <span className="">{addresse.address_type}</span>
                      </div>
                      {addresse.complex_or_building && (
                        <p className="font-bold text-md">
                          {addresse.complex_or_building}
                        </p>
                      )}
                      <p className="font-bold text-md">
                        {addresse.street_address}
                      </p>
                      <p className="font-bold text-md">
                        {addresse.suburb}, {addresse.city_or_town},{" "}
                        {addresse.post_code}
                      </p>
                      <div className="flex items-center mt-3 space-x-3 text-sm text-gray-500">
                        <span>{personalInfo?.first_name}</span>
                        <span>{personalInfo?.phone_number}</span>
                      </div>
                    </div>

                    <div className="flex items-center text-sm text-blue-450">
                      <button className="hover:underline">Delete</button>
                      <span className="px-3">&#x2022;</span>
                      <button className="hover:underline">Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-4 xl:col-span-2">
            <OrderSummary />
            <ShippingMethod />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderAddress;
