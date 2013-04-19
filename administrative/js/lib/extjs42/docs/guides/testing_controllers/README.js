Ext.data.JsonP.testing_controllers({"title":"Unit testing MVC Controllers","guide":"<h1>Unit testing MVC Controllers</h1>\n<div class='toc'>\n<p><strong>Contents</strong></p>\n<ol>\n<li><a href='#!/guide/testing_controllers-section-1'>I. Overview</a></li>\n<li><a href='#!/guide/testing_controllers-section-2'>II. Testing refs</a></li>\n<li><a href='#!/guide/testing_controllers-section-3'>III. Testing control component selectors</a></li>\n<li><a href='#!/guide/testing_controllers-section-4'>IV. Testing event domain selectors</a></li>\n</ol>\n</div>\n\n<h2 id='testing_controllers-section-1'>I. Overview</h2>\n\n<p>Unit testing Controllers is not an easy thing, because in any case beyond\ntrivial it looks more like integration testing that involves many components at\nonce. It is important to try and simplify testing process as much as possible,\nbreaking the component interaction down to smallest reasonable pieces to ensure\neasier debugging when tests fail.</p>\n\n<p>The most important parts of a Controller are its refs and component selectors;\nit is crucial to ensure these selectors are tested properly. Selectors also are\none of the hardest things to test, because they rely on existence and particular\nlayout of components they select.</p>\n\n<h2 id='testing_controllers-section-2'>II. Testing refs</h2>\n\n<p>Suppose that we have View and Controller:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('MyApp.view.MyView', {\n    extend: '<a href=\"#!/api/Ext.panel.Panel\" rel=\"Ext.panel.Panel\" class=\"docClass\">Ext.panel.Panel</a>',\n    alias: 'widget.myview',\n\n    dockedItems: [{\n        xtype: 'button',\n        text: 'OK',\n        dock: 'bottom'\n    }, {\n        xtype: 'button',\n        text: 'Cancel',\n        dock: 'bottom'\n    }],\n\n    ...\n});\n\n<a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('MyApp.controller.MyController', {\n    extend: '<a href=\"#!/api/Ext.app.Controller\" rel=\"Ext.app.Controller\" class=\"docClass\">Ext.app.Controller</a>',\n\n    views: [\n        'MyView'\n    ],\n\n    refs: [{\n        ref: 'myView', selector: 'myview'\n    }, {\n        ref: 'myViewButtonOk',\n        selector: 'myview &gt; button[text=OK]'\n    }, {\n        ref: 'myViewButtonCancel',\n        selector: 'myview &gt; button[text=Cancel]'\n    }],\n\n    init: function() {\n        this.control({\n            'myview &gt; button': {\n                click: 'onMyViewButtonClick'\n            }\n        });\n    }\n\n    onMyViewButtonClick: function(button) {\n         ...\n    }\n});\n</code></pre>\n\n<p>For this simplified example of a test suite we will use Jasmine framework. This\nis how our test spec may look like:</p>\n\n<pre><code>describe('MyController refs', function() {\n    var view = new MyApp.view.MyView({ renderTo: <a href=\"#!/api/Ext-method-getBody\" rel=\"Ext-method-getBody\" class=\"docClass\">Ext.getBody</a>() }),\n        ctrl = new MyApp.controller.MyController();\n\n    it('should ref MyView objects', function() {\n        var cmp = ctrl.getMyView();\n\n        expect(cmp).toBeDefined();\n    });\n\n    it('should ref MyView button OK', function() {\n        var btn = ctrl.getMyViewButtonOk();\n\n        expect(btn.text).toBe('OK');\n    });\n\n    it('should ref MyView button Cancel', function() {\n        var btn = ctrl.getMyViewButtonCancel();\n\n        expect(btn.text).toBe('Cancel');\n    });\n});\n</code></pre>\n\n<p>This test suite is simplified to be easier to understand; it can be further\nshortened by auto-generating ref tests against controller's refs array, etc.\nHowever the idea remains the same: we take instantiated View and Controller and\nrun over all the refs, comparing returned objects to our expectations.</p>\n\n<h2 id='testing_controllers-section-3'>III. Testing control component selectors</h2>\n\n<p>Taking the same View/Controller setup, we can now add a spec to test component\nselectors:</p>\n\n<pre><code>describe('MyController component selectors', function() {\n    var view = new MyApp.view.MyView({ renderTo: <a href=\"#!/api/Ext-method-getBody\" rel=\"Ext-method-getBody\" class=\"docClass\">Ext.getBody</a>() }),\n        ctrl = new MyApp.controller.MyController();\n\n    it('should initialize', function() {\n        ctrl.init();\n    });\n\n    it('should control MyView button click events', function() {\n        spyOn(ctrl, 'onMyViewButtonClick');\n\n        view.down('button[text=OK]').fireEvent('click');\n\n        expect(ctrl.onMyViewButtonClick).toHaveBeenCalled();\n    });\n});\n</code></pre>\n\n<p>Note that in our application controller's <code>init</code> method will be called\nautomatically but in our test suite we have to do it manually. An empty spec\nwill work just fine and will always pass.</p>\n\n<p>This approach may not be feasible for larger applications and bigger Views; in\nthat case it may be beneficial to create mockup components that simulate parts\nof the component layout without adhering strictly to visual design. In fact, the\ntest View above may be seen as an example of such mockup for real world View.</p>\n\n<h2 id='testing_controllers-section-4'>IV. Testing event domain selectors</h2>\n\n<p>Event domains are a new concept introduced in Ext JS 4.2; they allow passing\ninformation between application components without explicitly calling object\nmethods. Using them is very easy:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('MyApp.controller.MyController', {\n    extend: '<a href=\"#!/api/Ext.app.Controller\" rel=\"Ext.app.Controller\" class=\"docClass\">Ext.app.Controller</a>',\n\n    init: function() {\n        this.listen({\n            // This domain passes events between Controllers\n            controller: {\n                // This selector matches any Controller\n                '*': {\n                    fooevent: 'onFooEvent'\n                }\n            }\n        });\n    },\n\n    onFooEvent: function() {}\n});\n</code></pre>\n\n<p>After initializing <code>MyController</code> instance, we can just fire <code>fooevent</code> in any\nother Controller instance to execute <code>onFooEvent</code> method with supplied\narguments. Testing this configuration is equally easy:</p>\n\n<pre><code>describe('MyController event domain selectors', function() {\n    var ctrl = new MyApp.controller.MyController();\n\n    it('should listen to fooevent in controller domain', function() {\n        spyOn(ctrl, 'onFooEvent');\n\n        ctrl.fireEvent('fooevent');\n\n        expect(ctrl.onFooEvent).toHaveBeenCalled();\n    });\n});\n</code></pre>\n\n<p>Notice how we fired <code>fooevent</code> on the same Controller that is supposed to listen\nto this event? That is one of the side effects of how event domains work, and it\nis very useful for testing. However it won't help when we want to listen to\n<code>fooevent</code> fired not in any Controller but in a particular one:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('MyApp.controller.MyController', {\n    extend: '<a href=\"#!/api/Ext.app.Controller\" rel=\"Ext.app.Controller\" class=\"docClass\">Ext.app.Controller</a>',\n\n    init: function() {\n        this.listen({\n            controller: {\n                '#MyOtherController': {\n                    fooevent: 'onMyOtherControllerFooEvent'\n                }\n            }\n        });\n    },\n\n    onMyOtherControllerFooEvent: function() {}\n});\n\n<a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('MyApp.controller.MyOtherController', {\n    extend: '<a href=\"#!/api/Ext.app.Controller\" rel=\"Ext.app.Controller\" class=\"docClass\">Ext.app.Controller</a>',\n\n    someMethod: function() {\n        this.fireEvent('fooevent');\n    }\n});\n</code></pre>\n\n<p>In this case we will have to mock <code>MyOtherController</code> class in our test suite,\nto avoid instantiating it and bringing on its dependencies:</p>\n\n<pre><code>describe('MyController event domain selectors', function() {\n    var ctrl = new MyApp.controller.MyController();\n\n    it('should listen to fooevent from MyOtherController', function() {\n        spyOn(ctrl, 'onMyOtherControllerFooEvent');\n\n        new <a href=\"#!/api/Ext.app.Controller\" rel=\"Ext.app.Controller\" class=\"docClass\">Ext.app.Controller</a>({\n            id: 'MyOtherController'\n        }).fireEvent('fooevent');\n\n        expect(ctrl.onMyOtherControllerFooEvent).toHaveBeenCalled();\n    });\n});\n</code></pre>\n\n<p>This mockup works because Controller's <code>id</code> defaults to the last part of its\nclass name, unless specifically overridden.</p>\n\n<p>Besides other Controllers' events, it is possible to <code>listen</code> to Stores',\n<a href=\"#!/api/Ext.direct.Manager\" rel=\"Ext.direct.Manager\" class=\"docClass\">Ext.Direct</a> Providers' and global events. See <a href=\"#!/api/Ext.app.Controller-method-listen\" rel=\"Ext.app.Controller-method-listen\" class=\"docClass\">Ext.app.Controller.listen</a>\nfor more detail on how to use event domains; testing them is similar to\nController event domain.</p>\n"});