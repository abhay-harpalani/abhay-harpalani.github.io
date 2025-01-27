let img
let capture

// 0.5s between colors -> 30 frames
// image_arr, 0 -> 59
// computed_img, img which is displayed with rgb delay
// 0 is earliest image, 59 is current / latest
// r 59, g 29, b 0

function setup() {
  speed = 15
  
  b = document.getElementById("js-container")
	w = b.clientWidth
	h = b.clientHeight
	myCanvas1 = createCanvas(w, h)
	myCanvas1.parent('js-container')
	
  capture = createCapture(VIDEO)
  capture.hide()
  
  frames = speed*2
  imageArr = []
  for (let i = 0; i < frames; i++) {
    imageArr.push(createImage(160, 90))
  }
  
  // r at 59, g at 29, b at 0
  colorIndices = [2*speed-1, speed-1, 0]
}

function draw() {
  if (img) {
    image(img, 0, 0)
  }
  image(capture, 0, 0, capture.width, capture.height)
  if (!img || img.width !== capture.width) {
    newImg = createImage(capture.width, capture.height)
  }
  newImg.copy(capture, 0, 0, capture.width, capture.height, 0, 0, newImg.width, newImg.height)
  newImg.loadPixels()
  
  // remove earliest image from front
  imageArr.shift()
  // add current image to end
  imageArr.push(newImg)
  
  computedImg = createImage(capture.width, capture.height)
  computedImg.loadPixels()
  
  background(0)
  
  // set computed_img
  for (let i = 0; i < 3; i++) {
    curImg = imageArr[colorIndices[i]]
    curImg.loadPixels()
    for (let y = 0; y < newImg.height; y++) {
      for (let x = 0; x < newImg.width; x++) {
        ind = getIndex(curImg.width-x-1, y, curImg.width, curImg.height, i)
        newInd = getIndex(x, y, curImg.width, curImg.height, i)
        // r, g, or b value of current pixel
        colorVal = curImg.pixels[ind]
        computedImg.pixels[newInd] = colorVal
      }
    }
  }
  
  for (let y = 0; y < newImg.height; y++) {
    for (let x = 0; x < newImg.width; x++) {
      // set alpha to 255
      ind = getIndex(curImg.width-x-1, y, curImg.width, curImg.height, 3)
      computedImg.pixels[ind] = 255
    }
  }
  
  computedImg.updatePixels()
  image(computedImg, (w-computedImg.width)/2, (h-computedImg.height)/2)
}

function getIndex(x, y, w, h, i) {
  return (w*y + x)*4 + i
}
