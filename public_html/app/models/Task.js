define(function(require) {

    "use strict";
    var Backbone = require('backbone');
    var ReadCredentials = require('app/tools/ReadCredentialsForModel');
    var Constants = require('app/tools/Constants');

    var Model = Backbone.Model.extend();

    return Backbone.Collection.extend({
        model: Model,
        url: Constants.SERVER_URL + "/api/vence/task" + Constants.LOCAL_TYPE ,
        credentials: ReadCredentials
    });
});