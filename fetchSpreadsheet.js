const papa = require('babyparse');
const fetch = require('node-fetch');

const getUrl = (id) => ( 'https://docs.google.com/spreadsheets/d/' + id + '/pub?output=csv');
//  1OgDtJt_hsVKOz03E59BV-HASxqv2eGiuL__KEQMaLT4

const makePapa = (text) => papa.parse(text, {header:true});

const fetchSpreadsheet = (id) => {
  console.log('fetching', id);
  return Promise.resolve(id)
  .then(getUrl)
  .then(fetch)
  .then((result) => result.text())
  .then(makePapa);
};

module.exports = fetchSpreadsheet;
