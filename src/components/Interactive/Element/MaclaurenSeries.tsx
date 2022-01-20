import { useState } from "react";
import { VictoryChart, VictoryLine,VictoryTheme } from "victory";

interface Forumlas {
  [Key: string]: Formula,
}

interface Formula {
  name: string,
  formula: (x:number) => number
}

const formulas: Forumlas = {
  "sin": {
    name: "sin",
    formula: Math.sin
  },
  "cos": {
    name: "cos",
    formula: Math.cos
  }
}

const terms = [1,2,3,4,5,6,7,8,9,10]

export default function MaclaurenSeries() {
  const [formula, setFormula] = useState(formulas["sin"])
  const [number, setNumber] = useState(terms[0])
  const data = generatePoints(formula.formula)
  // const data2 = generatePoints(formula.formula)

  const data2 = generateSeries(formula.formula)


  return (
    <>
      <h2 className="mb-32 font-serif divider">Maclaurin Series Generator</h2>
      <div className="flex content-center justify-center w-full gap-4">
        <div className="block w-full pl-10">
          <h3 className="mb-10">Properties</h3>
          <p className="mb-5">Choose an Function to Approximate:</p>
          <select className="w-48 mb-5 child:p-10 select select-primary" name="formula" value={formula.name} onChange={(e) => {setFormula(formulas[e.target.value])}}>
            {
              Object.entries((formulas)).map(([key, func]) => {
                return (<option key={key} value={key}>{func.name}</option>)
              })
            }
          </select>
          <p className="mb-5">Choose the number of Series Terms:</p>
          <select className="w-48 select select-primary" name="formula" value={number} onChange={(e) => {setNumber(parseInt(e.target.value))}}>
            {
              terms.map(num => {
                return (<option key={num} value={num}>{num}</option>)
              })
            }
          </select>

        </div>
        <div className="divider divider-vertical"></div>
            <VictoryChart
        theme={VictoryTheme.material}
        domain={{y: [-1.1, 1.1], x: [0, 4* Math.PI]}}
      >
        <VictoryLine
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc"}
          }}
          data={data}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
          }}
        />
                        <VictoryLine
          style={{
            data: { stroke: "#ffffff" },
            parent: { border: "1px solid #ccc"}
          }}
          data={data2}
          animate={{
            duration: 1000,
            onLoad: { duration: 2000 }
          }}
        />
      </VictoryChart>
      </div>
    </>
  )
}

interface Point {
  x: number,
  y: number,
}

function generatePoints(forumla: (x: number) => number, maxSize=10, step=0.1): Point[] {
  const points: Point[] = [];
  for (let i = 0; i < maxSize; i += step) {
    points.push({
      x: i,
      y: forumla(i)
    })
  }
  
  return points
}

function derivative(f: (x: number) => number, x: number, dx=.0000001): number {
    return (f(x+dx) - f(x)) / dx;
}

function series(func: (x: number) => number, x: number, terms = 1) {
  let total = 0;
  let term = (x: number) => {
      return func(x)
  }

  for (let i= 0; i < terms; i++) {
    total += term(0) * x ** i * factorial(i)
    console.log(total);
    term = (x) => {
      return derivative(term, x)
    }
  }
  return total
}

function generateSeries(f: (x: number) => number, maxSize=10, step=0.1): Point[] {
  const points: Point[] = [];
  for (let i = 0; i < maxSize; i += step) {
    points.push({
      x: i,
      y: series(f, i)
    })
  }
  return points
}

function factorial(n: number): number {
  if (n < 2) return 1;
  return n * factorial(n - 1);
}
