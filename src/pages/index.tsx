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
          <main>
            
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
