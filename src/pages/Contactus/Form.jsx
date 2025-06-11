import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import Title from "../../helpers/Title";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email) {
      alert("Email is required");
      return;
    }
    console.log("Form submitted:", formData);
    // Add your form submission logic here (e.g., API call)
    alert("Form submitted successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 py-24">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <Title
          title={
            <span className="text-5xl">
              Send A <span className="text-[#99BA14]">Quest To Us</span>
            </span>
          }
        />
        <form onSubmit={handleSubmit} className="space-y-4 pt-10">
          <div className="flex space-x-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2  bg-[#F5F8E8]"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2  bg-[#F5F8E8]"
              required
            />
          </div>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject (Optional)"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 bg-[#F5F8E8]"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write message"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 bg-[#F5F8E8] h-32"
          />
          <button
            type="submit"
            className="w-full bg-[#94B316] text-white p-2 rounded-lg flex items-center justify-center hover:bg-[#94b316e1] transition hover:cursor-pointer"
          >
            <FiSend className="mr-2" /> Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
