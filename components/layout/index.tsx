import React, { ReactNode } from 'react';
import Footer from '@/components/footer';
import NavBar from '@/components/navbar';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex flex-col max-w-screen-md min-h-screen mx-auto'>
      <NavBar />
      <main className='flex flex-col max-w-full min-h-screen'>{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
