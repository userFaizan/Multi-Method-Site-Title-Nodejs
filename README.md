# Multi-Method-Site-Title-Nodejs

This repository contains a Node.js application that fetches the titles of websites provided by the user. It is divided
into four parts, each showcasing different approaches to handle the task of fetching and displaying the titles of
websites using various Node.js techniques.

## Parts Overview

### Part 1: Callbacks

Uses traditional Node.js callbacks to handle multiple asynchronous requests and fetch website titles. Server listens
on [http://localhost:3009](http://localhost:3009).

### Part 2: Async.js

Uses the `async` module to handle multiple requests in parallel and fetch website titles. Server listens
on [http://localhost:3010](http://localhost:3010).

### Part 3: Promises

Uses Promises to handle asynchronous tasks and fetch website titles. Server listens
on [http://localhost:3011](http://localhost:3011).

### Part 4: Bacon.js

Uses `Bacon.js`, a functional reactive programming library for handling asynchronous tasks. Server listens
on [http://localhost:3012](http://localhost:3012).

## Getting Started

These steps will guide you through running the application locally.

### Prerequisites

Make sure you have Node.js installed. You can check the version by running:

```bash
node -v

git clone https://github.com/your-username/website-title-fetcher.git

cd part1-callbacks
npm install
npm start


cd ..

cd part2-asyncjs
npm install
npm start


cd ..

cd part3-promises
npm install
npm start


cd ..

cd part3-promises
npm install
npm start


cd ..

cd part4-bonus-streams
npm install
npm start
```

### How to Use

Open the application in your browser by navigating to the appropriate URL from the sections above.

Input the URLs of websites you want to fetch titles from.


The application will display the titles of the provided websites.


### Additional Information

Part 1 (Callbacks) demonstrates traditional callback-based handling of asynchronous requests.

Part 2 (Async.js) uses the async library to make asynchronous tasks easier to handle.

Part 3 (Promises) replaces callbacks with Promises to avoid callback hell.

Part 4 (Bacon.js) introduces functional reactive programming using the Bacon.js library to handle streams of events.

### License

This project is open-source and available under the [MIT License](LICENSE).