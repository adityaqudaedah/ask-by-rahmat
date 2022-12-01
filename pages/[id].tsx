import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import MessageContent from '../components/mesasge-content';
import Message from '../components/message';
import MessageAction from '../components/message-action';
import MeassageHeader from '../components/message-header';

const QuestionPage: NextPage = () => {
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>();
  const user = useUser();
  const router = useRouter();
  const {
    query: { id },
  } = router;

  if (user) {
    router.push('/');
  }

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

  const handleOnSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      message: { value: string };
    };
  };

  useEffect(() => {
    if (id) {
      getName();
    }
  }, [id]);

  if (loading) return <div>loading...</div>;

  return (
    <Layout>
      <Message handleSubmit={handleOnSubmit}>
        <MeassageHeader name={name ?? 'anon'} />
        <MessageContent />
        <MessageAction />
      </Message>
    </Layout>
  );
};

export default QuestionPage;
