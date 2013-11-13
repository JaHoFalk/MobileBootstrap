define(function(require) {

    "use strict";
    var Backbone = require('backbone');

    var HomeView = require('views/Home');
    var MeetingView = require('views/Meeting');
    var TaskView = require('views/Task');
    var PreferencesView = require('views/Preferences');
    var ComponentsView = require('views/Components');
    var ShellView = require('shellview');

    var CheckCredentials = require('app/tools/CheckCredentials');


    var $body = $('body');
    var shellView = new ShellView({el: $body}).render();

//    var $content = $('section', shellView.el);

    var publicMenu = {'menu': [
            {'title': 'Public', 'route': '', 'menuItem': 'public',
                submenu: [
                    {'title': 'Welcone', 'route': 'welcome', 'menuItem': 'welcome'},
                ]},
            {'title': 'Components', 'route': 'components', 'menuItem': 'components'},
            {'title': 'Einstellungen', 'route': 'preferences', 'menuItem': 'preferences'}]};

    var protectedMenu = {'menu': [
            {'title': 'Protected', 'route': '', 'menuItem': 'protected',
                submenu: [
                    {'title': 'Sitzung', 'route': 'meeting', 'menuItem': 'meeting'},
                    {'title': 'Aufgaben', 'route': 'task', 'menuItem': 'task'}]},
            {'title': 'Components', 'route': 'components', 'menuItem': 'components'},
            {'title': 'Einstellungen', 'route': 'preferences', 'menuItem': 'preferences'}]};

    return Backbone.Router.extend({
        menu: publicMenu,
        initialize: function() {
            var self = this;
            // check credentials
            CheckCredentials(function(isAuthenticated) {
                if (isAuthenticated) {
                    self.menu = protectedMenu;
                } else {
                    self.menu = publicMenu;
                }
                shellView.setMenu(self.menu);
            });
            shellView.setFooter();
        },
        routes: {
            '': 'home',
            'task': 'task',
            'meeting': 'meeting',
            'components': 'components',
            'preferences': 'preferences',
            '*path': 'home'
        },
        home: function() {
            shellView.setMenu(this.menu);
            var view = new HomeView({el: shellView.getContentElement()});
        },
        test: function() {
            shellView.setMenu(this.menu);
            shellView.selectMenuItem();
        },
        components: function() {
            shellView.setMenu(this.menu);
            var view = new ComponentsView({el: shellView.getContentElement()});
            shellView.selectMenuItem('special');
        },
        preferences: function() {
            shellView.setMenu(this.menu);
            var self = this;
            var preferences = new PreferencesView(
                    {el: shellView.getContentElement(), callback: function(isAuthenticated) {
                            if (isAuthenticated) {
                                self.menu = protectedMenu;
                            } else {
                                self.menu = publicMenu;
                            }
                            shellView.setMenu(self.menu);
                        }});

            shellView.selectMenuItem('preferences');
        },
        meeting: function() {
            shellView.setMenu(this.menu);
            var view = new MeetingView({el: shellView.getContentElement()});
            shellView.selectMenuItem('meeting');
        },
        task: function() {
            shellView.setMenu(this.menu);
            var view = new TaskView({el: shellView.getContentElement()});
            shellView.selectMenuItem('task');
        }
    });
});