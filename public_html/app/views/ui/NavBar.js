define(function(require) {

    "use strict";
    var navbarTemplate = require('hbs!ui/NavBar');
    var Backbone = require('backbone');

    var NavBar = Backbone.View.extend({
        tagName: 'ul',
        menuData: {},
        rowTemplate: navbarTemplate,
        initialize: function() {
        },
        setTemplate: function(template) {
            this.rowTemplate = template;
        },
        setMenuData: function(menuData) {
            this.menuData = menuData;
        },
        render: function() {
            this.$el.html(this.rowTemplate(this.menuData));
        }
    });

    return NavBar;
});
