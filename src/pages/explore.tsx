import { getPage } from "@notionhq/client/build/src/api-endpoints";
import { useRouter } from "next/router";

import { DataContext } from "@/data/AppData";

import Card from "@/components/card";
import Navbar from "@/components/Navbar";

import { getPages, IPages } from "@/notion/notion";

interface props {
  pages: IPages
}

export default function Explore ({pages}: props) {
    return(
      <>
      <Navbar/>
      <div className="flex flex-wrap justify-center">
        {Object.entries(pages).map(([key, page]) => {
          return (<Card key={key} page={page}/>)
        })}
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