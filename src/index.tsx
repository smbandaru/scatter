import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Button, Input } from "@mui/material";
import { useState, useEffect } from "react";
import parse from "csv-parse";
import { Scatter } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import Plot from "react-plotlyjs";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showComponent, setShowComponent] = useState(false);
  const [response, setResponse] = useState([]);

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
      .then((data) => {
        setResponse(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
    setShowComponent(true);
  };

  return (
    <div>
      <h1>File Upload Example:</h1>
      <Input type="file" onChange={onFileChange} />
      <Button onClick={onFileUpload}>Upload</Button>
      <div>
        {showComponent &&
          ScatterPlot(response.data, response.slope, response.intercept)}
      </div>
    </div>
  );
}

function ScatterPlot2(data) {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch the data from the server using a fetch or axios call
    // ...
    const demoData = {
      labels: ["Data points"],
      datasets: [
        {
          label: "Demo data",
          data: data,
        },
      ],
    };
    setData(demoData);
  }, []);

  return (
    <div>
      {data ? <Scatter data={data} options={{}} /> : <p>Loading data...</p>}
    </div>
  );
}

function ScatterPlot(data, slope, intercept) {
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

ReactDOM.createRoot(document.querySelector("#app")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
