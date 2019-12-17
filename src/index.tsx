import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { line, scaleLinear, min, max } from "d3";
import run from "./run";

const states = run()
const chartW = 500;
const chartH = 700;

const scaleDay = scaleLinear()
  .domain([0, 1000])
  .range([0, chartW]);
const scaleStates = scaleLinear()
  .domain([
    min(states, state => min([state.assets, state.money])),
    max(states, state => max([state.assets, state.money]))
  ])
  .range([chartH, 0]); //浏览器y坐标与日常习惯是反的

const statesLine = line()
  .x(d => scaleDay(d[0]))
  .y(d => scaleStates(d[1]));

function Chart({ pathData }) {
  return (
    <svg width={chartW} height={chartH}>
      <path d={pathData}></path>
      <style jsx>{`
        path {
          fill: none;
          stroke: black;
        }
        svg {
          border: 2px solid #b0efb0;
          margin: 10px;
        }
      `}</style>
    </svg>
  );
}

function App() {
  const [workingRatio, changeWorkingRatio] = useState(0.7)


  const [pathAssets, pathMoney] = ((states) => {
    const pathAssets = []
    const pathMoney = []
    states.forEach(state => {
      pathAssets.push([state.livingTime, state.money])
      pathMoney.push([state.livingTime, state.assets])
    });
    return [statesLine(pathAssets), statesLine(pathMoney)]
  })(run(workingRatio))

  return (
    <>
    <style jsx global>{`
      body {
        display: flex;
      }
      `}</style>
      <Chart pathData={pathAssets}></Chart>
      <Chart pathData={pathMoney}></Chart>
      <input type="range" min="0" max="1" step="0.01" onChange={(e) => {
        changeWorkingRatio(parseFloat(e.currentTarget.value))
      }}></input>
<label>工作时间占比:{workingRatio}</label>
    </>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
