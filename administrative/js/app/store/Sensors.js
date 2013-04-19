Ext.define("MsAdmin.store.Sensors", {
	extend: "Ext.data.Store",
    model: 'MsAdmin.model.Sensor',
    autoLoad: false,
    listeners: {
    	update: function(store, model, operation, eventOptions) {
      		if(operation == Ext.data.Model.EDIT) {
          		return false;
      		} else if( operation == Ext.data.Model.COMMIT ) {
      			return true;
      		}
      	}
    }
});