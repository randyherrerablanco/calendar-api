FROM node:18-alpine

# Set app directory
WORKDIR /usr/src/app

# Copy dependencies and install
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Expose port and start
EXPOSE 3000
CMD ["npm", "start"]
