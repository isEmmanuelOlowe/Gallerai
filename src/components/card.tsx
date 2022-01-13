import Link from 'next/link';

import { IPage } from "@/notion/notion";
interface props {
  page: IPage;
}
export default function Card ({page}: props) {
  return (
    <Link href={`/article/${encodeURIComponent(page.title)}`} passHref>
      <a className='m-5 shadow-2xl w-96 card'>
          <div style={{"backgroundImage":`url(${page.cover})`}} className='bg-top bg-cover h-96 bg-base-300 duration-200 ease-in-out hover:scale-[1.15]'>
          <div className="absolute bottom-0 w-full text-white card-body">
            <h2 className="p-2 ease-in-out bg-opacity-50 shadow-xl card-title bg-neutral duration-400 hover:bg-opacity-90">{page.title}</h2> 
          </div>
          </div>
      </a>
    </Link>
  )
}