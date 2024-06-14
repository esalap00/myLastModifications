# Use debian as a base image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy the whole app
COPY . .

# Install git
RUN apk add git

# Preinstall any dependencies
RUN npm install

# Start the app, with the newest source code
ENTRYPOINT ["sh", "-c", "git pull && npm prune && npm install && npm run start"]