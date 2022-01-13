import UnderlineLink from "@/components/Navigation/links/UnderlineLink"

import { ISource } from "@/notion/notion"

interface props {
  sources: ISource[]
}
export default function SourceSection({sources}: props) {
  if (!sources) {
    return <></>
  }
  return (
    <div>
      <h2 className="font-serif divider">Sources</h2>
      <ul className="list-[square] text-lg text-neutral lg:w-1/2 m-auto">
        {sources.map(source => {
          return (
          <li  key={source.id}><UnderlineLink href={`/sources/${encodeURIComponent(source.name)}`}>{source.name}<span className="pl-5 font-serif text-sm opacity-80">[{source.type}, {source.year}]</span></UnderlineLink></li>)
        })}
      </ul>
    </div>
  )
}