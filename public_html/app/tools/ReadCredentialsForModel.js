define(function(require) {

    var Constants = require('app/tools/Constants');

    return function() {
        var userHash = "";
        var passwordHash = "";

        var localSorageCredentialJson = localStorage.getItem(Constants.LOCAL_STORAGE_KEY);

        if (localSorageCredentialJson) {
            var localSorageCredentials = JSON.parse(localSorageCredentialJson);
            userHash = localSorageCredentials.username;
            passwordHash = localSorageCredentials.password;
        }

        return {
            username: userHash,
            password: passwordHash
        };
    };
});

console.log