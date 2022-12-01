import React from 'react';

const MessageAction = ({ loading }: { loading: boolean }) => {
  return (
    <>
      <button
        disabled={loading}
        type='submit'
        className='text-center p-2 rounded-full hover:bg-cyan-600 bg-cyan-500 w-60 text-white'
      >
        {' '}
        SUBMIT{' '}
      </button>
    </>
  );
};

export default MessageAction;
