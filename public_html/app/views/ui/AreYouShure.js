define(function(require) {

    "use strict";
    var $ = require('jquery');
    var Backbone = require('backbone');
    var template = require('hbs!ui/AreYouShure');

    return Backbone.View.extend({
        id: 'base-modal',
        className: 'modal',
        events: {
            'hidden.bs.modal': 'cancel',
            'click #btnYes': 'action'
        },
        initialize: function(options) {
            this.options = options || {};
            this.render();
        },
        show: function() {
            this.$el.modal('show');
        },
        cancel: function() {
            this.$el.data('modal', null);
            this.remove();
        },
        action: function() {
            this.options.callback();
        },
        render: function() {
            this.$el.html(template(
                {title: 'Sind Sie ganz sicher?', description: this.options.description, yes: 'Ja', no: 'Schließen'}));
            this.$el.modal({show: false});
            return this;
        },
    });
});