import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const Graph = ({ data = {}, title = "Default Title", metric, device }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!metric || !device) return;

    const chartDom = chartRef.current;
    let chart = echarts.getInstanceByDom(chartDom);

    if (chart) chart.dispose();
    chart = echarts.init(chartDom);

    const { timeseries = [], values = [] } = data;

    if (timeseries.length > 0 && values.length > 0) {
      chart.setOption({
        title: { text: title },
        tooltip: { trigger: "axis" },
        xAxis: {
          type: "category",
          data: timeseries,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: values,
            type: "line",
          },
        ],
      });
    } else {
      chart.setOption({
        title: { text: "No Data Available" },
        xAxis: { type: "category", data: [] },
        yAxis: { type: "value" },
        series: [],
      });
    }

    return () => {
      chart.dispose();
    };
  }, [data, title, metric, device]);

  const getChartStyle = () => {
    if (device === "mobile") {
      return { width: "100%", height: "300px" }; 
    } else if (device === "desktop") {
      return { width: "100%", height: "500px" }; 
    } else {
      return { width: "100%", height: "400px" }; 
    }
  };

  if (!metric || !device) {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#999",
          fontSize: "16px",
        }}
      >
        Select metric and device first
      </div>
    );
  }

  return <div ref={chartRef} style={getChartStyle()} />;
};

export default Graph;
