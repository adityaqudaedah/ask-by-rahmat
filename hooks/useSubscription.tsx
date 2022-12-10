import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { RealtimePostgresChangesFilter } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export const useSubscription = (
  configs: RealtimePostgresChangesFilter<string> = {
    event: '*',
    table: '*',
    schema: 'public',
  }
) => {
  const supabase = useSupabaseClient();
  const [data, setData] = useState<{}>({});

  useEffect(() => {
    const postChanges = supabase.channel(`public:post`).on(
      'postgres_changes',
      {
        ...configs,
      },
      (payload) => {
        setData(payload);
      }
    );

    postChanges.subscribe();

    return () => {
      postChanges.unsubscribe();
    };
  }, []);

  return { data };
};
