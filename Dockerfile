FROM node:latest

WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps

RUN npm run prepare

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]