import Link from "next/link";
import { VictoryChart, VictoryLine,VictoryTheme } from "victory";

import Navbar from "@/components/Navigation/Navbar";
import Seo from "@/components/Seo";

const exhibits = [
  {
    id: 1,
    name: "MacClauren Series",
    description: "cover sdfm akdsfjmn aksd",
    cover: "https://media.snl.no/media/70310/standard_compressed_Colin_Maclaurin_color.jpg",
    href: "macclauren series"
  },
]
export default function Exhibits() {

  return(
    <>
      <Seo/>
      <Navbar/>
      <h1 className="mt-5 text-center divider">Exhibits</h1>
      <p className="m-1 text-center">
        View interactive exihibits on the History of Mathematics in the Scottish Enlightenment
      </p>
      <div className="flex flex-wrap justify-center">
        {
          exhibits.map(exhibit => {
            return (
            <Link key={exhibit.id} href={`exhibit/${exhibit.href}`}>
              <a data-tip={exhibit.description} key={exhibit.id} className="m-5 shadow-2xl tooltip tooltip-bottom tooltip-open w-96 card">
              <div style={{"backgroundImage":`url(${exhibit.cover})`}} className="bg-top bg-cover h-96 bg-base-300 duration-200 ease-in-out hover:scale-[1.15]">
                <div className="absolute bottom-0 w-full text-white card-body">
                  <h2 className="p-2 ease-in-out bg-opacity-50 shadow-xl card-title bg-neutral duration-400 hover:bg-opacity-90">{exhibit.name}</h2>
                </div>
              </div>
              </a>
            </Link>
            )
          })
        }
      </div>
    </>
  )
}