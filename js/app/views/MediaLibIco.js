define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        popover             = require('popover'),
        MediaLib            = require('app/models/MediaLib'),
        tpl                 = require('text!tpl/MediaLibIco.html'),

        template            = _.template(tpl);

    return Backbone.View.extend({

        tagName: "li",

        events: {
            click:'showLib'
        },

        initialize: function () {
            this.model.on("change", this.render, this);
        },

        render: function () {
            var content = template(this.model.attributes);
            this.$el.html(content);
            return this;
        },

        showLib: function () {
            this.lib = new MediaLib({type:this.model.get('name')});
            
            this.$el.popover(null,'<img src="./img/preloader.gif" class="preloader" />','left', 'medialib pic');
                // '<div class="dir"><ul><li class="active"><span>Photobank</span><ul><li class="active"><div class="stick"></div><span>Sunlowers</span></li><li><div class="stick"></div><span>Sky</span></li></ul></li><li><span>Book Photos</span><ul><li><div class="stick"></div><span>Graphics</span></li><li><div class="stick"></div><span>Minimal</span></li></ul></li><li><span>Book Photos</span></li><li><span>Photobank</span><ul><li><div class="stick"></div><span>Graphics</span></li><li><div class="stick"></div><span>Photos</span></li><li><div class="stick"></div><span>Pics</span></li></ul></li><li><span>Fotolia</span><ul><li><div class="stick"></div><span>Book Photos</span></li></ul></li><li><span>Photobank</span><ul><li><div class="stick"></div><span>Graphics</span></li><li><div class="stick"></div><span>Photos</span></li><li><div class="stick"></div><span>Pics</span></li></ul></li><li><span>Photobank</span><ul><li><div class="stick"></div><span>Graphics</span></li><li><div class="stick"></div><span>Photos</span></li><li><div class="stick"></div><span>Pics</span></li></ul></li></ul></div><div class="main"><ul class="filter"><li><a class="active">По имени</a></li><li><a>По дате</a></li><li><a>По размеру</a></li></ul><ul class="select-media"><li><img src="./img/example.jpg"><input hidden="hidden" id="media-pic-0" name="media-pic" type="radio"><label for="media-pic-0">1.jpg</label></li><li><img src="./img/example.jpg"><input hidden="hidden" id="media-pic-1" name="media-pic" type="radio"><label for="media-pic-1">2.jpg</label></li></ul></div>',

            this.lib.fetch({
                success:function(collection, response, options){
                    collection.render();
                },
                error:function(){
                    $('.popover .popover-content').html('Ошибка загрузки библиотеки');
                }
            });            

            console.log(this.model.get('name'));
        }

    });

});