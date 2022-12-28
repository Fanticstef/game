let inputDir = { x: 0, y: 0 }
let speed = 10
let score = 0
let lastPrintTime = 0
let snakeArr = [{ x: 12, y: 18}]
food = { x: 4, y: 8}

function main(ctime) {
    window.requestAnimationFrame(main)
    if ((ctime - lastPrintTime) / 1000 < 1 / speed) {
        return
    }
    lastPrintTime = ctime
    gameEngine()
}

function isCollide (snake){
    for(let i = 1; i < snakeArr.length; i++){
        if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y){
            return true
        }
    }
    if(snake[0].x >= 20 || snake[0].x <= 0 || snake[0].y >= 20 || snake[0].y <= 0){
        return true
    }
    return false
}

function gameEngine() {

    if(isCollide(snakeArr)){
        inputDir = { x: 0, y: 0}
        alert("Game Over. Press any key to play again!")
        snakeArr = [{ x: 12, y: 18}]
        score = 0
    }

    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y})
        let a = 2
        let b = 18
        food = { x: Math.round (a + (b - a) * Math.random ()), y: Math.round (a + (b - a) * Math.random ())}
    }

    for(let i = snakeArr.length -2; i >= 0; i--){
        snakeArr[i + 1] = {...snakeArr[i]}
    }

    snakeArr[0].x += inputDir.x
    snakeArr[0].y += inputDir.y

    box.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x

        if(index === 0){
            snakeElement.classList.add('head')
        }
        else{
            snakeElement.classList.add('snake')
        }
        box.appendChild(snakeElement)
    });

    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    box.appendChild(foodElement)
}

window.requestAnimationFrame(main)
window.addEventListener("keydown", (e) => {
    inputDir = { x: 0, y: 1}
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0
            inputDir.y = -1
            break;
        case "ArrowDown":
            inputDir.x = 0 
            inputDir.y = 1
            break;
        case "ArrowLeft":
            inputDir.x = -1
            inputDir.y = 0
            break;
        case "ArrowRight":
            inputDir.x = 1
            inputDir.y = 0
            break;
    
        default:
            break;
    }
})