define(function(require) {

    "use strict";

    var Backbone = require('backbone');
    var template = require('hbs!ui/Components');
    
    return Backbone.View.extend({
        initialize: function() {
            this.render();
        },
        render: function() {
            // render table
            this.$el.html(template({title:'Home'}));
            return this;
        }
    });

});