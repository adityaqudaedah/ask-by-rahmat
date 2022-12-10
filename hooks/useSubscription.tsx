import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { RealtimePostgresChangesFilter } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
// {
//     "schema": "public",
//     "table": "posts",
//     "commit_timestamp": "2022-12-09T16:24:04Z",
//     "eventType": "INSERT",
//     "new": {
//         "created_at": "2022-12-09T16:24:04.110326+00:00",
//         "id": 25,
//         "message": "sfadfdf",
//         "post_owner_id": "64bcab74-e9e7-472c-95bc-3b06d7a1fade"
//     },
//     "old": {},
//     "errors": null
// }


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
        ...configs
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

  return data;
};
