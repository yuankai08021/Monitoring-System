/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

Pre-release code in the Ext repository is intended for development purposes only and will
not always be stable. 

Use of pre-release code is permitted with your application at your own risk under standard
Ext license terms. Public redistribution is prohibited.

For early licensing, please contact us at licensing@sencha.com

Build date: 2013-04-10 13:07:48 (5666a13403de1690768122924485271bdcc83b7f)
*/
/**
 * This class is used internally to provide a single interface when using
 * a locking grid. Internally, the locking grid creates two separate grids,
 * so this class is used to map calls appropriately.
 * @private
 */
Ext.define('Ext.grid.locking.View', {
    alternateClassName: 'Ext.grid.LockingView',

    mixins: {
        observable: 'Ext.util.Observable'
    },

    /**
     * @property {Boolean} isLockingView
     * `true` in this class to identify an object as an instantiated LockingView, or subclass thereof.
     */
    isLockingView: true,

    eventRelayRe: /^(beforeitem|beforecontainer|item|container|cell|refresh)/,

    constructor: function(config){
        var me = this,
            eventNames = [],
            eventRe = me.eventRelayRe,
            locked = config.locked.getView(),
            normal = config.normal.getView(),
            events,
            event;

        Ext.apply(me, {
            lockedView: locked,
            normalView: normal,
            lockedGrid: config.locked,
            normalGrid: config.normal,
            panel: config.panel
        });
        me.mixins.observable.constructor.call(me, config);

        // relay events
        events = locked.events;
        for (event in events) {
            if (events.hasOwnProperty(event) && eventRe.test(event)) {
                eventNames.push(event);
            }
        }
        me.relayEvents(locked, eventNames);
        me.relayEvents(normal, eventNames);

        normal.on({
            scope: me,
            itemmouseleave: me.onItemMouseLeave,
            itemmouseenter: me.onItemMouseEnter
        });

        locked.on({
            scope: me,
            itemmouseleave: me.onItemMouseLeave,
            itemmouseenter: me.onItemMouseEnter
        });
        
        me.panel.on({
            render: me.onPanelRender,
            scope: me
        });
    },

    onPanelRender: function() {
        var me = this,
            mask = me.loadMask,
            cfg = {
                target: me.panel,
                msg: me.loadingText,
                msgCls: me.loadingCls,
                useMsg: me.loadingUseMsg,
                store: me.panel.store
            };

        // Because this is used as a View, it should have an el. Use the owning Lockable's body.
        // It also has to fire a render event so that Editing plugins can attach listeners
        me.el = me.panel.body;
        me.fireEvent('render', me);

        if (mask) {
            // either a config object 
            if (Ext.isObject(mask)) {
                cfg = Ext.apply(cfg, mask);
            }
            // Attach the LoadMask to a *Component* so that it can be sensitive to resizing during long loads.
            // If this DataView is floating, then mask this DataView.
            // Otherwise, mask its owning Container (or this, if there *is* no owning Container).
            // LoadMask captures the element upon render.
            me.loadMask = new Ext.LoadMask(cfg);
        }
    },

    getGridColumns: function() {
        var cols = this.lockedGrid.headerCt.getGridColumns();
        return cols.concat(this.normalGrid.headerCt.getGridColumns());
    },

    getEl: function(column){
        return this.getViewForColumn(column).getEl();
    },

    getViewForColumn: function(column) {
        var view = this.lockedView,
            inLocked;

        view.headerCt.cascade(function(col){
            if (col === column) {
                inLocked = true;
                return false;
            }
        });

        return inLocked ? view : this.normalView;
    },

    onItemMouseEnter: function(view, record){
        var me = this,
            locked = me.lockedView,
            other = me.normalView,
            item;

        if (view.trackOver) {
            if (view !== locked) {
                other = locked;
            }
            item = other.getNode(record, false);
            other.highlightItem(item);
        }
    },

    onItemMouseLeave: function(view, record){
        var me = this,
            locked = me.lockedView,
            other = me.normalView;

        if (view.trackOver) {
            if (view !== locked) {
                other = locked;
            }
            other.clearHighlight();
        }
    },

    relayFn: function(name, args){
        args = args || [];

        var view = this.lockedView;
        view[name].apply(view, args);
        view = this.normalView;
        view[name].apply(view, args);
    },

    getSelectionModel: function(){
        return this.panel.getSelectionModel();
    },

    getStore: function(){
        return this.panel.store;
    },

    getNode: function(nodeInfo, dataRow) {
        // default to the normal view
        return this.normalView.getNode(nodeInfo, dataRow);
    },

    getCell: function(record, column) {
        var view = this.getViewForColumn(column),
            row = view.getNode(record, true);
            
        return Ext.fly(row).down(column.getCellSelector());
    },

    indexOf: function(record) {
        var result = this.lockedView.indexOf(record);
        if (!result) {
            result = this.normalView.indexOf(record);
        }
        return result;
    },

    focus: function() {
        var p = this.getSelectionModel().getCurrentPosition(),
            v = p ? p.view : this.normalView;

        v.focus();
    },

    focusCell: function(position) {
        position.view.focusCell(position);
    },

    isVisible: function(deep) {
        return this.panel.isVisible(deep);
    },

    getRecord: function(node) {
        var result = this.lockedView.getRecord(node);
        if (!result) {
            result = this.normalView.getRecord(node);
        }
        return result;
    },
    
    scrollBy: function(){
        var normal = this.normalView;
        normal.scrollBy.apply(normal, arguments);
    },

    addElListener: function(eventName, fn, scope){
        this.relayFn('addElListener', arguments);
    },

    refreshNode: function(){
        this.relayFn('refreshNode', arguments);
    },

    refresh: function(){
        this.relayFn('refresh', arguments);
    },

    bindStore: function(){
        this.relayFn('bindStore', arguments);
    },

    addRowCls: function(){
        this.relayFn('addRowCls', arguments);
    },

    removeRowCls: function(){
        this.relayFn('removeRowCls', arguments);
    },
    
    destroy: function(){
        var me = this,
            mask = me.loadMask;
            
        // Typically the mask unbinding is handled by the view, but
        // we aren't a normal view, so clear it out here
        me.clearListeners();
        if (mask && mask.bindStore) {
            mask.bindStore(null);
        }
    }

});