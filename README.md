# Newsletter Signup

Newsletter signup using Mailchimp.

## Dependencies

-   OpenWeatherMap API
    -   You will need to create an account and generate a free API key. https://home.openweathermap.org/api_keys.
    -   Next create a file in the `WeatherProject` folder called `apikeys.js` and put in it the line 
    ```javascript
    export const weatherApiKey = "your api key here";
    ```
-   Node modules - inside project run `npm install express`
    -   Express

## Includes

-   API
    - OpenWeatherMap API usage example
-   JS includes
    -   express
    -   path
    -   url
    -   https
-   Data retreival and manipulation
    -   Serving up HTML files
    -   Retreive data from form, manipulate, and respond to user
    -   Minimal error handling
