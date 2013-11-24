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
		for(var j = 0; j < N; j++) {
			var row = lines.shift().split('')
			var isBlack = false
			for(var k = 0; k < N; k++) {
				if(row[k] === '#') {
					totalHashes++
					isBlack = true
					if(first === [-1, -1]) {
						first = [j,k]
					}

				} else {
					if(isBlack){
						isBlack = false
						if(last === [-1,-1]) {
							last = [j,k]
							size = first[1] - last[1] + 1
						}
					}
				}

			}
		}

		if(!(Math.sqrt(totalHashes) % 1 === 0)) {
			out = out.concat('NO')
			break
		}



		console.log(out)
	}
})