/* eslint-disable no-console */
import express from 'express';
import fs from 'fs';
import util from 'util';

const exec = util.promisify(require('child_process').exec);

const app = express();

app.get('/', (request, response) => response.send('🤷‍♀'));

app.get('/download/test.bin', async (req, res) => {
  if (!fs.existsSync('test.bin')) {
    await exec('dd if=/dev/zero of=test.bin bs=100M count=1');
  }

  const stats = fs.statSync('test.bin');

  res.attachment('test.bin');
  res.setHeader('Content-Length', stats.size);
  res.setHeader('Content-Type', 'application/binary');

  fs.createReadStream('test.bin').pipe(res);
});

app.listen(process.env.PORT || 3000, () => console.log('server up and running'));
