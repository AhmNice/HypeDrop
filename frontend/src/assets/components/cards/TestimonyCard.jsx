import React from 'react';
import '../../styles/Testimony.css';

// Wrapping the component with forwardRef to pass the ref down correctly
const TestimonyCard = React.forwardRef(({ image, testimony, userName, occupation }, ref) => {
  return (
    <div ref={ref} className='testimonyCard flex flex-col shadow-md gap-5 bg-eerieBlack py-6 lg:px-10 rounded-md p-20 border border-gray-700'>
      <div className="imageContainer flex bg-green- justify-end w-full h-36">
        <div className="testimonyImg shadow-md w-36 h-36">
          <img src={image} alt={userName} className='w-full h-full' />
        </div>
      </div>
      <p className="text-gray-300 text-md lato-bold leading">
        We take pride in the positive impact we've made, and we're excited to share their experience:
        {testimony}
      </p>
      <div>
        <p className='text-gray-400 font-bold text-xl'>{userName}</p>
        <p className='text-gray-400 font-semiBold text-md lato-bold leading'>{occupation}</p>
      </div>
    </div>
  );
});

export default TestimonyCard;
