## Coding Challenge - Getir Case Study

RESTful API with a single endpoint that fetches the data in the
provided MongoDB collection and return the results in the requested format.

### Example

> Request
body: {
"startDate": "2016-01-26",
"endDate": "2018-02-02",
"minCount": 2700,
"maxCount": 3000
}

```
$ curl --header "Content-Type: application/json" -d "{\"startDate\":\"2016-01-26\", \"endDate\":\"2018-02-02\", \"minCount\": 2700, \"maxCount\": 3000}" https://victor-getir-api-challenge.herokuapp.com/api/v1/records
```

> Response

```
{
    "code":0,
    "msg":"Success",
    "records":[
        {
        "key":"TAKwGc6Jr4i8Z487",
        "createdAt":"2017-01-28T01:22:14.398Z",
        "totalCount":2800
        },
        {
        "key":"NAeQ8eX7e5TEg7oH",
        "createdAt":"2017-01-27T08:19:14.135Z",
        "totalCount":2900
        }
        ...
    ]
}
```

![](https://github.com/johnsonsirv/getir-coding-challenge-be/blob/wizard/docs/getir-api-docs-postman.png)

### Live URL:

https://victor-getir-api-challenge.herokuapp.com/api/v1

## Built With

-   Node.js
-   Express
-   MongoDB
-   Docker
-   Heroku
-   Jest (TDD) / Postman
-   Open API Specification 3.0 (swagger docs)

## How to Install

Clone the repo

```
$ git clone https://github.com/johnsonsirv/getir-coding-challenge-be.git

$ cd getir-coding-challenge-be
```

### Install without Docker

Install dependencies

```
$ npm install
```

Run the server locally

```
$ npm start
```

This will launch the server on http://localhost:5000

```
URL: http://localhost:5000
Endpoint: http://localhost:5000/api/v1/records
```

### Install with Docker

Ensure docker is installed

```
$ docker -v

$ docker-compose up
```

### Heroku

```
URL: https://victor-getir-api-challenge.herokuapp.com/api/v1
Endpoint: https://victor-getir-api-challenge.herokuapp.com/api/v1/records
```

### Running Tests (e2e)

```
$ npm run test
```

### API Documentation `[/docs]`

```
URL: https://victor-getir-api-challenge.herokuapp.com/api/v1/docs
```

### Technical & Architectural Choices

General development decisions were based on project specifications and required stack such as `Node.js`, `MongoDB` and `Express,js`. I also made specific decisions. See below.

-   Containerization using Docker
-   Clean code trade-off
-   Test Driven Development (integration) to validate and prove code behaviour. `Jest`, `Supertest`. These libraries provide simple APIs to test my code
-   Linting and Code Coverage using `Eslint` and `Jest coverage` to eliminate code smells, improve overall code readability
-   Comments and Documentation

### Further Optimizations & Improvements

Here are some further improvements I could make to this project:

-   Use Queueing and background workers to handle multiple requests.
-   Integrate APM like `New Relic`
-   Integrate `Rollbar` - to report and track bugs/exceptions
-   Track logging using `PaperTrail`
-   Add more tests
