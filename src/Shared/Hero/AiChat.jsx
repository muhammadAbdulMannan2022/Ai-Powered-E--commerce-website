"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Send, Bot } from "lucide-react";
import { MdOutlineSupportAgent } from "react-icons/md";
import { useAiResponceMutation } from "../../redux/features/Products/ProductsSlice";

export default function ChatInterface({ isOpen, setIsAiChatOpen }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Your AI assistant is ready to help you!",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [aiResponse, { isLoading, error }] = useAiResponceMutation();
  const messagesEndRef = useRef(null);

  // Scroll to the bottom of the messages when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    const newUserMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");

    // Prepare the API request payload
    const payload = {
      query: inputValue,
      past_conversations: messages.map((msg) => ({
        text: msg.text,
        sender: msg.sender,
      })),
    };

    try {
      const response = await aiResponse(payload).unwrap();
      const aiMessage = {
        id: messages.length + 2,
        text:
          response.Data || "Sorry, I couldn't process that. Please try again!",
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage = {
        id: messages.length + 2,
        text: "Oops, something went wrong. Please try again later.",
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      className={`fixed bottom-4 right-4 w-80 sm:w-96 h-[500px] bg-stone-100 rounded-lg shadow-xl border border-gray-200 flex flex-col z-[1000] transition-all duration-300 ease-in-out ${
        isOpen
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-[#94B316] rounded-t-lg">
        <div className="flex items-center gap-2">
          <MdOutlineSupportAgent size={24} className="text-white" />
          <h3 className="font-semibold text-white">AI Assistant</h3>
        </div>
        <button
          onClick={() => setIsAiChatOpen(false)}
          className="text-white hover:text-red-500 transition-colors hover:cursor-pointer"
          aria-label="Close chat"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#f8faf0] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.sender === "assistant" && (
              <div className="w-8 h-8 bg-[#94B316] rounded-full flex items-center justify-center flex-shrink-0">
                <Bot size={20} className="text-white" />
              </div>
            )}

            <div
              className={`max-w-[75%] p-3 rounded-lg text-sm transition-all duration-200 ${
                message.sender === "user"
                  ? "bg-[#94B316] text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none shadow-sm"
              }`}
            >
              {message.text}
              <div
                className={`text-xs ${
                  message.sender == "user" ? "text-[#eeecec]" : "text-gray-400"
                }  mt-1`}
              >
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>

            {message.sender === "user" && (
              <div className="w-8 h-8 bg-[#3b4902] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-medium">U</span>
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start gap-3">
            <div className="w-8 h-8 bg-[#94B316] rounded-full flex items-center justify-center flex-shrink-0">
              <Bot size={20} className="text-white" />
            </div>
            <div className="max-w-[75%] p-3 rounded-lg bg-white text-gray-800 rounded-bl-none shadow-sm">
              <div class="flex space-x-1 text-4xl font-bold text-gray-800">
                <span class="animate-bounce [animation-delay:0s]">.</span>
                <span class="animate-bounce [animation-delay:0.2s]">.</span>
                <span class="animate-bounce [animation-delay:0.4s]">.</span>
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="text-center text-red-500 text-sm">
            Error: Could not connect to the AI service.
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 bg-stone-100 rounded-b-lg">
        <div className="flex items-center gap-2">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#94B316] focus:border-transparent text-sm resize-none h-10 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            disabled={inputValue.trim() === "" || isLoading}
            className="bg-[#94B316] hover:bg-[#7a9312] disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors hover:cursor-pointer"
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
