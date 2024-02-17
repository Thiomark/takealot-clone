import { useCart } from "@/providers/CartProvider";
import React from "react";

const ShippingMethod: React.FC = () => {
  const { resetShippingMethod, shippingMethod } = useCart();

  return (
    <div className="p-6 bg-white">
      <p className="mb-4 font-bold">Order Review</p>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">Delivery Method</p>
        <button
          onClick={resetShippingMethod}
          className="text-xs font-semibold text-blue-450"
        >
          Change
        </button>
      </div>
      <p className="text-lg font-bold">{shippingMethod.type}</p>
    </div>
  );
};

export default ShippingMethod;
