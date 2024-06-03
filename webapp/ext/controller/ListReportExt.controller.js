sap.ui.define([
    "sap/ui/model/Filter", 
    "sap/ui/comp/smartfilterbar/SmartFilterBar", 
    "sap/m/DateRangeSelection",
	"../mixin/functionImports",
    "sap/ui/model/FilterOperator"
], function (Filter,
	SmartFilterBar,
	DateRangeSelection,
    functionImports,
    FilterOperator) {
    "use strict";
    return {
        ...functionImports,

        getCustomAppStateDataExtension: function(oCustomData) {
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
            if (oCustomData?.ReleaseDate) {
                const oDateRangeSelection = this.oView.byId("CreateAtInput");
                oDateRangeSelection.setDateValue(oCustomData.ReleaseDate.startDate);
                oDateRangeSelection.setDateValue(oCustomData.ReleaseDate.endDate);
            }
        },
        onBeforeRebindTableExtension: function(oEvent) {
            const oBindingParams = oEvent.getParameter("bindingParams");
            oBindingParams.parameters = oBindingParams.parameters || {};
            const oSmartTable = oEvent.getSource();
            const oSmartFilterBar = this.byId(oSmartTable.getSmartFilterId());
            
            if (oSmartFilterBar instanceof SmartFilterBar) {
                const oCustomControl = oSmartFilterBar.getControlByKey("dateFilter");
                
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
                operator: FilterOperator.BT,
                value1: sStartDate,
                value2: sEndDate
            });
        },

        getProductsByRating: function() {    
            this.showProductsByRating();
        }, 

        onNavToFreestyleApp: function() {
            sap.ushell.Container.getServiceAsync("CrossApplicationNavigation").then((oService) => {
                const sHref = (oService &&
                    oService.hrefForExternal({
                        target: {
                            semanticObject: "appproducts",
                            action: "managing"
                        }   
                    })
                ) || ""
                oService.toExternal({target: {shellHash: sHref}})
            })
        }
    };
});