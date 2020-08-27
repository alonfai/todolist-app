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
* React 16.8+ with React hooks
* Typescript 4
* bootstrap 4 for Styling the UI elements
* sass/css for basic styling
* Jest + Testing-library
* React-router
* [immer](https://immerjs.github.io/) for immutable data management
* ESLint + Prettier
* husky + lint-staged (for commiting)

## Pre-Requirements

* Node version 10+
* Yarn package manager (<https://classic.yarnpkg.com/en/docs/install#mac-stable>)
* .env - add the react router base URL for all locations under "REACT_APP_BASENAME"

***

## Install

Close the project using the following command and use either `yarn` package manager:

``` node
git clone https://github.com/alonfai/todolist-app

yarn install
```

***


## Project structure

This project was written with TypeScript and its seetings are configured in the main `tsconfig.json` 

``` json

{
  "compilerOptions": {
    "baseUrl": "./src",
    "outDir": "build/dist",
    "module": "esnext",
    "target": "es5",
    "lib": [
      "es6",
      "dom",
      "esnext.asynciterable"
    ],
    "sourceMap": true,
    "allowJs": true,
    "jsx": "react",
    "moduleResolution": "node",
    "rootDir": "src",
    "forceConsistentCasingInFileNames": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "suppressImplicitAnyIndexErrors": true,
    "noUnusedLocals": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "downlevelIteration": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true
  },
  "exclude": [
    "node_modules",
    "build",
    "scripts",
    "acceptance-tests",
    "webpack",
    "jest",
    "src/setupTests.js"
  ],
  "include": [
    "src"
  ]
}

```

## State management

This project using the React Context API and the `useReducer` hook for managing its local state of tasks throughout the system.

The main project folders are located inside the `src` folder:

* components - React functional components for Displaying, Viewing, Editing and rendering **Task** objects.
  * Add - Render a form for adding a new Task to the system
  * Edit - Renders a modal window for user to be able to edit the priorirty of a task
  * List - Renders a List of tasks
  * Task - Renders a single record of a given task inside a table `<tr />` element
* context - code logic for the state management code (using native React hooks `useContext` and `useReducer`)
* mocks - collection of mock objects used throughout the unit/integration tests
* pages - React components associated with available url routes user can access throughtout the project
  * NoMatch - any invalid route user type in the browser will render this page
  * Root - Main application page
* shared - collection of shared utilitiy functions, constants, custom JS Error objects and shared TypeScript interfaces
* types - custom typescript definition types

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

***

## References

* [React Context API](<https://reactjs.org/docs/context.html>)
* [React hooks + useReducer](<https://reactjs.org/docs/hooks-reference.html#usereducer>)
* [Jest CLI](<https://jestjs.io/docs/en/configuration>)
