function deleteFromStorage(key){
    localStorage.removeItem(key);
}

$(document).ready(function(){
    var keys = Object.keys(localStorage);
    var i = keys.length;

    while ( i-- ) {
        item = JSON.parse(localStorage.getItem(keys[i]));
        html = '<tr><td scoper="row" data-label="Imię">'+item.ownerName+'</td><td data-label="Nazwisko">'+item.ownerLastName+'</td><td data-label="Adres email">'+item.email+'</td><td data-label="Imię psa">'+item.dogName+'</td><td data-label="Rasa">'+item.dogBreed+'</td><td data-label="Wiek psa">'+item.age+'</td><td data-label="Coś o sobie">'+item.about+'<td data-label="Akcje"><button class="deleteBtn" value="'+keys[i]+'">Usuń</button></td></tr>';
        $("#table-body").append(html);  
    }
    
    $(".deleteBtn").click(function(){
        localStorage.removeItem($(this).val());
        location.reload();
    });

    $("#clear-local-storage").click(function(){
        localStorage.clear();
        location.reload();
    });
});



