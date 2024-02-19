FROM node:18-alpine

WORKDIR /app

COPY package.json ./

COPY . .

RUN npm set strict-ssl false

RUN npm install ionic --loglevel verbose

# RUN process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

# RUN npx prisma migrate dev --name init

EXPOSE 3002

CMD [ "npm","run","start:dev" ]