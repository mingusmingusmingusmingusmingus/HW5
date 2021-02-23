// Express template.
let express = require('express');

let app = express();

// Handlebars template.
let handlebars = require('express-handlebars').create({defaultLayout:'main'});

// POST template.
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Handlebars template.
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 2020);

// GET route.
app.get('/', function(req, res){
  let requestParameters = [];
  for (let i in req.query){
    requestParameters.push({'name':i, 'value':req.query[i]})
  }

  let populatePage = {};
  populatePage.dataList = requestParameters;
  res.render('get.handlebars', populatePage);
});

// POST route.
app.post('/', function(req, res){
	let requestParameters = [];
	let requestType = req.getResponseHeader('Content-Type');

	// Check if request is via url encoded content.
	if (requestType == 'application/x-www-form-urlencoded'){
		for (let i in req.body){
			requestParameters.push({'urlName':i, 'urlValue':req.body[i]});
		};
	};

	// Check if request is via JSON encoded content.
	if (requestType == 'application/json'){
		for (let j in req.body){
			requestParameters.push({'jsonName':j, 'jsonValue':req.body[j]});
		};
	};

	let populatePage = {};
	populatePage.dataList = requestParameters;
	res.render('post.handlebars', populatePage);
});

app.use(function(req, res){
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.type('plain/text');
	res.status(500);
	res.send('500 - Server Error');
});