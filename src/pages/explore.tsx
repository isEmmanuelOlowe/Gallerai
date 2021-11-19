import { getPage } from "@notionhq/client/build/src/api-endpoints";
import { useRouter } from "next/router";

import { DataContext } from "@/data/AppData";

import Card from "@/components/card";
import Navbar from "@/components/Navbar";

import { getPages, IPage, IPages } from "@/notion/notion";

interface props {
  pages: IPages
}

export default function explore ({pages}: props) {
    const router = useRouter();
    return(
      <>
      <Navbar/>
      <div className="flex flex-wrap justify-center">
        {router.isFallback? (<h1>Loading</h1>):(Object.entries(pages).map(([key, page]) => {
          return (<Card key={key} page={page}/>)
        }))}
      </div>

      </>
    )
}

export async function getStaticProps() {
  const pages: IPages = await getPages();

  return {
    props: {
      pages,
    },
  }
}