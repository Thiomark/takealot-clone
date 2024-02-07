import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import FloatingLabelInput from "@/components/FloatingLabelInput";
import TakealotIcon from "@/components/TakealotIcon";
import { addressFormSchema, personalInfoFormSchema } from "@/utils/formSchemas";
import { useAuth } from "@/providers/FirebaseAuthProvider";
import { toast } from "react-toastify";

const OrderAddress: React.FC = () => {
  const router = useRouter();
  const { addAddress } = useAuth();
  const [formData, setFormData] = useState<{
    [key: string]: string | undefined;
  }>({});

  const saveAddress = async () => {
    if(!formData?.street_address || !formData.suburb || !formData?.city_or_town || !formData.province || !formData.post_code) {
      toast.warning('Please provide all field')
      return
    }
    await addAddress({
      complex_or_building: formData?.complex_or_building
        ? formData.complex_or_building
        : "",
      street_address: formData.street_address,
      suburb: formData.suburb,
      city_or_town: formData.city_or_town,
      province: formData.province,
      post_code: formData.post_code,
    });
  };

  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="relative bg-gray-100">
      <header className="hidden bg-white lg:block">
        <div className="container w-full px-10 py-4 mx-auto">
          <TakealotIcon />
        </div>
      </header>
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
                    id="default-radio-1"
                    type="radio"
                    value=""
                    name="default-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-radio-1"
                    className="text-sm font-medium text-gray-900 "
                  >
                    Residential
                  </label>
                </div>
                <div className="flex items-center p-4 mb-4 space-x-3 bg-gray-100">
                  <input
                    id="default-radio-1"
                    type="radio"
                    value=""
                    name="default-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-radio-1"
                    className="text-sm font-medium text-gray-900 "
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
              {addressFormSchema.map((field) => (
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
                    onClick={saveAddress}
                    className="text-white bg-blue-450 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Save Address
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="space-y-4 xl:col-span-2">
            <div className="p-6 bg-white">
              <p className="text-sm text-gray-600">Order Summary</p>
              <div className="flex items-center justify-between text-sm">
                <p>3 items</p>
                <p>R 2,127</p>
              </div>
              <div className="flex items-center justify-between text-sm">
                <p>Delivery</p>
                <p>Free</p>
              </div>
              <div className="flex items-center justify-between py-3 mt-3 text-sm border-t border-dashed">
                <p className="font-bold">TO PAY:</p>
                <p className="text-xl font-bold text-green-450">R 2123</p>
              </div>

              <div className="flex flex-col items-center justify-center py-4">
                <button className="w-full max-w-xs p-3 text-sm uppercase bg-green-450 text-gray-50">
                  Pay with payfast
                </button>
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
            <div className="p-6 bg-white">
              <p className="mb-4 font-bold">Order Review</p>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Delivery Method</p>
                <button className="text-xs font-semibold text-blue-450">
                  Change
                </button>
              </div>
              <p className="text-lg font-bold">Delivery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderAddress;
