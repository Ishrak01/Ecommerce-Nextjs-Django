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
    localStorage.clear();
  };

  const token = typeof window !== "undefined" && localStorage.getItem("access_token");

  return (
    <div>
      <div className="border mx-[120px] rounded-md sticky top-0 bg-blue-600 text-white px-8 py-3 flex justify-between items-center z-50">
        <div className="flex items-center gap-4 font-extrabold relative">
          {!token && (
            <button onClick={toggleDropdown} className="block md:hidden">
              <TiThMenu />
            </button>
          )}

          {isDropdownOpen && !token && (
            <div className="absolute top-full left-0 z-10 w-full flex flex-col bg-blue-700 p-4 md:block">
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
              <a>Register</a>
            </Link>
            <Link href="/Login" className="hidden md:block">
              <a>Login</a>
            </Link>
            <div>
              <Link href="/Cart">
                <FaCartPlus className="h-6 w-8" />
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white mx-[120px] p-1">
        <MaxMin />
      </div>
    </div>
  );
}
