import type { AppProps } from 'next/app';
import '../styles/globals.css';

import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import {
  Session,
  SessionContextProvider,
  useSession,
} from '@supabase/auth-helpers-react';
import { useState } from 'react';

interface ISupabaseSession {
  initialSession: Session;
}

export default function App({
  Component,
  pageProps,
}: AppProps<ISupabaseSession>) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <main className='min-h-screen min-w-full'>
        <Component {...pageProps} />
      </main>
    </SessionContextProvider>
  );
}
