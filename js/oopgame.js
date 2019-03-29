var x = parseInt($('#alice').css('left'));
var y = parseInt($('#alice').css('top'));
var walkN = 0;
var bpX = 0;
var monN = 1;
var monWN = 0;
var onGame;
var sayArr = ['용사여......<br>들리시나요......', '객체지향 월드에 오신 것을 환영합니다.<br>쭉 앞으로 가세요!','안녕 앨리스, 나는 토끼야','이 OOP 월드에서 너와 나는 무엇일까?','우리는<br><input type="text" id="answer"><br><input type="button" id="A" value="OK">','맞았어! 우리는 객체야.', '아니....<br>넌 여기에 있을 자격이 없어!','그럼 생각해보자. 너는 옷을 입고 있어.<br>그 옷은 객체일까?<br>응, 아니로 대답해><','음...<br><input type="text" id="answer"><br><input type="button" id="A" value="OK">','그래! 옷은 객체라고 할 수 있지.','음... 정말 그렇게 생각해?', '네 옷은 빨간색이야.<br>네 옷이 빨간색인건 객체일까?', '네 키는? 네 나이는? 나무는? 나비는?<br>네 위치값은 객체일까?<br>우리는 뭘 객체라고 생각하지?', '참! 너랑 나는 둘 다 생명체지...<br>물론 암세포도...<br>우리를 생명체로 묶어 부를 수 있는 건 무엇 덕분일까?', '그건...<br><input type="text" id="answer"><br><input type="button" id="A" value="OK">','맞아! 다형성 혹은 추상화.','실망이다...','휴 이제 지친다...<br>그럼 이만 안녕. 궁금한게 있으면 언제든 물어봐....'];
var n = 0;
var cnt = 0;

$(document).ready(function(){   
    initGame();
})

    function initGame() {
        $('<p id="start">Press \'D\' Key</p>').appendTo('.gameArea');
        $(window).one('keypress', function() {
            $('#start').remove();
            onGame = setInterval(playing, 20);
        });
    }

    $(window).on('keypress', moveKey);
    $(window).on('keydown', jumpKey);

    function moveKey(e) {
       if (e.key == 'd' || e.key == 'D') {
            if (x != 300) aliceMove();
            else if(n < sayArr.length) backgroundMove();
       }
    }
    
    function jumpKey(e){
        var tmpY = parseInt($('#alice').css('top'));
        if(e.key == " "){
            $('#alice').stop().trigger('keypress');
            $('#alice').animate({'top': (tmpY-60) + 'px'}, 200, function(){
                $('#alice').animate({'top':y+'px'}, 200);
                
            });            
        }
    }

    function aliceMove() {
        
        if(x > 800){
            $(window).off('keypress');
            $('#msgbox').show();
            $('#msgbox p').html('수고하셨습니다~~~<br>맞춘 문제 수 : ' + cnt);
            $('#msgbox').animate({padding: '150px 0', top:0}, 1000);
            setTimeout(function(){
                $('body').animate({scrollTop: $('#portfolio').offset().top}, 500)
                $('html, body').css('overflow','auto')
            }, 1000)
        }
        
        x += 2;
        if (walkN == 96) walkN = 0;
        else if (x % 3 == 0) walkN += 32;
        if (x == 2) {
            $('#alice').show();
        }
        $('#alice').css('left',x+'px');
        $('#alice').css('backgroundPosition', walkN + 'px');
    }

    function backgroundMove() {
        bpX -= 2;
        if (walkN == 96) walkN = 0;
        else if (bpX % 3 == 0) walkN += 32;
        $('#alice').css('backgroundPosition', walkN + 'px');
        $('#gameArea').css('backgroundPosition', bpX + 'px 0px');
    }

    function playing() {
        if (n == 0 && bpX < -150) {
            $(window).off('keypress');
            $('#say').show();
            saying(sayArr[n]);
        } else if(n == 2 && bpX < -350){
            $(window).off('keypress');
            clearInterval(onGame);
            mon1 = setInterval(meetRabbit, 50);
        }
        
    }

    function saying(msg) {
        $(window).off('keyup');
        var msgBuilder = "";
        var i = 0;
        clearInterval(onGame);
        $('#msgbox').show();
        if(n == 4 || n == 8 || n == 14){
            $('#msgbox p').html(msg);
            return;
        }
        try {
            if (sayArr[n] != undefined) {
                tmp = setInterval(function() {
                    msgBuilder += msg.charAt(i++);
                    $('#msgbox p').html(msgBuilder);
                    if (msg.length == msgBuilder.length) {
                        clearInterval(tmp);
                        n += 1;
                        if(n == 1){
                            nextMsg();
                            setTimeout(hideMsg, 7000);
                        } else if(n > 2 && n <= 4){
                            nextMsg();
                        } else if(n == 6 || n == 7){
                            n = 7;
                            nextMsg();
                        } else if(n == 8){
                            nextMsg();
                        } else if(n == 10 || n == 11){
                            n = 11;
                            nextMsg();
                        } else if(n > 11 && n < 16){
                            nextMsg();
                        } else if(n == 16 || n == 17){
                            n = 17;
                            nextMsg();
                        } else if(n > 17 && n < sayArr.length){
                            nextMsg();
                        } else if(n == sayArr.length){
                            setTimeout(hideMsg, 1500);
                            mon1 = setInterval(meetRabbit, 20);
                            x = 302;
                        }
                    }
                }, 100);
            }
        } catch (e) {}
    }

    function nextMsg(){
        setTimeout(function(){saying(sayArr[n]);}, 1500);
    }
    
    function hideMsg() {
        $(window).off('keyup');
        $('#msgbox').hide();
        $('#alice').children().hide();
        $(window).on('keypress', moveKey);
        onGame = setInterval(playing, 20);
        $('#msgbox p').html('');
    }

    function meetRabbit(){
        clearInterval(onGame);
        var monX = parseInt($('.monster1').css('left'));
        monX -= 2;
        if (monWN == 126) monWN = 0;
        else if (monX % 3 == 0) monWN += 42;
        $('.monster1').css('backgroundPosition', monWN + 'px');
        $('.monster1').css('left',monX+'px');

        if(n != sayArr.length && monX == 350){
            clearInterval(mon1);
            $('#say').show();
            saying(sayArr[n]);
        } else if(n == sayArr.length && monX == -50){
            clearInterval(mon1);
        }
    }
    
    $('body').on('click', '#A', checkAnswer);
    
    function checkAnswer(e){

        var playerSay = $(this).siblings('input[type=text]').val();
        var answer = "";
        
        if(n == 4){
            answer = '객체';
            if(playerSay.indexOf(answer) != -1){
                n = 5;
                cnt++;
            } else n = 6;
            saying(sayArr[n]);
        } else if(n == 8){
            answer = '응';
            if(playerSay.indexOf(answer) != -1){
                n = 9;
                cnt++;
            } else n = 10;
            saying(sayArr[n]);
        } else if(n == 14){
            answer = "다형성";
            if(playerSay.indexOf(answer) != -1 || playerSay.indexOf('추상화') != -1){
                n = 15;
                cnt++;
            } else n = 16;
            saying(sayArr[n]);
        }
    }