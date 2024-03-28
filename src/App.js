import React, { useState } from 'react';
// import axios from 'axios';

function Form() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleImageUpload = () => {
    const formData = new FormData();
    formData.append("myFile", selectedFile, selectedFile.name);
    console.log(selectedFile);
    // axios.post("api/uploadfile", formData);
  };

  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type}</p>
          <p>Last Modified: {selectedFile.lastModifiedDate.toDateString()}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };
  
  return (
    <div>
      <form>
        <label htmlFor="file">Bike Image:</label>
        <input type="file" id="file" name="file" onChange={handleImageChange} />
        <button type='button' onClick={handleImageUpload}>Submit</button>
      </form>
      <div>
        {fileData()}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1></h1>
      <Form />
    </div>
  );
}

export default App;
