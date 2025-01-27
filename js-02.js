let img
let capture

function preload() {
  // JetBrainsMono-VariableFont_wght.ttf
  // JetBrainsMono-Light.ttf
  // JetBrainsMono-ExtraLight.ttf
  // SpaceMono-Regular.ttf
  font = loadFont('portfolio_assets/JetBrainsMono-ExtraLight.ttf')
}

function setup() {
	b = document.getElementById("js-container")
	w_ = min(b.clientWidth)
	h_ = min(b.clientHeight)
  console.log(w_, h_)
	myCanvas1 = createCanvas(w_, h_)
	myCanvas1.parent('js-container');
  
  capture = createCapture(VIDEO)
  w = round(w_ * 150/816)
  h = round(w/3)
  // [0, 1]
  contrast = 0.6
  capture.size(w, h)
  capture.hide()
  
  alphabet = ".-':_,^=;><+!rc*\/z?sLTv)J7(|Fi{C}fI31tlu[neoZ5Yxjya]2ESwqkP6h9d4VpOGbUAKXHm8RD#$Bg0MNWQ%&@"
  maxAlphIndex = alphabet.length - 1
  
  fill(255)
  textSize(8)
  textFont(font)
  textAlign(CENTER, CENTER)
}

function draw() {
  if (img) {
    image(img, 0, 0)
  }
  image(capture, 0, 0, capture.width, capture.height)
  if (!img || img.width !== capture.width) {
    img = createImage(capture.width, capture.height)
  }
  img.copy(capture, 0, 0, capture.width, capture.height, 0, 0, img.width, img.height)
  img.loadPixels()
  
  background(0)
  txt = ""
  
  // calculate text
  for (let y = 0; y < img.height; y++) {  // 0 -> 95, x of img
    out = ""
    for (let x = 0; x < img.width; x++) { // 0 -> 71, y of img
      val = 0 // value of current pixel
      ind = getIndex(img.width-x-1, y, img.width, img.height, 0) // flip horizontally
      val = max(img.pixels[ind], img.pixels[ind+1], img.pixels[ind+2]) / 255
      
      // map value of pixel to character non linearly in order to increase contrast
      // also helps because the font skews towards the brighter side
      val = val**(2*contrast+1)
      
      ind = floor(val * maxAlphIndex)
      out += alphabet[ind] // add character to output string
    }
    txt += out + "\n" // add new line for next row
  }
  text(txt, width/2, height/2)
}

function getIndex(x, y, w, h, i) {
  return (w*y + x)*4 + i
}