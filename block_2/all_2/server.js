

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

	app.get('/search', (req, res) => {

        var value = req.body.q;
	console.log(value);
	       db.collection('brands').find().skip(1).limit(7)
	       .then(sales => {

	         db.collection('brands').find({"name":value})
	           .then(prods => {

	           res.render('search', {
	             prods: prods,
	     				sales: sales,
	             count: count

	           });
	         });


	      				})
	             .catch(err => res.status(500).end(err));

	      });


app.post('/deleteprod', (req, res) => {
	var name = req.body.prtitle;
  var id= req.body.prid;

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
						staf: staf,
						cost: cost,
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



////////////////////////////////////////////////////////////////////
///////////////////////JSON////////////////////////////////////////

app.get('/apiadd', (req, res) => {
	db.collection('prod').find().skip(5).limit(7)
	.then(sales => res.json(sales))
	 .catch(err => res.status(404).json({ error: err }));
});

   app.post('/apiaddtocart', (req, res) => {
  	var title = req.body.prtitle;
    var id= req.body.prid;
  	if (!title || ! id){
		res.json({'error':'need login'})
	   }
  	  db.collection('users').find({"identef": parseInt(id)})
		  .then(user => res.json(user))
	 });

	app.post('/apiaddtolist', (req, res) => {
	  	var title = req.body.prtitle;
	   var id= req.body.prid;
		 if (!title || ! id){
			res.json({'error':'need login'})
		 }
		 db.collection('users').find({"identef": parseInt(id)})
			 .then(user => res.json(user))
	});

		app.post('/apiPadd', (req, res) => {
			var title = req.body.title;
			var color = req.body.color;
			var weight = req.body.weight;
			var guarantee = req.body.guarantee;
			var description = req.body.description;
			var lastprice = req.body.lastprice;
			var price = req.body.price;
			var type = req.body.type;
			var brand = req.body.brand;
			var admEmail = req.body.email;
			var admpass = req.body.password;


			if (!title || !color || !brand || !price || !lastprice || !type || !weight || !description || !guarantee ) res.status(400).json({"error": "empty field"});
			else {
				db.collection('prod').findOne({ title: title})
					.then(prod => {
						if (prod) res.status(200).json({"error": "prod exists"});
						else {


							db.collection('prod').insert({
								title: title,
								color: color,
								weight: weight,
								guarantee: guarantee,
								description: description,
								price: price,
								lastprice: lastprice,
								type:type,
								brand: brand,
								avatar1: base64String1,
								avatar2: base64String2,
								avatar3: base64String3,
								avatar4: base64String4,
								href: hrefProd
							});
						}
					})
					.then(prod => res.json(prod))
					/*	db.collection('prod').find().skip(1).limit(7)
						.then(sales => res.json(sales))*/
						.catch(err => res.status(404).json({ error: err }));
			}
		});

	app.get('/api', (req, res) => {
			db.collection('prod').find()
				.then(prod => res.json(prod))
				/*	db.collection('prod').find().skip(1).limit(7)
					.then(sales => res.json(sales))*/
					.catch(err => res.status(404).json({ error: err }));
				})






///////////////////////JSON////////////////////////////////////////
////////////////////////////////////////////////////////////////////


const apiRouter = express.Router();

 app.get('/api/brands/:brand_name', (req, res) => {
   db.collection('brands').findOne({ 'name': req.params.brand_name }).exec()
  	 .then(brands => res.json(brands));
});
apiRouter.post('/brands', (req, res) => {
   // @todo get new film data from request and insert it into db
   res.json({ response: 1 });
});
apiRouter.put('/brands/:brand_name', (req, res) => {
   // @todo get film data from request and update existing film
   res.json({ response: 1 });
});
apiRouter.delete('/brands/:brand_name', (req, res) => {
    db.collection('brands').remove({ 'name': req.params.brand_name })
  	 .then(result => {
  		 if (result.result.n === 0) return Promise.reject('Not found');
  		 else res.json(result);
  	 })
  	 .catch(err => res.status(404).json({ error: err }));
});
app.use('/api', apiRouter);











require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./config/passport')(passport); // pass passport for configuration


app.listen(8000, () => console.log('App started.'));
