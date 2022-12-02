import React, { ReactNode } from 'react';

interface IUser{
  userId:string
}

const CopyToClipboard: React.FC<IUser> = ({ userId }) => {
  return (
    <div className='flex flex-row w-full p-2 bg-white rounded-md'>
      <div className='flex grow'>
        <p className='text-slate-500'>{`${process.env.NEXT_PUBLIC_LOCAL_URL}/${userId}`}</p>
      </div>

      <div className='flex grow-0 bg-[#DEF5E5] rounded-md px-3'>
        <button className='text-slate-800'>copy</button>
      </div>
    </div>
  );
};

export default CopyToClipboard;
