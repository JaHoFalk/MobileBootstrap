define(function(require) {

    var Constants = require('app/tools/Constants');
    var User = require('app/models/User');

    return function(callback) {

        var userHash = "";
        var passwordHash = "";

        var localSorageCredentialJson = localStorage.getItem(Constants.LOCAL_STORAGE_KEY);

        if (localSorageCredentialJson) {
            var localSorageCredentials = JSON.parse(localSorageCredentialJson);
            userHash = localSorageCredentials.username;
            passwordHash = localSorageCredentials.password;
        }

        var user = new User();
        user.credentials = {
            username: userHash,
            password: passwordHash
        };

        user.fetch({
            success: function(result) {
                callback(true);
            },
            error: function(result) {
                callback(false);
            }
        });

    };
});

