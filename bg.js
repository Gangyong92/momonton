const body = document.querySelector("body");

const IMG_NUMBER = 3;

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `images/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  // prepend() 는 body 제일 앞쪽으로 보냄
  body.appendChild(image);
}

function genRandom() {
  // Math.random() * 3는 0~2 소수점까지 얻음
  // floor는 소수점을 떼어냄(내림)
  // ceil은 소수점 있는 경우(올림)
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
