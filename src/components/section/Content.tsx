import TeX from '@matejmazur/react-katex';
import Image from 'next/image'

import 'katex/dist/katex.min.css';

import { IContent } from "@/notion/notion";

interface props {
  content: IContent;
  block?: boolean
}
export default function Content({content, block = true}: props) {
  if (content.type === "heading_1") {
    return (
      <h3 className="pt-5 pb-5 font-serif text-2xl">{content.content}</h3>
    )
  }
  else if (content.type === "heading_2") {
    return (
      <h4 className="pt-2 pb-2 font-serif text-xl">{content.content}</h4>
    )
  }
  else if (content.type === "bulleted_list_item")
    return (
      <li> {content.contents?.map((item, index) => {
          return <Content key={index} content={item} block={false}/>})}
          </li>
    )
  else if (content.type === "quote") {
    return (
      <p className='text-[0.91rem] md:text-base border-l-2 border-neutral-focus p-5 opacity-80 font-serif'>&quot;{content.content}&quot;</p>
    )
  }
  else if (content.type === "image") {
    return (
      <div className='flex w-full my-10'>
        <div className='m-auto'>
          <img className="max-h-[700px]" height="100%" alt={content.caption} src={content.content} />
          <label className='text-sm opacity-70'>{content.caption}</label>
        </div>
      </div>
    )
  }
  else if (content.type == "equation") {
    if (block) {
     return <TeX block>{content.content}</TeX>
    }
    else {
      return <TeX>{content.content}</TeX>
    }
  }
  else if (content.type === "composite") {
    return (
      <p>
        {content.contents?.map((item, index) => {
          return <Content key={index} content={item} block={false}/>})}
      </p>
    )
  }
  else if (content.type === "break") {
    return (
      <br/>
    )
  }
  else {
    if (block) {
      return <p className="text-[0.91rem] md:text-base first:first-letter:font-serif 
  first:first-letter:text-7xl first:first-letter:font-bold
  first:first-letter:mr-3 first:first-letter:float-left pb-5 first:first-letter:mt-[-1.5rem]">{content.content}</p>
    }
    else {
      return (
        <span className="text-[0.91rem] md:text-base">{content.content}</span>
        )
    }
    }
}