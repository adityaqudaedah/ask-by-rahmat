import React from 'react';

interface IMessageHeader {
  name: string;
}

const MeassageHeader: React.FC<IMessageHeader> = ({name}) => {
  return (
    <div className='text-center'>
      <h1 className='font-semibold text-gray-500'>Send Secret Message To {`${name}`}</h1>
    </div>
  );
};

export default MeassageHeader;
