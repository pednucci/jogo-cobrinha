let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let counter = 1;
let snake = [];
let score = document.getElementById("points");
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";

//criar posição aleatória da comida
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

//criar background
function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box)
}

//criar tamanho da cobrinha e cor para cada parte dela
function criarCobrinha() {
    for(i=0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

//desenhar comida com sua posição aleatória
function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

//executar a função update toda vez que uma tecla for pressionada no documento
document.addEventListener('keydown', update);

//definir a direção da cobrinha de acordo com o código da tecla pressionada
function update (event) {
    if((event.keyCode == 37 || event.keyCode == 65)  && direction != "right") direction = "left";
    if((event.keyCode == 39 || event.keyCode == 68) && direction != "left") direction = "right";
    if((event.keyCode == 38 || event.keyCode == 87) && direction != "down") direction = "up";
    if((event.keyCode == 40 || event.keyCode == 83) && direction != "up") direction = "down";
}

//função que reúne todo o funcionamento do jogo
function iniciarJogo() {
    //estrutura que faz a cobrinha não entrar na parede e fugir do background
    if(snake[0].x > 15 * box && (direction == "right" || direction == "down" || direction == "up")) snake[0].x = 0;
    if(snake[0].x < 0 * box && (direction == "left" || direction == "up" || direction == "down")) snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && (direction == "down" || direction == "right" || direction == "left")) snake[0].y = 0;
    if(snake[0].y < 0 * box && (direction == "up" || direction == "right" || direction == "left")) snake[0].y = 16 * box;

    //verificar se houve colisão entre a cobrinha e aplicar gameover
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over!');
            location.reload();
        }
        //verificar se a posição da comida gerada é a mesma que a da cobrinha, para impedir esse acontecimento
        if(snake[i].x == food.x && snake[i].y == food.y)
        {
            food.x = Math.floor(Math.random() * 15 + 1) * box;
            food.y = Math.floor(Math.random() * 15 + 1) * box;
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //movimento da cobrinha (de acordo com a direção)
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    //verificar se a posição da cobrinha é diferente da comida, se for, corta o último elemento da matriz cobrinha
    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }
    /* se não for, significa que a cobrinha comeu a comida, não removendo o último elemento e gerando uma nova
    posição pra comida */
    else{
        score.innerHTML = counter++;
        food.x = Math.floor(Math.random() * 15 + 1) * box,
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    //adicionando a nova posição da cabeça no primeiro elemento da matriz cobrinha
    snake.unshift(newHead);

}

//função que da a possibilidade do jogador escolher a velocidade
function velocidade(idVal) {
    clearInterval(jogo);
    if(idVal == "lento") jogo = setInterval(iniciarJogo, 150);
    if(idVal == "normal") jogo = setInterval(iniciarJogo, 100);
    if(idVal == "rapido") jogo = setInterval(iniciarJogo, 50);
}

//fazer com que a função que inicia o jogo seja chamada sempre, a cada 100ms
let jogo = setInterval(iniciarJogo, 100);