define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        MediaIcoView        = require('app/views/MediaLibIco'),

		video_server = 'http://lovidsrv.pandra.ru',
		upload_point = '/upload/',
		media_conf = {
			upload_video:			video_server + upload_point +'uploadVideo/',
			get_video:				video_server + upload_point +'getVideo/',
			get_video_clipart:		video_server + upload_point +'getVideoClipArts/',
			upload_video_clipart:	video_server + upload_point +'uploadVideoClipArt/',
			create_video_folder:	video_server + upload_point +'createVideoFolder/',
			delete_video_folder:	video_server + upload_point +'deleteVideoFolder/',
			delete_video_clipart:	video_server + upload_point +'deleteVideoClipArtFile/',
			delete_video:			video_server + upload_point +'deleteVideoFile/',
			upload_image: 			upload_point+'uploadImage/',
			delete_image:			upload_point+'deleteImageFile/',
			delete_image_clipart:	upload_point+'deleteImageClipArtFile/',
			upload_image_clipart:	upload_point+'uploadImageClipArt/',
			get_image_clipart: 		upload_point+'getClipArts/',
			create_image_folder:	upload_point+'createImageFolder/',
			delete_image_folder:	upload_point+'deleteImageFolder/',
			get_image: 				upload_point+'getImage/',
			upload_audio:			upload_point+'uploadMultimedia/',
			upload_audio_clipart:	upload_point+'uploadMultimediaClipArt/',
			delete_audio:			upload_point+'deleteMultimediaFile/',
			delete_audio_clipart:	upload_point+'deleteMultimediaClipArtFile/',
			get_audio:				upload_point+'getMultimedia/',
			get_audio_clipart:		upload_point+'getMultimediaClipArts/',
			create_audio_folder:	upload_point+'createMultimediaFolder/',
			delete_audio_folder:	upload_point+'deleteMultimediaFolder/',
			set_tag:				upload_point+'setFileTags/'
		},
		curent_folder = '',
		init_collection = new Backbone.Collection([
			{name:'prezent', title:'slides'},
			{name:'micro', title:'audio'},
			{name:'camera', title:'video'},
			{name:'pictr', title:'pictures'},
		]),
		property_value_view_widget = 0;

	    return Backbone.View.extend({
			initialize:function(){
				this.render();
			},
	        render: function () {
	        	this.$el.empty();
	        	_.each(init_collection.models, function(model){
	        		model.view = new MediaIcoView({model:model});
	        		this.$el.append(model.view.render().el);
	        	}, this);
	            return this;
	        }

	    });

});



function getCookie(name){
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ))
    return matches ? decodeURIComponent(matches[1]) : undefined
}