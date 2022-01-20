import { IContent } from "@/notion/notion";

interface props {
  content: IContent;
}
export default function Content({content}: props) {
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
  else if (content.type === "break") {
    return (
      <br/>
    )
  }
  else {
    return (
        <p className="text-[0.91rem] md:text-base first:first-letter:font-serif first:first-line:uppercase first:first-line:tracking-widest
  first:first-letter:text-7xl first:first-letter:font-bold first:first-letter:text-slate-900
  first:first-letter:mr-3 first:first-letter:float-left pb-5">{content.content}</p>
      )
    }
}