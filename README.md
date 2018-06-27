# Crypto-bot

A simple crypto bot in testing mode for now

## Usage

```bash
$ git clone https://github.com/alex16nba/crypto-bot.git
$ cd crypto-bot
$ npm install
$ cp backend/config/environments/example.js backend/config/environments/development.js
```

Modify the environment specific configuration file accordingly.

To run the server us the following command, by default the server will run in development mode:

```bash
$ node server.js
```

### App

The main application folder containing all the server files, based on MVC structure.

_Note that `models` and `routes` are not mounted automatically, you need to wire them manually, to reduce unwanted logic getting into production, read below for more info._

- **controllers**: mostly will contain back-end business logic.
- **models**: this is where you store all Mongoose models. To include a model see `config/models.js` file.
- **routes**: Express routes will be found here. To include a route please see `config/routes.js` file.
- **helpers**: helper functions used in the whole application, mainly units that can be tested stand-alone.
- **middlewares**: mountable business logic on routes, connect style middleware.

### config

The config folder contains files which configure different application parts. Also you can find some special folders:

- **environments**: environment specific configuration files.

## License
