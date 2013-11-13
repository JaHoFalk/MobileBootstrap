define(function(require) {

    "use strict";

    var defaultRowTemplate = require('hbs!ui/TitleListItem');
    var Backbone = require('backbone');

    var TableView = Backbone.View.extend({
        tagName: 'ul',
        rowTemplate: defaultRowTemplate,
        
        initialize: function(options) {
            _.bindAll(this, 'render', 'renderOne');
        },
        setRowTemplate : function(template){
            this.rowTemplate = template;
        },
                
        render: function() {
            this.collection.each(this.renderOne);
            return this;
        },
        renderOne: function(model) {

            var row = new RowView({model: model});
            this.$el.append(row.render(this.rowTemplate).$el);
            return this;
        }
    });

    var RowView = Backbone.View.extend({
        events: {
            "click": function() {
                console.log(this.model.get("neoid"));
            }
        },
        render: function(currentRowTemplate) {
            var html = currentRowTemplate(this.model.toJSON());
            this.setElement($(html));
            return this;
        }
    });


    return TableView;
});