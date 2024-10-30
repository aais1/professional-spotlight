import React, { useState } from "react";
import getApi from "../../utils/sendrequest";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify

export default function Subscription({ onClose }) {
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false); // State to store checkbox status
  const [isLoading, setIsLoading] = useState(false); // Loading state for subscription

  // Handler for email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handler for checkbox change
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to handle email subscription
  const SendData = async () => {
    // Check if the checkbox is checked
    if (!isChecked) {
      toast.error("You must agree to the privacy policy and terms.");
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      toast.warning("Please enter a valid email address.");
      return;
    }

    setIsLoading(true); // Start loading

    try {
      const response = await getApi("POST", "/user/biography/subscribe", {
        email: email,
      });
      console.log("response", response);

      if (response.message === "Subscribed successfully") {
        console.log("Subscribed successfully");
        toast.success("Subscribed successfully!");
        setEmail("");
        setIsChecked(false); // Reset checkbox after successful subscription
        setTimeout(onClose, 3000); // Delay onClose by 3 seconds
      } else {
        toast.warning("You may have already subscribed with this email!");
        setTimeout(onClose, 3000); // Delay onClose by 3 seconds
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className="relative p-6 bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
      {/* Toast Container to display toast notifications */}
      <ToastContainer />

      <h2 className="text-[#124e66] text-2xl mb-4">Subscribe to our newsletter</h2>
      
      {/* Email Input */}
      <input
        type="email"
        placeholder="Enter your email"
        className="border p-2 w-full rounded-md mb-4"
        value={email}
        onChange={handleEmailChange}
        disabled={isLoading} // Disable input while submitting
      />

      {/* Subscribe Button */}
      <button
        className={`border rounded-md w-full h-10 hover:shadow-lg bg-[#124e66] text-white ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={SendData}
        disabled={isLoading} // Disable button while submitting
      >
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
          </div>
        ) : (
          "Subscribe"
        )}
      </button>

      {/* Checkbox and Terms */}
      <div className="flex items-center space-x-2 mt-4">
        <input
          type="checkbox"
          className="border"
          checked={isChecked}
          onChange={handleCheckboxChange}
          disabled={isLoading} // Disable checkbox while submitting
        />
        <p className="text-xs">
          I have read{" "}
          <a href="#" className="text-blue-500 underline">
            Privacy policy and terms of condition
          </a>
        </p>
      </div>

      {/* Close Button */}
      <button
        className="mt-4 text-sm text-[#124e66] underline"
        onClick={onClose} // Close modal on click
        disabled={isLoading} // Disable close button while submitting
      >
        Close
      </button>
    </div>
  );
}
