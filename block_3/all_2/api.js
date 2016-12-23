var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
const mongodb = require('promised-mongo');
const url = 'mongodb://localhost:27017/Br';
const db = mongodb(url);

// required for deleting the folder containing files (synchronously)


// brand MODEL MODULE
var configDB = require('./config/database.js');


  router.route('/filterproducts')
    /* GET filtered products. */
    .get(function(req, res, next) {
      if (req.originalUrl === '/filterproducts/') {
        res.redirect('/filterproducts');
      }
      var brObject = {};
      if (req.query.brandName) {
        brObject.name = req.query.brandName;
      }
      if (req.query.brandFounder) {
        brObject.formed = req.query.brandFormed;
      }
      if (req.query.brandMembers) {
        brObject.date = req.query.brandDate;
      }
      if (req.query.brandGenre) {
        brObject.staf = req.query.brandStaf;
      }
      if (req.query.brandAlbums) {
        brObject.cost = req.query.brandCost;
      }
      var br = brandModel.find(brObject).lean();
      query.exec(function(err, products) {
        if (err) {
          res.send('Sorry, the file with contents were not found on server.');
          res.end();
        }
        else {
          console.log("SENT THE NEXT INFO: " + products);
          res.send(products);
          res.end();
        }
      });
    });

  router.route('/apiproducts/:brand_name')

  /* GET single certain brand. */
	.get(function(req, res, next) {
	  var name= req.params.brand_name;

	var br = db.collection('brands').findOne({ 'name': name});

		br.exec(function(err, brand) {
			if (err) {
        res.send('Sorry, the file with contents were not found on server.');
        res.end();
			}
			else if (brand === null) {
        res.send('Sorry, there is no such a brand in the database.');
        res.end();
			}
			else {
        console.log("SENT THE NEXT INFO: " + brand);
	      res.send(brand);
        res.end();
			}
		});
	})
  /* UPDATE single brand. */
  .put(function(req, res, next) {
    var name= req.params.prod_name;

  var br = db.collection('brands').findOne({ name: name});

    br.exec(function(err, brand) {
      if (err) {
        res.send('Sorry, the brand cannot be updated.');
        res.end();
      }
      else if (brand === null) {
        res.send('Sorry, there is no such a brand in the database.');
        res.end();
      }
      else {
        req.checkBody('brandName', 'Name field is required').notEmpty();
        req.checkBody('brandFounder', 'Founder field is required').notEmpty();
        req.checkBody('brandDate', 'Date field is required').notEmpty();
        req.checkBody('brandStaf', 'Staf field must be integer number').notEmpty();
        req.checkBody('brandCost', 'Cost field is required').notEmpty();

        var errs = req.validationErrors();
        if (errs) {
          var arr = [];
          for (var i = 0; i < errs.length; i++) {
            arr.push(errs[i].msg);
          }
          res.send("The brand cannot be updated. Reason:\n" + arr.join(', '));
          res.end();
        }
        else {
          brand.name = req.body.brandName;
          brand.founder = req.body.brandFounder;
          brand.date = req.body.brandDate;
          brand.staf = req.body.brandStaf;
          brand.cost = req.body.brandCost;

          brand.save();
          res.send("The brand has been successfully updated.");
        }
      }
    });
  });



    router.route('/apiproducts/*').delete(function(req, res, next) {
    
    var name = req.params.brand_name;
    console.log("name")
    var br = db.collection('brands').find({ name: name});
    br.exec(function(err, brand) {
      if (err) {
        res.send('can`t remove');
        res.end();
      }
      else if (brand === null) {
        res.send('exist');
        res.end();
      }
      else {
        brand.remove();


        res.send("Success");
        res.end();
      }
    });
  });


module.exports = router;
