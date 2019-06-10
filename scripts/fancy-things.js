$(function() {
    $(document).bind('mousemove', function(e){
        $('#cursor-icon').css({
           left:  e.pageX + 20,
           top:   e.pageY
        });
    });      
});


window.onscroll = function() {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}
  
function topFunction() {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 
}

var txt = 'Jesteśmy wolontariuszami pod patronatem grupy "Good Boy", którzy ';
var speed = 50; 
var i=0;

function typeWriter() {
    if (i < txt.length) {
        $("#typing-effect").append(txt.charAt(i));
        i++;
        setTimeout(typeWriter, speed);
    }
}