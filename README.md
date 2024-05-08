## Prerequisites

### Download and install docker: 
- https://www.docker.com/get-started/

### Create your .env file in root folder:

  SERVER_HOST=http://localhost:3000
  
  DB_HOST=localhost
  
  DB_USERNAME=your_postgres_user
  
  DB_PASSWORD=your_postgres_password
  
  DB_NAME=your_database_name
  
  JWT_SECRET_KEY=your_secret_key
  
  JWT_SECRET_REDIRECT=another_secret_key


### Initializing docker 

```bash
$ docker compose up -d
```
* obs: 
  - Make sure ports 5432, 6379 and 8081 are free
  - If it's not, you can modify your docker-compose.yaml file

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
