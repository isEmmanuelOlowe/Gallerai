import { ITag } from "@/notion/notion";

interface props {
  tag: ITag
  selected: boolean
}
export default function Tag({tag, selected}: props) {
  return (
    <button className={`duration-100 ease-in-out hover:scale-105 p-2 m-2 text-sm border-2 rounded-full border-yellow-700 ${selected? `bg-yellow-700 text-white`: `text-yellow-700`}`}>{tag.name}</button>
  )
}