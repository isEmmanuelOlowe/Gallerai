import TeX from '@matejmazur/react-katex';
import { useState } from "react";
import {DomainPropType, VictoryChart, VictoryLine,VictoryTheme } from "victory";

import 'katex/dist/katex.min.css';
interface Forumlas {
  [Key: string]: Formula,
}

interface Formula {
  name: string,
  domain: {x: number[], y: number[]}
  formula: (x:number) => number
  series: (x: number, terms: number) => number
  expression: (terms: number) => string
}

const formulas: Forumlas = {
  "sin": {
    name: "sin",
    domain: {y: [-1.5, 1.5], x: [0, 4* Math.PI]},
    formula: Math.sin,
    series: function(x: number, terms: number) {
      let total = 0
      for (let i = 0; i < terms; i++) {
        total += (-1) ** (i) * x ** (2 * i + 1) / factorial(i * 2 + 1)
      }
      return total
    },
    expression: function(terms: number) {
      let expression = "\\sin(x) \\approx x"
      for (let i = 0; i < terms - 1; i++) {
        expression += `  ${i % 2? "+": "-"} \\frac{x ^ {${(2 * (i + 1) + 1)}}}{${(i + 1) * 2 + 1}!}`
      }
      return expression
    }
  },
  "cos": {
    name: "cos",
    domain: {y: [-1.5, 1.5], x: [0, 4* Math.PI]},
    formula: Math.cos,
    series: function(x: number, terms: number) {
      let total = 0
      for (let i = 0; i < terms; i++) {
        total += (-1) ** (i) * x ** (2 * i) / factorial(2 * i)
      }
      return total
    },
    expression: function(terms: number) {
      let expression = "\\cos(x) \\approx 1"
      for (let i = 0; i < terms - 1; i++) {
        expression += ` ${i % 2? "+": "-"} \\frac{x^{${2 * (i + 1)}}}{${2 * (i + 1)}!}`
      }
      return expression
    }
  },
  "exponential": {
    name: "exponential",
    domain: {y: [-0.5, 50], x: [0, 10]},
    formula: Math.exp,
    series: function(x: number, terms: number) {
      let total = 0
      for (let i = 0; i < terms; i++) {
        total += x ** (i)  / factorial(i)
      }
      return total
    },
    expression: function(terms: number) {
      let expression = "e^x \\approx 1"
      for (let i = 0; i < terms - 1; i++) {
        expression += ` + \\frac{x^{${2 * (i + 1)}}}{${2 * (i + 1)}!}`
      }
      return expression
    }
  }
}

const terms = [1,2,3,4,5,6,7,8,9,10]

export default function MaclaurenSeries() {
  const [formula, setFormula] = useState(formulas["sin"])
  const [number, setNumber] = useState(terms[0])
  const data = generatePoints(formula.formula)
  const data2 = generateSeriesPoints(formula.series, number)

  return (
    <>
      <h2 className="mb-32 font-serif divider">Maclaurin Series Generator</h2>
      <div className="flex flex-wrap content-center justify-center w-full gap-2">
        <div className="flex flex-wrap content-center m-auto">
          <div className='flex flex-wrap content-center m-auto'>
          <p className="w-full mb-5 text-center">Choose an Function to Approximate:</p>
          <select className="w-48 m-auto text-center child:p-10 select select-primary" name="formula" value={formula.name} onChange={(e) => {setFormula(formulas[e.target.value])}}>
            {
              Object.entries((formulas)).map(([key, func]) => {
                return (<option key={key} value={key}>{func.name}</option>)
              })
            }
          </select>
          </div>
          <div className='flex flex-wrap content-center m-auto'>
            <p className="w-full mb-5 text-center">Choose the number of Series Terms:</p>
            <select className="w-48 m-auto text-center select select-primary" name="formula" value={number} onChange={(e) => {setNumber(parseInt(e.target.value))}}>
              {
                terms.map(num => {
                  return (<option key={num} value={num}>{num}</option>)
                })
              }
            </select>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <VictoryChart
            theme={VictoryTheme.material}
            domain={{y:[formula.domain.y[0], formula.domain.y[1]], x:[formula.domain.x[0], formula.domain.x[1]]}}
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
        <div className='w-full text-center'>
        <h3>Formula</h3>
        <div className="w-full overflow-x-auto text-xl duration-200 ease-in-out max-w-screen">
          <TeX block>{formula.expression(number)}</TeX>
        </div>
        </div>
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

function generateSeriesPoints(forumla: (x: number, terms: number) => number, terms: number, maxSize=10, step=0.1): Point[] {
  const points: Point[] = [];
  for (let i = 0; i < maxSize; i += step) {
    points.push({
      x: i,
      y: forumla(i, terms)
    })
  }
  return points
}

function factorial(n: number): number {
  if (n < 2) return 1;
  return n * factorial(n - 1);
}
