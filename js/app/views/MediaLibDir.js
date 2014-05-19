define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone');

    return Backbone.View.extend({

        tagName: "li",

        events: {
            click:'goToFolder'
        },

        initialize: function () {
            this.model.on("change", this.render, this);
            this.render();
        },

        render: function () {
            var content = '<div class="stick"></div><span>'+this.model.get('name')+'</span>';
            this.$el.html(content);
            return this;
        },

        goToFolder:function(){
            this.model.collection.url = this.model.collection.url + '?folder='+this.model.get('name');
            console.log(this.model.attributes, this.model.collection.url)
        }

    });

});