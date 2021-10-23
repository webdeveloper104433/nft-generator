const fs = require('fs');
const FormData = require('form-data');
import axios from "axios";

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


export default async function handler(req, res) {
  const mintIndex = getRndInteger(0, 50);
  const url = 'img/output/'+ mintIndex +'.png';

  const file = fs.createReadStream(url);
  let formData = new FormData();
  formData.append('file', file)

  var url_pinata = `https://api.pinata.cloud/pinning/pinFiletoIPFS`;
  var resp = await axios.post(url_pinata, formData, {
      headers: {
          "Content-Type": `multipart/form-data; boundary= ${formData._boundary}`,
          pinata_api_key: '6d78aaa98809fbfcf16f',
          pinata_secret_api_key: '0a424fa3beb41f81618a30f623cd9a279819a6bdfe2ffea0f51f2ebf75bb569e',
      },
  })
  var image_url = "https://gateway.pinata.cloud/ipfs/" + resp.data.IpfsHash;

  res.status(200).json({'image_url':image_url, 'mintIndex': mintIndex} ) 
}