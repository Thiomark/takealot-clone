import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const SideNav: React.FC = () => {
  const router = useRouter();

  const navigation = [
    {
      name: "Orders",
      href: "/account/orders",
      subMenu: ["Orders", "Invoices", "Returns", "Product Reviews"],
    },
    {
      name: "Payments & Credit",
      href: "#",
      subMenu: ["Credit & Refunds", "Redeem Gift Voucher"],
    },
    {
      name: "Customer Information",
      href: "personal-details",
      subMenu: ["Personal Details", "Address Book", "Newsletter Subscriptions"],
    },
    {
      name: "My Lists",
      href: "#",
      subMenu: ["My Lists", "Create a List"],
    },
  ];

  return (
    <div className="flex flex-col w-64 h-screen px-4 py-8 bg-white border-r dark:bg-gray-800 dark:border-gray-600">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
        My Account
      </h2>

      <div className="flex flex-col justify-between flex-1 mt-6">
        {navigation.map((item) => (
          <div key={item.name}>
            <p className="text-gray-400 dark:text-gray-400">{item.name}</p>
            <nav>
              {item.subMenu.map((subItem) => (
                <Link
                  href={item.href}
                  key={subItem}
                  className={`block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg dark:text-white hover:bg-blue-500 hover:text-white dark:hover:bg-gray-700 ${
                    router.pathname == item.href ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  {subItem}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
