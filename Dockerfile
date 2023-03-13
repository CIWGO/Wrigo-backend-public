

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
