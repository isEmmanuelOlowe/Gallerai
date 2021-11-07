import * as React from 'react';

import Navbar from '@/components/Navbar';
export default function Layout(props: any) {

  return (
    <>
    <main className="min-h-screen bg-gray-300">
    <Navbar />
        {props.children}
    </main>
    </>
  );
}