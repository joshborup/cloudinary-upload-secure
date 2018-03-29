const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config(); 
const uP = require('./contoller/upload');

app.use(express.static('build'))

app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());
app.use(fileUpload());

app.post('/upload', uP.uploaded)
  
app.listen(4000, ()=> console.log('listening on port 4000'))