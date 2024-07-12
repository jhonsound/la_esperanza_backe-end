FROM node:22.2.0-alpine

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Expose the port on which the app will run
EXPOSE 4000

ENV DATA_BASE_USERNAME=${DATA_BASE_USERNAME}
ENV DATA_BASE_HOST=${DATA_BASE_HOST}
ENV DATA_BASE_HOST_PASSWORD=${DATA_BASE_HOST_PASSWORD}
ENV DATA_BASE_NAME=${DATA_BASE_NAME}


# Start the server using the production build
CMD ["npm", "run", "start:prod"]