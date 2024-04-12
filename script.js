let k = 1;
let myJump;
let flag = true;
function movecontent() {
  myJump = setInterval(() => {
    document.querySelector(".scroll-container").scrollLeft += parseInt(
      160 / 100
    );
    //console.log("ok");

    if (k == 10000)
      //{(2000/100)/0.5} is 10sec
      clearInterval(myJump, 0); // starts with scroll and ends when k is 2500
    if (k > 4800) {
      document.getElementById("plane").style.transition = "all 2s";
      document.getElementById("plane").style.translate = "-750px 280px";
      console.log("hi");
    }
    k++;
  }, 0);
  console.log(k);
}
let jb = false;

function pause() {
  if (flag) {
    if (jb) {
      jb = false;
      document.getElementById("btn").innerText = "Start";
      clearInterval(myJump, 0);
      //   console.log("clear");
    } else {
      jb = true;
      document.getElementById("btn").innerText = "Stop";
      //   console.log("call");
      movecontent();
    }
  }
}
let jtime = true;
let itime = true;
let box;
let degrees = 0;
addEventListener("keyup", (e) => {
  //   console.log(e);
  if (e.code == "ArrowUp") {
    if (jtime) {
      degrees += 90;
      box = document.getElementById("mover");
      box.style.animation = "jump 1.1s";
      box.style.rotate = `${degrees}deg`;
      box.style.transition = "all 1s";
      jtime = false;
    } else {
      degrees += 90;
      box.style.animation = "jumps 1s";
      box.style.rotate = `${degrees}deg`;
      box.style.transition = "all 1s";
      jtime = true;
    }
    //     console.log(e);
    //    console.log(degrees);
  }
});
function jumpy() {
  if (jtime) {
    degrees += 90;
    box = document.getElementById("mover");
    box.style.animation = "jump 1.1s";
    box.style.rotate = `${degrees}deg`;
    box.style.transition = "all 1s";
    jtime = false;
  } else {
    degrees += 90;
    box.style.animation = "jumps 1s ";
    box.style.rotate = `${degrees}deg`;
    box.style.transition = "all 1s";
    jtime = true;
  }
}
function jumping() {
  if (itime) {
    degrees += 90;
    boxs = document.getElementById("mover");
    boxs.style.animation = "dblj 1.3s";
    boxs.style.rotate = `${degrees}deg`;
    boxs.style.transition = "all 1s";
    itime = false;
  } else {
    degrees += 90;
    boxs.style.animation = "dbljp 1.3s ";
    boxs.style.rotate = `${degrees}deg`;
    boxs.style.transition = "all 1s";
    itime = true;
  }
}
function detectCollision(obstacle1, obstacle2) {
  const rect1 = obstacle1.getBoundingClientRect();
  // The getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
  //The getBoundingClientRect() method returns a DOMRect object with eight properties: left, top, right, bottom, x, y, width, height.
  const rect2 = obstacle2.getBoundingClientRect();

  return !(
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom ||
    rect1.right < rect2.left ||
    rect1.left > rect2.right
  );
}

function checkCollisions(mainElementId) {
  const mainElement = document.getElementById(mainElementId); // Get all elements with the class 'box'
  const obstacles = document.getElementsByClassName("triangles");

  for (let i = 0; i < obstacles.length; i++) {
    // Iterate through each element and check for collision with the main element
    const currentElement = obstacles[i];

    if (currentElement !== mainElement) {
      // Skip the main element itself
      if (detectCollision(mainElement, currentElement)) {
        //  console.log(`Collision detected with element ${currentElement.id}`);
        document.getElementById("mover").style.display = "none";
        flag = false;
        document.getElementById("btn").innerText = "You Lose";
        clearInterval(myJump, 0);
      }
    }
  }
}

function Restart() {
  location.reload();
}
let mainElementId = "mover";

setInterval(() => {
  checkCollisions(mainElementId);
}, 10); // Check for collisions every half of second