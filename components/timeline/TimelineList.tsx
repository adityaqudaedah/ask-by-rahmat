import React from 'react';

const TimelineList: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className='rounded-md bg-[#DEF5E5] w-full p-4'>
      <div className='rounded-md py-2 px-4 bg-white shadow-md text-gray-500'>
        {message}
      </div>
    </div>
  );
};

export default TimelineList;
