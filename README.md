## Needed
1. [NodeJS](https://nodejs.org/)
2. [PostgreSQL](https://www.postgresql.org/)
3. A dependencies manager like [yarn](https://classic.yarnpkg.com/) or `npm` (installed by default with `NodeJS`)

## Installation
1. Create a .env file in the project's root folder with the following:
```
DB_NAME=your_db_name
DB_HOST=your_db_host
DB_PORT=your_db_port
DB_USER_NAME=your_db_user_name
DB_USER_PASS=your_db_user_password
```
### Creating the DB (on Windows)
2. Open `SQL Shell (psql)` and log in using the above information and run the following:
```
$ CREATE DATABASE `your_db_name`;
```
### Creating the DB (on Linux)
2. Run the following:
```
$ sudo -u postgres psql

postgres=# CREATE DATABASE `your_db_name`;

postgres=# CREATE USER `your_db_user_name` WITH ENCRYPTED PASSWORD `your_db_user_password`;

postgres=# GRANT ALL PRIVILEGES ON DATABASE `your_db_name` TO `your_db_user_name`;
```
3. That should be it for the database stuff.
4. Now install all the project dependencies by running the following command in the root folder:
```bash 
$ yarn install # or npm install
```
## Optional
5. There's a Postman Collection file in the project's root folder with you can open with [Postman](https://www.postman.com/) for learning how to interact with the API

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
