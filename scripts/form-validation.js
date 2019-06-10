$(document).ready(function(){
   
    $("#submitBtn").click(function(event) {
        event.preventDefault();
        
        var ownerName = $("#owner-name").val();
        var ownerLastName = $("#owner-lastname").val();
        var email = $("#email").val();
        var dogName = $("#dog-name").val();
        var dogBreed = $("#dog-breed").val();
        var about= $("#about").val();
        var age = $('input[name="dog-age"]:checked').val();
        
        // WALIDACJA
        var ok = true;
        pattern_TEXTFIELD = /^[a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ\x20]{2,}$/; //wyrażenie regularne dla nazwiska
        pattern_TEXTAREA = /^[a-zA-Z0-9-!-@#$^_:,.ąćęłńóśźżĄĘŁŃÓŚŹŻ\x20]{2,}$/; //wyrażenie regularne dla nazwiska
        pattern_EMAIL =/^([a-zA-Z0-9])+([.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]+)+/;
        // Owner Name
        if(!checkTextfield("#owner-name", pattern_TEXTFIELD)) {
            ok = false;
            $("#owner-name-error").text("Wpisz poprawnie imie!");
        }
        else {
            $("#owner-name-error").text("");
            ownerName = formatTextfield(ownerName);
        }
        // Owner Lastname
        if(!checkTextfield("#owner-lastname", pattern_TEXTFIELD)) {
            ok = false;
            $("#owner-lastname-error").text("Wpisz poprawnie nazwisko!");
        }
        else {
            $("#owner-lastname-error").text("");
            ownerLastName = formatTextfield(ownerLastName);
        }
        // Email address
        if(!checkTextfield("#email", pattern_EMAIL)) {
            ok = false;
            $("#email-error").text("Wpisz poprawnie adres email!");
        }
        else {
            // Email verification
            if(localStorage.hasOwnProperty(email)){
                ok = false;
                $("#email-error").text("Podany email jest zajęty!");
            }
            else {
                $("#email-error").text("");
            }
        }
        // Dog name
        if(!checkTextfield("#dog-name", pattern_TEXTFIELD)) {
            ok = false;
            $("#dog-name-error").text("Wpisz poprawnie imie psa!");
        }
        else {
            $("#dog-name-error").text("");
            dogName = formatTextfield(dogName);
        }
        // Dog breed
        if(!checkTextfield("#dog-breed", pattern_TEXTFIELD)) {
            ok = false;
            $("#dog-breed-error").text("Wpisz poprawnie rasę psa!");
        }
        else {
            $("#dog-breed-error").text("");
            dogBreed = formatTextfield(dogBreed);
        }
        // Dog age
        if(age == null) {
            ok = false;
            $("#dog-age-error").text("Wybierz wiek psa!");
        }
        else {
            $("#dog-age-error").text("");
        }
        //About
        if(!checkTextfield("#about", pattern_TEXTAREA)) {
            ok = false;
            $("#about-error").text("Napisz coś o sobie!");
        }
        else {
            $("#about-error").text("");
        }

        if(ok) {
            addToLocalStorage(ownerName, ownerLastName, email, dogName, dogBreed, age, about)
            $("#form-dog").submit();
        }
        // \Walidacja\
    });
    function checkTextfield(fieldName, pattern) {
        if(!pattern.test($(fieldName).val()))
            return false;
        else 
            return true;
    }
    
    function addToLocalStorage(ownerName, ownerLastName, email, dogName, dogBreed, age, about) {
        var object = {
            "ownerName": ownerName,
            "ownerLastName": ownerLastName,
            "email": email,
            "dogName": dogName,
            "dogBreed": dogBreed,
            "age": age,
            "about": about
        }
        key = email;
        localStorage.setItem(key, JSON.stringify(object));
    }

    function formatTextfield(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        return splitStr.join(' '); 
     }
});

  


// console.log('retrievedObject: ', JSON.parse(retrievedObject));

