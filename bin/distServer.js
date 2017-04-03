import path from 'path';
import open from 'open';
import compression from 'compression';
import express from 'express';

import app from '../server/app'; // express server

/* eslint-disable no-console */

const port = 4000;

app.use(compression());
app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
