var fs = require('fs')

fs.readFile(process.argv[2], 'utf8', function  (err, data) {
	var str = ''
	if(err) return false
	var lines = data.split('\n')
	var cases = parseInt(lines.shift())
	for(var i = 0; i < cases; i++) {
		var info = lines.shift().split(' ')
		var N = parseInt(info[0])
		var M = parseInt(info[1])
		var P = parseInt(info[2])
		var players = []
		for(var j = 0; j < N; j++) {
			var x = lines.shift().split(' ')
			players.push({
				name:x[0],
				rating:parseInt(x[1]),
				height:parseInt(x[2]),
				played:0
			})
		}
		players.sort(sortPlayer)
		
		var team1 = []
		var team2 = []
		for(var k = 0; k < players.length; k++) {
			if(k%2)
				team2.push(players[k])
			else
				team1.push(players[k])
		}
		
		for(var currentMin = 0; currentMin < M; currentMin++) {
			var playing1 = []
			var playing2 = []
			for(var l = 0; l < P; l++) {
				var thatPlayer = team1.shift()
				var thatPlayer2 = team2.shift()
				thatPlayer.played++
				thatPlayer2.played++
				playing1.push(thatPlayer)
				playing2.push(thatPlayer2)
			}
			playing1.sort(sort2)
			playing2.sort(sort2)
			var kick1 = playing1.pop()
			var kick2 = playing2.pop()
			team1 = playing1.concat(team1,kick1)
			team2 = playing2.concat(team2,kick2)
		}
		var answer = team1.slice(0,P).concat(team2.slice(0,P))
		answer.sort(lexie)
		str = str.concat("Case #",(i+1),': ')
		for(var mee = 0; mee < answer.length; mee++) {
			str = str.concat(answer[mee].name,' ')
		}
		str = str.concat('\n')
	}
	console.log(str)
	//fs.writeFile("xxx.txt", str, function  (err) {
	//	if(err) console.log(err)
	//	console.log('pass')
	//})
		
})

function lexie (p1, p2) {
	return p1.name.localeCompare(p2.name)
}

function sortPlayer (p1, p2) {
	if(p1.rating == p2.rating)
		return p2.height - p1.height
	return p2.rating - p1.rating
}

function sort2 (p1, p2) {
	if(p1.played == p2.played){
		if(p1.rating == p2.rating)
			return p2.height - p1.height
		return p2.rating - p1.rating
	}
	return p1.played - p2.played
}