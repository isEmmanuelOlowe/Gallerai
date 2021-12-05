import Link from 'next/link';

import { IPage } from "@/notion/notion";
interface props {
  page: IPage;
}
export default function Card ({page}: props) {
  return (
    <Link href={`/article/${encodeURIComponent(page.title)}`} passHref>
      <a>
        <div style={{"backgroundImage": `url(${page.cover})`, "minHeight":"15rem"}}className="m-10 text-white bg-blue-400 bg-center bg-cover place-items-center backdrop-filter backdrop-grayscale backdrop-blur-md backdrop-contrast-200 w-96 rounded-xl">
          <h1>
          </h1>
          {/* <p>{page.content}</p> */}
          <div className="absolute bottom-0 p-5 text-center bg-black rounded-b-xl w-96 bg-opacity-80">
            <h2 className="text-xl">{page.title}</h2>
          </div>
        </div>
      </a>
    </Link>
  )
}