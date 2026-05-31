"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

// Define what a message looks like
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Start with a greeting message
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "greeting",
      role: "assistant",
      content: "Hi! I'm your ShopAI assistant. Ask me anything about our products!",
      timestamp: new Date(),
    },
  ]);

  // Use refs for things that shouldn't trigger a re-render
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef<string>("");

  // 1. Generate a random session ID only ONCE when the widget first loads
  useEffect(() => {
    sessionIdRef.current = Math.random().toString(36).substring(2, 15);
  }, []);

  // 2. Auto-scroll to the bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // 3. Handle sending the message to the backend
  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault(); // Prevent page refresh if form is submitted
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    setInputValue(""); // Clear input box immediately

    // Add user message to UI
    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userText,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      // Call our FastAPI backend!
      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: userText,
          session_id: sessionIdRef.current,
        }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();

      // Add AI response to UI
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.response,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      // Show an error message in the chat
      setMessages((prev) => [
        ...prev,
        {
          id: "error-" + Date.now(),
          role: "assistant",
          content: "Sorry, I am having trouble connecting to the server right now. Please try again later.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-black text-white rounded-full shadow-2xl hover:bg-gray-800 transition-all z-50 ${isOpen ? "hidden" : "block"}`}
      >
        <MessageCircle className="w-8 h-8" />
      </button>

      {/* CHAT PANEL */}
      <div
        className={`fixed bottom-6 right-6 w-full max-w-[360px] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 transition-all duration-300 transform origin-bottom-right ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-black text-white p-4 rounded-t-2xl flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bot className="w-5 h-5" />
            <h3 className="font-bold text-sm">ShopAI Assistant</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm"
                }`}
              >
                {msg.content}
              </div>
              <span className="text-[10px] text-gray-400 mt-1">
                {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex flex-col items-start">
              <div className="bg-white border border-gray-200 p-4 rounded-2xl rounded-bl-none shadow-sm flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
          )}
          {/* Invisible div to scroll to */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-200 rounded-b-2xl flex items-center space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </>
  );
}