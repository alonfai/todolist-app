This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# ToDo List

This project implements a To-Do list management system that allow the user to create and manage tasks. It has the following features:

* Add and view tasks
* Delete a task
* Complete a task
* Set a priority for my tasks
* View the tasks sorted by priority and name
* View the number of total and completed tasks

## Notes

This project will need the following enhancements to the given solution to make it production ready:

* Responsiveness across different screens dimensions using native CSS3 media queries or the Bootstrap library responsiveness features
* SEO meta tags
* Accessability for WAI/ARIA tags and testing across with tools like lighthouse , React-Axe, etc...
* E2E testing with tools/frameworks such as [Cypress.io](https://www.cypress.io/), [Puppeteer](https://pptr.dev/), Selenium, etc..

## NPM modules used

In this project, the main npm modules used are

* Node 10.x
* Typescript 4
* bootstrap 4 for Styling the UI elements
* sass/css for basic styling
* Jest + Testing-library
* React-router
* [immer](https://immerjs.github.io/) for immutable data management
* ESLint + Prettier
* husky + lint-staged (for commiting)

## Pre-Requirements

* .env - add the react router base URL for all locations under "REACT_APP_BASENAME"

***

## Install

Close the project using the following command and use either `yarn` package manager:

``` node
git clone https://github.com/alonfai/todolist-app

yarn install
```

***

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode. The app will reload if you make edits.

### `yarn test`

Launches the test runner. It takes all files with `.spec.*` or  `.test.*` extensions and executes all coding assertions.

### `yarn test:debug`

launches the Jest testing in debug mode

### `yarn coverage`

produces a test coverage report under coverage folder

### `yarn build`

Builds the app for production to the `build` folder.

You can then deploy the app to your production environment and/or add this as part of your CI/CD pipeline


### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**
