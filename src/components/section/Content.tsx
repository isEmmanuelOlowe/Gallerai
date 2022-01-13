import { IContent } from "@/notion/notion";

interface props {
  content: IContent;
}
export default function Content({content}: props) {
  if (content.type === "heading_1") {
    return (
      <h3 className="font-serif pb-5 pt-5">{content.content}</h3>
    )
  }
  else if (content.type === "heading_2") {
    return (
      <h4 className="font-serif pb-2 pt-2">{content.content}</h4>
    )
  }
  else if (content.type === "break") {
    return (
      <br/>
    )
  }
  else {
    return (
        <p>{content.content}</p>
      )
    }
}