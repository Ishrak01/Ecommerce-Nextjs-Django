"use client";
import Link from "next/link";
import { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";

import MaxMin from "./MaxMin";
import Search from "./Search";
import UserDetails from "./UserDetails";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logout = () => {

    localStorage.clear()
    
  };

  // Check if localStorage is defined
  const isLocalStorageAvailable = typeof window !== "undefined" && window.localStorage;

  // Use localStorage only if it's available
  const token = isLocalStorageAvailable ? localStorage.getItem("access_token") : null;

  return (
    <div>
      <div className="border rounded-md sticky mx-[120px] flex h-14 justify-between items-center z-50 py-3 px-8 font-extrabold bg-blue-600 text-[#FFFFFF] top-0">
        <div className="  flex md:flex-row items-center justify-between gap-4 font-extrabold relative">
          {!token ? (
            <button onClick={toggleDropdown} className="block md:hidden">
              <TiThMenu />
            </button>
          ) : (
            <div></div>
          )}

          {isDropdownOpen && (
            <div className="relative w-full flex flex-col bg-blue-700 p-4 md:block">
              <Link href="/Registration">Register</Link>
              <Link href="/Login">Login</Link>
            </div>
          )}

          <Link href="/">Zone Sparks Limited</Link>
        </div>

        <div className="text-black items-center">
          <Search />
        </div>

        {token ? (
          <UserDetails logout={logout} />
        ) : (
          <div className="flex gap-5 justify-around">
            
            <Link href="/Registration" className="hidden md:block">
              <h1>Register</h1>
            </Link>
            <Link href="/Login" className="hidden md:block">
              <h1>Login</h1>
            </Link>

            
            <div>
              <Link href="/Cart">
                <FaCartPlus className="h-6 w-8" />
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="mx-[120px] bg-white p-1 ">
        <MaxMin />
      </div>
      <br/>
    </div>
  );
}
