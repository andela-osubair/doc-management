// This will be our application entry. We'll setup our server here.
// import http from 'http';
import webpack from 'webpack';
import path from 'path';
import open from 'open';
import app from '../server/app'; // The express app we just created
import config from '../webpack.config.dev';

const port = parseInt(process.env.PORT, 10) || 8080;
// app.set('port', port);
//
// const server = http.createServer(app);
// server.listen(port);
//
// export default server;

/* eslint-disable no-console */

// const port = 5000;
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else if(process.env.NODE_ENV !== 'test') {
    open(`http://localhost:${port}`);
  }
});

export default app;
