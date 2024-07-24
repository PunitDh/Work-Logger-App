# Use the official Node.js image as the base image
FROM node:14 as build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy the client package.json
COPY client/package*.json ./client/

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the client app
RUN npm run build-client

# Serve the static files with an express server
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the backend and client build files
COPY . .
COPY --from=build /usr/src/app/client/build ./client/build

# Expose the port the app runs on
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
