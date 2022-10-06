
import express from 'express';          // npm install express
import bodyParser from 'body-parser';   // npm install body-parser
import request from 'request';          // npm install request
import path from 'path';
import https from 'https';              // for forming external get requests
import { fileURLToPath } from 'url';
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended: true})); // this is for parsing data from html form

// __dirname is only available with CJS. Since I am using ESM I need to get it another way
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// static items like other js or css files will not load unless you define where the server should start looking for those files.
app.use(express.static(__dirname));

// -------------------------------------------------------------
// ---------------------- Listening ----------------------------
// -------------------------------------------------------------
app.listen(port, () => {
    console.log(`Server is listening on port ${port} at \"localhost:${port}\"`);
});

// -------------------------------------------------------------
// --------------------- Get Requests --------------------------
// -------------------------------------------------------------
app.get('/', (req, res) => {
    console.log("Server is up and running.");

    var fileName = "signup.html";
    res.sendFile(path.join(__dirname, "/" + fileName));
    console.log('Sent:', __dirname + "/" + fileName);
    
});

// -------------------------------------------------------------
// -------------------- Post Requests --------------------------
// -------------------------------------------------------------