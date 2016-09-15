const express = require('express');
const _ = require('lodash');
const cors = require('cors');
const papa = require('babyparse');
const fetch = require('node-fetch');

const tools = require('./tools');

const webServer = express();
webServer.use(cors());
webServer.get('/', (req,res) => {
	fetchSpreadsheet(req.query.id)
	.then((result) => res.send(JSON.stringify(result)));
});

webServer.listen(process.env.PORT || 8081);

const getUrl = (id) => ( 'https://docs.google.com/spreadsheets/d/' + id + '/pub?output=csv');
//	1OgDtJt_hsVKOz03E59BV-HASxqv2eGiuL__KEQMaLT4

const makePapa = (text) => papa.parse(text, {
			config: {
				header:true,
			},
		});

const fetchSpreadsheet = (id) => {
	return Promise.resolve(id)
	.then(getUrl)
	.then(fetch)
	.then((result) => result.text())
	.then(makePapa)
}
