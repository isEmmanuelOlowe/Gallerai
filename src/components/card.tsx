import { IPage } from "@/notion/notion";

interface props {
  page: IPage;
}
export default function Card ({page}: props) {
  return (
    <div className="p-5 m-10 text-white bg-yellow-700 w-96 rounded-xl">
      <h2>{page.title}</h2>
      <p>{page.content}</p>
    </div>
  )
}