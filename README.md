# vue-express-ws-mongo-boilerplate
A web app to ...

## Download project
```sh
git clone https://gogs.univ-littoral.fr/Prise3D/Antoine_Internship.git
cd Antoine_Internship
```

## Run as a Docker instance
### Configure
Use the following environment variables to configure the application.

| Option      | Default value | Description | Server | Client |
| ----------- | ------------- | ----------- | :------: | :------: |
| `PORT` | `5000` | The port used by the started application |  ✅  | ✅ |
| `SERVE_CLIENT` | `true` | Should the server serve client (Fully local application) |  ✅  | ⬜️ |
| `MONGO_URI` | `mongodb://localhost/webexpe` | MongoDB database connection URI |  ✅  | ⬜️ |
| `SECRET` | `my-secret` | The users' sessions secret |

Configure more deeply the way the app works by modifying *[config.js](config.js)*.

| Option      | Default value | Description |
| ----------- | ------------- | ----------- |
| `apiPrefix` | `/api` | The url prefix for the API |
| `serverPort` | `5000` | The port used by the server |
| `mongoDatabaseURI` | `mongodb://localhost/webexpe` | MongoDB database connection URI |
| `serveClient` | `true` | Should the server serve client files from the `/dist` directory |
| `sessionSecret` | `my-secret` | The users' sessions secret |
| `logger` | Logs : `logs/server.combined.log` Errors : `logs/server.error.log` | Default application logger |
| `wsLogger` | Logs : `logs/ws.log` Errors : `logs/ws.error.log` | WebSocket logger configuration |
| `dbLogger` | Logs : `logs/db.log` Errors : `logs/db.error.log` | Database logger configuration |

### Run server + client
Linux
```sh
PORT=8080 SERVE_CLIENT=true docker-compose up
```
Windows
```bat
SET PORT=8080
SET SERVE_CLIENT=true
docker-compose up
```

### Run server only
Linux
```sh
SERVE_CLIENT=false docker-compose up
```
Windows
```bat
SET SERVE_CLIENT=false
docker-compose up
```

### Run client only
```sh
docker-compose -f docker-compose.frontapp_only.yml up
```

### Notice
#### New version Docker build
When using a new version of the project, you need to re-build the application with Docker.
```sh
# Server / Server + client versions
docker-compose build

# Client only version
docker-compose -f docker-compose.frontapp_only.yml build
```

#### Docker instance on a Windows host
As of now, **Windows hosts are not supported** due to MongoDB volumes not being mappable to this system.

## Run on the file system
### Project setup
Install project's dependencies.
```
yarn install
```

If this is a production build, set the `NODE_ENV` environment variable to `production` to enhance performance.

Linux
```sh
export NODE_ENV=production
```
Windows
```bat
SET NODE_ENV=production
```

### API
#### Run the server
```sh
yarn run server:start
```

#### Run a server with hot-reload for server development
```sh
yarn run server:dev
```

#### Automatically fix the API code syntax with ESLint
```sh
yarn run server:lint
```


### Client
#### Compile and minify for production
Files will be built to the `dist/` directory.
```sh
yarn run app:build
```

#### Run a hot-reload server for client development
```sh
yarn run app:dev
```


#### Automatically fix the client code syntax with ESLint
```sh
yarn run app:lint
```

## License
[The MIT license](LICENSE)
