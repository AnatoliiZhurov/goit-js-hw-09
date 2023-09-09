const selectors = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

console.log(selectors);

selectors.startBtn.addEventListener('click', startAction);

selectors.stopBtn.addEventListener('click', stopAction);

selectors.stopBtn.disabled = true;

let colorChange = null;

function startAction() {
  selectors.startBtn.disabled = true;
  selectors.stopBtn.disabled = false;
  onPlay();
}

function onPlay() {
  colorChange = setInterval(() => {
    return (selectors.body.style.backgroundColor = `${getRandomHexColor()}`);
  }, 1000);
}

function stopAction() {
  clearInterval(colorChange);
  console.log(`Action is stoped`);
  selectors.startBtn.disabled = false;
  selectors.stopBtn.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

console.log(getRandomHexColor());
