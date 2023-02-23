# JavaScript Library Card

Simple, self-contained Javascript app for displaying CODE39-barcodes commonly used in library cards.
Based on [JsBarcode](https://github.com/lindell/JsBarcode). Uses [js-cookie](https://github.com/js-cookie/js-cookie) for persisting barcode for one year.  Reads initial barcode value from URL (https://[your-server/librarycard/#2561231231]) or from user input.

## Primo VE integration

Credits: [mpitka](https://github.com/mpitka/)

1. Enable [displaying additional user identifiers](https://knowledge.exlibrisgroup.com/Primo/Product_Documentation/020Primo_VE/Primo_VE_(English)/060Library_Card_Configuration/Configuring_Personal_Details_Settings_for_Primo_VE) in Primo VE user profile

2. Include following to your Primo VE customizations. Please note that at least you have to modify parameters to startsWith() functions which check whether the idenfitier is barcode or something else. 

## custom.js

```JavaScript

    app.component('prmPersonalInfoAfter', {
        controller: 'bcode',
        template: '<div ng-if="$ctrl.getId()" style="background-color:#f3f3f3;display:block;margin:0 8px 0 8px;padding:15px 26px 15px 26px;">Sähköinen kirjastokortti | eLibrary card: &nbsp;<a href="https://webpages.tuni.fi/tunilib/librarycard/#{{$ctrl.getId()}}" target="_blank">{{$ctrl.getId()}}</a></div>'
    });
    app.controller('bcode', [function () {
        var bcode = this;
        bcode.getId = getId;
        function getId() {
            var ids = document.getElementsByClassName("margin-left-medium");
            if (typeof ids[0] !== 'undefined' && typeof ids[1] !== 'undefined') {
                if ((ids[0].innerHTML.toString().startsWith('25')) 
                || (ids[0].innerHTML.toString().startsWith('837a'))) { 
                    return ids[0].innerHTML;
                } else {
                    return ids[1].innerHTML;
                }
            } else { 
                return ids[0].innerHTML;
            }
        }
    }]);

```

## custom.css

```CSS
/* Hide extra user info, as identifier is needed only for creating link to library card */
.user-info-section {
  display:none;
}
```
