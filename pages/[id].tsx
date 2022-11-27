import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import React from 'react';
import MessageContent from '../components/mesasge-content';
import Message from '../components/message';
import MessageAction from '../components/message-action';
import MeassageHeader from '../components/message-header';

const QuestionPage = () => {
  const user = useUser();
  const router = useRouter();
  if (user) {
    router.push('/');
  }
  return (
    <Message>
      <MeassageHeader name='rahmat' />
      <MessageContent />
      <MessageAction />
    </Message>
  );
};

export default QuestionPage;
