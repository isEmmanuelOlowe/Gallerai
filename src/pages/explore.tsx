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
  const panels = useRef<Flicking>(null);
  const plugins = [new AutoPlay({ duration: 8000, direction: "NEXT", stopOnHover: true })];
  const [currentPanel, setCurrentPanel] = useState(0);
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
  Object.entries(pages).map(([key, page]) => {
    if (selected === [] || selected.every(tag => page.tags.includes(tag))) {
      articles.push(page)
      }
    })

    return(
    <div className="min-h-screen">
      <div className="">
        <Navbar/>
        <Seo/>
        <Flicking moveType="freeScroll" bound={true} preventClickOnDrag={false}>
          {tagNames.map(tag => {
            return <div className="flicking-panel" key={tag.id} onClick={()=> select(tag.name)}>
                  <Tag key={tag.id} tag={tag} selected={selected.includes(tag.name)}/>
            </div>
            })
          }
        </Flicking>
        <div className="flex items-center flex-wrap h-[70vh] ease-in-out duration-1000">
            <div className="hidden pt-4 pb-2 m-auto font-serif text-4xl text-center duration-200 ease-in-out md:block">{panels.current? panels.current.currentPanel? articles[panels.current.index]? articles[panels.current.index].title: "": articles[0].title: articles[0].title}</div>
          <div className="w-screen duration-1000 ease-in-out">
            <Flicking plugins={plugins} align={"center"} deceleration={0.02} onChanged={(e: ChangedEvent) => {setCurrentPanel(e.index)}} ref={panels}>
              {articles.length === 0? <h3 className="w-screen mt-10 text-center text-base-300">No Overlap of Topics</h3> : 
              articles.map(article => (<div className="odd:h-[60vh] even:h-[55vh] my-auto w-96 hover:lg:w-[26rem] ease-in-out duration-1000 hover:odd:lg:h-[61vh] hover:even:lg:h-[56vh]" key={article.id}><Card page={article}></Card></div>))}
            </Flicking>
          </div>
          </div>
        </div>
      </div>
    )
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