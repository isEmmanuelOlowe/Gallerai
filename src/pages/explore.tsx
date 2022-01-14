import { createBrowserHistory } from "history";
import { useRouter } from 'next/router'
import qs from "qs";
import { useEffect, useState } from "react";

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
        <div className="flex flex-wrap justify-center">
          {tagNames.map(tag => {
            if (selected.includes(tag.name)) {            
              return (<div key={tag.id} onClick={()=> select(tag.name)}>
                  <Tag key={tag.id} tag={tag} selected={true}/>
                </div>)
              }
            else {
              return (<div key={tag.id} onClick={()=> select(tag.name)}>
                  <Tag key={tag.id} tag={tag} selected={false}/>
                </div>)
            }
            })
          }
        </div>
        <div className="flex flex-wrap justify-center">
          {articles.length === 0? <h3 className="mt-10 text-base-300">No Overlap of Topics</h3> : 
          articles.map(article => (<Card key={article.id} page={article}></Card>))}
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