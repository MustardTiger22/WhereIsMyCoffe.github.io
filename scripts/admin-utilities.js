$(document).ready(function(){
    var keys = Object.keys(localStorage);
    var i = keys.length;

    while ( i-- ) {
        item = JSON.parse(localStorage.getItem(keys[i]));
        html = '<tr id="row'+i+'"><td scoper="row" data-label="Imię">'+item.ownerName+'</td><td data-label="Nazwisko">'+item.ownerLastName+'</td><td data-label="Adres email">'+item.email+'</td><td data-label="Imię psa">'+item.dogName+'</td><td data-label="Rasa">'+item.dogBreed+'</td><td data-label="Wiek psa">'+item.age+'</td><td data-label="Coś o sobie">'+item.about+'<td data-label="akcje: modyfikuj"><button class="modify-btn" value="'+keys[i]+'">Modyfikuj</button></td><td data-label="akcje: usuń"><button class="delete-btn" value="'+keys[i]+'">Usuń</button></td></tr>';
        $("#table-body").append(html);  
    }
    
    $(".delete-btn").click(function(){
        localStorage.removeItem($(this).val());
        location.reload();
    });

    $(".modify-btn").click(function(){
        var rowId = $(this).closest("tr").attr("id");
        var key = $(this).val();
        var item = JSON.parse(localStorage.getItem(key));

        $(".modify-btn").attr("disabled", true);
        $(".delete-btn").attr("disabled", true);

        // Generowanie wiersza edycyjnego
        var select = '<select id="dog-age"><option value="&lt;1">&lt;1</option><option value="1-2">1-2</option><option value="2-4">2-4</option><option value="4-8">4-8</option><option value="8-12">8-12</option><option value="12-15">12-15</option><option value="15&lt;">15&lt;</option></select> ';
        var html = '<tr><td scoper="row" data-label="Imię">'+'<input type="text" id="owner-name" value="'+item.ownerName+'">'+'</td><td data-label="Nazwisko">'+'<input type="text" id="owner-lastname" value="'+item.ownerLastName+'">'+'</td><td data-label="Adres email">'+'<input type="email" id="email" value="'+item.email+'">'+'</td><td data-label="Imię psa">'+'<input type="text" id="dog-name" value="'+item.dogName+'">'+'</td><td data-label="Rasa">'+'<input type="text" id="dog-breed" value="'+item.dogBreed+'">'+'</td><td data-label="Wiek psa">'+select+'</td><td data-label="Coś o sobie">'+'<textarea rows="2" id="about">'+item.about+'</textarea>'+'<td data-label="akcje: zapis"><button class="save-btn">Zapisz</button></td><td data-label="akcje: anuluj"><button class="cancel-btn">Anuluj</button></td></tr>';
        // \Generowanie wiersza edycyjnego\

        $("#"+rowId).after(html);
        $("#dog-age").val(item.age);

        $(".save-btn").click(function(event){
            event.preventDefault();
            var ownerName = $("#owner-name").val();
            var ownerLastName = $("#owner-lastname").val();
            var email = $("#email").val();
            var dogName = $("#dog-name").val();
            var dogBreed = $("#dog-breed").val();
            var about= $("#about").val();
            var age = $("#dog-age option:selected").val();
            
            // // WALIDACJA
            var ok = true;
            pattern_TEXTFIELD = /^[a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ\x20]{2,}$/; //wyrażenie regularne dla nazwiska
            pattern_TEXTAREA = /^[a-zA-Z0-9-!-@#$^_:,.ąćęłńóśźżĄĘŁŃÓŚŹŻ\x20]{2,}$/; //wyrażenie regularne dla nazwiska
            pattern_EMAIL =/^([a-zA-Z0-9])+([.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]+)+/;
            // Owner Name
            if(!checkTextfield("#owner-name", pattern_TEXTFIELD)) {
                ok = false;
                $("#owner-name").addClass("warning");
            }
            else {
                $("#owner-name").removeClass("warning");
                ownerName = formatTextfield(ownerName);
            }
            // Owner Lastname
            if(!checkTextfield("#owner-lastname", pattern_TEXTFIELD)) {
                ok = false;
                $("#owner-lastname").addClass("warning");
            }
            else {
                $("#owner-lastname").removeClass("warning");
                ownerLastName = formatTextfield(ownerLastName);
            }
            // Email address
            if(!checkTextfield("#email", pattern_EMAIL)) {
                ok = false;
                $("#email").addClass("warning");
            }
            else {
                // Email verification
                if(localStorage.hasOwnProperty(email) && email != item.email){
                    ok = false;
                    $("#email").addClass("warning");
                }
                else {
                    $("#email").removeClass("warning");
                }
            }
            // Dog name
            if(!checkTextfield("#dog-name", pattern_TEXTFIELD)) {
                ok = false;
                $("#dog-name").addClass("warning");
            }
            else {
                $("#dog-name").removeClass("warning");
                dogName = formatTextfield(dogName);
            }
            // Dog breed
            if(!checkTextfield("#dog-breed", pattern_TEXTFIELD)) {
                ok = false;
                $("#dog-breed").addClass("warning");
            }
            else {
                $("#dog-breed").removeClass("warning");
                dogBreed = formatTextfield(dogBreed);
            }
            //About
            if(!checkTextfield("#about", pattern_TEXTAREA)) {
                ok = false;
                $("#about").addClass("warning");
            }
            else {
                $("#about").removeClass("warning");
            }

            if(ok) {
                if(item.key != key) {
                    localStorage.removeItem(key);
                }
                addToLocalStorage(ownerName, ownerLastName, email, dogName, dogBreed, age, about);
                location.reload();
            }
            else {
                return false;
            }
            // \Walidacja\        
        });

        $(".cancel-btn").click(function(){
            $(".modify-btn").attr("disabled", false);
            $(".delete-btn").attr("disabled", false);
            $(this).parent().parent().remove();
        });
    });

    $("#clear-local-storage").click(function(){
        localStorage.clear();
        location.reload();
    });

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

    function checkTextfield(fieldName, pattern) {
        if(!pattern.test($(fieldName).val()))
            return false;
        else 
            return true;
    }

    function formatTextfield(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        return splitStr.join(' '); 
    }

});




