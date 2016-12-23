

var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');


mongoose.connect(configDB.url);



app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'ejs');


app.use(session({ secret: 'appallowpasstook' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



const mongodb = require('promised-mongo');
var path = require('path');

const busboyBodyParser = require('busboy-body-parser');

const url = 'mongodb://localhost:27017/Br';
const db = mongodb(url);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(busboyBodyParser({ limit: '5mb' }));
app.use(express.static(path.join(__dirname, 'design')));
const salt = '%656_das9870';




app.get('/add', (req, res) => {
	db.collection('brands').find().skip(5).limit(7)
	.then(sales => {
	res.render('add',{
		sales:sales
	});
		})
	});





app.post('/deleteprod', (req, res) => {
	var name = req.body.prtitle;
  var id= req.body.prid;
console.log(name);
	db.collection('users').find({"identef": parseInt(id)})
	.then(users => {

				db.collection('brands').remove({"name": name});
		})
		.then(() => res.redirect('/products'))
		.catch(err => res.status(500).end(err));

});


app.get('/', (req, res) => {

		db.collection('brands').find().limit(9)
		.then(prods => {
			db.collection('brands').find().skip(4).limit(7)
			.then(sales => {
				db.collection('brands').count()
					.then(count => {
			res.render('index', {
				sales: sales,
				prods: prods,
				count: count,
				href_add:'addprod',
			//	user : req.user
			});
			})
			})
		})
		.catch(err => res.status(500).end(err));
  });

app.post('/add', (req, res) => {
	var name = req.body.name;
	var founder = req.body.founder;
	var date = req.body.date;
	var staf = req.body.staf;
	var cost = req.body.cost;
	var avaFile1 = req.files.avatar1;

	var hrefProd = req.body.name;
var stafI = parseInt(staf);
var costI = parseFloat(cost);
	hrefProd = hrefProd.replace(/ /g, '').replace(/\//g, '');
	hrefProd= hrefProd.toLowerCase();
	var hrProd =( '/' + hrefProd);

	var base64String1 = avaFile1.data.toString('base64');

	if (!name || !founder || !date || !staf || !cost || !avaFile1 ) res.status(400).end('not ok');
	else {
		db.collection('brands').findOne({ name: name})
			.then(prod => {
				if (prod) res.status(200).end('prod exists');
				else {

					return db.collection('brands').insert({
						name: name,
						founder: founder,
						date: date,
						staf: stafI,
						cost: costI,
						avatar1: base64String1,

						href: hrefProd
					});
				}
			})
			.then(() => res.redirect('/products'))
			.catch(err => res.status(500).end(err));
	}
});

app.get('/pag*', (req, res) => {
	var decrease = req.path;
	decrease = decrease.slice(4);
	var i = parseInt(decrease);
db.collection('brands').count()
	.then(count => {
db.collection('brands').find().skip(0+i*9).limit(9+i*9)
		.then(prods => {
db.collection('brands').find().skip(4).limit(7)
		.then(sales => {

			res.render('index', {
				sales: sales,
				count: count,
				prods: prods,
				href_add:'addprod',
			//	user : req.user
			});
			})
		})
		.catch(err => res.status(500).end(err));
	});

});











require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./config/passport')(passport); // pass passport for configuration


app.listen(5000, () => console.log('App started.'));
