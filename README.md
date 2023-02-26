# CIWGO - Chatgpt IELTS Writing GO

## Getting Started

### Dependencies

- node ver ^12 || ^14 || ^16
- bcrypt ver ^5.1.0
- cors ver ^2.8.5
- dotenv ver ^16.0.3
- express ver ^4.18.2
- express-async-errors ver ^3.1.1
- jsonwebtoken ver ^9.0.0
- mongoose ver ^6.6.5
- morgan ver ^1.10.0
- nodemailer ^6.4.7
- pm2 ver ^5.2.2

### Dev Dependencies

- @types/express ver ^4.17.16
- @types/mongoose ver ^5.11.97
- @types/node ver ^18.11.18
- @types/nodemailer ^6.4.7
- @typescript-eslint/eslint-plugin ver ^5.50.0
- @typescript-eslint/parser ver ^5.50.0
- eslint ver ^8.33.0
- eslint-plugin-import ver ^2.27.5
- nodemon ver ^2.0.20
- ts-node ver ^10.9.1
- typescript ver ^4.9.5

### Installing

- Install all needed Dependencies

```
npm ci
```

- Install MongoDB for VS Code extension

### Executing program

- Run the project

```
npm run start
```

- DEV modal

```
npm run dev
```

- Stop running

```
^c
```

```
control + c
```

## Run as Docker (Need .env as well)

- Build image:

```
docker build -t ciwgo/backend .
```

- Docker Run:

```
docker run --name backend -d --rm -p 3005:3005 ciwgo/backend
```

## MongoDB Connection

- Application connection string:

```
mongodb+srv://leoyh:jevtom-sowwyv-ciWty8@cluster0.tyq36bu.mongodb.net/?retryWrites=true&w=majority
```

- VS Code extension connection string:

```
mongodb+srv://leoyh:jevtom-sowwyv-ciWty8@cluster0.tyq36bu.mongodb.net/test
```

## OpenAI URL and APIKey

```
https://api.openai.com/v1/completions
```

```
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
```

## .env Variables

Create a file named .env under project root folder and paste the following into this file.

```
PORT = 3005
CONNECTION_STRING = "mongodb+srv://leoyh:jevtom-sowwyv-ciWty8@cluster0.tyq36bu.mongodb.net/CIWGO?retryWrites=true&w=majority"
CIW_COLLECTION_NAME = "CIWGO"
OPENAI_APIURL = "https://api.openai.com/v1/completions"
OPENAI_APIKEY = "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"
JWT_SECRET = "yoursecretkey"
TEST_EMAIL = "ciwgo-dev@hotmail.com"
TEST_EMAIL_PASSWORD = "Ciwgo123"
```

## Program Flow Chart

```
https://lucid.app/lucidchart/bdc56173-a829-40ab-9e06-65a9ac4fe73a/edit?viewport_loc=-11%2C181%2C1752%2C1075%2C0_0&invitationId=inv_486e4eeb-9c68-4fba-88ce-d4f2d7566492
```

## Test Emails

```
ciwgo-dev@hotmail.com
Ciwgo123
```

```
ciwgo-test@hotmail.com
Ciwgo123
```

## Error Handling

Status Code:
- 400(Bad Request): The request could not be understood or was missing required parameters
- 401(Unauthorized): Authentication failed or user does not have permissions for the requested operation
- 403(Forbidden): Access denied
- 404(Not Found): Resource was not found
- 405(Method Not Allowed): Requested method is not supported for the specified resource
- 409(Conflict): Request could not be completed due to a conflict with the current state of the resource
- 500(Internal Server Error): An error occurred on the server side while processing the request.

## Version History

- 1.0 Initial functions

## Author

- Zihan Zhou zihanzhou1021@gmail.com
- Renee Zheng xiaoruiz@utas.edu.au
- Eric Li helloleolee@hotmail.com
- Amber Xu xurongnan307@gmail.com
- Shuchen Wu wushuchen113@gmail.com
- Chang Liu changwork19@hotmail.com
- Lucas Lin dl.world@hotmail.com
- Albert Yu yuzhiqiang3014@gmail.com
- Yinghe Zhou zhouyinghe0821@gmail.com
- Hai Yang leoyh.97@gmail.com
- Haixin Zhang haixin.zhang.777@gmail.com

## License

This project is licensed under the ISC License - see the LICENSE.md file for details
