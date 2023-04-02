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

### Create .env Variables

Create a file named .env under project root folder and paste the following into this file.

```
PORT = 3005
FRONT_END="http://localhost:3000"
CONNECTION_STRING = "mongodb+srv://leoyh:jevtom-sowwyv-ciWty8@cluster0.tyq36bu.mongodb.net/CIWGO?retryWrites=true&w=majority"
CIW_COLLECTION_NAME = "CIWGO"
OPENAI_APIURL = "https://api.openai.com/v1/chat/completions"
OPENAI_APIKEY = "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"
JWT_SECRET = "yoursecretkey"
STRIPE_PUBLIC_KEY = "pk_test_51Ml43uJm2vMPXBBfJpBJLlYZYDaniI3qbpAkx5cqHakuqkRbQQIJ71gD3LL1oI4S3CiiImhFjfKpoMfqnOWgG0wF00zVRlQOvT"
STRIPE_SECRET_KEY = "sk_test_51Ml43uJm2vMPXBBfPBKnmLijGLwkMtJReVEpZd0foRz2pJW0N1D8xIt1ZmEAjUaiSgvFRc31VVb4tm6eYMbdwIt300IGfq0hVW"
STRIPE_PRODUCT_ID = "price_1Ml4JRJm2vMPXBBf8YgX4Aqa"
STRIPE_PAYMENT_URL = "https://buy.stripe.com/test_eVa6rM8swblAely7ss"
STRIPE_WEBHOOK_SECRET="whsec_922b28be924e2fd32046447000ffe15a1682d42105321c491bd124f31cdb33d4"
```

### Create .aws/credentials

Send emails to user's email address using AWS SES. To use this function. 
- make sure to add .aws/credentials with valid AWS credentials in credentials file at the root of this project.
- .aws is a folder at the root. 
- credentials file does not have a file extension. 
- Paste the following AWS credentials with exact format into credentials file and save. 

```
Refer to group chat notice for keys
```

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

### ESLint fix

```
npm run lint -- --fix
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

- 2.0 Additional functions

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
- Zizhen Luo zizhenluo2328@gmail.com
- Hai Yang leoyh.97@gmail.com
- Haixin Zhang haixin.zhang.777@gmail.com

## License

This project is licensed under the ISC License - see the LICENSE.md file for details
