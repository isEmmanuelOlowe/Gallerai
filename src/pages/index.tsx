import Link from 'next/link';
import * as React from 'react';

// import UnstyledLink from '@/components/links/UnstyledLink';
// import ButtonLink from '@/components/links/ButtonLink';
import UnstyledLink from '@/components/Navigation/links/UnstyledLink';
import Navbar from '@/components/Navigation/Navbar';
import Seo from '@/components/Seo';

export default function HomePage() {
  return (
    <>
      <div className="z-10 h-screen bg-fixed bg-bottom bg-cover z-1" style={{"backgroundImage": "url(images/background.png)"}}>
        <div className='h-full bg-gradient-to-b from-base-100 via-base-100 to-transparent'>
          <Navbar/>
          <Seo/>
          <div className='absolute inset-0 z-0 flex flex-wrap items-center min-h-screen'>
            <div className="pt-32 text-gray-800 lg:p-0 lg:w-1/2 ">
              <h1 className="p-5 font-serif sm:text-4xl md:text-5xl lg:text-7xl">Mathematics in the Scottish Enlightenment</h1>
            </div>
            {/* <div className="w-full lg:w-1/2">
              <div className="flex items-center w-3/4 m-auto bg-local bg-top bg-cover drop-shadow-lg rounded-3xl" style={{"minHeight":"50vh","backgroundImage": "url(images/profile.jpg)"}}>
                <div className='p-20'>
                  <p>Welcome</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        </div>
    </>
  );
}


/**
 * Default info that you should change:
 * components/Seo.tsx
 * next-sitemap.js
 * public/favicon
 *
 * Please refer to the README.md
 */
