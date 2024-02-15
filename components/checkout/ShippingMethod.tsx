import { useCart } from "@/providers/CartProvider";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const ShippingMethod: React.FC = () => {
  const { resetShippingMethod, shippingMethod } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (!shippingMethod?.type) {
      router.push("/buy/delivery/methods");
    }
  }, [router]);

  if (!shippingMethod.type) return null;

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
