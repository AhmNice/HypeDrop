import React from 'react';
import PropTypes from 'prop-types';
import bg from '../../assets/images/bg.jpg';
import Navbar from './Navbar2';
import { useNavigate } from 'react-router-dom';

const Hero = ({ title, description, ctaText = "Get Started" }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <section className="w-full h-screen relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={bg}
          alt="Musical background"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Gradient overlay and content */}
      <div className="bg-home-gradient z-10 h-full w-full absolute flex flex-col">
        <Navbar />

        <div className="container mx-auto px-4 flex-grow flex items-center">
          <div className="grid gap-12 lg:gap-20 lg:grid-cols-2 w-full items-center">
            {/* Text content */}
            <div className="slide-in p-6 flex flex-col gap-6 lg:gap-8 lg:px-8 px-4">
              <h1 className="text-white text-4xl md:text-5xl lg:text-6xl rubik-bold leading-tight">
                {title || "Discover the Next Hit Before It Drops!"}
              </h1>

              <p className="text-gray-300 lato-regular text-lg md:text-xl lg:text-xl leading-relaxed">
                {description || <>
                  Are you ready to share your music with the world? 🚀<br />
                  Engage your fans like never before! <br />
                  It's time to amplify your music's impact. Share your creativity,
                  build anticipation, and turn your fans into lifelong supporters.
                </>}
              </p>

              <button
                onClick={handleGetStarted}
                className="text-darkSlateGray rubik-regular w-40 rounded-full cursor-pointer bg-brassYellow hover:bg-brassYellow-dark transition-colors duration-300 p-4 text-lg focus:outline-none focus:ring-2 focus:ring-brassYellow focus:ring-opacity-50"
                aria-label="Get started with our service"
              >
                {ctaText}
              </button>
            </div>

            {/* Image collage */}
            <div className="hidden md:flex relative h-96 items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-md h-full">
                <div className="rounded-xl absolute z-20 w-60 h-60 overflow-hidden shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img
                    src={bg}
                    alt="Music showcase"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="rounded-xl absolute z-10 top-20 left-20 md:left-40 w-64 h-64 bg-blue-500 overflow-hidden shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img
                    src={bg}
                    alt="Music showcase"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = {
  title: PropTypes.string,
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  ctaText: PropTypes.string
};

export default Hero;