import {
  useSession,
  useSupabaseClient,
  useUser,
} from '@supabase/auth-helpers-react';
import { useSubscription } from '@/hooks/useSubscription';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from "@/components/layout"
import MessageContent from '@/components/mesasge-content';
import Message from '@/components/message';
import MessageAction from '@/components/message-action';
import MeassageHeader from '@/components/message-header';
import TimeLine from '@/components/timeline';

const QuestionPage: NextPage = () => {
  const supabase = useSupabaseClient();
  const session = useSession();
  const [posts, setPosts] = useState<any[]>([]);
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
      getPost();
    }
  }, [id]);

  useEffect(() => {
    const postChanges = supabase
      .channel('public:posts')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'posts' },
        (payload) => {
          console.log('ping !!!', payload);
        }
      );

    postChanges.subscribe();

    return () => {
      postChanges.unsubscribe();
    };
  }, []);

  if (loading || !name)
    return (
      <Layout>
        <h1 className='font-semibold text-md text-gray-500 m-auto'>
          Loading...
        </h1>
      </Layout>
    );

  return (
    <Layout>
      {!session && (
        <Message handleSubmit={handleOnSubmit}>
          <MeassageHeader name={name ?? 'unknown'} />
          <MessageContent />
          <MessageAction loading={loading} />
        </Message>
      )}
      <TimeLine posts={posts} />
    </Layout>
  );
};

export default QuestionPage;
