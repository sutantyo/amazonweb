var express = require('express');
var morgan = require('morgan');
var app = express();

var url = require('url');
var pg = require('pg');
var db_password = require('./private/db_password')
//var connection_string = db_password.connection_string;
//var query = require('pg-query');

//query.connectionParameters = connection_string;

app.set('port',(process.env.PORT || 3000 ));

// this is used to serve files in public directory
//app.use(express.static(__dirname + '/views'));
//app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));

//this initializes a connection pool
//it will keep idle connections open for a 30 seconds
//and set a limit of maximum 10 idle clients
var pool = new pg.Pool(db_password.config);


// to run a query we can acquire a client from the pool,
// run a query on the client, and then return the client to the pool
app.get('/testdb', function(req,res){
	console.log('database access');
	pool.connect(function(err, client, done) {

	if(err) {
		return console.error('error fetching client from pool', err);
	}
	client.query("SELECT DISTINCT Person_Name FROM fohs_combined WHERE Person_Name <> ''", function(err,result){
		console.log('query');

		//call `done()` to release the client back to the pool
		done();

		if(err) {
			res.status(500).send('Error running query');
			return console.error('error running query', err);
		}
		var json_response = JSON.stringify(result.rows);
		res.writeHead(200,{'content-type':'application/json','content-length':Buffer.byteLength(json_response)});
		res.end(json_response);
						 //output: 1
		}); // end client.query
	});
});

app.use(express.static('public'));

app.get('/u/:id', function(req,res){
	console.log('database access');
	console.log(req.params.id);

	pool.connect(function(err, client, done) {

	if(err) {
		return console.error('error fetching client from pool', err);
	}
	var query_string = "SELECT level, staffid, woshall, woshiris, wosh1115, scopush1115, googleh, googlecites, altmetric,";
	query_string += " jcrq1, jcrq2, sjrq1, sjrq2, Person_Name, dept, approved, rejected, A1, B1, C1, E1 ";
	query_string += " FROM fohs_combined WHERE staffid = " + parseInt(req.params.id);
	
	//client.query("SELECT level, staffid, woshall, woshiris, wosh1115, scopush1115, googleh, googlecites, altmetric, jcrq1 FROM fohs_combined WHERE Person_Name <> ''", function(err,result){
	client.query(query_string, function(err,result){
		console.log('query');
	

		//call `done()` to release the client back to the pool
		done();

		if(err) {
			res.status(500).send('Error running query');
			return console.error('error running query', err);
		}
		var json_response = JSON.stringify(result.rows);
		res.writeHead(200,{'content-type':'application/json','content-length':Buffer.byteLength(json_response)});
		res.end(json_response);
						 //output: 1
		}); // end client.query
	});
});



/*

	pg.connect(connection_string, function(err,client,done){
		if(err)
			return console.error('error fetching client from pool',err);
		client.query("SELECT notes FROM toilet_map WHERE notes <> ''", function(err,result){
			if (err){
				res.status(500).send('Error running query');
				return console.error('error running query',err);
			}
			var json_response = JSON.stringify(result.rows);
			res.writeHead(200,{'content-type':'application/json','content-length':Buffer.byteLength(json_response)});
			res.end(json_response);
			client.end();
		});
	});
});

//app.set('views', __dirname + '/views');

// Database matters:

// For heroku
//var connection_string = process.env.DATABASE_URL;

app.get(['/'], function(req,res){
	res.send('<h1>Server is running</h1>');
});

/*
app.get('/scripts', function(req,res){
	res.redirect('/scripts');
});
*/

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});


/*
app.get('/data', function(req,res){

	// pg.connect(connection_string, function(err,client,done){
		// if(err)
			// return console.error('error fetching client from pool', err);

		query("SELECT DISTINCT status FROM service_request", function (err,rows,result){
		// client.query("SELECT DISTINCT status FROM service_request", function (err,result){
			done();
			if (err){
				return console.error('error running query',err);
				res.status(500).send('Error running query');
			}
			var json_response = JSON.stringify(result.rows);
			res.writeHead(200,{'content-type':'application/json','content-length':Buffer.byteLength(json_response)});
			res.end(json_response);
			// client.end();
		});
	// });
});

app.get('/data/service/types', function(req,res){

	// pg.connect(connection_string, function(err,client,done){
		// if(err)
			// return console.error('error fetching client from pool', err);

		query("SELECT DISTINCT request_type FROM service_request", function (err,rows,result){
		// client.query("SELECT DISTINCT request_type FROM service_request", function (err,result){
			// done();
			if (err){
				return console.error('error running query',err);
				res.status(500).send('Error running query');
			}
			var json_response = JSON.stringify(result.rows);
			res.writeHead(200,{'content-type':'application/json','content-length':Buffer.byteLength(json_response)});
			res.end(json_response);
			// client.end();
		});
	// });
});

app.get('/data/locations/all', function(req,res){

	// pg.connect(connection_string, function(err,client,done){
		// if(err)
			// return console.error('error fetching client from pool', err);


		query("SELECT * FROM locations", function(err, rows, result){
		// client.query("SELECT * FROM locations", function (err,result){
			// done();
			if (err){
				return console.error('error running query',err);
				res.status(500).send('Error running query');
			}
			var json_response = JSON.stringify(result.rows);
			res.writeHead(200,{'content-type':'application/json','content-length':Buffer.byteLength(json_response)});
			res.end(json_response);
			// client.end();
		});
	// });
});

app.get('/data/stations/all', function(req,res){

	// pg.connect(connection_string, function(err,client,done){
		// if(err)
			// return console.error('error fetching client from pool', err);

		query("SELECT name,lat,lon FROM train_stations", function(err, rows, result){
		// client.query("SELECT name,lat,lon FROM train_stations", function (err,result){
			// done();
			if (err){
				return console.error('error running query',err);
				res.status(500).send('Error running query');
			}
			var json_response = JSON.stringify(result.rows);
			res.writeHead(200,{'content-type':'application/json','content-length':Buffer.byteLength(json_response)});
			res.end(json_response);
			// client.end();
		});
	// });
});

app.get('/data/stops/location', function(req,res){

	if (req.query.lat && req.query.lon){
		var lat = parseFloat(req.query.lat);
		var lon = parseFloat(req.query.lon);
		// pg.connect(connection_string, function(err,client,done){
			// if(err){
				// return console.error('error fetching client from pool', err);
			// }
			var query_string = "SELECT name, lat, lon FROM bus_stops ";
			query_string = query_string + " WHERE lat >= " + (lat-0.01) + " AND lat <= " + (lat+0.01);
			query_string = query_string + " AND lon >= " + (lon-0.01) + " AND lon <= " + (lon+0.01);

			console.log(query_string);
			query(query_string, function (err,rows,result){
			// client.query(query_string, function (err,result){
				// done();
				if (err){
					return console.error('error running query',err);
					res.status(500).send('Error running query');
				} else {
					var json_response = JSON.stringify(result.rows);
					res.writeHead(200,{'content-type':'application/json','content-length':Buffer.byteLength(json_response)});
					res.end(json_response);
				}
				// client.end();
			});
		// });
	}
	else
	{
		res.status(400).send("Incorrect GET parameters");
	}
});



app.get('/data/service/location', function(req,res){

	if (req.query.lat && req.query.lon){
		var lat = parseFloat(req.query.lat);
		var lon = parseFloat(req.query.lon);
		// pg.connect(connection_string, function(err,client,done){
			// if(err){
				// return console.error('error fetching client from pool', err);
			// }
			var query_string = "SELECT request_type, date_received, latitude, longitude, address FROM service_request ";
			query_string = query_string + " WHERE latitude >= " + (lat-0.003) + " AND latitude <= " + (lat+0.003);
			query_string = query_string + " AND longitude >= " + (lon-0.007) + " AND longitude <= " + (lon+0.007);

			console.log(query_string);
			query(query_string, function (err,rows,result){
			// client.query(query_string, function (err,result){
				// done();
				if (err){
					return console.error('error running query',err);
					res.status(500).send('Error running query');
				} else {
					var json_response = JSON.stringify(result.rows);
					res.writeHead(200,{'content-type':'application/json','content-length':Buffer.byteLength(json_response)});
					res.end(json_response);
				}
				// client.end();
			});
		// });
	}
	else
	{
		res.status(400).send("Incorrect GET parameters");
	}
});

app.get('/data/locations', function(req,res){

	if (req.query.lat && req.query.lon){
		var lat = parseFloat(req.query.lat);
		var lon = parseFloat(req.query.lon);
		// pg.connect(connection_string, function(err,client,done){
			// if(err){
				// return console.error('error fetching client from pool', err);
			// }
			var query_string = "SELECT * FROM locations ";
			query_string = query_string + " WHERE latitude >= " + (lat-0.001) + " AND latitude <= " + (lat+0.001);
			query_string = query_string + " AND longitude >= " + (lon-0.001) + " AND longitude <= " + (lon+0.001);

			console.log(query_string);
			query(query_string, function (err,rows,result){
			// client.query(query_string, function (err,result){
				// done();
				if (err){
					return console.error('error running query',err);
					res.status(500).send('Error running query');
				} else {
					var json_response = JSON.stringify(result.rows);
					res.writeHead(200,{'content-type':'application/json','content-length':Buffer.byteLength(json_response)});
					res.end(json_response);
				}
				// client.end();
			});
		// });
	}
	else
	{
		res.status(400).send("Incorrect GET parameters");
	}
});

/*
app.get('/taxi_roma/all', function(req,res){
	console.log('calling to get all taxi id');
	pg.connect(connection_string, function(err,client,done){
		if(err)
			return console.error('error fetching client from pool',err);
		client.query("SELECT DISTINCT id FROM taxi_roma", function(err,result){
			if (err){
				return console.error('error running query',err);
				res.status(500).send('Error running query');
			}
			var json_response = JSON.stringify(result.rows);
			res.writeHead(200,{'content-type':'application/json','content-length':Buffer.byteLength(json_response)});
			res.end(json_response);
			client.end();
		});
	});
});


var available_dataset = ['taxi_roma_epoch','taxi_sf_epoch']
app.get('/dataset/:dataset_name/time', function(req,res){

	if (available_dataset.indexOf(req.params.dataset_name) == -1)
		res.status(404).send("Dataset not available");
	else
	{
		if (req.query.start && req.query.end)
		{
			var start_time = parseInt(req.query.start);
			var end_time = parseInt(req.query.end);
			var table_name = req.params.dataset_name;
			pg.connect(connection_string, function(err,client,done){
				if(err)
					return console.error('error fetching client from pool', err);

				client.query("SELECT id, x, y, time FROM " + table_name + " WHERE time >= '" + start_time + "' AND time < '" + end_time +"'", function (err,result){
					done();
					if (err){
						return console.error('error running query',err);
						res.status(500).send('Error running query');
					}
					var json_response = JSON.stringify(result.rows);
					res.writeHead(200,{'content-type':'application/json','content-length':Buffer.byteLength(json_response)});
					res.end(json_response);
					client.end();
				});
			});
		}
		else
			res.status(400).send("Incorrect GET parameters");
	}
});
*/
