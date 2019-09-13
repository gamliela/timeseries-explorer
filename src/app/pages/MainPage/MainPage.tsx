import * as React from "react";
import * as echarts from 'echarts';
import EChartOption = echarts.EChartOption;
import Chart from "../../echart/Chart";
import SocketBuffer from "../../socket/SocketBuffer";
import useSocketBuffer from "../../socket/useSocketBuffer";
import {ServerTickFrame, ServerHeaderFrame} from "../../types";
import {SocketBufferContext} from "../../context";
import {SocketBufferState} from "../../socket/types";

// const option: EChartOption = {
//   title: {
//     text: 'ECharts entry example'
//   },
//   tooltip: {},
//   legend: {
//     data: ['Sales']
//   },
//   xAxis: {
//     data: ["shirt", "cardign", "chiffon shirt", "pants", "heels", "socks"]
//   },
//   yAxis: {},
//   series: [{
//     name: 'Sales',
//     type: 'bar',
//     data: [5, 20, 36, 10, 10, 20]
//   }]
// }
//
// const option: EChartOption = {
//   legend: {},
//   animation: false,
//   dataset: {
//     sourceHeader: false, // first row consists of dimension names
//     // Provide data.
//     source: [
//       [new Date("2015-01-01 00:00:00").getTime(), 43.3, 85.8, 93.7],
//       [new Date("2015-01-02 00:00:00").getTime(), 83.1, 73.4, 55.1],
//       [new Date("2015-01-03 00:00:00").getTime(), 86.4, 65.2, 82.5],
//       [new Date("2015-01-04 00:00:00").getTime(), 72.4, 53.9, 39.1],
//     ],
//     dimensions: ['Time', 'A', 'B', 'C'],
//   },
//   // Declare X axis, which is a category axis, mapping
//   // to the first column by default.
//   xAxis: {type: 'time'},
//   // Declare Y axis, which is a value axis.
//   yAxis: {type: 'value'},
//   // Declare several series, each of them mapped to a
//   // column of the dataset by default.
//   series: [
//     {
//       name: 'A',
//       type: 'line',
//       encode: {
//         x: 0, // map X axis to column 0 in dataset (time)
//         y: 1, // map Y axis to column 1 in dataset ('A')
//       },
//     },
//     {
//       name: 'B',
//       type: 'line',
//       encode: {
//         x: 0, // map X axis to column 0 in dataset (time)
//         y: 2, // map Y axis to column 1 in dataset ('B')
//       }
//     },
//     {
//       name: 'C',
//       type: 'line',
//       encode: {
//         x: 0, // map X axis to column 0 in dataset (time)
//         y: 3, // map Y axis to column 1 in dataset ('C')
//       }
//     },
//   ]
// };

interface ChartState {
  isLoading: boolean;
  option: EChartOption;
}

// we must provide default values. because if we set them, and then try to remove them (as result of network restart), EChart crashes.
function buildChartOption(dimensions: string[] = [],
                          source: (string | number)[][] = [[]],
                          series: EChartOption.Series[] = []): EChartOption {
  return ({
      legend: {},
      tooltip: {},
      animation: false,
      dataset: {
        sourceHeader: false,
        dimensions,
        source,
      },
      xAxis: {type: 'time'},
      yAxis: {type: 'value', min: 'dataMin', max: 'dataMax'},
      series: series,
    }
  );
}

function calcChartState(socketBufferState: SocketBufferState<ServerHeaderFrame, ServerTickFrame>): ChartState {
  if (!socketBufferState.header) {
    return {isLoading: true, option: buildChartOption()};
  }

  const dimensions = ["Time", ...socketBufferState.header];
  const source = socketBufferState.buffer.map(data => [data.Time, ...data.Values]);
  const series = socketBufferState.header.map((name, index) => ({
    name,
    type: 'line',
    encode: {
      x: 0, // map X axis to column 0 in dataset (time)
      y: index + 1, // map Y axis to column index+1 in dataset
    },
  }));

  return {
    isLoading: false,
    option: buildChartOption(dimensions, source, series),
  }
}

function MainPage() {
  const socketBufferState = useSocketBuffer<ServerHeaderFrame, ServerTickFrame>("ws://localhost:8081/ws");
  const chartState = calcChartState(socketBufferState);

  return (
    <SocketBufferContext.Provider value={socketBufferState}>
      <SocketBuffer logSize={5}/>
      <hr/>
      <Chart option={chartState.option} isLoading={chartState.isLoading}/>
    </SocketBufferContext.Provider>
  );
}

export default MainPage;
