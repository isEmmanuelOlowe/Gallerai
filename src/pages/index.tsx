// import UnstyledLink from '@/components/links/UnstyledLink';
// import ButtonLink from '@/components/links/ButtonLink';
import { TagCloud } from 'react-tagcloud'

import UnderlineLink from '@/components/Navigation/links/UnderlineLink';
import Navbar from '@/components/Navigation/Navbar';
import Seo from '@/components/Seo';

import { getTags,ITag } from '@/notion/notion';

interface props {
  tags: ITag[]
}
export default function HomePage({tags}: props) {

  const bag = tags.map((tag, index) => {
    return {
      value: tag.name,
      count: (index > 5)? index: 10,
    }
  })
  return (
    <>
      <div className="z-10 h-screen bg-fixed bg-bottom bg-cover z-1" style={{"backgroundImage": "url(images/background.pngs"}}>
        {/* <div className='h-full bg-gradient-to-b from-base-100 via-base-100 to-transparent'> */}
        <div className='h-full'>
          <Navbar/>
          <Seo/>
          <main className='content-center justify-center w-full mt-24 text-center'>
            <h1 className='text-5xl'>Mathematics in the Scottish Enlightenment</h1>
            <p>
              Explore the world of Mathematics in the Period of Scotland between 1690-1820
            </p>
            <div className="mt-16 font-serif divider"><h2>How to Use</h2></div>
            <p>
              {"Explore the world of Mathematics in the Scottish Enlightenment through metadata. Swipe through and select some tags and find some overlap. Don't forget to Swipe!"}
            </p>
            <div className="mt-16 font-serif divider"><h2>Tags</h2></div>
            <span className='flex-wrap gap-20 font-serif font-5xl hflex'>
              <TagCloud minSize={20} maxSize={40} disableRandomColor={true} renderer={customRenderer} shuffle={false} tags={bag}/>
            </span>
          </main>
        </div>
      </div>
    </>
  );
}

const customRenderer = (tag: any, size: number, color: string) => {
  return (
    <UnderlineLink key={tag.value} style={{ color, fontSize: `${size}px` }}  className='p-2 text-accent-content m-[3px] hover:scale-105 hover:text ease-in-out duration-200 font hover:text-primary-focus' href={`/explore?tags=${encodeURI(tag.value)}`} >{tag.value}</UnderlineLink>
  )
}
/**
 * Default info that you should change:
 * components/Seo.tsx
 * next-sitemap.js
 * public/favicon
 *
 * Please refer to the README.md
 */

export async function getStaticProps() {
  const tags: ITag[] = await getTags();

  return {
    props : {
      tags,
    },
    revalidate: 1,
  }
}