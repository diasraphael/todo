# Todo React App

This project was bootstrapped with Create React App -typescript template

## Scripts to run

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Have configured tailwind, prettier, eslint

### issues

1. cors error

Access to XMLHttpRequest at 'https://todobackend-production-c03e.up.railway.app/api/user/create' from origin 'https://todo-r6t7nm7wn-dias-projects-b6aded80.vercel.app' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.

solution:

Adding the corresponding url in the backend:
origins = [
"http://localhost:3001",
"http://127.0.0.1:3001",
"https://todo-r6t7nm7wn-dias-projects-b6aded80.vercel.app",
]
