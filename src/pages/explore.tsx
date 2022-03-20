import {AutoPlay} from "@egjs/flicking-plugins";
import Flicking, {ChangedEvent} from "@egjs/react-flicking";
import { useRouter } from 'next/router'
import { useEffect, useRef,useState } from "react";

import "@egjs/flicking/dist/flicking.css";

import Card from "@/components/card";
import Navbar from "@/components/Navigation/Navbar";
import Seo from "@/components/Seo";
import Tag from '@/components/Tag';

import { getPages, getTags, IPage, IPages, ITag} from "@/notion/notion";
interface props {
  pages: IPages,
  tagNames: ITag[]
}

export default function Explore ({pages, tagNames}: props) {
  const router = useRouter();
  const panels = useRef<Flicking>();
  const plugins = [new AutoPlay({ duration: 8000, direction: "NEXT", stopOnHover: true })];
  const [currentPanel, setCurrentPanel] = useState(0);
  const [ready, setReady] = useState(false);
  const {tags} = router.query;
  const [selected, setSelected] = useState<string[]>([]);
  
  const select = (tagname: string) => {
    if (selected.includes(tagname)) {
      const newSelected = selected.filter(function (tag) {
        return tag !== tagname;
      })
      setSelected(newSelected);
      router.push(`/explore?tags=${newSelected}`, undefined, {shallow: true});
    }
    else {
      setSelected([...selected, tagname]);
      router.push(`/explore?tags=${[...selected, tagname]}`, undefined, {shallow: true});
    }
  }

  useEffect(() => {
    if (typeof tags === "string" && tags !== '') {
      setSelected(tags.split(","))
    }
  }, [tags])
  

  const articles: IPage[] = []
  Object.entries(pages).map(([key]) => {
    const page = pages[key];
    if (selected === [] || selected.every(tag => page.tags.includes(tag))) {
      articles.push(page)
      }
    })
    
    return(
    <div className="min-h-screen">
      <div className="">
        <Navbar/>
        <Seo/>
        <Flicking id="flicking0" renderOnlyVisible={true} className="flicking flicking0" moveType="freeScroll" bound={true} preventClickOnDrag={false}>
          {ready && tagNames.map(tag => {
            return <div className="flicking-panel" key={tag.id} onClick={()=> select(tag.name)}>
                  <Tag key={tag.id} tag={tag} selected={selected.includes(tag.name)}/>
            </div>
            })
          }
        </Flicking>
        <div className="flex items-center flex-wrap h-[70vh] ease-in-out duration-1000">
            <div className="hidden pt-4 pb-2 m-auto font-serif text-4xl text-center duration-200 ease-in-out md:block w-full">{articles.length != 0 && panels.current? panels.current.currentPanel? articles[panels.current.index]? articles[panels.current.index].title: articles[0].title: articles[0].title: ""}</div>
            <p className="text-lg text-center m-auto text-neutral max-w-[24rem]">
              {articles.length != 0 && panels.current? panels.current.currentPanel? articles[panels.current.index]? nothing(articles[panels.current.index].from): nothing(articles[0].from): nothing(articles[0].from): ""}-{articles.length != 0 && panels.current? panels.current.currentPanel? articles[panels.current.index]? nothing(articles[panels.current.index].to): nothing(articles[0].to): nothing(articles[0].to): ""}
            </p>
          <div className="w-screen duration-1000 ease-in-out">
            {/* <Carousel/> */}
            <Flicking id="flicking1" className="flicking flicking1" onReady={() => setReady(!ready)} plugins={plugins} align={"center"} deceleration={0.02} onChanged={(e: ChangedEvent) => {setCurrentPanel(e.index)}} ref={panels as any}>
              {articles.length === 0? <h3 className="w-screen mt-10 text-center text-base-300">No Overlap of Topics</h3> : 
              ready && articles.map(article => (<div className="odd:h-[60vh] even:h-[55vh] my-auto w-96 hover:lg:w-[26rem] ease-in-out duration-1000 hover:odd:lg:h-[61vh] hover:even:lg:h-[56vh]" key={article.id}><Card page={article}></Card></div>))}
            </Flicking>
          </div>
          </div>
            <p className="mt-5 text-lg text-center m-auto text-neutral max-w-[24rem]">
              {articles.length != 0 && panels.current? panels.current.currentPanel? articles[panels.current.index]? articles[panels.current.index].summary: articles[0].summary: articles[0].summary: ""}
            </p>
        </div>
      </div>
    )
}

function nothing(num: number): string|number {
  if (num == 0) {
    return ""
  }
  else {
    return num
  }

}
export async function getStaticProps() {
  const pages: IPages = await getPages();
  const tagNames: ITag[] = await getTags();
  return {
    props: {
      pages,
      tagNames,
    },
    revalidate: 1,
  }
}