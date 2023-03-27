import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Button, Container, Input, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import Plot from "react-plotly.js";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [graph, setGraph] = useState(null);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setGraph({
          data: response.data, //{ x: response.data.x, y: response.data.y },
          slope: response.slope,
          intercept: response.intercept,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container>
      <h1>File Upload Example:</h1>
      <Input type="file" onChange={onFileChange} />
      <Button onClick={onFileUpload}>Upload</Button>
      <div>
        {graph && (
          <ScatterPlot
            data={graph.data}
            slope={graph.slope}
            intercept={graph.intercept}
          />
        )}
      </div>
    </Container>
  );
}

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
    console.log(data);
    console.log(slope);
    console.log(intercept);
    if (data) {
      // Extract x and y values from data
      const xValues = data.x;
      const yValues = data.y;
      console.log(xValues);
      console.log(yValues);
      // Create scatter plot trace
      const scatterTrace = { ...trace };
      scatterTrace.x = xValues;
      scatterTrace.y = yValues;
      setTrace(scatterTrace);
      console.log(scatterTrace);

      // Create line of best fit trace
      const lineTrace = { ...line };
      const lineXValues = [Math.min(...xValues), Math.max(...xValues)];
      const lineYValues = lineXValues.map((x) => slope * x + intercept);
      lineTrace.x = lineXValues;
      lineTrace.y = lineYValues;
      setLine(lineTrace);
      console.log(lineTrace);
    }
  }, [data, slope, intercept]);

  const layout = {
    title: "Scatter Plot and Line Chart",
    xaxis: { title: "X Axis" },
    yaxis: { title: "Y Axis" },
  };
  return (
    <Paper>
      <Plot data={[trace, line]} layout={layout} />
    </Paper>
  );
}

function ScatterLineChart({ data }) {
  const trace1 = {
    x: data.x,
    y: data.y,
    mode: "markers",
    type: "scatter",
    name: "Scatter Plot",
  };

  const trace2 = {
    x: data.x,
    y: data.y,
    mode: "lines",
    type: "scatter",
    name: "Linear Fit",
  };

  const layout = {
    title: "Scatter Plot and Linear Fit",
    xaxis: { title: "X Axis" },
    yaxis: { title: "Y Axis" },
  };

  return (
    <Plot
      data={[trace1, trace2]}
      layout={layout}
      config={{ responsive: true }}
    />
  );
}

ReactDOM.createRoot(document.querySelector("#app")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
