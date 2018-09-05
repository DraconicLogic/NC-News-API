## Draconic Logic: Northcoders News API

For this project I intend to create a full working REST API. I will begin with the back end working on a making sure all the end points are properly implemented and they interact effectivly with the mongo database.


### Prerequisites

Outside of running `npm install` to install all dependencies required to run the tests, the are no other prerequisites.

### Config

Before you can run any tests and use the API you'll need to create a config file that looks like this:

```javascript
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const dbConfig = 
{
    development: {
        DB_URL: 'mongodb://localhost:27017/nc_news'
    },
    test: {
        DB_URL: 'mongodb://localhost:27017/nc_newsTest'
    }
}
module.exports = dbConfig[process.env.NODE_ENV]
```
Name the file config.js and put it in a directory named config

### Running the tests

To run the tests type `npm test` into the console. These test make sure that all the endpoints are working correctly and the error handling system is functioning correctly.

To test the API with a external developer tool e.g postman type `npm run dev`. This will automatically seed the database with dev data for more extensive testing.


### App

The app for this API is hosted on Heroku. You can try it at [https://draconiclogic-nc-news.herokuapp.com/](https://draconiclogic-nc-news.herokuapp.com/) 


### Author

Kingsley Onyensoh is currently a trainee software developer training at the esteemed codeing bootcamp Northcoders based in Manchester, UK

You can email him at:

draconiclogic@gmail.com


### Acknowledgements

My thanks to Northcoders for giving me this awesome project to persue, to all the tutors there and my fellow students who have all taught me so much.


