/* eslint-disable react/no-unescaped-entities */
//supabase import
import CopyToClipboard from '@/components/copy-to-clipboard';
import NameInput from '@/components/inputs/NameInput';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { Database } from 'types';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const HomePage = () => {
  const [toggleEditName, setToggleEditName] = useState<boolean>(false);
  const [name, setName] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;
  const supabase = useSupabaseClient<Database>();
  const user = useUser();

  const handleLogout = () => {
    supabase.auth.signOut();
  };

  const handleOnEditName = () => {
    // check is toggleEditName true
    if (toggleEditName && id?.length !== 0) {
      postProfile()
        .then((res) => setToggleEditName(false))
        .then((res) => getProfile(user?.id!));
    }
    setToggleEditName(true);
  };

  // post profile
  const postProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ full_name: name, username: name })
        .eq('id', user?.id!);
      if (error) alert(error.message);
    } catch (error: any) {
      throw new Error(error);
    }
  };
  // get profile
  const getProfile = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id as string);
      if (!data) router.push('/');
      if (error) console.log(error);
      if (data) setName(data[0]?.full_name);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    getProfile(user?.id!);
  }, []);

  return (
    <div className='flex flex-col min-w-full min-h-screen p-4 text-center space-y-8'>
      {/* profile info */}
      <div className='w-full mt-4'>
        <div>
          {/* name input */}
          <h1 className='font-semibold text-orange-400'>
            {name ? `Hello, ${name}` : `Please Insert Your Name!`}
          </h1>
          <div className='flex flex-row justify-center space-x-2 mt-2 mb-4'>
            <NameInput
              disable={!toggleEditName ? 'true' : 'false'}
              name={name!}
              setName={setName}
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
