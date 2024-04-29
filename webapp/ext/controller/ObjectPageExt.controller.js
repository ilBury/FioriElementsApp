sap.ui.define([
	"../mixin/functionImports"
], function(functionImports) {
    'use strict';

    return {
        ...functionImports,

        getProductsByRating: function() {
            this.showProductsByRating();
        }
    };
});