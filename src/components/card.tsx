import Link from 'next/link';

import { IPage } from "@/notion/notion";
interface props {
  page: IPage;
}
export default function Card ({page}: props) {
  return (
    <Link href={`/article/${encodeURIComponent(page.title)}`} passHref>
      <a className='m-5 shadow-2xl w-96 card'>
          <div style={{"backgroundImage":`url(${page.cover})`}} className='h-48 bg-center bg-cover bg-base-300'>

          </div>
          <div className="text-white bg-black bg-opacity-75 card-body">
            <h2 className="card-title">{page.title}</h2> 
          </div>
      </a>
    </Link>
  )
}