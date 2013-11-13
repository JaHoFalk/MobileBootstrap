define(function(require) {

    "use strict";
    var Backbone = require('backbone');
    var template = require('hbs!ui/ShellBootstrap');
    var NavBar = require('app/views/ui/NavBar');
    var navbarTemplate = require('hbs!ui/NavBar');

    var defaultMenu;
    var $menuItems;

    return Backbone.View.extend({
        menuData: defaultMenu,
        initialize: function() {
//            this.setMenu;
        },
        setMenu: function(newMenu) {
            if (newMenu) {
                this.menuData = newMenu;
            }
            if (this.menuData) {
                var navbar = new NavBar({className: 'nav navbar-nav'});
                navbar.setTemplate(navbarTemplate);
                navbar.setMenuData(this.menuData);
                navbar.render();
                var $navbar = $('#nav-bar-main', this.$el);
                $navbar.html(navbar.$el);
            }
        },
        setFooter: function() {
//            var $footer = $('footer', this.$el);
//            $footer.html('__footer__');
        },
        getContentElement: function() {
            var element = $('section', this.$el);
            // TODO remove all events 
            element.off();
            return element;
        },
        render: function() {
            this.$el.html(template());
            $menuItems = $('.navbar .nav li', this.el);
            return this;
        },
        selectMenuItem: function(menuItem) {
            $menuItems.removeClass('active');

            if (menuItem) {
                $('#' + menuItem)
                        .addClass('active');
            }
        }

    });
});

