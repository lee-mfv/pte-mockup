import 'dotenv/config';
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const token = require('google-translate-token');
const translate = require('google-translate-api');

const app = express();

app.use(cors({ origin: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  token.get('Hello').then(res => {
    console.log('123123')
    console.log(res);
  });

  
  res.send('Hello World!');
});

app.post('/words2tokens', async (req, res) => {
  const words = req.body.words;
  const wordsArray = words.split('--');


  // translate('khái niệm', {to: 'en'}).then(res => {
  //   console.log(res);
  // }).catch(err => {
  //   console.error(err);
  // });

  translate('Ik spreek Engels', {to: 'en'}).then(res => {
    console.log(res.text);
    //=> I speak English
    console.log(res.from.language.iso);
    //=> nl
  }).catch(err => {
    console.error(err);
  });

  let data = [];
  await Promise.all(wordsArray.map(async word => {
    const result = await token.get(word);
    result.word = word;
    data.push(result);

    return word;
  }));

  return res.json({success: true, data: data});
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
