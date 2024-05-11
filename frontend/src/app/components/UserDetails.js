
"use client"


import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";

const Dropdown = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    // Retrieve full name from localStorage when component mounts
    const fullName = localStorage.getItem('full_name');
    if (fullName) {
      // Split full name to extract first name
      const firstName = fullName.split(' ')[0];
      setFirstName(firstName);
    }
  }, []);
  
 

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    localStorage.clear();
    router.push("/Login");
  };

  return (
    <div className="relative flex items-center text-left space-x-4">
      <div className="relative inline-block text-left">
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-6 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:bg-gray-200"
          id="options-menu"
          onClick={toggleDropdown}
        >
          Hi,{firstName}
          
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-10 mt-5 w-55 rounded-md shadow-lg bg-blue-500 ring-1 ring-black ring-opacity-5">
          <div
            className="py-[50px]"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <Link
              href={`/Profile/`}
              className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-700"
              role="menuitem"
            >
              Profile
            </Link>
           
            <button
              onClick={logout}
              className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-700"
              role="menuitem"
            >
              Logout
            </button>
          </div>
        </div>
      )}
      <div>
        <Link href="/Cart">
          <FaCartPlus className="h-6 w-8" />
        </Link>
      </div>
    </div>
  );
};

export default Dropdown;
