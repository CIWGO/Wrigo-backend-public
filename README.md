# Wrigo - Your IELTS Writing AI partner

Introducing our innovative language training and assessment platform – designed to revolutionise the way you prepare for IELTS Writing Task 2. Harnessing the power of ChatGPT and its capability of Natural Language Processing, our platform addresses the challenges faced by test-takers in accessing accurate, efficient, and budget-friendly feedback for their IELTS essays.

# Features

1. **AI-Powered Grading**: Say goodbye to subjective scoring and lengthy waiting periods! Our advanced AI technology accurately grades your IELTS writing tasks in real-time, providing you with immediate feedback on your performance. Experience consistent and reliable assessment that's comparable to expert human graders, without the wait.
2. **In-depth Evaluation & Feedback**: Understand your strengths and areas for improvement with our comprehensive evaluation and personalised feedback. Our AI Writing Assistant not only identifies key issues in your writing but also provides clear and actionable guidance on how to enhance your essays. Improve your writing skills faster and more effectively than ever before.
3. **Intelligent Grammar Fix**: Eliminate errors and polish your writing with our intelligent grammar fix. The AI Writing Assistant detects and corrects grammar, punctuation, and spelling mistakes while also suggesting improvements in word choice and sentence structure. Impress the examiners with flawless, high-quality essays.
4. **Writing Sample Generation**: Need inspiration or guidance on how to approach a specific topic? Our AI-powered Writing Sample Generation feature provides you with high-quality writing samples, tailor-made for your chosen topic. Learn from the best and adopt winning strategies to craft essays that stand out.
5. **Topic Library**: Stay ahead of the curve with our user-driven Topic Library! Access a wide range of IELTS writing topics, uploaded by fellow students to reflect the popularity of subjects in recent exam sessions. Familiarise yourself with diverse themes and be prepared for any topic that comes your way.
6. **Writing Performance Analytics**: Track your progress and unlock your full potential with our advanced Writing Performance Analytics. Gain insights into your performance trends, identify recurring patterns, and monitor improvements over time. Set goals, stay motivated, and achieve your desired IELTS writing score.
7. **Other Supporting Features:** Landing Page, User Registration and Authentication, Email Notification, Search, Wrigo Infinite Membership Subscription, and Stripe-based Payment

## Getting Started

### Frontend

https://github.com/CIWGO/Wrigo-frontend-public

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

- 1.0 MVP
- 1.1 Payment Integration
- 1.2 Functional Demo

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
