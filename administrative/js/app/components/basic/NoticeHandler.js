// Generated by CoffeeScript 1.3.3

Ext.define("MsAdmin.components.basic.NoticeHandler", {
  singleton: true,
  constructor: function() {
    return MsAdmin.Event.on("notice", this.showNotice, this);
  },
  showNotice: function(config) {
    config = Ext.applyIf(config || {}, {
      msg: ""
    });
    return this.getWindow(config).show();
  },
  getWindow: function(config) {
    return Ext.create("MsAdmin.components.ux.Notification", {
      html: config.msg
    });
  }
});
