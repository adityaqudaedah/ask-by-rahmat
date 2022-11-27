import React, { ReactNode } from 'react';

const Card = ({ children }: { children: ReactNode }) => {
  return <div className='p-4 shadow-md rounded-md'>{children}</div>;
};

export default Card;
