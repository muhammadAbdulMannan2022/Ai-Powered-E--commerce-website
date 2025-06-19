"use client";

import React, { useState } from "react";
import { X, Send, Bot } from "lucide-react";
import { MdOutlineSupportAgent } from "react-icons/md";

export default function ChatInterface({ isOpen, setIsAiChatOpen }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Your AI assistance ready to help you!",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const newUserMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");

    // Simulate AI response after a short delay
    setTimeout(() => {
      const responses = [
        "I'm here to help! What can I assist you with today?",
        "That's a great question! Let me help you with that.",
        "I understand. Here's what I think about that...",
        "Thanks for sharing! I'm ready to assist you further.",
        "Interesting! Let me provide you with some helpful information.",
      ];

      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];

      const aiResponse = {
        id: messages.length + 2,
        text: randomResponse,
        sender: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div
      className={`bottom-4 right-4 w-80 h-[500px] bg-stone-100 rounded-lg shadow-xl border border-gray-200 flex flex-col z-[1000] ${
        isOpen ? "fixed" : "hidden"
      }`}
    >
      {console.log(isOpen)}
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="font-medium text-gray-800">
          Chat with your assistance!
        </h3>
        <button
          onClick={() => setIsAiChatOpen(false)}
          className="text-gray-500 hover:text-gray-700 transition-colors hover:cursor-pointer"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f8faf0]">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-2 ${
              message.sender === "user" ? "flex-row justify-end" : "flex-row"
            }`}
          >
            {message.sender === "assistant" && (
              <div className="w-8 h-8 bg-[#94B316] rounded-full flex items-center justify-center flex-shrink-0">
                <MdOutlineSupportAgent size={20} className="text-white" />
              </div>
            )}

            <div
              className={`max-w-[70%] p-3 rounded-lg text-sm ${
                message.sender === "user"
                  ? "bg-[#94B316] text-white rounded-br-sm"
                  : "bg-white text-gray-800 rounded-bl-sm shadow-sm"
              }`}
            >
              {message.text}
            </div>

            {message.sender === "user" && (
              <div className="w-8 h-8 bg-[#3b4902] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-medium">U</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type here....."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={inputValue.trim() === ""}
            className="bg-green-500 hover:bg-[#94B316] disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
