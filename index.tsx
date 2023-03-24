import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Button from "@mui/material/Button";
import { useState } from "react";
import FileUploadIcon from '@mui/icons-material/FileUpload';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const onFileChange = event => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    fetch('http://example.com/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>File Upload Example</h1>
      <input type="file" onChange={onFileChange} />
      <button onClick={onFileUpload}>Upload</button>
    </div>
  );
}

ReactDOM.createRoot(document.querySelector("#app")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
