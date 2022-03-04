import Cookies from  './js.cookie.js'

function getCard() {
  var card_barcode;
  var cookie_barcode = Cookies.get('tuni-library-card');
  if (cookie_barcode && cookie_barcode != '2500000000' & window.location.hash == '') {
    card_barcode = Cookies.get('tuni-library-card');
  } else if (window.location.hash.substring(1)) {
    card_barcode = window.location.hash.substring(1);
    Cookies.set('tuni-library-card',card_barcode.trim().replaceAll('\.',''), {expires: 365, secure: true, sameSite: 'strict'})
  } else {
    card_barcode = '2500000000';
  }
  
  return card_barcode;

}


var defaultValues = {

    CODE39 : getCard()
   
};


function updateFromHash() {
  $("#userInput").val(window.location.hash.substring(1));
  newBarcode();
}

window.addEventListener('hashchange', updateFromHash, false);


$(document).ready(function(){
    $("#userInput").val(getCard());
    $("#userInput").on('input',newBarcode);
    newBarcode();
});

var newBarcode = function() {
    //Convert to boolean
    
    Cookies.set('tuni-library-card',$("#userInput").val().trim().replaceAll('\.',''), {expires: 365, secure: true, sameSite: 'strict'})
    $("#barcode").JsBarcode(
        $("#userInput").val().trim().replaceAll('\.',''),
        {
          "format": 'CODE39',
          "background": "#FFFFFF",
          "lineColor": "000000",
          "fontSize": 20,
          "height": 100,
          "width": 2,
          "margin": 3,
          "textMargin": 8,
          "displayValue": "true",
          "font": "Monospace",
          "textAlign": "center",
          "valid":
            function(valid){
              if(valid){
                $("#barcode").show();
                $("#invalid").hide();
              }
              else{
                $("#barcode").hide();
                $("#invalid").show();
              }
            }
        });
};
