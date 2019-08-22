import * as React from "react";
import * as echarts from 'echarts';
import {useEffect, useRef} from "react";
import ECharts = echarts.ECharts;
import EChartOption = echarts.EChartOption;

interface ChartProps {
  option: EChartOption;
  isLoading?: boolean;
}

function Chart({option, isLoading}: ChartProps) {
  const container = useRef<HTMLDivElement>(null);
  const chart = useRef<ECharts>();

  // create the chart object
  useEffect(() => {
    if (!container.current) {
      return;
    }

    // based on prepared DOM, initialize echarts instance
    chart.current = echarts.init(container.current);

    return function cleanup(): void {
      if (chart.current) {
        echarts.dispose(chart.current);
      }
    }
  }, []);

  // update isLoading state
  useEffect(() => {
    if (!chart.current) {
      return;
    }

    if (isLoading) {
      chart.current.showLoading();
    } else {
      chart.current.hideLoading();
    }
  }, [isLoading]);

  // update the chart object when option changes
  useEffect(() => {
    if (!chart.current) {
      return;
    }

    chart.current.setOption(option);
  }, [option]);

  return <div ref={container} style={{height: 400}}/>;
}

export default Chart;