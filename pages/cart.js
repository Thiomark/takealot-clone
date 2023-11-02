import Layout from "../components/Layout";
import ProductsComponent from "../components/ProductsComponent";
import Link from "next/link";
import React from "react";
import { useCart } from "../providers/CartProvider";
import Image from "next/image";

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const createAnOrder = async () => {
    const payload = {
      cartId: "f9ee03fe-e509-44cc-8c44-7e8048ec1096",
      shippingAddressId: "c7656439-423a-4b8f-9a34-157239c85470",
      billingAddressId: "7b13bf5c-656e-44c9-96cf-8c0dc3165189",
    };

    try {
      const response = await fetch("/api/create_order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Order created:", data);
      } else {
        console.log("Failed to create order:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Layout title="Cart - TAKEALOT">
      <h1 className="text-xl py-4 w-full mx-4 md:sides font-bold text-gray-600">
        Shopping Cart
      </h1>
      {cart.length > 0 && (
        <div className="pb-10">
          <div className="lg:flex md:sides w-full">
            <div className="w-full space-y-2">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white pt-8 relative grid-cols-[1em_6em_1fr_1fr_6em_1em] grid-rows-[auto_auto_auto_2em_auto] md:grid-rows-[auto_auto_auto_2em_auto_1.5em] grid items-stretch"
                >
                  <div className="flex col-start-2 md:row-span-5 row-span-3 items-center justify-center">
                    <Image
                      className="w-auto object-cover h-20"
                      height={300}
                      width={300}
                      loading="lazy"
                      src={`/placeholder-images/hat-placeholder.png`}
                      alt={item.products.name}
                      srcSet=""
                    />
                  </div>
                  <h1 className="col-start-3 ml-4 font-semibold text-lg col-end-6 md:col-end-5 md:row-start-1">
                    {item.products.name}
                  </h1>
                  <h1 className="col-start-3 md:col-start-5 md:row-start-1 ml-4 col-end-6 font-bold text-lg">
                    R {item.products.price}
                  </h1>
                  <div className="col-start-3 md:col-end-5 ml-4 col-end-6">
                    <p className="text-sm text-gray-500">
                      {item.products.name}
                    </p>
                    <p className="text-sm font-bold text-gray-600">
                      in stock{" "}
                      <span className="bg-gray-200 text-xs p-1 rounded">
                        JHB
                      </span>{" "}
                    </p>
                  </div>
                  <button className="text-gray-700 p-4 md:border-none md:row-start-2 md:col-start-5 md:col-end-6 col-start-1 row-start-5 col-end-4 justify-center border flex items-center space-x-4">
                    <span>Qty {item.quantity}</span>
                  </button>
                  <button
                    onClick={() => removeFromCart(item)}
                    className="text-gray-700 md:text-xs md:row-start-4 md:col-start-5 md:static absolute top-4 right-4 flex items-center space-x-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="bi md:w-5 md:h-5 w-6 h-6 bi-trash-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                    <span className="hidden md:block">Remove</span>
                  </button>
                  <button
                    onClick={() => {
                      // removeFromCart(item)
                      // addItemToList(item.id);
                    }}
                    className="text-gray-700 md:text-xs md:mr-6 md:col-end-5 md:ml-auto text justify-center flex items-center space-x-2 col-start-4 col-end-7 row-start-5 border md:border-none md:row-start-4 md:col-start-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="bi md:block hidden md:w-5 md:h-5 w-6 h-6 bi-trash-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                    <span className="">Move To List</span>
                  </button>
                </div>
              ))}
              <p className="py-6 mx-4 md:mx-0 text-center md:text-left text-sm text-gray-700">
                Placing an item in your shopping cart does not reserve that item
                or price. We only reserve stock for your order once payment is
                received.
              </p>
            </div>
            <div className="hidden lg:block space-y-3 sides-scale-x max-w-[300px] w-full">
              <div className="bg-white p-4">
                <h1 className="text-lg text-gray-700 font-bold mb-6">
                  Cart Summary
                </h1>
                <div className="flex items-center justify-between pb-2">
                  <p className="text-sm font-semibold uppercase">
                    Total:{" "}
                    <span className="text-xs lowercase font-normal">
                      (5 items)
                    </span>
                  </p>
                  <span className="font-bold text-2xl text-green-450">
                    R 2700
                  </span>
                </div>
                <button
                  onClick={createAnOrder}
                  className=" bg-green-450 text-center py-2 w-full text-sm text-white"
                >
                  Proceed To Checkout
                </button>
              </div>
              <div className="p-4 text-sm text-gray-700 space-y-2 bg-white">
                <div className="flex items-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="bi h-5 w-5 bi-lock-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                  </svg>
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="bi h-5 w-5 bi-lock-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                    <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                  </svg>
                  <span>Many ways to pay</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="bi h-5 w-5 bi-lock-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                  </svg>
                  <span>Fast, reliable delivery</span>
                </div>
              </div>
            </div>
          </div>
          <ProductsComponent
            showMoreButton={false}
            showAddToCart
            title="Customers who bought items in your cart also bought"
          />
        </div>
      )}
      {cart.length === 0 && (
        <div className="sides w-full pb-10">
          <div className="bg-white w-full space-y-6 flex flex-col items-center justify-center py-10">
            <img
              src="cart.svg"
              className="rounded-full border-4 shadow-md border-white"
            />
            <h1>Your shopping cart is empty</h1>
            <Link href="/">
              <a className="text-sm text-center text-white md:w-fit md:px-5 bg-blue-450 max-w-md md:rounded-none rounded-full w-full py-3">
                Continue Shopping
              </a>
            </Link>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Cart;
