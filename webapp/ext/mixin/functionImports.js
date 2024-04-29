sap.ui.define([
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function(MessageToast, MessageBox) {
	"use strict";

	return  {
        getProductsByRating: function() {
            debugger
            this.getView().getModel().callFunction("/GetProductsByRating", {
                method: "GET",
                urlParameters: {
                    rating: 4
                },
                success: (oData) => {
                    MessageToast.show(oData.results.map(el => el.Name).join(', '))
                },
                error: (oError) => {
                    MessageBox.error(oError.message)
                }
            })
        }
	};
});