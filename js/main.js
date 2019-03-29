$('#scrollBtn').click(function(){
    $('body').animate({scrollTop: $('#portfolio').offset().top}, 500)
    $('html, body').css('overflow','auto')
})