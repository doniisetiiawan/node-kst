import connect from 'connect';

const app = connect();

const logger = (req, res, next) => {
  console.log(req.method, req.url);

  next();
};

// eslint-disable-next-line no-unused-vars
const helloWorld = (req, res, next) => {
  res.setHeader('Content-Type', 'text/plain');

  res.end('Hello World');
};

app.use(logger);

app.use(helloWorld);

app.listen(3000);

console.log('Server running at http://localhost:3000/');
