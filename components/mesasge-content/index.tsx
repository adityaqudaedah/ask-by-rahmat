import React from 'react';

const MessageContent = () => {
  return (
    <div className='min-w-full text-center'>
      <textarea
        className='rounded-md p-4 text-gray-500'
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
