/* eslint-disable react/no-unescaped-entities */
//supabase import
import {
  Session,
  useSupabaseClient,
  useUser,
} from '@supabase/auth-helpers-react';
import { useState } from 'react';
import Link from 'next/link';
import CopyToClipboard from '@/components/copy-to-clipboard';
import NameInput from '@/components/inputs/NameInput';

const HomePage = ({ session }: { session: Session }) => {
  const [toggleEditName, setToggleEditName] = useState<boolean>(false);
  const supabase = useSupabaseClient();
  const user = useUser();

  const handleLogout = () => {
    supabase.auth.signOut();
  };

  const handleOnEditName = () => {
    // check is toggleEditName true
    if (toggleEditName) {
      console.log('submit data');

      setTimeout(() => setToggleEditName(false), 500);
    }
    setToggleEditName(true);
  };

  return (
    <div className='flex flex-col min-w-full min-h-screen p-4 text-center space-y-8'>
      {/* profile info */}
      <div className='w-full mt-4'>
        <div>
          {/* name input */}
          <h1 className='font-semibold text-orange-400 animate-bounce'>
            Please Insert Your Name!
          </h1>
          <div className='flex flex-row justify-center space-x-2 mt-2 mb-4'>
            <NameInput
              disable={!toggleEditName ? 'true' : 'false'}
              value='Rahmat Aditya'
            />
            <button
              onClick={handleOnEditName}
              // disabled = {toggleEditName}
              className='rounded-md px-2  bg-[#9ED5C5] focus:ring focus:ring-[#DEF5E5]  text-sm text-white hover:cursor-pointer hover:bg-[#8EC3B0]'
            >
              {toggleEditName ? 'Submit' : 'Edit Name'}
            </button>
          </div>
        </div>
        {/* my messages */}
        <Link href={`/${user?.id}`}>
          <span className='text-slate-500 hover:text-blue-500'>
            Go To My Message
          </span>
        </Link>
      </div>

      {/* copy to clipboard */}
      <div className='bg-[#BCEAD5] min-h-full rounded-md p-4 space-y-4 mt-2'>
        <h1 className='text-center'>
          Pin this link below into your social media :
        </h1>
        <CopyToClipboard userId={`${user?.id}`} />
      </div>

      {/* sign out */}
      <button
        onClick={handleLogout}
        className='mt-4 bg-rose-300 hover:bg-rose-400 text-md font-semibold text-white p-2 rounded-lg'
      >
        sign out
      </button>
    </div>
  );
};

export default HomePage;
