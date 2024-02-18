import React, { useEffect } from "react";
import { useRouter } from "next/router";
import useCheckoutNavigation from "@/hooks/useCheckoutNavigation";
import Image from "next/image";
import Link from "next/link";
import TakealotIcon from "@/components/TakealotIcon";
import OrderSummary from "@/components/checkout/OrderSummary";
import ShippingMethod from "@/components/checkout/ShippingMethod";
import { CheckoutData } from "@/types/checkout";
import { useCart } from "@/providers/CartProvider";
import SelectedAddress from "@/components/checkout/SelectedAddress";

const ReviewOrder: React.FC = () => {
  const { resetShippingAddress, loading, cart } = useCart();
  const router = useRouter();
  const { currentStep, startCheckout, completedSteps, isActive } =
    useCheckoutNavigation();

  useEffect(() => {
    if (!isActive && !loading) {
      startCheckout();
    }
    const stepRoutes: { [K in keyof Partial<CheckoutData>]: string } = {
      cart: "/cart",
      userStep: "/buy/delivery/addresses/add",
      shippingAddress: "/buy/delivery/addresses/add",
      billingAddress: "/buy/delivery/addresses/add",
      shippingMethod: "/buy/delivery/methods",
      review: "/buy/review",
      payment: "/payment",
      confirmation: "/confirmation",
    };

    // Fix TypeScript issue by ensuring nextStepKey is a keyof CheckoutData
    const nextStepKey = Object.keys(completedSteps).find(
      (key) => !completedSteps[key as keyof Partial<CheckoutData>]
    ) as keyof Partial<CheckoutData> | undefined;

    if (!nextStepKey) {
      router.push("/checkout/complete");
      return;
    }

    const nextRoute = stepRoutes[nextStepKey];

    if (router.pathname !== nextRoute && nextRoute) {
      router.push(nextRoute);
    }
  }, [currentStep, completedSteps, router]);

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
            <ShippingMethod />
            <div className="p-6 bg-white">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Delivery Address</p>
                <button
                  onClick={resetShippingAddress}
                  className="text-xs font-semibold text-blue-450"
                >
                  Change
                </button>
              </div>
              <SelectedAddress />
            </div>
            <div className="p-6 bg-white">
              <div>
                <p className="text-sm text-gray-600">Delivery by</p>
              </div>
              <p className="font-bold text-md">Thursday, 15 February 2024</p>
              <div className="flex items-center mt-3 space-x-3 text-sm text-gray-500">
                <span>Standard Delivery</span>
                <span>Free</span>
              </div>
            </div>
            <div className="p-6 bg-white">
              <div>
                <p className="text-sm text-gray-600">Payment Method</p>
              </div>
              <p className="font-bold text-md">EFT with payFast</p>
            </div>
          </div>
          <div className="space-y-4 xl:col-span-2">
            <OrderSummary />
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
                {cart.map((itm, idx) => (
                  <Image
                    key={idx}
                    alt="product"
                    src={itm.image}
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
