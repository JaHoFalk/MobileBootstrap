define(function(require) {

    "use strict";
    var $ = require('jquery');
    var Constants = require('app/tools/Constants');
    var Backbone = require('backbone');
    var template = require('hbs!ui/Preferences');
    var CryptoJS = require("cryptojs_sha512");
    var User = require('app/models/User');

    var passwordWasChanged = false;
    var oldPasswordHash;
    return Backbone.View.extend({
        initialize: function(options) {
            this.options = options || {};
            this.undelegateEvents();

            this.render();
        },
        events: {
            "click #authenticate": "authenticate",
            "click #clear": "clearUserCredentials",
            "focus #password": "clearPasswordField",
            "focus #username": "clearPasswordField",
        },
        clearPasswordField: function() {
            console.log("Preferences CLEAR PASSWORD FIELD");
            passwordWasChanged = true;
            $('#password')
                    .val('');
        },
        authenticate: function() {
            console.log("Preferences AUTHENTICATE");

            var username = this.$el.find("#username")
                    .val();
            var password = this.$el.find("#password")
                    .val();
            if (username && password) {
                var usernameHash = CryptoJS.SHA512(username + username[0]);
                var passwordHash = oldPasswordHash;

                if (passwordWasChanged) {
                    passwordHash = CryptoJS.SHA512(password + username[0]);
                }
                console.log(usernameHash);
                console.log(passwordHash);

                // check data on server
                var user = new User();
                user.credentials = {
                    usernameClear: username,
                    username: usernameHash.toString(CryptoJS.enc.Hex)
                            .toUpperCase(),
                    password: passwordHash.toString(CryptoJS.enc.Hex)
                            .toUpperCase(),
                    l: password.length
                };
                // clear users input
                password = null;
                username = null;

                localStorage.removeItem(Constants.LOCAL_STORAGE_KEY);

                var self = this;

                user.fetch({
                    success: function(result) {
                        // store data
                        localStorage.setItem(Constants.LOCAL_STORAGE_KEY, JSON.stringify(user.credentials));
                        self.options.callback(true);
                    },
                    error: function(result) {
                        // message and reset
                        self.options.callback(false);
                        // localStorage.setItem(Constants.LOCAL_STORAGE_KEY, JSON.stringify(user.credentials));
                        alert("Not authenticated");
                        self.render();
                    }
                });
            } else {
                alert("Check input");
            }
        },
        clearUserCredentials: function() {
            console.log("Preferences CLEARUSERCREDENTIALS");

            localStorage.removeItem(Constants.LOCAL_STORAGE_KEY);
            this.options.callback(false);
            this.render();
        },
        render: function() {
            console.log("Preferences RENDER");

            // render table
            var localSorageCredentialJson = localStorage.getItem(Constants.LOCAL_STORAGE_KEY);
            var username = "";
            var dummy = "";
            if (localSorageCredentialJson) {
                var localSorageCredentials = JSON.parse(localSorageCredentialJson);
                oldPasswordHash = localSorageCredentials.password;
                username = localSorageCredentials.usernameClear;
                for (var i = 0; i < localSorageCredentials.l; i++) {
                    dummy += '*';
                }
            }
            this.$el.html(template({username: username, dummy: dummy}));
            return this;
        }
    });

});