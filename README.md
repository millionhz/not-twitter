# Not Twitter

## Extensions

- Babel Javascript by Michael McDermott
- ESLint by Microsoft
- Prettier - Code formatter by Prettier

## Install Dependencies

### Server

```bash
cd ./server && npm i -D
```

### Client

```bash
cd ./client && npm i -D
```

## Run

### Server (with live reload)

```bash
cd ./server && npm run dev
```

### Server (without live reload)

```bash
cd ./server && npm start
```

### Client (standalone with live reload)

```bash
cd ./client && npm start
```

### Client (with server and live reload)

```bash
cd ./client && npm run dev
```

## Environment Variables

The following is the schema for the environment variables used in the server.

| Variable Name | Description |
| --- | --- |
| DB_HOST | The hostname of the database server. |
| DB_USER | The username to authenticate with the database. |
| DB_PASS | The password to authenticate with the database. |
| DB_PORT | The port on which the database server is listening. |
| DB_NAME | The name of the database to connect to. |
| JWT_SECRET | The secret key used to sign JSON Web Tokens for authentication. |
