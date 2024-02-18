import { useCart } from "@/providers/CartProvider";
import { useRouter } from "next/router";
import React from "react";

const Button: React.FC<{ orderReview: boolean }> = ({ orderReview }) => {
  const router = useRouter();

  if (orderReview) {
    return (
      <button
        onClick={() => router.push("/account/orders/NZZe0jgJjo3zYHxxy3uD")}
        className="w-full p-3 text-sm uppercase bg-green-450 text-gray-50"
      >
        Pay with payfast
      </button>
    );
  } else {
    return (
      <button
        onClick={() => router.push("/buy/review")}
        className="w-full p-3 text-sm uppercase bg-green-450 text-gray-50"
      >
        Continue
      </button>
    );
  }
};

const OrderSummary: React.FC<{
  hideButton?: boolean;
  hideDelivery?: boolean;
}> = ({ hideButton, hideDelivery }) => {
  const router = useRouter();
  const { cartSubTotal, cartTotal, cart, shipping } = useCart();
  const orderReview = router.pathname === "/buy/review";

  return (
    <div className="p-6 bg-white">
      <p className="text-sm text-gray-600">Order Summary</p>
      <div className="flex items-center justify-between text-sm">
        <p>{cart.length} items</p>
        <p>R {cartSubTotal}</p>
      </div>
      {!hideDelivery && (
        <div className="flex items-center justify-between text-sm">
          <p>Delivery</p>
          <p>{shipping}</p>
        </div>
      )}
      <div className="flex items-center justify-between py-3 mt-3 text-sm border-t border-dashed">
        <p className="font-bold">TO PAY:</p>
        <p className="text-xl font-bold text-green-450">R {cartTotal}</p>
      </div>
      {orderReview && (
        <div className="flex items-center justify-between p-2 text-xs bg-gray-100">
          <div className="flex items-center space-x-3">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />

            <span>Donate R 5 to Beautiful Gate Children&apos;s Charity</span>
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
      )}
      <div
        className={`flex flex-col items-center justify-center py-4 ${hideButton && "border-t border-dashed"}`}
      >
        {!hideButton && <Button orderReview={orderReview} />}
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
  );
};

export default OrderSummary;
