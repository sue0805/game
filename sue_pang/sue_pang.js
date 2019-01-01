var cellArr;
var prevCell = null;
var score = 0;
var timer;
var time = 120;

$(document).ready(function(){
    cellArr = initCellArray();
    initCells(cellArr);
    setBest(score);
    console.log(getBest());
    
    $('#gameArea').on('mouseenter', '.cell', function(){
        var $this = $(this);
        $this.addClass('hover');
    });
    
    $('#gameArea').on('mouseleave', '.cell', function(){
        var $this = $(this);
        $this.removeClass('hover');
    });
    
    $('#gameArea').on('click', '.cell', changeCell);
    $('#gameArea').on('click', '.restart', function(){
        location.reload();
    });
    timer = setInterval(timeGo, 1000);
});

function timeGo(){
    time -= 1;
    $('#time').text(time);
    
    if(time == 0){
        clearInterval(timer);
        $('.time').css('opacity','0.5');
        $('#gameArea').css('opacity','0.5')
                .append('<p class="gameover">GAME OVER</p>')
                .append('<div class="restart">RESTART');
    }
}

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

function setScore(score){
    $('#score').text(score);
    setBest(score);
}

function changeCell(){
    if(prevCell == null){
        $(this).addClass('select');
        prevCell = $(this);
        return;
    }else if(Math.abs($(this).index() - prevCell.index()) != 11
            && Math.abs($(this).index() - prevCell.index()) != 1){
        prevCell.removeClass('select');
        prevCell = null;
        return;
    }else{
        var myCls = $(this).prop('class');
        var prevCls = prevCell.removeClass('select').prop('class');
        var myIdx = $(this).index();
        var prevIdx = prevCell.index();
        var myNum = cellArr[Math.floor(myIdx/11)][myIdx%11];
        var prevNum = cellArr[Math.floor(prevIdx/11)][prevIdx%11];
        
        cellArr[Math.floor(myIdx/11)][myIdx%11] = prevNum;
        cellArr[Math.floor(prevIdx/11)][prevIdx%11] = myNum;
        
        $(this).fadeOut(10, function(){
            $(this).fadeIn(400);
        });
        prevCell.fadeOut(10, function(){
            $(this).fadeIn(400);
        });
        
        
        $(this).prop('class', prevCls);
        prevCell.prop('class', myCls).removeClass('hover');
        
        var chk1 = checkCells($(this));
        var chk2 = checkCells(prevCell);
        
        if(!chk1 && !chk2){
            
            cellArr[Math.floor(myIdx/11)][myIdx%11] = myNum;
            cellArr[Math.floor(prevIdx/11)][prevIdx%11] = prevNum;

            $(this).fadeOut(200, function(){
                $(this).prop('class', myCls);
                $(this).fadeIn(200);
            });
            prevCell.fadeOut(200, function(){
                $(this).prop('class', prevCls);
                $(this).fadeIn(200);
            });
        } else {
            setTimeout(sortCells, 1000);
        }
        prevCell = null;
    }
}

function sortCells(){
    var color;
    var colorNum;
    var rowCnt = 0;
    
    for(i=cellArr.length-1;i>=0;i--){
        for(j=0; j < cellArr[i].length; j++){
            if(cellArr[i][j] == -1){
                for(k=i; k >= 0; k--){
                    if(cellArr[k][j] != -1){
                        break;
                    } else rowCnt++;
                }
//                rowCnt -= 1;
                if(i-rowCnt > 0){
                    colorNum = cellArr[i-rowCnt][j];   
                    cellArr[i][j] = cellArr[i-rowCnt][j];
                    cellArr[i-rowCnt][j] = -1;
                } else {
                    colorNum = Math.floor(Math.random()*6);
                    cellArr[i][j] = colorNum;
                }
                rowCnt = 0;
                if(colorNum == 0){
                    color = "red";
                } else if (colorNum == 1){
                    color = "blue";
                } else if (colorNum == 2){
                    color = "pink";
                } else if (colorNum == 3){
                    color = "green";
                } else if (colorNum == 4){
                    color = "yellow";
                } else if (colorNum == 5){
                    color = "sue";
                } else{
                    color = 'grey';
                }
                var a = $('.cell').eq(i*11+j)
                .removeClass('red blue yellow pink green sue')
                .addClass(color);
            }
        }
    }
}

function removeCells(cellSet){
    cellSet.forEach(function(i, e){
        var $cell = $('.cell').eq(e).addClass('hover');
        var y = Math.floor(e/11);
        var x = e%11;
        if(cellArr[y][x] == 5) score += 500;
        else score += 100;
        cellArr[y][x] = -1;
        setTimeout(function(){
            $cell.removeClass('red yellow blue green pink sue hover');
        },500);
    });
    setScore(score);
}

function checkCells(cell){
    var idx = cell.index();
    var list = new Set();
    var listTmp = new Set();
    var arrY = Math.floor(idx/11);
    var arrX = idx % 11;
    var cls = cellArr[arrY][arrX];
    var checkFlag = false;
    
    rightCheck(arrY, arrX);
    if(list.size < 3) leftCheck(arrY, arrX);
    upCheck(arrY, arrX);
    if(listTmp.size < 3) downCheck(arrY, arrX);
    
    if(list.size == 3 && listTmp.size == 3){
        listTmp.forEach(function(i, e){
            list.add(e);
            removeCells(list);
        });
        checkFlag = true;
    } else if(list.size == 3){
        removeCells(list);
        checkFlag = true;
    } else if(listTmp.size == 3){
        removeCells(listTmp);
        checkFlag = true;
    }
    
    return checkFlag;
    
    function rightCheck(arrY, arrX){
        if(arrY > 10 || arrX > 10 || arrY < 0 || arrX < 0) return;
        i = arrY;
        j = arrX;
        if(cellArr[i][j] == cls){
            list.add(i*11+j);
            if(list.size < 3) rightCheck(i, ++j);
        } else return;
    }
    
    function leftCheck(arrY, arrX){
        if(arrY > 10 || arrX > 10 || arrY < 0 || arrX < 0) return;
        i = arrY;
        j = arrX;
        if(cellArr[i][j] == cls){
            list.add(i*11+j);
            if(list.size < 3) leftCheck(i, --j);
        } else return;
    }
    
    function upCheck(arrY, arrX){
        if(arrY > 10 || arrX > 10 || arrY < 0 || arrX < 0) return;        
        var i = arrY;
        var j = arrX;
        if(cellArr[i][j] == cls){
            listTmp.add(i*11+j);
            if(listTmp.size < 3) upCheck(--i, j);
        }
    }
    
    function downCheck(arrY, arrX){
        if(arrY > 10 || arrX > 10 || arrY < 0 || arrX < 0) return;
        var i = arrY;
        var j = arrX;
        if(cellArr[i][j] == cls){
            listTmp.add(i*11+j);
            if(listTmp.size < 3) downCheck(++i, j);
        }
    }
}

function initCells(cellArr){
    $.each(cellArr, function(i, ele){
        $.each(ele, function(i, e){
            var $cell = $('<div class="cell"></div>')
            var color;
            if(e == 0){
                color = "red";
            } else if (e == 1){
                color = "blue";
            } else if (e == 2){
                color = "pink";
            } else if (e == 3){
                color = "green";
            } else if (e == 4){
                color = "yellow";
            } else if (e == 5){
                color = "sue";
            }
            $cell.addClass(color).appendTo($('#gameArea'));
        });
    });
}

function initCellArray(){
    var cellArr = new Array(11);
    for(i=0; i < cellArr.length; i++){
        cellArr[i] = new Array(11);
        for(j=0; j < cellArr[i].length; j++){
            cellArr[i][j] = Math.floor(Math.random()*6);
        }
    }
    return cellArr;
}