// Generated by CoffeeScript 1.3.3

Ext.define("MsAdmin.components.ux.Notification", {
  extend: "Ext.window.Window",
  alias: "widget.uxNotification",
  title: "Notification",
  cls: "ux-notification-light",
  autoDestroy: true,
  autoHeight: true,
  plain: false,
  draggable: false,
  shadow: false,
  focus: Ext.emptyFn,
  manager: null,
  useXAxis: false,
  corner: "tr",
  spacing: 6,
  paddingX: 30,
  paddingY: 10,
  slideInAnimation: "easeIn",
  slideDownAnimation: "bounceOut",
  autoDestroyDelay: 2000,
  slideInDelay: 500,
  slideDownDelay: 500,
  fadeDelay: 500,
  stickOnClick: true,
  stickWhileHover: true,
  underDestruction: false,
  readyToDestroy: false,
  xPos: 0,
  yPos: 0,
  statics: {
    defaultManager: {
      notifications: [],
      el: null
    }
  },
  initComponent: function() {
    var me;
    me = this;
    me.callParent(arguments_);
    switch (me.corner) {
      case "br":
        me.paddingFactorX = -1;
        me.paddingFactorY = -1;
        me.siblingAlignment = "br-br";
        if (me.useXAxis) {
          me.managerAlignment = "bl-br";
        } else {
          me.managerAlignment = "tr-br";
        }
        break;
      case "bl":
        me.paddingFactorX = 1;
        me.paddingFactorY = -1;
        me.siblingAlignment = "bl-bl";
        if (me.useXAxis) {
          me.managerAlignment = "br-bl";
        } else {
          me.managerAlignment = "tl-bl";
        }
        break;
      case "tr":
        me.paddingFactorX = -1;
        me.paddingFactorY = 1;
        me.siblingAlignment = "tr-tr";
        if (me.useXAxis) {
          me.managerAlignment = "tl-tr";
        } else {
          me.managerAlignment = "br-tr";
        }
        break;
      case "tl":
        me.paddingFactorX = 1;
        me.paddingFactorY = 1;
        me.siblingAlignment = "tl-tl";
        if (me.useXAxis) {
          me.managerAlignment = "tr-tl";
        } else {
          me.managerAlignment = "bl-tl";
        }
    }
    if (typeof me.manager === "string") {
      me.manager = Ext.getCmp(me.manager);
    }
    if (!me.manager) {
      me.manager = me.statics().defaultManager;
      if (!me.manager.el) {
        me.manager.el = Ext.getBody();
      }
    }
    if (typeof me.manager.notifications === "undefined") {
      return me.manager.notifications = [];
    }
  },
  onRender: function() {
    var me;
    me = this;
    me.callParent(arguments_);
    if (me.stickOnClick ? me.body && me.body.dom : void 0) {
      Ext.fly(me.body.dom).on("click", me.cancelAutoDestroy, me);
    }
    if (me.autoDestroy) {
      me.task = new Ext.util.DelayedTask(me.doAutoDestroy, me);
      me.task.delay(me.autoDestroyDelay);
    }
    return me.el.hover((function() {
      return me.mouseIsOver = true;
    }), (function() {
      return me.mouseIsOver = false;
    }), me);
  },
  getXposAlignedToManager: function() {
    var me, xPos;
    me = this;
    xPos = 0;
    if (me.corner === "br" || me.corner === "tr") {
      xPos += me.manager.el.getRight();
      xPos -= me.el.getWidth() + me.paddingX;
    } else {
      xPos += me.manager.el.getLeft();
      xPos += me.paddingX;
    }
    return xPos;
  },
  getYposAlignedToManager: function() {
    var me, yPos;
    me = this;
    yPos = 0;
    if (me.corner === "br" || me.corner === "bl") {
      yPos += me.manager.el.getBottom();
      yPos -= me.el.getHeight() + me.paddingY;
    } else {
      yPos += me.manager.el.getTop();
      yPos += me.paddingY;
    }
    return yPos;
  },
  getXposAlignedToSibling: function(sibling) {
    var me;
    me = this;
    if (me.useXAxis) {
      if (me.corner === "tl" || me.corner === "bl") {
        return sibling.xPos + sibling.el.getWidth() + sibling.spacing;
      } else {
        return sibling.xPos - me.el.getWidth() - me.spacing;
      }
    } else {
      return me.el.getLeft();
    }
  },
  getYposAlignedToSibling: function(sibling) {
    var me;
    me = this;
    if (me.useXAxis) {
      return me.el.getTop();
    } else {
      if (me.corner === "tr" || me.corner === "tl") {
        return sibling.yPos + sibling.el.getHeight() + sibling.spacing;
      } else {
        return sibling.yPos - me.el.getHeight() - sibling.spacing;
      }
    }
  },
  beforeShow: function() {
    var me;
    me = this;
    if (me.manager.notifications.length) {
      me.el.alignTo(me.manager.notifications[me.manager.notifications.length - 1].el, me.siblingAlignment, [0, 0]);
      me.xPos = me.getXposAlignedToSibling(me.manager.notifications[me.manager.notifications.length - 1]);
      me.yPos = me.getYposAlignedToSibling(me.manager.notifications[me.manager.notifications.length - 1]);
    } else {
      me.el.alignTo(me.manager.el, me.managerAlignment, [me.paddingX * me.paddingFactorX, me.paddingY * me.paddingFactorY]);
      me.xPos = me.getXposAlignedToManager();
      me.yPos = me.getYposAlignedToManager();
    }
    Ext.Array.include(me.manager.notifications, me);
    return me.el.animate({
      to: {
        x: me.xPos,
        y: me.yPos
      },
      easing: me.slideInAnimation,
      duration: me.slideInDelay,
      dynamic: true
    });
  },
  slideDown: function() {
    var index, me;
    me = this;
    index = Ext.Array.indexOf(me.manager.notifications, me);
    if (!me.underDestruction && me.el) {
      if (index) {
        me.xPos = me.getXposAlignedToSibling(me.manager.notifications[index - 1]);
        me.yPos = me.getYposAlignedToSibling(me.manager.notifications[index - 1]);
      } else {
        me.xPos = me.getXposAlignedToManager();
        me.yPos = me.getYposAlignedToManager();
      }
      return me.el.animate({
        to: {
          x: me.xPos,
          y: me.yPos
        },
        easing: me.slideDownAnimation,
        duration: me.slideDownDelay,
        dynamic: true
      });
    }
  },
  cancelAutoDestroy: function() {
    var me;
    me = this;
    me.addClass("notification-fixed");
    if (me.autoDestroy) {
      me.task.cancel();
      return me.autoDestroy = false;
    }
  },
  doAutoDestroy: function() {
    var me;
    me = this;
    me.el.hover((function() {}), (function() {
      return me.destroy();
    }), me);
    if (!(me.stickWhileHover && me.mouseIsOver)) {
      return me.destroy();
    }
  },
  listeners: {
    beforehide: function(me, eOpts) {
      if (!me.underDestruction) {
        me.destroy();
        return false;
      }
    }
  },
  destroy: function() {
    var me;
    me = this;
    if (!me.underDestruction) {
      me.underDestruction = true;
      me.cancelAutoDestroy();
      me.stopAnimation();
      me.el.animate({
        to: {
          opacity: 0
        },
        easing: "easeIn",
        duration: me.fadeDelay,
        dynamic: true,
        listeners: {
          afteranimate: function() {
            var index;
            index = Ext.Array.indexOf(me.manager.notifications, me);
            if (index !== -1) {
              Ext.Array.erase(me.manager.notifications, index, 1);
              while (index < me.manager.notifications.length) {
                me.manager.notifications[index].slideDown();
                index++;
              }
            }
            me.readyToDestroy = true;
            return me.destroy();
          }
        }
      });
    }
    if (me.readyToDestroy) {
      return this.callParent(arguments_);
    }
  }
});
