# Newsletter Signup

Newsletter signup page using Mailchimp.

## Dependencies

-   Mailchimp API
    -   You will need to create an account and generate a free API key. 
    -   Mailchimp resources:
        -   https://mailchimp.com/developer/marketing/docs/fundamentals/
        -   https://mailchimp.com/developer/marketing/api/
        -   https://mailchimp.com/developer/marketing/api/lists/
    -   Next create a file in the `Newsletter-Signup` folder called `apikeys.js` and put in it the code below. You will need to fill out the data with your Mailchimp API information.
    ```javascript
    export const mailchimpAPI = {
        key: "your api key here",
        server: "your server here",
        listid: "your list id here"
    }
    ```
-   Node modules - inside project run `npm install express`
    -   Express

## Includes

-   API
    - Mailchimp API usage example
-   JS includes
    -   express
    -   path
    -   url
    -   https
-   Data retreival and manipulation
    -   Serving up HTML files
    -   Retreive data from form, manipulate, and respond to user
    -   Minimal error handling
