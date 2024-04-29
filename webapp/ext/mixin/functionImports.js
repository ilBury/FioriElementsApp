sap.ui.define([
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], (MessageToast, MessageBox) => {
	"use strict";

	return  {
        showProductsByRating: function() {
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