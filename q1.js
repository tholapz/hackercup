var fs = require('fs')

fs.readFile(process.argv[2], 'utf8', function  (err, data) {
	if(err) return false
	var lines = data.split('\n')
	var cases = parseInt(lines.shift())
	for(var i = 0; i < cases; i++) {
		
		var rows = parseInt(lines.shift())
		for(var j = 0; j < rows; j++) {
			
		}
	}
})