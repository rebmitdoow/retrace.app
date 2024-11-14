import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

// Configurations
//const project_id = '<Project Identifier>';
const table_id = '<Table Identifier>';
const xc_token = '<Auth Token>';
const file_path = '<Local File Path>';

// Insert Image
// @param image_path : local file path
// @return : JSON object to be used in insert record API for attachment field
const insertImage = async (path) => {
  const formData = new FormData();
  formData.append("file", fs.createReadStream(path));

  const { data } = await axios({
    url: 'http://localhost:8080/api/v2/storage/upload',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data;',
      'xc-token': xc_token
    },
    method: 'POST',
    params: { "path": "somePath" }  // Optional: storage file path
  });

  return data;
};

// Insert record with attachment
// Assumes a table with two columns:
//      'Title' of type SingleLineText and
//      'Attachment' of type Attachment
const uploadFileExample = async () => {
  const response = await insertImage(file_path);

  const row = {
    Title: "2",
    Attachment: response.data
  };

  await axios({
    method: 'POST',
    url: `http://localhost:8080/api/v2/tables/${table_id}/records`,
    data: row,
    headers: {
      'xc-token': xc_token
    }
  });
};

// Self-executing function to run the upload process
(async () => {
  await uploadFileExample();
})();