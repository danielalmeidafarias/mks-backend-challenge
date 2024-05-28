## Prerequisites

### git
- https://git-scm.com/downloads

### nvm and node:
- https://nodejs.org/en/download

### docker: 
- https://www.docker.com/get-started/

### pm2 (for production only)
```bash
  $ npm install -g pm2  
```

## Clone this repository 
```bash
  $ git clone https://github.com/danielalmeidafarias/mks-backend-challenge.git
```

## Create your .env file in root folder and give it values
```
  DB_HOST=your db host
  DB_USERNAME=your db username
  DB_PASSWORD=your db password
  DB_NAME=your db name
  JWT_SECRET_KEY="a secret key for jwt"
  JWT_SECRET_REDIRECT="another one"
  SERVER_HOST=where your application is running (localhost:3000 if its in development)
```

## Initializing db and redis
```bash
$ docker compose up -d
```
* obs: Make sure ports 5432, 6379 and 8081 are free. If it's not, you can modify your compose.yml file

## Installation
```bash
$ npm install
```

## Running the app

1. Development
```bash
$ npm run start:dev
```
2. Production
```bash
# production mode
$ npm install -g pm2
$ npm run build
$ pm2 run dist/main.js
```

## Docs
1. access https://vercelapimovies-danielalmeidafarias-projects.vercel.app/api/api
3. or access postman documentation https://documenter.getpostman.com/view/32616533/2sA3JQ5zsj
4. or run it locally and access http://localhost:3000/api
