import express from './config/express';
import mongoose from './config/mongoose';
import passport from './config/passport';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

mongoose();
const app = express();
passport();

app.listen(3000);

console.log('Server running at http://localhost:3000/');

export default app;
