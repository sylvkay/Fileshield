# Fileshield
Enhancing cloud security through the implementation of a zero-trust architecture.

## Postman documentation.

Postman Backend API Documentation Here:
https://documenter.getpostman.com/view/9070802/2sA35LX194


## Installation.
- before you install the project, make sure you have the following installed on your machine:
   - Node.js
   - Postgres SQL
   
- Clone the repository to your local machine.
```
$ git clone ""
```

- Change directory into the project directory.
```
$ cd fileshield
```

- Install all dependencies.
```
$ npm install
```

- Create a `.env` file in the root directory of only server folder. add the following environment variables using the given `.env-example`.
```
NODE_ENV=development
DB_USER=postgres
DB_HOST=localhost
DB_NAME=fileshield
DB_PASSWORD=""
DB_PORT=5432
FIREBASE_ACCESS_KEY=""
FIREBASE_SECRET_KEY=""
FIREBASE_STORAGE_BUCKET=""
SECRET_KEY=""
```

- Run the following command to create the database tables.
in the init.sql contains the SQL commands to create the tables.

```
$ psql -U postgres -f init.sql
```

- Start the server and the client .
```
$ npm run dev
```
