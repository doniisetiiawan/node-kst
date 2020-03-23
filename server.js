import express from 'express';

const app = express();

const hasName = (req, res, next) => {
  if (req.param('name')) {
    next();
  } else {
    res.send('What is you name?');
  }
};

// eslint-disable-next-line no-unused-vars
const sayHello = (req, res, next) => {
  res.send(`Hello ${req.param('name')}`);
};

app.get('/', hasName, sayHello);

app.listen(3000);

console.log('Server running at http://localhost:3000/');

export default app;
