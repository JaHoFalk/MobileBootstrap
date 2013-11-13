define(function(require) {

    "use strict";
    var Backbone = require('backbone');
    var Constants = require('app/tools/Constants');

    return Backbone.Model.extend({
        urlRoot: Constants.SERVER_URL + "/api/vence/check" + Constants.LOCAL_TYPE,
        initialize: function() {
        }
    });
});