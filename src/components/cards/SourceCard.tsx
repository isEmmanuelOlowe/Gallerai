import { ISource } from "@/notion/notion";
import Link from 'next/link';
interface props {
  url: string,
  source: ISource
}

export default function SourceCard({url, source}: props) {

  return (
      <>
      <Link key={url} href={`/sources/${url}`}><a className='w-full m-5 text-white card bordered bg-base-content md:w-5/12'>
        <div className="flex content-around justify-center p-2 text-yellow-600">
            <h6 className="p-5">{source.type}</h6>
            <h6 className="p-5">{source.publisher}</h6>
            <h6 className="p-5">{source.year}</h6>
        </div>
        {/* <div className="h-48" style={{"backgroundImage": `url(${source.cover})`}}/> */}
        <div className="card-body">
          <h2 className="card-title">{source.name}</h2> 
        </div>
        </a>
      </Link>
      </>
  )
}