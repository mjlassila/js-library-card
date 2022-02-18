import Cookies from  './js.cookie.js'

function getCard() {
  return (Cookies.get('tuni-library-card') ? Cookies.get('tuni-library-card') : '2500000000');
}


var defaultValues = {

    CODE39 : getCard()
   
};

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
