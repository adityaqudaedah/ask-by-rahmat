//supabase import
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import {
  useUser,
  useSupabaseClient,
  Session,
} from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import CopyToClipboard from '../copy-to-clipboard';

const HomePage = ({ session }: { session: Session }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // get profiles
  async function getProfile() {
    try {
      setLoading(true);
      let { data, error, status } = await supabase
        .from('profiles')
        .select(`id,username,avatar_url`)
        .eq('id', user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
      }
    } catch (error) {
      alert('Error loading user data!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = () => {
    supabase.auth.signOut();
  };

  useEffect(() => {
    getProfile();
  }, [session]);

  if (loading) return <>loading...</>;

  return (
    <div className='flex flex-col min-w-full min-h-screen p-4'>
      <div className='bg-[#BCEAD5] min-h-full rounded-md p-4 space-y-4'>
        <h1 className='text-center'>Copy this link below :</h1>
        <CopyToClipboard />
      </div>

      <button onClick={handleLogout} className='bg-red color-white p-4'>
        sign out
      </button>
    </div>
  );
};

export default HomePage;
