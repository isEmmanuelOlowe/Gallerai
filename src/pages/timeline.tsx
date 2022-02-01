import Navbar from "@/components/Navigation/Navbar";
import Seo from "@/components/Seo";

import { getPages,  IPage,  IPages} from "@/notion/notion";

interface props {
  pages: IPages
}

export default function TimelinePage({pages}: props) {
  const date = dateRange(1690, 1820, 10);

  const elements = Object.values(pages);
  elements.sort((a: IPage, b: IPage) => (a.from < b.from) ? 1 : -1)
  return(
    <>
      <Seo templateTitle="Timeline of Mathematics in Scottish Enlightenment"/>
      <div>
      <Navbar/>
      <Seo templateTitle="Timeline of Mathematics in the Scottish Enlightenment"/>
            <div className="pt-10 grid max-h-[92.2vh] grid-flow-col gap-1 overflow-auto">
              <div className="w-48 h-full col-start-1 row-start-1 bg-yellow-500 rounded-md">
              <h6 className="text-center">Before the Enlgihtenment</h6>
            </div>
            {
              date.map((year) => (
              <div className="w-48 col-start-1" key={year}>
                <div className="divider">{year}</div>
              </div>))
            }
            <div className="w-48 h-24 col-start-1 text-center bg-purple-500 row-start-14">
              <h6>After the Enlightenment</h6>
            </div>
            {
              elements.map((page) => {
                return <div key={page.id} style={{"backgroundImage":`url(${page.cover})`}} className={`w-96 bg-neutral text-white text-center bg-cover rounded-md row-start-${pageRowStart(page.from)} row-end-${pageRowEnd(page.to)} ease-in-out duration-200 hover:scale-110`}>
                  <div className="flex flex-wrap h-full m-auto bg-black rounded-md content-centerw-full bg-opacity-30">
                    <div className="flex w-full h-5 text-center bg-black bg-opacity-10 rounded-t-md">
                      <p className="m-auto text-center">{page.from == 0? "": page.from}</p>
                      <p className="m-auto text-center">{page.to == 0? "": page.to}</p>
                    </div> 
                    <h2 className="m-auto shadow-sm">{page.title}</h2>
                    </div>
                  </div>
              })
            }
      </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const pages: IPages = await getPages();
  
  return {
    props: {
      pages
    }
  }
}


function dateRange(from: number, to: number, spacing: number): number[] {
  const numbers = []
  for (let i = from; i <= to; i+= spacing) {
    numbers.push(i);
  }
  return numbers;
}

function pageRowStart(year: number) {
  if (year){
    if (year < 1690) {
      return 1
    }
    else if (year > 1830) {
      return 0
    }
    else {
      return Math.floor((year - 1690) / 10) + 2
    }
  }
  return 1
}

function pageRowEnd(year: number) {
  if (year) {
    if(year > 1830) {
      return 15
    }
    else if (year < 1690) {
      return 1
    }
    else {
      return Math.floor((year - 1690) / 10) + 2
    }
  }
  return 1
}