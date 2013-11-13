define(function(require) {

    "use strict";
    var rowTemplate = require('hbs!ui/TitleTableRow');
    var Backbone = require('backbone');
 
    var TableView = Backbone.View.extend({
        tagName: 'table',
        initialize: function() {
            _.bindAll(this, 'render', 'renderOne');
        },
        render: function() {
            this.collection.each(this.renderOne);
            return this;
        },
        renderOne: function(model) {
            var row = new RowView({model: model});
            this.$el.append(row.render().$el);
            return this;
        }
    });

    var RowView = Backbone.View.extend({
        events: {
            "click ": function() {
                console.log(this.model.get("neoid"));
            }
        },
        render: function() {
            var html = rowTemplate(this.model.toJSON());
            this.setElement($(html));
            return this;
        }
    });


    return TableView;
});