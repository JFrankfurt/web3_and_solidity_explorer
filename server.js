require('dotenv').config();
const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');

const apiRouter = require('./api/index');
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();
    server.use(bodyParser.json()); // for parsing application/json
    server.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    server.use('/api', apiRouter)
      .get('*', handle)
      .listen(process.env.PORT || 3001, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${process.env.PORT || 3001}`);
      });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });