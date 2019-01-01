var grid;
var snGrid;
var curB;
var curNum;
var nextB;
var nextNum;
var blockArr = [];
var curCol;
var color;
var score = 0;
var rotateNum = 0;
var Xindex = 4;
var Yindex = 0;
var ongame;

$(document).ready(function(){
    ongame = setInterval(blockDown, 500);
    makeGrid();
    makeBG();
    blocks.makeBlock();

    $(document).keypress(function(e){
        if(e.key == 'a' || e.key == 'A'){
            if(Xindex>0) Xindex--;
        }
        if(e.key == 'd' || e.key == 'D'){
            if(Xindex < 10 - curB[0].length) Xindex++;
        }
        if(e.key == 's' || e.key == 'S'){
            if(Yindex < 19 && grid[Yindex+1][Xindex] == 0) Yindex++;
        }
        if(e.key == 'w' || e.key == 'W'){
            if(rotateNum < 3) rotateNum++;
            else rotateNum = 0;
    
            if(rotateNum != 0) curB=blocks['b' + curNum + '_' + rotateNum];
            else curB= blocks['b' + curNum];
        }
        if(e.key == 'x'){
            clearInterval(ongame);
        }
        if(e.key == 'z'){
            ongame = setInterval(blockDown(), 500);
        }
        
        console.log(e.key);
        blockDown();
    });
});

function makeGrid(){
    grid = new Array(21);
    snGrid = new Array(4);
    for(i = 0; i < grid.length; i++){
        grid[i] = new Array(10);
        for(j = 0; j < grid[i].length; j++){
            if(i != 20){
                grid[i][j] = 0;
            } else {
                grid[i][j] = 1;
            }                    
        }
    }
    for(i=0; i < snGrid.length; i++){
        snGrid[i] = new Array(4);
        for(j = 0; j < snGrid[i].length; j++){
            snGrid[i][j] = 0;
        }
    }
}

function makeBG(){
    for(i=0; i < grid.length; i++){
        for(j=0; j < grid[i].length; j++){
            if(grid[i][j] == 0)
            $('#gameArea').append('<div class="bgGrid"></div>');
        }
    }
    for(i=0; i < snGrid.length; i++){
        for(j=0; j < snGrid[i].length; j++){
            $('#showNext').append('<div class="snGrid"></div>');
        }
    }
}

var blocks = {
    b1 : [[0,1,0]
        ,[1,1,1]]
    ,b2 : [[1,1,0]
        ,[0,1,1]]
    ,b3 : [[0,1,1]
        ,[1,1,0]]
    ,b4 : [[1,1]
        ,[0,1]
        ,[0,1]]
    ,b5 : [[1,1]
        ,[1,0]
        ,[1,0]]
    ,b6 : [[1,1]
        ,[1,1]]
    ,b7 : [[1],[1],[1],[1]]
    ,b1_1 : [[1,0]
            ,[1,1]
            ,[1,0]]
    ,b1_2 : [[1,1,1]
            ,[0,1,0]]
    ,b1_3 : [[0,1]
            ,[1,1]
            ,[0,1]]
    ,b2_1 : [[0,1]
            ,[1,1]
            ,[1,0]]
    ,b2_2 : [[1,1,0]
            ,[0,1,1]]
    ,b2_3 : [[0,1]
            ,[1,1]
            ,[1,0]]
    ,b3_1 : [[1,0]
            ,[1,1]
            ,[0,1]]
    ,b3_2 : [[0,1,1]
            ,[1,1,0]]
    ,b3_3 : [[1,0]
            ,[1,1]
            ,[0,1]]
    ,b4_1 : [[0,0,1]
            ,[1,1,1]]
    ,b4_2 : [[1,0]
            ,[1,0]
            ,[1,1]]
    ,b4_3 : [[1,1,1]
            ,[1,0,0]]
    ,b5_1 : [[1,1,1]
            ,[0,0,1]]
    ,b5_2 : [[0,1]
            ,[0,1]
            ,[1,1]]
    ,b5_3 : [[1,0,0]
            ,[1,1,1]]
    ,b6_1 : [[1,1]
            ,[1,1]]
    ,b6_2 : [[1,1]
            ,[1,1]]
    ,b6_3 : [[1,1]
            ,[1,1]]
    ,b7_1 : [[1,1,1,1]]
    ,b7_2 : [[1],[1],[1],[1]]
    ,b7_3 : [[1,1,1,1]]
    , makeBlock : function(){
        var r1 = Math.floor(Math.random()*7)+1;
        var r2 = Math.floor(Math.random()*7)+1;
        // var r1 = 7;
        // var r2 = 7;
        if(nextB == undefined){
            curB = blocks['b'+r1];
            curNum = r1;
            if(r1 == 1) curCol = 'red';
            if(r1 == 2) curCol = 'yellow';
            if(r1 == 3) curCol = 'lightgreen';
            if(r1 == 4) curCol = 'blue';
            if(r1 == 5) curCol = 'orange';
            if(r1 == 6) curCol = 'violet';
            if(r1 == 7) curCol = 'hotpink';
        } else {
            curB = nextB;
            curNum  = nextNum;
            curCol = color;
        }
        nextB = blocks['b'+r2];
        nextNum = r2;
        if(r2 == 1) color = 'red';
        if(r2 == 2) color = 'yellow';
        if(r2 == 3) color = 'lightgreen';
        if(r2 == 4) color = 'blue';
        if(r2 == 5) color = 'orange';
        if(r2 == 6) color = 'violet';
        if(r2 == 7) color = 'hotpink';
        $('.snGrid').css({'backgroundColor':'#333', 'border':'1px solid #ccc'});
        var startX = 1;
        var startY = 0;
        for(i=0; i<nextB.length;i++){
            for(j=0; j<nextB[i].length;j++){
                if(nextB[i][j] == 1){
                    $('.snGrid').eq(startX + (startY*4))
                        .css({'backgroundColor':color,'border':'1px solid white'});
                }
                startX++;
            }
            startX = 1;
            startY++;
        }
    }
}


function blockDown(){
    var x = Xindex;
    var y = Yindex;
    
    $('.bgGrid').each(function(i, e){
        if(grid[Math.floor(i/10)][i%10] == 1){
            $(e).css({'backgroundColor':'grey', 'border':'1px solid white'});
        } else {
            $(e).css({'backgroundColor':'#333', 'border':'1px solid #ccc'});
        }
    });


    for(i=curB.length-1; i >= 0; i--){
        x = Xindex;
        for(j=0; j < curB[i].length; j++){
            if(curB[i][j] == 1){
                $('.bgGrid').eq(x + (y*10)).css({'backgroundColor': curCol, 'border':'1px solid white'});
                if(grid[y+1][x] == 1){
                    for(i = curB.length-1; i >= 0; i--){
                        x = Xindex;
                        for(j = 0; j < curB[i].length; j++){
                            if(curB[i][j] == 1){
                                if(y>= 0 && x >= 0) {
                                    grid[y][x] = 1;
                                } else {
                                    clearInterval(ongame);
                                    $('#gameArea').append('<h2 id="end">Game Over</h2>');
                                }
                            }
                            x++;
                        }
                        y--;
                    }
                    Xindex = 4;
                    Yindex = 0;
                    blocks.makeBlock();
                    rotateNum = 0;
                    return;
                }
                x++;
            } else {
                x++;
            }
        }
        if(y > 0) y--;
        else break;
    }
    if(Yindex == 19) Yindex = 0;
    Yindex++;
    var row;
    var rowCnt = 0;

    for(i = 0; i< grid.length-1; i++){
    var cnt = 0;
        for(j=0; j<grid[i].length; j++){
            if(grid[i][j] == 1) cnt++;
            if(cnt == 10){
                score += 500;
                row = i;
                rowCnt++;
                for(k = 0; k < grid[i].length; k++){
                    grid[i][k] = 0;
                }
            }
        }
    }

    for(i=row; i>=rowCnt; i--){
        for(j=0; j<grid[i].length; j++){
            grid[i][j] = grid[i-rowCnt][j];
        }
    }
    $('#info>#score').text('score : ' + score);
}