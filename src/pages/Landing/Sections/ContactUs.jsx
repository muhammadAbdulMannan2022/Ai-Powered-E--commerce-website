import React from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import Title from "../../../helpers/Title";

// Mock Title component since the import path might be different
export default function ContactSection() {
  return (
    <div className="bg-gray-100 py-10">
      <div className="flex items-center justify-center flex-col px-4">
        <Title
          title={
            <>
              <span className="text-[#99BA14]">Contact</span> Us
            </>
          }
        />
        <span className="text-[#6F706A] text-lg md:text-xl mt-4 text-center max-w-2xl">
          Have questions or ready to start your project? Get in touch{" "}
          <br className="hidden md:block" /> with us today—we're here to help
          bring your vision to life.
        </span>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block mt-10">
        <div className="min-h-[60vh] flex items-center justify-center py-4">
          <div className="w-full relative mx-auto px-4">
            <div className="h-[400px] bg-[#F5F8E8] rounded-2xl flex items-center justify-center gap-10 md:gap-40">
              {/* Background Contact Information Section */}
              <div className="p-8 xl:p-16 flex items-center h-full">
                <div className="max-w-md">
                  <div className="space-y-8">
                    {/* Address */}
                    <div className="flex items-start space-x-4">
                      <div className="bg-[#a4be39] p-3 rounded-full flex-shrink-0">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-800 font-medium leading-relaxed text-lg">
                          2972 Westheimer Rd. Santa Ana,
                          <br />
                          Illinois 85486
                        </p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center space-x-4">
                      <div className="bg-[#a4be39] p-3 rounded-full flex-shrink-0">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-800 font-medium text-lg break-all">
                          willie.jennings@example.com
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center space-x-4">
                      <div className="bg-[#a4be39] p-3 rounded-full flex-shrink-0">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-800 font-medium text-lg">
                          (207) 555-0119
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Contact Form */}
              <div className="xl:right-16 w-full max-w-md z-10">
                <div className="bg-white rounded-2xl shadow-2xl p-6 xl:p-8 border border-gray-100">
                  <div className="mb-6 text-[#3F4919]">
                    <h2 className="text-xl xl:text-2xl font-bold mb-1">
                      We Are Here! Please
                    </h2>
                    <h3 className="text-xl xl:text-2xl font-bold">
                      Send A Quest
                    </h3>
                  </div>

                  <form className="space-y-4">
                    {/* Name and Email Row */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <input
                          type="text"
                          placeholder="Name"
                          className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a4be39] focus:border-transparent bg-[#f7f9e8] transition-all duration-200"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          placeholder="Email"
                          className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a4be39] focus:border-transparent bg-[#f7f9e8] transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <input
                        type="text"
                        placeholder="Subject (Optional)"
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a4be39] focus:border-transparent bg-[#f7f9e8] transition-all duration-200"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <textarea
                        placeholder="Write message"
                        rows={4}
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a4be39] focus:border-transparent bg-[#f7f9e8] resize-none transition-all duration-200"
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div>
                      <button
                        type="submit"
                        className="w-full bg-[#a4be39] hover:bg-[#8ca830] text-white font-medium py-2.5 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        Send
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="lg:hidden px-4 py-8">
        <div className="mx-auto space-y-8">
          {/* Contact Information Section - Full Width */}
          <div className="bg-[#F5F8E8] rounded-2xl p-6 md:p-8">
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="bg-[#a4be39] p-3 rounded-full flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-800 font-medium leading-relaxed text-base md:text-lg">
                    2972 Westheimer Rd. Santa Ana,
                    <br />
                    Illinois 85486
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-4">
                <div className="bg-[#a4be39] p-3 rounded-full flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-800 font-medium text-base md:text-lg break-all">
                    willie.jennings@example.com
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-4">
                <div className="bg-[#a4be39] p-3 rounded-full flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-800 font-medium text-base md:text-lg">
                    (207) 555-0119
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section - Full Width */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-100">
            <div className="mb-8 text-[#3F4919]">
              <h2 className="text-xl md:text-2xl font-bold mb-1">
                We Are Here! Please
              </h2>
              <h3 className="text-xl md:text-2xl font-bold">Send A Quest</h3>
            </div>

            <form className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a4be39] focus:border-transparent bg-[#f7f9e8] transition-all duration-200"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a4be39] focus:border-transparent bg-[#f7f9e8] transition-all duration-200"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <input
                  type="text"
                  placeholder="Subject (Optional)"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a4be39] focus:border-transparent bg-[#f7f9e8] transition-all duration-200"
                />
              </div>

              {/* Message */}
              <div>
                <textarea
                  placeholder="Write message"
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a4be39] focus:border-transparent bg-[#f7f9e8] resize-none transition-all duration-200"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-[#a4be39] hover:bg-[#8ca830] text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
