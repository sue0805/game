var widthG = $('#gameArea').innerWidth();
var widthB = $('#bar').outerWidth();
var heightB = $('#bar').outerHeight();
var topGA = $('#gameArea').offset().top;
var leftGA = $('#gameArea').offset().left;
var heightG = topGA + $('#gameArea').innerHeight();
var $ball = $('#ball');
var posX = $ball.offset().left;
var posY = $ball.offset().top;
var posBX = $('#bar').offset().left;
var posBY = $('#bar').offset().top;
var $gem = [];
var gl;
var gt;
var ballSize = $('#ball').innerWidth()-2;
var ballOnMove = false;
var onGame;
var speedX = 5;
var speedY = -5;
var score = 0;
var cnt = 0;
var gemMove = [];
var gemNum = 0;
var gemIdx;

$(document).ready(function(){
    initBlock();
    
    window.onmousemove = moveBar;
    window.onclick = ballGo;
    window.onresize = setSize;
    
});

function setSize(){
    topGA = $('#gameArea').offset().top;
    leftGA = $('#gameArea').offset().left;
}

function initBlock(){
    for(i = 0; i < 30; i++){
        $('<div class="block">').appendTo('#blockArea');
    }
    var block = document.querySelectorAll('.block');
    for(i = 0; i < block.length; i++){
        block[i].broken = false;
    }
}

function moveBar(e){
    var left = $('#gameArea').offset().left;
    var pos = (e.x - left - widthB/2);
    
    if(pos < 0) pos = 0;
    if(pos > widthG-widthB) pos = widthG-widthB;
    
    $('#bar').css('left', pos + 'px');
    posBX = $('#bar').offset().left;
    posBY = $('#bar').offset().top;
    
    if(!ballOnMove){
        $('#ball').css('left', (pos + widthB/2-ballSize/2) + 'px');
    }
}

function ballGo(){
    if(!ballOnMove){
        ballOnMove = true;
        posX = $ball.offset().left;
        posY = $ball.offset().top;
        onGame = setInterval(moveBall, 20);
    }
}

function moveBall(){
    var $ball = $('#ball');
    
    posX += speedX;
    posY += speedY;
    
    if(posY < topGA){
        posY = topGA;
        speedY *= -1;
    } else if (posY > heightG){
        posY = $('#bar').offset().top-ballSize;
        posX = $('#bar').offset().left+widthB/2-ballSize/2;
        speedY *= -1;
        ballOnMove = false;
        $('#ball').offset({left:posX, top:posY});
        clearInterval(onGame);
        delLife();
    }
    
    if(posX < leftGA){
        posX = leftGA;
        speedX *= -1;
    } else if (posX > widthG+leftGA-ballSize){
        posX = widthG+leftGA-ballSize;
        speedX *= -1;
    }
    
    if(posBX-posX <= ballSize/2 && posBX-posX >= (widthB+ballSize/2)*-1 && posBY - (ballSize+speedY-1) <= posY && posBY>= posY+(ballSize)){
        speedY *= -1;
    }
    
    $('#ball').offset({left:posX, top:posY});
    breakBlock();
}

function delLife(){
    var life = $('#life').text();
    if(life.length > 1){
        $('#life').text(life.substring(1));
    } else {
        $('#life').text(life.substring(1));
        $('#gameArea').css('opacity','0.5')
            .append('<h1 id="end">GAME OVER')
            .append('<div id="restart">RESTART');
        window.onmousemove = null;
        window.onclick = null;
    }
}

function breakBlock(){
    var block = document.querySelectorAll('.block');
    var blockWidth = $('.block').eq(0).outerWidth();
    $('.block').each(function(i, e){
        var x = $(e).offset().left;
        var y = $(e).offset().top;
        var spX = Math.abs(speedX);
        var spY = Math.abs(speedY);
        if(x-posX <= ballSize && x-posX >= (blockWidth+ballSize)*-1 && (posY-y <= (ballSize+spY/2) && -(ballSize+spY/2) <= posY-y) && !block[i].broken){
            var idx = i;
            block[i].style.visibility = "hidden";
            block[i].broken = true;
            cnt++;
            score += 100;
            setScore();
            setBest(score);
            if(cnt == 30){
                clearInterval(onGame);
                $('#gameArea').css('opacity','0.5').css('cursor','default')
                    .append('<h1 id="end">YOU WIN!!')
                    .append('<div id="nextlevel">NEXTLEVEL');
                window.onmousemove = null;
                window.onclick = null;
            }
            
            if(x-posX >= ballSize-spX+1 && x-posX <= ballSize || x-posX <= (blockWidth+ballSize-spX+1)*-1 && x-posX >= (blockWidth+ballSize)*-1){
                speedX *= -1;  
            }
            if(y <= posY-(ballSize-spY/2) && posY-(ballSize+spY/2) <= y || y >= posY+(ballSize-spY/2) && y <= posY+(ballSize+spY/2)){
                speedY *= -1;
            }
        }
    });
}

function setScore(){
    $('#score').text(score);
}

$('#gameArea').on('click', '#restart', function(){
    location.reload();
});

$('#gameArea').on('click', '#nextlevel', function(){
    cnt = 0;
    $('#blockArea').empty();
    initBlock();
    ballOnMove = false;
    posY = $('#bar').offset().top-ballSize;
    posX = $('#bar').offset().left+widthB/2-ballSize/2;
    $('#ball').offset({left:posX, top:posY});
    speedX = Math.abs(speedX) + 2;
    speedY = Math.abs(speedY)*-1 - 2;
    window.onmousemove = moveBar;
    $('#gameArea').find('#end').remove()
        .end().find('#nextlevel').remove()
        .end().css('opacity','1');
    setTimeout(function(){
        window.onclick = ballGo;
    }, 100);
});

function setBest(score){

    var best = document.cookie.indexOf('best');
    if(best == -1){
        document.cookie = "best=0";
    } else {
        bestScore = getBest();
        if(score > bestScore){
            bestScore = score;
            document.cookie = "best=" + score;
        }
        $('#best').text(bestScore);
    }   
}

function getBest(){

    if(document.cookie.length == 0) return;
    var best;
    $.each(document.cookie.split(';'), function(i, e){
        if(e.split('=')[0].trim() == 'best'){
            best = e.split('=')[1];
        }
    });

    return best;

}