# Project CAC TAT 

## Pre-requirements
It is required to have Node.js and npm installed to run this project. I have used versions `2.42.1. v20.13.1` and `10.8.1.` I suggest you use the same or lated LTS versions. 

I used versions `v18.15.0 `and `9.5.0` of Node.js and npm, respectively. I suggest you use the same or later versions.

## Installation
Run `npm install` (or npm i for the short version) to install the dev dependencies.

## Tests
Note: Before running the tests, make a copy of the cypress.env.example.json file as cypress.env.json, which in the real world, you would update with valid credentials.

The cypress.env.json file is included on `.gitignore` and you're safe that confidential info won't be versioned.

In this project, you can run the tests on a desktop or mbile viewport.

## Desktop
Run `npm test` (or `npm t` for the short version) to run the test in headless mode on a desktop viewport.

Or, run `npm run cy:open` to open Cypress App on a desktop viewport.

## Mobile
Run npm run test:mobile to run the test in headless mode on a mobile viewport.

Or, run `npm run cy:open:mobile` to open the Cypress App a mobile viewport.

### Support this project
If you want to support this project, leave a ⭐.

This project was created with 💚 by Cibele

