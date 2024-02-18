import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { useCart } from "@/providers/CartProvider";
import Spinner from "@/components/Spinner";
import OrderSummary from "@/components/checkout/OrderSummary";
import useCheckoutNavigation from "@/hooks/useCheckoutNavigation";
import { CheckoutLayout } from "@/components/Layout";

const OrderMethods: React.FC = () => {
  const router = useRouter();
  const { fetchCart, shippingMethod } = useCart();
  const [loading, setLoading] = useState(false);

  const { goToNextStep } = useCheckoutNavigation();

  useEffect(() => {
    if (shippingMethod.type) {
      goToNextStep();
    }
  }, [shippingMethod]);

  // TODO move to the cart provider and the loading
  const selectDelivery = async (paymentMethod: string) => {
    const cartId = getCookie("cart-id");

    if (!cartId || loading) return;

    setLoading(true);

    try {
      const response = await fetch(`/api/cart/${cartId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ shipping_method: { type: paymentMethod } }),
      });

      if (!response.ok) {
        throw new Error("Failed to update the cart");
      }

      // TODO add toast here instead of console.log

      // Handle the response. For example, navigate the user to the next step
      console.log("Cart updated successfully");
      // Optionally, redirect the user or show a success message
      await fetchCart();

      router.push("/buy/review");
    } catch (error) {
      console.error("Error updating cart:", error);
      // Optionally, handle the error (e.g., show an error message to the user)
    } finally {
      setLoading(true);
    }
  };

  return (
    <CheckoutLayout>
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
        <div className="grid gap-4 mt-12 lg:p-6 xl:grid-cols-6 lg:mt-0">
          <div className="grid gap-4 lg:order-1 xl:col-span-4">
            <div className="bg-white p-6 rid grid grid-cols-[3rem_1fr_auto] gap-3">
              <div className="flex items-center justify-center w-12 h-12 overflow-hidden bg-green-400 rounded-full">
                <Image
                  src="/icon-delivery.svg"
                  height={44}
                  width={44}
                  className="-ml-4"
                  alt="delivery icon"
                />
              </div>
              <div className="">
                <p className="text-sm font-bold text-gray-800">Delivery</p>
                <p className="text-sm text-gray-400">
                  Courier delivery to your door
                </p>
              </div>

              <button
                onClick={() => selectDelivery("Delivery")}
                className="px-4 py-2 min-w-[120px] text-sm transition-all duration-300 lg:border border-blue-450 w-fit lg:text-blue-450 lg:hover:text-white lg:hover:bg-blue-450 lg:my-auto"
              >
                {loading ? (
                  <Spinner className="mx-auto" />
                ) : (
                  <>
                    <span className="hidden lg:block">Deliver My Order</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-right lg:hidden"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="grid gap-4 lg:order-3 xl:col-span-4">
            <div className="bg-white p-6 grid grid-cols-[3rem_1fr_auto] gap-3">
              <div className="flex items-center justify-center w-12 h-12 overflow-hidden bg-blue-300 rounded-full">
                <Image
                  src="/icon-collect.svg"
                  height={44}
                  width={44}
                  className="-ml-4"
                  alt="collect icon"
                />
              </div>
              <div className="">
                <p className="text-sm font-bold text-gray-800">Collect</p>
                <p className="text-sm text-gray-400">
                  100+ Takealot Pickup Points nationwide. Open 7 days a week for
                  your convenience.
                </p>
              </div>

              <button
                onClick={() => selectDelivery("Collect")}
                className="px-4 py-2 min-w-[120px] text-sm transition-all duration-300 lg:border border-blue-450 w-fit lg:text-blue-450 lg:hover:text-white lg:hover:bg-blue-450 lg:my-auto"
              >
                {loading ? (
                  <Spinner className="mx-auto" />
                ) : (
                  <>
                    <span className="hidden lg:block">Collect My Order</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-right lg:hidden"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="space-y-4 lg:order-2 xl:col-span-2 xl:row-span-2">
            <OrderSummary hideButton hideDelivery />
          </div>
        </div>
      </div>
    </CheckoutLayout>
  );
};
export default OrderMethods;
