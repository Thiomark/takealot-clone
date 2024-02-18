import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
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

  const fetchMyOrder = async () => {
    if (!orderId) {
      toast.error("Cart ID is missing.");
      return;
    }

    setLoading(true);
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("order_id", "==", orderId));
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        toast.error("No order found for the provided cart ID.");
        return;
      }

      const fetchedOrder = querySnapshot.docs[0].data() as OrderType;
      setOrder(fetchedOrder);
    } catch (error) {
      console.error("Error fetching order:", error);
      toast.error("Error fetching order.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log();
    if (orderId) {
      fetchMyOrder();
    }
  }, [orderId]);

  if (loading || !order) return <Spinner />;

  return (
    <Layout title="Order History" showFooter={false}>
      <main className="min-h-screen">
        {order && (
          <div className="py-14 sides">
            <div className="flex justify-start item-start space-y-2 flex-col">
              <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                Order #{order.order_id}
              </h1>
              <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
                {formatFirebaseDates(order.created_at)}
              </p>
            </div>
            <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
              <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                  <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                    Customer’s Cart
                  </p>
                  <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                    <div className="pb-4 md:pb-8 w-full md:w-40">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/luxefash-1d48c.appspot.com/o/products%2Fplaceholder-images-product-2_large.webp?alt=media"
                        loading="lazy"
                        alt="image of Tropical Print Knot Side Belted One Piece Swimsuit"
                        className="w-full hidden md:block"
                      />
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/luxefash-1d48c.appspot.com/o/products%2Fplaceholder-images-product-2_large.webp?alt=media"
                        loading="lazy"
                        alt="image of Tropical Print Knot Side Belted One Piece Swimsuit"
                        className="w-full md:hidden"
                      />
                    </div>
                    <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                      <div className="w-full flex flex-col justify-start items-start space-y-8">
                        <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                          Tropical Print Knot Side Belted One Piece Swimsuit
                        </h3>
                        <div className="hidden justify-start items-start flex-col space-y-2">
                          <p className="text-sm dark:text-white leading-none text-gray-800">
                            <span className="dark:text-gray-400 text-gray-300">
                              Style:
                            </span>
                            Italic Minimal Design
                          </p>
                          <p className="text-sm dark:text-white leading-none text-gray-800">
                            <span className="dark:text-gray-400 text-gray-300">
                              Size:
                            </span>
                            Small
                          </p>
                          <p className="text-sm dark:text-white leading-none text-gray-800">
                            <span className="dark:text-gray-400 text-gray-300">
                              Color:
                            </span>
                            Light Blue
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between space-x-8 items-start w-full">
                        <p className="text-base dark:text-white xl:text-lg leading-6">
                          R 200
                          <span className="text-red-300 hidden line-through">
                            R 45.00
                          </span>
                        </p>
                        <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                          1
                        </p>
                        <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                          R 200
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                  <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                    <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                      Summary
                    </h3>
                    <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                      <div className="flex justify-between w-full">
                        <p className="text-base dark:text-white leading-4 text-gray-800">
                          Subtotal
                        </p>
                        <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                          R {order.cart_subtotal}
                        </p>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <p className="text-base dark:text-white leading-4 text-gray-800">
                          Shipping
                        </p>
                        <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                          R {order.cart_shipping}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                        Total
                      </p>
                      <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                        R {order.cart_total}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                  Customer
                </h3>
                <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                  <div className="flex flex-col justify-start items-start flex-shrink-0">
                    <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                      <div className="flex justify-start items-start flex-col space-y-2">
                        <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                          {order.personal_information.first_name}{" "}
                          {order.personal_information.last_name}
                        </p>
                        <p className="text-sm dark:text-gray-300 leading-5 text-gray-600">
                          {order.cart_items.length} items
                        </p>
                      </div>
                    </div>

                    <div className="text-gray-800 dark:text-white space-y-4 py-4 border-b border-gray-200 w-full">
                      <p className="cursor-pointer text-sm leading-5">
                        {order.personal_information.email}
                      </p>
                      <p className="cursor-pointer text-sm leading-5">
                        {order.personal_information.phone_number}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                    <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                      <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                        <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                          Shipping Address
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          {order.shipping_address?.complex_or_building},{" "}
                          {order.shipping_address.street_address},{" "}
                          {order.shipping_address.suburb},{" "}
                          {order.shipping_address.city_or_town},{" "}
                          {order.shipping_address.province},{" "}
                          {order.shipping_address.post_code},
                        </p>
                      </div>
                      <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                        <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                          Billing Address
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          {order.billing_address?.complex_or_building},{" "}
                          {order.billing_address.street_address},{" "}
                          {order.billing_address.suburb},{" "}
                          {order.billing_address.city_or_town},{" "}
                          {order.billing_address.province},{" "}
                          {order.billing_address.post_code},
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default OrderHistory;
