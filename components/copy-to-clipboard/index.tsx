import React, { useState, useRef } from 'react';
import { copyTextToClipboard } from 'helpers';

interface IUser {
  userId: string;
}

const CopyToClipboard: React.FC<IUser> = ({ userId }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleCopyText = () => {
    copyTextToClipboard(inputRef?.current?.value!)
      .then(() => setTimeout(() => setCopied(true), 250))
      .catch((error) => {
        throw new Error(error);
      });
  };
  return (
    <div className='flex flex-row w-full p-2 bg-white rounded-md'>
      <div className='flex grow'>
        <input
          ref={inputRef}
          className='text-slate-500 w-full focus:outline-none'
          readOnly
          value={`${process.env.NEXT_PUBLIC_ASK_BY_RAHMAT_APP_URL}/${userId}`}
        />
      </div>

      <div className='flex grow-0 bg-[#DEF5E5] rounded-md px-3 py-1 hover:bg-[#BCEAD5] hover:cursor-pointer '>
        <button onClick={handleCopyText}>
          <span className='text-slate-500 m-auto'>
            {copied ? 'copied' : 'copy'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default CopyToClipboard;
