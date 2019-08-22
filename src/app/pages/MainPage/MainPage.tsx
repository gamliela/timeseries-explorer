import * as React from "react";
import * as echarts from 'echarts';
import EChartOption = echarts.EChartOption;
import style from "./style.scss";
import Chart from "../../echart/Chart";

const option: EChartOption = {
  title: {
    text: 'ECharts entry example'
  },
  tooltip: {},
  legend: {
    data: ['Sales']
  },
  xAxis: {
    data: ["shirt", "cardign", "chiffon shirt", "pants", "heels", "socks"]
  },
  yAxis: {},
  series: [{
    name: 'Sales',
    type: 'bar',
    data: [5, 20, 36, 10, 10, 20]
  }]
};

function MainPage() {
  return (
    <div>
      <h1 className={style.header}>
        <Chart option={option} isLoading={true}/>
      </h1>
    </div>
  );
}

export default MainPage;