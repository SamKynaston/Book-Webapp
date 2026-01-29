FROM node:25-alpine

WORKDIR /app

COPY . .

WORKDIR /app/types
RUN npm install && npm run build

WORKDIR /app/backend
RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
