

# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# ARG from build
ARG CONNECTION
ARG OPENAI
ARG STRIPE
ARG STRIPE_W

# ENV 
ENV PORT=3005
ENV FRONT_END="https://wrigo.com.au"
ENV CIW_COLLECTION_NAME=CIWGO
ENV OPENAI_APIURL=https://api.openai.com/v1/chat/completions
ENV JWT_SECRET=yoursecretkey
ENV STRIPE_PUBLIC_KEY=pk_test_51Ml43uJm2vMPXBBfJpBJLlYZYDaniI3qbpAkx5cqHakuqkRbQQIJ71gD3LL1oI4S3CiiImhFjfKpoMfqnOWgG0wF00zVRlQOvT
ENV STRIPE_PRODUCT_ID=price_1Ml4JRJm2vMPXBBf8YgX4Aqa
ENV STRIPE_PAYMENT_URL=https://buy.stripe.com/test_eVa6rM8swblAely7ss

ENV CONNECTION_STRING=$CONNECTION
ENV OPENAI_APIKEY=$OPENAI
ENV STRIPE_SECRET_KEY=$STRIPE
ENV STRIPE_WEBHOOK_SECRET=$STRIPE_W

# Set the working directory to /app
WORKDIR /app

# Copy the application code into the container
COPY . .

# Install dependencies
RUN npm install

# Expose port 3005
EXPOSE 3005

# Set the entrypoint for the container
ENTRYPOINT [ "npm", "start" ]
