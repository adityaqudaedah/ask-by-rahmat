import React, { ReactNode } from 'react';
import MeassageHeader from '../message-header';

const Message = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex flex-col min-w-full p-10 bg-[#DEF5E5]'>{children}</div>
  );
};

export default Message;
