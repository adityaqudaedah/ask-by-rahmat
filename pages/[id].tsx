import Layout from '@/components/layout';
import MessageContent from '@/components/mesasge-content';
import Message from '@/components/message';
import MessageAction from '@/components/message-action';
import MeassageHeader from '@/components/message-header';
import TimeLine from '@/components/timeline';
import { useSubscription } from '@/hooks/useSubscription';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Database } from 'types';

const QuestionPage: NextPage = () => {
  const { data } = useSubscription({
    event: 'INSERT',
    table: 'posts',
    schema: 'public',
  });
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string | null>(null);
  const router = useRouter();
  const {
    query: { id },
  } = router;

  //get full name
  const getFullNameByUserId = async (userId: string | Array<string>) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId);

      if (!data) {
        router.push('/404');
      }
      if (error) {
        console.log(error);
      }

      if (data) {
        setName(data[0].full_name);
      }
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  // get contents
  const getPost = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('post_owner_id', id)
        .order('created_at', { ascending: false });

      if (data) {
        setPosts(data);
      }
      if (error) {
        console.log(error);
      }
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  // post content
  const postContent = async (message: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .insert({ post_owner_id: id as string, message });

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
      getFullNameByUserId(id);
      if (data) {
        getPost();
      }
    }
  }, [id, data]);

  if (loading && !name && !id)
    return (
      <Layout>
        <h1 className='font-semibold text-md text-gray-500 m-auto'>
          Loading...
        </h1>
      </Layout>
    );

  return (
    <Layout>
      <section className='px-2'>
        {user?.id !== id && (
          <Message handleSubmit={handleOnSubmit}>
            <MeassageHeader name={name ?? 'unknown'} />
            <MessageContent />
            <MessageAction loading={loading} />
          </Message>
        )}
        <TimeLine posts={posts} />
      </section>
    </Layout>
  );
};

export default QuestionPage;
