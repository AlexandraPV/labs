

const mongodb = require('promised-mongo');
const url = 'mongodb://localhost:27017/Br';
const db = mongodb(url);
var express  = require('express');
var app      = express();

module.exports = function(app, passport) {

   app.get('/', function(req, res) {
        res.render('index.ejs');
    });
    app.get('/login', function(req, res) {

      db.collection('brands').find().skip(2).limit(7)
     .then(sales => {
     res.render('login.ejs',{
       sales:sales
     });
       })
    });


    app.get('/signup', function(req, res) {

      db.collection('brands').find().skip(4).limit(7)
    	.then(sales => {
    	res.render('signup.ejs',{
    		sales:sales
    	});
    		})


    });


    app.get('/update', isLoggedIn, function(req, res) {
      db.collection('brands').find().skip(4).limit(7)
      .then(sales => {
      res.render('update.ejs',{
        sales:sales,
        user : req.user
      });
        })
     });


    app.get('/products/*',isLoggedIn, (req, res) => {
    	var decrease = req.path;
      decrease = decrease.slice(10);
      var uri_dec = decodeURIComponent(decrease);

    	db.collection('brands').findOne({ href: uri_dec})
    		.then(prod => {
    			db.collection('brands').find().skip(5).limit(7)
    			.then(sales => {

    			res.render('prod', {
    				prod: prod,
            sales: sales,

            user : req.user
    			});
    			})

    		})

    		.catch(err => res.status(500).end(err));

      });


      app.get('/propag*', isLoggedIn, (req, res) => {
        var decrease = req.path;
        decrease = decrease.slice(7);
        var i = parseInt(decrease);
      db.collection('brands').count()
        .then(count => {
      db.collection('brands').find().skip(0+i*9).limit(9+i*9)
          .then(prods => {
      db.collection('brands').find().skip(4).limit(7)
          .then(sales => {

            res.render('products', {
              search_value: "",
              sales: sales,
              count: count,
              prods: prods,
              href_add:'addprod',
              user : req.user
            //	user : req.user
            });
            })
          })
          .catch(err => res.status(500).end(err));
        });

      });


app.get('/products',isLoggedIn, (req, res) => {
	db.collection('brands').find().limit(9)
		.then(prods => {
			db.collection('brands').find().skip(1).limit(7)
			.then(sales => {
        db.collection('brands').count()
          .then(count => {
			res.render('products', {
				prods: prods,
				sales: sales,
        count: count,
        search_value: "",
				user : req.user
			});
				})
        	})
		})

		.catch(err => res.status(500).end(err));

});


app.get('/profile', isLoggedIn, function(req, res) {
      db.collection('brands').find().skip(1).limit(7)
      .then(sales => {
      res.render('profile.ejs',{
        sales:sales,
        user : req.user
      });
        })
    });



    app.get('/list',isLoggedIn, (req, res) => {
    	db.collection('users').find().limit(9)
    		.then(prods => {
    			db.collection('brands').find().skip(1).limit(7)
    			.then(sales => {
            db.collection('users').count()
              .then(count => {
    			res.render('list', {
    				prods: prods,
    				sales: sales,
            count: count,
    				user : req.user
    			});
    				})
            	})
    		})

    		.catch(err => res.status(500).end(err));

    });



     ////////////////////////////////////////////////////////////////////
     ///////////////////////JSON////////////////////////////////////////





      app.get('/apiprofile', isLoggedIn, function(req, res) {
        var  user = req.user;
          if (!user){
      			res.json({'error':'need login'})
      		}
      	else{	db.collection('users').find({"identef": parseInt(user.identef)})
      			 .then(users => res.json(users))
           }
        });

      app.get('/apiproducts',isLoggedIn, (req, res) => {
        	db.collection('brands').find()
            .then(brand => res.json(brand))
            /*	db.collection('prod').find().skip(1).limit(7)
              .then(sales => res.json(sales))*/
              .catch(err => res.status(404).json({ error: err }));
        		})

        ///////////////////////JSON////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////



    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/login');
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup',
        failureFlash : true
    }));
    app.post('/login', passport.authenticate('local-login', {
          successRedirect : '/profile',
          failureRedirect : '/login',
          failureFlash : true
      }));


};



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}
