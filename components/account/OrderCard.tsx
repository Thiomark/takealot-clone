// components/OrderCard.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

type OrderCardProps = {
  orderId: string;
  status: string;
  date?: string;
  signedBy?: string;
  productImages: string[];
};

const OrderCard: React.FC<OrderCardProps> = ({
  orderId,
  status,
  date,
  signedBy,
  productImages,
}) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{status}</h3>
          {date && <p className="text-sm text-gray-600">Delivered {date}</p>}
          {signedBy && (
            <p className="text-sm text-gray-600">Signed by: {signedBy}</p>
          )}
        </div>
        <select className="border p-1 rounded text-sm">
          <option>Last 3 months</option>
          {/* Add more options as needed */}
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {productImages.map((image, index) => (
          <div key={index} className="relative w-full pb-full border">
            <Image
              src={image}
              alt={`Product ${index + 1}`}
              layout="fill"
              objectFit="contain"
              className="absolute inset-0 w-full h-full"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-4">
        <Link
          href={`/account/orders/${orderId}`}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Order Details
        </Link>
      </div>
    </div>
  );
};

export default OrderCard;
