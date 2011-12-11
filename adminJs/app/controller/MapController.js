Ext.define("MsAdmin.controller.MapController", {
	extend: "Ext.app.Controller",
	views: [
		'sensor.Sensor',
		'map.MapLayout'
	],
	refs: [{
		ref: "MapLayout",
		selector: "MapLayout"
	}],
	init: function() {
		this.control({
			'[ref="savePosButton"]': {
				click: this.onSavePositionClick
			}
		});

		MsAdmin.Event.on('server.selected', this.renderSensors, this);
		MsAdmin.Event.on('sensor.selected', this.highlightSensor, this);
		MsAdmin.Event.on('map.sensor.add', this.addSensor, this);
		MsAdmin.Event.on('sensor.destroyed', this.removeSensor, this);
	},

	onSavePositionClick: function() {
		var sensors = this.getStore('Sensors');
		sensors.sync();
	},

	addSensor: function(sensor) {
		var exists = false;
		this.eachSensor(function(item){
			if(sensor == item.getModel()) {
				exists = true;
				return false;
			}
		});

		if(exists) {
			MsAdmin.Event.fire('notice', {
				msg: MsAdmin.t("Sensor is already on map")
			});

			return false;
		}

		this.getMapLayout().add({
			xtype: "Sensor",
			model: sensor
		});
	},
	removeSensor: function(model) {
		this.eachSensor(function(item) {
			if(item.getModel() == model) {
				item.getEl().frame('black', 1);
				// because of YABIE
				setTimeout(function(){
					item.destroy();
				}, 1000)
			}
		});
	},

	renderSensors: function(server) {
		Ext.each(this.getMapLayout().query('Sensor'), function(item) {
			item.destroy();
		});

		server.sensors().each(function(sensor) {
			this.addSensor(sensor);
		}, this);
	},
	highlightSensor: function(sensor) {
		this.eachSensor(function(item) {
			if(item.getModel() == sensor) {
				item.getEl().frame('red');
				return ;
			}
		});
	},
	eachSensor: function(fn) {
		Ext.each(this.getMapLayout().query('Sensor'), fn, this);
	}
});