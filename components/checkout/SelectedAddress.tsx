import { useCart } from "@/providers/CartProvider";
import Spinner from "../Spinner";

export const SelectedAddress: React.FC = () => {
  const { personalInfo, shippingAddress, loading } = useCart();

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div>
      <div className="relative grid my-2 select-none w-fit items-center whitespace-nowrap rounded-full bg-green-400 py-0.5 px-3 text-[.6rem] font-semibold uppercase text-gray-50">
        <span className="">{shippingAddress?.address_type}</span>
      </div>
      {shippingAddress?.complex_or_building && (
        <p className="font-bold text-md">
          {shippingAddress.complex_or_building}
        </p>
      )}
      <p className="font-bold text-md">{shippingAddress?.street_address}</p>
      <p className="font-bold text-md">
        {shippingAddress?.suburb}, {shippingAddress?.city_or_town},{" "}
        {shippingAddress?.post_code}
      </p>
      <div className="flex items-center mt-3 space-x-3 text-sm text-gray-500">
        <span>{personalInfo?.first_name}</span>
        <span>{personalInfo?.phone_number}</span>
      </div>
    </div>
  );
};

export default SelectedAddress;
