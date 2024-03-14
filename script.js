// init variables for text scroll
var baseStr = "Abhay Harpalani";
var curStr = baseStr.split("");
var chance = 0.075;
var changing = [];

// variables for sidebar functions
var sidebarMenu;
var hamburgerMenu;
var mainContent;


// text scroll effect at top of landing page
function textScrollLoop() {
  if (Math.random() <= chance) {
    var val = Math.floor(Math.random() * baseStr.length);
    if (curStr[val] !== " " && !changing.includes(val)) {
      changing.push(val);
      curStr[val] = "0";
    }
  }
  for (let i = 0; i < changing.length; i++) {
    val = changing[i];
    if (val !== -1) {
      curChar = curStr[val];
      defaultChar = baseStr[val];
      if (curChar === "9") {
        curStr[val] = baseStr[val];
        changing[i] = -1;
      } else {
        // increment char
        curStr[val] = String.fromCharCode(curStr[val].charCodeAt() + 1);
      }
    }
  }
  out = curStr.join("");
  document.getElementById("main-name-text").textContent = out;
}

// initialize variables and setup click listener on page load
function setup() {
  sidebarMenu = document.getElementById("sidebar-overlay");
  hamburgerMenu = document.getElementById("hamburger-menu");
  onClickOutside(sidebarMenu, () => testFunc());
}

// open / close sidebar menu
function clickedHamburger() {
  sidebarMenu.style.width = (sidebarMenu.style.width == "0vw") ? "75vw" : "0vw";
}

// check if there was a click outside of sidebar
const onClickOutside = (element, callback) => {
  document.addEventListener('click', e => {
    if (!element.contains(e.target) && !hamburgerMenu.contains(e.target) && sidebarMenu.style.width != "0vw") {
      callback();
    }
  });
};

function testFunc() {
  sidebarMenu.style.width = "0vw";
}

// run textScrollLoop every 100ms
var t = setInterval(textScrollLoop, 100);
