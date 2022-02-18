var defaultValues = {

    CODE39 : "2500000000",
   
};

$(document).ready(function(){
    $("#userInput").on('input',newBarcode);
    $("#barcodeType").change(function(){
        $("#userInput").val( defaultValues[$(this).val()] );

        newBarcode();
    });

    newBarcode();
});

var newBarcode = function() {
    //Convert to boolean
    $("#barcode").JsBarcode(
        $("#userInput").val(),
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
