


// url param reader
// https://www.jquerybyexample.net/2012/06/get-url-parameters-using-jquery

function GetURLParameter(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}



var countryPrefix = localStorage.getItem('urlPrefix');
//get sku from query parameter
var currentUrl = new URL(window.location.href);
var sku = currentUrl.searchParams.get("sku");
var memberEmail = sessionStorage.getItem('memberEmail');

var countryId = localStorage.getItem('countryId');
console.log('countryId: ' + countryId);
// fetch(new Request('/api/getRetailProductBySku?sku=' + sku + '&countryId=' + countryId,
//     {
//         method: 'GET'
//     })).then(function (response) {
//         return response.json();
//     }).then(function (product) {
//         console.log(product);
//     }).catch(function(error) {
//         console.log(error);
//     });







let furnitureList = '';




document.addEventListener('DOMContentLoaded', function () {
    
    let param1="showroomId"
    fetch(`/api/getShowroomById/${GetURLParameter(param1)}`, {
        method: 'GET',
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        furnitureList=data.furniture
        const img = document.getElementById("showroom-img");

        img.src = `${data.showroom.cover_image_url}`;
        img.alt = data.showroom.cover_image_url;

        
    })
    .catch(err => {
        console.error(err);
        alert('Failed to load showroom');
    });
});







// assign btns
// doing it like this instead of onclick="del()" for scalability
document.addEventListener("click", function(e) {
    if (e.target.classList.contains("btn-delete")) {
        const id = e.target.dataset.id;
        del(id);
    }
});

