"use client"
import accessBlock from "@/accessBlock";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRegisterMutation } from "../Features/auth/authApi";


const Register = () => {
 
const router=useRouter();
  

  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");

  const [registerController, { data, isLoading }] =useRegisterMutation()

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append("first_name", first_name);
    formDataToSend.append("last_name", last_name);
    formDataToSend.append("email", email);
    formDataToSend.append("password", password);
  
  
    if (image instanceof File) {
      formDataToSend.append("image", image);
    }
  
    try {

      await registerController(formDataToSend);
  
      // If registration is successful, alert the user and redirect to login page
      toast.success("Your account has been created");
      router.push("/Login");
    } catch (error) {
      
      console.error("Registration failed:", error);
    
    }
  };
  
  if (isLoading ) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-opacity-25 border-r-4 border-gray-300 h-16 w-16 mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register for an Account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="Name" className="sr-only">
                First Name
              </label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                autoComplete="first_name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="First Name"
                value={first_name}
                onChange={(e) => setFirst_name(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                autoComplete="last_name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Last Name"
                value={last_name}
                onChange={(e) => setLast_name(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">
                Phone
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password  [ upper,lower,numeric and special character]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Address
              </label>
              <input
                id="file"
                name="file"
                type="file"
                autoComplete="image"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder=""
               
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default accessBlock(Register);

