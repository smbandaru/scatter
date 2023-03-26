import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

function ScatterPlot({ data, slope, intercept }) {
  const [trace, setTrace] = useState({
    x: [],
    y: [],
    type: "scatter",
    mode: "markers",
    name: "Data",
  });
  const [line, setLine] = useState({
    x: [],
    y: [],
    type: "scatter",
    mode: "lines",
    name: "Line of Best Fit",
  });

  useEffect(() => {
    if (data && data.length > 0) {
      // Extract x and y values from data
      const xValues = data.map((d) => d.x);
      const yValues = data.map((d) => d.y);

      // Create scatter plot trace
      const scatterTrace = { ...trace };
      scatterTrace.x = xValues;
      scatterTrace.y = yValues;
      setTrace(scatterTrace);

      // Create line of best fit trace
      const lineTrace = { ...line };
      const lineXValues = [Math.min(...xValues), Math.max(...xValues)];
      const lineYValues = lineXValues.map((x) => slope * x + intercept);
      lineTrace.x = lineXValues;
      lineTrace.y = lineYValues;
      setLine(lineTrace);
    }
  }, [data, slope, intercept]);

  return (
    <Plot
      data={[trace, line]}
      layout={{
        width: 800,
        height: 600,
        title: "Scatter Plot with Line of Best Fit",
      }}
    />
  );
}

export default ScatterPlot;
