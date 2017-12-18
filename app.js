var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

http.createServer(function(req,res){

	var pathObj = url.parse(req.url,true);
	console.log(pathObj)
	switch(pathObj.pathname){
		case '/loadMore':
			var curIndex = pathObj.query.idx
			var len = pathObj.query.len
			var data = []
			for (var i=0; i<len; i++){
				data.push('内容' + (parseInt(curIndex) + i))
			}
			res.end(JSON.stringify(data))
			break;

		default:
			fs.readFile(path.join(__dirname,'static',pathObj.pathname),function(err,data){
				if(err){
					res.statusCode = 404
					res.end('NOT FOUND')
				}
				else{
					res.end(data)
				}
			})
	}



}).listen(8080)
