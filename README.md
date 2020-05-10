# simple-express-app

A simple template JS app.

## Requirements

* Node.js - [https://nodejs.org/](https://nodejs.org/)


## Getting Started

Install dependencies:

```
npm install
```

Run the application:

```
npm start
```

The application should now be accessible at `http://localhost:3000/`

## Running Tests/Code Coverage

Running following command will execute Lint/Jest tests and produce coverage reports:

```
npm test
```

## Build and run with Docker


Build your image:

```
docker build --rm=false -t app .
```

Run the image:

```
docker run --rm -p 3000:3000 app
```
