import React, { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar2';
import { useNavigate } from 'react-router-dom';
import '../styles/About.css'
import Footer from '../components/Footer';

const AboutPage = () => {
  const navigate = useNavigate()
  document.title='HypeDrop | About'
  return (
   <div className='bg-home-gradient'>
    <Navbar />
     <div className=" min-h-screen py-10 px-6 md:px-20">
      {/* Header Section */}
      <div  className=" section text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-200">About HypeDrop</h1>
        <p className="mt-2 text-lg text-gray-400">Your ultimate source for song snippets and release reminders</p>
      </div>

      {/* Mission Section */}
      <section  className=" section text-center mb-16">
        <h2 className="text-3xl font-semibold text-gray-200">Our Mission</h2>
        <p className="mt-4 text-lg text-gray-400 max-w-4xl mx-auto">
          At <strong>HypeDrop</strong>, we believe that music should be experienced before it's released.
          Our platform brings you exclusive song snippets directly from your favorite artists,
          so you can get a taste of the next big hit ahead of time. We're all about creating excitement and building anticipation for the next big release.
        </p>
      </section>

      {/* Features Section */}
      <section  className=" section bg-gray-100 rounded-lg shadow-lg p-8 mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col items-center">
            <svg
              className="w-16 h-16 text-yellow-500 mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 18V5l12-2v13"></path>
              <circle cx="6" cy="18" r="3"></circle>
              <circle cx="18" cy="16" r="3"></circle>
            </svg>
            <h3 className="text-xl font-semibold text-gray-800">Exclusive Song Snippets</h3>
            <p className="text-gray-600 mt-4">
              Get a sneak peek of your favorite artist's latest tracks before they drop. We offer song previews that will have you hooked!
            </p>
          </div>
          <div className="flex flex-col items-center">
            <svg
              className="w-16 h-16 text-yellow-500 mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 12c2.9 0 5.4-2.1 5.9-5h-2.3c-.4 1.3-1.6 2.2-3.1 2.2-1.8 0-3.2-1.5-3.2-3.3s1.4-3.3 3.2-3.3c1.5 0 2.8.9 3.2 2.2h2.3c-.5-2.9-2.9-5-5.9-5-3.3 0-6 2.7-6 6s2.7 6 6 6z"></path>
            </svg>
            <h3 className="text-xl font-semibold text-gray-800">Release Reminders</h3>
            <p className="text-gray-600 mt-4">
              Never miss the release of a new song! We send you reminders for upcoming song drops so you're always in the loop.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section  className="section text-center py-12 bg-yellow-500 p-5 rounded-lg shadow-lg text-white">
        <h2 className="text-3xl font-semibold">Stay Updated, Stay Excited!</h2>
        <p className="mt-4 text-lg">Join us and be the first to hear the freshest song snippets and receive timely release reminders!</p>
        <div className="mt-6">
          <button
          onClick={()=>{navigate('/signup')}}
          className='bg-white text-yellow-500 font-bold py-2 px-8 rounded-full text-lg'>
            Sign up now
            </button>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
   </div>
  );
};

export default AboutPage;
