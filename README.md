# TODO Manager - React App

This project is a React app for managing your TODO list. It utilizes a Django REST Framework server as a backend ([found here](https://github.com/nilaster/todo-server)).

## Prerequisites

Node.js and npm (or yarn) installed on your machine (https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)

## Installation

### Clone this repository:

```Bash
git clone https://github.com/nilaster/todo-website.git
```

### Install dependencies:

```Bash
cd todo-website
npm install
```

## Development

### Start the development server:

```Bash
npm start
```

This will start the React app in development mode at http://localhost:3000 by default.

### Using a Local Backend

By default, the API Base URL points to the deployed backend server running on AWS Elastic Beanstalk. This URL is set within the environment variables of your deployment configuration. If you'd like to use a local Django server for development, you can override this default behavior using a .env file and the `REACT_APP_API_BASE_URL` variable.  
You can create a .env file in the project root with this variable set to your local Django server URL (e.g. `REACT_APP_API_BASE_URL=http://localhost:8000`).

## Deployment

This project uses AWS Amplify for deployment. Any changes pushed to the main branch will automatically trigger a build and deployment process.

> Important: The API base URL should not end with a trailing slash (/).
