function setup() {
  
	selector = 1
	
	// bg_col = color(220)
	// line_col = color(0)
	bg_col = color(30)
	line_col = color(190)
	
	b = document.getElementById("js-container")
	w = b.clientWidth
	h = b.clientHeight
	myCanvas1 = createCanvas(w, h)
	myCanvas1.parent('js-container');

	mult = min(w, h) * 1/20
	showPoints = false
	xPoints = 20
	yPoints = 20
	
	delay = 4
	
	noStroke()
  }
  
  function draw() {
	background(bg_col)
	
	xUnit = w
	yUnit = h
	strokeWeight(2)
	stroke(line_col)
	for (let x = 0; x < xPoints; x++) {
	  for (let y = 0; y < yPoints; y++) {
		startX = map(x, 0, xPoints, xUnit/5, xUnit * 4/5)
		startY = map(y, 0, yPoints, yUnit/5, yUnit * 4/5)
	  
		t = (frameCount + delay*x + delay*y) / 20
		endX = startX + mult * r(t) * cos(t)
		endY = startY - mult * r(t) * sin(t)
		
		line(startX, startY, endX, endY)
	  }
	}
  }
  
  function r(t) {
	return (sin(0.05*t) * sin(0.05*t) + 0.5)/2 * (cos(t) + sin(t))
  }