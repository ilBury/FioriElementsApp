sap.ui.define([
    "sap/ui/model/Filter", 
    "sap/ui/comp/smartfilterbar/SmartFilterBar", 
    "sap/m/DateRangeSelection"
], function (Filter, SmartFilterBar, DateRangeSelection) {
    "use strict";
    return {
        getCustomAppStateDataExtension: function (oCustomData) {
            if (oCustomData) {
                const oCustomFieldDate = this.oView.byId("CreateAtInput");
                if (oCustomFieldDate) {
                    oCustomData.ReleaseDate = {
                        startDate: oCustomFieldDate.getDateValue(),
                        endDate: oCustomFieldDate.getSecondDateValue()
                    };
                }
            }
        },
        restoreCustomAppStateDataExtension: function (oCustomData) {
            if (oCustomData) {
                if (oCustomData.ReleaseDate) {
                    const oDateRangeSelection = this.oView.byId("CreateAtInput");
                    oDateRangeSelection.setDateValue(oCustomData.ReleaseDate.startDate);
                    oDateRangeSelection.setDateValue(oCustomData.ReleaseDate.endDate);
                }
            }
        },
        onBeforeRebindTableExtension: function(oEvent) {
            const oBindingParams = oEvent.getParameter("bindingParams");
            oBindingParams.parameters = oBindingParams.parameters || {};
            const oSmartTable = oEvent.getSource();
            const oSmartFilterBar = this.byId(oSmartTable.getSmartFilterId());
            
            if (oSmartFilterBar instanceof SmartFilterBar) {
                const oCustomControl = oSmartFilterBar.getControlByKey("filter_key");
                
                if (oCustomControl instanceof DateRangeSelection) {
                    const oReleaseDateFilter = this._getReleaseDateFilter(oCustomControl);

                    oReleaseDateFilter ? oBindingParams.filters.push(oReleaseDateFilter) : null;
                }
            }
        },
        
        _getReleaseDateFilter: function(oCustomControl) {
            const sStartDate = oCustomControl.getDateValue();
            const sEndDate = oCustomControl.getSecondDateValue();

            if(!sStartDate || !sEndDate) {
                return;
            }
        
            return new Filter({
                path: "ReleaseDate",
                operator: "BT",
                value1: sStartDate,
                value2: sEndDate
            });
        },
        getProductsByRating: function(oEvent) {
            this.getView().getModel().callFunction("/GetProductsByRating", {
                method: "GET",
                urlParameters: {
                    rating: 4
                },
                success: (oData) => {

                   
                },
                error: (oError) => {
                    
                }
            })
        }
    };
});