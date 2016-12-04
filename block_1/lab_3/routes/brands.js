var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');


var readDoc = function(fileName) {
	var filePath = path.join(__dirname, fileName);
	return new Promise(function(resolve, reject)
  {
		fs.readFile(filePath, {encoding: 'utf-8'}, function(err, data) {
			if (!err) {
				resolve(data);
			}
      else {
				reject(err);
			}
		});
	});
};


router.all('/', function(req, res, next) {
	var arr = [];
	readDoc('brands.json')
	.then(function(contents) {
		var brandList = JSON.parse(contents);
		var brand = null;
		for (var i = 0; i < brandList.length; i++) {
			var dataBrand = brandList[i];
			var nameBrand = (dataBrand.name).replace(/ /g, '').replace(/\//g, '');
			nameBrand = nameBrand.toLowerCase();
			arr.push({
				title: dataBrand.name,
				href: 'brands/' + nameBrand,
				img_path: '/images/' + nameBrand + '.jpg'
			});
		}

		res.render('brands', {
			arr: arr
		});
	})
	.catch(function(err) {
		err = new Error('ERROR');
		err.status = 500;
		next(err);
	});

});


router.all('/*', function(req, res, next) {
  var decrease = req.path;
	console.log(req.path);
  decrease = decrease.slice(1);
  readDoc('brands.json')
    .then(function(contents) {
      var brandList = JSON.parse(contents);
      var brand = null;
      for (var i = 0; i < brandList.length; i++) {
        var dataBrand = brandList[i];
       var nameBrand = (dataBrand.name).replace(/ /g, '').replace(/\//g, '');
        nameBrand = nameBrand.toLowerCase();
        if (nameBrand === decrease) {
          brand = dataBrand;
          break;
        }
      }
      if (brand !== null) {
        res.render('singleBrand', {
          page_title: brand.name,
					founder: brand.founder,
					date:brand.date,
					staf: brand.staf,
					cost: brand.cost,
          img_path: '/images/' + decrease + '.jpg',
          name: brand.name,

          });
      }
      else {
        var err = new Error('ERROR');
        err.status = 404;
        next(err);
      }
    })
    .catch(function(err) {
      err = new Error('ERROR');
      err.status = 500;
      next(err);
    });
});

module.exports = router;
