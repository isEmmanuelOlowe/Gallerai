import { ITag } from "@/notion/notion";

interface props {
  tag: ITag
  selected: boolean
}
export default function Tag({tag, selected}: props) {
  return (
    <button className={`duration-100 ease-in-out hover:scale-105 p-2 m-2 text-sm border-2 rounded-full border-red-400 ${selected? `bg-red-400 text-white`: `text-red-400`}`}>{tag.name}</button>
  )
}