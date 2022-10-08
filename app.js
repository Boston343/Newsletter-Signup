
import express from 'express';          // npm install express
import path from 'path';
import https from 'https';              // for forming external get requests
import { fileURLToPath } from 'url';
import { mailchimpAPI } from './apikeys.js';    // Mailchimp API - used to manage newsletter distribution list
const app = express();
const port = 3000;
app.use(express.urlencoded({extended: true}));  // this is for parsing data from html form

// __dirname is only available with CJS. Since I am using ESM I need to get it another way
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// static items like other js or css files will not load unless you define where the server should 
//      start looking for those files.
app.use(express.static(path.join(__dirname, "/public")));

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

    const fileName = "signup.html";
    res.sendFile(path.join(__dirname, "/" + fileName));
    console.log('Sent:', __dirname + "/" + fileName);
    
});

// -------------------------------------------------------------
// -------------------- Post Requests --------------------------
// -------------------------------------------------------------
app.post('/', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName; 
    const email = req.body.email;  

    console.log("First Name: " + firstName);
    console.log("Last Name: " + lastName);
    console.log("Email: " + email);

    // create mailchimp data JSON to batch subscribe or unsubscribe users
    // https://mailchimp.com/developer/marketing/api/list-member-events/
    const newData = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    // turn the JSON object into one long string for sending
    const jsonData = JSON.stringify(newData);

    // setup mailchimp post request 
    const mailchimpURL = "https://" + mailchimpAPI.server + ".api.mailchimp.com/3.0/lists/" + mailchimpAPI.listid;
    const options = {
        method: "POST",
        auth: "Reap3r:" + mailchimpAPI.key 
    }

    // create mailchimp post request
    const mailchimpRequest = https.request(mailchimpURL, options, (response) => {
        response.on("data", (data) => {
            console.log(JSON.parse(data));
        });
    });

    // make mailchimp post request with our data to add a person to email list
    mailchimpRequest.write(jsonData);
    mailchimpRequest.end();
});