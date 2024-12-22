import React, { useRef } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";

const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_iz54vx8",
        "template_pnt53cr",
        form.current,
        "8HUdVCcOeGCKIdBYp"
      )
      .then(
        (result) => {
          console.log("Message Sent Successfully!", result.text);
          toast.success("Message Sent!");
          e.target.reset();
        },
        (error) => {
          console.log("Failed to send message.", error.text);
          toast.error("Failed to send a mail 😢");
        }
      );
  };

  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-6 lg:px-16 flex flex-wrap  rounded-lg overflow-hidden">
        {/* Left Section */}
        <div className="w-full md:w-1/2 bg-[#124e66] text-white p-8">
          <h2 className="text-3xl font-bold mb-6">GET YOUR FREE 30 MIN CONSULTATION</h2>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">EMAIL</h3>
            <p className="text-gray-300">professionalsspotlight@gmail.com</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">OPEN HOURS</h3>
            <p className="text-gray-300">Monday–Friday CST 9:00 AM to 5:00 PM</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 bg-white p-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Send Us a Message</h2>
          <form ref={form} onSubmit={sendEmail} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Name*</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full p-3 border rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Phone*</label>
              <input
                type="text"
                name="phone"
                placeholder="Your Phone"
                className="w-full p-3 border rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Email*</label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full p-3 border rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Service*</label>
              <select
                name="service"
                className="w-full p-3 border rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
                required
              >
                <option value="Website Development">Website Development</option>
                <option value="App Development">App Development</option>
                <option value="SEO Services">SEO Services</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Your Message*</label>
              <textarea
                name="message"
                placeholder="Type your message here..."
                rows="4"
                className="w-full p-3 border rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#124e66] text-white py-3 rounded hover:bg-[#28647c] transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;