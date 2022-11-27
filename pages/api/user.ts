// Creating a new supabase server client object (e.g. in API route):
import type { NextApiRequest, NextApiResponse } from 'next';
import {createServerSupabaseClient} from "@supabase/auth-helpers-nextjs"

// import type { Database } from 'types_db'


// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServerClient = createServerSupabaseClient({
    req,
    res,
  });
  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();

  res.status(200).json({ name: user });
};
