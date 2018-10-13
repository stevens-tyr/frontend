const express = require('express');
const compression = require('compression');
const path = require('path');
const morgan = require('morgan');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackConfig = require('./webpack.config.js');
const routes = require('./api/routes/index.router');

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3000;
const app = express();

// Middleware galore
app.use(morgan('dev')); // logging
app.use(compression()); // gzip
app.use(express.json()); // process post json

if (isDev) {
  const compiler = webpack(webpackConfig);
  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler));
} else {
  // Send our compiled assests for dist
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

// Serve our static assets
app.use(express.static(path.join(__dirname, 'public')));
// Add API routes
app.use(routes);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🌋 Listening on port:`, PORT);
});
