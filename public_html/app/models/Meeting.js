define(function(require) {

    "use strict";
    var Backbone = require('backbone');
    var ReadCredentials = require('app/tools/ReadCredentialsForModel');
    var Constants = require('app/tools/Constants');

    var Model = Backbone.Model.extend();

    return Backbone.Collection.extend({
        model: Model,
        url: Constants.SERVER_URL  + "/api/vence/meeting"+ Constants.LOCAL_TYPE ,
//        url: "data/vence/meeting.json",
        credentials: ReadCredentials
    });

});