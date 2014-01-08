define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        MediaLibItemView    = require('app/views/MediaLibItem'),
        MediaLibDirView     = require('app/views/MediaLibDir');
		
    return Backbone.Model.extend({
	    initialize: function () {

	    	console.log(this.get('type'))

	    	switch (this.get('type')){
	    		case 'dir':
            		this.view = new MediaLibDirView({model:this});
            		break;
            		
	    		default:
            		this.view = new MediaLibItemView({model:this});
	    	}

        },


    });

});