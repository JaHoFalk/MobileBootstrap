define(function(require) {

    "use strict";
    var $ = require('jquery');
    var Backbone = require('backbone');
    var template = require('hbs!ui/BaseModalDialog');

    return Backbone.View.extend({
        id: 'base-modal',
        className: 'modal',
        events: {
            'hidden.bs.modal': 'teardown'
        },
        initialize: function(options) {
            this.options = options || {};
            this.render();
        },
        show: function() {
            this.$el.modal('show');
        },
        teardown: function() {
            this.$el.data('modal', null);
            this.remove();
        },
        render: function() {
            this.$el.html(template(
                    {title: this.options.title, description: this.options.description, action: 'Schließen'}));
                    this.$el.modal({show: false});
                    return this;
                },
    });
});