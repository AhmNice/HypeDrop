import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar2';
import TestimonyCard from '../components/cards/TestimonyCard';
import '../styles/Testimony.css';
import Footer from '../components/Footer';

const Testimonials = () => {
  document.title = 'HypeDrop | Testimonies';
  const testimonyRef = useRef([]);

  const [testimonies, setTestimonies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonies = async () => {
      try {
        const response = await fetch('http://localhost:8001/testimony');
        if (!response.ok) {
          throw new Error('Failed to fetch testimonies');
        }
        const data = await response.json();
        setTestimonies(data || []); // Ensure testimonies is always an array
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonies();
  }, []);

  useEffect(() => {
    if (testimonies.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.3 });

      // Observing each TestimonyCard by assigning it to the ref
      testimonyRef.current.forEach((testimonyCard) => {
        if (testimonyCard) {
          observer.observe(testimonyCard);
        }
      });

      // Cleanup function
      return () => {
        testimonyRef.current.forEach((testimonyCard) => {
          if (testimonyCard) {
            observer.unobserve(testimonyCard);
          }
        });
      };
    }
  }, [testimonies]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className='bg-home-gradient w-full h-full'>
      <Navbar />
      <section className="testimonies min-h-screen p-4 lg:px-28 flex flex-col gap-5">
        <div className='flex gap-5 flex-col'>
          <h4 className='text-2xl md:text-3xl lg:text-4xl text-center font-extrabold text-gray-200'>Testimonials</h4>
          <p className='text-center text-gray-300 text-md lato-bold leading'>
            Here, you'll find stories and experiences shared by our valued customers. We take pride in the positive impact we've made, and we're excited to share their feedback with you. Read on to see how we've helped others achieve their goals and why they trust us.
          </p>
        </div>
        <div className="testimoniesSection grid gap-5 md:grid-cols-3">
          {testimonies.map((testimonial, index) => (
            <TestimonyCard
              key={index}
              ref={(el) => (testimonyRef.current[index] = el)}
              image={testimonial.image}
              testimony={testimonial.testimonial}
              userName={testimonial.userName}
              occupation={testimonial.occupation}
            />
          ))}
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default Testimonials;