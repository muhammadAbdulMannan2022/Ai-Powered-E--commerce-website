import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import Title from "../../helpers/Title";
import { useSendMessageMutation } from "../../redux/features/Products/ProductsSlice";
import toast, { Toaster } from "react-hot-toast";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState(null); // For success/error messages
  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      setFormStatus("error");
      alert("Email is required");
      return;
    }
    try {
      await sendMessage(formData).unwrap(); // Send form data to the backend
      setFormStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" }); // Reset form
      setTimeout(() => setFormStatus(null), 3000); // Clear status after 3 seconds
      toast.success("Your message has been sent successfully!");
    } catch (err) {
      setFormStatus("error");
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 py-24">
      <Toaster />
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
              className="w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#94B316] bg-[#F5F8E8]"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#94B316] bg-[#F5F8E8]"
              required
            />
          </div>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject (Optional)"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#94B316] bg-[#F5F8E8]"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write message"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#94B316] bg-[#F5F8E8] h-32"
            required
          />
          {/* Form Status */}
          {formStatus === "success" && (
            <p className="text-green-600 text-sm">Message sent successfully!</p>
          )}
          {formStatus === "error" && (
            <p className="text-red-600 text-sm">
              Failed to send message. Please try again.
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-[#94B316] text-white p-2 rounded-lg flex items-center justify-center hover:bg-[#94b316e1] transition hover:cursor-pointer"
            disabled={isLoading}
          >
            <FiSend className="mr-2" /> {isLoading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
