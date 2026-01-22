FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install          # installs devDependencies too

COPY . .

RUN npm run build        # produces dist/server.js

EXPOSE 3000
CMD ["npm", "start"]
