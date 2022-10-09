
import express from 'express';          // npm install express
import dotenv from 'dotenv';            // npm install dotenv
import path from 'path';
import https from 'https';              // for forming external get requests
import { fileURLToPath } from 'url';

dotenv.config();    // gets the .env data for use with process.env.
const app = express();
const port = process.env.PORT || 3000;
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
    res.sendFile(path.join(__dirname, "/src/" + fileName));
    console.log('Sent:', __dirname + "/src/" + fileName);
    
});

// -------------------------------------------------------------
// -------------------- Post Requests --------------------------
// -------------------------------------------------------------
//  main functionality
app.post('/', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName; 
    const email = req.body.email;  

    // console.log("First Name: " + firstName);
    // console.log("Last Name: " + lastName);
    // console.log("Email: " + email);

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
    const mailchimpURL = "https://" + process.env.MAILCHIMP_SERVER + ".api.mailchimp.com/3.0/lists/" + process.env.MAILCHIMP_LISTID;
    const options = {
        method: "POST",
        auth: "Reap3r:" + process.env.MAILCHIMP_KEY
    }

    // create mailchimp post request
    const mailchimpRequest = https.request(mailchimpURL, options, (response) => {
        console.log("status: " + response.statusMessage + " (" + response.statusCode + ")" );
        response.on("data", (data) => {
            console.log(JSON.parse(data));
            var mailchimpResponse = JSON.parse(data);

            var htmlResponsePage;
            if ( response.statusCode === 200 ) {
                if ( mailchimpResponse.error_count === 0 ) {
                    // send success feedback to user
                    htmlResponsePage = "success.html";
                    
                }
                else {  
                    htmlResponsePage = "failure.html";
                    var error_code = mailchimpResponse.errors[0].error_code;
                    var error = mailchimpResponse.errors[0].error;
                    // mailchimp has identified an error, log it
                    // res.send("<h3>" + error_code + ": " + error + "</h3>");
                    console.log("Mailchimp error: " + error_code + ": " + error);
                }
            }
            else {
                // send failure feedback to user
                htmlResponsePage = "failure.html";
            }

            res.sendFile(path.join(__dirname, "/src/" + htmlResponsePage));
            console.log("Sent: " + __dirname + "/src/" + htmlResponsePage);
        });
    });

    // make mailchimp post request with our data to add a person to email list
    mailchimpRequest.write(jsonData);
    mailchimpRequest.end();
});

// -------------------------------------------------------------
//  failure page functionality for button to try again
app.post('/failure', (req, res) => {
    res.redirect("/");
});
