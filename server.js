import connect from 'connect';

const app = connect();

// eslint-disable-next-line no-unused-vars
const helloWorld = (req, res, next) => {
  res.setHeader('Content-Type', 'text/plain');

  res.end('Hello World');
};

app.use(helloWorld);

app.listen(3000);

console.log('Server running at http://localhost:3000/');
