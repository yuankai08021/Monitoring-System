Ext.data.JsonP.Ext_ModelManager({"mixedInto":[],"xtypes":{},"tagname":"class","html":"<div><pre class=\"hierarchy\"><h4>Alternate names</h4><div class='alternate-class-name'>Ext.ModelMgr</div><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/Ext.Base' rel='Ext.Base' class='docClass'>Ext.Base</a><div class='subclass '><a href='#!/api/Ext.AbstractManager' rel='Ext.AbstractManager' class='docClass'>Ext.AbstractManager</a><div class='subclass '><strong>Ext.ModelManager</strong></div></div></div><h4>Requires</h4><div class='dependency'><a href='#!/api/Ext.data.association.Association' rel='Ext.data.association.Association' class='docClass'>Ext.data.association.Association</a></div><h4>Files</h4><div class='dependency'><a href='source/ModelManager.html#Ext-ModelManager' target='_blank'>ModelManager.js</a></div></pre><div class='doc-contents'><p>The ModelManager keeps track of all <a href=\"#!/api/Ext.data.Model\" rel=\"Ext.data.Model\" class=\"docClass\">Ext.data.Model</a> types defined in your application.</p>\n\n<p><strong>Creating Model Instances</strong></p>\n\n<p>Model instances can be created by using the <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a> method. Ext.create replaces\nthe deprecated <a href=\"#!/api/Ext.ModelManager-method-create\" rel=\"Ext.ModelManager-method-create\" class=\"docClass\">Ext.ModelManager.create</a> method. It is also possible to create a model instance\nthis by using the Model type directly. The following 3 snippets are equivalent:</p>\n\n<pre><code>Ext.define('User', {\n    extend: 'Ext.data.Model',\n    fields: ['first', 'last']\n});\n\n// method 1, create using Ext.create (recommended)\nExt.create('User', {\n    first: 'Ed',\n    last: 'Spencer'\n});\n\n// method 2, create through the manager (deprecated)\nExt.ModelManager.create({\n    first: 'Ed',\n    last: 'Spencer'\n}, 'User');\n\n// method 3, create on the type directly\nnew User({\n    first: 'Ed',\n    last: 'Spencer'\n});\n</code></pre>\n\n<p><strong>Accessing Model Types</strong></p>\n\n<p>A reference to a Model type can be obtained by using the <a href=\"#!/api/Ext.ModelManager-method-getModel\" rel=\"Ext.ModelManager-method-getModel\" class=\"docClass\">getModel</a> function. Since models types\nare normal classes, you can access the type directly. The following snippets are equivalent:</p>\n\n<pre><code>Ext.define('User', {\n    extend: 'Ext.data.Model',\n    fields: ['first', 'last']\n});\n\n// method 1, access model type through the manager\nvar UserType = Ext.ModelManager.getModel('User');\n\n// method 2, reference the type directly\nvar UserType = User;\n</code></pre>\n</div><div class='members'><div id='m-property'><div class='definedBy'>Defined By</div><h3 class='members-title'>Properties</h3><div class='subsection'><div id='property-all' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.AbstractManager' rel='Ext.AbstractManager' class='definedIn docClass'>Ext.AbstractManager</a><br/><a href='source/AbstractManager.html#Ext-AbstractManager-property-all' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.AbstractManager-property-all' class='name not-expandable'>all</a><span> : <a href=\"#!/api/Ext.util.HashMap\" rel=\"Ext.util.HashMap\" class=\"docClass\">Ext.util.HashMap</a></span></div><div class='description'><div class='short'><p>Contains all of the items currently managed</p>\n</div><div class='long'><p>Contains all of the items currently managed</p>\n</div></div></div><div id='property-associationStack' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ModelManager' rel='Ext.ModelManager' class='definedIn docClass'>Ext.ModelManager</a><br/><a href='source/ModelManager.html#Ext-ModelManager-property-associationStack' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ModelManager-property-associationStack' class='name not-expandable'>associationStack</a><span> : <a href=\"#!/api/Ext.data.association.Association\" rel=\"Ext.data.association.Association\" class=\"docClass\">Ext.data.association.Association</a>[]</span></div><div class='description'><div class='short'><p>Private stack of associations that must be created once their associated model has been defined</p>\n</div><div class='long'><p>Private stack of associations that must be created once their associated model has been defined</p>\n</div></div></div><div id='property-callOverridden' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.Base' rel='Ext.Base' class='definedIn docClass'>Ext.Base</a><br/><a href='source/Base3.html#Ext-Base-property-callOverridden' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.Base-property-callOverridden' class='name expandable'>callOverridden</a><span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></span><strong class='protected-signature'>protected</strong><strong class='deprecated-signature'>deprecated</strong></div><div class='description'><div class='short'>Call the original method that was previously overridden with override\n\nExt.define('My.Cat', {\n    constructor: functi...</div><div class='long'><p>Call the original method that was previously overridden with <a href=\"#!/api/Ext.Base-static-method-override\" rel=\"Ext.Base-static-method-override\" class=\"docClass\">override</a></p>\n\n<pre><code>Ext.define('My.Cat', {\n    constructor: function() {\n        alert(\"I'm a cat!\");\n\n        return this;\n    }\n});\n\nMy.Cat.override({\n    constructor: function() {\n        alert(\"I'm going to be a cat!\");\n\n        var instance = this.callOverridden();\n\n        alert(\"Meeeeoooowwww\");\n\n        return instance;\n    }\n});\n\nvar kitty = new My.Cat(); // alerts \"I'm going to be a cat!\"\n                          // alerts \"I'm a cat!\"\n                          // alerts \"Meeeeoooowwww\"\n</code></pre>\n<div class='deprecated'><p>This property has been <strong>deprecated</strong> </p><p>as of 4.1. Use <a href=\"#!/api/Ext.Base-property-callParent\" rel=\"Ext.Base-property-callParent\" class=\"docClass\">callParent</a> instead.</p>\n</div></div></div></div><div id='property-callParent' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.Base' rel='Ext.Base' class='definedIn docClass'>Ext.Base</a><br/><a href='source/Base3.html#Ext-Base-property-callParent' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.Base-property-callParent' class='name expandable'>callParent</a><span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></span><strong class='protected-signature'>protected</strong></div><div class='description'><div class='short'>Call the \"parent\" method of the current method. ...</div><div class='long'><p>Call the \"parent\" method of the current method. That is the method previously\noverridden by derivation or by an override (see <a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>).</p>\n\n<pre><code> Ext.define('My.Base', {\n     constructor: function (x) {\n         this.x = x;\n     },\n\n     statics: {\n         method: function (x) {\n             return x;\n         }\n     }\n });\n\n Ext.define('My.Derived', {\n     extend: 'My.Base',\n\n     constructor: function () {\n         this.callParent([21]);\n     }\n });\n\n var obj = new My.Derived();\n\n alert(obj.x);  // alerts 21\n</code></pre>\n\n<p>This can be used with an override as follows:</p>\n\n<pre><code> Ext.define('My.DerivedOverride', {\n     override: 'My.Derived',\n\n     constructor: function (x) {\n         this.callParent([x*2]); // calls original My.Derived constructor\n     }\n });\n\n var obj = new My.Derived();\n\n alert(obj.x);  // now alerts 42\n</code></pre>\n\n<p>This also works with static methods.</p>\n\n<pre><code> Ext.define('My.Derived2', {\n     extend: 'My.Base',\n\n     statics: {\n         method: function (x) {\n             return this.callParent([x*2]); // calls My.Base.method\n         }\n     }\n });\n\n alert(My.Base.method(10);     // alerts 10\n alert(My.Derived2.method(10); // alerts 20\n</code></pre>\n\n<p>Lastly, it also works with overridden static methods.</p>\n\n<pre><code> Ext.define('My.Derived2Override', {\n     override: 'My.Derived2',\n\n     statics: {\n         method: function (x) {\n             return this.callParent([x*2]); // calls My.Derived2.method\n         }\n     }\n });\n\n alert(My.Derived2.method(10); // now alerts 40\n</code></pre>\n</div></div></div><div id='property-self' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.Base' rel='Ext.Base' class='definedIn docClass'>Ext.Base</a><br/><a href='source/Base3.html#Ext-Base-property-self' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.Base-property-self' class='name expandable'>self</a><span> : <a href=\"#!/api/Ext.Class\" rel=\"Ext.Class\" class=\"docClass\">Ext.Class</a></span><strong class='protected-signature'>protected</strong></div><div class='description'><div class='short'>Get the reference to the current class from which this object was instantiated. ...</div><div class='long'><p>Get the reference to the current class from which this object was instantiated. Unlike <a href=\"#!/api/Ext.Base-method-statics\" rel=\"Ext.Base-method-statics\" class=\"docClass\">statics</a>,\n<code>this.self</code> is scope-dependent and it's meant to be used for dynamic inheritance. See <a href=\"#!/api/Ext.Base-method-statics\" rel=\"Ext.Base-method-statics\" class=\"docClass\">statics</a>\nfor a detailed comparison</p>\n\n<pre><code>Ext.define('My.Cat', {\n    statics: {\n        speciesName: 'Cat' // My.Cat.speciesName = 'Cat'\n    },\n\n    constructor: function() {\n        alert(this.self.speciesName); / dependentOL on 'this'\n\n        return this;\n    },\n\n    clone: function() {\n        return new this.self();\n    }\n});\n\n\nExt.define('My.SnowLeopard', {\n    extend: 'My.Cat',\n    statics: {\n        speciesName: 'Snow Leopard'         // My.SnowLeopard.speciesName = 'Snow Leopard'\n    }\n});\n\nvar cat = new My.Cat();                     // alerts 'Cat'\nvar snowLeopard = new My.SnowLeopard();     // alerts 'Snow Leopard'\n\nvar clone = snowLeopard.clone();\nalert(Ext.getClassName(clone));             // alerts 'My.SnowLeopard'\n</code></pre>\n</div></div></div></div></div><div id='m-method'><div class='definedBy'>Defined By</div><h3 class='members-title'>Methods</h3><div class='subsection'><div id='method-create' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ModelManager' rel='Ext.ModelManager' class='definedIn docClass'>Ext.ModelManager</a><br/><a href='source/ModelManager.html#Ext-ModelManager-method-create' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ModelManager-method-create' class='name expandable'>create</a>( <span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a> data, <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> name, [<a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a> id]</span> )</div><div class='description'><div class='short'>Creates a new instance of a Model using the given data. ...</div><div class='long'><p>Creates a new instance of a Model using the given data.</p>\n\n<p>This method is deprecated.  Use <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a> instead.  For example:</p>\n\n<pre><code>Ext.create('User', {\n    first: 'Ed',\n    last: 'Spencer'\n});\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>data</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'><p>Data to initialize the Model's fields with</p>\n</div></li><li><span class='pre'>name</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The name of the model to create</p>\n</div></li><li><span class='pre'>id</span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a> (optional)<div class='sub-desc'><p>unique id of the Model instance (see <a href=\"#!/api/Ext.data.Model\" rel=\"Ext.data.Model\" class=\"docClass\">Ext.data.Model</a>)</p>\n</div></li></ul></div></div></div><div id='method-each' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.AbstractManager' rel='Ext.AbstractManager' class='definedIn docClass'>Ext.AbstractManager</a><br/><a href='source/AbstractManager.html#Ext-AbstractManager-method-each' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.AbstractManager-method-each' class='name expandable'>each</a>( <span class='pre'><a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a> fn, <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a> scope</span> )</div><div class='description'><div class='short'>Executes the specified function once for each item in the collection. ...</div><div class='long'><p>Executes the specified function once for each item in the collection.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>fn</span> : <a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a><div class='sub-desc'><p>The function to execute.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>key</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The key of the item</p>\n</div></li><li><span class='pre'>value</span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a><div class='sub-desc'><p>The value of the item</p>\n</div></li><li><span class='pre'>length</span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a><div class='sub-desc'><p>The total number of items in the collection</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Boolean\" rel=\"Boolean\" class=\"docClass\">Boolean</a></span><div class='sub-desc'><p>False to cease iteration.</p>\n</div></li></ul></div></li><li><span class='pre'>scope</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'><p>The scope to execute in. Defaults to <code>this</code>.</p>\n</div></li></ul></div></div></div><div id='method-get' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.AbstractManager' rel='Ext.AbstractManager' class='definedIn docClass'>Ext.AbstractManager</a><br/><a href='source/AbstractManager.html#Ext-AbstractManager-method-get' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.AbstractManager-method-get' class='name expandable'>get</a>( <span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> id</span> ) : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></div><div class='description'><div class='short'>Returns an item by id. ...</div><div class='long'><p>Returns an item by id.\nFor additional details see <a href=\"#!/api/Ext.util.HashMap-method-get\" rel=\"Ext.util.HashMap-method-get\" class=\"docClass\">Ext.util.HashMap.get</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>id</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The id of the item</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></span><div class='sub-desc'><p>The item, undefined if not found.</p>\n</div></li></ul></div></div></div><div id='method-getCount' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.AbstractManager' rel='Ext.AbstractManager' class='definedIn docClass'>Ext.AbstractManager</a><br/><a href='source/AbstractManager.html#Ext-AbstractManager-method-getCount' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.AbstractManager-method-getCount' class='name expandable'>getCount</a>( <span class='pre'></span> ) : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a></div><div class='description'><div class='short'>Gets the number of items in the collection. ...</div><div class='long'><p>Gets the number of items in the collection.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a></span><div class='sub-desc'><p>The number of items in the collection.</p>\n</div></li></ul></div></div></div><div id='method-getInitialConfig' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.Base' rel='Ext.Base' class='definedIn docClass'>Ext.Base</a><br/><a href='source/Base3.html#Ext-Base-method-getInitialConfig' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.Base-method-getInitialConfig' class='name expandable'>getInitialConfig</a>( <span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a> name</span> )</div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getModel' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.ModelManager' rel='Ext.ModelManager' class='definedIn docClass'>Ext.ModelManager</a><br/><a href='source/ModelManager.html#Ext-ModelManager-method-getModel' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.ModelManager-method-getModel' class='name expandable'>getModel</a>( <span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a>/<a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a> id</span> ) : <a href=\"#!/api/Ext.data.Model\" rel=\"Ext.data.Model\" class=\"docClass\">Ext.data.Model</a></div><div class='description'><div class='short'>Returns the Ext.data.Model for a given model name ...</div><div class='long'><p>Returns the <a href=\"#!/api/Ext.data.Model\" rel=\"Ext.data.Model\" class=\"docClass\">Ext.data.Model</a> for a given model name</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>id</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a>/<a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'><p>The id of the model or the model instance.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Ext.data.Model\" rel=\"Ext.data.Model\" class=\"docClass\">Ext.data.Model</a></span><div class='sub-desc'><p>a model class.</p>\n</div></li></ul></div></div></div><div id='method-initConfig' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.Base' rel='Ext.Base' class='definedIn docClass'>Ext.Base</a><br/><a href='source/Base3.html#Ext-Base-method-initConfig' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.Base-method-initConfig' class='name expandable'>initConfig</a>( <span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a> config</span> ) : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><strong class='protected-signature'>protected</strong></div><div class='description'><div class='short'>Initialize configuration for this class. ...</div><div class='long'><p>Initialize configuration for this class. a typical example:</p>\n\n<pre><code>Ext.define('My.awesome.Class', {\n    // The default config\n    config: {\n        name: 'Awesome',\n        isAwesome: true\n    },\n\n    constructor: function(config) {\n        this.initConfig(config);\n\n        return this;\n    }\n});\n\nvar awesome = new My.awesome.Class({\n    name: 'Super Awesome'\n});\n\nalert(awesome.getName()); // 'Super Awesome'\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></span><div class='sub-desc'><p>mixins The mixin prototypes as key - value pairs</p>\n</div></li></ul></div></div></div><div id='method-isRegistered' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.AbstractManager' rel='Ext.AbstractManager' class='definedIn docClass'>Ext.AbstractManager</a><br/><a href='source/AbstractManager.html#Ext-AbstractManager-method-isRegistered' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.AbstractManager-method-isRegistered' class='name expandable'>isRegistered</a>( <span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> type</span> ) : <a href=\"#!/api/Boolean\" rel=\"Boolean\" class=\"docClass\">Boolean</a></div><div class='description'><div class='short'>Checks if an item type is registered. ...</div><div class='long'><p>Checks if an item type is registered.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>type</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The mnemonic string by which the class may be looked up</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Boolean\" rel=\"Boolean\" class=\"docClass\">Boolean</a></span><div class='sub-desc'><p>Whether the type is registered.</p>\n</div></li></ul></div></div></div><div id='method-onAvailable' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.AbstractManager' rel='Ext.AbstractManager' class='definedIn docClass'>Ext.AbstractManager</a><br/><a href='source/AbstractManager.html#Ext-AbstractManager-method-onAvailable' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.AbstractManager-method-onAvailable' class='name expandable'>onAvailable</a>( <span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> id, <a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a> fn, <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a> scope</span> )</div><div class='description'><div class='short'>Registers a function that will be called when an item with the specified id is added to the manager. ...</div><div class='long'><p>Registers a function that will be called when an item with the specified id is added to the manager.\nThis will happen on instantiation.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>id</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The item id</p>\n</div></li><li><span class='pre'>fn</span> : <a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a><div class='sub-desc'><p>The callback function. Called with a single parameter, the item.</p>\n</div></li><li><span class='pre'>scope</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'><p>The scope (this reference) in which the callback is executed.\nDefaults to the item.</p>\n</div></li></ul></div></div></div><div id='method-register' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.AbstractManager' rel='Ext.AbstractManager' class='definedIn docClass'>Ext.AbstractManager</a><br/><a href='source/AbstractManager.html#Ext-AbstractManager-method-register' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.AbstractManager-method-register' class='name expandable'>register</a>( <span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a> item</span> )</div><div class='description'><div class='short'>Registers an item to be managed ...</div><div class='long'><p>Registers an item to be managed</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>item</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'><p>The item to register</p>\n</div></li></ul></div></div></div><div id='method-registerType' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.AbstractManager' rel='Ext.AbstractManager' class='definedIn docClass'>Ext.AbstractManager</a><br/><a href='source/AbstractManager.html#Ext-AbstractManager-method-registerType' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.AbstractManager-method-registerType' class='name expandable'>registerType</a>( <span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> type, <a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a> cls</span> )</div><div class='description'><div class='short'>Registers a new item constructor, keyed by a type key. ...</div><div class='long'><p>Registers a new item constructor, keyed by a type key.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>type</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The mnemonic string by which the class may be looked up.</p>\n</div></li><li><span class='pre'>cls</span> : <a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a><div class='sub-desc'><p>The new instance class.</p>\n</div></li></ul></div></div></div><div id='method-statics' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.Base' rel='Ext.Base' class='definedIn docClass'>Ext.Base</a><br/><a href='source/Base3.html#Ext-Base-method-statics' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.Base-method-statics' class='name expandable'>statics</a>( <span class='pre'></span> ) : <a href=\"#!/api/Ext.Class\" rel=\"Ext.Class\" class=\"docClass\">Ext.Class</a><strong class='protected-signature'>protected</strong></div><div class='description'><div class='short'>Get the reference to the class from which this object was instantiated. ...</div><div class='long'><p>Get the reference to the class from which this object was instantiated. Note that unlike <a href=\"#!/api/Ext.Base-property-self\" rel=\"Ext.Base-property-self\" class=\"docClass\">self</a>,\n<code>this.statics()</code> is scope-independent and it always returns the class from which it was called, regardless of what\n<code>this</code> points to during run-time</p>\n\n<pre><code>Ext.define('My.Cat', {\n    statics: {\n        totalCreated: 0,\n        speciesName: 'Cat' // My.Cat.speciesName = 'Cat'\n    },\n\n    constructor: function() {\n        var statics = this.statics();\n\n        alert(statics.speciesName);     // always equals to 'Cat' no matter what 'this' refers to\n                                        // equivalent to: My.Cat.speciesName\n\n        alert(this.self.speciesName);   // dependent on 'this'\n\n        statics.totalCreated++;\n\n        return this;\n    },\n\n    clone: function() {\n        var cloned = new this.self;                      // dependent on 'this'\n\n        cloned.groupName = this.statics().speciesName;   // equivalent to: My.Cat.speciesName\n\n        return cloned;\n    }\n});\n\n\nExt.define('My.SnowLeopard', {\n    extend: 'My.Cat',\n\n    statics: {\n        speciesName: 'Snow Leopard'     // My.SnowLeopard.speciesName = 'Snow Leopard'\n    },\n\n    constructor: function() {\n        this.callParent();\n    }\n});\n\nvar cat = new My.Cat();                 // alerts 'Cat', then alerts 'Cat'\n\nvar snowLeopard = new My.SnowLeopard(); // alerts 'Cat', then alerts 'Snow Leopard'\n\nvar clone = snowLeopard.clone();\nalert(Ext.getClassName(clone));         // alerts 'My.SnowLeopard'\nalert(clone.groupName);                 // alerts 'Cat'\n\nalert(My.Cat.totalCreated);             // alerts 3\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Ext.Class\" rel=\"Ext.Class\" class=\"docClass\">Ext.Class</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-unregister' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.AbstractManager' rel='Ext.AbstractManager' class='definedIn docClass'>Ext.AbstractManager</a><br/><a href='source/AbstractManager.html#Ext-AbstractManager-method-unregister' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.AbstractManager-method-unregister' class='name expandable'>unregister</a>( <span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a> item</span> )</div><div class='description'><div class='short'>Unregisters an item by removing it from this manager ...</div><div class='long'><p>Unregisters an item by removing it from this manager</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>item</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'><p>The item to unregister</p>\n</div></li></ul></div></div></div></div></div></div></div>","allMixins":[],"meta":{"author":["Ed Spencer"]},"requires":["Ext.data.association.Association"],"deprecated":null,"extends":"Ext.AbstractManager","inheritable":false,"static":false,"superclasses":["Ext.Base","Ext.AbstractManager","Ext.ModelManager"],"protected":false,"singleton":true,"code_type":"ext_define","alias":null,"members":{"property":[{"owner":"Ext.AbstractManager","tagname":"property","deprecated":null,"static":false,"protected":false,"template":null,"required":null,"name":"all","id":"property-all"},{"owner":"Ext.ModelManager","tagname":"property","deprecated":null,"static":false,"protected":false,"template":null,"required":null,"name":"associationStack","id":"property-associationStack"},{"owner":"Ext.Base","tagname":"property","deprecated":{"doc":null,"tagname":"deprecated","text":"<p>as of 4.1. Use <a href=\"#!/api/Ext.Base-property-callParent\" rel=\"Ext.Base-property-callParent\" class=\"docClass\">callParent</a> instead.</p>\n","version":null},"static":false,"protected":true,"template":null,"required":null,"name":"callOverridden","id":"property-callOverridden"},{"owner":"Ext.Base","tagname":"property","deprecated":null,"static":false,"protected":true,"template":null,"required":null,"name":"callParent","id":"property-callParent"},{"owner":"Ext.Base","tagname":"property","deprecated":null,"static":false,"protected":true,"template":null,"required":null,"name":"self","id":"property-self"}],"css_var":[],"css_mixin":[],"method":[{"owner":"Ext.ModelManager","tagname":"method","deprecated":null,"static":false,"protected":false,"template":false,"required":null,"name":"create","id":"method-create"},{"owner":"Ext.AbstractManager","tagname":"method","deprecated":null,"static":false,"protected":false,"template":false,"required":null,"name":"each","id":"method-each"},{"owner":"Ext.AbstractManager","tagname":"method","deprecated":null,"static":false,"protected":false,"template":false,"required":null,"name":"get","id":"method-get"},{"owner":"Ext.AbstractManager","tagname":"method","deprecated":null,"static":false,"protected":false,"template":false,"required":null,"name":"getCount","id":"method-getCount"},{"owner":"Ext.Base","tagname":"method","deprecated":null,"static":false,"protected":false,"template":false,"required":null,"name":"getInitialConfig","id":"method-getInitialConfig"},{"owner":"Ext.ModelManager","tagname":"method","deprecated":null,"static":false,"protected":false,"template":false,"required":null,"name":"getModel","id":"method-getModel"},{"owner":"Ext.Base","tagname":"method","deprecated":null,"static":false,"protected":true,"template":false,"required":null,"name":"initConfig","id":"method-initConfig"},{"owner":"Ext.AbstractManager","tagname":"method","deprecated":null,"static":false,"protected":false,"template":false,"required":null,"name":"isRegistered","id":"method-isRegistered"},{"owner":"Ext.AbstractManager","tagname":"method","deprecated":null,"static":false,"protected":false,"template":false,"required":null,"name":"onAvailable","id":"method-onAvailable"},{"owner":"Ext.AbstractManager","tagname":"method","deprecated":null,"static":false,"protected":false,"template":false,"required":null,"name":"register","id":"method-register"},{"owner":"Ext.AbstractManager","tagname":"method","deprecated":null,"static":false,"protected":false,"template":false,"required":null,"name":"registerType","id":"method-registerType"},{"owner":"Ext.Base","tagname":"method","deprecated":null,"static":false,"protected":true,"template":false,"required":null,"name":"statics","id":"method-statics"},{"owner":"Ext.AbstractManager","tagname":"method","deprecated":null,"static":false,"protected":false,"template":false,"required":null,"name":"unregister","id":"method-unregister"}],"cfg":[],"event":[]},"statics":{"property":[],"css_var":[],"method":[],"css_mixin":[],"cfg":[],"event":[]},"subclasses":[],"uses":[],"private":false,"name":"Ext.ModelManager","mixins":[],"id":"class-Ext.ModelManager","component":false,"alternateClassNames":["Ext.ModelMgr"],"files":[{"href":"ModelManager.html#Ext-ModelManager","filename":"ModelManager.js"}]});