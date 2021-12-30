import { getPage } from "@notionhq/client/build/src/api-endpoints";
import { useRouter } from "next/router";
import { useState } from "react";

import { DataContext } from "@/data/AppData";

import Seo from "@/components/Seo";
import Card from "@/components/card";
import Navbar from "@/components/Navigation/Navbar";
import Tag from '@/components/Tag'

import { getPages, getTags, IPages, IPage, ITag} from "@/notion/notion";
interface props {
  pages: IPages,
  tags: ITag[]
}

export default function Explore ({pages, tags}: props) {
  const [selected, setSelected] = useState<string[]>([]);
  
  const select = (tagname: string) => {
    if (selected.includes(tagname)) {
      setSelected(selected.filter(function (tag) {
        return tag !== tagname;
      }))
    }
    else {
      setSelected([...selected, tagname])
    }
  }
  
  let articles: IPage[] = []
  Object.entries(pages).map(([key, page]) => {
    if (selected.every(tag => page.tags.includes(tag))) {
      articles.push(page)
      }
    })

    return(
    <div className="min-h-screen">
      <div className="">
        <Navbar/>
        <Seo/>
        <div className="flex flex-wrap justify-center">
          {tags.map(tag => {
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
  const tags: ITag[] = await getTags();
  return {
    props: {
      pages,
      tags,
    },
    revalidate: 1,
  }
}