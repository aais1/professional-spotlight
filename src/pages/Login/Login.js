import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import "tailwindcss/tailwind.css"; // Assuming Tailwind CSS is being used
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const backgroundImageDesktop = "/Images/loginpic.jpg";
  const backgroundImageMobile = "/Images/loginpic.jpg";
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!form.email || !emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!form.password || !passwordRegex.test(form.password)) {
      toast.error(
        "Password must be at least 8 characters long, including a capital letter, a small letter, a number, and a special character"
      );
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Form submission logic here
      toast.success("Login successful!");
    }
  };

  return (
    <div className="grid sm:flex min-h-screen">
      <ToastContainer />

      {/* Left half with image and welcome message for desktop */}
      <div
        className="hidden sm:flex w-full sm:w-1/2 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${backgroundImageDesktop})`}}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex w-full items-center justify-center h-full">
          <h1 className="text-white text-3xl sm:text-4xl font-bold text-center">
            Welcome  to Professionals Spotlight
          </h1>
        </div>
      </div>

      {/* Mobile view with image and welcome message */}
      <div
        className="flex sm:hidden w-full h-72 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${backgroundImageMobile})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <h1 className="text-white text-2xl font-bold text-center">
            Welcome Back to Professionals Spotlight
          </h1>
        </div>
      </div>

      {/* Right half with login form */}
      <div className="w-full sm:w-1/2 flex items-center justify-center p-10">
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-center">Admin Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full border border-gray-300 rounded-md py-1 px-2"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="relative">
                <label className="block text-gray-700">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full border border-gray-300 rounded-md py-1 px-2 pr-10"
                  value={form.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 mt-5 right-0 flex items-center px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-500" />
                  ) : (
                    <FaEye className="text-gray-500" />
                  )}
                </button>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className=" bg-[#b63636] text-white py-2 rounded-md hover:bg-red-500 w-40 transition duration-200"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
          <p className="text-center text-gray-600">
            <RouterLink
              to="/forgot-password"
              className="text-[#b63636] hover:underline"
            >
              Forgot Password?
            </RouterLink>
          </p>
          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <RouterLink
              to="/registration"
              className="text-[#b63636] hover:underline"
            >
              Signup
            </RouterLink>
          </p>
        </div>
      </div>
    </div>
  );
}
