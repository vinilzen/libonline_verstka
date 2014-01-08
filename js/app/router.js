define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        MediaLibIcosView = require('app/views/MediaLibIcos'),
        $body = $('body'),
        $content = $('.media ul'),
        mediaLibIcos = new MediaLibIcosView({el: $content});

    return Backbone.Router.extend({

        routes: {
            "": "home",
            "contact": "contact",
        },

        home: function () {
            mediaLibIcos.delegateEvents(); // delegate events when the view is recycled
            mediaLibIcos.render();
        },

        contact: function () {
            console.log('contact')
        },
    });

});