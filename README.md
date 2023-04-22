# CIWGO - Chatgpt IELTS Writing GO

## Getting Started

### Installing

- Install all needed Dependencies

```
npm ci
```

- Register MongoDB Atlas and install MongoDB for VS Code extension

### Create .env Variables

Create a file named .env under project root folder and paste the following into this file.

```
PORT = 3005
FRONT_END="http://localhost:3000"
CONNECTION_STRING = <Your connection string from MongoDB>
COLLECTION_NAME = <Collection name>
OPENAI_APIURL = <API Address>
OPENAI_APIKEY = <API Key>
JWT_SECRET = <Your secret key>
STRIPE_PUBLIC_KEY = <Your stripe public key>
STRIPE_SECRET_KEY = <Your stripe secret key>
STRIPE_PRODUCT_ID = <Your stripe product id>
STRIPE_PAYMENT_URL = <Your stripe payment url>
STRIPE_WEBHOOK_SECRET= <Your stripe webhook secret>
```

### Create .aws/credentials

Send emails to user's email address using AWS SES. To use this function. 
- make sure to add .aws/credentials with valid AWS credentials in credentials file at the root of this project.
- .aws is a folder at the root. 
- credentials file does not have a file extension. 
- Paste the following AWS credentials with exact format into credentials file and save. 

### Executing program

- Run the project

```
npm start
```

- DEV modal

```
npm run dev
```

- Stop running

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
<Your mongoDB connection string>
```

## OpenAI URL and APIKey

```
<OpenAI API URL>
```

```
<OpenAI API KEY>
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

This project is licensed under the MIT License - see the LICENSE.md file for details
