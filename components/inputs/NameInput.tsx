import React, { useState } from 'react';

const NameInput: React.FC<{
  disable: 'true' | 'false' | undefined;
  value: string;
}> = ({ disable, value }) => {
  const [currentValue, setCurrentValue] = useState(value);
  return (
    <input
      onChange={(event) => setCurrentValue(event.target.value)}
      value={currentValue}
      aria-disabled={disable}
      disabled={disable === 'true' ? true : false}
      type='text'
      className='w-96 max-w-full inline-block py-2 px-3 text-slate-500 text-md border rounded-md focus:outline-none aria-disabled:bg-slate-50 aria-disabled:text-slate-500 aria-disabled:border-slate-200 aria-disabled:shadow-none'
    />
  );
};

export default NameInput;
