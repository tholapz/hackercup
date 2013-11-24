var fs = require('fs')

fs.readFile(process.argv[2], 'utf8', function  (err, data) {
	if(err) return

	var lines = data.split('\n')
	var T = parseInt(lines.shift())
	//for each case
	for(var i = 0; i < T; i++) {
		var out = 'Case #' + (i+1) + ': '
		var totalHashes = 0
		var size = 0
		var first = [-1, -1]
		var last = [-1, -1]
		var N = parseInt(lines.shift())
		var failed = false
		(for(var j = 0; j < N; j++) {
			var row = lines.shift().split('')
			var isBlack = false
			for(var k = 0; k < N; k++) {
				if(size > 0) {
					if(!isCorrect(j,k, size, first[0], first[1], row[k]))
						failed = true
						return
				}
				if(row[k] === '#') {
					totalHashes++
					isBlack = true
					if(first === [-1, -1]) {
						first = [j,k]
					}
				} else {
					if(isBlack){
						isBlack = false
						if(size === 0) {
							size = first[1] - k + 1
						}
					}
				}

			}
		})()

		if(size<=0) {
			//no hash was found
			out = out.concat('NO')
		} else if(!(Math.sqrt(totalHashes) % 1 === 0)) { 
			//hash count check
			out = out.concat('NO')
		} else if( failed ) {
			out = out.concat('NO')
		}else {
			out = out.concat('YES')
		}

		console.log(out)
	}
})

function isCorrect (row, col, size, row1, col1, val) {
	// check row
	if(row >= row1 && row <= (row1 + size - 1)) {
		//check col
		if(col >= col1 && col <= (col1 + size - 1)) {
			return val === '#'
		}
	}
	return val === '.'
}