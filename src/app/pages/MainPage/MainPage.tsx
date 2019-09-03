import * as React from "react";
import * as echarts from 'echarts';
import EChartOption = echarts.EChartOption;
import Chart from "../../echart/Chart";
import SocketBuffer from "../../socket/SocketBuffer";
import useSocketBuffer from "../../socket/useSocketBuffer";
import {ServerFrame} from "../../types";
import {SocketBufferContext} from "../../context";

const option: EChartOption = {
  // title: {
  //   text: 'ECharts entry example'
  // },
  // tooltip: {},
  // legend: {
  //   data: ['Sales']
  // },
  // xAxis: {
  //   data: ["shirt", "cardign", "chiffon shirt", "pants", "heels", "socks"]
  // },
  // yAxis: {},
  // series: [{
  //   name: 'Sales',
  //   type: 'bar',
  //   data: [5, 20, 36, 10, 10, 20]
  // }]
  legend: {},
  tooltip: {},
  dataset: {
    sourceHeader: true, // first row consists of dimension names
    // Provide data.
    source: [
      ['Time', 'A', 'B', 'C'],
      [new Date("2015-01-01 00:00:00").getTime(), 43.3, 85.8, 93.7],
      [new Date("2015-01-02 00:00:00").getTime(), 83.1, 73.4, 55.1],
      [new Date("2015-01-03 00:00:00").getTime(), 86.4, 65.2, 82.5],
      [new Date("2015-01-04 00:00:00").getTime(), 72.4, 53.9, 39.1]
    ]
  },
  // Declare X axis, which is a category axis, mapping
  // to the first column by default.
  xAxis: {type: 'time'},
  // Declare Y axis, which is a value axis.
  yAxis: {type: 'value'},
  // Declare several series, each of them mapped to a
  // column of the dataset by default.
  series: [
    {
      type: 'line',
      encode: {
        // Map dimension "amount" to the X axis.
        x: 0,     // map X axis to the time column
        y: ['A']  // map Y axis to data column 'A'
      }
    },
    {
      type: 'line',
      encode: {
        x: 0,     // map X axis to the time column
        y: ['B']  // map Y axis to data column 'B'
      }
    },
    {
      type: 'line',
      encode: {
        x: 0,     // map X axis to the time column
        y: ['C']  // map Y axis to data column 'C'
      }
    },
  ]
};

interface ChartState {
  isLoading: boolean;
  option?: EChartOption;
  error?: string;
}

// function useHeader(sbf: SocketBufferState): string[] {
//   const [header, setHeader] = useState<string[]>();
//   const bufferHasHeader = sbf.buffer.length > 0;
//
//   useEffect(() => {
//     if (bufferHasHeader) {
//       setHeader()
//     }
//   }, [bufferHasHeader])
// }

function MainPage() {
  const socketBufferState = useSocketBuffer<ServerFrame>("ws://localhost:8081/ws");

  return (
    <SocketBufferContext.Provider value={socketBufferState}>
      <SocketBuffer logSize={5}/>
      <hr/>
      <Chart option={option}/>
    </SocketBufferContext.Provider>
  );
}

export default MainPage;
