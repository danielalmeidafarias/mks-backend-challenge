## Prerequisites

### Git
- https://git-scm.com/downloads

### nvm and node:
- https://nodejs.org/en/download

### docker: 
- https://www.docker.com/get-started/

### Clone this repository 
```bash
  $ git clone https://github.com/danielalmeidafarias/mks-backend-challenge.git
```

### Create your .env file in root folder:
```
  DB_HOST=""
  DB_USERNAME=""
  DB_PASSWORD=""
  DB_NAME=
  JWT_SECRET_KEY=""
  JWT_SECRET_REDIRECT=""
  SERVER_HOST=""
```

### Initializing db and redis
```bash
$ docker compose up -d
```
* obs: 
  - Make sure ports 5432, 6379 and 8081 are free
  - If it's not, you can modify your docker-compose.yaml file

## Instaling pm2(for production only)
```bash
  $ npm install -g pm2  
```

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

