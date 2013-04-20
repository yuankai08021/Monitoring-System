// Generated by CoffeeScript 1.3.3

Ext.define("MsAdmin.view.sensor.SensorList", {
  extend: "MsAdmin.core.widget.EditList",
  store: "Sensors",
  alias: "widget.SensorList",
  viewConfig: {
    plugins: [
      {
        ptype: "gridviewdragdrop",
        dragText: "Place it to map",
        ddGroup: "sensor-map"
      }
    ]
  },
  constructor: function(config) {
    return this.callParent([
      Ext.applyIf(config || {}, {
        columns: [
          {
            tdCls: "list-td",
            flex: .7,
            editable: false,
            header: "Location",
            dataIndex: "name"
          }, this.getEditActionColumn()
        ]
      })
    ]);
  }
});
