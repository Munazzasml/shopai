"use client";

import { useState } from "react";
import { Mail, MapPin, CheckCircle, Globe, MessageSquare, Users } from "lucide-react";

export default function ContactPage() {
  // Form State
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle typing in the inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the error when the user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate and Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let newErrors = { name: "", email: "", message: "" };
    let isValid = true;

    // 1. Validate Name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // 2. Validate Email (simple regex check)
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // 3. Validate Message
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
      isValid = false;
    }

    setErrors(newErrors);

    // If valid, pretend to send to a server
    if (isValid) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: "", email: "", message: "" }); // Clear form
      }, 1500); // 1.5 second fake delay
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Get in Touch</h1>
        <p className="text-lg text-gray-600">
          Have a question about ShopAI, or want to discuss our project? Fill out the form below and we'll get back to you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Side: Contact Form */}
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
              <p className="text-gray-600 mb-8">Thank you for reaching out. We will get back to you shortly.</p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="text-blue-600 font-semibold hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-xl outline-none transition-all ${
                    errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-xl outline-none transition-all ${
                    errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full p-3 border rounded-xl outline-none transition-all resize-none ${
                    errors.message ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                  placeholder="How can we help you?"
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 rounded-xl transition-colors disabled:bg-gray-400"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>

        {/* Right Side: Contact Info */}
        <div className="space-y-8 lg:pl-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="bg-gray-100 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Email Us</p>
                  <p>hello@shopai.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="bg-gray-100 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Location</p>
                  <p>Global (Remote Team)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Follow our Project</h3>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-100 p-4 rounded-full text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                <Globe className="w-6 h-6" />
              </a>
              <a href="#" className="bg-gray-100 p-4 rounded-full text-gray-600 hover:bg-blue-100 hover:text-blue-500 transition-colors">
                <MessageSquare className="w-6 h-6" />
              </a>
              <a href="#" className="bg-gray-100 p-4 rounded-full text-gray-600 hover:bg-blue-100 hover:text-blue-700 transition-colors">
                <Users className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}