sap.ui.define([
	"../mixin/functionImports"
], function(functionImports) {
    'use strict';

    return {
        ...functionImports,

        getProductsByRating: function() {
            this.showProductsByRating();
        },

        onNavToFreestyleApp: function() {
            const sProductID = this.getView().getBindingContext().getObject("ID");
            const sObjectPageRoute = `/product/${sProductID}/view`;
            sap.ushell.Container.getServiceAsync("Navigation").then((oService) => {
                oService.navigate({
                    target: {
                        shellHash: `appproducts-managing&${sObjectPageRoute}`
                    }
                })
            })
        }
    };
});