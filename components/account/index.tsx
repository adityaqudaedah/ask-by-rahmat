//supabase import
import {
  Session,
  useSupabaseClient,
  useUser,
} from '@supabase/auth-helpers-react';
import Link from 'next/link';
import CopyToClipboard from '@/components/copy-to-clipboard';


const HomePage = ({ session }: { session: Session }) => {
  const supabase = useSupabaseClient();
  const user = useUser();

  const handleLogout = () => {
    supabase.auth.signOut();
  };

  return (
    <div className='flex flex-col min-w-full min-h-screen p-4'>
      <div>
        <div className='w-full'>
          <h1>Hello world</h1>
        </div>
        <Link href={`/${user?.id}`}>
          <span className='text-slate-500 hover:text-blue-500 mx-auto'>
            Go To My Message
          </span>
        </Link>
      </div>
      <div className='bg-[#BCEAD5] min-h-full rounded-md p-4 space-y-4 mt-2'>
        <h1 className='text-center'>
          Pin this link below into your social media :
        </h1>
        <CopyToClipboard userId={`${user?.id}`} />
      </div>

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
