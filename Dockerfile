ARG CONNECTION_STRING
ARG PORT
ARG retryWrites
ARG CIW_COLLECTION_NAME
ARG OPENAI_APIURL
ARG OPENAI_APIKEY
ARG JWT_SECRET
ARG TEST_EMAIL
ARG TEST_EMAIL_PASSWORD

ENV CONNECTION_STRING=$CONNECTION_STRING
ENV PORT=$PORT
ENV retryWrites=$retryWrites
ENV CIW_COLLECTION_NAME=$CIW_COLLECTION_NAME
ENV OPENAI_APIURL=$OPENAI_APIURL
ENV OPENAI_APIKEY=$OPENAI_APIKEY
ENV JWT_SECRET=$JWT_SECRET
ENV TEST_EMAIL=$TEST_EMAIL
ENV TEST_EMAIL_PASSWORD=$TEST_EMAIL_PASSWORD

# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code into the container
COPY . .

# Expose port 3005
EXPOSE 3005

# Set the entrypoint for the container
ENTRYPOINT [ "npm", "start" ]
