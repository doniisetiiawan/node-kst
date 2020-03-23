process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// eslint-disable-next-line global-require,import/no-dynamic-require
export default require(`./env/${process.env.NODE_ENV}.js`);
