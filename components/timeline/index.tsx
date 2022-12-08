import Link from 'next/link';
import React from 'react';
import TimelineList from './TimelineList';

const TimeLine: React.FC<{ posts: any[] }> = ({ posts }) => {
  return (
    <div className='flex flex-col w-full h-screen space-y-4 mt-10'>
      <h1 className='font-semibold text-lg text-slate-500'>Timeline</h1>
      {/* timeline list item */}
      {posts.map((post) => (
        <TimelineList key={post.id} message={post.message} />
      ))}

      <Link href='/'>
        <span>Back</span>
      </Link>
    </div>
  );
};

export default TimeLine;
