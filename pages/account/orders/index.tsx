import { AccountLayout } from "@/components/Layout";
import Spinner from "@/components/Spinner";
import OrderCard from "@/components/account/OrderCard";
import firebase_app from "@/firebase";
import { OrderType } from "@/types/order";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const OrderHistory: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<OrderType | null>(null);
  const router = useRouter();
  const db = getFirestore(firebase_app);
  const { orderId } = router.query;

  const formatFirebaseDates = (firebaseDate: string): string => {
    return new Date(firebaseDate).toLocaleDateString();
  };

  const fakeOrders = [
    {
      orderId: "NZZe0jgJjo3zYHxxy3uD",
      status: "Delivered",
      date: "Sat, 17 Feb 2024",
      signedBy: "Itumeleng",
      productImages: [
        "https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      ],
    },
    {
      orderId: "NZZe0jgJjo3zYHxxy3uD",
      status: "Awaiting Payment",
      productImages: [
        "https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      ],
    },
    {
      orderId: "3456",
      status: "Cancelled",
      productImages: [
        "https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      ],
    },
  ];

  const fetchMyOrder = async () => {
    // if (!orderId) {
    //   toast.error("Cart ID is missing.");
    //   return;
    // }
    // setLoading(true);
    // const ordersRef = collection(db, "orders");
    // const q = query(ordersRef, where("order_id", "==", orderId));
    // try {
    //   const querySnapshot = await getDocs(q);
    //   if (querySnapshot.empty) {
    //     toast.error("No order found for the provided cart ID.");
    //     return;
    //   }
    //   const fetchedOrder = querySnapshot.docs[0].data() as OrderType;
    //   setOrder(fetchedOrder);
    // } catch (error) {
    //   console.error("Error fetching order:", error);
    //   toast.error("Error fetching order.");
    // } finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    if (orderId) {
      fetchMyOrder();
    }
  }, [orderId]);

  if (loading) return <Spinner />;

  return (
    <AccountLayout bg={"bg-gray-50"} title="Order History" showFooter={false}>
      <div className="container mx-auto p-4">
        {fakeOrders.map((order) => (
          <OrderCard
            key={order.orderId}
            orderId={order.orderId}
            status={order.status}
            date={order.date}
            signedBy={order.signedBy}
            productImages={order.productImages}
          />
        ))}
      </div>
    </AccountLayout>
  );
};

export default OrderHistory;
