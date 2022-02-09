import UnderlineLink from "@/components/Navigation/links/UnderlineLink"

import { cleanString } from "@/notion/notion"
import { ISource } from "@/notion/notion"

interface props {
  sources: ISource[]
}
export default function SourceSection({sources}: props) {
  if (!sources) {
    return <></>
  }
  return (
    <div className="mt-32 mb-20 lg:m-0">
      <h2 className="font-serif text-2xl divider">Sources</h2>
      <ul className="list-[square] text-lg text-neutral md:w-1/2 m-auto p-3">
        {sources.map(source => {
          return (
          <li  key={source.id}><UnderlineLink className="text-base" href={`/sources/${encodeURIComponent(cleanString(source.name))}`}>{source.name}<span className="pl-5 font-serif text-sm opacity-80">[{source.type}, {source.year}]</span></UnderlineLink></li>)
        })}
      </ul>
    </div>
  )
}