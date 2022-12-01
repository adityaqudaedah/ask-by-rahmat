import React, { ReactNode } from 'react';

const Message = ({
  children,
  handleSubmit,
}: {
  children: ReactNode;
  handleSubmit: (e: React.SyntheticEvent) => void;
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col mt-10 rounded-md items-center space-y-4 p-10 bg-[#DEF5E5]'
    >
      {children}
    </form>
  );
};

export default Message;
