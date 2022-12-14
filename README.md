# Newsletter Signup

Newsletter signup page using Mailchimp. Website can be viewed at https://fast-bald-mammal.glitch.me/

## Dependencies

-   Mailchimp API
    -   You will need to create an account and generate a free API key. 
    -   Mailchimp resources:
        -   https://mailchimp.com/developer/marketing/docs/fundamentals/
        -   https://mailchimp.com/developer/marketing/api/
        -   https://mailchimp.com/developer/marketing/api/lists/
    -   Next create a file in the `Newsletter-Signup` folder called `.env` and put in it the text below. You will need to fill out the data with your Mailchimp API information.
    ```
    MAILCHIMP_KEY = your_api_key
    MAILCHIMP_SERVER = your_server
    MAILCHIMP_LISTID = your_list_id
    ```
-   Node modules - inside project run `npm install express dotenv`
    -   express
    -   dotenv

## Includes

-   API
    - Mailchimp API usage example
-   JS includes
    -   express
    -   dotenv
    -   path
    -   url
    -   https
-   Data retreival and manipulation
    -   Serving up HTML files
    -   Retreive data from form, manipulate, and respond to user
    -   Minimal error handling
