const express = require('express');
const _ = require('lodash');
const cors = require('cors');

const tools = require('./tools');
const fetchSpreadsheet = tools.cacheFunction(require('./fetchSpreadsheet'), 1000*60);
//const fetchSpreadsheet = require('./fetchSpreadsheet');

const defaultResponse = {
	err: 'usage: http(s):\/\/host\/?id=google spreadsheet id'
};

const webServer = express();
webServer.use(cors());
webServer.get('/', (req,res) => 
	Promise.resolve(req.query.id)
	.then((id) => (id? fetchSpreadsheet(id) : defaultResponse))
	.then((result) => res.send(JSON.stringify(result)))
);

webServer.listen(process.env.PORT || 8081);
