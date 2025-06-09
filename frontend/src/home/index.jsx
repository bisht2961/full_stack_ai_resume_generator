import Header from "@/components/custom/Header";
import TestimonialSection from "@/dashboard/components/TestimonialSection";
import React from "react";
import { Link } from "react-router-dom";



const Home = () => {
  
  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Create Stunning Resumes in Seconds
          </h1>
          <p className="text-lg md:text-xl mb-8">
            AI-powered resume builder that helps you land your dream job faster.
          </p>
          <Link to="/dashboard">
            <button className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded shadow hover:bg-gray-200 transition">
              Get Started Free →
            </button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-10 text-center max-w-6xl mx-auto">
          <div className="p-6 shadow rounded hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">✍️ Smart AI Writing</h3>
            <p>
              Our intelligent AI helps you write compelling job summaries and
              bullet points tailored to your profile.
            </p>
          </div>
          <div className="p-6 shadow rounded hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">
              🎨 Beautiful Templates
            </h3>
            <p>
              Pick from modern, professional templates that make your resume
              stand out in a stack.
            </p>
          </div>
          <div className="p-6 shadow rounded hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">📄 Easy Export</h3>
            <p>
              Download your resume as a PDF or share it with a single click. No
              signup required to try.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-gray-50 py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-10 text-center max-w-5xl mx-auto">
          <div>
            <div className="text-5xl font-bold text-indigo-600 mb-4">1</div>
            <p>Fill in your personal and job details</p>
          </div>
          <div>
            <div className="text-5xl font-bold text-indigo-600 mb-4">2</div>
            <p>Let our AI generate tailored resume content</p>
          </div>
          <div>
            <div className="text-5xl font-bold text-indigo-600 mb-4">3</div>
            <p>Preview, customize and download or share</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialSection />

      {/* CTA Section */}
      <section className="bg-indigo-600 text-white text-center py-16">
        <h2 className="text-3xl font-bold mb-4">Start Your Journey Today</h2>
        <p className="mb-6">
          No design skills required. Just focus on your skills and let us handle
          the rest.
        </p>
        <Link to="/dashboard">
          <button className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded shadow hover:bg-gray-100 transition">
            Build Your Resume Now →
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6 text-sm">
        © {new Date().getFullYear()} AI Resume Builder. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
