define(function(require) {

    "use strict";
    var Uri = require('security/jsuri');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var CryptoJS = require('cryptojs_hmac');

    var username = "John";
    var secretKey = "12345abcdef";

    var app;

    var originalSync = Backbone.sync;

    function ApiManager(_app) {
        app = _app;
    }
    _.extend(ApiManager.prototype, Backbone.Events);


    ApiManager.prototype.init = function() {
        var self = this;

    };

    ApiManager.prototype.loadApi = function() {
        console.log('ApiManager loadApi()');
        var self = this;
        this.trigger('ready');
    };

    Backbone.sync = function(method, model, options) {

        switch (method) {
            case 'create':
//                options.dataType = "jsonp";

                console.log('create -------------------------- ');
                options.beforeSend = function(xhr, settings) {
                    console.log('create before send -------------------------- ');
                    console.log(settings.url);
                    settings.url = createHmac(settings.url);

                    console.log(settings);
                    console.log(xhr);

                    // set data in header
                    // xhr.setRequestHeader("name", "tdd");

                };
                var result = originalSync.apply(Backbone, arguments);
                return result;
                break;

            case 'update':
//                options.dataType = "jsonp";
                console.log('update -------------------------- ');
                options.beforeSend = function(xhr, settings) {
                    console.log('update before send -------------------------- ');
                    console.log(settings.url);
                    settings.url = createHmac(settings.url);
                };
                var result = originalSync.apply(Backbone, arguments);
                return result;
                break;

            case 'delete':
//                options.dataType = "jsonp";
                console.log('update -------------------------- ');
                options.beforeSend = function(xhr, settings) {
                    console.log('update before send -------------------------- ');
                    console.log(settings.url);
                    settings.url = createHmac(settings.url);
                };
                var result = originalSync.apply(Backbone, arguments);
                return result;
                break;

            case 'read':
//                options.dataType = "jsonp";
                options.beforeSend = function(xhr, settings) {
                    console.log('read -------------------------- ');
                    console.log(settings.url);
                    settings.url = createHmac(settings.url);
                };
                var result = originalSync.apply(Backbone, arguments);
                return result;
                break;
        }
    };


    function createHmac(url) {

        var uri = new Uri(url);
        uri.addQueryParam('user', username);
        uri.addQueryParam('t', new Date().getTime());

        var i, message = secretKey;
        var paramKeys = uri.getQueryParamKeys();
        for (i = 0; i < paramKeys.length; i++) {
            var value = uri.getQueryParamValue(paramKeys[i]);
            if (typeof value !== "undefined") {
                message += value;
            }
        }
        console.log(message);
        uri.addQueryParam('hmac', CryptoJS.HmacSHA1(message, secretKey));

        return uri.toString();
    }

    return ApiManager;
});
