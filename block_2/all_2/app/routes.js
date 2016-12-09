

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

      app.get('/search',isLoggedIn, (req, res) => {

            var value = req.url;
            value = value.slice(10);
            var bar = value.slice(0, 1).toUpperCase() +  value.slice(1);
      console.log(value);
             db.collection('brands').find().skip(1).limit(7)
             .then(sales => {

               db.collection('brands').find({name:{'$regex': '.*' + value + '.*', '$options': '$i'}})
                 .then(prods => {
                   db.collection('brands').count()
                    .then(count => {
                 res.render('search', {
                   value: value,
                   prods: prods,
                   sales: sales,
                   user : req.user,
                   count: count
      });
                 });
               });
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








        app.delete('/apiproducts/*', function(req, res, next) {
          var value = req.url;
          value = value.slice(13);
          var bar = value.slice(0, 1).toUpperCase() +  value.slice(1);
      //  var name = req.params.brand_name;
        console.log(bar)
        db.collection('brands').findOne({ 'name': bar})
      .then(brand =>
       db.collection('brands').remove({ 'name': bar})
       .then(del =>
        res.json(brand)))
      .catch(err => res.status(404).json({ error: "ERROR" }));

        });


        app.get('/apiproducts/*', function(req, res, next) {
          var value = req.url;
          value = value.slice(13);
          var bar = value.slice(0, 1).toUpperCase() +  value.slice(1);
        //  var name = req.params.brand_name;
        console.log(bar)
        db.collection('brands').findOne({ 'name': bar})
        .then(brand =>res.json(brand))
        .catch(err => res.status(404).json({ error: "ERROR" }));

        });

        app.post('/apiproducts/*', function(req, res, next) {
          var value = req.url;
          value = value.slice(13);
          var bar = value.slice(0, 1).toUpperCase() +  value.slice(1);
          var space = '/';
          var mas = [];
          mas = bar.split("/");
          var stafI = parseInt(mas[3]);
          var costI = parseFloat(mas[4]);
          //var mas = [];
          //mas = splitString(bar, space);
        //  var name = req.params.brand_name;
        var hrefProd = mas[0];
        hrefProd = hrefProd.replace(/ /g, '').replace(/\//g, '');
        hrefProd= hrefProd.toLowerCase();
        var hrProd =( '/' + hrefProd);
        console.log(mas)
        db.collection('brands').insert({
          name: mas[0],
          founder: mas[1],
          date: mas[2],
          staf: stafI,
          cost: costI,
          avatar1: "img",
          href: hrefProd
        })
        .then(brand =>res.json(brand))
        .catch(err => res.status(404).json({ error: "ERROR" }));

        });


        app.get('/apiproductsfiltr/*', function(req, res, next) {
          var value = req.url;
          value = value.slice(18);

          var space = '/';
          var mas = [];

          mas = value.split("/");

          if(mas[0] == "name"){

            db.collection('brands').find({name:{'$regex': '.*' + mas[1] + '.*', '$options': '$i'}})
              .then(brand =>res.json(brand))
                .catch(err => res.status(404).json({ error: "ERROR" }));
          }
          if(mas[0] == "founder"){
            db.collection('brands').find({founder:{'$regex': '.*' + mas[1] + '.*', '$options': '$i'}})
              .then(brand =>res.json(brand))
                .catch(err => res.status(404).json({ error: "ERROR" }));
          }
          if(mas[0] == "staf"){
            console.log(mas);
            var a = parseInt(mas[2]);
            if(mas[1]=="%3E"){  //>
              db.collection('brands').find({staf: {$gt : a}})
                .then(brand =>res.json(brand))
                  .catch(err => res.status(404).json({ error: "ERROR" }));
            }
            if(mas[1]=="%3C"){   //<
              db.collection('brands').find({staf: {$lt : a}})
                .then(brand =>res.json(brand))
                  .catch(err => res.status(404).json({ error: "ERROR" }));
            }
            if(mas[1]=="%3E="){    //>=
              db.collection('brands').find({staf: {$gte : a}})
                .then(brand =>res.json(brand))
                  .catch(err => res.status(404).json({ error: "ERROR" }));
            }
            if(mas[1]=="%3C="){     //<=
              db.collection('brands').find({staf: {$lte : a}})
                .then(brand =>res.json(brand))
                  .catch(err => res.status(404).json({ error: "ERROR" }));
            }
            if(mas[1]=="="){     //=
              db.collection('brands').find({staf: a})
                .then(brand =>res.json(brand))
                  .catch(err => res.status(404).json({ error: "ERROR" }));
            }

          }
          if(mas[0] == "cost"){
            var a = parseInt(mas[2]);
            if(mas[1]=="%3E"){    //>
              db.collection('brands').find({cost: {$gt : a}})
                .then(brand =>res.json(brand))
                  .catch(err => res.status(404).json({ error: "ERROR" }));
            }
            if(mas[1]=="%3C"){   //<
              db.collection('brands').find({cost: {$lt : a}})
                .then(brand =>res.json(brand))
                  .catch(err => res.status(404).json({ error: "ERROR" }));
            }
            if(mas[1]=="%3E="){     //>=
              db.collection('brands').find({cost: {$gte : a}})
                .then(brand =>res.json(brand))
                  .catch(err => res.status(404).json({ error: "ERROR" }));
            }
            if(mas[1]=="%3C="){     //<=
              db.collection('brands').find({cost: {$lte : a}})
                .then(brand =>res.json(brand))
                  .catch(err => res.status(404).json({ error: "ERROR" }));
            }
            if(mas[1]=="="){     //=
              db.collection('brands').find({cost: a})
                .then(brand =>res.json(brand))
                  .catch(err => res.status(404).json({ error: "ERROR" }));
            }

          }

        });


        app.post('/apiproductsupdate/*', function(req, res, next) {
          var value = req.url;
          value = value.slice(19);

          var space = '/';
          var mas = [];

          mas = value.split("/");

          if(mas[1] == "name"){

            db.collection('brands').update({name : mas[0]}, {$set: {name : mas[2]}})
              .then(brand =>res.json(brand))
                .catch(err => res.status(404).json({ error: "ERROR" }));
          }
          if(mas[1] == "founder"){
            db.collection('brands').update({name : mas[0]}, {$set: {founder : mas[2]}})
              .then(brand =>res.json(brand))
                .catch(err => res.status(404).json({ error: "ERROR" }));
          }
          if(mas[1] == "staf"){
            console.log(mas);
            var a = parseInt(mas[2]);
          db.collection('brands').update({name : mas[0]}, {$set: {staf: mas[2]}})
                .then(brand =>res.json(brand))
                  .catch(err => res.status(404).json({ error: "ERROR" }));
          }
          if(mas[1] == "cost"){
            var a = parseInt(mas[2]);
            db.collection('brands').update({name : mas[0]}, {$set: {cost : mas[2]}})
                  .then(brand =>res.json(brand))
                    .catch(err => res.status(404).json({ error: "ERROR" }));
            }


        });





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
