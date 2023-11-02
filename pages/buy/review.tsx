// OrderPreview.tsx
import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import TakealotIcon from "../../components/TakealotIcon";
import Link from "next/link";

type OrderInfo = {
  user: any;
  cart: any[];
  address: any;
};

export const OrderPreview: React.FC = () => {
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrderInfo = async () => {
      const cartId = "5aed2491-e3b4-4545-b8c2-d3f54c33f75c";
      setLoading(true);
      try {
        const response = await fetch("/api/order_preview", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cartId }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setOrderInfo(data);
      } catch (error) {
        console.error("Failed to fetch order info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderInfo();
  }, []);

  if (loading) {
    return <div>Loading order information...</div>;
  }

  return (
    <div>
      <header className="mx-auto max-w-[1200px] flex items-center justify-between w-full px-8 py-4">
        <TakealotIcon />
        <Link href="/help">
          <a className="ml-6 text-sm hidden md:block">Help Center</a>
        </Link>
      </header>
      <main className="max-w-[1200px] py-6 mx-auto">
        {!orderInfo ? (
          <div>No order information available.</div>
        ) : (
          <div>
            <h3>Order Preview</h3>
            <pre>{orderInfo.cart}</pre>
          </div>
        )}
      </main>
    </div>
  );
};

export default OrderPreview;
