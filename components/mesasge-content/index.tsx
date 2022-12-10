import React from 'react';

const MessageContent = () => {
  return (
    <div className='max-w-full text-center'>
      <textarea
        className='max-w-full rounded-md p-4 text-gray-500 shadow-md focus:outline-none'
        id='message'
        name='message'
        rows={4}
        cols={50}
        placeholder='message goes here...'
      />
    </div>
  );
};

export default MessageContent;
