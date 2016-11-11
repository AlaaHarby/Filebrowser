var express = require('express');
var app = express();
var fs = require('fs');
var dir = process.cwd();
var path = require('path');

app.use(express.static(__dirname));

app.get('/files', (req, res) => {

	var query_path = req.query.path ? req.query.path : '';
	var homeDir = path.join(dir, query_path);
	//console.log('homeDir: ' + homeDir);
	console.log('currDir: ' + homeDir);
	

	fs.readdir(homeDir, (err, files) => {
		var data = [];		
		files.forEach( (file) => {
		  try {
		    //console.log('file: ' + file);
		    var file_path = path.join(query_path,  file);
		    var stats = fs.statSync(file_path);
		    //console.log(stats.isDirectory());
		    data.push({Name: file, IsDirectory: stats.isDirectory(), 
			       Path: file_path});	
			
		  } catch(e) {
		    console.log(e);
                  }	
		});
	
		//console.log(data.length);
		res.json(data);
	});
});

app.get('/', (req, res) => {
	res.redirect('browser.html');
});
app.listen(2000);
