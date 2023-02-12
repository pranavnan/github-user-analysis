import React from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

export default function MostPopularColumn({ data }) {
  const chartConfigs = {
    type: "column2d",
    width: "100%",
    height: "400",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Most Polular Repo",
        yAxisName: "Stars",
        xAxisName: "Repos",
        xAxisNameFontSize: "16px",
        yAxisNameFontSize: "16px",
        theme: "fusion",
        decimals: 0,
        pieRadius: "45%",
        paletteColors:
          " #5c8ab8 ,#a3224f, #1daeb9, #ffc64c,#FF6600, #6261b1, #0494ff",
      },
      data,
    },
  };
  return <ReactFC {...chartConfigs} />;
}
