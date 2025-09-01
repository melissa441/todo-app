import React from "react";

function About() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-pink-500 p-6">
      <h1 className="text-3xl font-bold mb-4">About This App</h1>
      <p className="max-w-lg text-center mb-4">
        This is a personal notes & to-do app built with React and Firebase. Keep
        your tasks organized, secure, and accessible anywhere.
      </p>
      <p className="max-w-lg text-center">
        Contact support: <span className="font-bold">support@example.com</span>
      </p>
    </div>
  );
}

export default About;
