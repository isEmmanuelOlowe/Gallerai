import Link from 'next/link';

import Navbar from "@/components/Navigation/Navbar";
import Seo from "@/components/Seo";

import { cleanString, getPages,  IPage,  IPages} from "@/notion/notion";

interface props {
  pages: IPages
}

export default function TimelinePage({pages}: props) {

  const elements = Object.values(pages);
  elements.sort((a: IPage, b: IPage) => (a.from > b.from) ? 1 : -1)

  const time: IPage[][] = createTimeline(elements);
  time.sort((a:IPage[], b:IPage[]) => (a.length < b.length) ? 1:-1);
  return(
    <>
      <Seo templateTitle="Timeline of Mathematics in Scottish Enlightenment"/>
      <div className="h-screen">
      <Navbar/>
      <Seo templateTitle="Timeline of Mathematics in the Scottish Enlightenment"/>
      <div className="flex h-screen gap-1 overflow-x-auto overflow-y-hidden">
            {
              time.map((column, index) => {
                  return <div key={index} className="grid gap-1 m-0">
                {column.map((page) => {
                  return <Link key={page.id} href={`/article/${cleanString(page.title)}`} passHref>
                  <div style={{"backgroundImage":`url(${page.cover})`}} className={`w-96 bg-neutral text-white text-center bg-cover rounded-md row-span-1 ease-in-out duration-200 hover:scale-110`}>
                    <div className="flex flex-wrap h-full m-auto bg-black rounded-md content-centerw-full bg-opacity-30">
                      <div className="flex w-full h-5 text-center bg-black bg-opacity-10 rounded-t-md">
                        <p className="m-auto text-center">{page.from == 0? "": page.from}</p>
                        <p className="m-auto text-center">{page.to == 0? "": page.to}</p>
                      </div> 
                      <h2 className="m-auto shadow-sm">{page.title}</h2>
                      </div>
                    </div>
                  </Link>
                })}
                </div>
              })
            }
      </div>
      </div>
    </>
  )
}

function createTimeline(pages: IPage[]) {
  const timeline: IPage[][] = [];
  for (let i = 0; i < pages.length; i++) {
    let added = false;
    let index = 0;

    while (!added) {
      if (!timeline[index]){  
        timeline.push([pages[i]]);
        added = true;
      }
      else if (timeline[index][timeline[index].length - 1].to < pages[i].from) {
        timeline[index].push(pages[i]);
        added = true;
      }
      else {
        index += 1;
      }
    }
  }
  return timeline
}
export async function getStaticProps() {
  const pages: IPages = await getPages();
  
  return {
    props: {
      pages
    }
  }
}