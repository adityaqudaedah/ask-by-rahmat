import React, { Dispatch, SetStateAction, useState } from 'react';

const NameInput: React.FC<{
  disable: 'true' | 'false' | undefined;
  name: string;
  setName: Dispatch<SetStateAction<string|null>>;
}> = ({ disable, name, setName }) => {
  return (
    <input
      onChange={(event) => setName(event.target.value)}
      value={name}
      aria-disabled={disable}
      disabled={disable === 'true' ? true : false}
      type='text'
      className='w-96 max-w-full inline-block py-2 px-3 text-slate-500 text-md border rounded-md focus:outline-none aria-disabled:bg-slate-50 aria-disabled:text-slate-500 aria-disabled:border-slate-200 aria-disabled:shadow-none'
    />
  );
};

export default NameInput;
