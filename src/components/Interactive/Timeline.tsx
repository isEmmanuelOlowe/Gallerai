
export default function Timeline() {
  const date = dateRange(1720, 1820, 10);
  const space = createSpace(5, date.length);
  
  return (
    <div>
      <div className="grid gap-48 auto-cols-max">
            <div>
              <h6 className="h-48 p-1 mr-10 text-center bg-yellow-600">Before the Enlgihtenment</h6>
            </div>
            {
              date.map((year) => (
              <div className="w-48" key={year}>
                <div className="divider">{year}</div>
              </div>))
            }
            <div className="h-48 p-1 text-center bg-purple-600">
              <h6>After the Enlightenment</h6>
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