# Wrigo - Your IELTS Writing AI partner

Introducing our innovative language training and assessment platform – designed to revolutionise the way you prepare for IELTS Writing Task 2. Harnessing the power of ChatGPT and its capability of Natural Language Processing, our platform addresses the challenges faced by test-takers in accessing accurate, efficient, and budget-friendly feedback for their IELTS essays.

Website: https://wrigo.com.au/

# Features

1. **AI-Powered Grading**: Say goodbye to subjective scoring and lengthy waiting periods! Our advanced AI technology accurately grades your IELTS writing tasks in real-time, providing you with immediate feedback on your performance. Experience consistent and reliable assessment that's comparable to expert human graders, without the wait.
2. **In-depth Evaluation & Feedback**: Understand your strengths and areas for improvement with our comprehensive evaluation and personalised feedback. Our AI Writing Assistant not only identifies key issues in your writing but also provides clear and actionable guidance on how to enhance your essays. Improve your writing skills faster and more effectively than ever before.
3. **Intelligent Grammar Fix**: Eliminate errors and polish your writing with our intelligent grammar fix. The AI Writing Assistant detects and corrects grammar, punctuation, and spelling mistakes while also suggesting improvements in word choice and sentence structure. Impress the examiners with flawless, high-quality essays.
4. **Writing Sample Generation**: Need inspiration or guidance on how to approach a specific topic? Our AI-powered Writing Sample Generation feature provides you with high-quality writing samples, tailor-made for your chosen topic. Learn from the best and adopt winning strategies to craft essays that stand out.
5. **Topic Library**: Stay ahead of the curve with our user-driven Topic Library! Access a wide range of IELTS writing topics, uploaded by fellow students to reflect the popularity of subjects in recent exam sessions. Familiarise yourself with diverse themes and be prepared for any topic that comes your way.
6. **Writing Performance Analytics**: Track your progress and unlock your full potential with our advanced Writing Performance Analytics. Gain insights into your performance trends, identify recurring patterns, and monitor improvements over time. Set goals, stay motivated, and achieve your desired IELTS writing score.
7. **Other Supporting Features:** Landing Page, User Registration and Authentication, Email Notification, Search, Wrigo Infinite Membership Subscription, and Stripe-based Payment

## Getting Started

### Frontend Repo

https://github.com/CIWGO/Wrigo-frontend-public

### Installing

- Install all needed Dependencies

```
npm ci
```

### Create .env Variables

Create a file named .env under project root folder and paste the following into this file. 
All fields are required for the app to run properly. 

```
PORT = 3005
FRONT_END="http://localhost:3000"
CONNECTION_STRING = <Your connection string from MongoDB>
COLLECTION_NAME = <Your Collection name>
OPENAI_APIURL = <Your API Address>
OPENAI_APIKEY = <Your API Key>
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

## Version History

- 1.0 MVP
- 1.1 Payment Integration
- 1.2 Functional Demo

## Author

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/leo4512">
        <img src="https://avatars.githubusercontent.com/u/91560230?s=400&v=4" width="160px;" alt="Leo4512"/>
        <br />
        <sub>
          <b>Leo4512</b>
        </sub>
      </a>
      <br />
      <sub>leoyh.97@gmail.com</sub>
    </td>
    <td align="center">
      <a href="https://github.com/HAIXIN-ZHANG">
        <img src="https://avatars.githubusercontent.com/u/54438591?v=4" width="160px;" alt="HAIXIN-ZHANG"/>
        <br />
        <sub>
          <b>HAIXIN-ZHANG</b>
        </sub>
      </a>
      <br />
      <sub>haixin.zhang.777@gmail.com</sub>
    </td>
    <td align="center">
      <a href="https://github.com/AlbertDontCry">
        <img src="https://avatars.githubusercontent.com/u/87565983?v=4" width="160px;" alt="AlbertDontCry"/>
        <br />
        <sub>
          <b>AlbertDontCry</b>
        </sub>
      </a>
      <br />
      <sub>yuzhiqiang3014@gmail.com</sub>
    </td>
    <td align="center">
      <a href="https://github.com/ArAmber">
        <img src="https://avatars.githubusercontent.com/u/108080055?v=4" width="160px;" alt="ArAmber"/>
        <br />
        <sub>
          <b>ArAmber</b>
        </sub>
      </a>
      <br />
      <sub>xurongnan307@gmail.com</sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/chang019">
        <img src="https://avatars.githubusercontent.com/u/100551405?v=4" width="160px;" alt="chang019"/>
        <br />
        <sub>
          <b>chang019</b>
        </sub>
      </a>
      <br />
      <sub>changwork19@hotmail.com</sub>
    </td>
    <td align="center">
      <a href="https://github.com/EricSherlockLi">
        <img src="https://avatars.githubusercontent.com/u/101853133?v=4" width="160px;" alt="EricSherlockLi"/>
        <br />
        <sub>
          <b>EricSherlockLi</b>
        </sub>
      </a>
      <br />
      <sub>helloleolee@hotmail.com</sub>
    </td>
    <td align="center">
      <a href="https://github.com/Ibis77">
        <img src="https://avatars.githubusercontent.com/u/111636455?v=4" width="160px;" alt="Ibis77"/>
        <br />
        <sub>
          <b>Ibis77</b>
        </sub>
      </a>
      <br />
      <sub>dl.world@hotmail.com</sub>
    </td>
    <td align="center">
      <a href="https://github.com/Reneezzzzz">
        <img src="https://avatars.githubusercontent.com/u/112042893?v=4" width="160px;" alt="Reneezzzzz"/>
        <br />
        <sub>
          <b>Reneezzzzz</b>
        </sub>
      </a>
      <br />
      <sub>xiaoruiz@utas.edu.au</sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/ShuchenWuu">
        <img src="https://avatars.githubusercontent.com/u/68723186?v=4" width="160px;" alt="ShuchenWuu"/>
        <br />
        <sub>
          <b>ShuchenWuu</b>
        </sub>
      </a>
      <br />
      <sub>wushuchen113@gmail.com</sub>
    </td>
    <td align="center">
      <a href="https://github.com/ZihanZhou21">
        <img src="https://avatars.githubusercontent.com/u/56948832?v=4" width="160px;" alt="ZihanZhou21"/>
        <br />
        <sub>
          <b>ZihanZhou21</b>
        </sub>
      </a>
      <br />
      <sub>zihanzhou1021@gmail.com</sub>
    </td>
    <td align="center">
      <a href="https://github.com/Z-Luo">
        <img src="https://avatars.githubusercontent.com/u/62637727?v=4" width="160px;" alt="Z-Luo"/>
        <br />
        <sub>
          <b>Z-Luo</b>
        </sub>
      </a>
      <br />
      <sub>zizhenluo2328@gmail.com</sub>
   </td>
   <td align="center">
      <a href="https://github.com/ZJOHN0821">
        <img src="https://avatars.githubusercontent.com/u/104768782?v=4" width="160px;" alt="ZJOHN0821"/>
        <br />
        <sub>
          <b>ZJOHN0821</b>
        </sub>
      </a>
      <br />
      <sub>zhouyinghe0821@gmail.com</sub>
   </td>
  </tr>
<table>

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
