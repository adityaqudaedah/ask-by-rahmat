import {
  useSession,
  useSupabaseClient,
  useUser,
} from '@supabase/auth-helpers-react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import MessageContent from '../components/mesasge-content';
import Message from '../components/message';
import MessageAction from '../components/message-action';
import MeassageHeader from '../components/message-header';
import TimeLine from '../components/timeline';

const QuestionPage: NextPage = () => {
  const supabase = useSupabaseClient();
  const session = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>();
  const user = useUser();
  const router = useRouter();
  const {
    query: { id },
  } = router;

  //get username
  const getName = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id);

      if (!data) {
        router.push('/404');
      }
      if (error) {
        console.log(error);
      }

      if (data) {
        setName(data[0]?.full_name);
      }
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  // get contents
  const getContents = async () => {
    try {
      const { data, error } = await supabase.from('posts').select('*');

      console.log('ggmu', data);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  // post content
  const postContent = async (message: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .insert([{ post_owner_id: id, message }]);

      if (error) {
        console.log(error);
      }
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      message: { value: string };
    };
    postContent(target.message.value);
  };

  useEffect(() => {
    if (id) {
      getName();
    }
  }, [id]);

  if (loading || !name) return <div>loading...</div>;

  return (
    <Layout>
      {!session && (
        <Message handleSubmit={handleOnSubmit}>
          <MeassageHeader name={name ?? 'unknown'} />
          <MessageContent />
          <MessageAction loading={loading} />
        </Message>
      )}
      <TimeLine />
    </Layout>
  );
};

export default QuestionPage;
