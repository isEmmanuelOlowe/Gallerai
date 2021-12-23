
export default function Timeline() {
  const date = dateRange(1700, 1820, 10);
  const space = createSpace(5, date.length);
  
  return (
    <div>
      <div className="w-[200vw]">
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
          <div className="flex align-bottom" style={{"marginLeft": "10.7rem"}}>
            {
              space.map((space) => (
                <div key={space} style={{"borderLeft": `${(space % 5 == 0)? "4px": "2px"} solid black`, "height": `${(space % 5 == 0)? "1.5rem": "1rem"}`, "width": "1.45rem"}}></div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
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
  const total = spacing * (dates - 1) 
  const spaces: number[] = [];
  for (let i = 0; i <= total; i++) {
    spaces.push(i);
  }
  return spaces
} 