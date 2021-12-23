import Link from 'next/link';

import SourceCard from "@/components/cards/SourceCard";
import Navbar from "@/components/Navigation/Navbar";
import Seo from "@/components/Seo";

import { getSources, ISources } from "@/notion/notion";


interface props {
  sources: ISources,
}

export default function Sources({sources}: props) {

  return(
    <>
      <Seo/>
      <Navbar/>
      <div className="flex flex-wrap justify-center">
      {Object.entries(sources).map(([key, page]) => {
        return(<SourceCard key={key} url={key} source={page}/>)
      })}
      </div>
    </>
  )
}

export async function getStaticProps() {
  const sources = await getSources();

  return {
    props : {
      sources
    },
    revalidate: 1,
  }
}