//supabase import
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react';
import HomePage from '@/components/account';
import Layout from '@/components/layout';
import Card from '@/components/card';

const IndexPage = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <>
      {!session ? (
        <div className='flex flex-col items-center justify-center space-y-10 max-w-screen-md min-h-screen mx-auto'>
          <h1 className='text-2xl font-bold text-[#8EC3B0]'>Ask By Rahmat</h1>
          <Card>
            <Auth appearance={{ theme: ThemeSupa }} supabaseClient={supabase} />
          </Card>
        </div>
      ) : (
        <Layout>
          <HomePage />
        </Layout>
      )}
    </>
  );
};

export default IndexPage;
