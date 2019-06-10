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

var txt = 'Jesteśmy wolontariuszami w schronisku dla bezdomnych psów w Lublinie od 2010 roku. Utworzyliśmy tą stronę w celu zautomatyzowania oraz ułatwienia wykonania pierwszego kroku w kierunku ich adopcji.';
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
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
  
    // Add the "show" class to DIV
    x.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }