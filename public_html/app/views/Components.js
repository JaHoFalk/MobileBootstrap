define(function(require) {

    "use strict";

    var Backbone = require('backbone');
    var componentTemplate = require('hbs!ui/Components');
    var bootjsTemplate = require('hbs!ui/Javascript');

    return Backbone.View.extend({
        initialize: function(options) {
            this.options = options || {};
            this.render();
        },
        render: function() {
            // render table
            if (this.options.templateName === 'bootcomp') {
                this.$el.html(componentTemplate({title: 'Home'}));
            } else if (this.options.templateName === 'bootjs') {
                this.$el.html(bootjsTemplate({title: 'Home'}));
            }
            return this;
        }
    });

});