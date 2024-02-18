import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import FloatingLabelInput from "@/components/FloatingLabelInput";
import ShippingMethod from "@/components/checkout/ShippingMethod";
import { addressFormSchema, personalInfoFormSchema } from "@/utils/formSchemas";
import Spinner from "@/components/Spinner";
import OrderSummary from "@/components/checkout/OrderSummary";
import { useCart } from "@/providers/CartProvider";
import { CheckoutLayout } from "@/components/Layout";

const OrderAddress: React.FC = () => {
  const router = useRouter();
  const { saveAddress, loading } = useCart();
  const [formData, setFormData] = useState<{
    [key: string]: string | undefined;
  }>({});

  const submitAddress = async () => {
    if (
      !formData?.street_address ||
      !formData.suburb ||
      !formData?.city_or_town ||
      !formData.province ||
      !formData.post_code ||
      !formData.address_type ||
      !formData.email ||
      !formData.first_name ||
      !formData.last_name ||
      !formData.phone_number
    ) {
      toast.warning("Please provide all field");
      return;
    }
    await saveAddress({
      shippingAddress: {
        complex_or_building: formData?.complex_or_building
          ? formData.complex_or_building
          : "",
        street_address: formData.street_address,
        address_type: formData.address_type,
        suburb: formData.suburb,
        city_or_town: formData.city_or_town,
        province: formData.province,
        post_code: formData.post_code,
      },
      personalInfo: {
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone_number: formData.phone_number,
      },
    });
  };

  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
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
        <div className="grid gap-4 p-6 mt-8 xl:grid-cols-6 lg:mt-0">
          <div className="grid gap-4 xl:col-span-4">
            <form className="p-6 space-y-6 bg-white">
              <p className="font-bold">Add New Address</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center p-4 mb-4 space-x-3 bg-gray-100">
                  <input
                    id="residential"
                    type="radio"
                    value="residential"
                    name="address_type"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    onChange={(e) =>
                      handleChange("address_type", e.target.value)
                    }
                    checked={formData.address_type === "residential"}
                  />
                  <label
                    htmlFor="residential"
                    className="text-sm font-medium text-gray-900"
                  >
                    Residential
                  </label>
                </div>
                <div className="flex items-center p-4 mb-4 space-x-3 bg-gray-100">
                  <input
                    id="business"
                    type="radio"
                    value="business"
                    name="address_type"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    onChange={(e) =>
                      handleChange("address_type", e.target.value)
                    }
                    checked={formData.address_type === "business"}
                  />
                  <label
                    htmlFor="business"
                    className="text-sm font-medium text-gray-900"
                  >
                    Business
                  </label>
                </div>
              </div>

              {personalInfoFormSchema.map((field) => (
                <FloatingLabelInput
                  key={field.id}
                  id={field.id}
                  label={field.label}
                  type={field.type}
                  value={formData[field.id] || ""}
                  onChange={(e: { target: { value: string } }) =>
                    handleChange(field.id, e.target.value)
                  }
                  required={field.required}
                />
              ))}
              {addressFormSchema
                .filter((field) => field.id !== "address_type")
                .map((field) => (
                  <FloatingLabelInput
                    key={field.id}
                    id={field.id}
                    label={field.label}
                    type={field.type}
                    value={formData[field.id] || ""}
                    onChange={(e: { target: { value: string } }) =>
                      handleChange(field.id, e.target.value)
                    }
                    required={field.required}
                  />
                ))}
              <div className="flex justify-end">
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => router.push("/buy/delivery/addresses")}
                    className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white  border border-gray-600 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={submitAddress}
                    className="text-white bg-blue-450 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    {loading ? (
                      <Spinner className="mx-auto" />
                    ) : (
                      <span>Save Address</span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="space-y-4 xl:col-span-2">
            <OrderSummary />
            <ShippingMethod />
          </div>
        </div>
      </div>
    </CheckoutLayout>
  );
};

export default OrderAddress;
