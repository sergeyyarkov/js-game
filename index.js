const startBtn = document.querySelector('#start'),
    game = document.querySelector('#game'),
    timeText = document.querySelector('#time'),
    result = document.querySelector('#result'),
    timeHeader = document.querySelector('#time-header'),
    resultHeader = document.querySelector('#result-header'),
    gameTime = document.querySelector('#game-time');

let score = 0;
let isGameStarted = false;

startBtn.addEventListener('click', startGame);
game.addEventListener('click', handleBoxClick);
gameTime.addEventListener('input', setGameTime);

function show(el) {
    el.classList.remove('hide');
}

function hide(el) {
    el.classList.add('hide');
}

function startGame() {
    score = 0;
    setGameTime();
    gameTime.setAttribute('disabled', 'true');
    isGameStarted = true;
    hide(startBtn);
    game.style.backgroundColor = '#fff';

    const interval = setInterval(() => {
        let time = parseFloat(timeText.textContent);
        if (time <= 0) {
            clearInterval(interval);
            endGame();
        } else {
            timeText.textContent = (time - 0.1).toFixed(1);  
        }
    }, 100);

    renderBox();
}

function setGameScore() {
    result.textContent = score.toString();
}

function setGameTime() {
    const time = +gameTime.value;
    timeText.textContent = time.toFixed(1);
    show(timeHeader);
    hide(resultHeader); 
}

function endGame() {
    isGameStarted = false;
    setGameScore();
    gameTime.removeAttribute('disabled');
    show(startBtn);
    game.innerHTML = '';
    game.style.backgroundColor = '#ccc';
    hide(timeHeader);
    show(resultHeader);
}

function handleBoxClick(e) {
    if (!isGameStarted) {
        return;
    }
    if (e.target.dataset.box) {
        score++;
        renderBox();
    }
}

function renderBox() {
    game.innerHTML = '';
    const box = document.createElement('div'),
        boxSize = getRandom(30, 100),
        gameSize = game.getBoundingClientRect(),
        maxTop = gameSize.height - boxSize,
        maxLeft = gameSize.width - boxSize;
    

    
    box.style.height = box.style.width = boxSize + 'px';
    box.style.position = 'absolute';
    box.style.backgroundColor = `rgb(${getRandom(0, 255)}, ${getRandom(0, 255)}, ${getRandom(0, 255)})`;
    box.style.top = getRandom(0, maxTop) + 'px';
    box.style.left = getRandom(0, maxLeft) + 'px';
    box.style.cursor = 'pointer';
    box.setAttribute('data-box', 'true');

    game.insertAdjacentElement('afterbegin', box);
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}