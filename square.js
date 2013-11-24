var fs = require('fs')

fs.readFile(process.argv[2], 'utf8', function  (err, data) {
	if(err) return false
	var lines = data.split('\n')
	var cases = parseInt(lines.shift())
	for(var i = 0; i < cases; i++) {
		var firstHash = [-1, -1]
		var size = 0
		var map = []
		var rows = parseInt(lines.shift())
		for(var j = 0; j < rows; j++) {
			var col = lines.shift().split('')
			var hash = col.indexOf('#')
			if( hash != -1 && size === 0){
				firstHash = [j,hash]
				size = findSize(hash, col)
			}
			map.push(col)
		}
		console.log(firstHash)
		console.log(size)
		console.log(map)
		// console.log(size)
	}
})

function findSize (pos, arr) {
	var ret = 0
	for(var i = pos; i < arr.length; i++) {
		if(arr[i] === '#')
			ret++
	}
	return ret
}