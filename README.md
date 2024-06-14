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

| Variable name    | Description       | type            |
|------------------|-------------------|-----------------|
| APIHOST          | api service host  | endpoint/string |
| ENV              | environment id    | string          |
| ENTITIES_LOGO_CDN| cdn link for logos| endpoint/string |
| ASSISTANCE_LINK  | Link for assist-  | endpoint/string <|
                     ance page.        |                 |

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
