
var baseStr = "Abhay Harpalani"
var curStr = baseStr.split('')
var chance = 0.075
var changing = []

function loop() {
	if (Math.random() <= chance) {
		var val = Math.floor(Math.random() * baseStr.length)
		if (curStr[val] !== ' ' && !(changing.includes(val))) {
			changing.push(val)
			curStr[val] = '0'
		}
	}

	for (let i = 0; i < changing.length; i++) {
		val = changing[i]
		if (val !== -1) {
			curChar = curStr[val]
			defaultChar = baseStr[val]
			if (curChar === '9') {
				curStr[val] = baseStr[val]
				changing[i] = -1
			} else {
				// increment char
				curStr[val] = String.fromCharCode(curStr[val].charCodeAt() + 1)
			}
		}
	}
	out = curStr.join('')
	document.getElementById("main-name-text").textContent=out;
}

var t = setInterval(loop,100);