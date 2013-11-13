define(function(require) {

    "use strict";

    var Backbone = require('backbone');
    var rowTemplate = require('hbs!ui/TitleListItem');
    var TableView = require('app/views/ui/TitleList');
    var Tasks = require('app/models/Task');

    return Backbone.View.extend({
        initialize: function() {
            var self = this;

            // init collection
            this.collection = new Tasks();

            // load collection
            this.collection.fetch({
                success: function() {
                    self.render();
                }});
        },
        render: function() {
            // render table
            var tableView = new TableView({className: 'list-group', collection: this.collection});
            tableView.setRowTemplate(rowTemplate);
            this.$el.html(tableView.render().$el);
            return this;
        }
    });

});