// src/pages/AboutPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  HelpCircle, 
  BookOpen, 
  MessageSquare, 
  ChevronDown,
  CheckCircle,
  ArrowRight,
  Heart,
  Coffee
} from "lucide-react";

export default function AboutPage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How do I add a new task?",
      answer: "Simply type your task in the input field at the top of your dashboard and click 'Add'. Your task will appear in the 'To-Do' column."
    },
    {
      id: 2,
      question: "How do I move tasks between columns?",
      answer: "You can drag and drop tasks between the 'To-Do', 'In Progress', and 'Done' columns. Just click and drag a task card to move it."
    },
    {
      id: 3,
      question: "Can I edit or delete tasks?",
      answer: "Yes! Each task has 'Edit' and 'Remove' buttons. Click 'Edit' to change the task title, or 'Remove' to delete it completely."
    },
    {
      id: 4,
      question: "Is my data saved?",
      answer: "Absolutely! All your tasks are automatically saved to the cloud. You can log out and log back in anytime to find your tasks exactly as you left them."
    },
    {
      id: 5,
      question: "Can I use TaskFlow on mobile?",
      answer: "Yes! TaskFlow is fully responsive and works great on mobile devices, tablets, and desktop computers."
    }
  ];

  const features = [
    {
      title: "Drag & Drop",
      description: "Intuitive drag and drop interface for moving tasks",
      icon: ArrowRight
    },
    {
      title: "Real-time Sync",
      description: "Your tasks sync instantly across all devices",
      icon: CheckCircle
    },
    {
      title: "Secure Auth",
      description: "Firebase authentication keeps your data safe",
      icon: BookOpen
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">About TaskFlow</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-12">
        {/* About Section */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
              <Heart className="w-8 h-8 text-pink-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About TaskFlow</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              TaskFlow is a simple, elegant task management application built with React and Firebase. 
              It helps you organize your work and personal tasks in three simple categories: To-Do, In Progress, and Done.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center p-6 rounded-lg bg-pink-50">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-pink-100 rounded-full mb-4">
                    <IconComponent className="w-6 h-6 text-pink-500" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <HelpCircle className="w-8 h-8 text-blue-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Get answers to common questions about using TaskFlow</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openFaq === faq.id ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === faq.id && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Getting Started Guide */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <BookOpen className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Getting Started</h2>
            <p className="text-gray-600">Follow these simple steps to start managing your tasks</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Sign Up", desc: "Create your account with email or Google" },
              { step: "2", title: "Add Tasks", desc: "Type your first task and click Add" },
              { step: "3", title: "Organize", desc: "Drag tasks between To-Do, In Progress, Done" },
              { step: "4", title: "Stay Productive", desc: "Your tasks sync across all devices" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-pink-500 text-white rounded-full font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact/Support */}
        <section className="bg-white rounded-xl shadow-sm p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
            <MessageSquare className="w-8 h-8 text-purple-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need More Help?</h2>
          <p className="text-gray-600 mb-6">
            If you have any questions or need support, feel free to reach out!
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Coffee className="w-4 h-4" />
              <span>Built with ❤️ in Kigali, Rwanda</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}