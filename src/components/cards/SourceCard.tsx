import { ISource } from "@/notion/notion";
interface props {
  source: ISource
}

export default function SourceCard({source}: props) {

  return (
      <>
      <div className="flex content-around justify-center p-2 text-yellow-600 h-60">
        <h6 className="p-5">{source.type}</h6>
        <h6 className="p-5">{source.publisher}</h6>
        <h6 className="p-5">{source.year}</h6>
      </div>
      <h3 className="h-10 p-10 pb-20 text-2xl bg-black">
        {source.name}
      </h3>
      </>
  )
}