define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/MediaLibItem.html'),

        template            = _.template(tpl);

    return Backbone.View.extend({

        tagName: "li",

        initialize: function () {
            this.model.on("change", this.render, this);
            this.render();
        },

        render: function () {
            var content = template(this.model.attributes);
            this.$el.html(content);
            return this;
        },

    });

});