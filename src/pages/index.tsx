import * as React from 'react';

import Layout from '@/components/Layout'
// import ButtonLink from '@/components/links/ButtonLink';
// import CustomLink from '@/components/links/CustomLink';
// import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';


export default function HomePage() {
  return (
    <>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />
      <Layout>
        <h1 className="top-1/2 font-8xl">
          Welcome to a Virtual Museum of Mathematics in the Scottish Enlightenment
        </h1>
      </Layout>
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
