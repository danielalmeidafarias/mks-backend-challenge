FROM node:22-alpine3.18

WORKDIR /app

EXPOSE 3000

COPY package*.json .

RUN npm install

COPY . .

RUN apk add curl

ENV SERVER_HOST=http://localhost:3000 \
    DB_HOST=db \
    DB_USERNAME=root \
    DB_PASSWORD=root \
    DB_NAME=postgres \
    DB_ADMIN_EMAIL=root@root.com \
    JWT_SECRET_KEY="chave ultra mega secreta 2348" \
    JWT_SECRET_REDIRECT="chave muito secreta para redirecionamento do usuário" \
    PORT=3000

RUN npm run build

CMD [ "npm", "run", "start:prod" ]
