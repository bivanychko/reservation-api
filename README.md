# reservation-api

### Env vars
APP_PORT=3000

DB_HOST=localhost

DB_PORT=5432

DB_USERNAME=postgres

DB_PASSWORD=postgres

DB_NAME=reservation_api

If you want override default env vars please add .env file in the root dir
### Docker
Yes
### Postman
Yes. Swagger docs are available under `/docs` path. Also repository contain postman collection in the `./postman` dir
### Setup and run
Step 1 Ensure you have installed postgres and created database

Step 2 Create .env file or use default values

Step 3 `npm install`

Step 4 Run migrations `npm run migration:run`

Step 5 Run seeds `npm run seed:run`

Step 6 Run application `npm run start`
