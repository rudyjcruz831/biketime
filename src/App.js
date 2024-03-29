import React, { useState } from 'react';
import axios from 'axios';

require('dotenv').config();

function Form() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageChange = (e) => {
    setSelectedFile(e.target.files[0]);
    const fileReader = new FileReader();
    // fileReader.append("file", selectedFile, selectedFile)
    fileReader.addEventListener('load', () => {
      setSelectedFile(fileReader.result)
    })
    fileReader.readAsDataURL(e.target.files[0])

    
    // Get the API Gateway URL from environment variables
    // const baseURL = process.env.AWS_APIGATEWAY;

    // Define the request data, if needed
    // const requestData = {
    //   'image': fileReader.readAsDataURL(e.target.files[0])
    // }; // Add your request data here if needed


    // // Define headers
    // const headers = {
    //   'Content-Type': 'application/png', // Corrected content type
    // };

    // // Make the POST request
    // axios.post(baseURL + '/upload', requestData, { headers })
    // .then(response => {
    //   // Handle the response here, for example:
    //   console.log('Response:', response.data);
    // })
    // .catch(error => {
    //   // Handle any errors
    //   console.error('Error:', error);
    // });
    

  };

  const handleImageUpload = () => {
    // const formData = new FormData();

    // formData.append("myFile", selectedFile, selectedFile.name);
    // console.log(selectedFile);
    // // const 
    // const fileReader = new FileReader();
    // fileReader.append("file", selectedFile, selectedFile)
    // fileReader.readAsDataURL()
    // axios.post("api/uploadfile", formData);
  };
  console.log(selectedFile)
  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {selectedFile.data}</p>
          {/* <p>File Type: {selectedFile.type}</p>
          <p>Last Modified: {selectedFile.lastModifiedDate.toDateString()}</p> */}
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
