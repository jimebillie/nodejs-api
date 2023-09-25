# Node.js, Express Api + MongoDB

## About?

> Register, Login System. Use Express.js for server and has the following package,
> - ```bcrypt```: "^5.1.1",
> - ```body-parser```: "^1.20.2",
> - ```dotenv```: "^16.3.1",
> - ```express```: "^4.18.2",
> - ```express-validator```: "^7.0.1",
> - ```helmet```: "^7.0.0",
> - ```jsonwebtoken```: "^9.0.2",
> - ```mongoose```: "^7.5.2",
> - ```nodemon```: "^3.0.1"

### Get Start
> Change the file name from ```.env.example``` to ```.env```, Then enter a value into each.
> > **Example** — ```ENV_PORT=1998``` This is the port value entry.

### How to start run the project
> Write on the terminal : ```npm install``` for install node_modules. And then ```npm run dev``` for start run the project.

**Result on the terminal :**
```terminal
[nodemon] restarting due to changes...
[nodemon] starting `node index.js`
[Server] {
  Connect: 'Ok',
  Port: '1998',
  Database: 'mongoDB',
  dbName: 'jimebillie'
}
```

### Call API

<details>
  <summary>Register</summary>
  url : http://localhost:1998/api/v1/register <br>
  method : POST <br>
  body key : username, password, name, lastname, email
</details>

<details>
  <summary>Login</summary>
  url : http://localhost:1998/api/v1/login <br>
  method : POST <br>
  body key : username, password
</details>



