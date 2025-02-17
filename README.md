[![semantic-release](https://img.shields.io/badge/semantic%20release-666666?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

# pagopa-arc-fe

## About The Project

this project contains a FE of the area reserved for citizens. It allows you to consult open debt positions and consult the history of those already paid. It also allows the payment of open positions without manual data entry.

### Built With

- [Parcel](https://parceljs.org)
- [Typescript](https://www.typescriptlang.org)
- [React](https://it.legacy.reactjs.org/)

## Getting Started

### Prerequisites

In order to build and run this project are required:

- [yarn](https://yarnpkg.com/)
- [node (>=16.0.0)](https://nodejs.org/it/)

### Configuration

The table below describes all the Environment variables needed by the application.

| Variable name     | Description                                           | type                          |
| ----------------- | ----------------------------------------------------- | ----------------------------- |
| APIHOST           | api service host                                      | url                           |
| API_TIMEOUT       | after this time api requests will be cancelled        | number                        |
| ASSISTANCE_LINK   | Link for assistance page                              | url                           |
| ENTITIES_LOGO_CDN | cdn link for logos                                    | url                           |
| LOGIN_URL         | Link for login button                                 | url                           |
| SHOW_NOTICES      | show/hide payment notices section (and the cart)      | '0', '1'                      |
| DEPLOY_PATH       | deploy subpath (default "pagamenti")                  | string                        |
| ENV               | environment target                                    | LOCAL, DEV, UAT, PROD         |
| VERSION           | active version (valued by pipeline)                   | string (semvers)              |
| PAYMENT_RETURN_URL| url to return after a payment with checkout           | url                           |

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/pagopa/pagopa-arc-fe.git
   ```
2. Install node packages
   ```sh
   yarn install
   ```
3. Build
   ```sh
   yarn build
   ```

### Usage

In order to run the application on a local dev server with mock API responses:

```sh
  yarn dev
```

the application is available at http://localhost:1234

This project uses [storybook](https://storybook.js.org/).
In order to run the storybook local server:

```sh
  yarn storybook
```

the application is available at http://localhost:6006
