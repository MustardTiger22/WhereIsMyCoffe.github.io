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
    if ($('html').scrollTop() > 20 || $('html').scrollTop() > 20) {
        $("#myBtn").show();
    } else {
        $("#myBtn").hide();
    }
}
  
function topFunction() {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 
}

var txt = 'Jesteśmy wolontariuszami w schronisku dla bezdomnych psów w Lublinie od 2010 roku. Utworzyliśmy tę stronę w celu zautomatyzowania oraz ułatwienia wykonania pierwszego kroku w kierunku ich adopcji.';
var speed = 50; 
var i=0;

function typeWriter() {
    if (i < txt.length) {
        $("#typing-effect").append(txt.charAt(i));
        i++;
        setTimeout(typeWriter, speed);
    }
}

function mySnackbar() {
    var x = $("#snackbar");
    x.addClass("show");
    setTimeout(function(){ x.removeClass("show"); }, 3000);
  }