import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";

export default function Timeline() {
  const date = dateRange(1700, 1820, 10);
  const space = createSpace(5, date.length);
  return(
    <>
      <div>
      <Seo/>
      <Navbar/>
      <div className="absolute bottom-0">
          <div className="absolute bottom-0">
            <div className="pl-20 pr-20 bg-red-500">
              <div className="flex">
                <div>
                  <h6 className="p-1 mr-10 text-center bg-yellow-600 rounded-b-2xl">Before the Enlgihtenment</h6>
                </div>
                {
                  date.map((year) => (
                  <div className="w-48" key={year}>
                    <h6>{year}</h6>
                  </div>))
                }
                <div className="p-1 text-center bg-purple-600 rounded-b-2xl">
                  <h6>After the Enlightenment</h6>
                </div>
              </div>
              <div className="flex" style={{"marginLeft": "14.7rem"}}>
                {
                  space.map((space) => (
                    <div key={space} style={{"borderLeft": "2px solid black", "height": "1rem", "width": "2.85rem"}}></div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function dateRange(from: number, to: number, spacing: number): number[] {
  const numbers = []
  for (let i = from; i <= to; i+= spacing) {
    numbers.push(i);
  }
  return numbers;
}

function createSpace(spacing: number, dates: number): number[] {
  const total = spacing * (dates - 3) - 2
  const spaces: number[] = [];
  for (let i = 0; i <= total; i++) {
    spaces.push(i);
  }
  return spaces
} 