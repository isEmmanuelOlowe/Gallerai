import * as React from 'react';

// import UnstyledLink from '@/components/links/UnstyledLink';
// import ButtonLink from '@/components/links/ButtonLink';
import Navbar from '@/components/Navigation/Navbar';
import Seo from '@/components/Seo';

export default function HomePage() {
  return (
    <>
      <div className="z-10 h-screen bg-fixed bg-bottom bg-cover z-1" style={{"backgroundImage": "url(images/background.png)"}}>
        <div className='h-full bg-gradient-to-b from-base-100 via-base-100 to-transparent'>
          <Navbar/>
          <Seo/>
          <main className='content-center justify-center w-full mt-24 text-center'>
            <h1 className='text-5xl'>Mathematics in the Scottish Enlightenment</h1>
            <p>
              Explore the world of Mathematics in the Period of Scotland between 1720-1820
            </p>
            <div className="mt-16 font-serif divider"><h2>Guides</h2></div> 
            <p>View Guides of different stories why tell you more about Mathematics in the Enlightenment</p>

            <div className="mt-16 font-serif divider"><h2>Interactive Exhibits</h2></div> 
            <p>Check out some interactive exihits</p>

          </main>
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
